import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/data";
import { guidePosts } from "@/lib/guide";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/cart`, lastModified: now, changeFrequency: "monthly", priority: .5 },
    { url: `${base}/track`, lastModified: now, changeFrequency: "monthly", priority: .4 },
    { url: `${base}/refer-win`, lastModified: now, changeFrequency: "monthly", priority: .4 },
    { url: `${base}/guide`, lastModified: now, changeFrequency: "weekly", priority: .75 },
    ...guidePosts.map((post) => ({ url: `${base}/guide/${post.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: .55 })),
    ...categories.map((category) => ({ url: `${base}/category/${category.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: .8 })),
    ...products.map((product) => ({ url: `${base}/product/${product.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: .7 }))
  ];
}
