import { getPackagesByCategory } from "../packageData";
import TourLayout from "@/components/TourLayout";

const tours = getPackagesByCategory("DMZ");

export const metadata = {
  title: "DMZ Tours Korea 2025 | Best North Korea Observation from Seoul",
  description:
    "Top-rated DMZ tours: JSA, 3rd Tunnel, Dora Observatory. Instant confirmation & discounts.",
  alternates: { canonical: "https://yourdomain.com/package/dmz" },
};

export default function DMZToursPage() {
  return (
    <TourLayout
      tours={tours}
      currentCategory="DMZ"
      heroTitle="DMZ & North Korea Observation Tours"
      heroSubtitle="Experience the Korean Demilitarized Zone from Seoul"
    />
  );
}
