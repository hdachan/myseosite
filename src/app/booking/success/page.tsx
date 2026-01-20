"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle, Home, Receipt, MapPin } from "lucide-react";
import Link from "next/link";

// 1. 실제 내용을 보여주는 컴포넌트
function SuccessContent() {
  const searchParams = useSearchParams();

  // URL에서 ?orderId=ORD_... 값을 가져옴
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-500">
        {/* 상단: 성공 아이콘 영역 */}
        <div className="bg-green-600 p-8 text-center">
          <div className="mx-auto w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Payment Successful!
          </h1>
          <p className="text-green-100 text-sm">Thank you for your booking.</p>
        </div>

        {/* 하단: 주문 정보 및 버튼 */}
        <div className="p-8">
          {/* 주문번호 박스 */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 mb-8">
            <div className="flex items-start gap-3 mb-4 border-b border-gray-200 pb-4">
              <Receipt className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                  Order Number
                </p>
                <p className="text-sm font-mono text-gray-900 font-bold break-all">
                  {orderId || "Processing..."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                  Status
                </p>
                <p className="text-sm font-bold text-green-600">
                  Paid & Confirmed
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mb-8">
            A confirmation email has been sent to your inbox.
            <br />
            (We look forward to seeing you!)
          </p>

          {/* 버튼 그룹 */}
          <div className="space-y-3">
            <Link
              href="/"
              className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Home className="w-5 h-5" />
              Return to Home
            </Link>

            <button
              onClick={() => alert("나중에 마이페이지 만들면 연결하세요!")}
              className="w-full bg-white border-2 border-gray-100 text-gray-600 font-bold py-4 rounded-xl hover:bg-gray-50 hover:border-gray-200 transition flex items-center justify-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              View My Tours
            </button>
          </div>
        </div>
      </div>

      <p className="mt-8 text-xs text-gray-400">
        Need help? help@seoulcitytour.com
      </p>
    </div>
  );
}

// 2. Suspense로 감싸기 (Next.js 필수 규칙)
// URL 파라미터를 읽는 페이지는 반드시 Suspense가 필요합니다.
export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
