import type { Metadata } from "next";
import { HomePage } from "@/components/home-sections";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alvero.pages.dev";

export const metadata: Metadata = {
  title: "Alvero Hair Solutions | Nature-led care for stronger hair",
  description:
    "Alvero Hair Solutions — effective, high-quality hair care inspired by nature. Shop hair oil, shampoo, hair toner and complete care combos with Cash on Delivery across Bangladesh.",
  openGraph: {
    title: "Alvero Hair Solutions | Nature-led care for stronger hair",
    description: "Alvero Hair Solutions — effective, high-quality hair care inspired by nature.",
    url: siteUrl,
    siteName: "Alvero Hair Solutions",
    images: [
      {
        url: `${siteUrl}/media/alvero-share.png`,
        secureUrl: `${siteUrl}/media/alvero-share.png`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Alvero Hair Solutions — Nature-led care for stronger hair"
      },
      {
        url: `${siteUrl}/media/alvero-share.jpg`,
        secureUrl: `${siteUrl}/media/alvero-share.jpg`,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Alvero Hair Solutions — Nature-led care for stronger hair"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Alvero Hair Solutions | Nature-led care for stronger hair",
    description: "Alvero Hair Solutions — effective, high-quality hair care inspired by nature.",
    images: [`${siteUrl}/media/alvero-share.png`]
  }
};

export default function Page() {
  return <HomePage />;
}
