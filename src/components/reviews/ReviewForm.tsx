"use client";

import { useState } from "react";
import { Star, Loader2, Send } from "lucide-react";
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

      alert(
        "Review submitted! It will be posted after a quick admin approval. Thank you! 🎁",
      );
      router.push("/");
    } catch (error: any) {
      alert(error.message);
      setIsSubmitting(false);
    }
  };

  const getRatingText = (r: number) => {
    const labels = [
      "",
      "Terrible. 😡",
      "Not as expected. 😞",
      "It was okay. 😐",
      "Pretty good! 🙂",
      "It was amazing! 😍",
    ];
    return labels[r];
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* 카드 컨테이너 */}
      <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-8 md:p-12 border border-white/20 relative overflow-hidden">
        {/* 상단 장식 요소 */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-300 via-orange-500 to-orange-300" />

        <div className="text-center mb-10">
          <h1
            className={`${hangameFont.className} text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight`}
          >
            How was your trip?
          </h1>
          <div className="inline-block px-4 py-1.5 bg-orange-50 rounded-full mb-4">
            <span className="text-orange-600 font-bold text-sm uppercase tracking-wider">
              {tourTitle}
            </span>
          </div>
          <p className="text-gray-500 font-medium">
            Hi <span className="text-gray-900 font-bold">{customerName}</span>,
            please share your experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 별점 영역 */}
          <div className="flex flex-col items-center p-6 bg-gray-50/50 rounded-3xl border border-gray-100">
            <div className="flex gap-3 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="group transition-all duration-200 hover:scale-125 focus:outline-none"
                >
                  <Star
                    className={`w-10 h-10 md:w-12 md:h-12 transition-all duration-300 ${
                      star <= rating
                        ? "fill-orange-400 text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.4)]"
                        : "fill-gray-200 text-gray-200 group-hover:text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-base font-bold text-gray-700 animate-in fade-in slide-in-from-bottom-1">
              {getRatingText(rating)}
            </p>
          </div>

          {/* 텍스트 영역 */}
          <div className="relative group">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-white border-2 border-gray-100 rounded-2xl p-5 h-44 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none resize-none text-gray-700 transition-all text-lg leading-relaxed shadow-sm"
              placeholder="What did you like the most about this tour?"
              required
            />
            <div className="absolute bottom-4 right-4 text-xs text-gray-400 font-medium">
              {content.length} characters
            </div>
          </div>

          {/* 버튼 */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-5 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-3 transition-all duration-300 ${
              isSubmitting
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-900 text-white hover:bg-orange-600 hover:shadow-orange-200 active:scale-95"
            }`}
          >
            {isSubmitting ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5" /> Submit Review
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
