import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Clock, User, Calendar, ArrowLeft, Tag } from "lucide-react";
import { getPostBySlug, getAllPosts } from "../blogData";

/* =========================
   Static Generation
========================= */
export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

/* =========================
   Metadata (SEO)
========================= */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | Seoul City Tour Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

/* =========================
   Page
========================= */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = getAllPosts()
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  // Article Schema for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Seoul City Tour",
      logo: {
        "@type": "ImageObject",
        url: "https://yourdomain.com/logo.png", // Update with your actual logo URL
      },
    },
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="min-h-screen bg-gray-50">
        {/* ================= Header ================= */}
        <header className="bg-white border-b pt-24 pb-12">
          <div className="max-w-4xl mx-auto px-4">
            <Link
              href="/en/blog"
              className="inline-flex items-center gap-2 text-red-800 font-semibold mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>

            <span className="inline-block mb-4 px-4 py-1.5 bg-red-800 text-white rounded-lg text-sm font-bold">
              {post.category}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>{post.date}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {post.tags && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map((tag, i) => (
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
          </div>
        </header>

        {/* ================= Featured Image ================= */}
        <section className="bg-white">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-200">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          </div>
        </section>

        {/* ================= Article Content ================= */}
        <article className="max-w-4xl mx-auto px-4 py-12">
          <div
            className="
              prose prose-lg max-w-none
              prose-headings:font-bold
              prose-h2:text-3xl prose-h2:mt-10
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-img:rounded-xl
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* ================= Related Posts ================= */}
        {relatedPosts.length > 0 && (
          <section className="bg-white border-t py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Link key={related.slug} href={`/en/blog/${related.slug}`}>
                    <article className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all">
                      <div className="relative aspect-[16/9] bg-gray-200">
                        <Image
                          src={related.image}
                          alt={related.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold mb-2 hover:text-red-800">
                          {related.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {related.description}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
