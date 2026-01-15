"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { basicPackages as packageTours } from "@/app/package/packageData";

/* ✅ 폰트 가져오기 */
import { hangameFont } from "@/lib/fonts";

/* 🔎 검색어 하이라이트 함수 */
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

  /* 🔍 검색 결과 로직 */
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

  /* 👉 페이지 이동 */
  const handleSelect = (slug: string) => {
    setOpen(false);
    setSearchQuery("");
    router.push(`/package/${slug}`);
  };

  /* ⌨️ 키보드 처리 */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && results.length > 0) {
      handleSelect(results[0].slug);
    }
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  /* 🖱️ 바깥 클릭 시 닫기 */
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
    // ✅ [수정됨] 헤더 높이만큼 아래로 띄워줌 (mt-16: 모바일 64px / mt-20: PC 80px)
    <div className="relative w-full overflow-hidden mt-16 md:mt-20">
      {/* 📉 높이 설정 */}
      <div className="relative w-full h-[550px] sm:h-[650px] md:h-[750px]">
        {/* 1. 배경 이미지 */}
        <Image
          src="/images/background_v3.png"
          alt="Korea travel background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* 2. 메인 콘텐츠 */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
          {/* ✅ 텍스트 영역 컨테이너 (붓질 효과 적용 구간) */}
          <div className="relative max-w-5xl mx-auto mb-8 py-8">
            {/* ✨ [핵심] 붓질 효과 배경 (여러 개의 불규칙한 레이어 겹침) ✨ */}
            {/* 글씨 뒤(-z-10)에 위치하며, blur 효과로 뭉개서 붓터치 느낌 구현 */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center select-none pointer-events-none">
              {/* 붓터치 1: 왼쪽에서 오른쪽 아래로 내려가는 큰 획 */}
              <div
                className="absolute w-[130%] h-[60%] bg-black/50 blur-[80px] -rotate-6 rounded-[40%]"
                style={{ transformOrigin: "center" }}
              />
              {/* 붓터치 2: 반대 방향으로 가로지르는 획 */}
              <div
                className="absolute w-[110%] h-[50%] bg-black/40 blur-[90px] rotate-3 rounded-[30%]"
                style={{ transformOrigin: "center" }}
              />
              {/* 붓터치 3: 중앙을 잡아주는 뭉툭한 덩어리 */}
              <div className="absolute w-[90%] h-[80%] bg-black/30 blur-[100px] rounded-full" />
            </div>

            {/* H1: 한게임 포커체 (글씨는 붓터치 위 z-10) */}
            <h1
              className={`${hangameFont.className} text-white leading-tight relative z-10`}
            >
              <span className="flex flex-col items-center">
                {/* 메인 타이틀: 그림자는 은은하게 (drop-shadow-lg) */}
                <span className="font-normal text-[#E8DCC4] text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-3 tracking-wide drop-shadow-lg">
                  Seoul City Tour
                </span>

                {/* 서브 타이틀 */}
                <span className="font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-normal opacity-100 drop-shadow-md">
                  Walks for You, Not Just the View.
                </span>
              </span>
            </h1>

            {/* 서브 메시지 */}
            <div className="mt-6 relative z-10">
              <p className="font-normal sm:text-lg md:text-xl text-white leading-relaxed tracking-wide font-sans opacity-100 drop-shadow-md">
                Places fade, but the warmth of walking together lasts forever.
              </p>
            </div>
          </div>

          {/* 🔍 검색창 영역 */}
          <div
            ref={wrapperRef}
            className="relative w-full max-w-md sm:max-w-lg mb-4 drop-shadow-2xl z-20"
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
              <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-2xl max-h-[240px] overflow-y-auto overscroll-contain">
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

            {/* 인기 검색어 */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
              <span className="text-white/90 font-bold text-[10px] uppercase tracking-wider drop-shadow-md">
                Popular:
              </span>
              {["Walking Together", "Local Friend", "Private Story", "DMZ"].map(
                (keyword) => (
                  <button
                    key={keyword}
                    onClick={() => {
                      setSearchQuery(keyword);
                      setOpen(true);
                    }}
                    className="
                      text-[10px] text-white font-medium
                      hover:text-[#D97959]
                      bg-black/30 hover:bg-black/50
                      backdrop-blur-sm
                      px-2.5 py-0.5 rounded-full
                      transition
                      border border-white/10 shadow-sm
                    "
                  >
                    {keyword}
                  </button>
                )
              )}
            </div>
          </div>

          {/* 스크롤 인디케이터 */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
            <div className="flex flex-col items-center gap-1 animate-bounce">
              <div className="w-5 h-8 rounded-full border border-white/60 flex justify-center p-1.5 shadow-lg">
                <div className="w-1 h-1.5 bg-white rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
