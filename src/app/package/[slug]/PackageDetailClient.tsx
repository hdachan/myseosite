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
import { PackageTour, PackageOption } from "../packageData";
import { useCartStore } from "@/store/cartStore";
import PackageOptionsSection from "@/components/PackageDetails/PackageOptionsSection";
import PackageDetailSidebar from "@/components/PackageDetails/PackageDetailSidebar";
import TourOverviewSection from "@/components/PackageDetails/TourOverviewSection";

interface Props {
  tour: PackageTour;
}

export default function PackageDetailClient({ tour }: Props) {
  const addItem = useCartStore((state) => state.addItem);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<PackageOption | null>(
    null
  );

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
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4"
      >
        <ol className="flex items-center gap-2 text-sm text-gray-600">
          <li>
            <Link href="/" className="hover:text-red-600">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/package" className="hover:text-red-600">
              Package Tours
            </Link>
          </li>
          <li>/</li>
          <li className="text-red-600 font-semibold line-clamp-1">
            {tour.title}
          </li>
        </ol>
      </nav>

      {/* Image Gallery */}
      <section className="relative w-full h-96 md:h-[500px] bg-black">
        <Image
          src={images[currentImageIndex]}
          alt={`${tour.title} - Image ${currentImageIndex + 1}`}
          fill
          priority
          sizes="100vw"
          className={`object-cover ${
            isSuspended ? "grayscale opacity-50" : ""
          }`}
        />

        {isSuspended && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
            <div className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-xl flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              TEMPORARILY SUSPENDED
            </div>
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition shadow-lg z-20"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition shadow-lg z-20"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </>
        )}

        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm z-20">
          {currentImageIndex + 1} / {images.length}
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="space-y-6">
          {/* Tags & Title */}
          <div className="flex gap-2">
            {tour.tags?.map((tag, i) => (
              <span
                key={i}
                className={`px-3 py-1 rounded text-sm font-semibold ${
                  tag === "Suspended"
                    ? "bg-red-100 text-red-600"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <header>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {tour.title}
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
                <span className="font-bold text-lg">{tour.rating}</span>
              </div>
              <span className="text-gray-500">
                ({tour.reviews.toLocaleString()} reviews)
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 font-medium">{tour.bookings}</span>
            </div>
          </header>

          {isSuspended && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-red-800 font-bold">Booking Suspended</h3>
                  <p className="text-red-700 text-sm mt-1">
                    {tour.description.replace("⛔ ", "")}
                  </p>
                  <p className="text-red-600 text-sm mt-2">
                    Please refer to other DMZ tours as an alternative.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Trust Badges */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">
                  Instant Confirmation
                </p>
                <p className="text-xs text-gray-600">Confirmed after booking</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">
                  Safe Travel
                </p>
                <p className="text-xs text-gray-600">Licensed Operator</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">
                  Free Cancellation
                </p>
                <p className="text-xs text-gray-600">
                  Up to 24-48 hours before
                </p>
              </div>
            </div>
          </section>

          {/* Package Options Section with Sidebar */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
              />
            </div>

            {selectedPackage && (
              <PackageDetailSidebar
                selectedPackage={selectedPackage}
                commonIncludes={tour.includes}
                meetingPoint={tour.meetingPoint}
              />
            )}
          </section>

          {/* Tour Overview */}
          <TourOverviewSection
            description={tour.fullDescription || tour.description}
          />
        </article>
      </main>
    </div>
  );
}
