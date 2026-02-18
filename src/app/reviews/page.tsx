import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { AlertCircle, CheckCircle2, Home } from "lucide-react";
import Link from "next/link";
import ReviewForm from "@/components/reviews/ReviewForm";
import { Metadata } from "next";

// ✅ [제1법칙] SEO 보호: 이 페이지는 검색 엔진에 노출하지 않음
export const metadata: Metadata = {
  title: "Review Your Experience | Seoul City Tour",
  robots: {
    index: false,
    follow: false,
  },
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ReviewWritePage({ searchParams }: PageProps) {
  const { token } = await searchParams;
  if (!token) return notFound();

  const { data: booking, error } = await supabase
    .from("bookings")
    .select("id, tour_title, customer_name, is_reviewed, tour_id")
    .eq("review_token", token)
    .single();

  // 1. 유효하지 않은 토큰 UI (🔴 브랜드 레드 적용)
  if (error || !booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-start bg-[#F8FAFC] pt-32 p-6 text-center">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 max-w-sm w-full flex flex-col items-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-10 h-10 text-[#B80D12]" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-3">
            Invalid Link
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            This review link is invalid or has expired.
          </p>
          <Link
            href="/"
            className="flex items-center gap-2 px-8 py-4 bg-[#B80D12] text-white rounded-2xl text-sm font-bold hover:bg-[#9a0b0f] transition-all shadow-lg active:scale-95"
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
        </div>
      </div>
    );
  }

  // 2. 이미 리뷰를 작성한 경우 UI (🟢 브랜드 그린 적용)
  if (booking.is_reviewed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-start bg-[#F8FAFC] pt-32 p-6 text-center">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 max-w-sm w-full flex flex-col items-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-[#2F6F6D]" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-3">
            Already Reviewed
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            You've already shared your experience!
            <br />
            Thank you!
          </p>
          <Link
            href="/"
            className="w-full py-4 bg-[#2F6F6D] text-white rounded-2xl text-sm font-bold hover:bg-[#245856] transition-all shadow-lg text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // 3. 정상 접근
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
