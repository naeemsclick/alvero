import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/guide-page";
import { getGuidePost, guidePosts } from "@/lib/guide";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alvero.pages.dev";

export function generateStaticParams() {
  return guidePosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getGuidePost(params.slug);
  if (!post) return {};
  const imageUrl = new URL(post.image, siteUrl).toString();
  const pageUrl = `${siteUrl}/guide/${post.slug}`;
  return {
    title: `${post.en.title} | ${post.bn.title}`,
    description: `${post.en.excerpt} — ${post.bn.excerpt}`,
    openGraph: {
      title: `${post.en.title} | Alvero Hair Care Guide`,
      description: `${post.en.excerpt} — Alvero Hair Solutions Guide.`,
      url: pageUrl,
      type: "article",
      siteName: "Alvero Hair Solutions",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 1200,
          alt: post.en.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: post.en.title,
      description: post.en.excerpt,
      images: [imageUrl]
    }
  };
}

export default function GuideArticlePage({ params }: { params: { slug: string } }) {
  const post = getGuidePost(params.slug);
  if (!post) notFound();
  return <GuideArticle post={post} />;
}
