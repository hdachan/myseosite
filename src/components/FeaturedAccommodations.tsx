// src/components/FeaturedAccommodations.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

interface Accommodation {
  id: number;
  name: string;
  nameEn: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: number;
  image: string;
  badge?: string;
}

const accommodations: Accommodation[] = [
  {
    id: 1,
    name: "아파트호텔 스타어 미아스토",
    nameEn: "Aparthotel Stare Miasto",
    location: "Old Town, 폴란드, 크라쿠프",
    rating: 8.8,
    reviewCount: 3257,
    price: 191718,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    badge: "우수함",
  },
  {
    id: 2,
    name: "7시즌스 아파트먼트 부다페스트",
    nameEn: "7Seasons Apartments Budapest",
    location: "06. 테레즈바로스, 헝가리, 부다페스트",
    rating: 8.7,
    reviewCount: 10650,
    price: 246516,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
    badge: "우수함",
  },
  {
    id: 3,
    name: "레만 로크",
    nameEn: "Leman Locke",
    location: "타워 햄릿, 영국, 런던",
    rating: 8.4,
    reviewCount: 780,
    price: 969203,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400",
    badge: "매우 좋음",
  },
  {
    id: 4,
    name: "3 Epoques Apartments by Adrez",
    nameEn: "3 Epoques Apartments by Adrez",
    location: "프라하 1, 체코, 프라하",
    rating: 8.7,
    reviewCount: 733,
    price: 218270,
    image: "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?w=400",
    badge: "우수함",
  },
  {
    id: 5,
    name: "서울 명동 스테이",
    nameEn: "Seoul Myeongdong Stay",
    location: "중구, 서울, 대한민국",
    rating: 8.9,
    reviewCount: 2341,
    price: 156000,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400",
    badge: "우수함",
  },
];

export default function FeaturedAccommodations() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("accommodation-scroll");
    if (container) {
      const scrollAmount = direction === "left" ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            DMZ 투어 후 머물기 좋은 숙소
          </h2>
          <p className="text-gray-600">
            투어 출발지 근처에서 편안하게 쉬어가세요
          </p>
        </div>

        {/* 카드 캐러셀 */}
        <div className="relative group">
          {/* 좌측 네비게이션 버튼 */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50 -ml-4"
            aria-label="이전 숙소"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* 우측 네비게이션 버튼 */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50 -mr-4"
            aria-label="다음 숙소"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* 스크롤 컨테이너 */}
          <div
            id="accommodation-scroll"
            className="flex gap-5 overflow-x-auto pb-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {accommodations.map((acc) => (
              <div
                key={acc.id}
                className="flex-shrink-0 w-[340px] bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                {/* 이미지 영역 */}
                <div className="relative h-[240px] overflow-hidden bg-gray-200">
                  <Image
                    src={acc.image}
                    alt={acc.name}
                    fill
                    sizes="340px"
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                  {/* 찜하기 버튼 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(acc.id);
                    }}
                    className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
                    aria-label="찜하기"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.has(acc.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-700"
                      }`}
                    />
                  </button>
                </div>

                {/* 정보 영역 */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">
                    {acc.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1 line-clamp-1">
                    {acc.nameEn}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">{acc.location}</p>

                  {/* 평점 및 리뷰 */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-blue-600 text-white px-2 py-1 rounded font-bold text-sm">
                      {acc.rating}
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold text-gray-900">
                        {acc.badge}
                      </span>
                      <span className="text-gray-500 ml-1">
                        {acc.reviewCount.toLocaleString()}개 이용 후기
                      </span>
                    </div>
                  </div>

                  {/* 가격 */}
                  <div className="flex items-baseline justify-end">
                    <span className="text-sm text-gray-500 mr-1">최저</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ₩{acc.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 더보기 버튼 */}
        <div className="mt-8 text-center">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300">
            더 많은 숙소 보기
          </button>
        </div>
      </div>

      <style jsx global>{`
        #accommodation-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
