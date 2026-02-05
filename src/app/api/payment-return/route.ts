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
    const paidCurrency = rawData["currency"] || rawData["Currency"] || "KRW";

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
      // ✅ 사장님 DB 컬럼(total_price, usd_amount) 그대로 호출
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

      // ✅ [금액 위변조 체크] 사장님 DB의 usd_amount가 문자열일 수 있으므로 Number() 처리
      let isAmountValid = false;
      if (paidCurrency === "USD") {
        isAmountValid = Math.abs(Number(order.usd_amount) - paidAmount) < 0.01;
      } else {
        isAmountValid = Number(order.total_price) === paidAmount;
      }

      if (!isAmountValid) {
        console.error(
          `🚨 [위변조의심] DB:${order.usd_amount}, 실결제:${paidAmount}`,
        );
        await supabase
          .from("bookings")
          .update({ status: "fraud_suspected" }) // 관리자가 어드민에서 확인 가능하도록 상태값 변경
          .eq("order_number", mxIssueNo);
        return NextResponse.redirect(
          new URL(`/cart?error=amount_mismatch`, request.url),
          303,
        );
      }

      // ✅ 결제 성공 처리
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
      // 결제 실패 시 상태 유지 혹은 실패 기록
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
