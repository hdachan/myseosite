// ✅ 수정됨: basicPackages를 가져와서 packageTours라는 이름으로 쓰겠다고 선언 (as 사용)
import { basicPackages as packageTours } from "./packageData";
import TourLayout from "@/components/TourLayout";

export const metadata = {
  title: "Korea Package Tours 2025 | Seoul DMZ, Daily & Ski Tours",
  description:
    "Best Korea group tours: DMZ, Seoul Daily Tours, Nami Island, Ski & K-Drama. Muslim-friendly options. Book now!",
  alternates: { canonical: "https://yourdomain.com/en/package" },
};

export default function AllToursPage() {
  return (
    <TourLayout
      tours={packageTours}
      currentCategory="ALL"
      heroTitle="Korea Group Tours & Packages"
      heroSubtitle="Seoul DMZ Tours, Daily Tours, Ski & K-Drama Experiences"
    />
  );
}
