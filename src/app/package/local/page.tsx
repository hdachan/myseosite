import { client } from "@/sanity/lib/client";
import { TOURS_BY_CATEGORY_QUERY } from "@/sanity/lib/queries";
import TourLayout from "@/components/TourLayout";

export const revalidate = 60;

export const metadata = {
  title: "Local Tours in Korea 2025 | Hidden Gems & Regional Experiences",
  description:
    "Explore authentic local Korea: hidden towns, traditional villages, cultural experiences off the beaten path.",
  alternates: { canonical: "https://yourdomain.com/package/local" },
};

export default async function LocalToursPage() {
  // 🚀 Sanity에서 "LOCAL" 카테고리만 가져오기
  const sanityTours = await client.fetch(TOURS_BY_CATEGORY_QUERY, {
    category: "LOCAL",
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
      currentCategory="LOCAL"
      heroTitle="Korea Local & Regional Tours"
      heroSubtitle="Discover hidden gems and authentic local experiences"
    />
  );
}
