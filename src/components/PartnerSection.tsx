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
        // ✅ 로고 간격: 모바일 gap-4 / PC gap-6
        className="flex gap-4 md:gap-6 flex-nowrap"
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
              // ✅ 로고 박스 크기 조절:
              // 모바일: w-[140px] h-[60px]
              // PC: w-[180px] h-[80px]
              className="relative flex items-center justify-center w-[140px] h-[60px] md:w-[180px] md:h-[80px] bg-white border border-gray-100 rounded-xl shadow-sm flex-shrink-0 cursor-pointer hover:shadow-md transition-all duration-300 group"
            >
              {/* ✅ 내부 이미지 영역도 비율에 맞춰 축소 */}
              {/* 모바일: w-[100px] h-[30px] / PC: w-[140px] h-[40px] */}
              <div className="relative w-[100px] h-[30px] md:w-[140px] md:h-[40px] opacity-60 group-hover:opacity-100 group-hover:grayscale-0 grayscale transition-all duration-300">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100px, 140px"
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
    // ✅ 섹션 여백: 모바일 py-12 / PC py-24
    <section className="w-full py-12 lg:py-24 bg-white border-b border-gray-100 overflow-hidden">
      {/* ⭐ 칼각 정렬: max-w-6xl + px-8 lg:px-12 */}
      {/* 제목 영역 하단 여백: 모바일 mb-8 / PC mb-12 */}
      <div className="max-w-6xl mx-auto px-8 lg:px-12 mb-8 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* 소제목: 모바일 10px / PC 11px */}
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#4A7C7E] font-bold mb-2 md:mb-3">
            Verified & Official
          </p>

          {/* ⭐ 섹션 타이틀: 디자인 시스템 적용 */}
          {/* 폰트: 한게임 포커체 Bold (700) */}
          {/* 크기: 모바일 20px(xl) / PC 24px(2xl) */}
          {/* 여백: 모바일 mb-4 / PC mb-6 */}
          <h2
            className={`${hangameFont.className} text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight`}
          >
            Government Accredited Partner
          </h2>

          {/* ⭐ 설명글: 14px (text-sm) 유지 */}
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

      {/* 🌊 흐르는 배너 */}
      <div className="flex flex-col gap-4 md:gap-6">
        <MarqueeRow items={bookingPartners} direction="left" speed={40} />
        <MarqueeRow items={officialPartners} direction="right" speed={45} />
      </div>
    </section>
  );
}
