"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, ChevronRightIcon, LeafIcon, PlayIcon, RefreshIcon, ShieldIcon, StarIcon, TruckIcon } from "@/components/icons";
import { concernGroups, formatPrice, getProductsByConcern, products, promiseItems, reviews, ugcImages } from "@/lib/data";
import { localizedProduct } from "@/lib/localize";
import { ProductGrid } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { useLanguage } from "@/components/language-context";

const heroSlides = [
  {
    image: "/media/alvero-cover.webp",
    en: { kicker: "ALVERO HAIR SOLUTIONS", title: "Nature-led care for", italic: "stronger, healthier hair.", copy: "Effective, high-quality hair solutions designed to restore confidence and enhance your natural beauty." },
    bn: { kicker: "ALVERO হেয়ার সলিউশনস", title: "প্রকৃতির যত্নে", italic: "আরও শক্ত, স্বাস্থ্যকর চুল।", copy: "আপনার প্রাকৃতিক সৌন্দর্য ও আত্মবিশ্বাস ফিরিয়ে আনতে কার্যকর, উচ্চমানের হেয়ার কেয়ার সমাধান।" }
  },
  {
    image: "/media/hair-oil-nature.webp",
    en: { kicker: "NATURE IN EVERY DROP", title: "A slower ritual for", italic: "beautifully cared-for hair.", copy: "Meet the botanical hair oil that brings warmth, nourishment and a little luxury to your everyday care." },
    bn: { kicker: "প্রতিটি ফোঁটায় প্রকৃতি", title: "চুলের জন্য একটি", italic: "সুন্দর যত্নের রুটিন।", copy: "আপনার প্রতিদিনের যত্নে পুষ্টি, কোমলতা ও প্রকৃতির সুন্দর ছোঁয়া যোগ করুন।" }
  },
  {
    image: "/media/complete-combo.webp",
    en: { kicker: "THE COMPLETE RITUAL", title: "Nourish. Cleanse.", italic: "Refresh.", copy: "Three thoughtful steps, one easy routine — designed for hair that deserves consistent care." },
    bn: { kicker: "সম্পূর্ণ রিচুয়াল", title: "পুষ্টি দিন। পরিষ্কার করুন।", italic: "সতেজ রাখুন।", copy: "তিনটি সহজ ধাপ, একটি সুন্দর রুটিন—নিয়মিত যত্নের জন্য তৈরি।" }
  },
  {
    image: "/media/hair-toner.webp",
    en: { kicker: "A FRESH STEP", title: "Let your routine", italic: "feel refreshingly simple.", copy: "Add a light botanical mist to your wash-day rhythm and make care easier to return to." },
    bn: { kicker: "একটি সতেজ ধাপ", title: "আপনার রুটিন হোক", italic: "আরও সহজ ও সতেজ।", copy: "ওয়াশ ডে-এর রুটিনে একটি হালকা বোটানিক্যাল মিস্ট যোগ করুন।" }
  }
];

