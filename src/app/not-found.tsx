import Link from "next/link";
import { MapPinOff, Home } from "lucide-react";
import { hangameFont } from "@/lib/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Seoul City Tour", // 브라우저 탭에 깔끔하게 표시
  description: "Sorry, the page you are looking for does not exist.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    // ✅ [1. 레이아웃] max-w-6xl + px-8 lg:px-12 적용 (헤더/푸터와 정렬선 일치)
    <section className="w-full py-24 lg:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <div className="flex flex-col items-center justify-center text-center">
          {/* ✅ [3. 폰트/크기] 소제목(라벨): 10~11px, uppercase */}
          <span className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6">
            404 Error
          </span>

          {/* 아이콘 영역 */}
          <div className="w-20 h-20 bg-gray-50 rounded-[6px] flex items-center justify-center mb-6 text-[#4A7C7E]">
            <MapPinOff className="w-8 h-8" />
          </div>

          {/* ✅ [3. 폰트/크기] 제목(H2): text-xl~2xl + hangameFont */}
          <h2
            className={`${hangameFont.className} text-xl md:text-2xl font-bold text-gray-900 mb-4`}
          >
            Oops! You seem to be lost.
          </h2>

          {/* ✅ [3. 폰트/크기] 본문: text-sm + 기본 폰트 */}
          <p className="text-sm text-gray-500 max-w-md mx-auto mb-10 leading-7">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
            <br />
          </p>

          {/* 버튼: 라운드 6px */}
          <Link
            href="/"
            className="
              flex items-center gap-2 
              bg-[#4A7C7E] hover:bg-[#386061] 
              text-white text-sm font-bold py-3 px-6 
              rounded-[6px] transition-all shadow-sm
            "
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
