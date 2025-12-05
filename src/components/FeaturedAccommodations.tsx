// src/components/FeaturedAccommodations.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const accommodations = [
  {
    id: 1,
    name: "아파트호텔 스타어 미아스토",
    price: 191718,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=832&h=520&fit=crop",
  },
  {
    id: 2,
    name: "7시즌스 아파트먼트 부다페스트",
    price: 246516,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=832&h=520&fit=crop",
  },
  {
    id: 3,
    name: "레만 로크",
    price: 969203,
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=832&h=520&fit=crop",
  },
  {
    id: 4,
    name: "3 Epoques Apartments by Adrez",
    price: 218270,
    image:
      "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?w=832&h=520&fit=crop",
  },
  {
    id: 5,
    name: "서울 명동 스테이",
    price: 156000,
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=832&h=520&fit=crop",
  },
  {
    id: 6,
    name: "부산 해운대 호텔",
    price: 198000,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=832&h=520&fit=crop",
  },
];

export default function FeaturedAccommodations() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(accommodations.length / itemsPerPage);

  const nextPage = () => setCurrentPage((p) => (p + 1 + p) % totalPages);
  const prevPage = () =>
    setCurrentPage((p) => (p - 1 + totalPages) % totalPages);

  const currentItems = accommodations.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="relative py-24 overflow-hidden bg-white min-h-screen">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1583562835057-a62d1beffbf3?w=1600"
          alt="Korean background"
          fill
          className="object-cover opacity-10"
          priority
        />
      </div>

      {/* 왼쪽 하단 일러스트 – 이게 핵심! */}
      <div className="absolute left-0 bottom-0 z-30 pointer-events-none">
        <Image
          src="/images/card_koreaimg_v2.png"
          alt="K-culture illustration"
          width={1200}
          height={1200}
          className="w-[340px] sm:w-[420px] md:w-[520px] lg:w-[640px] h-auto 
                     drop-shadow-2xl opacity-65
                     translate-x-[-8%] translate-y-[12%]" // 진짜 모서리에 딱 붙이면서 살짝 안으로
          priority
        />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* 왼쪽 텍스트 */}
          <div className="col-span-12 md:col-span-4">
            <p className="text-sm uppercase tracking-widest text-gray-600 mb-4">
              Recommended Travel
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 leading-tight">
              K-culture tour
            </h2>

            <div className="flex gap-4">
              <button
                onClick={prevPage}
                className="bg-[#8B4789] p-4 rounded-full shadow-xl hover:bg-[#7a3d78] transition"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextPage}
                className="bg-[#8B4789] p-4 rounded-full shadow-xl hover:bg-[#7a3d78] transition"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* 오른쪽 카드 */}
          <div className="col-span-12 md:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300"
                >
                  <div className="relative h-64">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover hover:scale-110 transition duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4 line-clamp-2">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold">
                          ${(item.price / 1000).toFixed(2)}
                        </span>
                        <span className="text-gray-400 line-through">
                          ${((item.price * 1.1) / 1000).toFixed(2)}
                        </span>
                      </div>
                      <span className="text-[#C41E3A] font-bold text-lg">
                        10% OFF
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 페이지네이션 */}
            <div className="flex justify-center gap-3 mt-12">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentPage === i ? "bg-[#8B4789] w-12" : "bg-gray-300 w-3"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
