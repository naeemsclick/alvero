import type { Metadata } from "next";
import { TrackView } from "@/components/track-view";

export const metadata: Metadata = {
  title: "Track My Order",
  description: "Track your Alvero Hair Solutions order status easily.",
  openGraph: {
    title: "Track My Order | Alvero Hair Solutions",
    description: "Check your Alvero Hair Solutions package delivery status online.",
    images: [{ url: "/media/alvero-cover.webp", width: 1200, height: 630, alt: "Alvero Hair Solutions Order Tracking" }]
  },
  twitter: { card: "summary_large_image", images: ["/media/alvero-cover.webp"] }
};

export default function TrackPage() {
  return <TrackView />;
}
