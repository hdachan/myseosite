"use client";

import { useState } from "react";
import { usePathname } from "next/navigation"; // ✅ 경로 확인을 위해 추가
import { MessageCircle, X, MessageSquare } from "lucide-react";

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // ✅ 현재 경로 가져오기

  // ✅ admin 또는 studio 페이지에서는 아무것도 표시하지 않음
  if (pathname.startsWith("/admin") || pathname.startsWith("/studio")) {
    return null;
  }

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-20 right-5 z-50 flex flex-col items-end gap-3">
      {/* 1. 카카오톡 */}
      <div
        className={`
          flex items-center gap-2 transition-all duration-300 transform
          ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-10 scale-0 pointer-events-none"
          }
        `}
      >
        <span className="bg-white text-gray-800 text-[10px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap">
          KakaoTalk
        </span>
        <a
          href="https://qr.kakao.com/talk/_MUOV7whPhIbnJ4Kx6NszOwhnTo-"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-[#FEE500] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform text-[#3c1e1e]"
          aria-label="Chat on KakaoTalk"
        >
          <MessageSquare fill="currentColor" className="w-5 h-5" />
        </a>
      </div>

      {/* 2. 왓츠앱 */}
      <div
        className={`
          flex items-center gap-2 transition-all duration-300 delay-75 transform
          ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-10 scale-0 pointer-events-none"
          }
        `}
      >
        <span className="bg-white text-gray-800 text-[10px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap">
          WhatsApp
        </span>
        <a
          href="https://api.whatsapp.com/message/WAPNAALNN7UUL1"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform text-white"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
      </div>

      {/* 3. 메인 버튼 */}
      <button
        onClick={toggleMenu}
        aria-label="Open chat menu"
        className={`
          w-11 h-11 md:w-12 md:h-12 rounded-full 
          flex items-center justify-center
          shadow-xl hover:shadow-2xl
          transition-all duration-300
          text-white
          ${isOpen ? "bg-gray-600 rotate-90" : "bg-red-800 hover:bg-red-900 hover:scale-105"}
        `}
      >
        {isOpen ? (
          <X className="w-6 h-6" strokeWidth={2.5} />
        ) : (
          <MessageCircle className="w-6 h-6" strokeWidth={2.5} />
        )}
      </button>
    </div>
  );
}
