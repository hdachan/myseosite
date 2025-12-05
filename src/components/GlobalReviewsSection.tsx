// src/components/GlobalReviewsSection.tsx

"use client";

import { Star } from "lucide-react";

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
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TripAdvisor Badge & Rating */}
        <div className="text-center mb-12">
          <a
            href="https://www.tripadvisor.com.ph/Attraction_Review-g294197-d4492012-Reviews-Seoul_City_Tour-Seoul.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-6"
          >
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-sm font-semibold text-gray-800 mb-1">
                Certificate of Excellence 2024
              </div>
              <div className="bg-gradient-to-br from-teal-400 to-teal-500 rounded-full w-24 h-24 mx-auto my-3 flex items-center justify-center">
                <svg className="w-16 h-16" viewBox="0 0 120 120" fill="none">
                  <circle cx="60" cy="45" r="6" fill="#1a1a1a" />
                  <circle cx="45" cy="45" r="6" fill="#1a1a1a" />
                  <circle cx="75" cy="45" r="6" fill="#1a1a1a" />
                  <path
                    d="M40 65 Q60 75 80 65"
                    stroke="#1a1a1a"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
              </div>
              <div className="text-xs text-teal-600 font-medium">
                TripAdvisor
              </div>
            </div>
          </a>

          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-2xl font-bold">4.9</span>
            <span className="text-gray-500 text-sm">(21,044 reviews)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Trusted by Travelers Worldwide
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Friendly Guides · Safe Itinerary · Top-Rated Experience
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-1">98%</div>
            <div className="text-sm text-gray-600">Recommended</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-1">20K+</div>
            <div className="text-sm text-gray-600">Excellent</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-1">#50</div>
            <div className="text-sm text-gray-600">of 878 Tours</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-1">100+</div>
            <div className="text-sm text-gray-600">Countries</div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-400">{review.date}</span>
              </div>

              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                "{review.comment}"
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {review.name}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {review.flag} {review.country}
                  </div>
                </div>
                <div className="text-xs text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  {review.tour}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://www.tripadvisor.com.ph/Attraction_Review-g294197-d4492012-Reviews-Seoul_City_Tour-Seoul.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors text-sm shadow-sm"
          >
            View All Reviews
          </a>
        </div>
      </div>
    </section>
  );
};

export default GlobalReviewsSection;
