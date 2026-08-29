import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@/lib/data";
import { CategoryView } from "@/components/category-view";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://alvero-hair-solutions2.vercel.app");

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = categories.find((item) => item.slug === params.slug);
  if (!category) return {};
  const image = category.slug === "packages" ? "/media/complete-combo.webp" : "/media/alvero-cover.webp";
  const imageUrl = new URL(image, siteUrl).toString();
  return {
    title: `${category.label} | Alvero Hair Solutions`,
    description: `${category.label} products from Alvero Hair Solutions — nature-inspired care for your hair routine.`,
    openGraph: { title: `${category.label} | Alvero Hair Solutions`, description: `Explore Alvero ${category.label.toLowerCase()} products.`, images: [{ url: imageUrl, width: 1254, height: 1254, alt: category.label }] },
    twitter: { card: "summary_large_image", title: category.label, images: [imageUrl] }
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  if (!categories.some((item) => item.slug === params.slug)) notFound();
  return <CategoryView slug={params.slug} />;
}
