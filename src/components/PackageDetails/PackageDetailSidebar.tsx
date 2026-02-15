"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { MapPin, Map, Clock, AlertCircle, ChevronDown } from "lucide-react";
import { hangameFont } from "@/lib/fonts";
import { useCurrency } from "@/app/context/CurrencyContext";
import { PortableText } from "@portabletext/react";
import {
  ImageGrid,
  ImageLightbox,
  ptComponents,
  getIcon,
  getIconColor,
} from "./PackageDetailComponents";

// ✅ 인터페이스 정의
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
  note?: any;
}

interface MeetingPoint {
  name?: string;
  description: string;
  images?: string[];
}

interface PackageDetailSidebarProps {
  selectedPackage: PackageOption;
  meetingPoints?: MeetingPoint[];
}

export default function PackageDetailSidebar({
  selectedPackage,
  meetingPoints,
}: PackageDetailSidebarProps) {
  const { currency } = useCurrency();

  // 📍 Refs
  const meetingPointRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 📸 Lightbox 상태
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 📍 미팅 포인트로 스크롤
  const scrollToMeetingPoint = () => {
    if (meetingPointRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const target = meetingPointRef.current;
      const targetPosition = target.offsetTop - container.offsetTop;

      container.scrollTo({
        top: targetPosition - 20,
        behavior: "smooth",
      });
    }
  };

  // 🖼️ Lightbox 핸들러
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

  // ⌨️ 키보드 이벤트
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

  return (
    <>
      <aside className="lg:col-span-1">
        <div className="space-y-4 sticky top-24">
          <section className="bg-white rounded-[6px] border border-gray-200 overflow-hidden shadow-sm flex flex-col">
            {/* 1️⃣ 헤더 */}
            <div className="p-5 border-b border-gray-100 bg-gray-50/80 backdrop-blur-sm z-10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#4A7C7E] font-bold mb-2">
                SELECTED OPTION
              </p>
              <h3
                className={`${hangameFont.className} text-lg font-bold text-gray-900 leading-tight mb-1`}
              >
                Tour Details
              </h3>
              <p className="text-sm text-gray-500 font-medium line-clamp-2">
                {selectedPackage.name}
              </p>
            </div>

            {/* 🚀 스크롤 영역 - 높이만 450px로 축소 */}
            <div
              ref={scrollContainerRef}
              className="overflow-y-auto max-h-[450px] scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent"
            >
              {/* 2️⃣ 일정표 */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4 text-gray-800 font-bold text-sm">
                  <Clock className="w-4 h-4 text-[#4A7C7E]" />
                  Itinerary
                </div>

                {selectedPackage.itinerary &&
                selectedPackage.itinerary.length > 0 ? (
                  <div className="relative border-l-2 border-gray-100 ml-3 space-y-8 pb-2">
                    {/* 📍 미팅 포인트 링크 */}
                    {meetingPoints && meetingPoints.length > 0 && (
                      <div className="relative pl-6">
                        <div className="absolute -left-[9px] top-1 w-5 h-5 rounded-full border border-white shadow-sm flex items-center justify-center bg-[#4A7C7E]">
                          <MapPin className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={scrollToMeetingPoint}
                            className="text-left group"
                          >
                            <h4 className="text-sm font-bold text-gray-800 leading-tight group-hover:text-[#4A7C7E] transition-colors flex items-center gap-2">
                              Meeting Point
                              <ChevronDown className="w-3.5 h-3.5 text-[#4A7C7E] group-hover:translate-y-0.5 transition-transform" />
                            </h4>
                            <p className="text-xs text-gray-500 leading-snug mt-1 group-hover:text-gray-700 transition-colors">
                              Click to view meeting point details below
                            </p>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* 일정 아이템들 */}
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
                            <ImageGrid
                              images={item.images}
                              onImageClick={(imgIndex) =>
                                openLightbox(item.images, imgIndex)
                              }
                            />
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

              {/* 3️⃣ 미팅 포인트 */}
              {meetingPoints &&
                Array.isArray(meetingPoints) &&
                meetingPoints.length > 0 && (
                  <div
                    ref={meetingPointRef}
                    className="border-t border-gray-100 p-5 bg-gray-50/30"
                  >
                    <div className="flex items-center gap-2 mb-4 text-gray-800 font-bold text-sm">
                      <MapPin className="w-4 h-4 text-[#4A7C7E]" />
                      Meeting Points
                    </div>

                    <div className="relative border-l-2 border-gray-100 ml-3 space-y-8 pb-2">
                      {meetingPoints.map((point, index) => (
                        <div key={index} className="relative pl-6">
                          <div className="absolute -left-[9px] top-1 w-5 h-5 rounded-full border border-white shadow-sm flex items-center justify-center bg-[#4A7C7E]">
                            <MapPin className="w-3.5 h-3.5 text-white" />
                          </div>

                          <div className="flex flex-col gap-1">
                            {point.name && (
                              <h4 className="text-sm font-bold text-gray-800 leading-tight">
                                {point.name}
                              </h4>
                            )}

                            <p className="text-xs text-gray-500 leading-snug mt-1 whitespace-pre-line">
                              {point.description}
                            </p>

                            {point.images && point.images.length > 0 && (
                              <ImageGrid
                                images={point.images}
                                onImageClick={(imgIndex) =>
                                  openLightbox(point.images, imgIndex)
                                }
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* 4️⃣ Important Notice */}
              {selectedPackage.note && (
                <div className="relative">
                  <div className="absolute top-0 inset-x-5 border-t border-dashed border-gray-200"></div>
                  <div className="p-5 pt-8 bg-red-50/30">
                    <div className="flex items-center gap-2 mb-3 text-red-700 font-bold text-sm">
                      <AlertCircle className="w-4 h-4" />
                      Important Notice
                    </div>
                    <div className="text-xs text-gray-700 leading-relaxed">
                      <PortableText
                        value={selectedPackage.note}
                        components={ptComponents}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </aside>

      {/* 🌀 Lightbox Portal */}
      {mounted &&
        createPortal(
          <ImageLightbox
            isOpen={isLightboxOpen}
            images={lightboxImages}
            currentIndex={currentIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
          />,
          document.body,
        )}
    </>
  );
}
