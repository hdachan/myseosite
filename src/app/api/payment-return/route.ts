import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const rawData: Record<string, string> = {};
    formData.forEach((value, key) => {
      rawData[key] = value.toString();
    });

    console.log("🔥 [KPN 데이터 수신]", rawData);

    const replyCode =
      rawData["code"] || rawData["ReplyCode"] || rawData["replyCode"];
    const mxIssueNo =
      rawData["mxIssueNo"] || rawData["MxIssueNO"] || rawData["order_no"];
    const message = rawData["message"] || rawData["ReplyMessage"] || "";
    const paidAmount = Number(rawData["amount"] || rawData["Amount"] || 0);
    // ✅ 결제된 통화 확인 (USD 또는 KRW)
    const paidCurrency = rawData["currency"] || rawData["Currency"] || "KRW";

    console.log(
      `✅ 해석 결과: Code=${replyCode}, Order=${mxIssueNo}, Paid=${paidAmount} ${paidCurrency}`,
    );

    if (!replyCode || !mxIssueNo) {
      return NextResponse.redirect(
        new URL(`/cart?error=missing_data`, request.url),
        303,
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    if (replyCode === "0000") {
      // ✅ DB에서 주문 정보와 함께 저장된 통화/금액 정보 가져오기
      const { data: order, error: fetchError } = await supabase
        .from("bookings")
        .select("total_price, usd_amount, currency, status")
        .eq("order_number", mxIssueNo)
        .single();

      if (fetchError || !order) {
        return NextResponse.redirect(
          new URL(`/cart?error=order_not_found`, request.url),
          303,
        );
      }

      // ✅ [금액 위변조 체크 로직 고도화]
      let isAmountValid = false;
      if (paidCurrency === "USD") {
        // 달러 결제라면 DB의 달러 금액과 비교 (오차 감안하여 소수점 2자리까지)
        isAmountValid = Math.abs(order.usd_amount - paidAmount) < 0.01;
      } else {
        // 원화 결제라면 기존처럼 원화 합계와 비교
        isAmountValid = order.total_price === paidAmount;
      }

      if (!isAmountValid) {
        console.error(
          `🚨 [해킹의심] 금액 불일치! DB(${paidCurrency}): ${paidCurrency === "USD" ? order.usd_amount : order.total_price}, 실결제: ${paidAmount}`,
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

      return NextResponse.redirect(
        new URL(
          `/booking/success?orderId=${mxIssueNo}&clearCart=true&type=PAYMENT`,
          request.url,
        ),
        303,
      );
    } else {
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
