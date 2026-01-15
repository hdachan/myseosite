import Image from "next/image";
import React from "react";

/* ✅ 폰트 가져오기 */
import { hangameFont } from "@/lib/fonts";

interface PageHeroProps {
  title: string;
  description?: string;
  imageSrc: string;
}

export default function PageHero({
  title,
  description,
  imageSrc,
}: PageHeroProps) {
  return (
    // 배너 높이를 300px 내외로 슬림하게 설정 (모바일 250px / 데스크톱 300px)
    <header className="relative w-full h-[250px] md:h-[300px] overflow-hidden">
      {/* 1. 배경 이미지 영역 */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={title}
          // 추천 해상도: 1920 x 300
          width={1920}
          height={300}
          priority
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. 오버레이 레이어 (전체 어둡게) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/50" />

      {/* 3. 텍스트 콘텐츠 영역 */}
      {/* ⭐ 규격 통일: px-6 -> px-8 lg:px-12 로 변경하여 다른 섹션과 라인 일치 */}
      <div className="relative z-10 h-full max-w-6xl mx-auto px-8 lg:px-12 flex flex-col justify-center">
        {/* ⭐ 폰트 적용: hangameFont */}
        <h1
          className={`${hangameFont.className} text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight`}
        >
          {title}
        </h1>

        {description && (
          <p className="text-red-50/90 text-sm md:text-base max-w-xl font-light leading-snug">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
