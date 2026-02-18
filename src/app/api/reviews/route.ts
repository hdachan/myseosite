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

    // 1. [제2법칙] 사장님이 만든 'is_reviewed' 컬럼을 먼저 확인합니다.
    const { data: booking, error: fetchError } = await supabase
      .from("bookings")
      .select("is_reviewed")
      .eq("review_token", token)
      .single();

    if (fetchError || !booking) {
      return NextResponse.json({ error: "Invalid link." }, { status: 400 });
    }

    if (booking.is_reviewed) {
      return NextResponse.json(
        { error: "This link has already been used." },
        { status: 400 },
      );
    }

    // 2. [제2법칙] 리뷰 저장 (승인제 운영 권장)
    const { error: insertError } = await supabase.from("reviews").insert({
      booking_id: bookingId,
      tour_id: tourId,
      tour_title: tourTitle,
      rating: rating,
      author_name: authorName,
      content: content,
      is_approved: false, // 스키마 default가 true여도 코드에서 false를 주면 승인제로 작동합니다.
    });

    if (insertError) throw insertError;

    // 3. [핵심] 사장님 DB의 'is_reviewed'를 true로 바꿔서 티켓을 회수합니다.
    const { error: updateError } = await supabase
      .from("bookings")
      .update({ is_reviewed: true })
      .eq("review_token", token);

    if (updateError) throw updateError;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
