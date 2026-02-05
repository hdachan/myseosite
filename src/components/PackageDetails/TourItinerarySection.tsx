"use client";

import React from "react";
import Image from "next/image";
import {
  MapPin,
  Bus,
  Utensils,
  Hotel,
  Footprints,
  ShoppingBag,
  Clock,
} from "lucide-react";
import { hangameFont } from "@/lib/fonts";

interface ItineraryItem {
  time?: string;
  title: string;
  description?: string;
  iconType?: string;
  image?: string;
}

interface Props {
  itinerary: ItineraryItem[];
}

export default function TourItinerarySection({ itinerary }: Props) {
  if (!itinerary || itinerary.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case "transport":
        return <Bus className="w-5 h-5 text-white" />;
      case "food":
        return <Utensils className="w-5 h-5 text-white" />;
      case "hotel":
        return <Hotel className="w-5 h-5 text-white" />;
      case "walking":
        return <Footprints className="w-5 h-5 text-white" />;
      case "shopping":
        return <ShoppingBag className="w-5 h-5 text-white" />;
      default:
        return <MapPin className="w-5 h-5 text-white" />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "transport":
        return "bg-blue-500";
      case "food":
        return "bg-orange-500";
      case "hotel":
        return "bg-indigo-500";
      case "shopping":
        return "bg-pink-500";
      default:
        return "bg-[#4A7C7E]";
    }
  };

  return (
    <section className="mt-12 pt-10 border-t border-gray-100">
      <h2
        className={`${hangameFont.className} text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2`}
      >
        <Clock className="w-6 h-6 text-[#ad3928]" />
        Tour Schedule
      </h2>

      <div className="relative border-l-2 border-gray-200 ml-4 md:ml-6 space-y-10 pb-4">
        {itinerary.map((item, index) => (
          // 🚀 [최적화 1] key 값을 유니크하게 설정 (렌더링 성능 향상)
          <div
            key={`${item.title}-${index}`}
            className="relative pl-8 md:pl-10"
          >
            {/* 타임라인 아이콘 */}
            <div
              className={`absolute -left-[11px] top-0 w-6 h-6 rounded-full border-2 border-white shadow-sm flex items-center justify-center ${getIconColor(item.iconType || "location")}`}
            >
              <div className="scale-75">
                {getIcon(item.iconType || "location")}
              </div>
            </div>

            {/* 시간 및 내용 */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {/* 시간 */}
              <div className="flex-shrink-0 w-20 pt-0.5">
                {item.time && (
                  <span className="font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded text-sm">
                    {item.time}
                  </span>
                )}
              </div>

              {/* 상세 내용 */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 whitespace-pre-line">
                    {item.description}
                  </p>
                )}

                {/* 이미지 (있으면 표시) */}
                {item.image && (
                  <div className="relative w-full h-48 sm:h-64 rounded-lg overflow-hidden shadow-sm mt-3">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      // 🚀 [최적화 2] 이미지 사이즈 최적화 (모바일 데이터 절약 + 속도 향상)
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
