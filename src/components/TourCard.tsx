import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { type PackageTour } from "@/app/package/packageData";

interface TourCardProps {
  tour: PackageTour;
  priority?: boolean;
}

export default function TourCard({ tour, priority = false }: TourCardProps) {
  // 쉼표(,)로 설명글 잘라서 태그 배열 만들기
  const tags = tour.description
    ? tour.description.split(",").map((tag) => tag.trim())
    : [];

  return (
    <div className="group cursor-pointer flex flex-col h-full">
      <Link href={`/package/${tour.slug}`} className="block h-full">
        {/* ⭐ 카드 컨테이너 */}
        {/* 1. border border-gray-200: 기존 테두리 유지
           2. shadow-sm: 바깥쪽 살짝 그림자
           3. shadow-[inset_0_0_14px_rgba(0,0,0,0.04)]: ✅ 이너 쉐도우 (안쪽으로 은은한 그림자) 
        */}
        <div className="h-full flex flex-col bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm shadow-[inset_0_0_14px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-300">
          {/* 1. 이미지 영역 (높이 200px 고정) */}
          <div className="relative h-[200px] w-full overflow-hidden bg-gray-50 border-b border-gray-100">
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
          <div className="p-3 flex flex-col flex-1">
            {/* 카테고리 */}
            <div className="text-[10px] sm:text-xs text-gray-400 mb-1 truncate">
              {tour.location}
            </div>

            {/* 제목 (16px 고정) */}
            <h3 className="h-[48px] text-[16px] font-bold text-gray-900 leading-snug mb-1 line-clamp-2 group-hover:text-[#ad3928] transition-colors">
              {tour.title}
            </h3>

            {/* 태그 영역 (회색 박스) */}
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

              {/* 가격 줄 */}
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs text-gray-500 font-medium">From</span>

                {/* 할인이 있을 때 */}
                {tour.discount ? (
                  <>
                    <span className="text-lg font-bold text-[#ad3928]">
                      ₩ {tour.price.toLocaleString()}
                    </span>
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
        </div>
      </Link>
    </div>
  );
}
