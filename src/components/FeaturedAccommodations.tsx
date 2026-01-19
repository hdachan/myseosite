"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ 1. 로컬 데이터 import 삭제
// import { basicPackages as packageTours } from "@/app/package/packageData";

// ✅ 2. Sanity Client 및 쿼리 도구 추가
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

import TourCard from "@/components/TourCard";
import { hangameFont } from "@/lib/fonts";

export default function FeaturedAccommodations() {
  // ✅ 3. Sanity 데이터를 담을 State 생성
  const [accommodations, setAccommodations] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const MAX_ITEMS = 6; // Sanity에서 가져올 최대 개수

  // ✅ 4. 컴포넌트가 켜질 때(Mount) Sanity 데이터 가져오기
  useEffect(() => {
    const fetchTours = async () => {
      try {
        // 평점 높은 순으로 6개 가져오기
        const query = groq`
          *[_type == "tour"] | order(rating desc)[0...${MAX_ITEMS}] {
            _id,
            title,
            "slug": slug.current,
            "image": mainImage.asset->url,
            category,
            price,
            originalPrice,
            discount,
            rating,
            reviews,
            bookings,
            tags
          }
        `;
        const data = await client.fetch(query);

        // TourCard 형식에 맞게 데이터 매핑
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
  }, []); // 빈 배열 [] : 한 번만 실행

  // ✅ 5. 화면 크기에 따른 아이템 개수 조정 (기존 로직 유지)
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
    <section className="relative pt-12 pb-32 lg:pt-24 lg:pb-44 bg-gradient-to-br from-[#F8F1E7] via-white to-[#F8F1E7]">
      {/* 배경 이미지 영역 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/company/typeB_01.png"
          alt="Section Background"
          fill
          className="object-cover opacity-100"
          priority
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

              {/* 페이지 카운터 */}
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
                  {/* 데이터가 있을 때만 렌더링 */}
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
                    // 로딩 중일 때 표시 (선택사항)
                    <div className="col-span-full h-60 flex items-center justify-center text-gray-400">
                      Loading tours...
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
