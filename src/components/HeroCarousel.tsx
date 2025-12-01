"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "기업 단체 DMZ 투어",
    subtitle: "팀 빌딩과 역사 교육을 한번에",
    description: "10인 이상 단체 예약 시 특별 할인 및 맞춤 일정 제공",
    image: "/hero-corporate-1.jpg",
    bgColor: "from-slate-700 to-slate-900",
  },
  {
    id: 2,
    title: "외국인 고객 접대 프로그램",
    subtitle: "한국 역사와 문화를 체험하는 특별한 시간",
    description: "영어/중국어/일본어 전문 가이드 동행 가능",
    image: "/hero-corporate-2.jpg",
    bgColor: "from-blue-700 to-blue-900",
  },
  {
    id: 3,
    title: "교육 기관 단체 투어",
    subtitle: "살아있는 역사 교육 현장",
    description: "학생 단체 특별가 및 교육 자료 제공",
    image: "/hero-corporate-3.jpg",
    bgColor: "from-emerald-700 to-emerald-900",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

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
    <div className="relative w-full h-[500px] overflow-hidden bg-gray-100">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`w-full h-full bg-gradient-to-r ${slide.bgColor} flex items-center justify-center`}
          >
            <div className="max-w-6xl mx-auto px-6 text-center text-white">
              <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
              <p className="text-2xl mb-3 text-gray-100">{slide.subtitle}</p>
              <p className="text-lg text-gray-200 mb-8">{slide.description}</p>
              <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                상담 신청하기
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrent(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? "bg-white w-8" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
