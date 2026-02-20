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
    tags,
    description,
    "minPax": coalesce(minPax, 1)
  }
`;

// ✅ [3] 투어 상세 페이지용 쿼리
export const TOUR_DETAIL_QUERY = groq`
  *[_type == "tour" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "image": mainImage.asset->url,
    "images": gallery[].asset->url,
    category,
    tags,
    description,        
    fullDescription,    

    // 최소 인원
    "minPax": coalesce(minPax, 1),
    
    // 메인 옵션 (라디오 - 하나만 선택)
    packageOptions[] {
      "id": _key,
      name,
      price,
      childPrice,
      originalPrice, 
      badge,
      details, 
      note,
      meetingPoints[] {
        name,
        description,
        "images": images[].asset->url
      },
      itinerary[] {
        time,
        title,
        description,
        iconType,
        "images": images[].asset->url 
      }
    },

    // ✅ 추가 옵션 (체크박스 - 여러 개 선택 가능)
    addOnOptions[] {
      "id": _key,
      name,
      price,
      childPrice,
      description,
      badge
    }
  }
`;

// ✅ [4] 정적 페이지 생성용
export const TOUR_SLUGS_QUERY = groq`
  *[_type == "tour"] { "slug": slug.current }
`;
