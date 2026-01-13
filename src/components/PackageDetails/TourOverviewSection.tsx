// 투어 아래 쪽 설명
import React from "react";

interface TourOverviewSectionProps {
  title?: string;
  description: string;
}

export default function TourOverviewSection({
  title = "Tour Overview",
  description,
}: TourOverviewSectionProps) {
  return (
    <section className="bg-white p-6 rounded-xl border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>
      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
        {description}
      </p>
    </section>
  );
}
