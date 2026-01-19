"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  CheckCircle2,
  Shield,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import PackageOptionsSection from "@/components/PackageDetails/PackageOptionsSection";
import PackageDetailSidebar from "@/components/PackageDetails/PackageDetailSidebar";
import TourOverviewSection from "@/components/PackageDetails/TourOverviewSection";

// ❌ [삭제] 메인 화면용 일정표 컴포넌트는 이제 필요 없습니다. (사이드바에 넣었으니까요!)
// import TourItinerarySection from "@/components/PackageDetails/TourItinerarySection";

/* ✅ 폰트 가져오기 */
import { hangameFont } from "@/lib/fonts";

interface Props {
  tour: any; // Sanity 데이터
}

export default function PackageDetailClient({ tour }: Props) {
  const addItem = useCartStore((state) => state.addItem);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 선택된 패키지 상태
  const [selectedPackage, setSelectedPackage] = useState<any | null>(null);

  const isSuspended =
    tour.bookings === "Suspended" || tour.tags?.includes("Suspended");

  const images =
    tour.images && tour.images.length > 0 ? tour.images : [tour.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-6xl mx-auto px-8 lg:px-12 pt-24 pb-6"
      >
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-red-600 transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href="/package"
              className="hover:text-red-600 transition-colors"
            >
              Package Tours
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium line-clamp-1">
            {tour.title}
          </li>
        </ol>
      </nav>

      {/* 2. Image Gallery */}
      <section className="max-w-6xl mx-auto px-8 lg:px-12 pb-8">
        <div className="relative w-full h-80 md:h-[480px] rounded-lg overflow-hidden bg-gray-100 shadow-sm">
          {images[currentImageIndex] && (
            <Image
              src={images[currentImageIndex]}
              alt={`${tour.title} - Image ${currentImageIndex + 1}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className={`object-cover transition-all duration-500 ${
                isSuspended ? "grayscale opacity-50" : ""
              }`}
            />
          )}

          {isSuspended && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
              <div className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-xl flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                TEMPORARILY SUSPENDED
              </div>
            </div>
          )}

          {/* 화살표 버튼 */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition shadow-md z-20"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition shadow-md z-20"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium z-20 backdrop-blur-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-8 lg:px-12 pb-24">
        <article className="space-y-10">
          {/* 3. Header Info */}
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
              className={`${hangameFont.className} text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight`}
            >
              {tour.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                <span className="font-bold text-gray-900">{tour.rating}</span>
                <span className="text-gray-400">
                  ({tour.reviews?.toLocaleString()} reviews)
                </span>
              </div>
              <span className="w-px h-3 bg-gray-300"></span>
              <span className="font-medium text-gray-700">
                {tour.bookings} booked
              </span>
            </div>
          </header>

          {/* Suspended Alert */}
          {isSuspended && tour.description && (
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-md">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-red-800 font-bold text-sm uppercase mb-1">
                    Booking Suspended
                  </h3>
                  <p className="text-red-700 text-sm leading-relaxed">
                    {tour.description.replace("⛔ ", "")}
                  </p>
                  <p className="text-red-600 text-xs mt-2 font-medium">
                    Please refer to other DMZ tours as an alternative.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 4. Trust Badges */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 border-y border-gray-100 py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900">
                  Instant Confirmation
                </p>
                <p className="text-xs text-gray-500">Confirmed after booking</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900">Safe Travel</p>
                <p className="text-xs text-gray-500">Licensed Operator</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900">
                  Free Cancellation
                </p>
                <p className="text-xs text-gray-500">
                  Up to 24-48 hours before
                </p>
              </div>
            </div>
          </section>

          {/* 5. Package Options & Sidebar */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* 왼쪽: 옵션 선택만 남김 (일정표 삭제) */}
            <div
              className={selectedPackage ? "lg:col-span-2" : "lg:col-span-3"}
            >
              <PackageOptionsSection
                packageOptions={tour.packageOptions || []}
                isSuspended={isSuspended ?? false}
                onSelectPackage={setSelectedPackage}
                onAddToCart={addItem}
                tourSlug={tour.slug}
                tourTitle={tour.title}
                tourImage={images[0]}
                tourId={tour._id}
              />
              {/* ❌ 여기에 있던 TourItinerarySection을 지웠습니다! */}
            </div>

            {/* 오른쪽: 사이드바 (여기서 일정표가 나옴) */}
            {selectedPackage && (
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  {/* Sidebar 코드를 수정했으므로, 여기에 selectedPackage만 넘기면 알아서 일정표를 보여줍니다 */}
                  <PackageDetailSidebar
                    selectedPackage={selectedPackage}
                    meetingPoint={tour.meetingPoint}
                  />
                </div>
              </div>
            )}
          </section>

          {/* 6. Tour Overview */}
          <TourOverviewSection
            description={tour.fullDescription || tour.description}
          />
        </article>
      </main>
    </div>
  );
}
