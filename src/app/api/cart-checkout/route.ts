import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html"; // ✅ 패키지 임포트 필수!

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      cartItems,
      order_number,
      // total_price, // (참고: 총 가격은 검증용으로 쓸 수 있지만 저장엔 개별 가격이 중요)
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

    // ✅ [보안 추가] 고객 정보(입력값) 세탁
    // 장바구니는 여러 상품이지만, 예약자 정보(customer_info)는 공통이므로 한 번만 씻으면 됩니다.
    const cleanCustomer = {
      fullName: sanitizeHtml(customer_info.fullName || ""),
      email: sanitizeHtml(customer_info.email || ""),
      phone: sanitizeHtml(customer_info.phone || ""),
      hotelInfo: sanitizeHtml(customer_info.hotelInfo || ""),
    };

    // 2. 데이터 가공
    const bookingsToInsert = cartItems.map((item: any) => {
      // 🚨 [디버깅] 필수 데이터 체크
      if (!item.tourId && !item.slug)
        console.warn("⚠️ 상품 ID/Slug 누락됨:", item.title);

      // ✅ [보안 추가] 옵션 이름 같은 것도 사용자가 입력/선택하는 것이라면 씻어주는 게 안전합니다.
      const cleanOptionName = sanitizeHtml(item.optionName || "");

      return {
        tour_id: item.tourId || item.slug || "unknown-id",
        tour_title: item.title, // 제목은 DB에서 가져온 거라면 안전하지만, 프론트에서 온 거라면 이것도 sanitize 추천

        // ✅ 세탁된 고객 정보 사용
        customer_name: cleanCustomer.fullName,
        customer_email: cleanCustomer.email,
        customer_phone: cleanCustomer.phone,

        tour_date: item.date || new Date().toISOString().split("T")[0],
        option_name: cleanOptionName,
        hotel_info: cleanCustomer.hotelInfo,

        adults: item.adults,
        children: item.children,
        total_price: item.totalPrice, // ⚠️ [중요 경고] 아래 설명 참조

        submission_type: submissionType || "PAYMENT",
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
      console.error("❌ Supabase 저장 실패:", error);
      throw new Error(error.message);
    }

    console.log("✅ 저장 성공:", data.length, "건");
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ API 500 에러 발생:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
