import { getPackagesByCategory } from "../packageData";
import TourLayout from "@/components/TourLayout";

const tours = getPackagesByCategory("LOCAL");

export const metadata = {
  title: "Local Tours in Korea 2025 | Hidden Gems & Regional Experiences",
  description:
    "Explore authentic local Korea: hidden towns, traditional villages, cultural experiences off the beaten path.",
  alternates: { canonical: "https://yourdomain.com/en/package/local" },
};

export default function LocalToursPage() {
  return (
    <TourLayout
      tours={tours}
      currentCategory="LOCAL"
      heroTitle="Korea Local & Regional Tours"
      heroSubtitle="Discover hidden gems and authentic local experiences"
    />
  );
}
