"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

import TourCard from "@/components/TourCard";
import { hangameFont } from "@/lib/fonts";
// ✅ [추가] 아까 만든 로딩 컴포넌트 불러오기
import FullScreenLoader from "@/components/FullScreenLoader";

export default function FeaturedTours() {
  const [accommodations, setAccommodations] = useState<any[]>([]);

  // ... (State 및 useEffect 로직은 그대로 유지) ...
  // ... (updateItemsPerView 및 슬라이드 로직 그대로 유지) ...

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const MAX_ITEMS = 6;

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const query = groq`
          *[_type == "tour"] | order(rating desc)[0...${MAX_ITEMS}] {
            _id, title, "slug": slug.current, "image": mainImage.asset->url,
            category, price, originalPrice, discount, rating, reviews, bookings, tags
          }
        `;
        const data = await client.fetch(query);
        const mappedData = data.map((tour: any) => ({
          ...tour,
          id: tour._id,
          image: tour.image || "",
          price: tour.price || 0,
          rating: tour.rating || 5.0,
          reviews: tour.reviews || 0,
          bookings: tour.bookings || "0+ booked",
          tags: tour.tags || [],
        }));
        setAccommodations(mappedData);
      } catch (error) {
        console.error("Failed to fetch featured tours:", error);
      }
    };
    fetchTours();
  }, []);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3);
      else if (window.innerWidth >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const totalPages = Math.ceil(accommodations.length / itemsPerView);
  const canPrev = currentPage > 0;
  const canNext = currentPage < totalPages - 1;

  const nextSlide = () => {
    if (canNext) setCurrentPage((prev) => prev + 1);
  };
  const prevSlide = () => {
    if (canPrev) setCurrentPage((prev) => prev - 1);
  };

  const startIndex = currentPage * itemsPerView;
  const endIndex = startIndex + itemsPerView;
  const visibleItems = accommodations.slice(startIndex, endIndex);

  return (
    <section className="relative pt-12 pb-32 lg:pt-24 lg:pb-44 bg-gradient-to-br from-[#F8F1E7] via-white to-[#F8F1E7]">
      {/* 배경 이미지 영역 (그대로 유지) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/company/typeB_01.png"
          alt="Section Background"
          fill
          priority
          className="object-cover object-[0%_center] lg:object-center opacity-100"
        />
      </div>

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
              <p className="text-[10px] md:text-[11px] uppercase tracking-widest text-[#4A7C7E] font-bold mb-2 md:mb-3">
                OFFICIAL PARTNER
              </p>
              {/* ✅ SEO 핵심: H2 태그 확인됨 (South Korea Tour Packages) */}
              <h2
                className={`${hangameFont.className} text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight`}
              >
                South Korea Tour Packages
              </h2>

              {/* 네비게이션 버튼 */}
              {totalPages > 1 && (
                <div className="flex gap-3 mt-4 md:mt-6">
                  <button
                    onClick={prevSlide}
                    disabled={!canPrev}
                    // ✅ [SEO 추가] 버튼에 이름표 달기 (aria-label)
                    aria-label="Previous Slide"
                    className="group bg-white p-3 rounded-lg shadow-md hover:shadow-lg hover:bg-[#F8F1E7] transition-all duration-300 border border-[#4A7C7E]/30 disabled:opacity-30"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#4A7C7E]" />
                  </button>
                  <button
                    onClick={nextSlide}
                    disabled={!canNext}
                    // ✅ [SEO 추가] 버튼에 이름표 달기
                    aria-label="Next Slide"
                    className="group bg-[#4A7C7E] p-3 rounded-lg shadow-md hover:shadow-lg hover:bg-[#3D6566] transition-all duration-300 disabled:opacity-30"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              )}

              {/* 페이지 카운터 (그대로 유지) */}
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
                  {visibleItems.length > 0 ? (
                    visibleItems.map((item) => (
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
                    ))
                  ) : (
                    // ✅ [수정 완료] 로딩 컴포넌트 적용!
                    <div className="col-span-full h-80">
                      <FullScreenLoader
                        variant="section"
                        message="Loading recommended tours..."
                      />
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
