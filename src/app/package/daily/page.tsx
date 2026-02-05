import { client } from "@/sanity/lib/client";
import { TOURS_BY_CATEGORY_QUERY } from "@/sanity/lib/queries";
import TourLayout from "@/components/TourLayout";
import { mergeReviews } from "@/lib/review"; // 🚀 [추가] 이거 없으면 리뷰 0개 뜹니다!

export const revalidate = 60;

export const metadata = {
  title: "Seoul Daily City Tours | Palace, Nami Island & City Highlights",
  description:
    "Best daily walking and bus tours in Seoul. Gyeongbokgung Palace, Bukchon Hanok Village, N Seoul Tower, and more.",
  alternates: { canonical: "https://myseosite.vercel.app/package/daily" },
};

export default async function DailyToursPage() {
  const sanityTours = await client.fetch(TOURS_BY_CATEGORY_QUERY, {
    category: "DAILY",
  });

  // 🚀 [추가] 리뷰 데이터 병합 (이 한 줄이 핵심!)
  const mergedTours = await mergeReviews(sanityTours);

  // 데이터 매핑 (mergedTours 사용)
  const tours = mergedTours.map((tour: any) => ({
    ...tour,
    id: tour._id,
    image: tour.image || "",
    price: tour.price || 0,
    // ✅ 이제 Supabase에서 가져온 실제 평점이 들어갑니다
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
