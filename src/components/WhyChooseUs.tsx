import React from "react";
import { Award, ShieldCheck, Headset, Globe } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Award,
      title: "Licensed & Experienced Guides",
      desc: "All tours are led by certified Korean tour guides with proven field experience.",
    },
    {
      icon: ShieldCheck,
      title: "Safety-First Operations",
      desc: "Accident-free tour history with clean, regularly maintained tourist buses.",
    },
    {
      icon: Headset,
      title: "Clear, Fast, and Transparent Communication",
      desc: "Quick and clear responses with transparent support before, during, and after each tour.",
    },
    {
      icon: Globe,
      title: "Trusted by Global Partners",
      desc: "Long-term partnerships with international travel agencies and clients worldwide.",
    },
  ];

  const iconStyle = "text-yellow-600 w-10 h-10 stroke-[1.5px]";

  return (
    <section className="w-full py-16 lg:py-24 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        {/* ⭐ 섹션 제목: 24px (text-2xl) */}
        <div className="mb-12 text-left">
          <h2 className="text-2xl font-bold text-gray-900 leading-tight">
            Why Choose Us Seoul City Tour
          </h2>
        </div>

        {/* 2x2 그리드 레이아웃 */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-gray-200">
          {features.map((item, idx) => {
            const Icon = item.icon;
            const borderClass = `
              ${idx % 2 === 0 ? "md:border-r" : ""} 
              border-b border-gray-200
            `;

            return (
              <div
                key={idx}
                className={`flex items-start p-8 md:p-12 ${borderClass}`}
              >
                <div className="flex-shrink-0 mr-6">
                  <Icon className={iconStyle} />
                </div>
                <div>
                  {/* ⭐ 카드 제목: 20px (text-xl) */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  {/* ⭐ 카드 설명: 14px (text-sm) */}
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
