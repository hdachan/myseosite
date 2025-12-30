// export interface BlogPost {
//   slug: string;
//   title: string;
//   description: string;
//   category: string;
//   date: string;
//   readTime: string;
//   author: string;
//   image: string;
//   tags?: string[];
//   featured?: boolean;
//   content: string;
// }

// export const blogPosts: BlogPost[] = [
//   {
//     slug: "dmz-tour-why-it-matters",
//     title: "Why the DMZ Tour Is One of Korea's Most Meaningful Experiences",
//     description:
//       "More than a tourist attraction — discover why visiting the DMZ offers deep historical insight and a powerful emotional experience.",
//     category: "History & Culture",
//     date: "2024-12-18",
//     readTime: "9 min read",
//     author: "David Park",
//     image:
//       "https://images.unsplash.com/photo-1598935888730-8b1a5b6fcb98?w=1200&h=600&fit=crop",
//     tags: ["DMZ", "Korean History", "Cultural Experience"],
//     featured: true,
//     content: `
// <p>
// The DMZ (Demilitarized Zone) is often misunderstood as just another sightseeing spot.
// In reality, it is one of the most emotionally powerful places you can visit in Korea.
// </p>

// <!-- 강조 박스 -->
// <div class="bg-gray-100 border-l-4 border-black p-4 my-8">
//   <strong>Did you know?</strong><br/>
//   The DMZ is one of the most heavily guarded borders in the world, yet it has also
//   become an accidental wildlife sanctuary due to limited human access.
// </div>

// <h2>A Brief History of the DMZ</h2>

// <p>
// Established in 1953 after the Korean War armistice, the DMZ stretches approximately
// 250 kilometers across the Korean Peninsula.
// It symbolizes both division and the hope for peace.
// </p>

// <!-- 중간 이미지 -->
// <figure class="my-10">
//   <img
//     src="https://images.unsplash.com/photo-1602464877850-5c4c4a88d7c5?w=1200"
//     alt="View of the Korean DMZ"
//     class="rounded-xl shadow-md"
//   />
//   <figcaption class="text-sm text-gray-500 mt-2 text-center">
//     Observation point overlooking the DMZ
//   </figcaption>
// </figure>

// <h2>Why the DMZ Tour Feels Different</h2>

// <p>
// Unlike typical tours, a DMZ visit is quiet, reflective, and deeply human.
// Standing just meters away from North Korea forces visitors to confront the reality
// of a divided nation.
// </p>

// <!-- 인용문 -->
// <blockquote class="border-l-4 border-gray-400 pl-4 italic my-8 text-gray-700">
//   "You don't just learn history at the DMZ — you feel it."
// </blockquote>

// <h2>What You'll See on a DMZ Tour</h2>

// <ul>
//   <li>The Third Infiltration Tunnel</li>
//   <li>Dora Observatory</li>
//   <li>Unification Bridge</li>
//   <li>DMZ Exhibition Hall</li>
// </ul>

// <p>
// Each site adds another layer of understanding, combining military tension with
// personal stories of separation and hope.
// </p>

// <h2>Is the DMZ Tour Worth It?</h2>

// <p>
// Absolutely. Whether you're interested in history, geopolitics, or human stories,
// the DMZ offers a rare perspective you simply cannot get elsewhere.
// </p>
// `,
//   },

//   {
//     slug: "first-time-korea-essential-travel-tips",
//     title: "First Time in Korea? Essential Travel Tips You Need to Know",
//     description:
//       "Planning your first trip to Korea? Here's everything you need to know from transportation to etiquette.",
//     category: "Travel Tips",
//     date: "2024-12-12",
//     readTime: "6 min read",
//     author: "Mike Johnson",
//     image:
//       "https://images.unsplash.com/photo-1583562835057-a62d1beffbf3?w=800&h=500&fit=crop",
//     tags: ["Travel Tips", "First Timer", "Guide"],
//     content: `
// <h2>First Time in Korea? Essential Travel Tips You Need to Know</h2>

// <p>Korea is an incredible destination, but it can be overwhelming for first-time visitors. Here are essential tips to make your trip smooth and enjoyable.</p>

// <h2>Transportation</h2>

// <p>The T-money card is your best friend. Use it for subways, buses, taxis, and even convenience store purchases. The Seoul subway system is efficient and covers most tourist destinations.</p>

// <h2>Language</h2>

// <p>While many young Koreans speak English, learning basic Korean phrases like "안녕하세요" (hello) and "감사합니다" (thank you) goes a long way.</p>

// <h2>Etiquette</h2>

// <p>Remove your shoes when entering homes and some traditional restaurants. When receiving items from elders, use both hands as a sign of respect.</p>
//     `,
//   },
//   {
//     slug: "iconic-kdrama-filming-locations",
//     title: "Visit These Iconic K-Drama Filming Locations",
//     description:
//       "Walk in the footsteps of your favorite K-drama characters at these stunning filming locations.",
//     category: "K-Drama Locations",
//     date: "2024-12-10",
//     readTime: "7 min read",
//     author: "Jenny Lee",
//     image:
//       "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop",
//     tags: ["K-Drama", "Filming Locations", "Entertainment"],
//     content: `
// <h2>Visit These Iconic K-Drama Filming Locations</h2>

// <p>K-dramas have made Korea famous worldwide. Now you can visit the actual locations where your favorite scenes were filmed!</p>

// <h2>Nami Island (Winter Sonata)</h2>

// <p>This beautiful island became a pilgrimage site for K-drama fans after Winter Sonata. The tree-lined paths are stunning in every season.</p>

// <h2>Gyeongbokgung Palace (Multiple Dramas)</h2>

// <p>This iconic palace appears in countless historical dramas. Visit during the changing of the guard ceremony for the full experience.</p>

// <h2>Namsan Tower (Various Rom-Coms)</h2>

// <p>The love locks and stunning city views make this a must-visit romantic spot, featured in numerous K-dramas.</p>
//     `,
//   },
// ];

// // Helper 함수들
// export function getAllPosts(): BlogPost[] {
//   return blogPosts.sort(
//     (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
//   );
// }

// export function getPostBySlug(slug: string): BlogPost | undefined {
//   return blogPosts.find((post) => post.slug === slug);
// }

// export function getPostsByCategory(category: string): BlogPost[] {
//   if (category === "All Posts") {
//     return getAllPosts();
//   }
//   return blogPosts.filter((post) => post.category === category);
// }

// export function getFeaturedPost(): BlogPost | undefined {
//   return blogPosts.find((post) => post.featured === true);
// }

// export function getCategories(): string[] {
//   const categories = new Set(blogPosts.map((post) => post.category));
//   return ["All Posts", ...Array.from(categories)];
// }
