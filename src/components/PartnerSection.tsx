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

// ✨ 흐르는 애니메이션 컴포넌트
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
    <div className="relative flex overflow-hidden w-full mask-gradient py-4">
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
        {/* 끊김 방지를 위해 리스트 반복 */}
        {[...items, ...items, ...items, ...items, ...items, ...items].map(
          (partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="
                relative flex items-center justify-center 
                w-[180px] h-[80px] 
                bg-white border border-gray-100 rounded-xl shadow-sm
                flex-shrink-0 cursor-pointer 
                hover:shadow-md hover:border-[#4A7C7E]/30 
                transition-all duration-300 group
              "
            >
              {/* ✅ 로고 이미지 영역 */}
              <div className="relative w-[140px] h-[50px] opacity-60 group-hover:opacity-100 group-hover:grayscale-0 grayscale transition-all duration-300">
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

      {/* 좌우 그라데이션 (부드러운 마스크) */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default function PartnerSection() {
  return (
    <section className="w-full py-16 lg:py-24 bg-white border-b border-gray-100 overflow-hidden">
      {/* ⭐ 라인 정렬 수정: max-w-6xl, px-12 */}
      <div className="max-w-6xl mx-auto px-8 lg:px-12 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* 소제목: SEO 키워드 (Verified, Official) */}
          <p className="text-xs uppercase tracking-wider text-[#4A7C7E] font-medium mb-2">
            Verified & Official
          </p>

          {/* 메인 타이틀: 정부 인증 강조 */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Government Accredited Partner
          </h2>

          {/* 설명글: SEO + 신뢰도 (STO, KTO, Safety Standards) */}
          <p className="text-gray-600 max-w-2xl text-sm sm:text-base leading-relaxed">
            Officially certified by the{" "}
            <strong>Korea Tourism Organization</strong> and{" "}
            <strong>Seoul Tourism Organization</strong>. We guarantee the
            highest safety standards and professional service as a trusted local
            expert.
          </p>
        </motion.div>
      </div>

      {/* 🌊 흐르는 배너 영역 */}
      <div className="flex flex-col gap-8">
        {/* 첫 번째 줄: 왼쪽으로 흐름 */}
        <div>
          <MarqueeRow items={bookingPartners} direction="left" speed={40} />
        </div>

        {/* 두 번째 줄: 오른쪽으로 흐름 */}
        <div>
          <MarqueeRow items={officialPartners} direction="right" speed={45} />
        </div>
      </div>
    </section>
  );
}
