import { Metadata } from "next";
import BlogClient, { SanityPost } from "./BlogClient";
import { client } from "@/sanity/lib/client";
import { blogListQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

// ✅ 1법칙: SEO Metadata 강화 (목록 페이지용)
export const metadata: Metadata = {
  title: "Korea Travel Blog | DMZ, Seoul & Local Insights",
  description:
    "Expert travel tips, DMZ history, K-drama locations, and authentic Korean experiences. Read our latest stories.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Korea Travel Blog | Seoul City Tour",
    description:
      "Expert travel tips, DMZ history, and authentic Korean experiences.",
    url: "/blog",
    siteName: "Seoul City Tour",
    type: "website",
    images: [
      {
        url: "/images/seoul-palace-stone-wall-background.jpg",
        width: 1200,
        height: 630,
        // ✅ [수정됨] UI 컴포넌트(PageHero)와 완벽하게 동일한 설명 사용
        alt: "Traditional Korean palace stone wall and nature scenery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Korea Travel Blog | Seoul City Tour",
    description: "Discover authentic Korean experiences and travel tips.",
    images: ["/images/seoul-palace-stone-wall-background.jpg"],
  },
};

export default async function BlogPage() {
  // ✅ 2법칙: Sanity 데이터 가져오기 (blogListQuery에 alt 필드 포함됨)
  const posts = await client.fetch<SanityPost[]>(blogListQuery);

  // 카테고리 목록 추출 (중복 제거 및 데이터 무결성 체크)
  const categories: string[] = [
    "All Posts",
    ...Array.from(
      new Set(
        posts
          .map((p) => p.category)
          .filter((c): c is string => typeof c === "string" && c.length > 0),
      ),
    ),
  ];

  // ✅ 1법칙: CollectionPage JSON-LD 생성
  // (구글에게 이 페이지가 '블로그 글 목록'임을 구조적으로 전달)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    headline: "Korea Travel Blog",
    description:
      "Expert travel tips, DMZ history, K-drama locations, and authentic Korean experiences.",
    url: "https://myseosite.vercel.app/blog", // 실제 도메인으로 교체 권장
    hasPart: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `https://myseosite.vercel.app/blog/${post.slug}`,
      datePublished: post.publishedAt,
      image: post.image?.asset?.url ? urlFor(post.image).url() : undefined,
    })),
  };

  return (
    <>
      {/* ✅ 1법칙: JSON-LD 삽입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 클라이언트 컴포넌트에 데이터 전달 */}
      <BlogClient posts={posts} categories={categories} />
    </>
  );
}
