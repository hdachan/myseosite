import { getPackagesByCategory } from "../packageData";
import TourLayout from "@/components/TourLayout";

// "RELIGIOUS" 카테고리 데이터만 가져오기
const tours = getPackagesByCategory("RELIGIOUS");

export const metadata = {
  // SEO: 무슬림, 할랄, 천주교, 불교 등 핵심 타겟 키워드 포함
  title: "Korea Religious & Muslim Friendly Tours | Halal & Pilgrimage",
  description:
    "Specialized tours for Muslim, Catholic, and Buddhist travelers. Halal Nami Island trips, Pope Francis pilgrimage routes, and Temple Stays.",
  alternates: { canonical: "https://yourdomain.com/package/religious" },
};

export default function ReligiousToursPage() {
  return (
    <TourLayout
      tours={tours}
      currentCategory="RELIGIOUS"
      heroTitle="Religious & Muslim Friendly Tours"
      heroSubtitle="Halal Travel, Catholic Pilgrimage & Temple Stays"
    />
  );
}
