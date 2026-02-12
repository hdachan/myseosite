"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { hangameFont } from "@/lib/fonts";
import { useCurrency } from "@/app/context/CurrencyContext";

// Sanity + Supabase 데이터 통합 인터페이스
interface TourData {
  id: string | number;
  slug: string;
  image: string;
  title: string;
  location?: string;
  description?: string;
  tags?: string[];
  averageRating?: number;
  totalReviews?: number;
  price: number;
  originalPrice?: number; // Sanity에서 입력한 정가
  discount?: number; // (사용 안함 - 호환성을 위해 유지)
}

interface TourCardProps {
  tour: TourData;
  priority?: boolean;
}

export default function TourCard({ tour, priority = false }: TourCardProps) {
  const { formatPrice } = useCurrency();

  // 태그 처리 로직
  const displayTags =
    tour.tags && tour.tags.length > 0
      ? tour.tags
      : tour.description
        ? tour.description.split(",").map((tag) => tag.trim())
        : [];

  const ratingValue = tour.averageRating || 0;
  const reviewCount = tour.totalReviews || 0;

  // ✅ 할인 중인지 판단하는 로직 (정가가 판매가보다 높을 때)
  const isDiscounted = tour.originalPrice && tour.originalPrice > tour.price;

  return (
    <div className="group cursor-pointer flex flex-col h-full">
      <Link href={`/package/${tour.slug}`} className="block h-full">
        <div className="h-full flex flex-col bg-white rounded-[6px] overflow-hidden border border-gray-200 shadow-sm shadow-[inset_0_0_14px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-300">
          {/* 1. 이미지 영역 */}
          <div className="relative h-[150px] md:h-[200px] w-full overflow-hidden bg-gray-50 border-b border-gray-100">
            {tour.image ? (
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                priority={priority}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-xs">
                No Image
              </div>
            )}
          </div>

          {/* 2. 텍스트 내용 영역 */}
          <div className="p-3 md:p-4 flex flex-col flex-1">
            <div className="text-[10px] md:text-[11px] text-gray-400 mb-1 truncate font-medium uppercase tracking-wide">
              {tour.location || "Korea"}
            </div>

            <h3
              className={`${hangameFont.className} h-[40px] md:h-[44px] text-[14px] md:text-[15px] font-bold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-[#ad3928] transition-colors tracking-tight`}
            >
              {tour.title}
            </h3>

            <div className="h-[24px] md:h-[26px] mb-3 overflow-hidden flex flex-wrap gap-1">
              {displayTags.slice(0, 3).map((tag, index) => (
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
              <div className="flex items-center gap-1 mb-1.5">
                <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-[#37848c] text-[#37848c]" />
                {reviewCount > 0 ? (
                  <>
                    <span className="text-[#37848c] text-[11px] md:text-xs font-bold">
                      {ratingValue.toFixed(1)}
                    </span>
                    <span className="text-gray-400 text-[10px] md:text-[11px]">
                      ({reviewCount.toLocaleString()})
                    </span>
                  </>
                ) : (
                  <span className="text-gray-400 text-[10px] md:text-[11px] font-medium">
                    New Activity
                  </span>
                )}
              </div>

              {/* ✅ 3. 가격 표시 영역: originalPrice 존재 여부에 따라 분기 */}
              <div className="flex items-end gap-1.5">
                {isDiscounted ? (
                  <div className="flex items-baseline gap-1.5">
                    {/* 최종 판매가 (빨간색) */}
                    <span
                      className={`${hangameFont.className} text-[15px] md:text-[17px] font-bold text-[#ad3928]`}
                    >
                      {formatPrice(tour.price)}
                    </span>
                    {/* 할인 전 정가 (회색 취소선) */}
                    <span className="text-[10px] md:text-[11px] text-gray-300 line-through decoration-gray-300">
                      {formatPrice(tour.originalPrice || 0)}
                    </span>
                  </div>
                ) : (
                  /* 할인 정보가 없을 때 (일반 판매가만 표시) */
                  <span
                    className={`${hangameFont.className} text-[15px] md:text-[17px] font-bold text-gray-900`}
                  >
                    {formatPrice(tour.price || 0)}
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
