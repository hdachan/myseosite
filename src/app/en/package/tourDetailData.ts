// D:\myseosite\src\app\en\package\tourDetailData.ts

// ✅ 옵션 타입 정의 (독립적으로 사용)
export interface PackageOption {
  id: string;
  name: string;
  badge?: string;
  price: number;
  details: string[];
  excluded?: string[];
}

// ✅ 상세 정보 타입 정의
export interface TourDetail {
  fullDescription: string;
  includes: string[];
  excludes?: string[];
  meetingPoint?: string;
  cancellation?: string;
  packageOptions?: PackageOption[];
  images?: string[]; // ✅ [NEW] 상세 갤러리 이미지 필드 추가됨
}

// Key는 packageData.ts의 slug와 정확히 일치해야 합니다.
export const tourDetails: Record<string, TourDetail> = {
  // ==========================
  // 1. DMZ & JSA
  // ==========================
  "dmz-tour-combined": {
    fullDescription: `
      The DMZ (Demilitarized Zone) is the most historic border in the world. 
      This tour offers various ways to experience the division of Korea.
      
      **Tour Highlights:**
      - **3rd Infiltration Tunnel:** Discover the tunnel dug by North Korea for a surprise attack.
      - **Dora Observatory:** Look across the border into North Korea.
      - **Dorasan Station:** The last station in the South, waiting for the day to connect to the North.
      
      Choose the option that suits you best, from the classic tunnel tour to a special meeting with a North Korean defector.
    `,
    includes: [
      "Round-trip Transportation (Bus/Van)",
      "English Speaking Guide",
      "DMZ Entrance Fees",
      "Hotel Pickup Service (Seoul Area)",
    ],
    excludes: ["Lunch", "Personal Expenses"],
    meetingPoint: "Hotel Pickup or President Hotel (City Hall)",
    cancellation: "Free cancellation up to 24 hours before tour starts",
    // ✅ DMZ 갤러리 이미지 예시
    images: [
      "https://images.unsplash.com/photo-1596420803522-824f9c656513?w=800&q=80",
      "https://images.unsplash.com/photo-1588665725227-2856247c413b?w=800&q=80",
      "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&q=80",
    ],
    packageOptions: [
      {
        id: "dmz-1",
        name: "DMZ TOUR 1 : 3rd Tunnel Tour",
        price: 55,
        details: [
          "Imjingak Park",
          "3rd Infiltration Tunnel",
          "Dora Observatory",
          "Dorasan Station",
        ],
      },
      {
        id: "dmz-2",
        name: "DMZ TOUR 2 : Tour with Defector",
        price: 85,
        badge: "Unique",
        details: [
          "All DMZ Tour 1 courses",
          "Meet North Korean Defector",
          "Q&A Session",
        ],
      },
      {
        id: "dmz-3",
        name: "DMZ TOUR 3 : Starbucks DMZ View",
        price: 65,
        badge: "Trendy",
        details: [
          "Aegibong Peace Ecopark",
          "Starbucks with North Korea View",
          "Jo-gang Observatory",
        ],
      },
      {
        id: "dmz-4",
        name: "DMZ TOUR 4 : Private Tour",
        price: 250,
        badge: "VIP",
        details: ["Private Vehicle", "Flexible Schedule", "Dedicated Guide"],
      },
    ],
  },

  "jsa-tour-suspended": {
    fullDescription: `
      ⛔ **IMPORTANT NOTICE: JSA Tour Suspended**
      
      Currently, the JSA (Joint Security Area / Panmunjom) tour is **indefinitely suspended** due to UN Command and government regulations. 
      
      We apologize for the inconvenience. Please note that the regular **DMZ Tour (3rd Tunnel)** is operating normally and is a great alternative to understand the Korean War history.
    `,
    includes: [],
    excludes: [],
    meetingPoint: "N/A",
    cancellation: "N/A",
    packageOptions: [], // 예약 불가
  },

  // ==========================
  // 2. DAILY TOURS
  // ==========================
  "morning-tour-seoul": {
    fullDescription: `
      Start your day exploring the heart of Seoul!
      We offer 4 curated morning itineraries. All tours finish around lunch time (13:00), dropping you off at Itaewon or City Hall area.
    `,
    includes: [
      "English Speaking Guide",
      "Transportation (Bus)",
      "Entrance Fees",
      "Hotel Pickup",
    ],
    excludes: ["Lunch", "Hotel Drop-off"],
    meetingPoint: "Hotel Pickup (Seoul City Center)",
    cancellation: "Free cancellation up to 24 hours before",
    // ✅ Morning Tour 갤러리 이미지 예시
    images: [
      "https://images.unsplash.com/photo-1548115184-bc6544d06a58?w=800&q=80", // 경복궁
      "https://images.unsplash.com/photo-1627447833139-445853a47926?w=800&q=80", // 북촌
      "https://images.unsplash.com/photo-1596896236979-4d8b9d3c5096?w=800&q=80", // 남산타워
    ],
    packageOptions: [
      {
        id: "morning-1",
        name: "Morning TOUR 1 : Palace Morning Tour",
        price: 45,
        details: [
          "Gyeongbokgung Palace",
          "Blue House (Pass by)",
          "Jogyesa Temple",
          "Ginseng Center",
        ],
      },
      {
        id: "morning-2",
        name: "Morning TOUR 2 : National Museum Tour",
        price: 40,
        details: ["National Museum of Korea", "Cheonggyecheon Stream"],
      },
      {
        id: "morning-3",
        name: "Morning TOUR 3 : Seoul Tower Tour",
        price: 50,
        details: [
          "Namsangol Hanok Village",
          "N Seoul Tower (Observatory included)",
        ],
      },
      {
        id: "morning-4",
        name: "Morning TOUR 4 : World Cultural Heritage",
        price: 55,
        badge: "UNESCO",
        details: [
          "Changdeokgung Palace",
          "Huwon (Secret Garden)",
          "Insadong Arts & Crafts Market",
        ],
      },
    ],
  },

  "afternoon-tour-seoul": {
    fullDescription: `
      Enjoy a relaxed afternoon in Seoul. 
      Perfect for those who prefer a later start. Tours begin around 13:00 and finish by 17:30.
    `,
    includes: [
      "English Speaking Guide",
      "Transportation",
      "Entrance Fees",
      "Hotel Pickup",
    ],
    excludes: ["Dinner", "Hotel Drop-off"],
    meetingPoint: "Hotel Pickup",
    cancellation: "Free cancellation up to 24 hours before",
    packageOptions: [
      {
        id: "afternoon-1",
        name: "Afternoon TOUR 1 : Palace Tour",
        price: 45,
        details: ["Changdeokgung Palace", "Insadong", "Amethyst Factory"],
      },
      {
        id: "afternoon-2",
        name: "Afternoon TOUR 2 : Korean Folk Village",
        price: 65,
        details: [
          "Korean Folk Village (Yongin)",
          "Traditional Performance",
          "Return to Seoul",
        ],
      },
      {
        id: "afternoon-3",
        name: "Afternoon TOUR 3 : Seoul Tower Tour",
        price: 50,
        details: ["N Seoul Tower", "Namsan Park", "Duty Free Shop"],
      },
      {
        id: "afternoon-4",
        name: "Afternoon TOUR 4 : Aquarium & Cruise",
        price: 70,
        badge: "Kids",
        details: ["Bongeunsa Temple", "Coex Aquarium", "Han River Cruise"],
      },
    ],
  },

  "full-day-tour-seoul": {
    fullDescription: `
      Experience everything Seoul has to offer in one day!
      From historical palaces to modern shopping districts, choose the itinerary that fits your interest.
      We have the widest variety of full-day tours available.
    `,
    includes: [
      "English Speaking Guide",
      "Transportation",
      "Entrance Fees",
      "Lunch (Menu varies by tour)",
      "Hotel Pickup",
    ],
    excludes: ["Personal Expenses", "Dinner", "Hotel Drop-off"],
    meetingPoint: "Hotel Pickup",
    cancellation: "Free cancellation up to 24 hours before",
    packageOptions: [
      {
        id: "full-1",
        name: "Full Day TOUR 1 : Popular City Tour",
        price: 90,
        badge: "Best Seller",
        details: [
          "Gyeongbokgung",
          "Blue House",
          "Insadong",
          "Lunch",
          "N Seoul Tower",
          "Namdaemun Market",
        ],
      },
      {
        id: "full-2",
        name: "Full Day TOUR 2 : Palace & Suburb",
        price: 100,
        details: ["Gyeongbokgung Palace", "Lunch", "Korean Folk Village"],
      },
      {
        id: "full-3",
        name: "Full Day TOUR 3 : Shopping Tour",
        price: 80,
        details: ["Itaewon", "Lunch", "Namdaemun Market", "Dongdaemun Market"],
      },
      {
        id: "full-4",
        name: "Full Day TOUR 4 : Special City Tour",
        price: 95,
        details: [
          "Changdeokgung",
          "Secret Garden",
          "Lunch",
          "N Seoul Tower",
          "Namdaemun Market",
        ],
      },
      {
        id: "full-5",
        name: "Full Day TOUR 5 : Museum & Cruise",
        price: 90,
        details: [
          "National Museum",
          "Lunch",
          "Han River Cruise",
          "Bongeunsa Temple",
        ],
      },
      {
        id: "full-6",
        name: "Full Day TOUR 6 : Palace & Sauna",
        price: 110,
        details: [
          "Gyeongbokgung",
          "Insadong",
          "Lunch",
          "Traditional Sauna Experience",
        ],
      },
      {
        id: "full-7",
        name: "Full Day TOUR 7 : World Heritage",
        price: 100,
        details: [
          "Changdeokgung",
          "Jongmyo Shrine",
          "Lunch",
          "Royal Tombs (Seonjeongneung)",
        ],
      },
      {
        id: "full-8",
        name: "Full Day TOUR 8 : Ganghwa Island",
        price: 120,
        details: [
          "Ganghwa Peace Observatory",
          "Jeondeungsa Temple",
          "Lunch",
          "Ginseng Center",
        ],
      },
      {
        id: "full-9",
        name: "Full Day TOUR 9 : Icheon Pottery",
        price: 110,
        details: [
          "Icheon Ceramics Village",
          "Pottery Making",
          "Lunch",
          "Korean Folk Village",
        ],
      },
      {
        id: "full-10",
        name: "Full Day TOUR 10 : Suwon Hwaseong",
        price: 115,
        details: [
          "Suwon Hwaseong Fortress",
          "Lunch",
          "Korean Folk Village (Yongin)",
        ],
      },
      {
        id: "full-11",
        name: "Full Day TOUR 11 : Tea & Kimchi",
        price: 100,
        details: [
          "Tea Ceremony",
          "Kimchi Making",
          "Hanbok Wearing",
          "Lunch",
          "Bukchon Hanok Village",
        ],
      },
      {
        id: "full-12",
        name: "Full Day TOUR 12 : Theme Park",
        price: 130,
        details: [
          "Transfer to Everland OR Lotte World",
          "Full Day Pass Ticket",
          "Return Transfer",
        ],
      },
      {
        id: "full-13",
        name: "Full Day TOUR 13 : Hiking & Sauna",
        price: 105,
        details: [
          "Bukhansan or Gwanaksan Hiking",
          "Lunch",
          "Korean Sauna (Jjimjilbang)",
        ],
      },
      {
        id: "full-14",
        name: "Full Day TOUR 14 : Palace + Private",
        price: 150,
        badge: "Hybrid",
        details: [
          "Morning Group Tour (Palace)",
          "Lunch",
          "Afternoon Private Van Tour",
        ],
      },
      {
        id: "full-15",
        name: "Full Day TOUR 15 : Fortress Wall",
        price: 95,
        details: [
          "Seoul Fortress Wall Hiking",
          "Lunch",
          "Traditional Market Tour",
        ],
      },
      {
        id: "full-16",
        name: "Full Day TOUR 16 : Bukchon Hanok",
        price: 90,
        details: ["Bukchon Hanok Village", "Samcheong-dong", "Gyeongbokgung"],
      },
      {
        id: "full-17",
        name: "Full Day TOUR 17 : Top Attractions",
        price: 95,
        details: [
          "Gyeongbokgung",
          "N Seoul Tower",
          "Han River Park",
          "Myeongdong Shopping",
        ],
      },
    ],
  },

  // ==========================
  // 3. LOCAL TOURS
  // ==========================
  "provincial-tour-korea": {
    fullDescription: `
      Discover the beauty of Korea outside of Seoul.
      From the majestic Seoraksan Mountain to the cultural capital Gyeongju and the volcanic island of Jeju.
    `,
    includes: [
      "Round-trip Transportation",
      "Guide",
      "Entrance Fees",
      "Lunch (varies)",
    ],
    excludes: ["Dinner", "Personal Expenses"],
    meetingPoint: "Designated Pickup Points",
    cancellation: "Free cancellation up to 48 hours before",
    packageOptions: [
      {
        id: "prov-1",
        name: "Provincial TOUR 1 : Mt. Seorak Tour",
        price: 110,
        details: [
          "Mt. Seoraksan National Park",
          "Cable Car",
          "Sinheungsa Temple",
        ],
      },
      {
        id: "prov-2",
        name: "Provincial TOUR 2 : Gyeongju & Busan",
        price: 250,
        details: [
          "Bulguksa Temple",
          "Seokguram Grotto",
          "Haeundae Beach",
          "Jagalchi Market",
        ],
      },
      {
        id: "prov-3",
        name: "Provincial TOUR 3 : Jeju Island Tour",
        price: 150,
        details: [
          "Seongsan Ilchulbong",
          "Manjanggul Cave",
          "Jeju Folk Village",
        ],
      },
      {
        id: "prov-4",
        name: "Provincial TOUR 4 : Gongju & Buyeo",
        price: 130,
        details: [
          "Baekje Cultural Land",
          "Gongsanseong Fortress",
          "Busosannseong",
        ],
      },
      {
        id: "prov-5",
        name: "Provincial TOUR 5 : Andong Hahoe",
        price: 140,
        details: ["Andong Hahoe Village", "Mask Museum", "Buyongdae Cliff"],
      },
    ],
  },

  // ==========================
  // 4. DRAMA TOURS
  // ==========================
  "drama-tour-korea": {
    fullDescription: `
      Relive your favorite K-Drama moments!
      Visit the actual filming locations of world-famous Korean dramas and movies like Winter Sonata, Parasite, and more.
    `,
    includes: ["Transportation", "Guide", "Entrance Fees", "Lunch"],
    packageOptions: [
      {
        id: "drama-1",
        name: "Drama Tour 1 : Winter Sonata (Nami)",
        price: 80,
        badge: "No.1",
        details: ["Nami Island", "Petite France", "Garden of Morning Calm"],
      },
      {
        id: "drama-2",
        name: "Drama Tour 2 : Parasite Tour",
        price: 70,
        details: ["Woori Supermarket", "Stairs Scene", "Pizza Shop"],
      },
      {
        id: "drama-3",
        name: "Drama Tour 3 : Yongin MBC Dramia",
        price: 90,
        details: ["MBC Dramia Set", "Historical Drama Costumes"],
      },
      {
        id: "drama-4",
        name: "Drama Tour 4 : That Winter, the Wind Blows",
        price: 85,
        details: ["Jade Garden", "Coffee Shop Filming Site"],
      },
      {
        id: "drama-5",
        name: "Drama Tour 5 : My Love From The Star",
        price: 75,
        details: ["Petite France", "N Seoul Tower", "Incheon University"],
      },
    ],
  },

  // ==========================
  // 5. SKI TOURS
  // ==========================
  "ski-tour-korea": {
    fullDescription: `
      Enjoy winter in Korea at top-rated ski resorts!
      Whether you are a beginner or a pro, we have the perfect package for you.
      Includes gear rental and basic lessons for beginners.
    `,
    includes: [
      "Round-trip Transportation",
      "Ski Gear Rental (Skis, Boots, Poles)",
      "Basic Group Lesson (30min)",
    ],
    excludes: ["Lift Ticket (Optional)", "Ski Clothes", "Gloves/Goggles"],
    meetingPoint: "Hongik Univ. / Myeongdong / Dongdaemun",
    cancellation: "Free cancellation 48h before",
    packageOptions: [
      {
        id: "ski-1",
        name: "Ski Tour 1 : Jisan/Elysian (07:00 AM)",
        price: 90,
        details: [
          "Early Morning Departure",
          "Ski Gear Rental",
          "Basic Lesson",
          "Free Time",
        ],
      },
      {
        id: "ski-2",
        name: "Ski Tour 2 : Jisan/Elysian (10:00 AM)",
        price: 90,
        details: [
          "Late Morning Departure",
          "Ski Gear Rental",
          "Basic Lesson",
          "Free Time",
        ],
      },
      {
        id: "ski-3",
        name: "Ski Tour 3 : Nami Island + Ski",
        price: 120,
        badge: "Combo",
        details: ["Nami Island Tour", "Ski Experience at Elysian Gangchon"],
      },
      {
        id: "ski-4",
        name: "Ski Tour 4 : Jisan Resort Full Day",
        price: 95,
        details: ["Jisan Forest Resort", "Full Day Skiing"],
      },
      {
        id: "ski-5",
        name: "Ski Tour 5 : Yongpyong / Phoenix",
        price: 130,
        badge: "Premium",
        details: ["Pyeongchang Olympic Venues", "Premium Ski Resort"],
      },
    ],
  },

  // ==========================
  // 6. RELIGIOUS TOURS
  // ==========================
  "muslim-tour-korea": {
    fullDescription: `
      Worry-free travel for Muslim visitors.
      All meals are Halal certified or Muslim-friendly (pork-free). 
      Prayer times and facilities are taken into consideration during the tour.
    `,
    includes: ["Transportation", "Muslim-friendly Guide", "Halal Meals"],
    packageOptions: [
      {
        id: "muslim-a",
        name: "Muslim Tour A : Nami Island",
        price: 90,
        details: ["Nami Island", "Petite France", "Halal Dakgalbi Lunch"],
      },
      {
        id: "muslim-b",
        name: "Muslim Tour B : Seoul City",
        price: 85,
        details: [
          "Seoul Central Mosque",
          "Gyeongbokgung",
          "Itaewon",
          "Halal Lunch",
        ],
      },
      {
        id: "muslim-c",
        name: "Muslim Tour C : Shopping",
        price: 80,
        details: [
          "Namdaemun Market",
          "Myeongdong",
          "Dongdaemun",
          "Halal Snack",
        ],
      },
    ],
  },

  "catholic-tour-korea": {
    fullDescription: `
      A spiritual journey following the history of Catholicism in Korea.
      Visit the holy sites visited by Pope Francis and learn about the Korean martyrs.
    `,
    includes: ["Transportation", "Guide", "Entrance Fees", "Lunch"],
    packageOptions: [
      {
        id: "catholic-a",
        name: "Catholic Tour A : Pope Francis Route",
        price: 130,
        details: ["Solmoe Shrine", "Haemi Martyrdom Holy Ground"],
      },
      {
        id: "catholic-b",
        name: "Catholic Tour B : Seoul Pilgrimage",
        price: 100,
        details: [
          "Myeongdong Cathedral",
          "Jeoldusan Martyrs' Shrine",
          "Seosomun Shrine",
        ],
      },
    ],
  },

  "buddhist-tour-korea": {
    fullDescription: `
      Find inner peace and experience the Zen culture of Korea.
      Visit beautiful temples in the city or mountains and experience a Templestay program.
    `,
    includes: ["Transportation", "Guide", "Temple Fees", "Vegetarian Meal"],
    packageOptions: [
      {
        id: "buddhist-a",
        name: "Buddhist Tour A : City Temples",
        price: 60,
        details: ["Jogyesa Temple", "Bongeunsa Temple", "Buddhist Museum"],
      },
      {
        id: "buddhist-b",
        name: "Buddhist Tour B : Templestay",
        price: 70,
        details: [
          "Myogaksa Temple",
          "Meditation",
          "Tea Ceremony",
          "Lantern Making",
        ],
      },
    ],
  },
};
