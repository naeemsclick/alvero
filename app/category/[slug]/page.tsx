import type { Metadata } from "next";
import { categories } from "@/lib/data";
import { CategoryView } from "@/components/category-view";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alvero.pages.dev";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = categories.find((item) => item.slug === params.slug);
  const title = category ? category.label : params.slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  const image = params.slug === "packages" ? "/media/complete-combo.webp" : "/media/alvero-cover.webp";
  const imageUrl = new URL(image, siteUrl).toString();
  const pageUrl = `${siteUrl}/category/${params.slug}`;

  return {
    title: title,
    description: `${title} collection from Alvero Hair Solutions — effective, high-quality hair care inspired by nature.`,
    openGraph: {
      title: `${title} | Alvero Hair Solutions`,
      description: `Explore Alvero ${title.toLowerCase()} products with Cash on Delivery across Bangladesh.`,
      url: pageUrl,
      type: "website",
      siteName: "Alvero Hair Solutions",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }]
    },
    twitter: { card: "summary_large_image", title: `${title} | Alvero Hair Solutions`, images: [imageUrl] }
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return <CategoryView slug={params.slug} />;
}
