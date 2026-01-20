import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. 환경변수 확인
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Supabase Key가 설정되지 않았습니다." },
        { status: 500 },
      );
    }

    // 2. Supabase 연결
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 3. 상태(Status) 결정 로직
    let initialStatus = "pending";

    if (body.type === "RESERVATION") {
      initialStatus = "pending";
    } else if (body.type === "PAYMENT") {
      // 결제 버튼을 눌렀지만, 아직 결제 완료 신호를 받기 전이므로 'payment_required' 또는 'pending' 유지
      // 편의상 pending으로 통일하거나 구분하셔도 됩니다.
      initialStatus = "pending";
    }

    // 4. 데이터 저장 (Insert)
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          tour_id: body.tourId,
          tour_title: body.title,

          customer_name: body.fullName,
          customer_email: body.email,
          customer_phone: body.phone,

          tour_date: body.tourDate,
          option_name: body.optionName,
          hotel_info: body.hotelInfo,

          adults: body.adults,
          children: body.children,
          total_price: body.totalPrice,

          submission_type: body.type,
          status: initialStatus,

          // ✅ [핵심] 주문번호 추가! (이게 없으면 KPN이랑 연결이 끊깁니다)
          order_number: body.order_number,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error(error.message);
    }

    // 5. 성공 응답
    return NextResponse.json({
      success: true,
      bookingId: data[0].id,
    });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
