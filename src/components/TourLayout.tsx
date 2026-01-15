// src/components/TourLayout.tsx

import Link from "next/link";
import PageHero from "./PageHero";
import { type PackageTour } from "@/app/package/packageData";
import TourCard from "./TourCard";

const categories = [
  { key: "ALL", label: "All Tours", path: "/package" },
  { key: "DMZ", label: "DMZ Tour", path: "/package/dmz" },
  { key: "DAILY", label: "Daily Tour", path: "/package/daily" },
  { key: "LOCAL", label: "Local Tour", path: "/package/local" },
  { key: "DRAMA", label: "Drama Tour", path: "/package/drama" },
  { key: "SKI", label: "Ski Tour", path: "/package/ski" },
  { key: "RELIGIOUS", label: "Religious Tour", path: "/package/religious" },
];

interface TourLayoutProps {
  tours: PackageTour[];
  currentCategory: string;
  heroTitle: string;
  heroSubtitle: string;
}

export default function TourLayout({
  tours,
  currentCategory,
  heroTitle,
  heroSubtitle,
}: TourLayoutProps) {
  const safeTours = tours || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title={heroTitle}
        description={heroSubtitle}
        imageSrc="/images/background_korea_pt2.png"
      />

      {/* ⭐ [핵심 수정] 레이아웃 정렬 통일 
         1. max-w-6xl mx-auto: 전체 너비 제한
         2. px-8 lg:px-12: 헤더/Hero와 동일한 좌우 여백 적용
         3. mt-12: Hero 섹션과 적당한 간격 띄우기
      */}
      <div className="max-w-6xl mx-auto px-8 lg:px-12 mt-12 pb-20">
        {/* Breadcrumb (박스 없이 깔끔하게 배치) */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-red-700 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-semibold">Package Tours</li>
          </ol>
        </nav>

        {/* 카테고리 필터 
           - 배경이 회색이므로 버튼을 흰색(bg-white)으로 만들어 가독성 확보
        */}
        <nav
          aria-label="Tour categories"
          className="flex flex-wrap gap-3 mb-10"
        >
          {categories.map(({ key, label, path }) => (
            <Link
              key={key}
              href={path}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition shadow-sm border ${
                currentCategory === key
                  ? "bg-gray-900 text-white border-gray-900" // 활성: 진한 회색/검정 계열로 모던하게 (원하면 red-700으로 복구 가능)
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300" // 비활성: 흰색 배경
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* 투어 카드 그리드 (카드 자체에 그림자가 있으므로 컨테이너는 심플하게) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {safeTours.length > 0 ? (
            safeTours.map((tour, index) => (
              <TourCard key={tour.id} tour={tour} priority={index < 4} />
            ))
          ) : (
            <div className="col-span-full text-center py-24">
              <p className="text-gray-500 text-lg">
                No tours found in this category yet.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
