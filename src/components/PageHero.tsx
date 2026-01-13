import Image from "next/image";
import React from "react";

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

      {/* 2. 오버레이 레이어 (왼쪽 텍스트 가독성 확보) */}
      {/* 사진의 오른쪽 디자인을 살리기 위해 왼쪽 위주로 어둡게 처리했습니다. */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-950/80 via-red-900/40 to-transparent" />

      {/* 3. 텍스트 콘텐츠 영역 */}
      <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex flex-col justify-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
          {title}
        </h1>

        {description && (
          <p className="text-red-50/90 text-sm md:text-base max-w-xl font-light leading-snug">
            {description}
          </p>
        )}
      </div>

      {/* 4. 하단 포인트 라인 */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-900 via-red-500 to-red-900" />
    </header>
  );
}
