import { Metadata } from "next";
import BlogClient from "./BlogClient";
import { getAllPosts, getCategories } from "./blogData";

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

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return <BlogClient posts={posts} categories={categories} />;
}
