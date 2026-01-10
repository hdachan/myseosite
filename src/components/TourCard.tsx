import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { type PackageTour } from "@/app/package/packageData";

interface TourCardProps {
  tour: PackageTour;
  priority?: boolean;
}

export default function TourCard({ tour, priority = false }: TourCardProps) {
  // ⭐ 핵심 로직 유지: 쉼표(,)로 문자열을 잘라서 배열로 만듦
  const tags = tour.description
    ? tour.description.split(",").map((tag) => tag.trim())
    : [];

  return (
    <div className="group cursor-pointer flex flex-col h-full">
      <Link href={`/package/${tour.slug}`} className="block h-full">
        {/* 1. 이미지 영역 (높이 200px 고정 - 유지) */}
        <div className="relative h-[200px] w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            priority={priority}
          />
        </div>

        {/* 2. 텍스트 내용 영역 */}
        <div className="pt-3 flex flex-col flex-1">
          {/* 카테고리 */}
          <div className="text-[10px] sm:text-xs text-gray-400 mb-1 truncate">
            {tour.location}
          </div>

          {/* 제목 (16px 고정) */}
          {/* ⚡ 간격 수정: mb-2 -> mb-1 (제목과 태그 사이 좁힘) */}
          <h3 className="h-[48px] text-[16px] font-bold text-gray-900 leading-snug mb-1 line-clamp-2 group-hover:text-[#ad3928] transition-colors">
            {tour.title}
          </h3>

          {/* 태그 영역 (회색 박스) */}
          {/* ⚡ 간격 수정: mb-3 -> mb-2 (태그와 하단 정보 사이 좁힘) */}
          <div className="h-[26px] mb-2 overflow-hidden flex flex-wrap gap-1.5">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block px-1.5 py-0.5 bg-gray-50 text-gray-500 text-[10px] sm:text-xs rounded-md font-medium border border-gray-100 whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 하단 정보 (평점 & 가격) */}
          <div className="mt-auto">
            {/* 평점 줄 */}
            {/* ⚡ 간격 수정: mb-2 -> mb-1 (평점과 가격 사이 좁힘) */}
            <div className="flex items-center gap-1 mb-1">
              <Star className="w-3.5 h-3.5 fill-[#37848c] text-[#37848c]" />
              <span className="text-[#37848c] text-sm font-bold">
                {tour.rating}
              </span>
              <span className="text-gray-400 text-xs">({tour.reviews})</span>
              <span className="text-gray-300 text-[10px] mx-1">•</span>
              <span className="text-gray-500 text-xs truncate max-w-[80px]">
                {tour.bookings}
              </span>
            </div>

            {/* ⭐ 가격 줄 (요청하신 디자인 100% 유지) */}
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-xs text-gray-500 font-medium">From</span>

              {/* 할인이 있을 때 */}
              {tour.discount ? (
                <>
                  {/* 할인가 (빨간색, 굵게) */}
                  <span className="text-lg font-bold text-[#ad3928]">
                    ₩ {tour.price.toLocaleString()}
                  </span>
                  {/* 원가 (회색, 취소선) - 바로 옆에 배치 */}
                  <span className="text-xs text-gray-400 line-through decoration-gray-400">
                    ₩ {tour.originalPrice?.toLocaleString()}
                  </span>
                </>
              ) : (
                /* 할인 없을 때 */
                <span className="text-lg font-bold text-gray-900">
                  ₩ {tour.price.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
