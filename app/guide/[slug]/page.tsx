import type { Metadata } from "next";
import { GuideArticle } from "@/components/guide-page";

export function generateStaticParams() {
  return [];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const formattedTitle = params.slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  return {
    title: `${formattedTitle} | Alvero Care Guide`,
    description: `Read ${formattedTitle} on Alvero Hair Care Guide.`
  };
}

export default function GuideArticlePage({ params }: { params: { slug: string } }) {
  return <GuideArticle slug={params.slug} />;
}
