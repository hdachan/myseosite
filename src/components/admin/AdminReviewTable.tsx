"use client";

import React from "react";

// 리뷰 데이터 타입 정의 (기존 인터페이스 유지)
interface Review {
  id: number;
  created_at: string;
  tour_title: string;
  author_name: string;
  rating: number;
  content: string;
  is_approved: boolean;
}

interface Props {
  reviews: Review[];
  onToggleStatus: (id: number, currentStatus: boolean) => void;
  onDelete: (id: number) => void;
}

export default function AdminReviewTable({
  reviews,
  onToggleStatus,
  onDelete,
}: Props) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("ko-KR");
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 font-sans">
      <div className="p-4 border-b flex justify-between items-center bg-gray-50">
        <h2 className="text-lg font-bold text-gray-700">
          💬 리뷰 관리 (Reviews)
        </h2>
        <span className="text-sm text-gray-500 font-medium">
          총 {reviews.length}개의 리뷰
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-xs uppercase font-bold tracking-tight">
              <th className="p-4 border-b w-32">작성일</th>
              <th className="p-4 border-b w-44">작성자 / 평점</th>
              <th className="p-4 border-b">내용</th>
              <th className="p-4 border-b w-48">상품명</th>
              <th className="p-4 border-b w-36 text-center">공개 여부</th>
              <th className="p-4 border-b w-16 text-center">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reviews.map((review) => (
              <tr
                key={review.id}
                className={`hover:bg-gray-50 transition-colors align-top ${
                  !review.is_approved ? "bg-yellow-50/40" : ""
                }`}
              >
                {/* 작성일 */}
                <td className="p-4 text-xs text-gray-600">
                  {formatDate(review.created_at)}
                </td>

                {/* 작성자 및 평점(별점) */}
                <td className="p-4">
                  <div className="font-bold text-gray-900 text-sm">
                    {review.author_name}
                  </div>
                  <div className="flex text-orange-400 text-xs mt-1 tracking-tighter">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                    <span className="ml-1 text-gray-400 font-medium">
                      ({review.rating})
                    </span>
                  </div>
                </td>

                {/* 리뷰 본문 */}
                <td className="p-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed max-w-md">
                  {review.content}
                </td>

                {/* 관련 투어 상품명 */}
                <td className="p-4 text-xs text-gray-500 font-medium italic">
                  {review.tour_title}
                </td>

                {/* 승인/숨김 토글 버튼 */}
                <td className="p-4 text-center">
                  <button
                    onClick={() =>
                      onToggleStatus(review.id, review.is_approved)
                    }
                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all shadow-sm ${
                      review.is_approved
                        ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                        : "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200 animate-pulse-subtle"
                    }`}
                  >
                    {review.is_approved ? "공개중 🟢" : "승인대기 🟠"}
                  </button>
                </td>

                {/* 삭제 버튼 */}
                <td className="p-4 text-center">
                  <button
                    onClick={() => onDelete(review.id)}
                    className="text-gray-300 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-all active:scale-90"
                    title="리뷰 삭제"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-20 text-center text-gray-400 font-medium"
                >
                  등록된 리뷰가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
