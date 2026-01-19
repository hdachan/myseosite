import { client } from "@/sanity/lib/client";
import { TOURS_BY_CATEGORY_QUERY } from "@/sanity/lib/queries";
import TourLayout from "@/components/TourLayout";

export const revalidate = 60;

export const metadata = {
  title: "K-Drama Filming Location Tours Korea 2025 | Best Drama Sites",
  description:
    "Visit famous K-Drama filming spots: Goblin, Crash Landing on You, Itaewon Class locations from Seoul.",
  alternates: { canonical: "https://yourdomain.com/package/drama" },
};

export default async function DramaToursPage() {
  // 🚀 Sanity에서 "DRAMA" 카테고리만 가져오기
  const sanityTours = await client.fetch(TOURS_BY_CATEGORY_QUERY, {
    category: "DRAMA",
  });

  const tours = sanityTours.map((tour: any) => ({
    ...tour,
    id: tour._id,
    image: tour.image || "",
    price: tour.price || 0,
    rating: tour.rating || 5.0,
    reviews: tour.reviews || 0,
    bookings: tour.bookings || "0+ booked",
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
