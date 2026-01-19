import { client } from "@/sanity/lib/client"; // ✅ Sanity Client 추가
import { ALL_TOURS_QUERY } from "@/sanity/lib/queries"; // ✅ 쿼리 추가
import TourLayout from "@/components/TourLayout";

// ✅ ISR 설정: 60초마다 Sanity 데이터 확인 (새 상품 올리면 자동 반영)
export const revalidate = 60;

export const metadata = {
  title: "Korea Package Tours 2025 | Seoul DMZ, Daily & Ski Tours",
  description:
    "Best Korea group tours: DMZ, Seoul Daily Tours, Nami Island, Ski & K-Drama. Muslim-friendly options. Book now!",
  alternates: { canonical: "https://yourdomain.co/package" },
};

export default async function AllToursPage() {
  // 1. Sanity에서 전체 투어 데이터 가져오기
  const sanityTours = await client.fetch(ALL_TOURS_QUERY);

  // 2. 데이터 매핑 (Sanity 데이터 -> TourLayout이 좋아하는 모양으로 변환)
  // (Sanity의 _id는 문자열입니다. 만약 TourLayout이 숫자 id만 받는다면 에러가 날 수 있으니 확인 필요)
  const tours = sanityTours.map((tour: any) => ({
    ...tour,
    id: tour._id, // Sanity의 고유 ID (_id)를 id로 사용
    // 이미지가 없으면 빈 문자열 (에러 방지)
    image: tour.image || "",
    // 필수 필드 안전 처리
    price: tour.price || 0,
    rating: tour.rating || 5.0,
    reviews: tour.reviews || 0,
    bookings: tour.bookings || "0+ booked",
    tags: tour.tags || [],
  }));

  return (
    <TourLayout
      tours={tours} // ✅ 이제 Sanity 데이터를 넘겨줍니다!
      currentCategory="ALL"
      heroTitle="Korea Group Tours & Packages"
      heroSubtitle="Seoul DMZ Tours, Daily Tours, Ski & K-Drama Experiences"
    />
  );
}
