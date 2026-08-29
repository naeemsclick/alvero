import type { Metadata } from "next";
import { GuidePage } from "@/components/guide-page";

export const metadata: Metadata = {
  title: "Hair Care Guide | Alvero Hair Solutions",
  description: "Real, simple hair-care tips — চুলের যত্নের সহজ গাইড।",
  openGraph: {
    title: "Hair Care Guide | Alvero Hair Solutions",
    description: "Real, simple hair-care tips — চুলের যত্নের সহজ গাইড।",
    images: [{ url: "/media/hair-care-benefits.webp", width: 1254, height: 1254, alt: "Alvero Hair Care Guide" }]
  },
  twitter: { card: "summary_large_image", images: ["/media/hair-care-benefits.webp"] }
};

export default function GuideLandingPage() {
  return <GuidePage />;
}
