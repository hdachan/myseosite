// src/components/TourPackagesSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Tour {
  id: number;
  badge: string;
  badgeColor: string;
  image: string;
  title: string;
  location: string;
  minPerson: number;
  price: number;
  description: string;
  originalPrice?: number;
  currency?: string;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  reviewLabel?: string;
  priceNote?: string;
  alternatePrice?: number;
}

interface TourCategory {
  id: string;
  title: string;
  tours: Tour[];
}

const tourCategories: TourCategory[] = [
  {
    id: "daily",
    title: "Seoul City Daily Tours",
    tours: [
      {
        id: 1,
        badge: "BEST",
        badgeColor: "orange",
        image:
          "https://images.unsplash.com/photo-1583562835057-a62d1beffbf3?w=400&h=300&fit=crop",
        title: "[Muslim Friendly] Special Seoul/Nami Island Day Tour",
        location: "Tour · Seoul",
        minPerson: 1,
        price: 112.79,
        originalPrice: 150.0,
        discount: 25,
        currency: "From",
        rating: 5.0,
        reviewCount: 9,
        reviewLabel: "100+ bookings",
        description: "Available from tomorrow · Limited seats",
      },
      {
        id: 2,
        badge: "BEST",
        badgeColor: "orange",
        image:
          "https://images.unsplash.com/photo-1532264523420-881a47db012d?w=400&h=300&fit=crop",
        title: "Half Day City Tour (Palace Morning Tour)",
        location: "Tour · Seoul",
        minPerson: 2,
        price: 45.0,
        currency: "From",
        rating: 4.8,
        reviewCount: 156,
        reviewLabel: "200+ bookings",
        description:
          "Blue House, Gyeongbok Palace, National Folk Museum, Jogyesa Temple",
      },
      {
        id: 3,
        badge: "BEST",
        badgeColor: "orange",
        image:
          "https://images.unsplash.com/photo-1549693578-d683be217e58?w=400&h=300&fit=crop",
        title: "Most Popular Full Day City Tour",
        location: "Tour · Seoul",
        minPerson: 2,
        price: 89.99,
        originalPrice: 119.99,
        discount: 25,
        currency: "From",
        rating: 4.9,
        reviewCount: 243,
        reviewLabel: "500+ bookings",
        description:
          "Gyeongbok Palace, Changdeok Palace, Insadong, Namdaemun Market",
      },
      {
        id: 7,
        badge: "BEST",
        badgeColor: "orange",
        image:
          "https://images.unsplash.com/photo-1549693578-d683be217e58?w=400&h=300&fit=crop",
        title: "Seoul Night Tour",
        location: "Tour · Seoul",
        minPerson: 2,
        price: 69.0,
        currency: "From",
        rating: 4.7,
        reviewCount: 89,
        reviewLabel: "150+ bookings",
        description: "N Seoul Tower, Han River Cruise, Dongdaemun Design Plaza",
      },
    ],
  },
  {
    id: "drama",
    title: "Korean Wave Drama Tour",
    tours: [
      {
        id: 4,
        badge: "HOT",
        badgeColor: "red",
        image:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        title: "Winter Sonata Tour (Nami Island Tour)",
        location: "Tour · Gyeonggi",
        minPerson: 2,
        price: 135.0,
        originalPrice: 180.0,
        discount: 25,
        currency: "From",
        rating: 4.9,
        reviewCount: 312,
        reviewLabel: "400+ bookings",
        description:
          "Nami Island, The Garden of Morning Calm / Rail Bike, Petite France",
      },
      {
        id: 5,
        badge: "HOT",
        badgeColor: "red",
        image:
          "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=300&fit=crop",
        title: "My Love From The Star",
        location: "Tour · Seoul",
        minPerson: 4,
        price: 155.0,
        currency: "From",
        rating: 4.8,
        reviewCount: 189,
        reviewLabel: "250+ bookings",
        description:
          "Petite France + Korea National Folk Village / Petite France + N Seoul Tower",
      },
      {
        id: 6,
        badge: "HOT",
        badgeColor: "red",
        image:
          "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=400&h=300&fit=crop",
        title: "That Winter, the Wind Blows Tour",
        location: "Tour · Seoul",
        minPerson: 4,
        price: 140.0,
        originalPrice: 200.0,
        discount: 30,
        currency: "From",
        rating: 4.7,
        reviewCount: 145,
        reviewLabel: "200+ bookings",
        description:
          "That Winter, the Wind Blows + Gangnam Style / Winter Sonata locations",
      },
      {
        id: 8,
        badge: "HOT",
        badgeColor: "red",
        image:
          "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=400&h=300&fit=crop",
        title: "Squid Game Filming Location Tour",
        location: "Tour · Seoul",
        minPerson: 3,
        price: 95.0,
        currency: "From",
        rating: 4.9,
        reviewCount: 276,
        reviewLabel: "350+ bookings",
        description:
          "Visit actual filming locations from the hit series Squid Game",
      },
    ],
  },
];

export default function TourPackagesSection() {
  const [activeTab, setActiveTab] = useState("daily");

  const activeCategory = tourCategories.find((cat) => cat.id === activeTab);

  return (
    <section className="relative pt-16 pb-32 lg:pt-24 lg:pb-44 bg-gradient-to-b from-[#F8F1E7] to-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#8B1E26] font-medium mb-2">
                Popular Tours
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Best Tour Packages
              </h2>
            </div>
            <button className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1">
              More
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
        </motion.div>

        {/* 탭 메뉴 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-14"
        >
          {tourCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === category.id
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category.title}
            </button>
          ))}
        </motion.div>

        {/* 카드 그리드 */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {activeCategory?.tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-[380px] flex flex-col">
                <div className="relative h-[140px] overflow-hidden flex-shrink-0">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {tour.badge && (
                    <div
                      className={`absolute top-2.5 left-2.5 ${
                        tour.badgeColor === "orange"
                          ? "bg-orange-500"
                          : "bg-red-500"
                      } text-white px-2.5 py-0.5 rounded-full text-xs font-medium`}
                    >
                      {tour.badge}
                    </div>
                  )}

                  {/* 할인 뱃지 */}
                  {tour.discount && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-md">
                      {tour.discount}% OFF
                    </div>
                  )}
                </div>

                {/* 텍스트 */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="text-xs text-gray-500 mb-2 font-normal">
                    {tour.location}
                  </div>

                  <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 leading-snug">
                    {tour.title}
                  </h3>

                  <div className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                    {tour.description}
                  </div>

                  {tour.rating && (
                    <div className="flex items-center gap-1 mb-3">
                      <span className="text-yellow-500 text-sm">★</span>
                      <span className="text-sm font-bold text-gray-900">
                        {tour.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({tour.reviewCount})
                      </span>
                      <span className="text-xs text-gray-500">
                        • {tour.reviewLabel}
                      </span>
                    </div>
                  )}

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
                          {tour.currency && (
                            <span className="text-sm text-gray-600 font-medium">
                              {tour.currency}
                            </span>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="flex items-baseline gap-1.5">
                        <div className="text-xl font-bold text-gray-900">
                          {tour.currency
                            ? `$ ${tour.price}`
                            : `₩${tour.price.toLocaleString()}`}
                        </div>
                        {tour.currency && (
                          <div className="text-sm text-gray-600 font-medium">
                            {tour.currency}
                          </div>
                        )}
                        {tour.alternatePrice && (
                          <div className="text-xs text-gray-400 line-through">
                            ₩{tour.alternatePrice.toLocaleString()}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
