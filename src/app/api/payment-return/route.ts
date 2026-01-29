import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // 들어온 데이터 정리 (디버깅용 로그)
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
      // 데이터가 없으면 장바구니로 돌려보냄
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

      // ✅ [수정 완료] 통합 완료 페이지로 이동 (type=PAYMENT 추가)
      // 디자인이 예쁜 /booking/success 페이지에서 초록색 테마로 보여줍니다.
      return NextResponse.redirect(
        new URL(
          `/booking/success?orderId=${mxIssueNo}&clearCart=true&type=PAYMENT`,
          request.url,
        ),
        303,
      );
    } else {
      // ❌ 결제 실패 시: 장바구니(/cart)로 이동
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
