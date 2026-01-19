import { client } from "@/sanity/lib/client";
import { TOURS_BY_CATEGORY_QUERY } from "@/sanity/lib/queries"; // ✅ 이제 에러 안 날 겁니다!
import TourLayout from "@/components/TourLayout";

// ✅ 60초마다 데이터 최신화 (ISR)
export const revalidate = 60;

export const metadata = {
  title: "Seoul Daily City Tours | Palace, Nami Island & City Highlights",
  description:
    "Best daily walking and bus tours in Seoul. Gyeongbokgung Palace, Bukchon Hanok Village, N Seoul Tower, and more.",
  alternates: { canonical: "https://yourdomain.com/package/daily" },
};

export default async function DailyToursPage() {
  // 🚀 Sanity에서 "DAILY" 카테고리만 가져오기
  const sanityTours = await client.fetch(TOURS_BY_CATEGORY_QUERY, {
    category: "DAILY",
  });

  // 데이터 매핑 (Sanity -> TourLayout용)
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
      currentCategory="DAILY"
      heroTitle="Seoul Daily City Tours"
      heroSubtitle="Discover the Best of Seoul: Palaces, Culture & Landmarks"
    />
  );
}
