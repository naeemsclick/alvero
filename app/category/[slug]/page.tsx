import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@/lib/data";
import { CategoryView } from "@/components/category-view";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alvero.pages.dev";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = categories.find((item) => item.slug === params.slug);
  if (!category) return {};
  const image = category.slug === "packages" ? "/media/complete-combo.webp" : "/media/alvero-cover.webp";
  const imageUrl = new URL(image, siteUrl).toString();
  const pageUrl = `${siteUrl}/category/${category.slug}`;
  return {
    title: category.label,
    description: `${category.label} collection from Alvero Hair Solutions — effective, high-quality hair care inspired by nature.`,
    openGraph: {
      title: `${category.label} | Alvero Hair Solutions`,
      description: `Explore Alvero ${category.label.toLowerCase()} products with Cash on Delivery across Bangladesh.`,
      url: pageUrl,
      type: "website",
      siteName: "Alvero Hair Solutions",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: category.label }]
    },
    twitter: { card: "summary_large_image", title: `${category.label} | Alvero Hair Solutions`, images: [imageUrl] }
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  if (!categories.some((item) => item.slug === params.slug)) notFound();
  return <CategoryView slug={params.slug} />;
}
