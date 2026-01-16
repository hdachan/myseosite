"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { basicPackages as packageTours } from "@/app/package/packageData";
import { hangameFont } from "@/lib/fonts";

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

  const handleSelect = (slug: string) => {
    setOpen(false);
    setSearchQuery("");
    router.push(`/package/${slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && results.length > 0) {
      handleSelect(results[0].slug);
    }
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

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
    <div className="relative w-full overflow-hidden mt-16 md:mt-20">
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

        {/* 배경 그라디언트 */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          // style={{
          //   background:
          //     "radial-gradient(circle at center, rgba(26, 24, 24, 0.54) 20%, rgba(47, 42, 42, 0) 80%)",
          // }}
        />

        {/* 2. 메인 콘텐츠 */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
          <div className="relative max-w-5xl mx-auto mb-8 py-8">
            <h1
              className={`${hangameFont.className} text-white leading-tight relative z-10`}
            >
              <span className="flex flex-col items-center">
                {/* ✅ 수정됨: 
                   모바일: text-4xl (기존 5xl보다 작게)
                   색상: text-white (흰색 유지)
                */}
                <span className="font-bold text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-3 tracking-wide">
                  Seoul City Tour
                </span>

                {/* ✅ 수정됨: 
                   모바일: text-xl (기존 2xl보다 작게)
                */}
                <span className="font-normal text-xl sm:text-3xl md:text-4xl lg:text-5xl tracking-normal opacity-100">
                  Walks for You, Not Just the View.
                </span>
              </span>
            </h1>
          </div>

          <div
            ref={wrapperRef}
            className="relative w-full max-w-md sm:max-w-lg mb-4 z-20"
          >
            <div className="flex bg-white rounded-lg overflow-hidden border border-gray-200">
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
                  className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                />
              </div>
              <button className="bg-[#4A7C7E] hover:bg-[#3D6566] px-5 transition">
                <span className="text-white font-semibold text-sm">Search</span>
              </button>
            </div>

            {open && searchQuery.trim() && (
              <div className="absolute z-50 mt-2 w-full bg-white rounded-xl border border-gray-200 max-h-[240px] overflow-y-auto overscroll-contain">
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

            <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
              <span className="text-white/90 font-bold text-[10px] uppercase tracking-wider">
                Popular:
              </span>
              {["DMZ", "JSA", "Drama", "ski"].map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => {
                    setSearchQuery(keyword);
                    setOpen(true);
                  }}
                  className="text-[10px] text-white font-medium hover:text-[#D97959] bg-black/30 hover:bg-black/50 backdrop-blur-sm px-2.5 py-0.5 rounded-full transition border border-white/10"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
            <div className="flex flex-col items-center gap-1 animate-bounce">
              <div className="w-5 h-8 rounded-full border border-white/60 flex justify-center p-1.5">
                <div className="w-1 h-1.5 bg-white rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
