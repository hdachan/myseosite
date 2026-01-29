"use client";

import { Star, User, MessageSquarePlus } from "lucide-react";
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
  const hasReviews = reviews && reviews.length > 0;

  return (
    // ✅ [레이아웃 통일] TourOverviewSection과 동일한 클래스 적용
    // (bg-white, p-6 md:p-8, rounded-[6px], border, shadow-sm)
    <section
      id="reviews"
      className="bg-white p-6 md:p-8 rounded-[6px] border border-gray-200 shadow-sm mt-8"
    >
      <div className="mb-6">
        {/* ✅ [소제목/라벨] Overview와 동일한 스타일 */}
        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#4A7C7E] font-bold mb-2">
          TRAVELER REVIEWS
        </p>

        {/* ✅ [제목 H2] Overview와 동일한 폰트/크기 규칙 */}
        <h2
          className={`${hangameFont.className} text-xl md:text-2xl font-bold text-gray-900 leading-tight flex items-center gap-2`}
        >
          Traveler Reviews
          {hasReviews && (
            <span className="text-gray-400 font-normal text-lg">
              ({totalReviews})
            </span>
          )}
        </h2>
      </div>

      {/* --------------------------------------------------- */}
      {/* CASE 1: 리뷰가 없을 때 (Empty State) */}
      {/* --------------------------------------------------- */}
      {!hasReviews ? (
        <div className="bg-gray-50 rounded-[6px] p-10 text-center border border-gray-100 flex flex-col items-center justify-center">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm text-gray-300 relative border border-gray-100">
            <MessageSquarePlus className="w-7 h-7" />
            <Star className="w-3.5 h-3.5 text-orange-200 absolute -top-1 -right-1 fill-orange-100" />
          </div>

          <h3 className="text-gray-900 font-bold text-base mb-1">
            No reviews yet
          </h3>
          <p className="text-gray-500 text-xs mb-4 max-w-sm mx-auto leading-relaxed">
            This tour is waiting for its first story.
            <br className="hidden md:block" />
            Share your experience!
          </p>

          <div className="flex gap-1 opacity-50">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-4 h-4 text-gray-200 fill-gray-100"
              />
            ))}
          </div>
        </div>
      ) : (
        /* --------------------------------------------------- */
        /* CASE 2: 리뷰가 있을 때 (List State) */
        /* --------------------------------------------------- */
        <div>
          {/* 평점 요약 박스 */}
          <div className="bg-gray-50 rounded-[6px] p-5 mb-8 flex items-center gap-5 border border-gray-100">
            <div className="text-4xl font-extrabold text-gray-900">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex flex-col">
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(averageRating)
                        ? "fill-orange-400 text-orange-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                Verified Bookings Only
              </span>
            </div>
          </div>

          {/* 리뷰 리스트 */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
              >
                <div className="flex gap-4">
                  {/* 왼쪽: 프로필 아이콘 */}
                  <div className="flex-shrink-0">
                    <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 border border-gray-200">
                      <User className="w-4 h-4" />
                    </div>
                  </div>

                  {/* 오른쪽: 내용 */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-2">
                      <div>
                        <p className="font-bold text-sm text-gray-900">
                          {review.author_name}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          {new Date(review.created_at).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" },
                          )}
                        </p>
                      </div>

                      {/* 별점 */}
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < review.rating
                                ? "fill-orange-400 text-orange-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap mt-2">
                      {review.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
