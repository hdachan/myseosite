"use client";

import React, { useState } from "react";

type Category = "ALL" | "DMZ" | "DAILY" | "LOCAL" | "DRAMA" | "SKI";

export default function PackageTourPage() {
  const [category, setCategory] = useState<Category>("ALL");

  const packageTours = [
    {
      id: 1,
      category: "DAILY",
      location: "Tour · Seoul",
      title: "[Muslim Friendly] Special Seoul/Nami Island Day Tour",
      description: "Available from tomorrow · Limited seats",
      image:
        "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=600&h=400&fit=crop",
      rating: 5,
      reviews: 9,
      bookings: "100+ bookings",
      price: 112.79,
      originalPrice: 150.0,
      discount: 25,
    },
    {
      id: 2,
      category: "DMZ",
      location: "Tour · DMZ",
      title: "DMZ & North Korea Observation Tour",
      description: "Joint Security Area · Dora Observatory",
      image:
        "https://images.unsplash.com/photo-1601096829474-4aae6cc5e66f?w=600&h=400&fit=crop",
      rating: 4.9,
      reviews: 124,
      bookings: "300+ bookings",
      price: 79.0,
    },
    {
      id: 3,
      category: "DRAMA",
      location: "Tour · Seoul",
      title: "K-Drama Filming Location Tour",
      description: "Visit famous shooting locations",
      image:
        "https://images.unsplash.com/photo-1526481280691-3d3fcd7c61c9?w=600&h=400&fit=crop",
      rating: 4.8,
      reviews: 67,
      bookings: "120+ bookings",
      price: 65.5,
      originalPrice: 92.0,
      discount: 29,
    },
    {
      id: 4,
      category: "SKI",
      location: "Tour · Gangwon",
      title: "Vivaldi Park Ski Day Tour",
      description: "Beginner friendly · Rental included",
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop",
      rating: 4.7,
      reviews: 88,
      bookings: "150+ bookings",
      price: 99.0,
    },
  ];

  const filteredTours =
    category === "ALL"
      ? packageTours
      : packageTours.filter((t) => t.category === category);

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* ===== 기존 Hero / 배경 (절대 수정 X) ===== */}
      <div className="relative pb-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/background_korea_pt2.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-red-700/80 via-red-800/80 to-red-900/80" />

        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Group Activity Tours
          </h1>
          <p className="text-red-100 mt-3">
            Join a guided tour and experience the journey!
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-900 via-red-600 to-red-900" />
      </div>

      {/* ===== Content ===== */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-10 pb-16">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-t-2 border-red-800">
          {/* 🔹 카테고리 */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              ["ALL", "전체보기"],
              ["DMZ", "DMZ Tour"],
              ["DAILY", "Daily Tour"],
              ["LOCAL", "Local Tour"],
              ["DRAMA", "Drama Tour"],
              ["SKI", "Ski Tour"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setCategory(key as Category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition
                  ${
                    category === key
                      ? "bg-red-700 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* 🔹 카드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTours.map((tour) => (
              <a
                key={tour.id}
                href={`/en/package/${tour.id}`}
                className="group block"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-[380px] flex flex-col">
                  <div className="relative h-[140px] overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* 할인 뱃지 */}
                    {tour.discount && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-md">
                        {tour.discount}% OFF
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="text-xs text-gray-500 mb-2">
                      {tour.location}
                    </div>

                    <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 leading-snug">
                      {tour.title}
                    </h3>

                    <div className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {tour.description}
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      <span className="text-yellow-500 text-sm">★</span>
                      <span className="text-sm font-bold text-gray-900">
                        {tour.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({tour.reviews}) • {tour.bookings}
                      </span>
                    </div>

                    <div className="mt-auto">
                      {tour.discount ? (
                        <>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-gray-400 line-through">
                              $ {tour.originalPrice}
                            </span>
                            <span className="text-xs font-semibold text-red-600">
                              {tour.discount}% OFF
                            </span>
                          </div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xl font-bold text-red-600">
                              $ {tour.price}
                            </span>
                            <span className="text-sm text-gray-600">From</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-bold text-gray-900">
                            $ {tour.price}
                          </span>
                          <span className="text-sm text-gray-600">From</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
