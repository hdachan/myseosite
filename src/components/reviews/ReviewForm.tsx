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
    if (!content.trim()) return alert("Please enter your review.");

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
      if (!res.ok) throw new Error(result.error || "Submission failed");

      alert("Review submitted! Thank you 🙌");
      router.push("/");
    } catch (error: any) {
      alert(error.message);
      setIsSubmitting(false);
    }
  };

  const getRatingText = (r: number) => {
    const labels = [
      "",
      "Very bad 😡",
      "Not great 😞",
      "It was okay 😐",
      "Pretty good 🙂",
      "Amazing experience 😍",
    ];
    return labels[r];
  };

  return (
    <div className="w-full max-w-lg mx-auto px-6 py-16">
      <div className="bg-white border border-gray-200 rounded-md p-10 space-y-10 shadow-sm">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1
            className={`${hangameFont.className} text-2xl font-bold text-gray-900`}
          >
            Share your experience
          </h1>

          <p className="text-gray-500 text-sm">
            <span className="font-semibold text-gray-800">{customerName}</span>{" "}
            · {tourTitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Rating */}
          <div className="flex flex-col items-center space-y-3">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= rating
                        ? "fill-amber-400 text-amber-400" // 별은 표준적인 황금색 유지
                        : "fill-gray-200 text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* 🟢 신뢰감의 Green 적용: 별점 상태 텍스트 */}
            <span className="text-sm font-medium text-[#2F6F6D]">
              {getRatingText(rating)}
            </span>
          </div>

          {/* Textarea */}
          <div className="space-y-2">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              // 🟢 신뢰감의 Green 적용: 입력창 포커스 시 테두리 컬러
              className="w-full border border-gray-300 rounded-md p-4 h-40 text-gray-700 text-base resize-none focus:outline-none focus:ring-2 focus:ring-[#2F6F6D]/20 focus:border-[#2F6F6D] transition"
              placeholder="What did you like most about this tour?"
              required
            />
            <div className="text-right text-xs text-gray-400">
              {content.length} characters
            </div>
          </div>

          {/* Submit */}
          {/* 🔴 강렬한 Red 적용: 최종 액션 버튼 */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-md font-semibold flex items-center justify-center gap-2 transition transform active:scale-[0.98] ${
              isSubmitting
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#B80D12] text-white hover:bg-[#9a0b0f] shadow-md hover:shadow-lg"
            }`}
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Review
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
