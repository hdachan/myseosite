import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // submissionType 추가 (예약인지 결제인지 구분)
    const {
      cartItems,
      order_number,
      total_price,
      customer_info,
      submissionType,
    } = body;

    console.log("📦 [Cart Checkout] 요청 받음:", {
      order_number,
      count: cartItems.length,
      type: submissionType,
    });

    // 1. Supabase 연결
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    // 2. 데이터 가공
    const bookingsToInsert = cartItems.map((item: any) => {
      // 🚨 [디버깅] 만약 필수 데이터가 없으면 로그를 찍음
      if (!item.tourId && !item.slug)
        console.warn("⚠️ 상품 ID/Slug 누락됨:", item.title);

      return {
        tour_id: item.tourId || item.slug || "unknown-id", // ID 없으면 임시값이라도 넣어서 500 방지
        tour_title: item.title,

        customer_name: customer_info.fullName,
        customer_email: customer_info.email,
        customer_phone: customer_info.phone,

        tour_date: item.date || new Date().toISOString().split("T")[0], // 날짜 없으면 오늘
        option_name: item.optionName,
        hotel_info: customer_info.hotelInfo,

        adults: item.adults,
        children: item.children,
        total_price: item.totalPrice,

        submission_type: submissionType || "PAYMENT", // 예약 or 결제
        status: "pending",

        order_number: order_number,
      };
    });

    // 3. DB 저장
    const { data, error } = await supabase
      .from("bookings")
      .insert(bookingsToInsert)
      .select();

    if (error) {
      // 🔥 여기가 핵심! 에러 내용을 콘솔에 빨갛게 찍어줌
      console.error("❌ Supabase 저장 실패:", error);
      throw new Error(error.message); // 클라이언트에 에러 전달
    }

    console.log("✅ 저장 성공:", data.length, "건");
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ API 500 에러 발생:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
