// D:\myseosite\src\app\en\package\[slug]\page.tsx

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPackageBySlug, getAllSlugs } from "../packageData";
import PackageDetailClient from "./PackageDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all tours
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = getPackageBySlug(slug);

  if (!tour) {
    return {
      title: "Tour Not Found",
    };
  }

  const url = `https://yourdomain.com/en/package/${tour.slug}`;
  const imageUrl = tour.images?.[0] || tour.image;

  return {
    title: `${tour.title} | Korea Tour Package`,
    description: tour.fullDescription || tour.description,
    keywords: tour.keywords?.join(", "),
    authors: [{ name: "Your Company Name" }],
    openGraph: {
      title: tour.title,
      description: tour.fullDescription || tour.description,
      url,
      siteName: "Your Site Name",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: tour.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tour.title,
      description: tour.fullDescription || tour.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tour = getPackageBySlug(slug);

  if (!tour) {
    notFound();
  }

  // Generate JSON-LD structured data
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: tour.title,
    description: tour.fullDescription || tour.description,
    image: tour.images || [tour.image],
    brand: {
      "@type": "Brand",
      name: "Your Company Name",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tour.rating.toString(),
      reviewCount: tour.reviews.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      url: `https://yourdomain.com/en/package/${tour.slug}`,
      priceCurrency: "USD",
      price: tour.price.toString(),
      priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Your Company Name",
      },
    },
  };

  const touristTripSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.fullDescription || tour.description,
    touristType: "Tourists",
    itinerary: {
      "@type": "ItemList",
      itemListElement: tour.includes?.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item,
      })),
    },
    offers: {
      "@type": "Offer",
      price: tour.price.toString(),
      priceCurrency: "USD",
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripSchema) }}
      />

      {/* Client Component */}
      <PackageDetailClient tour={tour} />
    </>
  );
}
