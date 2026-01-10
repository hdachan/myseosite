"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import TourCard from "@/components/TourCard";
import { basicPackages as packageTours } from "@/app/package/packageData";

export default function TourPackagesSection() {
  // 실제 데이터에서 4개만 가져오기
  const favoriteTours = packageTours.slice(0, 4);

  return (
    <section className="w-full py-16 lg:py-24 bg-white">
      {/* ⭐ 칼각 정렬: max-w-6xl + px-12 */}
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        {/* 헤더: Klook 스타일 제목 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            South Korea Tour Packages
          </h2>

          {/* 더보기 버튼 (PC용) */}
          <Link
            href="/package"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-[#ad3928] transition-colors"
          >
            See all
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </motion.div>

        {/* 그리드 레이아웃 (4열) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {favoriteTours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <TourCard tour={tour} />
            </motion.div>
          ))}
        </div>

        {/* 모바일용 더보기 버튼 */}
        <div className="mt-8 sm:hidden text-center">
          <Link
            href="/package"
            className="inline-block px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            View all tours
          </Link>
        </div>
      </div>
    </section>
  );
}
