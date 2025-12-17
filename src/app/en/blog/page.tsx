"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, User, ArrowRight, Calendar, Tag } from "lucide-react";
import {
  getAllPosts,
  getFeaturedPost,
  getPostsByCategory,
  getCategories,
} from "./blogData";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All Posts");

  const categories = getCategories();
  const featuredPost = getFeaturedPost();
  const filteredPosts = getPostsByCategory(activeCategory);

  // Featured post 표시 여부
  const showFeatured =
    activeCategory === "All Posts" ||
    (featuredPost && activeCategory === featuredPost.category);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative pt-24 pb-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1920&h=600&fit=crop')",
          }}
        />
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
        {/* Featured Post */}
        {showFeatured && featuredPost && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-red-800 rounded-full" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Featured Story
              </h2>
            </div>

            <Link href={`/en/blog/${featuredPost.slug}`}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow cursor-pointer border border-gray-200">
                <div className="grid md:grid-cols-5 gap-0">
                  <div className="relative h-64 md:h-auto md:col-span-2">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 bg-red-800 text-white rounded-lg text-sm font-bold shadow-lg">
                        {featuredPost.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 md:col-span-3">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight hover:text-red-800 transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                      {featuredPost.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span className="font-medium">
                          {featuredPost.author}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>

                    {featuredPost.tags && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {featuredPost.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium flex items-center gap-1"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-800 text-white rounded-lg font-semibold hover:bg-red-900 transition-all group">
                      Read Full Story
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Latest Articles */}
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
                    <div className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 h-full">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                    </div>
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
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1920&h=400&fit=crop')",
          }}
        />
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
