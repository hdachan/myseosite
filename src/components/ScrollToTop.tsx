"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // ✅ 경로 확인을 위해 추가
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname(); // ✅ 현재 경로 가져오기

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ admin 또는 studio 페이지에서는 아무것도 표시하지 않음
  if (pathname.startsWith("/admin") || pathname.startsWith("/studio")) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-5 right-5 z-40
        w-11 h-11 md:w-12 md:h-12 rounded-full
        bg-red-800 text-white
        flex items-center justify-center
        shadow-xl hover:shadow-2xl     
        transition-all duration-300
        hover:bg-red-900 hover:scale-105
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
      `}
    >
      <ChevronUp className="w-6 h-6" strokeWidth={2.5} />
    </button>
  );
}
