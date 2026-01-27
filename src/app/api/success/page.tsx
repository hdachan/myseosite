"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { CheckCircle, Home, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const shouldClearCart = searchParams.get("clearCart") === "true";
  const clearCart = useCartStore((state: any) => state.clearCart);

  const [isPopup, setIsPopup] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.opener &&
      !window.opener.closed
    ) {
      setIsPopup(true);
      try {
        window.opener.location.href = window.location.href;
        setTimeout(() => {
          window.close();
        }, 500);
      } catch (e) {
        console.error("Parent control failed", e);
      }
      return;
    }

    if (shouldClearCart || orderId) {
      clearCart();
    }
  }, [clearCart, orderId, shouldClearCart]);

  if (isPopup) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600 mb-4"></div>
        <p className="text-gray-600 font-bold text-lg">Confirming Payment...</p>
      </div>
    );
  }

  return (
    // pt-24 ~ pt-32: 헤더 높이를 고려한 상단 여백
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center pt-24 pb-12 px-4">
      <div className="max-w-lg w-full bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 md:p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* 성공 아이콘 애니메이션 효과 */}
        <div className="relative mx-auto w-24 h-24 mb-8">
          <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20"></div>
          <div className="relative bg-green-50 rounded-full w-full h-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
          Great Choice!
        </h1>
        <p className="text-gray-500 mb-10 text-lg leading-relaxed">
          Your reservation is confirmed.
          <br />
          We&apos;ve sent the itinerary to your email.
        </p>

        {/* 상세 영수증 정보 카드 */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-10 text-left space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-gray-200/60">
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
              Order ID
            </span>
            <span className="text-sm font-mono font-bold text-gray-900 bg-white px-3 py-1 rounded-md border border-gray-200">
              {orderId || "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
              Payment Status
            </span>
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-bold bg-green-100 text-green-700">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              COMPLETED
            </span>
          </div>
        </div>

        {/* 버튼 그룹 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/"
            className="group flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>

          <button
            onClick={() => alert("Redirecting to My Bookings...")}
            className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-50 transition-all active:scale-95"
          >
            <FileText className="w-4 h-4" />
            <span>My Bookings</span>
          </button>
        </div>

        <button className="mt-8 text-sm text-gray-400 hover:text-gray-600 flex items-center justify-center gap-1 mx-auto transition-colors">
          Print Receipt <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-gray-400">
          Having trouble?{" "}
          <a
            href="mailto:help@seoulcitytour.com"
            className="text-gray-600 underline font-medium"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-400 font-medium">
          Preparing your receipt...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
