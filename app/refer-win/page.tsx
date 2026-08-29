import type { Metadata } from "next";
import { ReferWinView } from "@/components/refer-view";

export const metadata: Metadata = {
  title: "Refer & Win",
  description: "Refer Alvero Hair Solutions to your friends and win ৳300 free gift on your next order.",
  openGraph: {
    title: "Refer & Win ৳300 Free Gift | Alvero Hair Solutions",
    description: "Refer Alvero Hair Solutions to your friends and get a ৳300 free gift on your next order.",
    images: [{ url: "/media/alvero-cover.webp", width: 1200, height: 630, alt: "Alvero Refer and Win" }]
  },
  twitter: { card: "summary_large_image", images: ["/media/alvero-cover.webp"] }
};

export default function ReferWinPage() {
  return <ReferWinView />;
}
