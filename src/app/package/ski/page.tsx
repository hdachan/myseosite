import { client } from "@/sanity/lib/client";
import { TOURS_BY_CATEGORY_QUERY } from "@/sanity/lib/queries";
import TourLayout from "@/components/TourLayout";
import { mergeReviews } from "@/lib/review"; // 🚀 [추가]

export const revalidate = 60;

export const metadata = {
  title: "Korea Ski Tours 2026 | Best Ski Resorts from Seoul",
  description:
    "Top ski & snowboard day trips from Seoul: Yongpyong, Alpensia, High1 Resort. Shuttle, lift pass included.",
  alternates: { canonical: "https://www.seoulcitytour.co.kr/package/ski" },
};

export default async function SkiToursPage() {
  const sanityTours = await client.fetch(TOURS_BY_CATEGORY_QUERY, {
    category: "SKI",
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
      currentCategory="SKI"
      heroTitle="Korea Ski & Snowboard Tours"
      heroSubtitle="Best winter ski resorts day trips from Seoul"
    />
  );
}
