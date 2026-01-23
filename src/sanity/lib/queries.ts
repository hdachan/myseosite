import { groq } from "next-sanity";

// ==========================================================
// 📝 1. 블로그 관련 쿼리
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
// 🚐 2. 투어 관련 쿼리
// ==========================================================

// ✅ [1] 전체 투어 리스트
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
    tags,
    description,
    "minPax": coalesce(minPax, 1) // ✅ [추가됨] 리스트에도 정보 있으면 좋음
  }
`;

// ✅ [2] 카테고리별 투어 리스트
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
    tags,
    description,
    "minPax": coalesce(minPax, 1) // ✅ [추가됨]
  }
`;

// ✅ [3] 투어 상세 페이지용 쿼리 (가장 중요!)
export const TOUR_DETAIL_QUERY = groq`
  *[_type == "tour" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "image": mainImage.asset->url,
    "images": gallery[].asset->url,
    category,
    tags,
    rating,
    reviews,
    description,        
    fullDescription,    
    meetingPoint,
    includes,

    // 🔥🔥🔥 [핵심 추가] 최소 인원 가져오기 🔥🔥🔥
    // 값이 없으면 1로 설정 (coalesce 함수 사용)
    "minPax": coalesce(minPax, 1),
    
    // 옵션 데이터
    packageOptions[] {
      "id": _key,
      name,
      price,
      badge,
      excluded,
      details, 
      
      // 일정표 데이터
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

// ✅ [4] 정적 페이지 생성용
export const TOUR_SLUGS_QUERY = groq`
  *[_type == "tour"] { "slug": slug.current }
`;
