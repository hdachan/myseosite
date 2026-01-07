"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        fixed bottom-6 right-6 z-40
        w-14 h-14 rounded-full
        bg-red-800 text-white
        flex items-center justify-center
        shadow-2xl hover:shadow-xl     
        transition-all duration-300
        hover:bg-red-900 hover:scale-105
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
      `}
    >
      {/* 아이콘 크기 통일 (w-7 h-7 = 28px) */}
      <ChevronUp className="w-7 h-7" strokeWidth={2.5} />
    </button>
  );
}
