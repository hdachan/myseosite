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
      {/* PageHero는 기존 유지 */}
      <PageHero
        title="Korea Travel Blog"
        description="Discover authentic Korean experiences, hidden gems, and insider travel tips."
        imageSrc="/images/background_korea_pt2.png"
      />

      <section className="max-w-6xl mx-auto px-8 lg:px-12 py-12 lg:py-24">
        {/* 카테고리 필터 (기존 유지하되 스타일 살짝 다듬음) */}
        <div className="mb-16">
          <div className="flex gap-2 flex-wrap justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-black text-white font-bold" // 요즘 스타일은 선택된 걸 검정으로 가기도 함 (브랜드 컬러 원하시면 #4A7C7E 유지)
                    : "bg-gray-100 text-gray-500 font-medium hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ✅ 블로그 리스트 (디자인 전면 수정) */}
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
            // 사진처럼 2열(grid-cols-2)이 시원해 보일 수 있으나,
            // 반응형 고려하여 모바일 1열 -> 태블릿/PC 2열로 설정했습니다.
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
              {filteredPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="group block" // block으로 설정하여 전체 클릭 가능
                >
                  <article className="flex flex-col h-full">
                    {/* 📸 1. 이미지 영역 (테두리 X, 둥근 모서리 강조) */}
                    <div className="relative w-full aspect-[1.6/1] bg-gray-100 rounded-[20px] overflow-hidden mb-6">
                      {post.image?.asset?.url ? (
                        <Image
                          src={post.image.asset.url}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#F8F1E7]">
                          <span
                            className={`${hangameFont.className} text-[#4A7C7E] text-4xl font-bold opacity-30`}
                          >
                            K-Tour
                          </span>
                        </div>
                      )}
                    </div>

                    {/* 📝 2. 텍스트 영역 (여백으로 구분) */}
                    <div className="flex flex-col flex-1">
                      {/* 제목 */}
                      <h3
                        className={`${hangameFont.className} text-2xl md:text-[26px] font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#4A7C7E] transition-colors`}
                      >
                        {post.title}
                      </h3>

                      {/* 설명글 (사진처럼 2줄 정도만 깔끔하게) */}
                      {post.description && (
                        <p className="text-[15px] text-gray-500 line-clamp-2 mb-5 leading-relaxed font-normal">
                          {post.description}
                        </p>
                      )}

                      {/* 하단 정보 (태그 + 날짜) */}
                      <div className="mt-auto flex items-center gap-3">
                        {/* 카테고리 태그 (사진 속 '테크', '비즈니스' 느낌) */}
                        {post.category && (
                          <span className="bg-gray-100 text-gray-600 text-[13px] font-bold px-3 py-1.5 rounded-lg">
                            {post.category}
                          </span>
                        )}

                        {/* 구분점 */}
                        {/* 날짜나 작가 정보가 있으면 표시 */}
                        {post.publishedAt && (
                          <span className="text-[13px] text-gray-400 font-medium">
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
