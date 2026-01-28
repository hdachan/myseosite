"use client";

import { Star, User, ThumbsUp, MessageSquarePlus } from "lucide-react";
import { hangameFont } from "@/lib/fonts";

interface Review {
  id: number;
  author_name: string;
  rating: number;
  content: string;
  created_at: string;
}

interface Props {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export default function TourReviewsSection({
  reviews,
  averageRating,
  totalReviews,
}: Props) {
  // ✅ 1. 리뷰가 0개일 때 보여줄 화면 (디자인 개선됨)
  if (!reviews || reviews.length === 0) {
    return (
      <section className="py-12 border-t border-gray-100 mt-12" id="reviews">
        <h2
          className={`${hangameFont.className} text-2xl md:text-3xl font-bold mb-8`}
        >
          Traveler Reviews
        </h2>

        <div className="bg-gray-50 rounded-2xl p-12 text-center border border-gray-100 flex flex-col items-center justify-center">
          {/* 아이콘 영역 */}
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-gray-300 relative">
            <MessageSquarePlus className="w-10 h-10" />
            {/* 장식용 작은 별 */}
            <Star className="w-5 h-5 text-orange-200 absolute -top-1 -right-1 fill-orange-100" />
          </div>

          {/* 텍스트 영역 */}
          <h3 className="text-gray-900 font-bold text-xl mb-2">
            No reviews yet
          </h3>
          <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto leading-relaxed">
            This tour is waiting for its first story.{" "}
            <br className="hidden md:block" />
            Share your experience and help other travelers!
          </p>

          {/* 빈 별점 표시 (기대감 조성) */}
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-5 h-5 text-gray-200 fill-gray-100"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ✅ 2. 리뷰가 있을 때 보여줄 화면 (기존 동일)
  return (
    <section className="py-12 border-t border-gray-100 mt-12" id="reviews">
      <h2
        className={`${hangameFont.className} text-2xl md:text-3xl font-bold mb-8 flex items-center gap-2`}
      >
        Traveler Reviews
        <span className="text-gray-400 text-lg font-normal">
          ({totalReviews})
        </span>
      </h2>

      {/* 평점 요약 박스 */}
      <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-10 flex items-center gap-6">
        <div className="text-5xl font-extrabold text-gray-900">
          {averageRating.toFixed(1)}
        </div>
        <div className="flex flex-col">
          <div className="flex gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(averageRating)
                    ? "fill-orange-400 text-orange-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 font-medium">
            Verified Bookings Only
          </span>
        </div>
      </div>

      {/* 리뷰 리스트 */}
      <div className="space-y-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-100 pb-8 last:border-0 last:pb-0"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {/* 프로필 아이콘 */}
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">
                    {review.author_name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(review.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              {/* 개별 별점 */}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? "fill-orange-400 text-orange-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* 내용 */}
            <div className="pl-13 md:pl-14">
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                {review.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
