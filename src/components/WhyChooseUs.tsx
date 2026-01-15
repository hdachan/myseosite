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
    <section className="w-full py-16 lg:py-24 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        {/* 섹션 제목 */}
        <div className="mb-12 text-left">
          {/* ✅ 원본 크기(text-2xl) 유지 + 폰트만 적용 */}
          <h2
            className={`${hangameFont.className} text-2xl font-bold text-gray-900 leading-tight`}
          >
            Why Choose Us Seoul City Tour
          </h2>
        </div>

        {/* 2x2 그리드 레이아웃 */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-gray-200">
          {features.map((item, idx) => {
            const borderClass = `
              ${idx % 2 === 0 ? "md:border-r" : ""} 
              border-b border-gray-200
            `;

            return (
              <div
                key={idx}
                className={`flex items-start p-8 md:p-12 ${borderClass}`}
              >
                {/* ✅ 아이콘 이미지 영역 (66px) */}
                <div className="flex-shrink-0 mr-8">
                  <div className="relative w-[66px] h-[66px]">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      width={66}
                      height={66}
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* 텍스트 영역 */}
                <div>
                  {/* ✅ 원본 크기(text-xl) 유지 + 폰트만 적용 */}
                  <h3
                    className={`${hangameFont.className} text-xl font-bold text-gray-900 mb-3`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
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
