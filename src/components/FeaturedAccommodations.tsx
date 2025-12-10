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
    price: 191718,
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
        setItemsPerView(2);
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
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-[#F8F1E7] via-white to-[#F8F1E7]">
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

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-8 lg:gap-16 items-start relative z-10">
          {/* 왼쪽 텍스트 영역 */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm uppercase tracking-widest text-[#8B1E26] font-medium mb-3">
                Recommended Travel
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                K-culture tour
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl">
                한국의 전통과 현대가 공존하는 특별한 숙소들을 만나보세요.
              </p>

              {/* 네비게이션 버튼 */}
              <div className="flex gap-4 mt-12">
                <button
                  onClick={prevSlide}
                  aria-label="Previous accommodation"
                  className="group bg-white p-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-[#F8F1E7] transition-all duration-300 border border-[#D4A017]/30"
                >
                  <ChevronLeft className="w-6 h-6 text-[#8B1E26] group-hover:text-[#6E0D0D]" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next accommodation"
                  className="group bg-[#8B1E26] p-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-[#6E0D0D] transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
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
                className={`grid gap-8 ${
                  itemsPerView === 1
                    ? "grid-cols-1 max-w-lg mx-auto md:max-w-none"
                    : "grid-cols-1 md:grid-cols-2"
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
                      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                        {/* 고정 높이 이미지 영역 */}
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          {/* 할인 배지 - Main Brand Red */}
                          <div className="absolute top-4 right-4 bg-gradient-to-r from-[#8B1E26] to-[#6E0D0D] text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg">
                            10% OFF
                          </div>

                          {/* 평점 배지 - Accent Gold */}
                          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 border border-[#D4A017]/20">
                            <Star className="w-4 h-4 fill-[#D4A017] text-[#D4A017]" />
                            <span className="text-sm font-bold text-gray-900">
                              {item.rating}
                            </span>
                            <span className="text-xs text-gray-500">
                              ({item.reviews})
                            </span>
                          </div>
                        </div>

                        {/* 고정 높이 텍스트 영역 */}
                        <div className="p-5 h-44 flex flex-col">
                          {/* 위치 */}
                          <div className="flex items-center gap-1.5 text-gray-500 mb-2">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{item.location}</span>
                          </div>

                          {/* 숙소명 */}
                          <h3 className="text-lg font-bold text-gray-900 mb-auto line-clamp-2 group-hover:text-[#8B1E26] transition leading-snug">
                            {item.name}
                          </h3>

                          {/* 가격 */}
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-bold text-[#8B1E26]">
                                ₩{Math.floor((item.price * 0.9) / 1000)}k
                              </span>
                              <span className="text-base text-gray-400 line-through">
                                ₩{Math.floor(item.price / 1000)}k
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">/박</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* 도트 인디케이터 */}
              <div className="flex justify-center gap-2.5 mt-12">
                {accommodations.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`transition-all duration-300 rounded-full ${
                      i === currentIndex
                        ? "bg-[#8B1E26] w-10 h-2.5"
                        : "bg-gray-300 w-2.5 h-2.5 hover:bg-[#D4A017]"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* 일러스트 - 섹션 밖으로 나가서 왼쪽 하단에 표시 */}
        <div className="absolute bottom-0 left-6 lg:left-[calc((100%-1280px)/2+1.5rem)] z-0 pointer-events-none">
          <Image
            src="/images/card_koreaimg_v2.png"
            alt="K-culture illustration"
            width={1200}
            height={1200}
            className="w-[50vw] max-w-[300px] md:w-[40vw] md:max-w-[380px] lg:w-[35vw] lg:max-w-[450px] h-auto object-bottom object-left translate-y-[50%] md:translate-y-[55%] lg:translate-y-[50%] drop-shadow-2xl opacity-70"
            priority
          />
        </div>
      </div>
    </section>
  );
}
