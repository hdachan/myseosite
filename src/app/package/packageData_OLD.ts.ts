// import { tourDetails } from "./1tourDetailData_OLD.ts.js";

// export type Category =
//   | "ALL"
//   | "DMZ"
//   | "DAILY"
//   | "LOCAL"
//   | "DRAMA"
//   | "SKI"
//   | "RELIGIOUS";

// export interface PackageOption {
//   id: string;
//   name: string;
//   badge?: string;
//   price: number;
//   details: string[];
//   excluded?: string[];
// }

// export interface PackageTourBasic {
//   id: number;
//   slug: string;
//   category: Category;
//   location: string;
//   title: string;
//   description: string; // 쉼표(,)로 구분된 키워드 (예: "No Shopping,English Guided")
//   image: string;
//   rating: number;
//   reviews: number;
//   bookings: string;
//   price: number;
//   tags?: string[];
//   duration?: string;
//   minimumPax?: number;
//   keywords?: string[];
//   discount?: number; // 할인율
//   originalPrice?: number; // 원래 가격
// }

// export interface PackageTour extends PackageTourBasic {
//   fullDescription?: string;
//   includes?: string[];
//   excludes?: string[];
//   meetingPoint?: string;
//   cancellation?: string;
//   packageOptions?: PackageOption[];
//   images?: string[];
// }

// // ====================================================================
// // 📋 리스트 데이터 (쉼표로 구분된 키워드 + 할인 적용)
// // ====================================================================
// export const basicPackages: PackageTourBasic[] = [
//   {
//     id: 101,
//     slug: "dmz-tour-combined",
//     category: "DMZ",
//     location: "Paju · DMZ",
//     title: "DMZ Tour : The 3rd Infiltration Tunnel & Suspension Bridge",
//     description: "English Guided,No Shopping,Hotel Pick-up",
//     // 파주 임진각/철교 느낌의 이미지
//     image:
//       "https://images.unsplash.com/photo-1590664095641-7fa05f689813?w=800&q=80",
//     rating: 4.9,
//     reviews: 1500,
//     bookings: "6k+ booked",
//     price: 20,
//     originalPrice: 70,
//     discount: 50,
//     keywords: ["DMZ", "3rd Tunnel", "Dora Observatory", "Imjingak"],
//     tags: ["Best Seller"],
//   },
//   {
//     id: 105,
//     slug: "jsa-tour-suspended",
//     category: "DMZ",
//     location: "Panmunjom · JSA",
//     title: "JSA Tour (Joint Security Area)",
//     description: "Temporarily Suspended",
//     image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365",
//     rating: 4.9,
//     reviews: 2100,
//     bookings: "Suspended",
//     price: 0,
//     tags: ["Suspended"],
//   },

//   // 2. DAILY
//   {
//     id: 201,
//     slug: "morning-tour-seoul",
//     category: "DAILY",
//     location: "Seoul",
//     title: "Morning Tour : Explore Seoul in the Morning",
//     description: "Gyeongbokgung, Blue House, Jogyesa Temple",
//     image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365",
//     rating: 4.8,
//     reviews: 520,
//     bookings: "2.5k+ booked",
//     price: 40,
//     originalPrice: 50,
//     discount: 20,
//     duration: "4 Hours",
//     tags: ["Best Seller"],
//   },

//   {
//     id: 202,
//     slug: "afternoon-tour-seoul",
//     category: "DAILY",
//     location: "Seoul",
//     title: "Afternoon Tour : Seoul Highlights & Culture",
//     description: "Changdeokgung,Insadong,Namdaemun Market",
//     // 남산타워/도시 전경
//     image:
//       "https://images.unsplash.com/photo-1525762867061-21c9fb70b15a?w=800&q=80",
//     rating: 4.7,
//     reviews: 400,
//     bookings: "1.8k+ booked",
//     price: 45,
//     duration: "4.5 Hours",
//   },
//   {
//     id: 203,
//     slug: "full-day-tour-seoul",
//     category: "DAILY",
//     location: "Seoul & Suburbs",
//     title: "Full Day Tour : The Complete Seoul Experience",
//     description: "Seoul Highlights, Lunch Included, N Seoul Tower",
//     image:
//       "https://images.unsplash.com/photo-1517153295259-74eb0b416cee?auto=format&fit=crop&w=800&q=80",
//     rating: 4.9,
//     reviews: 1200,
//     bookings: "5k+ booked",
//     price: 80,
//     originalPrice: 100,
//     discount: 20,
//     duration: "9 Hours",
//     tags: ["Recommended"],
//   },

