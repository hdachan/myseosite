import Link from "next/link";
import PageHero from "./PageHero";
import TourCard from "./TourCard";
import { hangameFont } from "@/lib/fonts";

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
  tours: any[]; // ✅ 타입을 유연하게 변경 (Sanity 데이터 수용)
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

      <div className="max-w-6xl mx-auto px-8 lg:px-12 mt-12 pb-20">
        {/* Breadcrumb */}
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

        {/* 카테고리 필터 */}
        <nav
          aria-label="Tour categories"
          className="flex gap-2 mb-10 overflow-x-auto snap-x scrollbar-hide pb-2 md:flex-wrap md:overflow-visible md:pb-0"
        >
          {categories.map(({ key, label, path }) => (
            <Link
              key={key}
              href={path}
              className={`
                flex-shrink-0 snap-center 
                px-4 py-2 rounded-[6px] 
                text-sm font-medium 
                transition shadow-sm border whitespace-nowrap
                ${hangameFont.className}
                ${
                  currentCategory === key
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                }
              `}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* 투어 카드 그리드 */}
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
