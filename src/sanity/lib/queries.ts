import { groq } from "next-sanity";

// ==========================================================
// 📝 1. 블로그 관련 쿼리 (SEO 강화: alt 필드 추가)
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
    // ✅ [수정됨] 이미지 URL과 함께 Alt Text도 가져옴
    image {
      asset->{ _id, url },
      alt
    },
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
    // ✅ [수정됨] 상세 페이지에서도 Alt Text 필수
    image {
      asset->{ _id, url },
      alt
    },
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
    tags,
    description,
    "minPax": coalesce(minPax, 1)
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
    // ❌ rating, reviews 제거됨
    tags,
    description,
    "minPax": coalesce(minPax, 1)
  }
`;

// ✅ [3] 투어 상세 페이지용 쿼리 (구조 변경 반영)
export const TOUR_DETAIL_QUERY = groq`
  *[_type == "tour" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "image": mainImage.asset->url,
    "images": gallery[].asset->url,
    category,
    tags,
    // ❌ rating, reviews 제거됨
    description,        
    fullDescription,    
    meetingPoint {
      description,
      "images": images[].asset->url
    },

    includes,

    // 최소 인원
    "minPax": coalesce(minPax, 1),
    
    // 옵션 데이터
    packageOptions[] {
      "id": _key,
      name,
      price,
      badge,
      details, 
      
      itinerary[] {
        time,
        title,
        description,
        iconType,
        "images": images[].asset->url // image -> images 로 변경됨
      }
    }
  }
`;

// ✅ [4] 정적 페이지 생성용
export const TOUR_SLUGS_QUERY = groq`
  *[_type == "tour"] { "slug": slug.current }
`;
