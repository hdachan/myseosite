"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "기업 단체 DMZ 투어",
    subtitle: "팀 빌딩과 역사 교육을 한번에",
    description: "10인 이상 단체 예약 시 특별 할인 및 맞춤 일정 제공",
    bgColor: "from-slate-800 via-slate-700 to-slate-900",
    accentColor: "amber",
  },
  {
    id: 2,
    title: "외국인 고객 접대 프로그램",
    subtitle: "한국 역사와 문화를 체험하는 특별한 시간",
    description: "영어/중국어/일본어 전문 가이드 동행 가능",
    bgColor: "from-blue-900 via-indigo-800 to-slate-900",
    accentColor: "blue",
  },
  {
    id: 3,
    title: "교육 기관 단체 투어",
    subtitle: "살아있는 역사 교육 현장",
    description: "학생 단체 특별가 및 교육 자료 제공",
    bgColor: "from-emerald-900 via-teal-800 to-slate-900",
    accentColor: "emerald",
  },
];

export default function LuxuryHeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gray-900">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <div
            className={`w-full h-full bg-gradient-to-br ${slide.bgColor} flex items-center justify-center relative`}
          >
            {/* 장식 요소들 */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/20" />
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            {/* 컨텐츠 */}
            <div className="max-w-5xl mx-auto px-6 md:px-8 text-center text-white relative z-10">
              {/* 상단 레이블 */}
              <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6 md:mb-8">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span className="text-xs md:text-sm font-light tracking-wider text-amber-100">
                  PREMIUM EXPERIENCE
                </span>
              </div>

              {/* 메인 타이틀 */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-light mb-4 md:mb-6 tracking-tight leading-tight">
                {slide.title}
              </h1>

              {/* 서브타이틀 */}
              <p className="text-lg md:text-2xl lg:text-3xl mb-3 md:mb-4 text-white/90 font-light">
                {slide.subtitle}
              </p>

              {/* 설명 */}
              <p className="text-sm md:text-lg lg:text-xl text-white/70 mb-8 md:mb-12 font-light max-w-2xl mx-auto">
                {slide.description}
              </p>

              {/* CTA 버튼들 */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group relative px-8 md:px-10 py-3 md:py-4 bg-white text-gray-900 font-medium tracking-wide overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/20">
                  <span className="relative z-10">상담 신청하기</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-white translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </button>

                <button className="px-8 md:px-10 py-3 md:py-4 border-2 border-white/30 text-white font-light tracking-wide backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300">
                  자세히 보기
                </button>
              </div>
            </div>

            {/* 하단 그라데이션 */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 md:p-4 rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-110 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 md:p-4 rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-110 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Progress Bar & Dots Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        {/* Dots */}
        <div className="flex gap-2 md:gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrent(index);
              }}
              className={`relative h-1 md:h-1.5 rounded-full transition-all duration-500 ${
                index === current
                  ? "bg-white w-12 md:w-16"
                  : "bg-white/40 w-8 md:w-10 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === current && (
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-white rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Slide Counter */}
        <div className="text-white/60 text-xs md:text-sm font-light tracking-wider">
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </div>
      </div>

      {/* 장식 라인 */}
      <div className="absolute left-0 top-1/2 w-20 h-px bg-gradient-to-r from-transparent to-white/20" />
      <div className="absolute right-0 top-1/2 w-20 h-px bg-gradient-to-l from-transparent to-white/20" />
    </div>
  );
}
