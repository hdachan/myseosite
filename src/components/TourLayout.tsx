// src/components/TourLayout.tsx

import Link from "next/link";
import PageHero from "./PageHero";
import { type PackageTour } from "@/app/package/packageData"; // 경로 확인 필요 (파일을 옮겼으므로)
import TourCard from "./TourCard";

const categories = [
  // ✅ 수정: 모든 경로에서 /en 제거
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
  // ✅ 안전장치: tours가 undefined일 경우 빈 배열로 처리
  const safeTours = tours || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title={heroTitle}
        description={heroSubtitle}
        imageSrc="/images/background_korea_pt2.jpg"
      />

      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-10 pb-16">
        <article className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-t-2 border-red-800">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-gray-600">
              <li>
                {/* ✅ 수정: Home 링크 /en -> / */}
                <Link href="/" className="hover:text-red-600">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-red-600 font-semibold">Package Tours</li>
            </ol>
          </nav>

          <nav
            aria-label="Tour categories"
            className="flex flex-wrap gap-2 mb-8"
          >
            {categories.map(({ key, label, path }) => (
              <Link
                key={key}
                href={path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  currentCategory === key
                    ? "bg-red-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {safeTours.length > 0 ? (
              safeTours.map((tour, index) => (
                <TourCard key={tour.id} tour={tour} priority={index < 4} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-gray-500">
                <p>No tours found in this category yet.</p>
              </div>
            )}
          </section>
        </article>
      </div>
    </div>
  );
}
