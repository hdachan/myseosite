"use client";

import { useState, useEffect } from "react";

export default function HeroCarousel1() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1583739427959-e5635bd61c02?w=1920&q=80",
      title: "분단의 현장을 직접 체험하는",
      subtitle: "DMZ 투어",
      description: "제3터널 입장 + 도라전망대 전망 포함",
      badge: "서울 출발",
    },
    {
      image:
        "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?w=1920&q=80",
      title: "한국 전통의 아름다움",
      subtitle: "경복궁 & 북촌한옥마을",
      description: "역사와 문화가 살아 숨쉬는 서울 탐방",
      badge: "베스트셀러",
    },
    {
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&q=80",
      title: "서울의 밤을 수놓는",
      subtitle: "남산타워 야경 투어",
      description: "케이블카 + 전망대 입장권 포함",
      badge: "추천",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center justify-center px-4">
            <div className="text-center text-white max-w-4xl">
              {/* Badge */}
              <div className="mb-4">
                <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  {slide.badge}
                </span>
              </div>

              {/* Main Title */}
              <h2 className="text-2xl md:text-3xl font-light mb-2 tracking-wide">
                {slide.title}
              </h2>

              {/* Subtitle - Main Focus */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                {slide.subtitle}
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl font-light mb-8 text-white/90">
                {slide.description}
              </p>

              {/* CTA Button */}
              <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                투어 자세히 보기
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-10 h-2 bg-white"
                : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
        aria-label="이전 슬라이드"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
        aria-label="다음 슬라이드"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
