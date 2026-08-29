import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import { LanguageProvider } from "@/components/language-context";
import { SiteHeader, CartDrawer, SiteFooter } from "@/components/site-chrome";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alvero.pages.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Alvero Hair Solutions | Nature-led care for stronger hair",
    template: "%s | Alvero Hair Solutions"
  },
  description:
    "Alvero Hair Solutions — effective, high-quality hair care inspired by nature. Shop hair oil, shampoo, hair toner and complete care combos with Cash on Delivery across Bangladesh.",
  keywords: ["Alvero Hair Solutions", "hair oil Bangladesh", "hair toner", "hair care combo", "Cash on Delivery"],
  icons: { icon: "/icon.png", shortcut: "/icon.png", apple: "/icon.png" },
  openGraph: {
    title: "Alvero Hair Solutions | Nature-led care for stronger hair",
    description: "Alvero Hair Solutions — effective, high-quality hair care inspired by nature. Shop hair oil, shampoo, hair toner & complete care combos.",
    url: siteUrl,
    siteName: "Alvero Hair Solutions",
    locale: "en_US",
    type: "website",
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
    description: "Effective, high-quality hair care inspired by nature. Cash on Delivery across Bangladesh.",
    images: ["/media/alvero-cover.webp"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <CartProvider>
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
            <CartDrawer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
