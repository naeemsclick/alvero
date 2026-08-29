import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/data";
import { ProductDetail } from "@/components/product-detail";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://alvero-hair-solutions2.vercel.app");

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  const imageUrl = new URL(product.image, siteUrl).toString();
  return {
    title: `${product.name} | Alvero Hair Solutions`,
    description: product.blurb,
    openGraph: {
      title: `${product.name} | Alvero Hair Solutions`,
      description: product.description,
      type: "website",
      images: [{ url: imageUrl, width: 1254, height: 1254, alt: product.name }]
    },
    twitter: { card: "summary_large_image", title: product.name, description: product.blurb, images: [imageUrl] }
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
