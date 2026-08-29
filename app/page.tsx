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
        url: "/media/alvero-cover.webp",
        width: 1200,
        height: 630,
        alt: "Alvero Hair Solutions — Nature-led care for stronger hair"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Alvero Hair Solutions | Nature-led care for stronger hair",
    description: "Alvero Hair Solutions — effective, high-quality hair care inspired by nature.",
    images: ["/media/alvero-cover.webp"]
  }
};

export default function Page() {
  return <HomePage />;
}
