// D:\myseosite\src\app\en\package\packageData.ts

// ✅ 상세 데이터(내용, 코스 등)가 들어있는 파일과 연결
import { tourDetails } from "./tourDetailData";

export type Category =
  | "ALL"
  | "DMZ"
  | "DAILY"
  | "LOCAL"
  | "DRAMA"
  | "SKI"
  | "RELIGIOUS";

// ✅ 옵션 타입 정의 (여기서 직접 정의하여 에러 방지)
export interface PackageOption {
  id: string;
  name: string;
  badge?: string;
  price: number;
  details: string[];
  excluded?: string[];
}

// ✅ 기본 정보 타입 (리스트 화면용 - 가벼움)
export interface PackageTourBasic {
  id: number;
  slug: string;
  category: Category;
  location: string;
  title: string;
  description: string;
  image: string; // 썸네일
  rating: number;
  reviews: number;
  bookings: string;
  price: number;
  tags?: string[];
  duration?: string;
  minimumPax?: number;
  keywords?: string[];
}

// ✅ 상세 정보 타입 (기본 정보 + 상세 데이터 합체본)
// 나중에 getPackageBySlug 함수가 이 형태로 데이터를 합쳐서 내보냅니다.
export interface PackageTour extends PackageTourBasic {
  fullDescription?: string;
  includes?: string[];
  excludes?: string[];
  meetingPoint?: string;
  cancellation?: string;
  packageOptions?: PackageOption[];
  images?: string[]; // 상세 갤러리 이미지
}

