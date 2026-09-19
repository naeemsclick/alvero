import type { Metadata } from "next";
import { ProductDetail } from "@/components/product-detail";

export function generateStaticParams() {
  return [];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const formattedTitle = params.slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  return {
    title: `${formattedTitle} | Alvero Hair Solutions`,
    description: `Shop ${formattedTitle} online at Alvero Hair Solutions with Cash on Delivery across Bangladesh.`
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  return <ProductDetail slug={params.slug} />;
}
