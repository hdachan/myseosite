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
      {/* 배경 이미지 (투명도 10%) - 섹션 전체에 깔림 */}
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

        {/* ✅ [수정됨] bg-white 추가! */}
        {/* bg-white: 이 박스에 흰색 배경을 칠해서, 뒤쪽 무늬를 가리고 앞으로 튀어나오게 함 */}
        <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-200 rounded-[6px] overflow-hidden bg-white">
          {features.map((item, idx) => {
            const borderClass = `
              ${idx % 2 === 0 ? "md:border-r" : ""} 
              ${idx < features.length - 1 ? "border-b" : ""} 
              md:border-b-0 md:[&:nth-child(-n+2)]:border-b
              border-gray-200
            `;

            return (
              <div
                key={idx}
                className={`flex items-start p-6 md:p-12 ${borderClass}`}
              >
                {/* 아이콘 */}
                <div className="flex-shrink-0 mr-5 md:mr-8">
                  <div className="relative w-[47.5px] h-[47.5px] md:w-[66px] md:h-[66px]">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 48px, 66px"
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* 텍스트 */}
                <div>
                  <h3
                    className={`${hangameFont.className} text-base md:text-xl font-semibold text-gray-900 mb-2 md:mb-3`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`${hangameFont.className} text-sm text-gray-600 leading-relaxed font-normal`}
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
