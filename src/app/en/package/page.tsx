"use client";

import React from "react";

export default function PackageTourPage() {
  const packageTours = [
    {
      id: 1,
      title: "[SAVE THE TIME] Nami Island + Lotte World Private Car",
      image:
        "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=600&h=400&fit=crop",
      tags: ["Lotte World", "Nami Island", "Private", "Day Tour"],
      tourName: "Morning Palace Tour",
      minimumPax: 1,
      timeRequired: "09:00-12:30",
      originalPrice: 50000,
      discount: 10,
      price: 45000,
    },
    {
      id: 2,
      title: "Retro Incheon: Costumes & Street Food",
      image:
        "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=400&fit=crop",
      tags: ["Incheon", "Retro", "Costumes", "Street Food"],
      tourName: "DMZ Full Day Tour",
      minimumPax: 2,
      timeRequired: "08:00-17:00",
      originalPrice: 95000,
      discount: 10,
      price: 85000,
    },
    {
      id: 3,
      title: "DMZ Tour & Campnic with BBQ Experience",
      image:
        "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&h=400&fit=crop",
      tags: ["DMZ Tour", "Camping", "BBQ", "Seoul Day Trip"],
      tourName: "Seoul City Full Tour",
      minimumPax: 1,
      timeRequired: "09:00-18:00",
      originalPrice: 105000,
      discount: 10,
      price: 95000,
    },
    {
      id: 4,
      title: "Midnight Pocha Crawl: The Real Korea Begins After Dark",
      image:
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop",
      tags: ["Seoul Night", "Pocha Crawl", "Drinks", "Food Tour"],
      tourName: "Night Food & Drink Tour",
      minimumPax: 2,
      timeRequired: "18:00-23:00",
      originalPrice: 85000,
      discount: 15,
      price: 75000,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Hero Section */}
      <div className="relative pb-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/background_korea_pt2.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-red-700/80 via-red-800/80 to-red-900/80" />

        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 relative">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-5xl">🎒</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide">
              Group Activity Tours
            </h1>
          </div>
          <p className="text-red-100 text-base md:text-lg ml-16 max-w-2xl">
            Join a guided tour and experience the journey!
          </p>
        </div>

        {/* Decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-900 via-red-600 to-red-900" />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-10 pb-16">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-t-2 border-red-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packageTours.map((tour) => (
              <div
                key={tour.id}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-red-800 group cursor-pointer h-full flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-200 overflow-hidden flex-shrink-0">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {tour.discount}% OFF
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {tour.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 mb-3 leading-snug line-clamp-2 min-h-[2.5rem]">
                    {tour.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs text-gray-400 line-through">
                      ₩{tour.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-red-600">
                      {tour.discount}%
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      ₩{tour.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-gray-600 border-t pt-3 mb-4">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-500">Tour:</span>
                      <span className="text-gray-700">{tour.tourName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-500">Min:</span>
                      <span className="text-gray-700 font-medium">
                        {tour.minimumPax} pax
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-500">Time:</span>
                      <span className="text-gray-700 font-medium">
                        {tour.timeRequired}
                      </span>
                    </div>
                  </div>

                  <button className="w-full bg-gray-100 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-red-800 hover:text-white transition-all duration-300 flex items-center justify-center gap-1 mt-auto">
                    View Details
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