export function HomePage() {
  const { language, t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const [flash, setFlash] = useState(false);
  const slide = heroSlides[activeSlide];
  const content = slide[language];

  function changeSlide(next: number) {
    setFlash(true);
    window.setTimeout(() => { setActiveSlide((next + heroSlides.length) % heroSlides.length); setFlash(false); }, 190);
  }

  useEffect(() => {
    const timer = window.setInterval(() => changeSlide(activeSlide + 1), 6500);
    return () => window.clearInterval(timer);
  }, [activeSlide]);

  const bestSellers = products.slice(0, 8);
  const allTimeBest = [products[5], products[0], products[4], products[3], products[6], products[7]];

  return <>
    <section className="hero-section" id="top">
      <div key={slide.image} className="hero-background" style={{ backgroundImage: `url('${slide.image}')` }} />
      <div className="hero-overlay" />
      <div className={`hero-flash ${flash ? "active" : ""}`} />
      <div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" />
      <div className="hero-content page-shell hero-content-animated">
        <p className="hero-kicker"><LeafIcon size={16} /> {content.kicker} <LeafIcon size={16} /></p>
        <h1>{content.title}<em>{content.italic}</em></h1>
        <p className="hero-copy">{content.copy}</p>
        <div className="hero-actions"><Link className="btn btn-primary" href="/category/haircare">{t("hero.shop")} <ArrowRightIcon size={15} /></Link><Link className="btn btn-outline" href="#reviews">{t("hero.stories")}</Link></div>
        <div className="hero-stats"><div><strong>100%</strong><span>{t("hero.carefully")}</span></div><div><strong>200ml</strong><span>{t("hero.every")}</span></div><div><strong>COD</strong><span>{t("hero.across")}</span></div></div>
      </div>
      <div className="hero-carousel-controls"><button type="button" aria-label="Previous hero banner" onClick={() => changeSlide(activeSlide - 1)}><ArrowLeftIcon size={14} /></button>{heroSlides.map((item, index) => <button type="button" key={item.image} aria-label={`Show banner ${index + 1}`} className={index === activeSlide ? "active" : ""} onClick={() => changeSlide(index)} />)}<button type="button" aria-label="Next hero banner" onClick={() => changeSlide(activeSlide + 1)}><ArrowRightIcon size={14} /></button></div>
      <div className="hero-scroll"><span /> scroll to explore</div>
    </section>

    <section className="section section-white" id="shop"><div className="page-shell"><SectionHeading eyebrow={t("home.essentials")} title={t("home.mustHave")} description={t("home.mustHaveDesc")} /><ProductGrid products={bestSellers} variant="tile" /><div className="section-action"><Link className="btn btn-outline-green" href="/category/haircare">{t("home.viewHaircare")} <ArrowRightIcon size={15} /></Link></div></div></section>

    <section className="section section-mint" id="packages"><div className="page-shell"><SectionHeading eyebrow={t("home.complete")} title={t("home.rituals")} description={t("home.ritualsDesc")} /><ProductGrid products={allTimeBest} /><div className="section-action"><Link className="btn btn-outline-green" href="/category/packages">{t("home.explorePackages")} <ArrowRightIcon size={15} /></Link></div></div></section>

    <section className="brand-banner-section"><div className="page-shell brand-banner-grid"><div className="brand-banner-copy"><p className="eyebrow eyebrow-light">{t("home.approach")}</p><h2>{t("home.bannerTitle")} <em>{t("home.bannerItalic")}</em></h2><p>{t("home.bannerCopy")}</p><Link className="btn btn-cream" href="/category/packages">{t("home.shopRitual")} <ArrowRightIcon size={15} /></Link></div><div className="brand-banner-image"><img src="/media/alvero-cover.webp" alt="Alvero Hair Solutions — advanced care for stronger, healthier hair" onError={(event) => { event.currentTarget.src = "/media/alvero-cover.webp"; }} /></div></div></section>

    <section className="section section-neutral" id="concerns"><div className="page-shell"><ConcernFinder /></div></section>
    <ResultsSection />
    <section className="promise-strip-section"><div className="page-shell promise-strip">{promiseItems.map((item) => <div key={item.title} className="promise-item"><PromiseIcon name={item.icon} /><div><strong>{language === "bn" ? (item.title === "Botanical Care" ? "বোটানিক্যাল কেয়ার" : item.title === "Fast Delivery" ? "দ্রুত ডেলিভারি" : item.title === "Quality First" ? "কোয়ালিটি ফার্স্ট" : "সহজ সাপোর্ট") : item.title}</strong><span>{language === "bn" ? (item.text === "Nature-inspired ingredients" ? "প্রকৃতি-অনুপ্রাণিত উপাদান" : item.text === "Across Bangladesh" ? "বাংলাদেশজুড়ে" : item.text === "Carefully packed orders" ? "যত্ন নিয়ে প্যাক করা অর্ডার" : "প্রয়োজনে পাশে আছি") : item.text}</span></div></div>)}</div></section>
    <section className="section section-white home-ugc-section"><div className="page-shell"><SectionHeading eyebrow={t("home.madeFor")} title={t("home.careLooks")} description={t("home.careLooksDesc")} /><div className="home-ugc-grid">{ugcImages.slice(0, 4).map((image, index) => <div key={image} className={`home-ugc-item home-ugc-${index + 1}`}><img src={image} alt="Alvero hair care botanical visual" loading="lazy" /></div>)}</div></div></section>
  </>;
}

function PromiseIcon({ name }: { name: string }) {
  if (name === "truck") return <span className="promise-icon"><TruckIcon size={18} /></span>;
  if (name === "shield") return <span className="promise-icon"><ShieldIcon size={18} /></span>;
  if (name === "refresh") return <span className="promise-icon"><CheckIcon size={18} /></span>;
  return <span className="promise-icon"><LeafIcon size={18} /></span>;
}

export function ConcernFinder() {
  const [active, setActive] = useState(concernGroups[0].id);
  const { language, t } = useLanguage();
  const concern = concernGroups.find((item) => item.id === active) ?? concernGroups[0];
  const visible = getProductsByConcern(concern.match).slice(0, 4);
  return <div className="concern-finder"><SectionHeading eyebrow={t("home.personalised")} title={t("home.findRitual")} description={t("home.findRitualDesc")} /><div className="concern-tabs" role="tablist" aria-label="Hair concerns">{concernGroups.map((item) => <button key={item.id} className={active === item.id ? "active" : ""} type="button" onClick={() => setActive(item.id)}>{language === "bn" ? ({ "Hair Fall": "চুল পড়া", "Dry Hair": "শুষ্ক চুল", "Scalp Care": "স্ক্যাল্প কেয়ার", "Hair Growth": "চুলের বৃদ্ধি", "Daily Care": "প্রতিদিনের যত্ন" } as Record<string, string>)[item.label] : item.label}</button>)}</div><div className="concern-products" key={active}><ProductGrid products={visible} variant="compact" /></div><div className="section-action"><Link className="text-link" href="/category/haircare">{t("home.exploreAll")} <ArrowRightIcon size={14} /></Link></div></div>;
}

function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  function updatePosition(clientX: number) { const rect = ref.current?.getBoundingClientRect(); if (!rect) return; setPosition(Math.min(96, Math.max(4, ((clientX - rect.left) / rect.width) * 100))); }
  return <div ref={ref} className="before-after" onPointerDown={(event) => { setDragging(true); updatePosition(event.clientX); ref.current?.setPointerCapture(event.pointerId); }} onPointerMove={(event) => { if (dragging) updatePosition(event.clientX); }} onPointerUp={() => setDragging(false)} onPointerCancel={() => setDragging(false)}><img src="/media/before-after.webp" alt="Alvero hair transformation before and after" /><div className="before-after-after" style={{ clipPath: `inset(0 0 0 ${position}%)` }}><img src="/media/hair-oil-botanical.webp" alt="Alvero botanical hair care result" /></div><div className="ba-label ba-before-label">Before</div><div className="ba-label ba-after-label">After</div><div className="ba-line" style={{ left: `${position}%` }}><span className="ba-knob"><ChevronRightIcon size={14} /><ChevronRightIcon size={14} /></span></div><div className="ba-caption ba-caption-left">Dry · Rough · Dull</div><div className="ba-caption ba-caption-right">Smooth · Silky · Radiant</div></div>;
}

