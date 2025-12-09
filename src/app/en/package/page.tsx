"use client";

import React from "react";
import Link from "next/link";

export default function PackageTourPage() {
  const packageTours = [
    {
      id: 1,
      title: "[SAVE THE TIME] Nami Island+Lotte World Private Car",
      image:
        "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=600&h=400&fit=crop",
      tags: ["Lotte", "World", "Nami", "Island", "Day", "Tour"],
      tourName: "Morning TOUR 1 Palace Morning Tour",
      minimumPax: 1,
      timeRequired: "09:00-12:30",
      originalPrice: "KRW 50,000",
      discount: "10%",
      price: "KRW 45,000",
    },
    {
      id: 2,
      title: "Retro Incheon: Costumes & Street Food",
      image:
        "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=400&fit=crop",
      tags: ["Incheon", "Retro", "Costumes", "Street", "Food"],
      tourName: "DMZ Full Day Tour",
      minimumPax: 2,
      timeRequired: "08:00-17:00",
      originalPrice: "KRW 95,000",
      discount: "10%",
      price: "KRW 85,000",
    },
    {
      id: 3,
      title: "DMZ Tour & Campnic with BBQ Experience",
      image:
        "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&h=400&fit=crop",
      tags: ["DMZ", "DMZtour", "camping", "SeoulDayTrip"],
      tourName: "Seoul City Full Tour",
      minimumPax: 1,
      timeRequired: "09:00-18:00",
      originalPrice: "KRW 105,000",
      discount: "10%",
      price: "KRW 95,000",
    },
    {
      id: 4,
      title: "Midnight Pocha Crawl: The Real Korea Begins After Dark",
      image:
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop",
      tags: ["Seoul", "Night", "Tour", "DrinkingGames"],
      tourName: "Night Food Tour",
      minimumPax: 2,
      timeRequired: "18:00-23:00",
      originalPrice: "KRW 85,000",
      discount: "15%",
      price: "KRW 75,000",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Hero Section - 심플하고 컴팩트 */}
      <div className="relative pb-32">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/background_korea_pt2.jpg')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-red-700/80 via-red-800/80 to-red-900/80"></div>

        <div className="container mx-auto px-6 py-12 md:py-16 relative">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-5xl">🧳</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide">
              Group Activity Tours
            </h1>
          </div>

          <p className="text-red-100 text-base md:text-lg ml-16 max-w-2xl">
            Join a guided tour and experience the journey!
          </p>
        </div>

        {/* Decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-900 via-red-600 to-red-900"></div>

        {/* Breadcrumb - overlapping */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-6">
            <div className="bg-white rounded-t-3xl shadow-2xl px-8 py-5 inline-block border-t-4 border-red-800">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span className="text-red-800">🏠</span>
                <span className="text-gray-400">/</span>
                <span className="text-red-800">Package Tours</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 -mt-16 relative z-10 pb-16">
        <div className="bg-white rounded-2xl shadow-xl p-6 border-t-2 border-red-800">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {packageTours.map((tour) => (
              <Link
                href={`/en/package/${tour.id}`}
                key={tour.id}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-red-800 group block"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Tags */}
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

                  {/* Title */}
                  <h3 className="text-sm font-bold text-gray-900 mb-3 leading-snug line-clamp-2 min-h-[2.5rem]">
                    {tour.title}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gray-400 line-through">
                      {tour.originalPrice}
                    </span>
                    <span className="text-xs font-bold text-red-600">
                      {tour.discount}
                    </span>
                    <span className="text-base font-bold text-gray-900">
                      {tour.price}
                    </span>
                  </div>

                  {/* Tour Details */}
                  <div className="space-y-1.5 text-xs text-gray-600 mb-4 pt-3 border-t border-gray-100">
                    <div className="flex justify-between">
                      <span className="font-medium">Tour Name:</span>
                      <span className="text-right text-gray-500 text-xs">
                        {tour.tourName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Min Pax:</span>
                      <span className="text-gray-500">{tour.minimumPax}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Time:</span>
                      <span className="text-gray-500">{tour.timeRequired}</span>
                    </div>
                  </div>

                  {/* Button */}
                  <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-red-800 hover:text-white transition-all duration-300 flex items-center justify-center gap-1">
                    <span>View Details</span>
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
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
