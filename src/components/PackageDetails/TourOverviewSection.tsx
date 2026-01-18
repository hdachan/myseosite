import React from "react";
/* ✅ 폰트 가져오기 */
import { hangameFont } from "@/lib/fonts";

interface TourOverviewSectionProps {
  title?: string;
  description: string;
}

export default function TourOverviewSection({
  title = "Tour Overview",
  description,
}: TourOverviewSectionProps) {
  return (
    // ✅ [레이아웃] rounded-[6px] 적용, 패딩 및 그림자 조정
    <section className="bg-white p-6 md:p-8 rounded-[6px] border border-gray-200 shadow-sm">
      <div className="mb-4">
        {/* ✅ [소제목/라벨] 스타일 적용 */}
        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#4A7C7E] font-bold mb-2">
          TOUR DESCRIPTION
        </p>

        {/* ✅ [제목 H2] 한게임 폰트 + 크기 규칙 적용 */}
        <h2
          className={`${hangameFont.className} text-xl md:text-2xl font-bold text-gray-900 leading-tight`}
        >
          {title}
        </h2>
      </div>

      {/* ✅ [본문] text-sm 적용 + 줄간격 조정 */}
      <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
        {description}
      </div>
    </section>
  );
}
