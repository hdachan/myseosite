import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("❌ Supabase Key Missing!");
      return NextResponse.json(
        { error: "Server Configuration Error: Supabase Key Missing" },
        { status: 500 },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // ✅ 2. 보안: XSS 방지 세탁
    const cleanData = {
      fullName: sanitizeHtml(body.fullName || ""),
      email: sanitizeHtml(body.email || ""),
      phone: sanitizeHtml(body.phone || ""),
      hotelInfo: sanitizeHtml(body.hotelInfo || ""),
      optionName: sanitizeHtml(body.optionName || ""),
    };

    // ✅ 3. 데이터 저장 (사장님 DB 컬럼명 매칭 + 달러 정보 포함)
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          tour_id: body.tourId,
          tour_title: body.title,
          customer_name: cleanData.fullName,
          customer_email: cleanData.email,
          customer_phone: cleanData.phone,
          tour_date: body.tourDate,
          option_name: cleanData.optionName,
          hotel_info: cleanData.hotelInfo,
          adults: body.adults,
          children: body.children,
          total_price: body.totalPrice,
          currency: body.currency || "KRW",
          exchange_rate: body.exchangeRate, // 환율 저장
          usd_amount: body.usdAmount, // 달러 금액 저장
          submission_type: body.type,
          status: "pending",
          order_number: body.order_number,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase Insert Error:", error);
      throw new Error(error.message);
    }

    return NextResponse.json({ success: true, bookingId: data[0].id });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
