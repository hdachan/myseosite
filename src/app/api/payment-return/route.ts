import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // 들어온 데이터 정리 (디버깅용)
    const rawData: Record<string, string> = {};
    formData.forEach((value, key) => {
      rawData[key] = value.toString();
    });

    console.log("🔥 [KPN 데이터 수신]", rawData);

    // 1. 데이터 추출
    const replyCode =
      rawData["code"] || rawData["ReplyCode"] || rawData["replyCode"];
    const mxIssueNo =
      rawData["mxIssueNo"] || rawData["MxIssueNO"] || rawData["order_no"];
    const message =
      rawData["message"] ||
      rawData["ReplyMessage"] ||
      rawData["replyMessage"] ||
      "";
    const paidAmount = Number(rawData["amount"] || rawData["Amount"] || 0);

    console.log(
      `✅ 해석 결과: Code=${replyCode}, Order=${mxIssueNo}, Paid=${paidAmount}`,
    );

    // 2. 필수 데이터 검증
    if (!replyCode || !mxIssueNo) {
      console.error("⚠️ 필수 데이터 누락");
      // 실패 시 장바구니로 이동
      return NextResponse.redirect(
        new URL(`/cart?error=missing_data`, request.url),
        303,
      );
    }

    // 3. Supabase 연결
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    // 4. 성공 처리 (ReplyCode가 0000이면 성공)
    if (replyCode === "0000") {
      console.log("🎉 PG사 성공 응답 수신. 보안 검증 시작...");

      const { data: originalOrder, error: fetchError } = await supabase
        .from("bookings")
        .select("total_price, status")
        .eq("order_number", mxIssueNo)
        .single();

      if (fetchError || !originalOrder) {
        console.error("❌ 주문 정보를 찾을 수 없음:", fetchError);
        return NextResponse.redirect(
          new URL(`/cart?error=order_not_found`, request.url),
          303,
        );
      }

      // 금액 위변조 체크
      if (originalOrder.total_price !== paidAmount) {
        console.error(
          `🚨 [해킹의심] 금액 불일치! DB: ${originalOrder.total_price}, 결제됨: ${paidAmount}`,
        );
        await supabase
          .from("bookings")
          .update({ status: "fraud_suspected" })
          .eq("order_number", mxIssueNo);
        return NextResponse.redirect(
          new URL(`/cart?error=amount_mismatch`, request.url),
          303,
        );
      }

      // 진짜 결제 완료 처리
      await supabase
        .from("bookings")
        .update({ status: "paid" })
        .eq("order_number", mxIssueNo);

      // ✅ [중요] 성공 페이지 경로 확인!
      // 아까 작성하신 성공 페이지 파일이 /api/success/page.tsx 에 있다면 주소를 맞추세요.
      // 만약 /booking/success 로 옮기셨다면 그 주소로 적으셔야 합니다.
      return NextResponse.redirect(
        new URL(
          `/api/success?orderId=${mxIssueNo}&clearCart=true`,
          request.url,
        ),
        303,
      );
    } else {
      // ✅ [중요] 결제 실패 시: 메인(/)이 아닌 장바구니(/cart)로 리다이렉트
      console.warn(`❌ 결제 실패 (코드: ${replyCode}, 메시지: ${message})`);
      return NextResponse.redirect(
        new URL(
          `/cart?error=${encodeURIComponent(message || "payment_failed")}`,
          request.url,
        ),
        303,
      );
    }
  } catch (error) {
    console.error("❌ 서버 에러:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
