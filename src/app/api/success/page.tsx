"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { CheckCircle, Home, FileText } from "lucide-react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL에서 주문번호 가져오기
  const orderId = searchParams.get("orderId");

  // (선택사항) 여기서 Supabase로 주문 정보를 다시 조회해서 뿌려줄 수도 있습니다.
  // 지금은 일단 심플하게 "성공했다"는 것만 보여줍니다.

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center animate-in fade-in zoom-in duration-300">
        {/* 성공 아이콘 */}
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-gray-500 mb-8">
          Thank you for your reservation.
          <br />
          Your payment has been successfully processed.
        </p>

        {/* 주문 정보 박스 */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8 text-left border border-gray-100">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-500">Order Number</span>
            <span className="text-sm font-bold text-gray-900">
              {orderId || "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Status</span>
            <span className="text-sm font-bold text-green-600">
              Paid (Payment Complete)
            </span>
          </div>
        </div>

        {/* 버튼들 */}
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go to Home
          </Link>

          <button
            onClick={() =>
              alert("이 기능은 나중에 '마이페이지' 만들면 연결하세요!")
            }
            className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            View Booking Details
          </button>
        </div>
      </div>

      <p className="mt-8 text-xs text-gray-400">
        Need help? Contact us at help@seoulcitytour.com
      </p>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={<div className="p-10 text-center">Loading receipt...</div>}
    >
      <SuccessContent />
    </Suspense>
  );
}
