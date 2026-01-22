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

    // 1. 이름표 찾기
    const replyCode =
      rawData["code"] || rawData["ReplyCode"] || rawData["replyCode"];
    const mxIssueNo =
      rawData["mxIssueNo"] || rawData["MxIssueNO"] || rawData["order_no"];
    const message =
      rawData["message"] ||
      rawData["ReplyMessage"] ||
      rawData["replyMessage"] ||
      "";

    // ✅ [추가] 결제된 금액 가져오기 (문자열 -> 숫자 변환)
    const paidAmount = Number(rawData["amount"] || rawData["Amount"] || 0);

    console.log(
      `✅ 해석 결과: Code=${replyCode}, Order=${mxIssueNo}, Paid=${paidAmount}`,
    );

    // 2. 데이터 검증 (필수값 확인)
    if (!replyCode || !mxIssueNo) {
      console.error("⚠️ 필수 데이터 누락");
      return NextResponse.redirect(
        new URL(`/?error=데이터누락`, request.url),
        303,
      );
    }

    // 3. Supabase 연결
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    // 4. 성공 처리 (0000이면 성공)
    if (replyCode === "0000") {
      console.log("🎉 PG사 성공 응답 수신. 검증 시작...");

      // 🛡️ [보안 핵심] DB에서 원래 주문 정보를 꺼내옴
      const { data: originalOrder, error: fetchError } = await supabase
        .from("bookings")
        .select("total_price, status")
        .eq("order_number", mxIssueNo)
        .single();

      if (fetchError || !originalOrder) {
        console.error("❌ 주문 정보를 찾을 수 없음:", fetchError);
        return NextResponse.redirect(
          new URL(`/?error=주문정보없음`, request.url),
          303,
        );
      }

      // 🛡️ [보안 핵심] 금액 위변조 체크 (DB 가격 vs 결제된 가격)
      // (혹시 모를 부동소수점 오차 등을 대비해 정수로 비교하거나 허용 오차를 둘 수 있음. 여기선 정확히 일치 확인)
      if (originalOrder.total_price !== paidAmount) {
        console.error(
          `🚨 [해킹의심] 금액 불일치! DB: ${originalOrder.total_price}, 결제됨: ${paidAmount}`,
        );

        // (선택) 상태를 'fraud_suspected' 같은 걸로 바꿔두면 나중에 잡기 편함
        await supabase
          .from("bookings")
          .update({ status: "payment_failed" }) // 혹은 'fraud_check'
          .eq("order_number", mxIssueNo);

        return NextResponse.redirect(
          new URL(`/?error=결제금액불일치`, request.url),
          303,
        );
      }

      // ✅ 모든 검증 통과! 진짜 결제 완료 처리
      console.log("✅ 금액 검증 통과! 상태를 'paid'로 변경합니다.");

      const { error: updateError } = await supabase
        .from("bookings")
        .update({ status: "paid" })
        .eq("order_number", mxIssueNo);

      if (updateError) {
        console.error("❌ DB 업데이트 에러:", updateError);
      } else {
        console.log("✅ DB 업데이트 완료");
      }

      // 성공 페이지로 이동
      return NextResponse.redirect(
        new URL(`/booking/success?orderId=${mxIssueNo}`, request.url),
        303,
      );
    } else {
      // 실패 시
      console.warn(`❌ 결제 실패 (코드: ${replyCode})`);
      return NextResponse.redirect(
        new URL(
          `/?error=${encodeURIComponent(message || "결제실패")}`,
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
