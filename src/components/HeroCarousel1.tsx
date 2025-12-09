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
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* 이미지 컨테이너 */}
      <div className="relative w-full h-[800px] md:h-[900px]">
        {/* 배경 이미지 */}
        <Image
          src="/images/background_v3.jpg"
          alt="Korea travel background"
          fill
          sizes="100vw"
          priority
          quality={95}
          className="object-cover object-center z-0"
        />

        {/* 어둡게 오버레이 - 검은색으로 변경 */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* 중앙 콘텐츠 */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 drop-shadow-2xl">
            Do you want to
            <br />
            <span className="bg-gradient-to-r from-white to-[#D4A017] bg-clip-text text-transparent">
              experience real Korea?
            </span>
          </h1>
          {/* 검색 박스 */}
          <div className="w-full max-w-2xl mb-8">
            <div className="flex bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200 hover:border-[#D4A017]/50 transition-all duration-300">
              <div className="flex-1 flex items-center px-6 py-4">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search for tours, destinations, experiences..."
                  className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 outline-none text-sm md:text-base"
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-[#8B1E26] hover:bg-[#6E0D0D] px-8 md:px-10 transition-all duration-300 flex items-center justify-center group"
                aria-label="Search"
              >
                <span className="text-white font-semibold text-sm md:text-base">
                  Search
                </span>
              </button>
            </div>

            {/* 인기 검색어 */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <span className="text-white/70 text-xs md:text-sm">Popular:</span>
              {["DMZ Tour", "Palace Tour", "K-Drama Tour", "Food Tour"].map(
                (keyword) => (
                  <button
                    key={keyword}
                    onClick={() => setSearchQuery(keyword)}
                    className="text-xs md:text-sm text-white/80 hover:text-[#D4A017] bg-white/10 hover:bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full transition-all duration-200"
                  >
                    {keyword}
                  </button>
                )
              )}
            </div>
          </div>

          {/* scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center gap-2 animate-bounce">
              <span className="text-white/70 text-xs tracking-widest font-medium">
                Scroll Down
              </span>
              <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                <div className="w-1 h-2 bg-white/70 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
