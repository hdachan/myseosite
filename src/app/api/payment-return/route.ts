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

    const replyCode = rawData["code"] || rawData["ReplyCode"] || "9999";
    const mxIssueNo =
      rawData["mxIssueNo"] || rawData["MxIssueNO"] || rawData["order_no"];
    const message = rawData["message"] || rawData["ReplyMessage"] || "";
    const paidAmount = Number(rawData["amount"] || rawData["Amount"] || 0);
    const paidCurrency = rawData["currency"] || rawData["Currency"] || "KRW";

    // -----------------------------------------------------------------------
    // 🔥 [수정 완료] 개발(내컴퓨터) vs 배포(Vercel) 환경 자동 감지 코드
    // -----------------------------------------------------------------------
    const siteUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.NEXT_PUBLIC_SITE_URL || "https://myseosite.vercel.app";

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
      const { data: order, error: fetchError } = await supabase
        .from("bookings")
        .select(
          `
          total_price, 
          usd_amount, 
          currency, 
          status, 
          customer_name, 
          customer_phone, 
          customer_email, 
          tour_title, 
          tour_date, 
          hotel_info
        `,
        )
        .eq("order_number", mxIssueNo)
        .single();

      if (fetchError || !order) {
        return NextResponse.redirect(
          new URL(`/cart?error=order_not_found`, request.url),
          303,
        );
      }

      let isAmountValid = false;
      if (paidCurrency === "USD") {
        isAmountValid = Math.abs(Number(order.usd_amount) - paidAmount) < 0.01;
      } else {
        isAmountValid = Number(order.total_price) === paidAmount;
      }

      if (!isAmountValid) {
        await supabase
          .from("bookings")
          .update({ status: "fraud_suspected" })
          .eq("order_number", mxIssueNo);
        return NextResponse.redirect(
          new URL(`/cart?error=amount_mismatch`, request.url),
          303,
        );
      }

      await supabase
        .from("bookings")
        .update({ status: "paid" })
        .eq("order_number", mxIssueNo);

      // -----------------------------------------------------------------------
      // 🔥 [결제완료] 메일 발송 (제목: [결제완료])
      // -----------------------------------------------------------------------
      fetch(`${siteUrl}/api/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "PAYMENT_CONFIRMED",
          email: process.env.SMTP_USER,

          clientEmail: order.customer_email,
          customerName: order.customer_name,
          phone: order.customer_phone,
          tourTitle: order.tour_title,
          tourDate: order.tour_date,
          hotelInfo: order.hotel_info,

          orderNumber: mxIssueNo,
          amount: paidAmount,
          currency: paidCurrency,
        }),
      }).catch((err) => console.error("입금 알림 메일 발송 실패:", err));

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
