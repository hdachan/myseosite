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
    <section className="relative pt-14 pb-32 lg:pt-20 lg:pb-44 bg-gradient-to-br from-[#F8F1E7] via-white to-[#F8F1E7]">
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
              <p className="text-[11px] uppercase tracking-widest text-[#4A7C7E] font-bold mb-3">
                OFFICIAL PARTNER
              </p>

              {/* ⭐ 섹션 제목: 폰트 적용 (hangameFont) */}
              <h2
                className={`${hangameFont.className} text-2xl font-bold text-gray-900 mb-6 leading-tight`}
              >
                Top Picks by Seoul City Tour
              </h2>

              {/* 네비게이션 버튼 */}
              {totalPages > 1 && (
                <div className="flex gap-3 mt-6">
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
                <div className="mt-5 text-sm text-gray-600 tracking-wide">
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

        {/* 하단 배경 일러스트 이미지 */}
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
