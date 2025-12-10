// src/components/FeaturedAccommodations.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const accommodations = [
  {
    id: 1,
    name: "Aparthotel Stare Miasto",
    location: "Warsaw, Poland",
    rating: 4.8,
    reviews: 324,
    price: 20202020,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=832&h=520&fit=crop",
  },
  {
    id: 2,
    name: "7Seasons Apartments Budapest",
    location: "Budapest, Hungary",
    rating: 4.9,
    reviews: 512,
    price: 246516,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=832&h=520&fit=crop",
  },
  {
    id: 3,
    name: "Leman Locke",
    location: "Geneva, Switzerland",
    rating: 5.0,
    reviews: 89,
    price: 969203,
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=832&h=520&fit=crop",
  },
  {
    id: 4,
    name: "3 Epoques Apartments by Adrez",
    location: "Paris, France",
    rating: 4.7,
    reviews: 267,
    price: 218270,
    image:
      "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?w=832&h=520&fit=crop",
  },
  {
    id: 5,
    name: "Seoul Myeongdong Stay",
    location: "Seoul, South Korea",
    rating: 4.6,
    reviews: 428,
    price: 156000,
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=832&h=520&fit=crop",
  },
  {
    id: 6,
    name: "Busan Haeundae Hotel",
    location: "Busan, South Korea",
    rating: 4.8,
    reviews: 391,
    price: 198000,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=832&h=520&fit=crop",
  },
];

export default function FeaturedAccommodations() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % accommodations.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + accommodations.length) % accommodations.length
    );
  };

  const visibleItems = Array.from(
    { length: itemsPerView },
    (_, i) => accommodations[(currentIndex + i) % accommodations.length]
  );

  return (
    <section className="relative pt-14 pb-32 lg:pt-20 lg:pb-44 bg-gradient-to-br from-[#F8F1E7] via-white to-[#F8F1E7]">
      {/* 미세한 배경 패턴 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1583562835057-a62d1beffbf3?w=1600"
          alt=""
          fill
          className="object-cover opacity-5"
          priority
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-8 lg:px-14">
        <div className="grid grid-cols-12 gap-6 lg:gap-10 items-start relative z-10">
          {/* 왼쪽 텍스트 영역 */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs uppercase tracking-wider text-[#8B1E26] font-medium mb-2">
                Recommended Travel
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                K-culture tour
              </h2>
              <p className="text-sm text-gray-600 max-w-3xl">
                한국의 전통과 현대가 공존하는 특별한 숙소들을 만나보세요.
              </p>

              {/* 네비게이션 버튼 */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={prevSlide}
                  aria-label="Previous accommodation"
                  className="group bg-white p-3 rounded-lg shadow-md hover:shadow-lg hover:bg-[#F8F1E7] transition-all duration-300 border border-[#D4A017]/30"
                >
                  <ChevronLeft className="w-5 h-5 text-[#8B1E26] group-hover:text-[#6E0D0D]" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next accommodation"
                  className="group bg-[#8B1E26] p-3 rounded-lg shadow-md hover:shadow-lg hover:bg-[#6E0D0D] transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
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
                className={`grid gap-5 ${
                  itemsPerView === 1
                    ? "grid-cols-1"
                    : itemsPerView === 2
                    ? "grid-cols-2"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                <AnimatePresence mode="popLayout">
                  {visibleItems.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${currentIndex}-${index}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="group"
                    >
                      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
                        {/* 이미지 영역 */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />

                          {/* 북마크 버튼 */}
                          <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                            <svg
                              className="w-5 h-5 text-gray-700"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* 텍스트 영역 */}
                        <div className="p-4 h-48 flex flex-col">
                          <div className="text-sm text-gray-500 mb-2.5 font-normal">
                            {item.location.split(",")[0]}
                          </div>
                          <h3 className="text-base font-medium text-gray-800 mb-auto line-clamp-2 leading-relaxed">
                            {item.name}
                          </h3>
                          <div className="text-[22px] font-bold text-gray-900 mt-8">
                            ₩{Math.floor(item.price / 1000).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* 도트 인디케이터 */}
              <div className="flex justify-center gap-2 mt-8">
                {accommodations.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`transition-all duration-300 rounded-full ${
                      i === currentIndex
                        ? "bg-[#8B1E26] w-8 h-2"
                        : "bg-gray-300 w-2 h-2 hover:bg-[#D4A017]"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* 일러스트 */}
        <div className="absolute bottom-0 left-6 lg:left-[calc((100%-1280px)/2+1.5rem)] z-0 pointer-events-none">
          <Image
            src="/images/card_koreaimg_v2.png"
            alt="K-culture illustration"
            width={1200}
            height={1200}
            className="w-[50vw] max-w-[300px] md:w-[40vw] md:max-w-[380px] lg:w-[35vw] lg:max-w-[450px] h-auto object-bottom object-left translate-y-[40%] md:translate-y-[45%] lg:translate-y-[40%] drop-shadow-2xl opacity-70"
            priority
          />
        </div>
      </div>
    </section>
  );
}
