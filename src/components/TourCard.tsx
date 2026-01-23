import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { hangameFont } from "@/lib/fonts";

// Sanity 데이터 인터페이스
interface TourData {
  id: string | number;
  slug: string;
  image: string;
  title: string;
  location?: string;
  description?: string;
  tags?: string[];
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  discount?: number;
}

interface TourCardProps {
  tour: TourData;
  priority?: boolean;
}

export default function TourCard({ tour, priority = false }: TourCardProps) {
  const displayTags =
    tour.tags && tour.tags.length > 0
      ? tour.tags
      : tour.description
        ? tour.description.split(",").map((tag) => tag.trim())
        : [];

  return (
    <div className="group cursor-pointer flex flex-col h-full">
      <Link
        href={`/package/${tour.slug}`}
        className="block h-full"
        target="_blank" // 새 탭 열기 (선택사항)
        rel="noopener noreferrer"
      >
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
            {/* Location */}
            <div className="text-[10px] md:text-[11px] text-gray-400 mb-1 truncate font-medium uppercase tracking-wide">
              {tour.location || "Korea"}
            </div>

            {/* Title */}
            <h3
              className={`${hangameFont.className} h-[40px] md:h-[44px] text-[14px] md:text-[15px] font-bold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-[#ad3928] transition-colors tracking-tight`}
            >
              {tour.title}
            </h3>

            {/* Tags */}
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
                <span className="text-[#37848c] text-[11px] md:text-xs font-bold">
                  {tour.rating}
                </span>
                <span className="text-gray-400 text-[10px] md:text-[11px]">
                  ({tour.reviews})
                </span>
              </div>

              {/* 가격 줄 */}
              <div className="flex items-end gap-1.5">
                {tour.discount ? (
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className={`${hangameFont.className} text-[15px] md:text-[17px] font-bold text-[#ad3928]`}
                    >
                      ₩{tour.price?.toLocaleString()}
                    </span>
                    <span className="text-[10px] md:text-[11px] text-gray-300 line-through decoration-gray-300">
                      ₩{tour.originalPrice?.toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <span
                    className={`${hangameFont.className} text-[15px] md:text-[17px] font-bold text-gray-900`}
                  >
                    ₩{tour.price?.toLocaleString()}
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
