import { getPackagesByCategory } from "../packageData";
import TourLayout from "@/components/TourLayout";

const tours = getPackagesByCategory("DRAMA");

export const metadata = {
  title: "K-Drama Filming Location Tours Korea 2025 | Best Drama Sites",
  description:
    "Visit famous K-Drama filming spots: Goblin, Crash Landing on You, Itaewon Class locations from Seoul.",
  alternates: { canonical: "https://yourdomain.com/en/package/drama" },
};

export default function DramaToursPage() {
  return (
    <TourLayout
      tours={tours}
      currentCategory="DRAMA"
      heroTitle="K-Drama Filming Location Tours"
      heroSubtitle="Step into your favorite Korean drama scenes"
    />
  );
}
