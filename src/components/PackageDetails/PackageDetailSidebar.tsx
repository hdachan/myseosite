import React from "react";
import {
  MapPin,
  Bus,
  Utensils,
  Hotel,
  Footprints,
  ShoppingBag,
  Map,
} from "lucide-react";
import Image from "next/image";
/* ✅ 폰트 가져오기 */
import { hangameFont } from "@/lib/fonts";

interface PackageDetailSidebarProps {
  selectedPackage: any; // Sanity 데이터 (itinerary 포함)
  commonIncludes?: string[]; // (사용 안 함)
  meetingPoint?: string;
}

export default function PackageDetailSidebar({
  selectedPackage,
  meetingPoint,
}: PackageDetailSidebarProps) {
  // 1. 아이콘 선택 헬퍼 함수 (Sanity iconType과 매칭)
  const getIcon = (type: string) => {
    switch (type) {
      case "transport":
        return <Bus className="w-3.5 h-3.5 text-white" />;
      case "food":
        return <Utensils className="w-3.5 h-3.5 text-white" />;
      case "hotel":
        return <Hotel className="w-3.5 h-3.5 text-white" />;
      case "walking":
        return <Footprints className="w-3.5 h-3.5 text-white" />;
      case "shopping":
        return <ShoppingBag className="w-3.5 h-3.5 text-white" />;
      default:
        return <MapPin className="w-3.5 h-3.5 text-white" />;
    }
  };

  // 2. 아이콘 배경색 헬퍼 함수
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
    <aside className="lg:col-span-1">
      <div className="space-y-4 sticky top-24">
        {/* ✅ [메인 박스] Included/Excluded 삭제됨 -> 일정표(Schedule)로 대체 */}
        <section className="bg-white rounded-[6px] border border-gray-200 overflow-hidden shadow-sm">
          {/* Header */}
          <div className="p-5 border-b border-gray-100 bg-gray-50/50">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#4A7C7E] font-bold mb-2">
              SELECTED OPTION
            </p>
            {/* 제목을 'Package Details'에서 'Tour Schedule'로 변경 (내용에 맞게) */}
            <h3
              className={`${hangameFont.className} text-lg font-bold text-gray-900 leading-tight mb-1`}
            >
              Tour Schedule
            </h3>
            <p className="text-sm text-gray-500 font-medium line-clamp-2">
              {selectedPackage.name}
            </p>
          </div>

          {/* Content (타임라인 일정표) */}
          <div className="p-5">
            {selectedPackage.itinerary &&
            selectedPackage.itinerary.length > 0 ? (
              <div className="relative border-l-2 border-gray-100 ml-3 space-y-8 pb-2">
                {/* Sanity에서 가져온 itinerary 배열을 돕니다 */}
                {selectedPackage.itinerary.map((item: any, index: number) => (
                  <div key={index} className="relative pl-6">
                    {/* 1. 타임라인 아이콘 (동그라미) */}
                    <div
                      className={`absolute -left-[9px] top-1 w-5 h-5 rounded-full border border-white shadow-sm flex items-center justify-center ${getIconColor(item.iconType || "location")}`}
                    >
                      {getIcon(item.iconType || "location")}
                    </div>

                    {/* 2. 내용 */}
                    <div className="flex flex-col gap-1">
                      {/* 시간 (있으면 표시) */}
                      {item.time && (
                        <span className="text-xs font-bold text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded w-fit mb-0.5">
                          {item.time}
                        </span>
                      )}

                      {/* 활동 제목 */}
                      <h4 className="text-sm font-bold text-gray-800 leading-tight">
                        {item.title}
                      </h4>

                      {/* 설명 (짧게) */}
                      {item.description && (
                        <p className="text-xs text-gray-500 leading-snug mt-1 whitespace-pre-line">
                          {item.description}
                        </p>
                      )}

                      {/* 이미지 (작게) - 있으면 표시 */}
                      {item.image && (
                        <div className="relative w-full h-24 mt-2 rounded-md overflow-hidden border border-gray-100 shadow-sm">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // 일정 데이터가 없을 경우
              <div className="text-center py-6 text-gray-400 text-sm flex flex-col items-center">
                <Map className="w-8 h-8 mb-2 opacity-30" />
                <p>No schedule details available.</p>
              </div>
            )}
          </div>
        </section>

        {/* ✅ 미팅 포인트 (이건 유지) */}
        {meetingPoint && (
          <div className="bg-blue-50 p-5 rounded-[6px] border border-blue-100 text-sm text-blue-900">
            <p className="font-bold flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              Meeting Point
            </p>
            <p className="leading-relaxed text-blue-800">{meetingPoint}</p>
          </div>
        )}
      </div>
    </aside>
  );
}
