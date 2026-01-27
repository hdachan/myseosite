import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html"; // ✅ 패키지 임포트

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

    // ✅ [보안 추가] XSS 방지를 위한 데이터 세탁 (Sanitization)
    // 사용자가 입력한 텍스트에서 스크립트(<script> 등)를 제거합니다.
    // body.값 이 없을 경우를 대비해 || "" 로 빈 문자열 처리
    const cleanData = {
      fullName: sanitizeHtml(body.fullName || ""),
      email: sanitizeHtml(body.email || ""),
      phone: sanitizeHtml(body.phone || ""),
      hotelInfo: sanitizeHtml(body.hotelInfo || ""), // 특히 자유 입력칸이라 중요
      optionName: sanitizeHtml(body.optionName || ""),
    };

    // 3. 상태(Status) 결정 로직
    let initialStatus = "pending";

    if (body.type === "RESERVATION") {
      initialStatus = "pending";
    } else if (body.type === "PAYMENT") {
      initialStatus = "pending";
    }

    // 4. 데이터 저장 (Insert)
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          // ID나 시스템 값은 보통 그대로 씁니다 (필요시 여기도 sanitize 가능)
          tour_id: body.tourId,
          tour_title: body.title,

          // ✅ 세탁된(안전한) 데이터로 저장
          customer_name: cleanData.fullName,
          customer_email: cleanData.email,
          customer_phone: cleanData.phone,

          tour_date: body.tourDate,
          option_name: cleanData.optionName,
          hotel_info: cleanData.hotelInfo,

          // 숫자는 스크립트 공격이 불가능하므로 그대로 사용
          adults: body.adults,
          children: body.children,
          total_price: body.totalPrice,

          submission_type: body.type,
          status: initialStatus,

          // 시스템에서 생성한 주문번호
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
