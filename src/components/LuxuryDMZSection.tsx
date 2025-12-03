"use client";

import React from "react";
import { Star, Clock, Award } from "lucide-react";

const LuxuryDMZSection = () => {
  const tours = [
    {
      id: 1,
      title: "프리미엄 DMZ 제3터널 투어",
      desc: "제3침투터널 입장 + 도라전망대 + 임진각 + 점심 포함",
      image:
        "https://images.unsplash.com/photo-1567521563759-10b315d1b6c3?w=800&h=1000&fit=crop",
      price: "89,000",
      originalPrice: "149,000",
      badge: "최고 인기",
      rating: 4.95,
      duration: "8-9시간",
    },
    {
      id: 2,
      title: "VIP DMZ + 판문점 투어",
      desc: "판문점 JSA 방문 + 제3터널 + 도라산역 + 전용 차량",
      image:
        "https://images.unsplash.com/photo-1598972859-93adfa1c1a3e?w=800&h=1000&fit=crop",
      price: "189,000",
      originalPrice: "290,000",
      badge: "VIP 한정",
      rating: 5.0,
      duration: "9-10시간",
    },
    {
      id: 3,
      title: "DMZ 피스 투어",
      desc: "전문 사진작가 동행 + 자유의 다리 + 통일촌 + 드론 촬영",
      image:
        "https://images.unsplash.com/photo-1559662845-98b8fb1f9b2d?w=800&h=1000&fit=crop",
      price: "119,000",
      originalPrice: "189,000",
      badge: "포토 투어",
      rating: 4.9,
      duration: "8시간",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* 섹션 타이틀 */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-block px-6 py-2 bg-slate-100 border border-slate-200 mb-4">
            <span className="text-slate-700 text-sm font-medium tracking-widest">
              DMZ PREMIUM COLLECTION
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-gray-900 tracking-tight mb-4">
            프리미엄 DMZ 투어
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-light max-w-3xl mx-auto">
            서울 출발 당일치기, 제3터널 실제 입장 + 도라전망대에서 보는 북한
            전경
          </p>
        </div>

        {/* 투어 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="group relative overflow-hidden bg-white border border-gray-200 hover:shadow-2xl transition-all duration-700"
            >
              {/* 이미지 영역 */}
              <div className="relative h-80 md:h-96 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-105"
                  style={{ backgroundImage: `url(${tour.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* 배지 */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 text-gray-900 text-xs font-medium tracking-wide shadow-lg border border-gray-200">
                  {tour.badge}
                </div>

                {/* 평점 */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 flex items-center gap-1.5 shadow-lg border border-gray-200">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold text-gray-900">
                    {tour.rating}
                  </span>
                </div>

                {/* 소요시간 */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 shadow-lg border border-gray-200">
                  <Clock className="w-4 h-4 text-gray-700" />
                  <span className="text-sm font-medium text-gray-900">
                    {tour.duration}
                  </span>
                </div>
              </div>

              {/* 내용 영역 */}
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-light text-gray-900 mb-3 tracking-tight group-hover:text-amber-800 transition-colors duration-300">
                  {tour.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed mb-6">
                  {tour.desc}
                </p>

                {/* 가격 & 예약 버튼 */}
                <div className="flex items-end justify-between pt-6 border-t border-gray-200">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl md:text-3xl font-light text-gray-900">
                        {parseInt(tour.price).toLocaleString()}
                      </span>
                      <span className="text-base text-gray-600 font-light">
                        원
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-400 line-through">
                        {parseInt(tour.originalPrice).toLocaleString()}원
                      </span>
                      <span className="text-xs text-gray-600 font-medium">
                        {Math.round(
                          ((parseInt(tour.originalPrice) -
                            parseInt(tour.price)) /
                            parseInt(tour.originalPrice)) *
                            100
                        )}
                        % 할인
                      </span>
                    </div>
                  </div>

                  <button className="px-5 md:px-6 py-2.5 bg-gray-900 text-white text-xs md:text-sm font-medium tracking-wide hover:bg-amber-800 transition-all duration-300 whitespace-nowrap">
                    상세보기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 특징 아이콘 */}
        <div className="mt-16 md:mt-20 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto">
                <Award className="w-6 h-6 text-gray-700" />
              </div>
              <h4 className="text-lg font-light text-gray-900">
                제3터널 입장 보장
              </h4>
              <p className="text-sm text-gray-600 font-light">
                예약 취소 시 전액 환불
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-gray-700" />
              </div>
              <h4 className="text-lg font-light text-gray-900">
                매일 출발 보장
              </h4>
              <p className="text-sm text-gray-600 font-light">
                1명도 출발, 서울 전 지역 픽업
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto">
                <Star className="w-6 h-6 text-gray-700" />
              </div>
              <h4 className="text-lg font-light text-gray-900">전문 가이드</h4>
              <p className="text-sm text-gray-600 font-light">
                생생한 역사 해설과 감동 스토리
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryDMZSection;
