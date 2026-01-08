"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

// 👇 basicPackages 가져오기
import { basicPackages as packageTours } from "@/app/package/packageData";

import { East_Sea_Dokdo } from "next/font/google";

const titleFont = East_Sea_Dokdo({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

/* 🔎 검색어 하이라이트 */
function highlight(text: string, keyword: string) {
  if (!keyword) return text;

  const regex = new RegExp(`(${keyword})`, "ig");
  return text.split(regex).map((part, i) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <span key={i} className="text-[#D97959] font-semibold">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function HeroCarousel1() {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  /* 🔍 검색 결과 */
  const results = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const q = searchQuery.toLowerCase();
    return packageTours.filter(
      (tour) =>
        tour.title.toLowerCase().includes(q) ||
        tour.location.toLowerCase().includes(q) ||
        tour.keywords?.some((k) => k.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  /* 👉 상품 선택 */
  const handleSelect = (slug: string) => {
    setOpen(false);
    setSearchQuery("");
    router.push(`/package/${slug}`);
  };

  /* ⌨️ 키보드 제어 */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && results.length > 0) {
      handleSelect(results[0].slug);
    }

    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  /* 🖱️ 바깥 클릭 시 닫힘 */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative w-full h-[700px] sm:h-[800px] md:h-[900px]">
        {/* 배경 */}
        <Image
          src="/images/background_v3.png"
          alt="Korea travel background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
          <h1
            className={`
              ${titleFont.className} 
              text-white leading-none mb-6 drop-shadow-2xl
              text-5xl sm:text-6xl md:text-7xl lg:text-8xl
            `}
          >
            <span className="block mb-2 tracking-wide">
              Seoul, DMZ & Nami Island
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-3 text-[#D4B896] opacity-90">
              Discover the Real Korea
            </span>
          </h1>

          {/* 🔍 검색 영역 */}
          <div
            ref={wrapperRef}
            className="relative w-full max-w-xl sm:max-w-2xl mb-8"
          >
            <div className="flex bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-200">
              <div className="flex-1 flex items-center px-4 py-3">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setOpen(true);
                  }}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setOpen(true)}
                  placeholder="Where do you want to go?"
                  className="
                    flex-1 bg-transparent outline-none
                    text-sm text-gray-800 placeholder-gray-400
                  "
                />
              </div>

              <button className="bg-[#4A7C7E] hover:bg-[#3D6566] px-6 transition">
                <span className="text-white font-semibold text-sm">Search</span>
              </button>
            </div>

            {/* 🔽 검색 결과 드롭다운 */}
            {open && searchQuery.trim() && (
              <div
                className="
                  absolute z-50 mt-2 w-full
                  bg-white rounded-xl shadow-2xl
                  max-h-[260px] 
                  overflow-y-auto overscroll-contain
                "
              >
                {results.length === 0 ? (
                  <div className="px-4 py-6 text-sm text-gray-500 text-center">
                    No tours found
                  </div>
                ) : (
                  results.map((tour) => (
                    <button
                      key={tour.id}
                      onClick={() => handleSelect(tour.slug)}
                      className="w-full flex items-center gap-5 px-5 py-5 hover:bg-gray-50 text-left border-b border-gray-100 last:border-0"
                    >
                      {/* 👇 [수정됨] shadow-md 제거하고 rounded만 살짝 남김 (박스 느낌 제거) */}
                      <div className="relative w-24 h-24 rounded-md overflow-hidden shrink-0">
                        <Image
                          src={tour.image}
                          alt={tour.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-bold text-gray-900 line-clamp-1 mb-1">
                          {highlight(tour.title, searchQuery)}
                        </p>
                        <p className="text-sm text-gray-500 mb-1">
                          {highlight(tour.location, searchQuery)}
                        </p>
                        <p className="text-base font-semibold text-[#4A7C7E]">
                          from ${tour.price}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}

            {/* ✅ 인기 검색어 */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <span className="text-white/70 text-xs">Popular:</span>
              {["DMZ & JSA", "Nami Island", "City Tour", "Private Car"].map(
                (keyword) => (
                  <button
                    key={keyword}
                    onClick={() => {
                      setSearchQuery(keyword);
                      setOpen(true);
                    }}
                    className="
                      text-xs text-white/80
                      hover:text-[#D97959]
                      bg-white/10 hover:bg-white/20
                      backdrop-blur-sm
                      px-3 py-1 rounded-full
                      transition
                    "
                  >
                    {keyword}
                  </button>
                )
              )}
            </div>
          </div>

          {/* 스크롤 인디케이터 */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center gap-2 animate-bounce">
              <span className="text-white/70 text-[10px] tracking-widest">
                SCROLL
              </span>
              <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center p-2">
                <div className="w-1 h-2 bg-white/70 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
