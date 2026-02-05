"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  MapPin,
  Bus,
  Utensils,
  Hotel,
  Footprints,
  ShoppingBag,
  Map,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { hangameFont } from "@/lib/fonts";
import { useCurrency } from "@/app/context/CurrencyContext";

interface ScheduleItem {
  time?: string;
  title: string;
  description?: string;
  iconType?: string;
  images?: string[];
}

interface PackageOption {
  name: string;
  itinerary?: ScheduleItem[];
}

interface MeetingPoint {
  description: string;
  images?: string[];
}

interface PackageDetailSidebarProps {
  selectedPackage: PackageOption;
  meetingPoint?: string | MeetingPoint;
}

export default function PackageDetailSidebar({
  selectedPackage,
  meetingPoint,
}: PackageDetailSidebarProps) {
  const { currency } = useCurrency();

  // 📸 [팝업 상태 관리]
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // ✅ 클라이언트 사이드 렌더링 확인용
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openLightbox = (images: string[] | undefined, index: number = 0) => {
    if (!images || images.length === 0) return;
    setLightboxImages(images);
    setCurrentIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setLightboxImages([]);
    document.body.style.overflow = "auto";
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) =>
      prev === lightboxImages.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) =>
      prev === 0 ? lightboxImages.length - 1 : prev - 1,
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage(e as any);
      if (e.key === "ArrowLeft") prevImage(e as any);
    };
    if (isLightboxOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen]);

  // 아이콘 헬퍼
  const getIcon = (type: string) => {
    switch (type) {
      case "transport":
        return <Bus className="w-3.5 h-3.5 text-white" />;
      case "food":
        return <Utensils className="w-3.5 h-3.5 text-white" />;
      case "hotel":
        return <Hotel className="w-3.5 h-3.5 text-white" />;
      case "walking":
        return <Footprints className="w-3.5 h-3.5 text-white" />;
      case "shopping":
        return <ShoppingBag className="w-3.5 h-3.5 text-white" />;
      default:
        return <MapPin className="w-3.5 h-3.5 text-white" />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "transport":
        return "bg-blue-500";
      case "food":
        return "bg-orange-500";
      case "hotel":
        return "bg-indigo-500";
      case "shopping":
        return "bg-pink-500";
      default:
        return "bg-[#4A7C7E]";
    }
  };

  // 🌀 팝업 내용물
  const lightboxContent = isLightboxOpen ? (
    <div
      className="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center backdrop-blur-sm animate-in fade-in duration-200"
      onClick={closeLightbox}
    >
      {/* 🚀 [수정 완료] X 버튼 디자인을 갤러리와 똑같이 맞춤 (w-8 h-8, top-4 right-4) */}
      <button
        onClick={closeLightbox}
        className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-[100000] transition-all hover:rotate-90"
      >
        <X className="w-8 h-8" />
      </button>

      {/* 이미지 컨테이너 */}
      <div
        className="relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center px-4 md:px-12"
        onClick={(e) => e.stopPropagation()}
      >
        {lightboxImages[currentIndex] && (
          <Image
            src={lightboxImages[currentIndex]}
            alt="Full size view"
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        )}

        {lightboxImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all hover:scale-110 active:scale-95 z-50"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all hover:scale-110 active:scale-95 z-50"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </>
        )}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 font-medium bg-black/50 px-3 py-1 rounded-full text-sm z-50">
          {currentIndex + 1} / {lightboxImages.length}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <aside className="lg:col-span-1">
        <div className="space-y-4 sticky top-24">
          {/* 1. 투어 스케줄 */}
          <section className="bg-white rounded-[6px] border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#4A7C7E] font-bold mb-2">
                SELECTED OPTION
              </p>
              <h3
                className={`${hangameFont.className} text-lg font-bold text-gray-900 leading-tight mb-1`}
              >
                Tour Schedule
              </h3>
              <p className="text-sm text-gray-500 font-medium line-clamp-2">
                {selectedPackage.name}
              </p>
            </div>

            <div className="p-5">
              {selectedPackage.itinerary &&
              selectedPackage.itinerary.length > 0 ? (
                <div className="relative border-l-2 border-gray-100 ml-3 space-y-8 pb-2">
                  {selectedPackage.itinerary.map((item, index) => (
                    <div key={index} className="relative pl-6">
                      <div
                        className={`absolute -left-[9px] top-1 w-5 h-5 rounded-full border border-white shadow-sm flex items-center justify-center ${getIconColor(item.iconType || "location")}`}
                      >
                        {getIcon(item.iconType || "location")}
                      </div>
                      <div className="flex flex-col gap-1">
                        {item.time && (
                          <span className="text-xs font-bold text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded w-fit mb-0.5">
                            {item.time}
                          </span>
                        )}
                        <h4 className="text-sm font-bold text-gray-800 leading-tight">
                          {item.title}
                        </h4>
                        {item.description && (
                          <p className="text-xs text-gray-500 leading-snug mt-1 whitespace-pre-line">
                            {item.description}
                          </p>
                        )}
                        {item.images && item.images.length > 0 && (
                          <div
                            className="relative w-full h-24 mt-2 rounded-md overflow-hidden border border-gray-100 shadow-sm group cursor-pointer"
                            onClick={() => openLightbox(item.images)}
                          >
                            <Image
                              src={item.images[0]}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {item.images.length > 1 && (
                              <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-sm z-10 flex items-center gap-1">
                                +{item.images.length - 1} photos
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-400 text-sm flex flex-col items-center">
                  <Map className="w-8 h-8 mb-2 opacity-30" />
                  <p>No schedule details available.</p>
                </div>
              )}
            </div>
          </section>

          {/* 2. 미팅 포인트 */}
          {meetingPoint && (
            <div className="bg-blue-50 p-5 rounded-[6px] border border-blue-100 text-sm text-blue-900">
              <p className="font-bold flex items-center gap-2 mb-3 text-blue-800">
                <MapPin className="w-4 h-4 text-blue-600" />
                Meeting Point
              </p>
              {typeof meetingPoint === "object" ? (
                <>
                  <p className="leading-relaxed text-blue-800 mb-4 whitespace-pre-line text-sm">
                    {(meetingPoint as MeetingPoint).description}
                  </p>
                  {(meetingPoint as MeetingPoint).images &&
                    (meetingPoint as MeetingPoint).images!.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {(meetingPoint as MeetingPoint).images!.map(
                          (img, idx) => (
                            <div
                              key={idx}
                              className="relative aspect-square w-full rounded-md overflow-hidden border border-blue-200 cursor-pointer hover:opacity-90 transition shadow-sm"
                              onClick={() =>
                                openLightbox(
                                  (meetingPoint as MeetingPoint).images,
                                  idx,
                                )
                              }
                            >
                              <Image
                                src={img}
                                alt="Meeting Point"
                                fill
                                className="object-cover"
                              />
                            </div>
                          ),
                        )}
                      </div>
                    )}
                </>
              ) : (
                <p className="leading-relaxed text-blue-800">{meetingPoint}</p>
              )}
            </div>
          )}
        </div>
      </aside>

      {/* 🌀 팝업을 Portal로 내보내기 */}
      {mounted &&
        isLightboxOpen &&
        createPortal(lightboxContent, document.body)}
    </>
  );
}
