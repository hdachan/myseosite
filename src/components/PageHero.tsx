import Image from "next/image";
import React from "react";
import { hangameFont } from "@/lib/fonts";

interface PageHeroProps {
  title: string;
  description?: string;
  imageSrc: string;
  alt?: string;
}

export default function PageHero({
  title,
  description,
  imageSrc,
  // ✅ [추가 2] alt가 안 넘어오면 title을 대신 쓰도록 설정
  alt,
}: PageHeroProps) {
  return (
    <header className="relative w-full h-[250px] md:h-[300px] overflow-hidden mt-16 md:mt-20">
      {/* 1. 배경 이미지 영역 */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={alt || title}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </div>

      {/* 2. 오버레이 레이어 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/50" />

      {/* 3. 텍스트 콘텐츠 영역 */}
      <div className="relative z-10 h-full max-w-6xl mx-auto px-8 lg:px-12 flex flex-col justify-center">
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
