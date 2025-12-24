// src/components/TourLayout.tsx (PageHero 적용 버전)

import Link from "next/link";
import PageHero from "./PageHero";
import { type PackageTour } from "@/app/en/package/packageData";
import TourCard from "./TourCard";

const categories = [
  { key: "ALL", label: "All Tours", path: "/en/package" },
  { key: "DMZ", label: "DMZ Tour", path: "/en/package/dmz" },
  { key: "DAILY", label: "Daily Tour", path: "/en/package/daily" },
  { key: "LOCAL", label: "Local Tour", path: "/en/package/local" },
  { key: "DRAMA", label: "Drama Tour", path: "/en/package/drama" },
  { key: "SKI", label: "Ski Tour", path: "/en/package/ski" },
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
                <Link href="/en" className="hover:text-red-600">
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
            {tours.map((tour, index) => (
              <TourCard key={tour.id} tour={tour} priority={index < 4} />
            ))}
          </section>
        </article>
      </div>
    </div>
  );
}
