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
        /* ✅ 위치 통일: bottom-5, right-5 */
        fixed bottom-5 right-5 z-40
        
        /* ✅ 크기 통일: w-11 h-11 (44px) */
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
