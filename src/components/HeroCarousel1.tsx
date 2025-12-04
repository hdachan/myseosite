"use client";

export default function HeroCarousel1() {
  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://archive.visitseoul.net/upload/encoding/image/2023/11//migImg204.jpg)`,
        }}
      >
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4">
        <div className="text-center text-white max-w-4xl">
          {/* Main Question */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            진짜 한국을
            <br />
            경험하고 싶으신가요?
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-2xl font-light text-white/90 mb-10">
            국내외 방문객 모두를 만족시키는 새로운 경험의 시작
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="여기에서 검색어를 입력하세요"
                className="w-full px-6 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-white/50 pr-14"
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                aria-label="검색"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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
          </div>
        </div>
      </div>
    </div>
  );
}
