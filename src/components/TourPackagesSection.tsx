"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import TourCard from "@/components/TourCard";
import { basicPackages as packageTours } from "@/app/package/packageData";

/* ✅ 폰트 가져오기 */
import { hangameFont } from "@/lib/fonts";

export default function TourPackagesSection() {
  const favoriteTours = packageTours.slice(0, 4);

  return (
    <section className="w-full py-12 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-8 md:mb-12"
        >
          {/* 섹션 제목 */}
          <h2
            className={`${hangameFont.className} text-xl md:text-2xl font-bold text-gray-900 leading-tight`}
          >
            South Korea Tour Packages
          </h2>

          {/* PC용 See all 링크 */}
          <Link
            href="/package"
            className={`${hangameFont.className} hidden sm:flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-[#ad3928] transition-colors pb-1`}
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

        {/* ✅ 그리드 레이아웃 수정: 모바일 1열(리스트) -> PC 4열(그리드) */}
        {/* 1. grid-cols-1: 모바일에서는 무조건 한 줄에 하나! (그래야 가로로 긴 카드가 됨) */}
        {/* 2. sm:grid-cols-2: 태블릿에선 2개 */}
        {/* 3. lg:grid-cols-4: PC에선 4개 */}
        {/* 4. gap-y-4: 모바일 리스트 간격 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4 sm:gap-x-6 sm:gap-y-10">
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

        {/* 모바일용 View all tours 버튼 */}
        <div className="mt-8 sm:hidden text-center">
          <Link
            href="/package"
            className={`${hangameFont.className} inline-block px-6 py-3 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors`}
          >
            View all tours
          </Link>
        </div>
      </div>
    </section>
  );
}
