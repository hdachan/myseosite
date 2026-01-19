import { groq } from "next-sanity";

// ==========================================================
// 📝 1. 블로그 관련 쿼리 (기존 유지)
// ==========================================================
export const blogListQuery = groq`
  *[_type == "post"] | order(date desc){
    _id,
    title,
    "slug": slug.current,
    description,
    category,
    readTime,
    "publishedAt": date,
    featured,
    image{ asset->{ _id, url } },
    author
  }
`;

export const blogDetailQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    description,
    content,
    category,
    tags,
    readTime,
    "publishedAt": date,
    featured,
    image{ asset->{ _id, url } },
    author
  }
`;

// ==========================================================
// 🚐 2. 투어 관련 쿼리 (전체/카테고리별/상세)
// ==========================================================

// ✅ [1] 전체 투어 리스트 (ALL_TOURS_QUERY) - 여기가 빠져서 에러난 것!
export const ALL_TOURS_QUERY = groq`
  *[_type == "tour"] {
    _id,
    title,
    "slug": slug.current,
    "image": mainImage.asset->url,
    category,
    price,
    originalPrice,
    discount,
    location,
    rating,
    reviews,
    bookings,
    tags,
    description
  }
`;

// ✅ [2] 카테고리별 투어 리스트 (TOURS_BY_CATEGORY_QUERY)
export const TOURS_BY_CATEGORY_QUERY = groq`
  *[_type == "tour" && category == $category] {
    _id,
    title,
    "slug": slug.current,
    "image": mainImage.asset->url,
    category,
    price,
    originalPrice,
    discount,
    location,
    rating,
    reviews,
    bookings,
    tags,
    description
  }
`;

// src/sanity/lib/queries.ts (TOUR_DETAIL_QUERY 부분만 교체)

// ✅ [투어 상세 페이지용 쿼리] - 최종본
export const TOUR_DETAIL_QUERY = groq`
  *[_type == "tour" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "image": mainImage.asset->url,
    "images": gallery[].asset->url,
    category,
    bookings,
    tags,
    rating,
    reviews,
    description,        
    fullDescription,    
    meetingPoint,
    includes,
    
    // 🔥 옵션 데이터 가져오기 (가장 중요!)
    packageOptions[] {
      "id": _key,
      name,
      price,
      badge,
      excluded,
      details, // 간단 리스트
      
      // 🚀 일정표 데이터 (이미지 URL 변환 필수)
      itinerary[] {
        time,
        title,
        description,
        iconType,
        "image": image.asset->url 
      }
    }
  }
`;

// ✅ [4] 정적 페이지 생성용 (Slug만 가져오기)
export const TOUR_SLUGS_QUERY = groq`
  *[_type == "tour"] { "slug": slug.current }
`;
