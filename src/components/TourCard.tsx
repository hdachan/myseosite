// src/components/TourCard.tsx

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { type PackageTour } from "@/app/package/packageData";

/* ✅ 폰트 가져오기 */
import { hangameFont } from "@/lib/fonts";

interface TourCardProps {
  tour: PackageTour;
  priority?: boolean;
}

export default function TourCard({ tour, priority = false }: TourCardProps) {
  const tags = tour.description
    ? tour.description.split(",").map((tag) => tag.trim())
    : [];

  return (
    <div className="group cursor-pointer flex flex-col h-full">
      <Link
        href={`/package/${tour.slug}`}
        className="block h-full"
        /* ✅ 새 창에서 열기 설정 추가 */
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* ⭐ 카드 컨테이너 */}
        <div className="h-full flex flex-col bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm shadow-[inset_0_0_14px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-300">
          {/* 1. 이미지 영역 (높이 유지) */}
          <div className="relative h-[150px] md:h-[200px] w-full overflow-hidden bg-gray-50 border-b border-gray-100">
            <Image
              src={tour.image}
              alt={tour.title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              priority={priority}
            />
          </div>

          {/* 2. 텍스트 내용 영역 */}
          <div className="p-3 md:p-4 flex flex-col flex-1">
            {/* 카테고리 (글씨 조금 더 작게: 10px 유지하되 PC에서 11px) */}
            <div className="text-[10px] md:text-[11px] text-gray-400 mb-1 truncate font-medium uppercase tracking-wide">
              {tour.location}
            </div>

            {/* ✅ 제목: 사이즈 축소 (14px/15px) + 줄간격 좁힘 */}
            <h3
              className={`${hangameFont.className} h-[40px] md:h-[44px] text-[14px] md:text-[15px] font-bold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-[#ad3928] transition-colors tracking-tight`}
            >
              {tour.title}
            </h3>

            {/* 태그 영역 */}
            <div className="h-[24px] md:h-[26px] mb-3 overflow-hidden flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-1.5 py-0.5 bg-gray-50 text-gray-500 text-[10px] md:text-[11px] rounded-md font-medium border border-gray-100 whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 하단 정보 (평점 & 가격) */}
            <div className="mt-auto pt-3 border-t border-dashed border-gray-100">
              {/* 평점 줄 */}
              <div className="flex items-center gap-1 mb-1.5">
                <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-[#37848c] text-[#37848c]" />
                <span className="text-[#37848c] text-[11px] md:text-xs font-bold">
                  {tour.rating}
                </span>
                <span className="text-gray-400 text-[10px] md:text-[11px]">
                  ({tour.reviews})
                </span>
                <span className="text-gray-300 text-[10px] mx-1">•</span>
                <span className="text-gray-500 text-[10px] md:text-[11px] truncate max-w-[80px]">
                  {tour.bookings}
                </span>
              </div>

              {/* 가격 줄 */}
              <div className="flex items-end gap-1.5">
                <span className="text-[10px] md:text-[11px] text-gray-400 font-medium mb-1">
                  From
                </span>

                {/* ✅ 가격: 사이즈 축소 (15px/17px) */}
                {tour.discount ? (
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className={`${hangameFont.className} text-[15px] md:text-[17px] font-bold text-[#ad3928]`}
                    >
                      ₩{tour.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] md:text-[11px] text-gray-300 line-through decoration-gray-300">
                      ₩{tour.originalPrice?.toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <span
                    className={`${hangameFont.className} text-[15px] md:text-[17px] font-bold text-gray-900`}
                  >
                    ₩{tour.price.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
