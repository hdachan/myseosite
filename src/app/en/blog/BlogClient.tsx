"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export type SanityPost = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  category?: string;
  readTime?: string;
  publishedAt?: string;
  featured?: boolean;
  image?: {
    // ← mainImage → image
    asset?: {
      url?: string;
    };
  };
  author?: string; // ← string 그대로 (데이터 기준)
};

interface BlogClientProps {
  posts: SanityPost[];
  categories: string[];
}

export default function BlogClient({ posts, categories }: BlogClientProps) {
  const [activeCategory, setActiveCategory] = useState("All Posts");

  const filteredPosts =
    activeCategory === "All Posts"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-red-900 to-red-700 text-white">
        <div className="max-w-6xl mx-auto px-4 pt-32 pb-16">
          <h1 className="text-5xl font-bold mb-4">Korea Travel Blog</h1>
          <p className="text-xl text-red-100 max-w-2xl">
            Discover authentic Korean experiences, hidden gems, and insider
            travel tips
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-red-800 text-white shadow-md scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No posts found in this category
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post._id}
                href={`/en/blog/${post.slug}`}
                className="group"
              >
                <article className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                  <div className="relative h-56 bg-gray-200 overflow-hidden">
                    {post.image?.asset?.url ? (
                      <Image
                        src={post.image.asset.url}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-100 to-red-200">
                        <span className="text-red-800 text-6xl font-bold opacity-20">
                          {post.title.charAt(0)}
                        </span>
                      </div>
                    )}

                    {post.category && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-red-800 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                          {post.category}
                        </span>
                      </div>
                    )}

                    {post.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-full">
                          ⭐ Featured
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-xl mb-3 group-hover:text-red-800 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {post.description && (
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                        {post.description}
                      </p>
                    )}

                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-4">
                          {post.author && (
                            <span className="flex items-center gap-1">
                              👤 {post.author}
                            </span>
                          )}
                          {post.readTime && (
                            <span className="flex items-center gap-1">
                              ⏱️ {post.readTime}
                            </span>
                          )}
                        </div>
                        {post.publishedAt && (
                          <span className="flex items-center gap-1">
                            📅 {formatDate(post.publishedAt)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
