// src/components/GlobalReviewsSection.tsx
// 모바일에서 리뷰 좌우 슬라이드 완료 (전체 코드)

"use client";

import { useState } from "react";
import {
  Star,
  Quote,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  {
    name: "Edith BM",
    country: "Solo Traveler",
    flag: "🌍",
    rating: 5,
    date: "Feb 2025",
    comment:
      "It was definitely an amazing tour! I booked it just the night before. I would especially like to thank Mina—she was very professional and attentive at all times.",
    tour: "Seoul City Tour",
    avatar: "E",
  },
  {
    name: "Carina B",
    country: "Germany",
    flag: "🇩🇪",
    rating: 5,
    date: "Oct 2025",
    comment:
      "We had a great tour guided by Grace, who was not only knowledgeable but also very kind. The view from the Dora Observatory was a one-of-a-kind experience.",
    tour: "DMZ Tour",
    avatar: "C",
  },
  {
    name: "Jack P",
    country: "United States",
    flag: "🇺🇸",
    rating: 5,
    date: "Jul 2025",
    comment:
      "Our guide, Smin, was fantastic! She shared great fun facts and had answers to just about any local history question. Highly recommended!",
    tour: "Historical Tour",
    avatar: "J",
  },
  {
    name: "Milind T.",
    country: "India",
    flag: "🇮🇳",
    rating: 5,
    date: "Dec 2023",
    comment:
      "What a great full day tour! Gyeongbok Palace, Namsan Seoul Tower are major attractions. The tour booking was quite easy.",
    tour: "Palace Tour",
    avatar: "M",
  },
  {
    name: "Shannon",
    country: "Singapore",
    flag: "🇸🇬",
    rating: 5,
    date: "Jan 2024",
    comment:
      "The best tour ever!! It was really good experience. Tour guide, company operator and driver were all amazing!",
    tour: "DMZ Tour",
    avatar: "S",
  },
  {
    name: "Mark K",
    country: "Hong Kong",
    flag: "🇭🇰",
    rating: 5,
    date: "Jan 2024",
    comment:
      "Took a good tour to the DMZ. We had plenty of time for pictures. Our tour guide Yeoni was very good and approachable.",
    tour: "DMZ Tour",
    avatar: "M",
  },
];

const ReviewCard = ({ review }: { review: any }) => (
  <div className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full flex flex-col hover:-translate-y-2">
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className="w-4 h-4 fill-[#D4A017] text-[#D4A017]" />
        ))}
      </div>
      <span className="text-xs text-gray-400 font-medium">{review.date}</span>
    </div>
    <Quote className="w-8 h-8 text-[#8B1E26]/20 mb-3" />
    <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-grow">
      {review.comment}
    </p>
    <div className="pt-4 border-t border-gray-100">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B1E26] to-[#D4A017] flex items-center justify-center text-white font-bold text-base shadow-md">
          {review.avatar}
        </div>
        <div>
          <div className="font-bold text-gray-900 text-base">{review.name}</div>
          <div className="text-gray-500 text-sm">
            {review.flag} {review.country}
          </div>
        </div>
      </div>
      <span className="inline-block text-xs text-[#8B1E26] bg-[#F8F1E7] px-3 py-1.5 rounded-full font-medium">
        {review.tour}
      </span>
    </div>
  </div>
);

export default function GlobalReviewsSection() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % reviews.length);
  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length);

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F8F1E7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-sm uppercase tracking-widest text-[#8B1E26] font-medium mb-3">
            Global Reviews
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight max-w-4xl">
            Trusted by Travelers{" "}
            <span className="bg-gradient-to-r from-[#8B1E26] to-[#D4A017] bg-clip-text text-transparent">
              Worldwide
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Friendly Guides · Safe Itinerary · Top-Rated Experience
          </p>
        </motion.div>

        {/* TripAdvisor Badge & Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 flex flex-col items-center justify-center border-r border-gray-100">
                <a
                  href="https://www.tripadvisor.com.ph/Attraction_Review-g294197-d4492012-Reviews-Seoul_City_Tour-Seoul.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-center"
                >
                  <div className="mb-4">
                    <div className="bg-gradient-to-br from-[#00AF87] to-[#00D4AA] rounded-full w-20 h-20 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg
                        className="w-12 h-12"
                        viewBox="0 0 120 120"
                        fill="none"
                      >
                        <circle cx="60" cy="45" r="6" fill="#1a1a1a" />
                        <circle cx="45" cy="45" r="6" fill="#1a1a1a" />
                        <circle cx="75" cy="45" r="6" fill="#1a1a1a" />
                        <path
                          d="M40 65 Q60 75 80 65"
                          stroke="#1a1a1a"
                          strokeWidth="5"
                          fill="none"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm text-[#00AF87] font-bold mb-2">
                    TripAdvisor
                  </div>
                  <div className="text-base font-bold text-gray-800 mb-4">
                    Certificate of Excellence
                  </div>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-5 h-5 fill-[#D4A017] text-[#D4A017]"
                        />
                      ))}
                    </div>
                    <span className="text-3xl font-bold text-gray-900">
                      4.9
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    21,044 reviews
                  </div>
                </a>
              </div>

              <div className="grid grid-cols-2 gap-px bg-gray-100">
                <div className="bg-white p-6 flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#8B1E26] to-[#D4A017] bg-clip-text text-transparent mb-2">
                    98%
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Recommended
                  </div>
                </div>
                <div className="bg-white p-6 flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#8B1E26] to-[#D4A017] bg-clip-text text-transparent mb-2">
                    20K+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Excellent
                  </div>
                </div>
                <div className="bg-white p-6 flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#8B1E26] to-[#D4A017] bg-clip-text text-transparent mb-2">
                    #50
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    of 878 Tours
                  </div>
                </div>
                <div className="bg-white p-6 flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#8B1E26] to-[#D4A017] bg-clip-text text-transparent mb-2">
                    100+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Countries
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 리뷰 영역 */}
        <div className="relative mb-12">
          {/* 데스크탑/태블릿: 그리드 */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </div>

          {/* 모바일: 슬라이더 */}
          <div className="md:hidden">
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.4 }}
                  className="px-4"
                >
                  <ReviewCard review={reviews[index]} />
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={prev}
              aria-label="Previous review"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 rounded-full shadow-lg hover:shadow-xl"
            >
              <ChevronLeft className="w-6 h-6 text-[#8B1E26]" />
            </button>
            <button
              onClick={next}
              aria-label="Next review"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 rounded-full shadow-lg hover:shadow-xl"
            >
              <ChevronRight className="w-6 h-6 text-[#8B1E26]" />
            </button>

            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`transition-all rounded-full ${
                    i === index ? "bg-[#8B1E26] w-8 h-2" : "bg-gray-300 w-2 h-2"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <a
            href="https://www.tripadvisor.com.ph/Attraction_Review-g294197-d4492012-Reviews-Seoul_City_Tour-Seoul.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#8B1E26] text-white font-semibold rounded-xl hover:bg-[#6E0D0D] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span>View All 21,044 Reviews</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
