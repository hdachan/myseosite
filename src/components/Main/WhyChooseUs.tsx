import React from "react";
import Image from "next/image";

/* ✅ 폰트 가져오기 */
import { hangameFont } from "@/lib/fonts";

export default function WhyChooseUs() {
  const features = [
    {
      imageSrc: "/images/icon/award.png",
      title: "Licensed & Experienced Guides",
      desc: "All tours are led by certified Korean tour guides with proven field experience.",
    },
    {
      imageSrc: "/images/icon/shield.png",
      title: "Safety-First Operations",
      desc: "Accident-free tour history with clean, regularly maintained tourist buses.",
    },
    {
      imageSrc: "/images/icon/headset.png",
      title: "Clear, Fast, and Transparent Communication",
      desc: "Quick and clear responses with transparent support before, during, and after each tour.",
    },
    {
      imageSrc: "/images/icon/globe.png",
      title: "Trusted by Global Partners",
      desc: "Long-term partnerships with international travel agencies and clients worldwide.",
    },
  ];

  return (
    <section className="relative w-full py-12 lg:py-24 bg-white border-t border-gray-100 overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/company/typeA_01.png"
          alt="Background Pattern"
          fill
          className="object-cover opacity-50 pointer-events-none"
          priority
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
        {/* 섹션 제목 */}
        <div className="mb-8 md:mb-12 text-left">
          <h2
            className={`${hangameFont.className} text-xl md:text-2xl font-bold text-gray-900 leading-tight`}
          >
            Why Choose Us Seoul City Tour
          </h2>
        </div>

        {/* 컨테이너 */}
        <div
          className="
          /* 모바일: 가로 스크롤 + 갭 3 */
          flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4
          
          /* PC: 그리드 복귀 */
          md:grid md:grid-cols-2 md:gap-0 md:pb-0 md:overflow-visible
          md:border md:border-gray-200 md:rounded-[6px] md:bg-white
        "
        >
          {features.map((item, idx) => {
            const pcBorderClass = `
              md:border-gray-200
              ${idx % 2 === 0 ? "md:border-r" : ""} 
              md:border-b-0 md:[&:nth-child(-n+2)]:border-b
            `;

            return (
              <div
                key={idx}
                className={`
                  /* 박스 너비: 200px */
                  w-[200px] flex-shrink-0 snap-center
                  
                  /* 왼쪽 정렬(items-start) 확인 */
                  flex flex-col items-start p-5
                  border border-gray-200 rounded-xl bg-white/60 backdrop-blur-sm
                  
                  /* PC 스타일 */
                  md:w-auto
                  md:flex-row md:items-start md:p-12
                  md:border-0 md:rounded-none md:bg-transparent md:backdrop-blur-none
                  
                  ${pcBorderClass}
                `}
              >
                {/* 아이콘 영역 */}
                <div
                  className="
                  flex-shrink-0 
                  mb-1 mr-0
                  md:mb-0 md:mr-8
                "
                >
                  <div className="relative w-[60px] h-[60px] md:w-[66px] md:h-[66px]">
                    {/* ✅ 수정됨: object-left 추가 (아이콘을 왼쪽 벽으로 붙임) */}
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 50px, 66px"
                      className="object-contain object-left"
                    />
                  </div>
                </div>

                {/* 텍스트 영역 */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`${hangameFont.className} text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3 leading-tight`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`${hangameFont.className} text-base text-gray-600 leading-relaxed font-normal break-words whitespace-normal md:text-sm`}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
