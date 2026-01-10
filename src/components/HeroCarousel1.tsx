"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
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
      {/* 📉 높이 최적화: 시각적 피로도 줄임 */}
      <div className="relative w-full h-[550px] sm:h-[650px] md:h-[750px]">
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
          {/* ✅ H1: 짧고 강렬한 SEO & 감동 멘트 */}
          <h1
            className={`${titleFont.className} text-white leading-none drop-shadow-2xl mb-6 max-w-5xl mx-auto`}
          >
            {/* 회사명(SEO) + 핵심 가치(Walks for You)를 한 문장으로 통합 */}
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="text-[#E8DCC4]">Seoul City Tour</span> Walks for
              You, <br className="hidden sm:block" />
              Not Just the View.
            </span>
          </h1>

          {/* ✅ 서브 메시지: 간결해진 문구 적용 */}
          <div className="space-y-1 mb-8 max-w-2xl mx-auto px-6">
            <p className="text-base sm:text-lg md:text-xl text-white/90 font-light leading-relaxed tracking-wide">
              Places fade, but the warmth of walking together lasts forever.
            </p>
          </div>

          {/* 🔍 검색 영역 */}
          <div
            ref={wrapperRef}
            className="relative w-full max-w-md sm:max-w-lg mb-4"
          >
            <div className="flex bg-white rounded-lg overflow-hidden shadow-2xl border border-gray-200">
              <div className="flex-1 flex items-center px-4 py-2.5">
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
              <button className="bg-[#4A7C7E] hover:bg-[#3D6566] px-5 transition">
                <span className="text-white font-semibold text-sm">Search</span>
              </button>
            </div>

            {/* 🔽 검색 결과 드롭다운 */}
            {open && searchQuery.trim() && (
              <div
                className="
                  absolute z-50 mt-2 w-full
                  bg-white rounded-xl shadow-2xl
                  max-h-[240px] 
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
                      className="w-full flex items-center gap-4 px-4 py-3 hover:bg-gray-50 text-left border-b border-gray-100 last:border-0"
                    >
                      <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0">
                        <Image
                          src={tour.image}
                          alt={tour.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 line-clamp-1 mb-0.5">
                          {highlight(tour.title, searchQuery)}
                        </p>
                        <p className="text-xs text-gray-500 mb-0.5">
                          {highlight(tour.location, searchQuery)}
                        </p>
                        <p className="text-sm font-semibold text-[#4A7C7E]">
                          from ${tour.price}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}

            {/* ✅ 인기 검색어: 감동 라인과 어울리는 '관계' 중심 태그 */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
              <span className="text-white/70 text-[10px] uppercase tracking-wider">
                Popular:
              </span>
              {/* 👇 "Walking Together", "Local Friend" 등 브랜딩 일치 키워드 */}
              {["Walking Together", "Local Friend", "Private Story", "DMZ"].map(
                (keyword) => (
                  <button
                    key={keyword}
                    onClick={() => {
                      setSearchQuery(keyword);
                      setOpen(true);
                    }}
                    className="
                      text-[10px] text-white/80
                      hover:text-[#D97959]
                      bg-white/10 hover:bg-white/20
                      backdrop-blur-sm
                      px-2.5 py-0.5 rounded-full
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
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center gap-1 animate-bounce">
              <div className="w-5 h-8 rounded-full border border-white/40 flex justify-center p-1.5">
                <div className="w-1 h-1.5 bg-white/80 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
