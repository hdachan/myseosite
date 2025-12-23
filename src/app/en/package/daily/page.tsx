import { getPackagesByCategory } from "../packageData";
import TourLayout from "@/components/TourLayout";

const tours = getPackagesByCategory("DAILY");

export const metadata = {
  title: "Seoul Daily Tours 2025 | Nami Island & City Day Trips",
  description:
    "Best Seoul day tours: Nami Island, Petite France, Muslim-friendly halal options.",
  alternates: { canonical: "https://yourdomain.com/en/package/daily" },
};

export default function DailyToursPage() {
  return (
    <TourLayout
      tours={tours}
      currentCategory="DAILY"
      heroTitle="Seoul Daily & Day Tours"
      heroSubtitle="Nami Island, City Highlights & Muslim-Friendly Tours"
    />
  );
}
