"use client";

import { useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { hangameFont } from "@/lib/fonts";

interface Props {
  bookingId: string;
  tourTitle: string;
  tourId: string;
  customerName: string;
  token: string;
}

export default function ReviewForm({
  bookingId,
  tourTitle,
  tourId,
  customerName,
  token,
}: Props) {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return alert("리뷰 내용을 입력해주세요.");

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          rating,
          content,
          bookingId,
          tourId,
          tourTitle,
          authorName: customerName,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "저장 실패");

      // ✅ [변경 1] 안내 문구 변경 (승인 대기 알림)
      alert("리뷰가 등록되었습니다! 관리자 승인 후 게시됩니다. 감사합니다. 🎁");

      // ✅ [변경 2] 홈 화면으로 이동
      router.push("/");
    } catch (error: any) {
      alert(error.message);
      setIsSubmitting(false);
    }
  };

  // 텍스트 렌더링 오류 방지용 함수
  const getRatingText = (r: number) => {
    switch (r) {
      case 5:
        return "It was amazing! 😍";
      case 4:
        return "Pretty good! 🙂";
      case 3:
        return "It was okay. 😐";
      case 2:
        return "Not as expected. 😞";
      case 1:
        return "Terrible. 😡";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
      <div className="text-center mb-8">
        <h1
          className={`${hangameFont.className} text-2xl font-bold text-gray-900 mb-2`}
        >
          How was your trip?
        </h1>
        <p className="text-gray-500 text-sm">
          <span className="font-bold text-orange-600 block mb-1 text-base">
            {tourTitle}
          </span>
          Hi {customerName}, please share your experience.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 별점 선택 영역 */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110 focus:outline-none p-1"
              >
                <Star
                  className={`w-10 h-10 ${
                    star <= rating
                      ? "fill-orange-400 text-orange-400 drop-shadow-sm"
                      : "fill-gray-100 text-gray-200"
                  }`}
                />
              </button>
            ))}
          </div>

          <p className="text-sm font-medium text-gray-600 h-6">
            <span>{getRatingText(rating)}</span>
          </p>
        </div>

        {/* 내용 입력 영역 */}
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 h-40 focus:ring-2 focus:ring-orange-500 outline-none resize-none text-gray-700 transition-all"
            placeholder="What did you like the most?"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 rounded-xl font-bold text-white shadow-md flex items-center justify-center gap-2 transition-all ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-900 hover:bg-black hover:shadow-lg active:scale-[0.98]"
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
            </>
          ) : (
            "Submit Review"
          )}
        </button>
      </form>
    </div>
  );
}
