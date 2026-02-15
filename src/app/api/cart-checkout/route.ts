import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cartItems, order_number, customer_info, submissionType } = body;

    // -----------------------------------------------------------------------
    // 🔥 [수정 완료] 개발(내컴퓨터) vs 배포(Vercel) 환경 자동 감지 코드
    // -----------------------------------------------------------------------
    const siteUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.NEXT_PUBLIC_SITE_URL || "https://myseosite.vercel.app";

    console.log("📦 [Cart Checkout] 요청 받음:", {
      order_number,
      count: cartItems.length,
      type: submissionType,
    });

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    // 1. 고객 정보 세탁
    const cleanCustomer = {
      fullName: sanitizeHtml(customer_info.fullName || ""),
      email: sanitizeHtml(customer_info.email || ""),
      phone: sanitizeHtml(customer_info.phone || ""),
      hotelInfo: sanitizeHtml(customer_info.hotelInfo || ""),
    };

    // 2. 데이터 가공
    const bookingsToInsert = cartItems.map((item: any) => {
      const cleanOptionName = sanitizeHtml(item.optionName || "");

      return {
        tour_id: item.tourId || item.slug || "unknown-id",
        tour_title: item.title,
        customer_name: cleanCustomer.fullName,
        customer_email: cleanCustomer.email,
        customer_phone: cleanCustomer.phone,
        tour_date: item.date || new Date().toISOString().split("T")[0],
        option_name: cleanOptionName,
        hotel_info: cleanCustomer.hotelInfo,
        adults: item.adults,
        children: item.children,
        total_price: item.totalPrice,
        currency: item.currency || "KRW", // 장바구니 아이템의 통화 정보 사용
        submission_type: submissionType || "PAYMENT",
        status: "pending",
        order_number: order_number,
      };
    });

    // 3. DB 저장
    const { data, error } = await supabase
      .from("bookings")
      .insert(bookingsToInsert)
      .select(); // ✅ 저장된 데이터를 다시 받아옵니다 (이메일 보낼 때 쓰려고)

    if (error) {
      console.error("❌ Supabase 저장 실패:", error);
      throw new Error(error.message);
    }

    console.log("✅ DB 저장 성공:", data.length, "건");

    // -----------------------------------------------------------------------
    // 🔥 장바구니 예약(RESERVATION)일 때만 메일 발송
    // (결제는 PG사 갔다가 돌아오면 payment-return에서 보냄)
    // -----------------------------------------------------------------------
    if (submissionType !== "PAYMENT") {
      console.log("📧 [RESERVATION] 장바구니 예약 알림 발송 시작...");

      // 저장된 예약 건수만큼 반복해서 이메일 발송
      for (const booking of data) {
        fetch(`${siteUrl}/api/email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "NEW_BOOKING",
            email: process.env.SMTP_USER, // 사장님께 발송

            // 👇 상세 정보 연결
            clientEmail: booking.customer_email,
            customerName: booking.customer_name,
            phone: booking.customer_phone,
            tourTitle: booking.tour_title,
            tourDate: booking.tour_date,
            hotelInfo: booking.hotel_info,

            orderNumber: booking.order_number,
            amount: booking.total_price,
            currency: booking.currency || "KRW",

            optionName: booking.option_name, // ← 추가
            adults: booking.adults, // ← 추가
            children: booking.children, // ← 추가
          }),
        }).catch((err) =>
          console.error(`❌ 상품(${booking.tour_title}) 메일 실패:`, err),
        );
      }
      console.log("📧 메일 전송 루프 완료");
    } else {
      console.log("🤫 [PAYMENT] 장바구니 결제 대기 중 (메일 생략)");
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ API 500 에러 발생:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
