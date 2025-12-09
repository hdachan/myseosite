"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CategorySection() {
  const categories = [
    {
      id: 1,
      title: "DISCOVER KOREA",
      icon: "/images/test/icon1.png",
      href: "/discover-korea",
    },
    {
      id: 2,
      title: "BTS In the soop",
      icon: "/images/test/icon2.png",
      href: "/bts-soop",
    },
    {
      id: 3,
      title: "DMZ TOURS",
      icon: "/images/test/icon1.png",
      href: "/dmz",
    },
    {
      id: 4,
      title: "REQUEST",
      icon: "/images/test/icon2.png",
      href: "/request",
    },
  ];

  return (
    <section className="w-full py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* 섹션 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-[#8B1E26] font-medium mb-3">
            What We Offer
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Explore by Category
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-[75px] md:flex-nowrap">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={cat.href}
                className="flex flex-col items-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="relative w-[150px] h-[150px] rounded-2xl bg-gradient-to-br from-white to-gray-50 flex items-center justify-center shadow-md transition-all duration-300 group-hover:shadow-xl border border-gray-100 overflow-hidden"
                >
                  {/* 호버시 배경 효과 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8B1E26]/5 to-[#D4A017]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* 테두리 글로우 효과 */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-[#D4A017]/0 group-hover:border-[#D4A017]/30 transition-all duration-300"></div>

                  <motion.img
                    src={cat.icon}
                    alt={cat.title}
                    className="w-[100px] h-[100px] relative z-10"
                    initial={{ opacity: 0.8 }}
                    whileHover={{
                      opacity: 1,
                      rotate: [0, -5, 5, -5, 0],
                      transition: { duration: 0.5 },
                    }}
                  />

                  {/* 펄스 효과 */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-[#D4A017]/10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1.1, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>

                <motion.p
                  className="mt-4 text-center font-semibold tracking-wide text-gray-700 group-hover:text-[#8B1E26] transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {cat.title}
                </motion.p>

                {/* 하단 인디케이터 */}
                <motion.div
                  className="mt-2 h-0.5 bg-[#D4A017] rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "60px" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
