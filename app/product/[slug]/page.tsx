import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/data";
import { ProductDetail } from "@/components/product-detail";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alvero.pages.dev";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  const imageUrl = new URL(product.image, siteUrl).toString();
  const pageUrl = `${siteUrl}/product/${product.slug}`;
  return {
    title: product.name,
    description: `${product.blurb} — Buy online for ৳${product.price} with Cash on Delivery across Bangladesh.`,
    openGraph: {
      title: `${product.name} | Alvero Hair Solutions`,
      description: `${product.description} Price: ৳${product.price}. Cash on Delivery available across Bangladesh.`,
      url: pageUrl,
      type: "website",
      siteName: "Alvero Hair Solutions",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 1200,
          alt: product.name
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Alvero Hair Solutions`,
      description: `${product.blurb} — ৳${product.price}`,
      images: [imageUrl]
    }
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
