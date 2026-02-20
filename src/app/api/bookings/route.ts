import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    const siteUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.NEXT_PUBLIC_SITE_URL || "https://myseosite.vercel.app";

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Supabase Key Missing" },
        { status: 500 },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 보안: XSS 방지
    const cleanData = {
      fullName: sanitizeHtml(body.fullName || ""),
      email: sanitizeHtml(body.email || ""),
      phone: sanitizeHtml(body.phone || ""),
      hotelInfo: sanitizeHtml(body.hotelInfo || ""),
      optionName: sanitizeHtml(body.optionName || ""),
      meetingPoint: sanitizeHtml(body.meetingPoint || ""), // ✅ 추가
    };

    // tour_id 안전하게 처리
    const tourId = body.tourId || body.slug || body.tourSlug || "unknown";

    // 데이터 저장
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          tour_id: tourId, // ✅ 폴백 처리
          tour_title: body.title,
          customer_name: cleanData.fullName,
          customer_email: cleanData.email,
          customer_phone: cleanData.phone,
          tour_date: body.tourDate,
          option_name: cleanData.optionName,
          hotel_info: cleanData.hotelInfo,
          meeting_point: cleanData.meetingPoint, // ✅ 추가
          adults: body.adults,
          children: body.children,
          total_price: body.totalPrice,
          currency: body.currency || "KRW",
          exchange_rate: body.exchangeRate,
          usd_amount: body.usdAmount,
          submission_type: body.type,
          status: "pending",
          order_number: body.order_number,
        },
      ])
      .select();

    if (error) throw new Error(error.message);

    console.log(`✅ DB 저장 성공 (${body.type})`);

    // 현장지불(RESERVATION)일 때만 메일 발송
    if (body.type !== "PAYMENT") {
      try {
        const emailRes = await fetch(`${siteUrl}/api/email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "NEW_BOOKING",
            email: process.env.SMTP_USER,
            clientEmail: cleanData.email,
            tourDate: body.tourDate,
            hotelInfo: cleanData.hotelInfo,
            meetingPoint: cleanData.meetingPoint, // ✅ 추가
            customerName: cleanData.fullName,
            phone: cleanData.phone,
            tourTitle: body.title,
            orderNumber: body.order_number,
            amount: body.totalPrice,
            currency: body.currency || "KRW",
            optionName: cleanData.optionName,
            adults: body.adults,
            children: body.children,
          }),
        });

        if (!emailRes.ok) {
          console.error("⚠️ 이메일 발송 실패");
        } else {
          console.log("📧 [RESERVATION] 알림 발송 완료!");
        }
      } catch (emailError) {
        console.error("❌ 이메일 네트워크 에러:", emailError);
      }
    } else {
      console.log("🤫 [PAYMENT] 결제 대기 중 (메일 생략)");
    }

    return NextResponse.json({ success: true, bookingId: data[0].id });
  } catch (error: any) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
