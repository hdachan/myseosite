import { client } from "@/sanity/lib/client";
import { TOURS_BY_CATEGORY_QUERY } from "@/sanity/lib/queries";
import TourLayout from "@/components/TourLayout";

export const revalidate = 60;

export const metadata = {
  title: "Korea Religious & Muslim Friendly Tours | Halal & Pilgrimage",
  description:
    "Specialized tours for Muslim, Catholic, and Buddhist travelers. Halal Nami Island trips, Pope Francis pilgrimage routes, and Temple Stays.",
  alternates: { canonical: "https://yourdomain.com/package/religious" },
};

export default async function ReligiousToursPage() {
  // 🚀 Sanity에서 "RELIGIOUS" 카테고리만 가져오기
  const sanityTours = await client.fetch(TOURS_BY_CATEGORY_QUERY, {
    category: "RELIGIOUS",
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
      currentCategory="RELIGIOUS"
      heroTitle="Religious & Muslim Friendly Tours"
      heroSubtitle="Halal Travel, Catholic Pilgrimage & Temple Stays"
    />
  );
}
