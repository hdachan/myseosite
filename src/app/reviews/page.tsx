import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import ReviewForm from "@/components/reviews/ReviewForm";

// ✅ [수정 핵심] ANON_KEY -> SERVICE_ROLE_KEY 로 변경
// 이제 RLS 보안 정책을 무시하고 데이터를 조회할 수 있습니다.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// 페이지 캐싱 방지 (항상 최신 상태 확인)
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ReviewWritePage({ searchParams }: PageProps) {
  const { token } = await searchParams;

  if (!token) return notFound();

  // 토큰 검사
  const { data: booking, error } = await supabase
    .from("bookings")
    .select("id, tour_title, customer_name, is_reviewed, tour_id")
    .eq("review_token", token)
    .single();

  // 디버깅용 로그 (혹시 또 안 되면 콘솔 확인용)
  if (error) {
    console.error("DB Error:", error.message);
  }

  // 유효하지 않은 토큰
  if (error || !booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-sm w-full flex flex-col items-center">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Invalid Link</h1>
          <p className="text-gray-500 text-sm">
            Review link is invalid or expired.
            <br />
            <span className="text-xs text-gray-400 mt-2 block">
              (Token: {token.slice(0, 8)}...)
            </span>
          </p>
          <Link
            href="/"
            className="mt-6 text-sm font-bold text-gray-900 underline"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  // 이미 작성함
  if (booking.is_reviewed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-sm w-full flex flex-col items-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Already Reviewed
          </h1>
          <p className="text-gray-500 text-sm">
            You have already submitted a review.
          </p>
          <Link
            href={`/`}
            className="mt-6 px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold"
          >
            View Tour Page
          </Link>
        </div>
      </div>
    );
  }

  // 정상 접근 -> 폼 보여주기
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <ReviewForm
        bookingId={booking.id}
        tourTitle={booking.tour_title}
        tourId={booking.tour_id}
        customerName={booking.customer_name}
        token={token}
      />
    </div>
  );
}