//   // 3. LOCAL
//   {
//     id: 301,
//     slug: "provincial-tour-korea",
//     category: "LOCAL",
//     location: "Outside Seoul",
//     title: "Provincial Tour : Discover Korea's Beauty",
//     description: "Seoraksan,Gyeongju,Busan,Jeju Island",
//     // 자연 풍경
//     image:
//       "https://images.unsplash.com/photo-1578469645742-46cae010e5d4?w=800&q=80",
//     rating: 4.8,
//     reviews: 600,
//     bookings: "1k+ booked",
//     price: 110,
//   },

//   // 4. DRAMA
//   {
//     id: 401,
//     slug: "drama-tour-korea",
//     category: "DRAMA",
//     location: "Various Locations",
//     title: "Drama Tour : K-Drama Filming Locations",
//     description: "Winter Sonata,BTS Spots,Parasite Locations",
//     // 촬영지 느낌의 감성 사진
//     image:
//       "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
//     rating: 4.9,
//     reviews: 2000,
//     bookings: "5k+ booked",
//     price: 70,
//     tags: ["K-Culture"],
//   },

//   // 5. SKI
//   {
//     id: 501,
//     slug: "ski-tour-korea",
//     category: "SKI",
//     location: "Ski Resorts",
//     title: "Ski Tour : Winter Ski & Snowboard",
//     description: "Jisan Resort,Elysian Gangchon,Lesson Included",
//     // 설원/스키
//     image:
//       "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80",
//     rating: 4.8,
//     reviews: 800,
//     bookings: "3k+ booked",
//     price: 90,
//     originalPrice: 120,
//     discount: 25,
//     tags: ["Winter Only"],
//   },

//   // 6. RELIGIOUS
//   {
//     id: 601,
//     slug: "muslim-tour-korea",
//     category: "RELIGIOUS",
//     location: "Seoul & Nami",
//     title: "Muslim Tour : Halal Friendly Travel",
//     description: "Halal Food, Prayer Room Arranged, Nami Island",
//     image:
//       "https://images.unsplash.com/photo-1519974719765-e6559eac2575?auto=format&fit=crop&w=800&q=80",
//     rating: 4.9,
//     reviews: 300,
//     bookings: "800+ booked",
//     price: 85,
//     tags: ["Halal Friendly"],
//   },
//   {
//     id: 602,
//     slug: "catholic-tour-korea",
//     category: "RELIGIOUS",
//     location: "Seoul",
//     title: "Catholic Tour : Pilgrimage in Korea",
//     description: "Holy Shrines, Pope Francis Route, Mass Available",
//     image:
//       "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80",
//     rating: 5.0,
//     reviews: 100,
//     bookings: "200+ booked",
//     price: 100,
//   },
//   {
//     id: 603,
//     slug: "buddhist-tour-korea",
//     category: "RELIGIOUS",
//     location: "Temples",
//     title: "Buddhist Tour : Temple Stay & Culture",
//     description: "Meditation, Tea Ceremony, Temple Stay",
//     image:
//       "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=800&q=80",
//     rating: 4.8,
//     reviews: 150,
//     bookings: "300+ booked",
//     price: 60,
//     tags: ["Wellness"],
//   },
// ];

// // ====================================================================
// // 🚀 Helper functions
// // ====================================================================

// // Slug로 상품 찾기 (상세페이지용)
// export function getPackageBySlug(slug: string): PackageTour | undefined {
//   const basic = basicPackages.find((tour) => tour.slug === slug);
//   const detail = tourDetails[slug];

//   if (!basic) return undefined;

//   return { ...basic, ...detail };
// }

// // ID로 상품 찾기
// export function getPackageById(id: number): PackageTour | undefined {
//   const basic = basicPackages.find((tour) => tour.id === id);
//   if (!basic) return undefined;
//   const detail = tourDetails[basic.slug];
//   return { ...basic, ...detail };
// }

// // 카테고리별 상품 목록 가져오기
// export function getPackagesByCategory(category: Category): PackageTourBasic[] {
//   if (category === "ALL") return basicPackages;
//   return basicPackages.filter((tour) => tour.category === category);
// }

// // 모든 Slug 목록 가져오기 (Static Paths 생성용)
// export function getAllSlugs(): string[] {
//   return basicPackages.map((tour) => tour.slug);
// }
