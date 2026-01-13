//PackageDetailSidebar.tsx
import React from "react";
import { CheckCircle2, X, MapPin } from "lucide-react";
import { PackageOption } from "@/app/package/packageData";

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
      <div className="space-y-4 sticky top-24">
        {/* Included Items */}
        <section className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h3 className="font-bold text-gray-900">Package Details</h3>
            <p className="text-xs text-gray-500">{selectedPackage.name}</p>
          </div>

          <div className="p-4">
            <div className="flex items-start gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-gray-900 mb-1">
                  Included in this option
                </p>
                <ul className="space-y-1">
                  {/* ✅ 선택한 옵션의 details(상세 코스)를 리스트로 보여줌 */}
                  {selectedPackage.details.map((detail, i) => (
                    <li key={i} className="text-sm text-gray-700">
                      • {detail}
                    </li>
                  ))}
                  {/* ✅ 공통 포함 사항도 함께 표시 */}
                  {commonIncludes?.map((inc, i) => (
                    <li key={`inc-${i}`} className="text-sm text-gray-500">
                      • {inc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {selectedPackage.excluded && (
              <div className="flex items-start gap-2 mt-4 pt-4 border-t border-gray-100">
                <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-gray-900 mb-1">
                    Excluded
                  </p>
                  <ul className="space-y-1">
                    {selectedPackage.excluded.map((ex, i) => (
                      <li key={i} className="text-sm text-gray-700">
                        • {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 미팅 포인트 등 추가 정보 */}
        {meetingPoint && (
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800">
            <p className="font-bold flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Meeting Point
            </p>
            <p className="mt-1">{meetingPoint}</p>
          </div>
        )}
      </div>
    </aside>
  );
}
