// src/components/GlobalReviewsSection.tsx

"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const GlobalReviewsSection = () => {
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

  return (
    <section className="relative py-20 lg:py-24 bg-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-widest text-[#8B1E26] font-medium mb-3">
            Global Reviews
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Trusted by Travelers
            <br />
            <span className="bg-gradient-to-r from-[#8B1E26] to-[#D4A017] bg-clip-text text-transparent">
              Worldwide
            </span>
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Friendly Guides · Safe Itinerary · Top-Rated Experience
          </p>
        </motion.div>

        {/* TripAdvisor Badge & Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-0">
              {/* TripAdvisor Section */}
              <div className="p-6 flex flex-col items-center justify-center border-r border-gray-100">
                <a
                  href="https://www.tripadvisor.com.ph/Attraction_Review-g294197-d4492012-Reviews-Seoul_City_Tour-Seoul.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="mb-3">
                    <div className="bg-gradient-to-br from-teal-400 to-teal-500 rounded-full w-16 h-16 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-11 h-11"
                        viewBox="0 0 120 120"
                        fill="none"
                      >
                        <circle cx="60" cy="45" r="5" fill="#1a1a1a" />
                        <circle cx="45" cy="45" r="5" fill="#1a1a1a" />
                        <circle cx="75" cy="45" r="5" fill="#1a1a1a" />
                        <path
                          d="M40 65 Q60 75 80 65"
                          stroke="#1a1a1a"
                          strokeWidth="4"
                          fill="none"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-xs text-teal-600 font-semibold mb-2">
                    TripAdvisor
                  </div>
                  <div className="text-sm font-bold text-gray-800 mb-3">
                    Certificate of Excellence
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-5 h-5 fill-[#D4A017] text-[#D4A017]"
                        />
                      ))}
                    </div>
                    <span className="text-2xl font-bold text-gray-900">
                      4.9
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">21,044 reviews</div>
                </a>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-px bg-gray-100">
                <div className="bg-white p-6 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#8B1E26] to-[#D4A017] bg-clip-text text-transparent mb-1">
                    98%
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    Recommended
                  </div>
                </div>
                <div className="bg-white p-6 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#8B1E26] to-[#D4A017] bg-clip-text text-transparent mb-1">
                    20K+
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    Excellent
                  </div>
                </div>
                <div className="bg-white p-6 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#8B1E26] to-[#D4A017] bg-clip-text text-transparent mb-1">
                    #50
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    of 878 Tours
                  </div>
                </div>
                <div className="bg-white p-6 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#8B1E26] to-[#D4A017] bg-clip-text text-transparent mb-1">
                    100+
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    Countries
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col hover:-translate-y-1">
                {/* 헤더: 별점과 날짜 */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-[#D4A017] text-[#D4A017]"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 font-medium">
                    {review.date}
                  </span>
                </div>

                {/* 따옴표 아이콘 */}
                <Quote className="w-8 h-8 text-[#8B1E26]/20 mb-3" />

                {/* 리뷰 내용 */}
                <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-grow">
                  {review.comment}
                </p>

                {/* 하단: 리뷰어 정보 */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    {/* 아바타 */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B1E26] to-[#D4A017] flex items-center justify-center text-white font-bold text-sm shadow-md">
                      {review.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">
                        {review.name}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {review.flag} {review.country}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 투어 태그 */}
                <div className="mt-3">
                  <span className="inline-block text-xs text-[#8B1E26] bg-[#F8F1E7] px-3 py-1.5 rounded-full font-medium">
                    {review.tour}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#8B1E26] text-white font-semibold rounded-xl hover:bg-[#6E0D0D] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span>View All 21,044 Reviews</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalReviewsSection;
