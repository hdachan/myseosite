"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  X,
  LayoutGrid,
} from "lucide-react";

interface TourImageGalleryProps {
  images: string[];
  title: string;
  isSuspended?: boolean;
}

export default function TourImageGallery({
  images,
  title,
  isSuspended = false,
}: TourImageGalleryProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openLightbox = (index: number) => {
    setPhotoIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setPhotoIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setPhotoIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen]);

  // --- [UI 헬퍼] Suspended 오버레이 ---
  const SuspendedOverlay = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10 pointer-events-none">
      <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" /> SUSPENDED
      </div>
    </div>
  );

  // --- [UI 헬퍼] "전체보기" 버튼 ---
  const ShowAllButton = () => (
    <button
      onClick={() => openLightbox(0)}
      className="absolute bottom-4 right-4 bg-white hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-lg shadow-md font-medium text-sm flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 z-20"
    >
      <LayoutGrid className="w-4 h-4" />
      Show all photos ({images.length})
    </button>
  );

  // --- [UI 헬퍼] 공통 이미지 스타일 ---
  const getImageClass = () =>
    `object-cover w-full h-full cursor-pointer ${
      isSuspended ? "grayscale opacity-50" : ""
    }`;

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 pb-8">
      {/* 1. Mobile View */}
      <div className="md:hidden relative w-full h-72 rounded-xl overflow-hidden bg-gray-100">
        <Image
          src={images[photoIndex]}
          // ✅ [SEO 최적화] 모바일 뷰어용 동적 alt
          alt={`${title} - Tour Highlight ${photoIndex + 1}`}
          fill
          sizes="100vw"
          className={`object-cover ${isSuspended ? "grayscale opacity-50" : ""}`}
          onClick={() => openLightbox(photoIndex)}
        />
        {isSuspended && <SuspendedOverlay />}

        {images.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full shadow-md z-20 transition-all hover:bg-white active:scale-90"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full shadow-md z-20 transition-all hover:bg-white active:scale-90"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          </>
        )}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md z-20">
          {photoIndex + 1} / {images.length}
        </div>
      </div>

      {/* 2. Desktop View */}
      <div className="hidden md:grid grid-cols-4 gap-2 h-[480px] rounded-2xl overflow-hidden relative">
        <div
          className={`relative group overflow-hidden ${
            images.length === 1 ? "col-span-4" : "col-span-3"
          }`}
          onClick={() => openLightbox(0)}
        >
          <Image
            src={images[0]}
            // ✅ [SEO 최적화] 메인 이미지 동적 alt
            alt={`${title} - Main Attraction`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 75vw"
            className={getImageClass()}
          />
          {isSuspended && <SuspendedOverlay />}
        </div>

        {images.length > 1 && (
          <div className="col-span-1 flex flex-col gap-2 h-full">
            {images.slice(1, 4).map((img, idx) => (
              <div
                key={idx}
                className="relative flex-1 group overflow-hidden"
                onClick={() => openLightbox(idx + 1)}
              >
                <Image
                  src={img}
                  // ✅ [SEO 최적화] 갤러리 썸네일 동적 alt
                  alt={`${title} - Gallery View ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className={getImageClass()}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              </div>
            ))}
          </div>
        )}

        {images.length > 1 && <ShowAllButton />}
      </div>

      {/* 3. Lightbox (Popup) */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-50 transition-all hover:rotate-90"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center px-4 md:px-12"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[photoIndex]}
              // ✅ [SEO 최적화] 팝업 고해상도 이미지 동적 alt
              alt={`${title} - High Resolution View ${photoIndex + 1}`}
              fill
              className="object-contain"
              priority
              sizes="100vw"
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all hover:scale-110 active:scale-95"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all hover:scale-110 active:scale-95"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 font-medium bg-black/50 px-3 py-1 rounded-full text-sm">
            {photoIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
}
