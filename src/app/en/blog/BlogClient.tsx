"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, User } from "lucide-react";
import { BlogPost } from "./blogData";

interface BlogClientProps {
  posts: BlogPost[];
  categories: string[];
}

export default function BlogClient({ posts, categories }: BlogClientProps) {
  const [activeCategory, setActiveCategory] = useState("All Posts");

  const filteredPosts =
    activeCategory === "All Posts"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative pt-24 pb-32">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1920&h=600&fit=crop"
            alt="Korea Travel Blog"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-red-700/85 via-red-800/85 to-red-900/85" />

        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 tracking-wide">
            Travel Blog
          </h1>
          <p className="text-red-100 text-base md:text-lg max-w-2xl">
            Discover insider tips, local stories, and travel inspiration for
            your Korean adventure
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-900 via-red-600 to-red-900" />
      </div>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 border-t-2 border-red-800">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeCategory === category
                    ? "bg-red-800 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-red-800 rounded-full" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {activeCategory === "All Posts"
                  ? "Latest Articles"
                  : activeCategory}
              </h2>
            </div>
            <div className="px-4 py-2 bg-red-800 text-white rounded-lg font-bold text-sm">
              {filteredPosts.length}{" "}
              {filteredPosts.length === 1 ? "Article" : "Articles"}
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <Link key={post.slug} href={`/en/blog/${post.slug}`}>
                    <article className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 h-full">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-red-800 text-white rounded-md text-xs font-bold shadow-lg">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-800 transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                          {post.description}
                        </p>

                        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5" />
                            <span className="font-medium">{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {filteredPosts.length > 6 && (
                <div className="text-center mt-12">
                  <button className="px-8 py-3.5 bg-white text-gray-900 border-2 border-gray-300 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm">
                    Load More Articles
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">
                No articles found in this category yet.
              </p>
              <button
                onClick={() => setActiveCategory("All Posts")}
                className="mt-4 px-6 py-2 bg-red-800 text-white rounded-lg font-semibold hover:bg-red-900 transition-colors"
              >
                View All Posts
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="relative mt-8">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1920&h=400&fit=crop"
            alt="Newsletter background"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-red-700/90 via-red-800/90 to-red-900/90" />

        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Never Miss a Story
          </h2>
          <p className="text-lg text-red-100 mb-8 max-w-2xl mx-auto">
            Get travel tips, destination guides, and exclusive offers delivered
            to your inbox
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:ring-4 focus:ring-white/30 outline-none shadow-lg"
            />
            <button className="px-8 py-4 bg-white text-red-800 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg whitespace-nowrap">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
