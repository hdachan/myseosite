// D:\myseosite\src\app\en\package\packageData.ts

export type Category = "ALL" | "DMZ" | "DAILY" | "LOCAL" | "DRAMA" | "SKI";

export interface PackageOption {
  id: string;
  name: string;
  badge?: string;
  price: number;
  details: string[];
  excluded?: string[];
}

export interface PackageTour {
  id: number;
  slug: string;
  category: Category;
  location: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  bookings: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images?: string[];
  tags?: string[];
  duration?: string;
  minimumPax?: number;
  packageOptions?: PackageOption[];
  fullDescription?: string;
  includes?: string[];
  excludes?: string[];
  meetingPoint?: string;
  cancellation?: string;
  keywords?: string[];
}

export const packageTours: PackageTour[] = [
  {
    id: 1,
    slug: "muslim-friendly-seoul-nami-island-day-tour",
    category: "DAILY",
    location: "Tour · Seoul",
    title: "[Muslim Friendly] Special Seoul/Nami Island Day Tour",
    description: "Available from tomorrow · Limited seats",
    image:
      "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=600&h=400&fit=crop",
    rating: 5,
    reviews: 9,
    bookings: "100+ bookings",
    price: 112.79,
    originalPrice: 150.0,
    discount: 25,
    images: [
      "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583562835057-a62d1beffbf3?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1200&h=800&fit=crop",
    ],
    tags: ["Muslim Friendly", "Best Seller"],
    duration: "8 hours",
    minimumPax: 2,
    fullDescription:
      "Experience the beauty of Seoul and Nami Island with our Muslim-friendly tour package. Enjoy halal meals and prayer time accommodations throughout your journey.",
    includes: [
      "Professional English/Korean guide",
      "Round-trip transportation (Air-conditioned bus)",
      "All entrance fees",
      "Halal Korean lunch",
      "Prayer time accommodations",
    ],
    excludes: [
      "Personal expenses",
      "Travel insurance",
      "Additional drinks and snacks",
    ],
    meetingPoint: "Hotel pickup service available from major Seoul hotels",
    cancellation: "Free cancellation up to 24 hours before tour starts",
    keywords: [
      "Muslim friendly tour",
      "Nami Island",
      "Seoul day tour",
      "Halal food tour",
      "Korea Muslim travel",
    ],
    packageOptions: [
      {
        id: "standard",
        name: "Standard Package - Seoul & Nami Island",
        price: 112.79,
        details: [
          "Attractions: Nami Island, Petite France",
          "English guide",
          "Transportation",
          "Halal lunch",
        ],
      },
      {
        id: "premium",
        name: "Premium Package - Extended Tour",
        badge: "$10 OFF",
        price: 145.0,
        details: [
          "All Standard features",
          "Garden of Morning Calm",
          "Premium halal dinner",
          "Small group (max 10 people)",
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "dmz-north-korea-observation-tour",
    category: "DMZ",
    location: "Tour · DMZ",
    title: "DMZ & North Korea Observation Tour",
    description: "Joint Security Area · Dora Observatory",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/80/cf/ee/view-from-dora-observatory.jpg?w=600&h=400&fit=crop",
    rating: 4.9,
    reviews: 124,
    bookings: "300+ bookings",
    price: 79.0,
    images: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/80/cf/ee/view-from-dora-observatory.jpg?w=1200&h=800&fit=crop",
      "https://i.insider.com/64b8fe3fa46ce30019a25b94?width=1200&format=jpeg",
      "https://i.redd.it/itzy8bt66fqz.jpg?w=1200&h=800&fit=crop",
      "https://www.exploreshaw.com/wp-content/uploads/2019/03/DSC_0563.jpg?w=1200&h=800&fit=crop",
    ],
    tags: ["Best Seller", "Instant Confirmation"],
    duration: "7 hours",
    minimumPax: 1,
    fullDescription:
      "Experience Korea's divided history firsthand with this DMZ tour. Explore the 3rd Infiltration Tunnel and view North Korea from Dora Observatory.",
    includes: [
      "Professional English/Korean guide",
      "Round-trip transportation (Air-conditioned bus)",
      "All entrance fees",
      "Korean lunch",
    ],
    excludes: [
      "Personal expenses",
      "Travel insurance",
      "Additional drinks and snacks",
    ],
    meetingPoint: "Hotel pickup service available from major Seoul hotels",
    cancellation: "Free cancellation up to 24 hours before tour starts",
    keywords: [
      "DMZ tour",
      "North Korea",
      "3rd tunnel",
      "JSA tour",
      "Korean War history",
      "Dora Observatory",
    ],
    packageOptions: [
      {
        id: "standard-dmz",
        name: "Standard DMZ Tour",
        price: 79.0,
        details: [
          "3rd Infiltration Tunnel visit",
          "Dora Observatory",
          "Dorasan Station",
          "English guide",
          "Transportation",
          "Lunch included",
        ],
      },
      {
        id: "jsa-dmz",
        name: "JSA + DMZ Combined Tour",
        badge: "$15 OFF",
        price: 125.0,
        details: [
          "All Standard DMZ features",
          "Joint Security Area (JSA)",
          "Conference Room tour",
          "Advanced booking required",
        ],
        excluded: ["Travel insurance", "Personal expenses"],
      },
    ],
  },
  {
    id: 3,
    slug: "seoul-palace-full-day-tour",
    category: "DAILY",
    location: "Tour · Seoul",
    title: "Full Day Seoul Palace & City Highlights Tour",
    description: "Gyeongbok Palace · Changing of Guards · Insadong",
    image:
      "https://images.unsplash.com/photo-1548115184-bc6544d06a58?w=600&h=400&fit=crop",
    rating: 4.8,
    reviews: 215,
    bookings: "500+ bookings",
    price: 89.0,
    originalPrice: 110.0,
    discount: 19,
    images: [
      "https://images.unsplash.com/photo-1548115184-bc6544d06a58?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1602152481464-5d8bdb66b7b1?w=1200&h=800&fit=crop",
    ],
    tags: ["Best Seller", "Cultural"],
    duration: "8 hours",
    minimumPax: 1,
  },
  {
    id: 4,
    slug: "everland-theme-park-day-trip",
    category: "LOCAL",
    location: "Tour · Yongin",
    title: "Everland Theme Park Full Day Ticket & Transfer",
    description: "Korea’s Largest Theme Park · Roller Coasters · Safari",
    image:
      "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&h=400&fit=crop",
    rating: 4.7,
    reviews: 342,
    bookings: "400+ bookings",
    price: 65.0,
    images: [
      "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1608138400858-9ab8b7c1e0e0?w=1200&h=800&fit=crop",
    ],
    tags: ["Family Friendly", "Thrilling"],
    duration: "Full Day",
    minimumPax: 1,
  },

  {
    id: 5,
    slug: "everland-theme-park-day-trip",
    category: "LOCAL",
    location: "Tour · Yongin",
    title: "Everland Theme Park Full Day Ticket & Transfer",
    description: "Korea’s Largest Theme Park · Roller Coasters · Safari",
    image:
      "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&h=400&fit=crop",
    rating: 4.7,
    reviews: 342,
    bookings: "400+ bookings",
    price: 65.0,
    images: [
      "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1608138400858-9ab8b7c1e0e0?w=1200&h=800&fit=crop",
    ],
    tags: ["Family Friendly", "Thrilling"],
    duration: "Full Day",
    minimumPax: 1,
  },
];

// Helper functions
export function getPackageBySlug(slug: string): PackageTour | undefined {
  return packageTours.find((tour) => tour.slug === slug);
}

export function getPackageById(id: number): PackageTour | undefined {
  return packageTours.find((tour) => tour.id === id);
}

export function getPackagesByCategory(category: Category): PackageTour[] {
  if (category === "ALL") return packageTours;
  return packageTours.filter((tour) => tour.category === category);
}

export function getAllSlugs(): string[] {
  return packageTours.map((tour) => tour.slug);
}
