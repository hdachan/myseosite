// app/[lang]/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { blogDetailQuery } from "@/sanity/lib/queries";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { format } from "date-fns";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";

type SanityPost = {
  title: string;
  description?: string;
  content: any;
  category?: string;
  tags?: string[];
  readTime?: number | string;
  publishedAt?: string;
  author?: string;
};

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
}) {
  const { slug } = await params;
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title, description
    }`,
    { slug }
  );
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [],
    },
  };
}

const ptComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-serif font-bold mt-12 mb-6 text-[#2C2420] border-l-4 border-[#D97959] pl-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-serif font-bold mt-10 mb-4 text-[#2C2420]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-serif font-semibold mt-8 mb-3 text-[#3F6E70]">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mb-6 leading-8 text-[#4A4A4A] text-[17px] font-light tracking-wide">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 pl-6 border-l-[3px] border-[#D97959] italic text-xl text-[#5D544F] font-serif bg-[#F5F5F0] py-4 pr-4 rounded-r-lg">
        "{children}"
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-[#4A4A4A] marker:text-[#D97959]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-[#4A4A4A] marker:font-bold marker:text-[#3F6E70]">
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
          className="text-[#3F6E70] underline decoration-1 underline-offset-4 hover:text-[#D97959] transition-colors font-medium"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-bold text-[#2C2420] bg-[#D97959]/10 px-1 rounded-sm">
        {children}
      </strong>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || "Blog image"}
            width={800}
            height={600}
            className="rounded-xl shadow-lg object-cover mx-auto"
          />
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
  const post = await client.fetch<SanityPost>(blogDetailQuery, { slug });
  if (!post) notFound();

  const formattedDate = post.publishedAt
    ? format(new Date(post.publishedAt), "MMMM dd, yyyy")
    : "No date";

  const authorName = post.author || "Unknown Author";

  return (
    <article className="min-h-screen bg-[#FDFBF7] text-[#2C2420] relative selection:bg-[#D97959] selection:text-white">
      <div className="fixed inset-0 opacity-[0.6] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] z-0"></div>

      <nav className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        <Link
          href="/en/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#6B5F57] hover:text-[#D97959] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Blog
        </Link>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        <header className="mb-12 text-center md:text-left">
          <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
            {post.category && (
              <span className="px-3 py-1 rounded-full bg-[#3F6E70]/10 text-[#3F6E70] text-xs font-bold uppercase tracking-wider">
                {post.category}
              </span>
            )}
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full border border-[#EBE5DE] text-[#6B5F57] text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.2] mb-6 text-[#2C2420]">
            {post.title}
          </h1>

          {post.description && (
            <p className="text-lg md:text-xl text-[#6B5F57] font-light leading-relaxed mb-8 max-w-2xl">
              {post.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-6 text-sm text-[#8C847F] border-t border-b border-[#EBE5DE] py-4 justify-center md:justify-start">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="font-medium text-[#2C2420]">{authorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.publishedAt || undefined}>
                {formattedDate}
              </time>
            </div>
            {post.readTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
            )}
          </div>
        </header>

        <div className="max-w-none prose prose-lg prose-stone prose-p:text-[#4A4A4A] prose-headings:font-serif prose-headings:text-[#2C2420] prose-a:text-[#3F6E70]">
          <PortableText value={post.content} components={ptComponents} />
        </div>

        <hr className="my-12 border-[#EBE5DE]" />

        <div className="flex justify-between items-center">
          <Link
            href="/en/blog"
            className="text-[#3F6E70] font-serif hover:underline"
          >
            &larr; More articles
          </Link>
        </div>
      </main>
    </article>
  );
}
