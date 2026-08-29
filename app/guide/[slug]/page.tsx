import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/guide-page";
import { getGuidePost, guidePosts } from "@/lib/guide";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://alvero-hair-solutions2.vercel.app");

export function generateStaticParams() {
  return guidePosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getGuidePost(params.slug);
  if (!post) return {};
  const imageUrl = new URL(post.image, siteUrl).toString();
  return {
    title: `${post.en.title} | Alvero Hair Care Guide`,
    description: post.en.excerpt,
    openGraph: {
      title: `${post.en.title} | Alvero Hair Care Guide`,
      description: post.en.excerpt,
      type: "article",
      images: [{ url: imageUrl, width: 1254, height: 1254, alt: post.en.title }]
    },
    twitter: { card: "summary_large_image", title: post.en.title, description: post.en.excerpt, images: [imageUrl] }
  };
}

export default function GuideArticlePage({ params }: { params: { slug: string } }) {
  const post = getGuidePost(params.slug);
  if (!post) notFound();
  return <GuideArticle post={post} />;
}
