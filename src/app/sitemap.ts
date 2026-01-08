// import { MetadataRoute } from "next";
// import { packageTours } from "@/app/en/package/packageData";
// import { blogPosts } from "@/app/en/blog/blogData";

// export default function sitemap(): MetadataRoute.Sitemap {
//   const baseUrl = "https://www.yoursite.com"; // 🔴 실제 도메인으로 교체

//   /* =========================
//      Static Pages
//   ========================= */
//   const staticPages = [
//     "/",
//     "/en",
//     "/en/company",
//     "/en/contact",
//     "/en/faq",
//     "/en/private",
//     "/en/terms",
//     "/en/privacy",
//     "/en/cart",
//     "/en/cancellation-policy",

//     "/ko",
//     "/ko/about",
//     "/ko/contact",
//     "/ko/company",
//     "/ko/faq",
//     "/ko/private",
//     "/ko/tours",
//     "/ko/attractions",
//   ].map((path) => ({
//     url: `${baseUrl}${path}`,
//     lastModified: new Date(),
//     changeFrequency: "monthly" as const,
//     priority: 0.8,
//   }));

//   /* =========================
//      Package Detail Pages
//   ========================= */
//   const packagePages = packageTours.map((tour) => ({
//     url: `${baseUrl}/en/package/${tour.slug}`,
//     lastModified: new Date(),
//     changeFrequency: "weekly" as const,
//     priority: 1.0,
//   }));

//   /* =========================
//      Blog Detail Pages
//   ========================= */
//   const blogPages = blogPosts.map((post) => ({
//     url: `${baseUrl}/en/blog/${post.slug}`,
//     lastModified: new Date(post.date),
//     changeFrequency: "monthly" as const,
//     priority: 0.7,
//   }));

//   return [...staticPages, ...packagePages, ...blogPages];
// }
