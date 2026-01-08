// src/components/TourCard.tsx
import Link from "next/link";
import Image from "next/image";
import { type PackageTour } from "@/app/package/packageData";

interface TourCardProps {
  tour: PackageTour;
  priority?: boolean;
}

export default function TourCard({ tour, priority = false }: TourCardProps) {
  return (
    <article className="group">
      <Link href={`/package/${tour.slug}`} className="block">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-[380px] flex flex-col">
          {/* 이미지 섹션 */}
          <div className="relative h-[140px] overflow-hidden">
            <Image
              src={tour.image}
              alt={`${tour.title} - Korea tour package`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority={priority}
            />
            {tour.discount && (
              <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-md">
                {tour.discount}% OFF
              </div>
            )}
          </div>

          {/* 텍스트 컨텐츠 */}
          <div className="p-4 flex flex-col flex-1">
            {/* 위치 */}
            <div className="text-xs text-gray-500 mb-2">{tour.location}</div>

            {/* 제목 */}
            <h2 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 leading-snug">
              {tour.title}
            </h2>

            {/* 설명 */}
            <p className="text-xs text-gray-600 mb-3 line-clamp-2">
              {tour.description}
            </p>

            {/* 평점 및 리뷰 */}
            <div className="flex items-center gap-1 mb-3">
              <span className="text-yellow-500 text-sm" aria-hidden="true">
                ★
              </span>
              <span className="text-sm font-bold text-gray-900">
                {tour.rating}
              </span>
              <span className="text-xs text-gray-500">
                ({tour.reviews}) • {tour.bookings}
              </span>
            </div>

            {/* 가격 (하단 고정) */}
            <div className="mt-auto">
              {tour.discount ? (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-gray-400 line-through">
                      $ {tour.originalPrice}
                    </span>
                    <span className="text-xs font-semibold text-red-600">
                      {tour.discount}% OFF
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-bold text-red-600">
                      $ {tour.price}
                    </span>
                    <span className="text-sm text-gray-600">From</span>
                  </div>
                </>
              ) : (
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-bold text-gray-900">
                    $ {tour.price}
                  </span>
                  <span className="text-sm text-gray-600">From</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
