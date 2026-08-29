"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRightIcon, CheckIcon, ClockIcon, ChevronRightIcon, MinusIcon, PlusIcon, RefreshIcon, ShieldIcon, StarIcon, TruckIcon } from "@/components/icons";
import { formatPrice, products, reviews, type Product } from "@/lib/data";
import { localizedProduct } from "@/lib/localize";
import { ReviewWall, RelatedProducts } from "@/components/home-sections";
import { useCart } from "@/components/cart-context";
import { useLanguage } from "@/components/language-context";

function CategoryName({ category }: { category: string }) {
  const { language } = useLanguage();
  if (language === "en") return <>{category}</>;
  const names: Record<string, string> = { "Hair Oil": "হেয়ার অয়েল", "Hair Toner": "হেয়ার টোনার", Shampoo: "শ্যাম্পু", Packages: "প্যাকেজ", Haircare: "হেয়ার কেয়ার" };
  return <>{names[category] ?? category}</>;
}

function SaleTimer() {
  const [time, setTime] = useState({ days: 0, hours: 4, minutes: 48, seconds: 32 });
  const { language, t } = useLanguage();
  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime((current) => {
        let { days, hours, minutes, seconds } = current;
        if (seconds > 0) seconds -= 1;
        else if (minutes > 0) { minutes -= 1; seconds = 59; }
        else if (hours > 0) { hours -= 1; minutes = 59; seconds = 59; }
        else if (days > 0) { days -= 1; hours = 23; minutes = 59; seconds = 59; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);
  const labels = language === "bn" ? ["দিন", "ঘণ্টা", "মিনিট", "সেকেন্ড"] : ["days", "hrs", "min", "sec"];
  return <div className="product-sale-box"><div className="sale-box-top"><span><ClockIcon size={13} /> {t("product.saleEnds")}</span><span>{t("product.limited")}</span></div><div className="sale-countdown">{[[time.days, labels[0]], [time.hours, labels[1]], [time.minutes, labels[2]], [time.seconds, labels[3]]].map(([value, label]) => <div key={label as string}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}</div></div>;
}

function ProductGallery({ product }: { product: Product }) {
  const images = product.gallery?.length ? product.gallery : [product.image];
  const [active, setActive] = useState(0);
  const { language } = useLanguage();
  return <div className="product-gallery"><div className="product-gallery-main"><img src={images[active]} alt={`${localizedProduct(product, language).name} — ${language === "bn" ? "ছবি" : "image"} ${active + 1}`} /></div><div className="product-gallery-thumbs">{images.map((image, index) => <button type="button" className={active === index ? "active" : ""} key={image} onClick={() => setActive(index)}><img src={image} alt="" /></button>)}</div></div>;
}

function PurchasePanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { add } = useCart();
  const { language, t } = useLanguage();
  const router = useRouter();
  const copy = localizedProduct(product, language);
  const decrease = language === "bn" ? "পরিমাণ কমান" : "Decrease quantity";
  const increase = language === "bn" ? "পরিমাণ বাড়ান" : "Increase quantity";
  return <>
    <div className="product-card-topline"><span><CategoryName category={product.category} /></span><span className="card-stars"><StarIcon size={12} /> {product.rating.toFixed(1)} ({product.reviewCount})</span></div>
    <h1>{copy.name}</h1>
    <p className="product-blurb">{copy.blurb}</p>
    <div className="price-row"><span className="price">{formatPrice(product.price)}</span>{product.oldPrice && <span className="old-price">{formatPrice(product.oldPrice)}</span>}{product.discount && <span className="discount-inline">{product.discount}</span>}</div>
    <SaleTimer />
    <div className="purchase-row"><div className="quantity-control"><button type="button" aria-label={decrease} onClick={() => setQuantity((value) => Math.max(1, value - 1))}><MinusIcon size={14} /></button><span>{quantity}</span><button type="button" aria-label={increase} onClick={() => setQuantity((value) => value + 1)}><PlusIcon size={14} /></button></div><button type="button" className="add-to-cart" onClick={() => add(product, quantity)}>{t("product.add")} <ArrowRightIcon size={14} /></button></div>
    <button type="button" className="btn btn-primary buy-now" onClick={() => { add(product, quantity); router.push("/cart"); }}>{t("product.buyNow")} <ArrowRightIcon size={15} /></button>
    <div className="trust-row"><span><TruckIcon size={14} /> {t("product.cash")}</span><span><ShieldIcon size={14} /> {t("product.quality")}</span><span><RefreshIcon size={14} /> {t("product.support")}</span></div>
    <details className="description-details" open><summary className="description-accordion">{t("product.description")} <PlusIcon size={15} /></summary><div className="product-description"><p>{copy.description}</p><ul className="feature-list">{copy.features.map((feature) => <li key={feature}><CheckIcon size={14} />{feature}</li>)}</ul></div></details>
  </>;
}

function ReviewHighlights() {
  const { language } = useLanguage();
  return <div className="review-highlights">{reviews.slice(0, 7).map((review) => <div className="highlight-card" key={review.name}><img src={review.image ?? "/media/complete-combo.webp"} alt={language === "bn" ? "কাস্টমার স্টোরি" : "Customer story visual"} /><div><strong>{review.name}</strong><span className="verified-badge"><CheckIcon size={10} /> Verified</span><span className="highlight-stars">{"★".repeat(review.rating)}</span></div></div>)}</div>;
}

function ServiceStrip() {
  const { language, t } = useLanguage();
  const items = language === "bn" ? [["ফ্রি শিপিং", "সম্পূর্ণ প্যাকেজে"], ["৩০ দিনের সাপোর্ট", "আমরা পাশে আছি"], ["দ্রুত ডেলিভারি", "বাংলাদেশজুড়ে"], ["নিরাপদ চেকআউট", "ক্যাশ অন ডেলিভারি"]] : [["Free Shipping", "on complete packages"], ["30 Days Support", "we're here to help"], ["Fast Delivery", "across Bangladesh"], ["Secure Checkout", "Cash on Delivery"]];
  return <div className="product-service-strip"><div><TruckIcon size={17} /><span><strong>{items[0][0]}</strong>{items[0][1]}</span></div><div><RefreshIcon size={17} /><span><strong>{items[1][0]}</strong>{items[1][1]}</span></div><div><ClockIcon size={17} /><span><strong>{items[2][0]}</strong>{items[2][1]}</span></div><div><ShieldIcon size={17} /><span><strong>{items[3][0]}</strong>{items[3][1]}</span></div></div>;
}

export function ProductDetail({ product }: { product: Product }) {
  const related = useMemo(() => products.filter((item) => item.slug !== product.slug).slice(0, 5), [product.slug]);
  const { language, t } = useLanguage();
  const copy = localizedProduct(product, language);
  return <>
    <div className="product-page"><div className="page-shell"><div className="breadcrumb"><Link href="/">{language === "bn" ? "হোম" : "Home"}</Link><ChevronRightIcon size={13} /><Link href={`/category/${product.categorySlug}`}><CategoryName category={product.category} /></Link><ChevronRightIcon size={13} /><span>{copy.name}</span></div><div className="product-hero"><ProductGallery product={product} /><div className="product-info"><PurchasePanel product={product} /></div></div><div className="product-trust"><ServiceStrip /></div></div></div>
    <section className="product-reviews-section" id="reviews"><div className="page-shell"><div className="section-heading"><p className="eyebrow">{t("product.realStories")}</p><h2>{t("product.customerReviews")}</h2><p className="section-description">{language === "bn" ? "সামাজিক প্রমাণ কীভাবে প্রোডাক্ট অভিজ্ঞতার সঙ্গে সুন্দরভাবে যুক্ত হতে পারে—কিছু ডেমো স্টোরি।" : "A few demo customer stories to show how social proof can sit naturally inside the product experience."}</p></div><ReviewWall limit={8} /><ReviewHighlights /><div className="review-section-action"><Link className="btn btn-outline-green" href="#reviews">{t("product.writeReview")} <ArrowRightIcon size={14} /></Link></div></div></section>
    <section className="product-related-section"><div className="page-shell"><div className="related-head"><div><p className="eyebrow">{t("product.complete")}</p><h2>{t("product.youLike")}</h2></div><Link className="text-link" href="/category/haircare">{t("product.viewAll")} <ArrowRightIcon size={14} /></Link></div><RelatedProducts items={related} /></div></section>
    <section className="ugc-section"><div className="page-shell"><div className="section-heading"><p className="eyebrow">{language === "bn" ? "বাস্তব পণ্য, বাস্তব যত্ন" : "Real products, real care"}</p><h2>{language === "bn" ? "Alvero হেয়ার কেয়ার লাভারদের পছন্দ" : "Trusted by Alvero hair-care lovers"}</h2></div><div className="ugc-wall">{["/media/complete-combo.webp", "/media/before-after.webp", "/media/hair-oil-botanical.webp", "/media/shampoo.webp", "/media/hair-toner.webp", "/media/hair-care-benefits.webp"].map((image) => <div className="ugc-wall-item" key={image}><img src={image} alt="Alvero hair care story" loading="lazy" /></div>)}</div></div></section>
  </>;
}
