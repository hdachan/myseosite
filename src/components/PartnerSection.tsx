"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// ✅ 1. 글로벌 예약 파트너
const bookingPartners = [
  { name: "TripAdvisor", logo: "/logo/tripadvisor.webp" },
  { name: "Viator", logo: "/logo/viator.png" },
  { name: "GetYourGuide", logo: "/logo/getyourguide.png" },
  { name: "Klook", logo: "/logo/klook.png" },
];

// ✅ 2. 공식 인증 및 호텔 파트너
const officialPartners = [
  { name: "Korea Tourism Org", logo: "/logo/kto.png" },
  { name: "Seoul Tourism Org", logo: "/logo/seoul_tourism.webp" },
  { name: "The Shilla", logo: "/logo/shilla.png" },
  { name: "Hilton", logo: "/logo/hilton.png" },
];

const MarqueeRow = ({
  items,
  direction = "left",
  speed = 30,
}: {
  items: typeof bookingPartners;
  direction?: "left" | "right";
  speed?: number;
}) => {
  return (
    <div className="relative flex overflow-hidden w-full py-4">
      <motion.div
        className="flex gap-6 flex-nowrap"
        animate={{
          x: direction === "left" ? "-50%" : "0%",
        }}
        initial={{
          x: direction === "left" ? "0%" : "-50%",
        }}
        transition={{
          ease: "linear",
          duration: speed,
          repeat: Infinity,
        }}
      >
        {[...items, ...items, ...items, ...items, ...items, ...items].map(
          (partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="relative flex items-center justify-center w-[180px] h-[80px] bg-white border border-gray-100 rounded-xl shadow-sm flex-shrink-0 cursor-pointer hover:shadow-md transition-all duration-300 group"
            >
              <div className="relative w-[140px] h-[40px] opacity-60 group-hover:opacity-100 group-hover:grayscale-0 grayscale transition-all duration-300">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="140px"
                />
              </div>
            </div>
          )
        )}
      </motion.div>
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default function PartnerSection() {
  return (
    <section className="w-full py-16 lg:py-24 bg-white border-b border-gray-100 overflow-hidden">
      {/* ⭐ 칼각 정렬: max-w-6xl + px-8 lg:px-12 */}
      <div className="max-w-6xl mx-auto px-8 lg:px-12 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* 소제목: 11px 규격 적용 */}
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#4A7C7E] font-bold mb-3">
            Verified & Official
          </p>

          {/* ⭐ 섹션 타이틀: 24px (text-2xl) 고정 */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
            Government Accredited Partner
          </h2>

          {/* ⭐ 설명글: 14px (text-sm) 적용 */}
          <p className="text-gray-600 max-w-2xl text-sm leading-relaxed">
            Officially certified by the{" "}
            <strong className="text-gray-900">
              Korea Tourism Organization
            </strong>{" "}
            and{" "}
            <strong className="text-gray-900">
              Seoul Tourism Organization
            </strong>
            . We guarantee the highest safety standards and professional service
            as a trusted local expert.
          </p>
        </motion.div>
      </div>

      {/* 🌊 흐르는 배너 (디자인 간소화 유지) */}
      <div className="flex flex-col gap-6">
        <MarqueeRow items={bookingPartners} direction="left" speed={40} />
        <MarqueeRow items={officialPartners} direction="right" speed={45} />
      </div>
    </section>
  );
}
