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
  Clock,
  AlertCircle, // ⚠️ 아이콘 추가
} from "lucide-react";
import Image from "next/image";
import { hangameFont } from "@/lib/fonts";
import { useCurrency } from "@/app/context/CurrencyContext";
// ✅ Portable Text 임포트
import { PortableText } from "@portabletext/react";

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
  note?: any; // ✅ [추가됨] Portable Text 데이터
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

// ✅ Portable Text 커스텀 스타일 정의
const ptComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-xs text-gray-600 leading-relaxed mb-2">{children}</p>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-sm font-bold text-gray-800 mt-4 mb-2">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-[#4A7C7E] pl-3 italic text-gray-500 my-2 text-xs">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc ml-4 space-y-1 text-xs text-gray-600 mb-2">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal ml-4 space-y-1 text-xs text-gray-600 mb-2">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    underline: ({ children }: any) => <u className="underline">{children}</u>,
  },
};

export default function PackageDetailSidebar({
  selectedPackage,
  meetingPoints,
}: PackageDetailSidebarProps) {
  const { currency } = useCurrency();

  // 📸 [팝업 상태 관리]
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  // 아이콘 헬퍼 함수들
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
      <button
        onClick={closeLightbox}
        className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-[100000] transition-all hover:rotate-90"
      >
        <X className="w-8 h-8" />
      </button>

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
          <section className="bg-white rounded-[6px] border border-gray-200 overflow-hidden shadow-sm flex flex-col">
            {/* 1️⃣ [헤더] */}
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

            {/* 🚀 [스크롤 영역] */}
            <div className="overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              {/* 2️⃣ [일정표] */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4 text-gray-800 font-bold text-sm">
                  <Clock className="w-4 h-4 text-[#4A7C7E]" />
                  Itinerary
                </div>

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

              {/* 3️⃣ [미팅 포인트] */}
              {meetingPoints &&
                Array.isArray(meetingPoints) &&
                meetingPoints.length > 0 && (
                  <div className="border-t border-gray-100 p-5 bg-gray-50/30">
                    <div className="flex items-center gap-2 mb-4 text-gray-800 font-bold text-sm">
                      <MapPin className="w-4 h-4 text-[#4A7C7E]" />
                      Meeting Points
                    </div>

                    <div className="space-y-6">
                      {meetingPoints.map((point, index) => (
                        <div
                          key={index}
                          className={
                            index !== 0
                              ? "pt-4 border-t border-gray-200/50"
                              : ""
                          }
                        >
                          {point.name && (
                            <h4 className="font-bold text-gray-900 mb-1 text-sm">
                              📍 {point.name}
                            </h4>
                          )}

                          <p className="leading-relaxed text-gray-600 mb-3 whitespace-pre-line text-xs">
                            {point.description}
                          </p>

                          {point.images && point.images.length > 0 && (
                            <div className="grid grid-cols-3 gap-2">
                              {point.images.map((img, imgIdx) => (
                                <div
                                  key={imgIdx}
                                  className="relative aspect-square w-full rounded-md overflow-hidden border border-gray-200 cursor-pointer hover:opacity-90 transition shadow-sm"
                                  onClick={() =>
                                    openLightbox(point.images, imgIdx)
                                  }
                                >
                                  <Image
                                    src={img}
                                    alt={`Meeting Point ${index + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* 4️⃣ ✅ [추가됨] Important Notice (Note) */}
              {selectedPackage.note && (
                <div className="relative">
                  <div className="absolute top-0 inset-x-5 border-t border-dashed border-gray-200"></div>
                  <div className="p-5 pt-8 bg-red-50/30">
                    <div className="flex items-center gap-2 mb-3 text-red-700 font-bold text-sm">
                      <AlertCircle className="w-4 h-4" />
                      Important Notice
                    </div>
                    <div className="text-xs text-gray-700 leading-relaxed">
                      {/* PortableText 컴포넌트로 에디터 내용 렌더링 */}
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

      {/* 🌀 Portal 팝업 */}
      {mounted &&
        isLightboxOpen &&
        createPortal(lightboxContent, document.body)}
    </>
  );
}
