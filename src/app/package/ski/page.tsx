import { client } from "@/sanity/lib/client";
import { TOURS_BY_CATEGORY_QUERY } from "@/sanity/lib/queries";
import TourLayout from "@/components/TourLayout";

export const revalidate = 60;

export const metadata = {
  title: "Korea Ski Tours 2025 | Best Ski Resorts from Seoul",
  description:
    "Top ski & snowboard day trips from Seoul: Yongpyong, Alpensia, High1 Resort. Shuttle, lift pass included.",
  alternates: { canonical: "https://yourdomain.com/package/ski" },
};

export default async function SkiToursPage() {
  // 🚀 Sanity에서 "SKI" 카테고리만 가져오기
  const sanityTours = await client.fetch(TOURS_BY_CATEGORY_QUERY, {
    category: "SKI",
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
      currentCategory="SKI"
      heroTitle="Korea Ski & Snowboard Tours"
      heroSubtitle="Best winter ski resorts day trips from Seoul"
    />
  );
}
