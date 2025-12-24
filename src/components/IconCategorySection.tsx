"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CategorySection() {
  const categories = [
    {
      id: 1,
      title: "Discover Korea",
      icon: "/images/test/icon1.png",
      href: "/discover-korea",
      alt: "Discover Korea travel experiences and attractions",
    },
    {
      id: 2,
      title: "BTS In the Soop",
      icon: "/images/test/icon2.png",
      href: "/bts-soop",
      alt: "BTS In the Soop filming locations and tours in Korea",
    },
    {
      id: 3,
      title: "DMZ Tours",
      icon: "/images/test/icon1.png",
      href: "/dmz",
      alt: "DMZ tours to the North Korea border from Seoul",
    },
    {
      id: 4,
      title: "Custom Request",
      icon: "/images/test/icon2.png",
      href: "/request",
      alt: "Custom Korea travel request and private tour planning",
    },
  ];

  return (
    <section
      className="w-full py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-[#F8F1E7]"
      aria-labelledby="category-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-[#4A7C7E] font-medium mb-3">
            What We Offer
          </p>
          <h2
            id="category-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
          >
            Explore Korea Tours by Category
          </h2>
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:flex md:flex-nowrap md:justify-center md:gap-[75px]">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex justify-center md:block"
            >
              <Link
                href={cat.href}
                className="flex flex-col items-center group w-full md:w-auto"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="relative w-full md:w-[150px] aspect-square max-w-[150px] rounded-2xl bg-gradient-to-br from-white to-[#F8F1E7] flex items-center justify-center shadow-md transition-all duration-300 group-hover:shadow-xl border border-gray-100 overflow-hidden"
                >
                  {/* Hover background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4A7C7E]/5 to-[#D97959]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Glow border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-[#4A7C7E]/0 group-hover:border-[#4A7C7E]/30 transition-all duration-300" />

                  {/* Icon */}
                  <motion.div
                    initial={{ opacity: 0.85 }}
                    whileHover={{ opacity: 1 }}
                    className="relative z-10"
                  >
                    <Image
                      src={cat.icon}
                      alt={cat.alt}
                      width={90}
                      height={90}
                      className="object-contain"
                    />
                  </motion.div>

                  {/* Pulse effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-[#4A7C7E]/10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1.1, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>

                {/* Category title */}
                <h3 className="mt-3 md:mt-4 text-center font-semibold tracking-wide text-sm md:text-base text-gray-700 group-hover:text-[#4A7C7E] transition-colors duration-200 px-2">
                  {cat.title}
                </h3>

                {/* Bottom indicator */}
                <motion.div
                  className="mt-2 h-0.5 bg-[#4A7C7E] rounded-full"
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
