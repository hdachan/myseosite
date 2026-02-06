"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { hangameFont } from "@/lib/fonts";
import { Pin } from "lucide-react";

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
      _id: string;
      url?: string;
    };
    alt?: string;
  };
  author?: string;
};

interface BlogClientProps {
  posts: SanityPost[];
  categories: string[];
}

export default function BlogClient({ posts, categories }: BlogClientProps) {
  const [activeCategory, setActiveCategory] = useState("All Posts");

  // 1. 카테고리로 먼저 필터링
  const filteredByCategory =
    activeCategory === "All Posts"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  // 2. Featured(고정핀) 게시물을 맨 앞으로 정렬
  const finalPosts = [...filteredByCategory].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

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
      <PageHero
        title="Korea Travel Blog"
        description="Discover authentic Korean experiences, hidden gems, and insider travel tips."
        imageSrc="/images/seoul-palace-stone-wall-background.jpg"
        alt="Traditional Korean palace stone wall and nature scenery"
      />

      <section className="max-w-6xl mx-auto px-5 lg:px-12 py-12 lg:py-24">
        {/* ✅ [수정됨] 카테고리 필터 영역 */}
        <div className="mb-10 md:mb-16">
          {/* 모바일: overflow-x-auto (가로 스크롤), flex-nowrap (줄바꿈 금지) 
            PC(md 이상): md:flex-wrap (줄바꿈 허용), md:overflow-visible (스크롤 끔)
            스크롤바 숨김: [&::-webkit-scrollbar]:hidden
          */}
          <div className="flex gap-2 overflow-x-auto flex-nowrap md:flex-wrap md:overflow-visible justify-start pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                // whitespace-nowrap 추가: 버튼 텍스트 줄바꿈 방지
                className={`whitespace-nowrap px-5 py-2.5 rounded-[6px] text-sm transition-all duration-300 flex-shrink-0 ${
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
          {finalPosts.length === 0 ? (
            <div className="text-center py-32">
              <h3
                className={`${hangameFont.className} text-xl text-gray-900 font-bold mb-2`}
              >
                No posts found
              </h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
              {finalPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="group block h-full"
                >
                  <article className="flex flex-col h-full relative">
                    {/* 📸 1. 이미지 영역 */}
                    <div className="relative w-full aspect-video bg-gray-100 rounded-[6px] overflow-hidden mb-6">
                      {/* 고정핀 배지 */}
                      {post.featured && (
                        <div className="absolute top-3 left-3 z-10 bg-black text-white px-3 py-1 rounded-[4px] flex items-center gap-1.5 shadow-md">
                          <Pin className="w-3.5 h-3.5 fill-current" />
                          <span className="text-xs font-bold uppercase tracking-wide">
                            Featured
                          </span>
                        </div>
                      )}

                      {post.image?.asset?.url ? (
                        <Image
                          src={post.image.asset.url}
                          alt={post.image.alt || post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          sizes="(max-width: 768px) 100vw, 50vw"
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
                      <h3
                        className={`${hangameFont.className} text-xl md:text-[26px] font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#4A7C7E] transition-colors line-clamp-2`}
                      >
                        {post.title}
                      </h3>

                      {post.description && (
                        <p className="text-sm md:text-[16px] text-gray-500 line-clamp-2 mb-5 leading-relaxed font-normal">
                          {post.description}
                        </p>
                      )}

                      <div className="mt-auto flex flex-wrap items-center gap-3">
                        {post.category && (
                          <span className="bg-gray-100 text-gray-600 text-xs md:text-sm font-bold px-3 py-1.5 rounded-[6px]">
                            {post.category}
                          </span>
                        )}

                        {post.publishedAt && (
                          <span className="text-xs md:text-sm text-gray-400 font-medium">
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
