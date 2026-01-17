"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { hangameFont } from "@/lib/fonts";

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
    asset?: {
      url?: string;
    };
  };
  author?: string;
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
    <div className="min-h-screen bg-white">
      {/* PageHero */}
      <PageHero
        title="Korea Travel Blog"
        description="Discover authentic Korean experiences, hidden gems, and insider travel tips."
        imageSrc="/images/background_korea_pt2.png"
      />

      <section className="max-w-6xl mx-auto px-5 lg:px-12 py-12 lg:py-24">
        {/* 카테고리 필터 */}
        <div className="mb-10 md:mb-16">
          {/* ✅ 수정됨: justify-center 제거 -> justify-start (무조건 왼쪽 정렬) */}
          <div className="flex gap-2 flex-wrap justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-[6px] text-sm transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-black text-white font-bold"
                    : "bg-gray-100 text-gray-500 font-medium hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 블로그 리스트 */}
        <div>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-32">
              <h3
                className={`${hangameFont.className} text-xl text-gray-900 font-bold mb-2`}
              >
                No posts found
              </h3>
            </div>
          ) : (
            /* 모바일 2열(grid-cols-2) / PC 2열 유지 */
            <div className="grid grid-cols-2 md:grid-cols-2 gap-x-4 gap-y-10 md:gap-x-10 md:gap-y-16">
              {filteredPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <article className="flex flex-col h-full">
                    {/* 📸 1. 이미지 영역 (16:9 비율, 라운드 6px) */}
                    <div className="relative w-full aspect-video bg-gray-100 rounded-[6px] overflow-hidden mb-4 md:mb-6">
                      {post.image?.asset?.url ? (
                        <Image
                          src={post.image.asset.url}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          sizes="(max-width: 768px) 50vw, 50vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#F8F1E7]">
                          <span
                            className={`${hangameFont.className} text-[#4A7C7E] text-2xl md:text-4xl font-bold opacity-30`}
                          >
                            K-Tour
                          </span>
                        </div>
                      )}
                    </div>

                    {/* 📝 2. 텍스트 영역 */}
                    <div className="flex flex-col flex-1">
                      {/* 제목 */}
                      <h3
                        className={`${hangameFont.className} text-lg md:text-[26px] font-bold text-gray-900 mb-2 md:mb-3 leading-tight group-hover:text-[#4A7C7E] transition-colors line-clamp-2`}
                      >
                        {post.title}
                      </h3>

                      {/* 설명글 */}
                      {post.description && (
                        <p className="text-xs md:text-[15px] text-gray-500 line-clamp-2 mb-3 md:mb-5 leading-relaxed font-normal">
                          {post.description}
                        </p>
                      )}

                      {/* 하단 정보 (태그 + 날짜) */}
                      <div className="mt-auto flex flex-wrap items-center gap-2 md:gap-3">
                        {/* 카테고리 태그 */}
                        {post.category && (
                          <span className="bg-gray-100 text-gray-600 text-[11px] md:text-[13px] font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-[6px]">
                            {post.category}
                          </span>
                        )}

                        {/* 날짜 표시 */}
                        {post.publishedAt && (
                          <span className="text-[11px] md:text-[13px] text-gray-400 font-medium">
                            {formatDate(post.publishedAt)}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
