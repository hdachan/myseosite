import { client } from "@/sanity/lib/client";
import { TOURS_BY_CATEGORY_QUERY } from "@/sanity/lib/queries";
import TourLayout from "@/components/TourLayout";
import { mergeReviews } from "@/lib/review"; // 🚀 [추가]

export const revalidate = 60;

export const metadata = {
  title: "Local Tours in Korea 2026 | Hidden Gems & Regional Experiences",
  description:
    "Explore authentic local Korea: hidden towns, traditional villages, cultural experiences off the beaten path.",
  // ✅ [수정] 실제 도메인으로 변경
  alternates: { canonical: "https://www.seoulcitytour.co.kr/package/local" },
};

export default async function LocalToursPage() {
  const sanityTours = await client.fetch(TOURS_BY_CATEGORY_QUERY, {
    category: "LOCAL",
  });

  // 🚀 [추가] 리뷰 데이터 병합
  const mergedTours = await mergeReviews(sanityTours);

  const tours = mergedTours.map((tour: any) => ({
    ...tour,
    id: tour._id,
    image: tour.image || "",
    price: tour.price || 0,
    rating: tour.rating || 5.0,
    reviews: tour.reviews || 0,
    tags: tour.tags || [],
  }));

  return (
    <TourLayout
      tours={tours}
      currentCategory="LOCAL"
      heroTitle="Korea Local & Regional Tours"
      heroSubtitle="Discover hidden gems and authentic local experiences"
    />
  );
}
