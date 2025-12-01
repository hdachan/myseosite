"use client";

import { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  Star,
  MapPin,
} from "lucide-react";

const tours = {
  dmz: [
    {
      id: 1,
      title: "DMZ 제3땅굴 + 도라전망대 투어",
      duration: "8시간",
      groupSize: "최대 40명",
      rating: 4.8,
      reviews: 1247,
      price: "₩85,000",
      location: "서울 출발",
      image: "/dmz-tour-1.jpg",
      highlights: ["제3땅굴 입장", "도라전망대", "점심 포함"],
    },
    {
      id: 2,
      title: "DMZ + 임진각 평화누리공원",
      duration: "7시간",
      groupSize: "최대 35명",
      rating: 4.7,
      reviews: 892,
      price: "₩75,000",
      location: "서울 출발",
      image: "/dmz-tour-2.jpg",
      highlights: ["임진각", "자유의 다리", "평화누리공원"],
    },
    {
      id: 3,
      title: "JSA 판문점 투어 (특별허가)",
      duration: "9시간",
      groupSize: "최대 30명",
      rating: 4.9,
      reviews: 1589,
      price: "₩125,000",
      location: "서울 출발",
      image: "/dmz-tour-3.jpg",
      highlights: ["판문점", "공동경비구역", "귀순용사 브리핑"],
    },
    {
      id: 4,
      title: "DMZ 풀코스 (땅굴+JSA)",
      duration: "10시간",
      groupSize: "최대 25명",
      rating: 4.9,
      reviews: 743,
      price: "₩155,000",
      location: "서울 출발",
      image: "/dmz-tour-4.jpg",
      highlights: ["제3땅굴", "판문점", "도라산역", "2식 포함"],
    },
  ],
  seoul: [
    {
      id: 5,
      title: "서울 고궁 투어 (경복궁+북촌)",
      duration: "5시간",
      groupSize: "최대 30명",
      rating: 4.7,
      reviews: 2134,
      price: "₩55,000",
      location: "서울 시내",
      image: "/seoul-tour-1.jpg",
      highlights: ["경복궁", "북촌한옥마을", "인사동"],
    },
    {
      id: 6,
      title: "강남 현대 서울 투어",
      duration: "4시간",
      groupSize: "최대 35명",
      rating: 4.6,
      reviews: 1567,
      price: "₩45,000",
      location: "강남역",
      image: "/seoul-tour-2.jpg",
      highlights: ["코엑스", "강남거리", "K-POP 스퀘어"],
    },
    {
      id: 7,
      title: "서울 나이트 투어",
      duration: "3시간",
      groupSize: "최대 40명",
      rating: 4.8,
      reviews: 998,
      price: "₩40,000",
      location: "명동 출발",
      image: "/seoul-tour-3.jpg",
      highlights: ["남산타워", "한강야경", "동대문"],
    },
    {
      id: 8,
      title: "전통시장 + 먹방 투어",
      duration: "4시간",
      groupSize: "최대 20명",
      rating: 4.9,
      reviews: 1876,
      price: "₩65,000",
      location: "광장시장",
      image: "/seoul-tour-4.jpg",
      highlights: ["광장시장", "전통음식 5종", "막걸리 시음"],
    },
  ],
};

export default function CityTourSection() {
  const [activeTab, setActiveTab] = useState<"dmz" | "seoul">("dmz");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const activeTours = tours[activeTab];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            인기 투어 프로그램
          </h2>
          <p className="text-lg text-gray-600">
            전문 가이드와 함께하는 한국 역사·문화 체험
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("dmz")}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "dmz"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            DMZ 투어
          </button>
          <button
            onClick={() => setActiveTab("seoul")}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "seoul"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            서울 시티 투어
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {activeTours.map((tour) => (
              <div
                key={tour.id}
                className="flex-none w-80 bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">
                    {tour.title} 이미지
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2">
                    {tour.title}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{tour.groupSize}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{tour.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">
                      {tour.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({tour.reviews.toLocaleString()})
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {tour.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <div className="text-xs text-gray-500">1인당</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {tour.price}
                      </div>
                    </div>
                    <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      예약하기
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
            전체 투어 보기
          </button>
        </div>
      </div>
    </section>
  );
}
