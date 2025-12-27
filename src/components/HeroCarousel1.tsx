"use client";

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

export default function HeroCarousel1() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative w-full h-[700px] sm:h-[800px] md:h-[900px]">
        {/* 배경 이미지 */}
        <Image
          src="/images/background_v3.png"
          alt="Korea travel background"
          fill
          sizes="100vw"
          priority
          quality={95}
          className="object-cover object-center z-0"
        />

        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black/0 z-10" />

        {/* 중앙 콘텐츠 */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
          {/* 타이틀 (사이즈 ↓) */}
          <h1
            className="
              text-white font-bold leading-tight mb-6 drop-shadow-2xl
              text-[24px] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
            "
          >
            <span className="block">DMZ & Seoul Tours —</span>
            <span className="block bg-gradient-to-r from-white to-[#D4B896] bg-clip-text text-transparent">
              Experience the Real Korea
            </span>
          </h1>

          {/* 검색 박스 */}
          <div className="w-full max-w-xl sm:max-w-2xl mb-8">
            <div className="flex bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-200">
              {/* 입력 */}
              <div className="flex-1 flex items-center px-4 py-3">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search tours or destinations"
                  className="
                    flex-1 bg-transparent outline-none
                    text-sm text-gray-800 placeholder-gray-400
                  "
                />
              </div>

              {/* 버튼 */}
              <button
                onClick={handleSearch}
                aria-label="Search"
                className="bg-[#4A7C7E] hover:bg-[#3D6566] px-6 transition"
              >
                <span className="text-white font-semibold text-sm">Search</span>
              </button>
            </div>

            {/* 인기 검색어 (사이즈 ↓) */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <span className="text-white/70 text-xs">Popular:</span>
              {["DMZ Tour", "Palace Tour", "K-Drama Tour", "Food Tour"].map(
                (keyword) => (
                  <button
                    key={keyword}
                    onClick={() => setSearchQuery(keyword)}
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
