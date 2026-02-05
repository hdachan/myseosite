"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { CheckCircle, Home, CalendarClock } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  // ✅ 타입 확인 (PAYMENT vs RESERVATION)
  const type = searchParams.get("type");
  const isReservation = type === "RESERVATION";

  // 장바구니 비우기 로직
  const shouldClearCart = searchParams.get("clearCart") === "true";
  const clearCart = useCartStore((state: any) => state.clearCart);

  const [isPopup, setIsPopup] = useState(false);

  useEffect(() => {
    // ✅ [1법칙: SEO] 검색 엔진 수집 차단 (noindex)
    // 결제 완료 페이지가 검색 결과에 노출되는 것을 방지합니다.
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);

    // 1. 팝업으로 열렸을 경우 부모창 새로고침 후 닫기 (PG사 결제용)
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

    // 2. 장바구니 비우기
    if (shouldClearCart || orderId) {
      clearCart();
    }

    // Cleanup: 컴포넌트 언마운트 시 메타 태그 정리
    return () => {
      if (document.head.contains(meta)) {
        document.head.removeChild(meta);
      }
    };
  }, [clearCart, orderId, shouldClearCart]);

  if (isPopup) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600 mb-4"></div>
        <p className="text-gray-600 font-bold text-lg">Confirming Payment...</p>
      </div>
    );
  }

  // ✅ 테마 색상 설정 (예약: 파랑 / 결제: 초록)
  const bgLight = isReservation ? "bg-blue-50" : "bg-green-50";
  const bgLighter = isReservation ? "bg-blue-100" : "bg-green-100";
  const textColor = isReservation ? "text-blue-500" : "text-green-500";
  const badgeText = isReservation ? "text-blue-700" : "text-green-700";
  const badgeBg = isReservation ? "bg-blue-500" : "bg-green-500";

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center pt-32 pb-12 px-4">
      <div className="max-w-lg w-full bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 md:p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* 아이콘 애니메이션 */}
        <div className="relative mx-auto w-24 h-24 mb-8">
          <div
            className={`absolute inset-0 ${bgLighter} rounded-full animate-ping opacity-20`}
          ></div>
          <div
            className={`relative ${bgLight} rounded-full w-full h-full flex items-center justify-center`}
          >
            {isReservation ? (
              <CalendarClock className={`w-12 h-12 ${textColor}`} />
            ) : (
              <CheckCircle className={`w-12 h-12 ${textColor}`} />
            )}
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
          {isReservation ? "Reservation Confirmed!" : "Great Choice!"}
        </h1>
        <p className="text-gray-500 mb-10 text-lg leading-relaxed">
          {isReservation
            ? "Your request has been received."
            : "Your payment was successful."}
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
              {orderId || "Processing..."}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
              Status
            </span>
            <span
              className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-bold ${bgLighter} ${badgeText}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${badgeBg} animate-pulse`}
              ></span>
              {isReservation ? "CONFIRMED (PAY LATER)" : "PAYMENT COMPLETED"}
            </span>
          </div>
        </div>

        {/* 버튼 그룹 */}
        <div className="grid grid-cols-1 gap-4">
          <Link
            href="/"
            className="group flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-all active:scale-95 shadow-md"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-gray-400">
          Having trouble?{" "}
          <Link
            href="/contact"
            className="text-gray-600 underline font-medium hover:text-gray-900 transition-colors"
          >
            Contact Support
          </Link>
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
          Loading...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
