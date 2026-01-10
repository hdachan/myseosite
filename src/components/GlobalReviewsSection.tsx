"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ 리뷰 데이터
const reviews = [
  {
    id: 1,
    title: "Best DMZ Tour Experience!",
    comment:
      "The guide was incredibly knowledgeable about Korean history. The 3rd tunnel was steep but worth it. Everything was perfectly organized from pick-up to drop-off. Highly recommended!",
    author: "Sarah J.",
    country: "United States",
    rating: 5,
  },
  {
    id: 2,
    title: "Unforgettable Private Tour",
    comment:
      "We booked a private van for our family of 5. The driver was polite and safe. Nami Island was beautiful in autumn. It was very convenient to travel at our own pace.",
    author: "Michael Chen",
    country: "Singapore",
    rating: 5,
  },
  {
    id: 3,
    title: "Great value for money",
    comment:
      "Booking was super easy and the price is reasonable. I loved the Gyeongbokgung Palace tour. The Hanbok experience was the highlight of my trip!",
    author: "Elena R.",
    country: "Germany",
    rating: 5,
  },
  {
    id: 4,
    title: "Professional & Friendly Guide",
    comment:
      "Our guide Mina was amazing! She spoke perfect English and took great photos for us. The lunch provided was also delicious. Great service mindset!",
    author: "James Wilson",
    country: "UK",
    rating: 4,
  },
  {
    id: 5,
    title: "Efficient and Safe",
    comment:
      "As a solo female traveler, I felt very safe. The instructions for the meeting point were clear. I will definitely book again next time.",
    author: "Yuki T.",
    country: "Japan",
    rating: 5,
  },
];

export default function GlobalReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  // 🖥️ 화면 크기에 따라 보여줄 개수 조절 (모바일 1개, 태블릿 2개, PC 3개)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3);
      else if (window.innerWidth >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(reviews.length / itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // 현재 보여줄 아이템 계산
  const visibleReviews = reviews.slice(
    currentIndex * itemsPerView,
    (currentIndex + 1) * itemsPerView
  );
  // 마지막 페이지에서 아이템이 부족할 경우 처리 (순환형으로 하거나 빈 공간 두기)
  // 여기서는 간단하게 slice로 처리하되, UI가 깨지지 않게 Grid 활용

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-[#fdfbf7]">
      {/* 🎨 [배경] 글래스 모피즘을 살리기 위한 은은한 그라데이션 Blob */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#d9bd8b]/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#37848c]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
        {/* 🅰️ 헤더 + 네비게이션 버튼 (좌우 정렬) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs uppercase tracking-widest text-[#37848c] font-bold mb-3">
              Customer Testimonials
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-2">
              Top-Rated <span className="text-[#ad3928]">Seoul & DMZ</span>{" "}
              Reviews
            </h2>
            <p className="text-sm text-gray-500">
              Trusted by 20,000+ travelers worldwide
            </p>
          </motion.div>

          {/* 슬라이드 버튼 (PC/태블릿용) */}
          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full border border-[#d9bd8b] text-[#d9bd8b] hover:bg-[#d9bd8b] hover:text-white transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-[#37848c] text-white hover:bg-[#2c6a70] shadow-lg transition-all duration-300"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* 🅱️ 리뷰 카드 슬라이더 (글래스 모피즘 적용) */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visibleReviews.map((review) => (
                <div
                  key={review.id}
                  // ✨ 핵심 디자인: 글래스 모피즘 카드
                  className="group relative p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-white/80 shadow-sm hover:shadow-xl hover:bg-white/80 transition-all duration-500 flex flex-col h-full"
                >
                  {/* 따옴표 아이콘 (장식) */}
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-[#d9bd8b]/30 fill-[#d9bd8b]/10" />

                  {/* 별점 */}
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? "fill-[#37848c] text-[#37848c]" // 브랜드 액센트 컬러
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  {/* 제목 */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#ad3928] transition-colors">
                    {review.title}
                  </h3>

                  {/* 내용 */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-grow">
                    "{review.comment}"
                  </p>

                  {/* 작성자 정보 */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100/50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d9bd8b] to-[#c4a470] flex items-center justify-center text-white font-bold shadow-sm">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {review.author}
                      </p>
                      <p className="text-xs text-gray-500">{review.country}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* 빈 공간 채우기 (마지막 페이지에서 개수가 모자랄 때 레이아웃 깨짐 방지용) */}
              {Array.from({ length: itemsPerView - visibleReviews.length }).map(
                (_, idx) => (
                  <div key={`empty-${idx}`} className="hidden lg:block" />
                )
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 모바일용 인디케이터 (점) */}
        <div className="flex justify-center gap-2 mt-8 md:hidden">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "bg-[#37848c] w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
