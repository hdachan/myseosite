import { client } from "@/sanity/lib/client";
import { TOURS_BY_CATEGORY_QUERY } from "@/sanity/lib/queries";
import TourLayout from "@/components/TourLayout";
import { mergeReviews } from "@/lib/review"; // 🚀 [추가]

export const revalidate = 60;

export const metadata = {
  title: "Korea Religious & Muslim Friendly Tours | Halal & Pilgrimage",
  description:
    "Specialized tours for Muslim, Catholic, and Buddhist travelers. Halal Nami Island trips, Pope Francis pilgrimage routes, and Temple Stays.",
  alternates: {
    canonical: "https://www.seoulcitytour.co.kr/package/religious",
  },
};

export default async function ReligiousToursPage() {
  const sanityTours = await client.fetch(TOURS_BY_CATEGORY_QUERY, {
    category: "RELIGIOUS",
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
      currentCategory="RELIGIOUS"
      heroTitle="Religious & Muslim Friendly Tours"
      heroSubtitle="Halal Travel, Catholic Pilgrimage & Temple Stays"
    />
  );
}