export function ResultsSection() {
  const { t } = useLanguage();
  return <section className="section section-results" id="reviews"><div className="page-shell"><SectionHeading eyebrow={t("home.realStories")} title={t("home.testimonials")} description={t("home.testimonialsDesc")} /><div className="results-grid"><div className="results-visual"><BeforeAfterSlider /><div className="result-stats"><span><i className="dot dot-green" /> {t("home.softer")}</span><span><i className="dot dot-gold" /> {t("home.calmer")}</span></div><Link className="btn btn-primary" href="/category/packages">{t("home.shopRitualShort")} <ArrowRightIcon size={15} /></Link><div className="video-review-card"><span className="play-button"><PlayIcon size={15} /></span><div><strong>{t("home.watchStories")}</strong><span>{t("home.realRoutines")}</span></div><Link href="#reviews" aria-label={t("home.seeAllStories")}><ArrowRightIcon size={16} /></Link></div></div><div className="review-column"><div className="review-column-head"><h3>{t("home.ourCustomers")}</h3><span className="rating-pill"><StarIcon size={13} /> 4.8 / 5</span></div><div className="review-scroll">{reviews.slice(0, 6).map((review) => <article className="review-card" key={review.name}><div className="review-card-head"><span className="review-avatar" style={{ background: review.accent }}>{review.initials}</span><div><strong>{review.name}</strong><span className="verified-badge"><CheckIcon size={10} /> Verified</span><span className="review-date">{review.date} · {t("footer.demo")}</span></div><span className="stars">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span></div><p>“{review.text}”</p></article>)}</div><Link className="btn btn-outline-green" href="#reviews">{t("home.seeAllStories")} <ArrowRightIcon size={14} /></Link></div></div></div></section>;
}

export function ReviewWall({ title, limit = reviews.length }: { title?: string; limit?: number }) {
  const { language, t } = useLanguage();
  const visible = reviews.slice(0, limit);
  return <div className="review-wall"><div className="review-wall-head"><h2>{title ?? (language === "bn" ? "কাস্টমার স্টোরি" : "What our customers say")}</h2><div className="wall-rating"><strong>4.8</strong><span>★★★★★</span><small>{language === "bn" ? "কাস্টমার স্টোরি" : "Customer stories"}</small></div></div><div className="rating-bars"><div className="rating-bars-score"><strong>4.8</strong><span>{language === "bn" ? "গড় রেটিং" : "Average rating"}</span></div><div className="bars">{[5, 4, 3, 2, 1].map((star, index) => <div className="rating-bar" key={star}><span>{star}★</span><i><b style={{ width: `${[92, 62, 24, 10, 5][index]}%` }} /></i><small>{[98, 65, 20, 8, 4][index]}</small></div>)}</div></div><div className="review-wall-grid">{visible.map((review) => <article className="wall-review" key={review.name}><div className="wall-review-head"><span className="review-avatar" style={{ background: review.accent }}>{review.initials}</span><div><strong>{review.name}</strong><span className="verified-badge"><CheckIcon size={10} /> Verified</span><span className="review-date">{review.date}</span></div><span className="stars">{"★".repeat(review.rating)}</span></div><p>{review.text}</p><span className="story-label">{language === "bn" ? "কাস্টমার স্টোরি" : "Customer story"}</span></article>)}</div></div>;
}

export function RelatedProducts({ items = products.slice(0, 5) }: { items?: typeof products }) {
  const { language } = useLanguage();
  return <div className="related-row">{items.map((product) => <Link className="related-card" href={`/product/${product.slug}`} key={product.slug}><img src={product.image} alt="" /><span>{localizedProduct(product, language).name}</span><strong>{formatPrice(product.price)}</strong></Link>)}</div>;
}
