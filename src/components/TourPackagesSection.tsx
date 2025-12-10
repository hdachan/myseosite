// src/components/TourPackagesSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Users, Clock, Star } from "lucide-react";
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
        minPerson: 2,
        price: 110000,
        description:
          "Blue House, Gyeongbok Palace, National Folk Museum, Jogyesa Temple, Changdeok Palace, Insadong, Namdaemun Market",
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
        minPerson: 4,
        price: 140000,
        description:
          "A) That Winter, the Wind Blows + Gangnam Style / B) That Winter, the Wind Blows + Winter Sonata",
      },
    ],
  },
];

export default function TourPackagesSection() {
  const [activeTab, setActiveTab] = useState("daily");

  const activeCategory = tourCategories.find((cat) => cat.id === activeTab);

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F8F1E7] to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* 헤더 - 왼쪽 정렬 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-sm uppercase tracking-widest text-[#8B1E26] font-medium mb-3">
            Popular Tours
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight max-w-4xl">
            Best Tour Packages
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            한국의 매력을 느낄 수 있는 특별한 투어 상품을 만나보세요
          </p>
        </motion.div>

        {/* 탭 메뉴 - 왼쪽 정렬 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {tourCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-8 py-4 rounded-lg font-semibold text-base transition-all duration-300 whitespace-nowrap ${
                activeTab === category.id
                  ? "bg-[#8B1E26] text-white shadow-lg hover:bg-[#6E0D0D]"
                  : "bg-white text-gray-700 hover:bg-[#F8F1E7] border border-[#D4A017]/30"
              }`}
            >
              {category.title}
            </button>
          ))}
        </motion.div>

        {/* 투어 카드 그리드 - 왼쪽부터 자연스럽게 채움 */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {activeCategory?.tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                {/* 이미지 영역 */}
                <div className="relative h-56 overflow-hidden bg-gray-200">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* 배지 - Main Brand Red & Accent Gold */}
                  {tour.badge && (
                    <div
                      className={`absolute top-4 left-4 ${
                        tour.badgeColor === "orange"
                          ? "bg-gradient-to-r from-[#D4A017] to-[#8B1E26]"
                          : "bg-gradient-to-r from-[#8B1E26] to-[#6E0D0D]"
                      } text-white px-4 py-2 rounded-lg font-bold shadow-lg text-sm`}
                    >
                      {tour.badge}
                    </div>
                  )}
                </div>

                {/* 콘텐츠 영역 */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#8B1E26] transition-colors leading-snug">
                    {tour.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed flex-grow">
                    {tour.description}
                  </p>

                  {/* 하단 정보 */}
                  <div className="space-y-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4 text-[#8B1E26]" />
                      <span className="text-xs font-medium">
                        최소 {tour.minPerson}인부터 출발
                      </span>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-2xl font-bold text-[#8B1E26]">
                          ₩{tour.price.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">1인당</div>
                      </div>
                      {tour.priceNote && (
                        <span className="text-xs text-[#8B1E26] bg-[#F8F1E7] px-2 py-1 rounded-full font-medium">
                          {tour.priceNote}
                        </span>
                      )}
                    </div>

                    {tour.alternatePrice && (
                      <div className="text-right">
                        <span className="text-base font-semibold text-[#8B1E26]">
                          ₩{tour.alternatePrice.toLocaleString()} ~
                        </span>
                        <span className="text-xs text-gray-500 ml-1">/p</span>
                      </div>
                    )}
                  </div>

                  <button className="mt-4 w-full bg-[#8B1E26] hover:bg-[#6E0D0D] text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
