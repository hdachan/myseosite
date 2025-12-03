"use client";

import React from "react";
import { ChevronLeft, ChevronRight, Star, MapPin } from "lucide-react";

interface TourPackage {
  id: number;
  image: string;
  title: string;
  location: string;
  duration: string;
  tags: string[];
  price: string;
  rating: number;
}

const LuxuryTourSection = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const tourPackages: TourPackage[] = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=1000&fit=crop",
      title: "싱가포르 프리미엄",
      location: "싱가포르",
      duration: "5일",
      tags: ["노쇼핑", "노팁", "특급호텔"],
      price: "1,249,900",
      rating: 4.9,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=1000&fit=crop",
      title: "튀르키예 그랜드 투어",
      location: "터키",
      duration: "9일",
      rating: 4.8,
      tags: ["전문인솔자", "국내선2회", "5성급"],
      price: "2,329,000",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=1000&fit=crop",
      title: "치앙마이 로얄 에디션",
      location: "태국",
      duration: "6일",
      rating: 4.7,
      tags: ["노팁", "럭셔리 리조트", "스파포함"],
      price: "1,119,900",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=1000&fit=crop",
      title: "발리 프라이빗 빌라",
      location: "인도네시아",
      duration: "5일",
      rating: 5.0,
      tags: ["자유여행", "프라이빗풀", "올인클루시브"],
      price: "899,900",
    },
  ];

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const itemsPerView = isMobile ? 1 : 4;
  const maxIndex = Math.max(0, tourPackages.length - itemsPerView);

  const handlePrev = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));

  return (
    <div className="w-full bg-gradient-to-b from-slate-50 to-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* 헤더 섹션 */}
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-block px-4 md:px-6 py-1.5 md:py-2 bg-amber-50 border border-amber-200 mb-3 md:mb-4">
            <span className="text-amber-800 text-xs md:text-sm font-medium tracking-wider">
              LUXURY COLLECTION
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-2 md:mb-4">
            프리미엄 여행 컬렉션
          </h2>
          <p className="text-gray-600 text-base md:text-lg font-light">
            당신만을 위한 특별한 여정
          </p>
        </div>

        {/* 투어 카드 슬라이더 */}
        <div className="relative">
          {/* 네비게이션 버튼 */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm p-2 md:p-4 rounded-full shadow-2xl border border-gray-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm p-2 md:p-4 rounded-full shadow-2xl border border-gray-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
          </button>

          <div className="overflow-hidden px-1">
            <div
              className="flex transition-transform duration-700 ease-out gap-3 md:gap-6"
              style={{
                transform: isMobile
                  ? `translateX(calc(-${currentIndex * 100}% - ${
                      currentIndex * 0.75
                    }rem))`
                  : `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {tourPackages.map((tour) => (
                <div
                  key={tour.id}
                  className="flex-shrink-0"
                  style={{
                    width: isMobile
                      ? "100%"
                      : `calc((100% - ${
                          (itemsPerView - 1) * 1.5
                        }rem) / ${itemsPerView})`,
                  }}
                >
                  <div className="group cursor-pointer">
                    {/* 이미지 컨테이너 */}
                    <div className="relative overflow-hidden mb-4 md:mb-6">
                      <div
                        className="w-full h-64 md:h-80 lg:h-96 bg-cover bg-center transition-all duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${tour.image})` }}
                      >
                        {/* 그라데이션 오버레이 */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />

                        {/* 레이팅 배지 */}
                        <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-white/95 backdrop-blur-sm px-2.5 md:px-3 py-1 md:py-1.5 rounded-full flex items-center gap-1 md:gap-1.5 shadow-lg">
                          <Star className="w-3 h-3 md:w-4 md:h-4 fill-amber-400 text-amber-400" />
                          <span className="text-xs md:text-sm font-semibold text-gray-900">
                            {tour.rating}
                          </span>
                        </div>

                        {/* 위치 배지 */}
                        <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 bg-white/95 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full flex items-center gap-1.5 md:gap-2 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 md:transform md:translate-y-4 md:group-hover:translate-y-0">
                          <MapPin className="w-3 h-3 md:w-4 md:h-4 text-gray-700" />
                          <span className="text-xs md:text-sm font-medium text-gray-900">
                            {tour.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 정보 영역 */}
                    <div className="space-y-2 md:space-y-4">
                      {/* 기간 표시 */}
                      <div className="text-amber-700 text-xs md:text-sm font-medium tracking-wide">
                        {tour.duration}
                      </div>

                      {/* 타이틀 */}
                      <h3 className="text-lg md:text-xl lg:text-2xl font-light text-gray-900 tracking-tight group-hover:text-amber-800 transition-colors duration-300 line-clamp-2">
                        {tour.title}
                      </h3>

                      {/* 태그들 */}
                      <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {tour.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] md:text-xs px-2 md:px-3 py-1 md:py-1.5 bg-gray-50 text-gray-700 border border-gray-200 font-light tracking-wide"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* 가격 및 예약 버튼 */}
                      <div className="flex items-end justify-between pt-3 md:pt-4 border-t border-gray-200">
                        <div>
                          <div className="text-[10px] md:text-xs text-gray-500 mb-0.5 md:mb-1 font-light">
                            1인 기준
                          </div>
                          <div className="flex items-baseline gap-0.5 md:gap-1">
                            <span className="text-xl md:text-2xl lg:text-3xl font-light text-gray-900">
                              {parseInt(tour.price).toLocaleString()}
                            </span>
                            <span className="text-sm md:text-base text-gray-600 font-light">
                              원
                            </span>
                          </div>
                        </div>
                        <button className="px-4 md:px-6 py-2 md:py-2.5 bg-gray-900 text-white text-xs md:text-sm tracking-wide hover:bg-amber-800 transition-all duration-300 group-hover:px-5 md:group-hover:px-8 whitespace-nowrap">
                          상세보기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 인디케이터 */}
        <div className="flex justify-center gap-1.5 md:gap-2 mt-8 md:mt-12">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? "w-6 md:w-8 bg-amber-800"
                  : "w-3 md:w-4 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LuxuryTourSection;
