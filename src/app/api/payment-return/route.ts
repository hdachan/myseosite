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
          hotel_info,
          meeting_point,
          option_name,
          adults,
          children
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

      // DB 상태 업데이트
      await supabase
        .from("bookings")
        .update({ status: "paid" })
        .eq("order_number", mxIssueNo);

      try {
        console.log(`📧 이메일 발송 시도: ${siteUrl}/api/email`);
        const emailRes = await fetch(`${siteUrl}/api/email`, {
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
            meetingPoint: order.meeting_point, // ✅ 추가

            orderNumber: mxIssueNo,
            amount: paidAmount,
            currency: paidCurrency,

            optionName: order.option_name,
            adults: order.adults,
            children: order.children,
          }),
        });

        if (!emailRes.ok) {
          const errorText = await emailRes.text();
          console.error("⚠️ 이메일 API 응답 실패:", errorText);
        } else {
          console.log("✅ 결제 완료 메일 발송 성공!");
        }
      } catch (emailError) {
        console.error("❌ 이메일 발송 중 네트워크 에러:", emailError);
      }

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
