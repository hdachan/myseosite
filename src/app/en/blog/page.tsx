import { Metadata } from "next";
import BlogClient, { SanityPost } from "./BlogClient";
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
  const posts = await client.fetch<SanityPost[]>(blogListQuery);

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
