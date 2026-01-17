"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/* ✅ 폰트 가져오기 */
import { hangameFont } from "@/lib/fonts";

// ✅ 1. 글로벌 예약 파트너
const bookingPartners = [
  { name: "TripAdvisor", logo: "/logo/tripadvisor.webp" },
  { name: "Viator", logo: "/logo/viator.png" },
  { name: "GetYourGuide", logo: "/logo/getyourguide.png" },
  { name: "Klook", logo: "/logo/klook.png" },
];

// ✅ 2. 공식 인증 및 호텔/기업 파트너
const officialPartners = [
  { name: "Korea Tourism Org", logo: "/logo/kto.png" },
  { name: "Seoul Tourism Org", logo: "/logo/seoul_tourism.png" },
  { name: "Samsung C&T", logo: "/logo/samsung_cnt.png" },
  { name: "LG", logo: "/logo/lg.png" },
  { name: "Korea University", logo: "/logo/korea_univ.png" },
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
        className="flex gap-8 md:gap-16 flex-nowrap"
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
              className="relative flex items-center justify-center w-[160px] h-[70px] md:w-[180px] md:h-[80px] flex-shrink-0 cursor-pointer group"
            >
              {/* ✅ 수정됨: grayscale 관련 클래스 제거 -> 항상 컬러로 표시 */}
              {/* 투명도 조절(opacity)은 유지하여 고급스러움은 남김 */}
              <div className="relative w-full h-full opacity-80 md:opacity-50 group-hover:opacity-100 transition-all duration-300">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 160px, 180px"
                />
              </div>
            </div>
          )
        )}
      </motion.div>

      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default function PartnerSection() {
  return (
    <section className="w-full py-12 lg:py-24 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-8 lg:px-12 mb-8 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#4A7C7E] font-bold mb-2 md:mb-3">
            Verified & Trusted Worldwide
          </p>

          <h2
            className={`${hangameFont.className} text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight`}
          >
            Trusted by Government & Global Partners
          </h2>

          <p className="text-gray-600 max-w-2xl text-sm leading-relaxed">
            Certified by the{" "}
            <strong className="text-gray-900">
              Korea Tourism Organization
            </strong>{" "}
            and trusted globally. We guarantee safety and professional
            excellence.
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col gap-2 md:gap-4">
        <MarqueeRow items={bookingPartners} direction="left" speed={40} />
        <MarqueeRow items={officialPartners} direction="right" speed={50} />
      </div>
    </section>
  );
}
