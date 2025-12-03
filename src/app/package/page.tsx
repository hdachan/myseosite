"use client";

import React from "react";
import { Clock, ArrowRight } from "lucide-react";

const PackageTourPage = () => {
  const tourList = [
    {
      id: 1,
      icon: "building",
      category: "오전투어",
      title: "HISTORY & 오전투어 JOURNEYS",
      subtitle: "Delve Deeper Than The Surface",
      mainTitle: "내용 > 시간, 돈 #경복궁 #불국사",
      description:
        "Travel beyond the guidebook with curated cultural experiences that reveal the true spirit of your destination.",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      price: "89000",
      duration: "약 6시간",
    },
    {
      id: 2,
      icon: "airplane",
      category: "차투어",
      title: "HISTORY & 차투어 JOURNEYS",
      subtitle: "Delve Deeper Than The Surface",
      mainTitle: "EXPERIENCES THAT RESONATE TO LIFE",
      description:
        "Imagine an after-hours tour with an art historian in the Sistine Chapel, a tea ceremony with Buddhist monks in Kyoto.",
      image:
        "https://images.unsplash.com/photo-1559662845-98b8fb1f9b2d?w=800&h=600&fit=crop",
      price: "129000",
      duration: "약 8시간",
    },
    {
      id: 3,
      icon: "food",
      category: "미식투어",
      title: "HISTORY & CULTURE JOURNEYS",
      subtitle: "Delve Deeper Than The Surface",
      mainTitle: "EXPERIENCES THAT RESONATE TO LIFE",
      description:
        "Every experience is designed to reveal the deeper stories of a place—authentic, intimate, and unforgettable.",
      image:
        "https://images.unsplash.com/photo-1565693413579-453d509c5ba4?w=800&h=600&fit=crop",
      price: "79000",
      duration: "약 5시간",
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-32">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* 페이지 제목 */}
        <div className="text-center mb-12 md:mb-20">
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 tracking-tight">
            패키지 관광
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-gray-600 font-light">
            서울 출발 프리미엄 패키지 투어 상품
          </p>
        </div>

        {/* 투어 카드 리스트 */}
        <div className="space-y-8 md:space-y-12">
          {tourList.map((tour) => (
            <div
              key={tour.id}
              className="group relative bg-white border border-gray-200 rounded-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* 이미지 영역 */}
                <div className="relative md:w-2/5 flex-shrink-0">
                  <div className="absolute top-4 left-4 z-10 w-12 h-12 bg-white border border-gray-300 rounded-full flex items-center justify-center text-2xl shadow-lg">
                    {tour.icon}
                  </div>
                  <div className="relative h-64 md:h-full overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                      style={{ backgroundImage: `url(${tour.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                    </div>
                  </div>
                </div>

                {/* 콘텐츠 영역 */}
                <div className="flex-1 p-6 md:p-8 bg-gradient-to-br from-slate-50/50 to-white flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-gray-500 tracking-wider uppercase font-medium">
                      {tour.category}
                    </span>
                    <h2 className="mt-2 text-2xl md:text-3xl font-light text-gray-900 tracking-tight">
                      {tour.title}
                    </h2>
                    <p className="mt-1 text-sm md:text-base text-gray-600 italic">
                      {tour.subtitle}
                    </p>

                    <h3 className="mt-6 text-lg md:text-xl font-medium text-gray-900">
                      {tour.mainTitle}
                    </h3>

                    <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed">
                      {tour.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl md:text-4xl font-light text-gray-900">
                          {parseInt(tour.price).toLocaleString()}
                        </span>
                        <span className="text-lg text-gray-600">원</span>
                      </div>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <Clock className="w-4 h-4" />
                        {tour.duration}
                      </p>
                    </div>

                    <button className="group/btn px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition flex items-center gap-2">
                      예약하기
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 CTA */}
        <div className="text-center mt-16 md:mt-24">
          <button className="group inline-flex items-center gap-3 px-10 py-4 bg-gray-900 text-white text-lg font-medium tracking-wide hover:bg-black transition">
            지금 바로 문의하기
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageTourPage;
