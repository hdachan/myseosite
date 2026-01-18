import React from "react";
import { CheckCircle2, X, MapPin } from "lucide-react";
import { PackageOption } from "@/app/package/packageData";
/* ✅ 폰트 가져오기 */
import { hangameFont } from "@/lib/fonts";

interface PackageDetailSidebarProps {
  selectedPackage: PackageOption;
  commonIncludes?: string[];
  meetingPoint?: string;
}

export default function PackageDetailSidebar({
  selectedPackage,
  commonIncludes,
  meetingPoint,
}: PackageDetailSidebarProps) {
  return (
    <aside className="lg:col-span-1">
      <div className="space-y-6 sticky top-24">
        {/* Included Items */}
        {/* ✅ [레이아웃] rounded-[6px] 적용, 그림자 및 보더 조정 */}
        <section className="bg-white rounded-[6px] border border-gray-200 overflow-hidden shadow-sm">
          {/* Header */}
          <div className="p-5 border-b border-gray-100">
            {/* ✅ [소제목/라벨] 스타일 적용 */}
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#4A7C7E] font-bold mb-2">
              SELECTED PACKAGE
            </p>
            {/* ✅ [제목 H2] 한게임 폰트 적용 */}
            <h3
              className={`${hangameFont.className} text-lg font-bold text-gray-900 leading-tight mb-1`}
            >
              Package Details
            </h3>
            <p className="text-sm text-gray-500 font-medium">
              {selectedPackage.name}
            </p>
          </div>

          {/* Content */}
          <div className="p-5 space-y-6">
            {/* Included */}
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm text-gray-900 mb-2">Included</p>
                <ul className="space-y-1.5">
                  {/* ✅ 선택한 옵션의 details */}
                  {selectedPackage.details.map((detail, i) => (
                    <li key={i} className="text-sm text-gray-700 leading-snug">
                      • {detail}
                    </li>
                  ))}
                  {/* ✅ 공통 포함 사항 */}
                  {commonIncludes?.map((inc, i) => (
                    <li
                      key={`inc-${i}`}
                      className="text-sm text-gray-500 leading-snug"
                    >
                      • {inc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Excluded */}
            {selectedPackage.excluded && (
              <div className="flex items-start gap-3 pt-4 border-t border-gray-100">
                <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm text-gray-900 mb-2">
                    Excluded
                  </p>
                  <ul className="space-y-1.5">
                    {selectedPackage.excluded.map((ex, i) => (
                      <li
                        key={i}
                        className="text-sm text-gray-700 leading-snug"
                      >
                        • {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 미팅 포인트 */}
        {meetingPoint && (
          // ✅ [레이아웃] rounded-[6px] 적용
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
