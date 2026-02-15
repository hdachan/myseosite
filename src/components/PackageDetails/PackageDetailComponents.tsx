import React from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Bus,
  Utensils,
  Hotel,
  Footprints,
  ShoppingBag,
} from "lucide-react";

// ✅ 인터페이스
interface ImageGridProps {
  images: string[];
  onImageClick: (index: number) => void;
}

interface ImageLightboxProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: (e: React.MouseEvent) => void;
  onPrev: (e: React.MouseEvent) => void;
}

// 🖼️ 이미지 그리드 컴포넌트
export const ImageGrid = ({ images, onImageClick }: ImageGridProps) => {
  if (!images || images.length === 0) return null;

  // Case 1: 이미지 1개
  if (images.length === 1) {
    return (
      <div
        className="relative w-full h-36 mt-2 rounded-lg overflow-hidden border border-gray-100 shadow-sm cursor-pointer group"
        onClick={() => onImageClick(0)}
      >
        <Image
          src={images[0]}
          alt="Schedule Image"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
    );
  }

  // Case 2: 이미지 2개
  if (images.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-1.5 mt-2 h-24 rounded-lg overflow-hidden">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative w-full h-full cursor-pointer group"
            onClick={() => onImageClick(idx)}
          >
            <Image
              src={img}
              alt={`Schedule Image ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
        ))}
      </div>
    );
  }

  // Case 3: 이미지 3개 이상
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-1.5 mt-2 h-36 rounded-lg overflow-hidden">
      {/* 큰 이미지 (왼쪽, 2행 차지) */}
      <div
        className="relative col-span-2 row-span-2 cursor-pointer group"
        onClick={() => onImageClick(0)}
      >
        <Image
          src={images[0]}
          alt="Main Schedule Image"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* 우측 상단 작은 이미지 */}
      <div
        className="relative col-span-1 row-span-1 cursor-pointer group"
        onClick={() => onImageClick(1)}
      >
        <Image
          src={images[1]}
          alt="Sub Image 1"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* 우측 하단 작은 이미지 (+N 오버레이) */}
      <div
        className="relative col-span-1 row-span-1 cursor-pointer group"
        onClick={() => onImageClick(2)}
      >
        <Image
          src={images[2]}
          alt="Sub Image 2"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* 이미지가 4장 이상이면 +N 표시 */}
        {images.length > 3 ? (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[1px] transition-colors hover:bg-black/60">
            <span className="text-white font-bold text-xs">
              +{images.length - 3}
            </span>
          </div>
        ) : (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        )}
      </div>
    </div>
  );
};

// 🌀 이미지 라이트박스 컴포넌트
export const ImageLightbox = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: ImageLightboxProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-[100000] transition-all hover:rotate-90"
      >
        <X className="w-8 h-8" />
      </button>

      <div
        className="relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center px-4 md:px-12"
        onClick={(e) => e.stopPropagation()}
      >
        {images[currentIndex] && (
          <Image
            src={images[currentIndex]}
            alt="Full size view"
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        )}

        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all hover:scale-110 active:scale-95 z-50"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all hover:scale-110 active:scale-95 z-50"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </>
        )}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 font-medium bg-black/50 px-3 py-1 rounded-full text-sm z-50">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

// 🎨 PortableText 커스텀 스타일
export const ptComponents = {
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

// 🎯 아이콘 헬퍼 함수들
export const getIcon = (type: string) => {
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

export const getIconColor = (type: string) => {
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
