import { client } from "@/sanity/lib/client";
import { TOURS_BY_CATEGORY_QUERY } from "@/sanity/lib/queries";
import TourLayout from "@/components/TourLayout";
import { mergeReviews } from "@/lib/review"; // 🚀 [추가]

export const revalidate = 60;

export const metadata = {
  title: "K-Drama Filming Location Tours Korea 2026 | Best Drama Sites",
  description:
    "Visit famous K-Drama filming spots: Goblin, Crash Landing on You, Itaewon Class locations from Seoul.",
  alternates: { canonical: "https://www.seoulcitytour.co.kr/package/drama" },
};

export default async function DramaToursPage() {
  const sanityTours = await client.fetch(TOURS_BY_CATEGORY_QUERY, {
    category: "DRAMA",
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
      currentCategory="DRAMA"
      heroTitle="K-Drama Filming Location Tours"
      heroSubtitle="Step into your favorite Korean drama scenes"
    />
  );
}
