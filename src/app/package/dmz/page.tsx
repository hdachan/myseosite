import { client } from "@/sanity/lib/client";
import { TOURS_BY_CATEGORY_QUERY } from "@/sanity/lib/queries";
import TourLayout from "@/components/TourLayout";
import { mergeReviews } from "@/lib/review"; // 🚀 [추가]

export const revalidate = 60;

export const metadata = {
  title: "DMZ Tours Korea 2025 | Best North Korea Observation from Seoul",
  description:
    "Top-rated DMZ tours: JSA, 3rd Tunnel, Dora Observatory. Instant confirmation & discounts.",
  // ✅ [수정] 도메인 변경 필수
  alternates: { canonical: "https://myseosite.vercel.app/package/dmz" },
};

export default async function DMZToursPage() {
  const sanityTours = await client.fetch(TOURS_BY_CATEGORY_QUERY, {
    category: "DMZ",
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
      currentCategory="DMZ"
      heroTitle="DMZ & North Korea Observation Tours"
      heroSubtitle="Experience the Korean Demilitarized Zone from Seoul"
    />
  );
}