// ====================================================================
// 📋 리스트 데이터 (요약 정보만 모아둠)
// ====================================================================
export const basicPackages: PackageTourBasic[] = [
  // 1. DMZ
  {
    id: 101,
    slug: "dmz-tour-combined",
    category: "DMZ",
    location: "Paju · DMZ",
    title: "DMZ Tour : The 3rd Infiltration Tunnel & Suspension Bridge",
    description:
      "Explore the most popular DMZ courses including the 3rd Tunnel.",
    image:
      "https://images.unsplash.com/photo-1596420803522-824f9c656513?w=800&q=80",
    rating: 4.9,
    reviews: 1500,
    bookings: "6k+ bookings",
    price: 55,
    keywords: ["DMZ", "3rd Tunnel", "North Korea"],
    tags: ["Must Visit"],
  },
  {
    id: 105,
    slug: "jsa-tour-suspended",
    category: "DMZ",
    location: "Panmunjom · JSA",
    title: "JSA Tour (Joint Security Area)",
    description: "⛔ Temporarily Suspended due to Government Regulations",
    image:
      "https://images.unsplash.com/photo-1588665725227-2856247c413b?w=800&q=80",
    rating: 4.9,
    reviews: 2100,
    bookings: "Suspended",
    price: 0,
    tags: ["Suspended"],
  },

  // 2. DAILY
  {
    id: 201,
    slug: "morning-tour-seoul",
    category: "DAILY",
    location: "Seoul",
    title: "Morning Tour : Explore Seoul in the Morning",
    description: "Choose from Palaces, Museums, or N Seoul Tower.",
    image:
      "https://images.unsplash.com/photo-1596896236979-4d8b9d3c5096?w=800&q=80",
    rating: 4.8,
    reviews: 520,
    bookings: "2.5k+ bookings",
    price: 40,
    duration: "09:00 - 13:00 (Approx.)",
    tags: ["Best Seller", "Half Day"],
  },
  {
    id: 202,
    slug: "afternoon-tour-seoul",
    category: "DAILY",
    location: "Seoul",
    title: "Afternoon Tour : Seoul Highlights & Culture",
    description:
      "Experience Folk Villages, Palaces, or River Cruises in the afternoon.",
    image:
      "https://images.unsplash.com/photo-1627447833139-445853a47926?w=800&q=80",
    rating: 4.7,
    reviews: 400,
    bookings: "1.8k+ bookings",
    price: 45,
    duration: "13:00 - 17:30 (Approx.)",
  },
  {
    id: 203,
    slug: "full-day-tour-seoul",
    category: "DAILY",
    location: "Seoul & Suburbs",
    title: "Full Day Tour : The Complete Seoul Experience",
    description:
      "Various full-day itineraries covering history, culture, and shopping.",
    image:
      "https://images.unsplash.com/photo-1605218427368-35b86d9441a1?w=800&q=80",
    rating: 4.9,
    reviews: 1200,
    bookings: "5k+ bookings",
    price: 80,
    duration: "09:00 - 17:30 (Approx.)",
    tags: ["Best Seller", "Recommended"],
  },

  // 3. LOCAL
  {
    id: 301,
    slug: "provincial-tour-korea",
    category: "LOCAL",
    location: "Outside Seoul",
    title: "Provincial Tour : Discover Korea's Beauty",
    description: "Travel to Seoraksan, Gyeongju, Busan, Jeju and more.",
    image:
      "https://images.unsplash.com/photo-1610444654992-6f35b440893f?w=800&q=80",
    rating: 4.8,
    reviews: 600,
    bookings: "1k+ bookings",
    price: 110,
  },

  // 4. DRAMA
  {
    id: 401,
    slug: "drama-tour-korea",
    category: "DRAMA",
    location: "Various Locations",
    title: "Drama Tour : K-Drama Filming Locations",
    description: "Visit the scenes of Winter Sonata, Parasite, and more.",
    image:
      "https://images.unsplash.com/photo-1603522699946-857c5e207c4b?w=800&q=80",
    rating: 4.9,
    reviews: 2000,
    bookings: "5k+ bookings",
    price: 70,
    tags: ["K-Culture"],
  },

  // 5. SKI
  {
    id: 501,
    slug: "ski-tour-korea",
    category: "SKI",
    location: "Ski Resorts",
    title: "Ski Tour : Winter Ski & Snowboard",
    description:
      "Experience winter sports at Jisan, Elysian, or Yongpyong resorts.",
    image:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
    rating: 4.8,
    reviews: 800,
    bookings: "3k+ bookings",
    price: 90,
    tags: ["Winter Only", "Seasonal"],
  },

  // 6. RELIGIOUS
  {
    id: 601,
    slug: "muslim-tour-korea",
    category: "RELIGIOUS",
    location: "Seoul & Nami",
    title: "Muslim Tour : Halal Friendly Travel",
    description:
      "Specialized tours with Halal food and prayer time arrangements.",
    image:
      "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=800&q=80",
    rating: 4.9,
    reviews: 300,
    bookings: "800+ bookings",
    price: 85,
    tags: ["Halal", "Muslim Friendly"],
  },
  {
    id: 602,
    slug: "catholic-tour-korea",
    category: "RELIGIOUS",
    location: "Seoul & Holy Sites",
    title: "Catholic Tour : Pilgrimage in Korea",
    description: "Visit holy shrines and follow the route of Pope Francis.",
    image:
      "https://images.unsplash.com/photo-1548625361-12e2c5643444?w=800&q=80",
    rating: 5.0,
    reviews: 100,
    bookings: "200+ bookings",
    price: 100,
  },
  {
    id: 603,
    slug: "buddhist-tour-korea",
    category: "RELIGIOUS",
    location: "Temples",
    title: "Buddhist Tour : Temple Stay & Culture",
    description: "Experience Korean Buddhism and meditation at serene temples.",
    image:
      "https://images.unsplash.com/photo-1597817473551-7e87514a66f7?w=800&q=80",
    rating: 4.8,
    reviews: 150,
    bookings: "300+ bookings",
    price: 60,
    tags: ["Wellness", "Meditation"],
  },
];

// ====================================================================
// 🚀 Helper functions (여기서 두 데이터를 합칩니다!)
// ====================================================================

// Slug로 상품 찾기 (상세페이지용 - 합체!)
export function getPackageBySlug(slug: string): PackageTour | undefined {
  const basic = basicPackages.find((tour) => tour.slug === slug);
  // tourDetailData.ts 파일에서 해당 slug의 상세 정보를 가져옴
  const detail = tourDetails[slug];

  if (!basic) return undefined;

  // 기본 정보 + 상세 정보 = 완전체 데이터 리턴
  return { ...basic, ...detail };
}

// ID로 상품 찾기
export function getPackageById(id: number): PackageTour | undefined {
  const basic = basicPackages.find((tour) => tour.id === id);
  if (!basic) return undefined;
  const detail = tourDetails[basic.slug];
  return { ...basic, ...detail };
}

// 카테고리별 상품 목록 가져오기 (리스트용)
export function getPackagesByCategory(category: Category): PackageTourBasic[] {
  if (category === "ALL") return basicPackages;
  return basicPackages.filter((tour) => tour.category === category);
}

// 모든 Slug 목록 가져오기 (Static Paths 생성용)
export function getAllSlugs(): string[] {
  return basicPackages.map((tour) => tour.slug);
}
