"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Star,
  CheckCircle2,
  Shield,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import PackageOptionsSection from "@/components/PackageDetails/PackageOptionsSection";
import PackageDetailSidebar from "@/components/PackageDetails/PackageDetailSidebar";
import TourOverviewSection from "@/components/PackageDetails/TourOverviewSection";
import TourReviewsSection from "@/components/PackageDetails/TourReviewsSection";
import TourImageGallery from "@/components/PackageDetails/TourImageGallery";
import TourHighlights from "@/components/PackageDetails/TourHighlights"; // ✅ 하이라이트 컴포넌트
import { hangameFont } from "@/lib/fonts";

interface Props {
  tour: any;
}

export default function PackageDetailClient({ tour }: Props) {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedPackage, setSelectedPackage] = useState<any | null>(null);

  // 이미지 데이터 정리 (Main + Gallery)
  const allImages = Array.from(
    new Set([tour.image, ...(tour.images || [])]),
  ).filter(Boolean);

  const isSuspended =
    tour.bookings === "Suspended" || tour.tags?.includes("Suspended");

  // 평점 클릭 시 리뷰 섹션으로 이동
  const scrollToReviews = () => {
    const reviewSection = document.getElementById("reviews");
    if (reviewSection) {
      reviewSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 pt-20 md:pt-28 pb-4 md:pb-6"
      >
        <ol className="flex items-center gap-2 text-[12px] md:text-sm text-gray-500 overflow-hidden whitespace-nowrap">
          <li className="flex-shrink-0">
            <Link href="/" className="hover:text-red-600 transition-colors">
              Home
            </Link>
          </li>
          <li className="text-gray-300">/</li>
          <li className="flex-shrink-0">
            <Link
              href="/package"
              className="hover:text-red-600 transition-colors"
            >
              Tours
            </Link>
          </li>
          <li className="text-gray-300">/</li>
          <li className="text-gray-900 font-medium truncate">{tour.title}</li>
        </ol>
      </nav>

      {/* 2. ✨ New Image Gallery Component */}
      <TourImageGallery
        images={allImages}
        title={tour.title}
        isSuspended={isSuspended}
      />

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 pb-24">
        <article className="space-y-8 md:space-y-10">
          <header>
            <div className="flex flex-wrap gap-2 mb-3">
              {tour.tags?.map((tag: string, i: number) => (
                <span
                  key={i}
                  className={`text-[10px] md:text-[11px] uppercase tracking-wider font-bold px-2 py-1 rounded ${
                    tag === "Suspended"
                      ? "bg-red-100 text-red-600"
                      : "bg-orange-50 text-orange-600"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1
              className={`${hangameFont.className} text-xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight`}
            >
              {tour.title}
            </h1>

            <div
              className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 w-fit p-1 rounded transition-colors"
              onClick={scrollToReviews}
            >
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                <span className="font-bold text-gray-900">
                  {tour.totalReviews > 0
                    ? tour.averageRating.toFixed(1)
                    : "0.0"}
                </span>
                <span className="text-gray-400 hidden sm:inline underline decoration-dotted">
                  ({(tour.totalReviews || 0).toLocaleString()} reviews)
                </span>
              </div>
              <span className="w-px h-3 bg-gray-300"></span>
              <span className="font-medium text-gray-700">Popular Choice</span>
            </div>
          </header>

          {/* Suspended Alert */}
          {isSuspended && tour.description && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 md:p-5 rounded-r-md">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-red-800 font-bold text-[12px] md:text-sm uppercase mb-1">
                    Booking Suspended
                  </h3>
                  <div className="text-red-700 text-sm leading-relaxed">
                    Booking is currently suspended for this tour.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Trust Badges */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 border-y border-gray-100 py-6">
            {[
              {
                icon: CheckCircle2,
                title: "Instant Confirmation",
                desc: "Hassle-free",
                color: "bg-green-50 text-green-600",
              },
              {
                icon: Shield,
                title: "Licensed Operator",
                desc: "Registered",
                color: "bg-blue-50 text-blue-600",
              },
              {
                icon: RefreshCw,
                title: "Free Cancellation",
                desc: "24h prior",
                color: "bg-purple-50 text-purple-600",
              },
            ].map((badge, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 ${badge.color} rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  <badge.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">
                    {badge.title}
                  </p>
                  <p className="text-[11px] text-gray-500">{badge.desc}</p>
                </div>
              </div>
            ))}
          </section>

          {/* 5. Main Content Grid (Highlights + Options + Sidebar) */}
          {/* ✅ [구조 변경] 하이라이트와 옵션을 하나의 그리드 섹션으로 묶었습니다. */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* ⬅️ [왼쪽 컬럼] : 하이라이트 + 옵션 선택 */}
            <div
              className={selectedPackage ? "lg:col-span-2" : "lg:col-span-3"}
            >
              {/* ✅ [1] Highlights Section (여기 안으로 이동!) */}
              <TourHighlights content={tour.description} />

              {/* ✅ [2] Package Options Section */}
              <PackageOptionsSection
                packageOptions={tour.packageOptions || []}
                isSuspended={isSuspended ?? false}
                onSelectPackage={setSelectedPackage}
                onAddToCart={addItem}
                tourSlug={tour.slug}
                tourTitle={tour.title}
                tourImage={allImages[0]}
                tourId={tour._id}
                minPax={tour.minPax || 1}
              />
            </div>

            {/* ➡️ [오른쪽 컬럼] : 사이드바 (옵션 선택 시 등장) */}
            {/* 이제 사이드바는 하이라이트 섹션 높이부터 시작됩니다. */}
            {selectedPackage && (
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <PackageDetailSidebar
                    selectedPackage={selectedPackage}
                    meetingPoints={selectedPackage.meetingPoints}
                  />
                </div>
              </div>
            )}
          </section>

          {/* 6. Tour Overview */}
          <TourOverviewSection
            description={
              tour.fullDescription || "No detailed description available."
            }
          />

          {/* 7. Reviews Section */}
          <TourReviewsSection
            reviews={tour.reviewsData}
            averageRating={tour.averageRating}
            totalReviews={tour.totalReviews}
          />
        </article>
      </main>
    </div>
  );
}
