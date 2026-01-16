"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { basicPackages as packageTours } from "@/app/package/packageData";
import TourCard from "@/components/TourCard";

/* ✅ 폰트 가져오기 */
import { hangameFont } from "@/lib/fonts";

export default function FeaturedAccommodations() {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  const MAX_ITEMS = 6;
  const accommodations = packageTours.slice(0, MAX_ITEMS);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const totalPages = Math.ceil(accommodations.length / itemsPerView);
  const canPrev = currentPage > 0;
  const canNext = currentPage < totalPages - 1;

  const nextSlide = () => {
    if (!canNext) return;
    setCurrentPage((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (!canPrev) return;
    setCurrentPage((prev) => prev - 1);
  };

  const startIndex = currentPage * itemsPerView;
  const endIndex = startIndex + itemsPerView;
  const visibleItems = accommodations.slice(startIndex, endIndex);

  return (
    // ✅ 섹션 여백 수정:
    // 모바일: pt-12 (상단 여백 통일), pb-32 (하단 그림 공간 유지)
    // PC: lg:pt-24 (PC 여백 유지), lg:pb-44
    <section className="relative pt-12 pb-32 lg:pt-24 lg:pb-44 bg-gradient-to-br from-[#F8F1E7] via-white to-[#F8F1E7]">
      {/* 배경 이미지 영역 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/background_korea_img.png"
          alt="Section Background"
          fill
          className="object-cover opacity-5"
          priority
        />
      </div>

      {/* ⭐ 칼각 정렬 유지: max-w-6xl + px-8 lg:px-12 */}
      <div className="relative z-20 max-w-6xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-6 lg:gap-10 items-start relative z-10">
          {/* 왼쪽 텍스트 영역 */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* 소제목: 모바일 10px / PC 11px */}
              <p className="text-[10px] md:text-[11px] uppercase tracking-widest text-[#4A7C7E] font-bold mb-2 md:mb-3">
                OFFICIAL PARTNER
              </p>

              {/* ⭐ 섹션 제목: 디자인 시스템 적용 */}
              {/* 폰트: 한게임 포커체 Bold (700) */}
              {/* 크기: 모바일 20px(xl) / PC 24px(2xl) */}
              {/* 여백: 모바일 mb-4 / PC mb-6 */}
              <h2
                className={`${hangameFont.className} text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight`}
              >
                Top Picks by Seoul City Tour
              </h2>

              {/* 네비게이션 버튼 (PC/Tablet용 - 모바일에서는 숨길 수도 있지만 유지) */}
              {totalPages > 1 && (
                <div className="flex gap-3 mt-4 md:mt-6">
                  <button
                    onClick={prevSlide}
                    disabled={!canPrev}
                    className="group bg-white p-3 rounded-lg shadow-md hover:shadow-lg hover:bg-[#F8F1E7] transition-all duration-300 border border-[#4A7C7E]/30 disabled:opacity-30"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#4A7C7E]" />
                  </button>
                  <button
                    onClick={nextSlide}
                    disabled={!canNext}
                    className="group bg-[#4A7C7E] p-3 rounded-lg shadow-md hover:shadow-lg hover:bg-[#3D6566] transition-all duration-300 disabled:opacity-30"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              )}

              {/* ⭐ 페이지 카운터 */}
              {totalPages > 1 && (
                <div className="mt-4 md:mt-5 text-sm text-gray-600 tracking-wide">
                  <span className="font-bold text-[#4A7C7E]">
                    {currentPage + 1}
                  </span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span>{totalPages}</span>
                </div>
              )}
            </motion.div>
          </div>

          {/* 오른쪽 카드 슬라이더 */}
          <div className="col-span-12 md:col-span-7 lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div
                className={`grid gap-4 ${
                  itemsPerView === 1
                    ? "grid-cols-1"
                    : itemsPerView === 2
                      ? "grid-cols-2"
                      : "grid-cols-3"
                }`}
              >
                <AnimatePresence mode="wait">
                  {visibleItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="h-full"
                    >
                      <div className="h-full">
                        <TourCard tour={item} />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 하단 배경 일러스트 이미지 (PC에서만 보임 - 모바일 숨김 or 유지 선택 가능) */}
        {/* 현재 설정: hidden md:block (모바일에서는 숨김 처리되어 있어 깔끔함) */}
        <div className="absolute bottom-0 left-6 lg:left-[calc((100%-1152px)/2+1.5rem)] z-0 pointer-events-none">
          <Image
            src="/images/card_koreaimg_v2.png"
            alt="K-culture illustration"
            width={1200}
            height={1200}
            className="hidden md:block md:w-[40vw] md:max-w-[380px] lg:w-[35vw] lg:max-w-[450px] h-auto object-bottom object-left translate-y-[45%] lg:translate-y-[40%] drop-shadow-2xl opacity-70"
            priority
          />
        </div>
      </div>
    </section>
  );
}
