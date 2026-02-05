import { client } from "@/sanity/lib/client";
import { ALL_TOURS_QUERY } from "@/sanity/lib/queries";
import TourLayout from "@/components/TourLayout";
import { mergeReviews } from "@/lib/review"; // ✅ 공통 리뷰 병합 함수 임포트

export const revalidate = 60;

export const metadata = {
  title: "Korea Package Tours 2026 | Seoul DMZ, Daily & Ski Tours",
  description:
    "Best Korea group tours: DMZ, Seoul Daily Tours, Nami Island, Ski & K-Drama. Muslim-friendly options. Book now!",
  alternates: { canonical: "https://myseosite.vercel.app/package" },
};

export default async function AllToursPage() {
  // 1. Sanity에서 전체 투어 데이터 가져오기
  const sanityTours = await client.fetch(ALL_TOURS_QUERY);

  // 2. 🚀 Supabase 리뷰 데이터를 가져와서 병합 (공통 로직 사용)
  // 이 함수가 내부적으로 Supabase 호출 및 averageRating, totalReviews 계산을 수행합니다.
  const mergedTours = await mergeReviews(sanityTours);

  // 3. 최종 데이터 매핑 (Sanity 기본 필드 처리)
  const tours = mergedTours.map((tour: any) => ({
    ...tour,
    id: tour._id, // Sanity의 _id를 id로 매핑
    image: tour.image || "", // 이미지는 Sanity 데이터를 그대로 사용
    price: tour.price || 0,
    tags: tour.tags || [],
  }));

  return (
    <TourLayout
      tours={tours}
      currentCategory="ALL"
      heroTitle="Korea Group Tours & Packages"
      heroSubtitle="Seoul DMZ Tours, Daily Tours, Ski & K-Drama Experiences"
    />
  );
}
