// src/components/TourPackagesSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const tourCategories = [
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
        title: "DMZ Tour(The 3rd Infiltration Tunnel Tour)",
        location: "Seoul",
        minPerson: 1,
        price: 70000,
        description:
          "Imjingak Park, Freedom Bridge, The 3rd Infiltration Tunnel, DMZ Theater/Exhibition Hall, Dora Observatory",
      },
      {
        id: 2,
        badge: "BEST",
        badgeColor: "orange",
        image:
          "https://images.unsplash.com/photo-1532264523420-881a47db012d?w=400&h=300&fit=crop",
        title: "Half Day City Tour(Palace Morning Tour)",
        location: "Seoul",
        minPerson: 2,
        price: 45000,
        description:
          "Blue House, Gyeongbok Palace, National Folk Museum, Jogyesa Temple",
      },
      {
        id: 3,
        badge: "BEST",
        badgeColor: "orange",
        image:
          "https://images.unsplash.com/photo-1549693578-d683be217e58?w=400&h=300&fit=crop",
        title: "One of The Most Popular Full Day City Tour",
        location: "Seoul",
        minPerson: 2,
        price: 110000,
        description:
          "Blue House, Gyeongbok Palace, National Folk Museum, Jogyesa Temple, Changdeok Palace, Insadong, Namdaemun Market",
      },
      {
        id: 7,
        badge: "BEST",
        badgeColor: "orange",
        image:
          "https://images.unsplash.com/photo-1549693578-d683be217e58?w=400&h=300&fit=crop",
        title: "Seoul Night Tour",
        location: "Seoul",
        minPerson: 2,
        price: 85000,
        description:
          "N Seoul Tower, Hangang River Cruise, Dongdaemun Design Plaza",
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
        title: "Winter Sonata Tour(Nami Island Tour)",
        location: "Gyeonggi",
        minPerson: 2,
        price: 135000,
        description:
          "A) Nami Island, The Garden of Morning Calm / B) Nami Island, Rail Bike, Petite France",
        priceNote: "(min.4)",
      },
      {
        id: 5,
        badge: "HOT",
        badgeColor: "red",
        image:
          "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=300&fit=crop",
        title: "My Love From The Star",
        location: "Seoul",
        minPerson: 4,
        price: 155000,
        description:
          "A) Petite France + Korea National Folk Village / B) Petite France + N Seoul Tower",
        alternatePrice: 145000,
      },
      {
        id: 6,
        badge: "HOT",
        badgeColor: "red",
        image:
          "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=400&h=300&fit=crop",
        title: "That Winter, the Wind Blows Tour",
        location: "Seoul",
        minPerson: 4,
        price: 140000,
        description:
          "A) That Winter, the Wind Blows + Gangnam Style / B) That Winter, the Wind Blows + Winter Sonata",
      },
      {
        id: 8,
        badge: "HOT",
        badgeColor: "red",
        image:
          "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=400&h=300&fit=crop",
        title: "Squid Game Filming Location Tour",
        location: "Seoul",
        minPerson: 3,
        price: 95000,
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
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <button className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                    <svg
                      className="w-4 h-4 text-gray-700"
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
                </div>

                {/* 텍스트 */}
                <div className="p-4 h-44 flex flex-col">
                  <div className="text-xs text-gray-500 mb-2 font-normal">
                    {tour.location}
                  </div>

                  <h3 className="text-sm font-medium text-gray-800 mb-auto line-clamp-2 leading-relaxed">
                    {tour.title}
                  </h3>

                  <div className="mt-4">
                    {tour.alternatePrice && (
                      <div className="text-xs text-red-500 font-medium mb-1">
                        Up to 30% OFF
                      </div>
                    )}
                    <div className="flex items-baseline gap-1.5">
                      <div className="text-lg font-bold text-gray-900">
                        ₩{tour.price.toLocaleString()}
                      </div>
                      {tour.alternatePrice && (
                        <div className="text-xs text-gray-400 line-through">
                          ₩{tour.alternatePrice.toLocaleString()}
                        </div>
                      )}
                    </div>
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
