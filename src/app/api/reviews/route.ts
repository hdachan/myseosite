import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, rating, content, bookingId, tourId, tourTitle, authorName } =
      body;

    // 1. 토큰 유효성 검사
    const { data: booking, error: fetchError } = await supabase
      .from("bookings")
      .select("is_reviewed")
      .eq("review_token", token)
      .single();

    if (fetchError || !booking) {
      return NextResponse.json(
        { error: "유효하지 않은 토큰입니다." },
        { status: 400 },
      );
    }

    if (booking.is_reviewed) {
      return NextResponse.json(
        { error: "이미 사용된 링크입니다." },
        { status: 400 },
      );
    }

    // 2. 리뷰 저장 (🚨 여기가 핵심 변경사항!)
    const { error: insertError } = await supabase.from("reviews").insert({
      booking_id: bookingId,
      tour_id: tourId,
      tour_title: tourTitle,
      rating: rating,
      author_name: authorName,
      content: content,
      // ✅ false로 설정하여 관리자가 승인하기 전까지 숨깁니다.
      is_approved: false,
    });

    if (insertError) throw insertError;

    // 3. 티켓 사용 처리
    const { error: updateError } = await supabase
      .from("bookings")
      .update({ is_reviewed: true })
      .eq("review_token", token);

    if (updateError) throw updateError;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Review Submit Error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
