import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { AlertCircle, CheckCircle2, Home } from "lucide-react";
import Link from "next/link";
import ReviewForm from "@/components/reviews/ReviewForm";

// ✅ ANON_KEY -> SERVICE_ROLE_KEY 사용 (보안 정책 무시 및 데이터 조회)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// 페이지 캐싱 방지
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

  // 디버깅용 로그
  if (error) {
    console.error("DB Error:", error.message);
  }

  // 1. 유효하지 않은 토큰 UI
  if (error || !booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-start bg-[#F8FAFC] pt-32 p-6 text-center">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 max-w-sm w-full flex flex-col items-center scale-in-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">
            Invalid Link
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            This review link is invalid or has expired.
            <br />
            Please check your email again.
          </p>
          <Link
            href="/"
            className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-2xl text-sm font-bold hover:bg-black transition-all shadow-lg active:scale-95"
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
        </div>
      </div>
    );
  }

  // 2. 이미 리뷰를 작성한 경우 UI
  if (booking.is_reviewed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-start bg-[#F8FAFC] pt-32 p-6 text-center">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 max-w-sm w-full flex flex-col items-center scale-in-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">
            Already Reviewed
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            You've already shared your experience!
            <br />
            Thank you for your valuable feedback.
          </p>
          <Link
            href="/"
            className="w-full py-4 bg-gray-900 text-white rounded-2xl text-sm font-bold hover:bg-black transition-all shadow-lg active:scale-95 text-center"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  // 3. 정상 접근 -> 폼 보여주기 (pt-32로 헤더 공간 확보)
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-start justify-center pt-32 pb-20 px-4">
      <ReviewForm
        bookingId={booking.id}
        tourTitle={booking.tour_title}
        tourId={booking.tour_id}
        customerName={booking.customer_name}
        token={token}
      />
    </main>
  );
}
