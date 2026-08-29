import type { Metadata } from "next";
import { CheckoutPage } from "@/components/checkout";

export const metadata: Metadata = {
  title: "Cart & Checkout",
  description: "Complete your Alvero Hair Solutions order with Cash on Delivery across Bangladesh.",
  openGraph: {
    title: "Cart & Checkout | Alvero Hair Solutions",
    description: "Complete your Alvero Hair Solutions order with Cash on Delivery across Bangladesh.",
    images: [{ url: "/media/alvero-cover.webp", width: 1200, height: 630, alt: "Alvero Hair Solutions Checkout" }]
  },
  twitter: { card: "summary_large_image", images: ["/media/alvero-cover.webp"] }
};

export default function CartPage() {
  return <CheckoutPage />;
}
