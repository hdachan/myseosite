import React from "react";

/**
 * LoaderVariant
 * - fullscreen : 페이지 전체를 덮는 로딩 (결제, 페이지 전환, 치명적 작업)
 * - section    : 특정 영역(카드, 리스트, 위젯) 안에서만 로딩 (스피너만 표시)
 */
type LoaderVariant = "fullscreen" | "section";

interface LoaderProps {
  variant?: LoaderVariant;
  message?: string;
  subMessage?: string;
}

/**
 * FullScreenLoader
 *
 * 사용 예시:
 *
 * 1️⃣ 전체 화면 로딩
 * <FullScreenLoader />
 *
 * 2️⃣ 전체 화면 로딩 + 메시지 변경
 * <FullScreenLoader
 *   message="Payment processing"
 *   subMessage="Do not refresh the page"
 * />
 *
 * 3️⃣ 섹션(중간 영역) 로딩 - 스피너만 표시
 * <FullScreenLoader variant="section" />
 */
export default function FullScreenLoader({
  variant = "fullscreen",
  message = "Preparing the best tours for you...",
  subMessage = "Please check back in a moment.",
}: LoaderProps) {
  const isFull = variant === "fullscreen";

  return (
    <div
      className={
        isFull
          ? // ✅ 전체 화면 로딩
            "fixed inset-0 bg-white z-50 flex items-center justify-center"
          : // ✅ 섹션 로딩 - 배경 제거, 스피너만 중앙에
            "w-full py-20 flex items-center justify-center"
      }
    >
      <div className="flex flex-col items-center text-center">
        {/* 심플 스피너 */}
        <div className="w-10 h-10 border-4 border-gray-200 border-t-[#4A7C7E] rounded-full animate-spin mb-4" />

        {/* ✅ fullscreen일 때만 메시지 표시 */}
        {isFull && (
          <>
            {/* 메인 메시지 */}
            <p className="text-gray-600 text-lg font-medium">{message}</p>

            {/* 서브 메시지 */}
            <p className="text-gray-400 text-sm mt-1">{subMessage}</p>
          </>
        )}
      </div>
    </div>
  );
}
