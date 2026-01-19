import { client } from "@/sanity/lib/client";
import { TOURS_BY_CATEGORY_QUERY } from "@/sanity/lib/queries";
import TourLayout from "@/components/TourLayout";

// ✅ 60초마다 데이터 갱신 (ISR)
export const revalidate = 60;

export const metadata = {
  title: "DMZ Tours Korea 2025 | Best North Korea Observation from Seoul",
  description:
    "Top-rated DMZ tours: JSA, 3rd Tunnel, Dora Observatory. Instant confirmation & discounts.",
  alternates: { canonical: "https://yourdomain.com/package/dmz" },
};

export default async function DMZToursPage() {
  // 🚀 Sanity에서 "DMZ" 카테고리만 가져오기
  const sanityTours = await client.fetch(TOURS_BY_CATEGORY_QUERY, {
    category: "DMZ",
  });

  // 데이터 매핑
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
      currentCategory="DMZ"
      heroTitle="DMZ & North Korea Observation Tours"
      heroSubtitle="Experience the Korean Demilitarized Zone from Seoul"
    />
  );
}
