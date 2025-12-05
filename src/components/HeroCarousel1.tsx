"use client";

import { useState } from "react";
import Image from "next/image";

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
      <div className="relative w-full h-[930px]">
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

        {/* 어둡게 오버레이 */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>

        {/* 중앙 콘텐츠 */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-white text-5xl md:text-7xl font-bold leading-tight mb-4">
            Do you want to
            <br />
            experience real Korea?
          </h1>

          <p className="text-white text-lg md:text-xl max-w-2xl opacity-90 mb-10">
            The beginning of a new experience that satisfies both domestic and
            foreign visitors.
          </p>

          {/* 검색 박스 */}
          <div className="flex w-full max-w-2xl bg-white/20 backdrop-blur-md rounded-full overflow-hidden shadow-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Please enter your search term"
              className="flex-1 px-8 py-5 bg-transparent text-white placeholder-white/70 outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-purple-600 hover:bg-purple-700 px-8 transition"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="white"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          {/* scroll */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center gap-3 animate-bounce">
              <span className="text-white/80 text-sm tracking-widest">
                Scroll
              </span>
              <svg
                className="w-6 h-6 text-white/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
