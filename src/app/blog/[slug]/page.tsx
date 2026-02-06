import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { blogDetailQuery } from "@/sanity/lib/queries";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";

/* ✅ 폰트 가져오기 */
import { hangameFont } from "@/lib/fonts";
import { Metadata } from "next";

type SanityPost = {
  title: string;
  description?: string;
  content: any;
  category?: string;
  tags?: string[];
  readTime?: string;
  publishedAt?: string;
  author?: string;
  image?: {
    asset?: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
};

// 정적 경로 생성
export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(`
    *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
  `);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // 메타데이터용 가벼운 쿼리 실행
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title, description, image { asset->{url}, alt }, publishedAt, author
    }`,
    { slug },
  );

  if (!post) return { title: "Post Not Found" };

  const ogImage = post.image?.asset?.url
    ? urlFor(post.image).width(1200).height(630).url()
    : "/images/default-og.png"; // 기본 이미지 fallback

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author || "Seoul City Tour"],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.image?.alt || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

// ✅ PortableText 컴포넌트 (가독성 & 이미지 고정 설정)
const ptComponents: PortableTextComponents = {
  block: {
    // 제목 스타일 (한게임 폰트)
    h1: ({ children }) => (
      <h1
        className={`${hangameFont.className} text-3xl md:text-4xl font-bold mt-16 mb-6 text-gray-900 leading-tight border-b-2 border-gray-900 pb-4`}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className={`${hangameFont.className} text-2xl md:text-3xl font-bold mt-14 mb-5 text-gray-900 leading-tight`}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className={`${hangameFont.className} text-xl md:text-2xl font-bold mt-10 mb-4 text-gray-900`}
      >
        {children}
      </h3>
    ),
    // 본문 스타일 (가독성 최적화: 18px, 1.8 줄간격)
    normal: ({ children }) => (
      <p className="mb-6 leading-[1.8] text-[17px] md:text-[18px] text-gray-800 font-normal break-keep">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 pl-6 border-l-4 border-gray-900 text-xl text-gray-800 italic leading-relaxed bg-gray-50 py-6 pr-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-8 space-y-3 text-[17px] text-gray-800 leading-relaxed marker:text-gray-500">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-8 space-y-3 text-[17px] text-gray-800 leading-relaxed marker:text-gray-900 marker:font-bold">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value?.href?.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value?.href}
          rel={rel}
          className="text-[#D97959] underline decoration-1 underline-offset-4 hover:bg-[#D97959] hover:text-white transition-all font-medium"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-bold text-black bg-yellow-100 px-1">
        {children}
      </strong>
    ),
  },
  types: {
    // ✅ 본문 이미지 설정 (비율 고정 & 중앙 정렬 + 라운드 6px)
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-12">
          {/* aspect-[3/2]: 3:2 비율로 강제 고정 (넘치면 자름) */}
          {/* ✅ 수정됨: rounded-[6px] 적용 */}
          <figure className="relative w-full aspect-[3/2] bg-gray-100 overflow-hidden rounded-[6px]">
            <Image
              src={urlFor(value).width(1200).url()}
              // ✅ 1법칙: 본문 이미지도 Alt Text가 있으면 우선 사용
              alt={value.alt || "Blog content image"}
              fill
              className="object-cover"
            />
          </figure>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-gray-500 font-medium">
              {value.caption}
            </figcaption>
          )}
        </div>
      );
    },
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // ✅ 2법칙: 타입 안전하게 데이터 Fetch
  const post = await client.fetch<SanityPost>(blogDetailQuery, { slug });

  if (!post) notFound();

  // 날짜 포맷팅 (데이터 무결성: 값이 없을 경우 대비)
  const formattedDate = post.publishedAt
    ? format(new Date(post.publishedAt), "MMMM dd, yyyy")
    : "Date not available";

  const authorName = post.author || "Seoul City Tour Editor";

  // ✅ 1법칙: JSON-LD 생성 (구글 검색 엔진용 구조화 데이터)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image?.asset?.url ? [urlFor(post.image).url()] : [],
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: authorName,
    },
  };

  return (
    <article className="min-h-screen bg-white text-gray-900 pb-32">
      {/* ✅ 1법칙: JSON-LD 삽입 (검색엔진이 읽는 부분) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. 상단 네비게이션 */}
      <nav className="max-w-3xl mx-auto px-6 pt-12 pb-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-black transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to list
        </Link>
      </nav>

      {/* 2. 헤더 영역 */}
      <header className="max-w-3xl mx-auto px-6 mb-12">
        {/* 카테고리 & 태그 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.category && (
            <span className="px-3 py-1 bg-black text-white text-sm font-bold uppercase tracking-wide">
              {post.category}
            </span>
          )}
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium border border-gray-200"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* 제목: 한게임 폰트 */}
        <h1
          className={`${hangameFont.className} text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] mb-8 text-black tracking-tight`}
        >
          {post.title}
        </h1>

        {/* 메타 정보 */}
        <div className="flex items-center border-t-2 border-black py-6 mt-8">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm">
            <span className="font-bold text-black uppercase tracking-wide">
              By {authorName}
            </span>
            <span className="hidden md:inline w-px h-4 bg-gray-300"></span>
            <span className="text-gray-600">{formattedDate}</span>
            {post.readTime && (
              <>
                <span className="hidden md:inline w-px h-4 bg-gray-300"></span>
                <span className="text-gray-600">{post.readTime}</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 3. 메인 커버 이미지 (16:9 고정) */}
      {post.image?.asset?.url && (
        <div className="max-w-3xl mx-auto px-6 mb-16">
          <div className="relative aspect-[16/9] w-full bg-gray-100 rounded-[6px] overflow-hidden">
            <Image
              src={urlFor(post.image).width(1200).url()}
              // ✅ 1법칙: Sanity에서 가져온 Alt Text 적용 (없으면 제목으로 대체)
              alt={post.image.alt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* 4. 본문 컨텐츠 */}
      <main className="max-w-3xl mx-auto px-6">
        <div
          className="prose prose-lg prose-slate max-w-none 
          prose-p:text-gray-800 prose-p:leading-[1.8] prose-p:text-[18px]
          prose-headings:text-black prose-headings:font-bold 
          prose-a:text-[#D97959] prose-a:no-underline 
          prose-img:rounded-none prose-img:shadow-none"
        >
          <PortableText value={post.content} components={ptComponents} />
        </div>

        {/* 하단 구분선 */}
        <hr className="my-20 border-t-2 border-black" />

        {/* 하단 네비게이션 */}
        <Link
          href="/blog"
          className="group block bg-gray-50 border border-gray-200 p-8 hover:bg-black hover:border-black transition-all duration-300"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2 group-hover:text-gray-400">
                Back to Overview
              </p>
              <h4 className="text-2xl font-bold text-black group-hover:text-white">
                View All Articles
              </h4>
            </div>
            <ArrowRight className="w-6 h-6 text-black group-hover:text-white transition-transform group-hover:translate-x-2" />
          </div>
        </Link>
      </main>
    </article>
  );
}
