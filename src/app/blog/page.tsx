import { Metadata } from "next";
import BlogClient, { SanityPost } from "./BlogClient"; // ✅ BlogClient와 타입 가져오기
import { client } from "@/sanity/lib/client";
import { blogListQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Korea Travel Blog | DMZ, Seoul & Local Insights",
  description:
    "Expert travel tips, DMZ history, K-drama locations, and authentic Korean experiences.",
  openGraph: {
    title: "Korea Travel Blog | DMZ, Seoul & Local Insights",
    description:
      "Expert travel tips, DMZ history, K-drama locations, and authentic Korean experiences.",
    type: "website",
  },
};

export default async function BlogPage() {
  // Sanity 데이터 가져오기 (캐싱 적용됨)
  const posts = await client.fetch<SanityPost[]>(blogListQuery);

  // 카테고리 목록 추출 (중복 제거)
  const categories: string[] = [
    "All Posts",
    ...Array.from(
      new Set(
        posts
          .map((p) => p.category)
          .filter((c): c is string => typeof c === "string")
      )
    ),
  ];

  return <BlogClient posts={posts} categories={categories} />;
}
