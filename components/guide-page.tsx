"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage, LanguageToggle } from "@/components/language-context";
import { ArrowLeftIcon, ArrowRightIcon, ChevronDownIcon, ChevronRightIcon, LeafIcon } from "@/components/icons";
import { guideFaqs, guidePosts, getGuidePost, type GuideCopy, type GuidePost } from "@/lib/guide";
import { RelatedProducts } from "@/components/home-sections";

function copyFor(item: { en: GuideCopy; bn: GuideCopy }, language: "en" | "bn"): GuideCopy {
  return item[language];
}

export function GuidePage() {
  const { language, t } = useLanguage();
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const pageCount = Math.ceil(guidePosts.length / pageSize);
  const visiblePosts = guidePosts.slice((page - 1) * pageSize, page * pageSize);
  return <div className="guide-page"><div className="page-shell guide-shell"><div className="guide-hero"><p className="eyebrow">{t("guide.kicker")}</p><h1>{t("guide.title")}</h1><p className="guide-subtitle">{t("guide.subtitle")}</p><p className="guide-description">{t("guide.desc")}</p><div className="guide-language-row"><span>{language === "bn" ? "ভাষা বেছে নিন" : "Choose language"}</span><LanguageToggle /></div></div><div className="guide-grid">{visiblePosts.map((post) => <GuideCard key={post.slug} post={post} language={language} readLabel={t("guide.read")} />)}</div><nav className="guide-pagination" aria-label="Guide pages"><button type="button" disabled={page === 1} onClick={() => setPage((current) => Math.max(1, current - 1))}><ArrowLeftIcon size={14} /> {language === "bn" ? "আগের পেজ" : "Previous page"}</button><div>{Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => <button type="button" key={number} className={page === number ? "active" : ""} aria-current={page === number ? "page" : undefined} onClick={() => setPage(number)}>{number}</button>)}</div><button type="button" disabled={page === pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))}>{language === "bn" ? "পরের পেজ" : "Next page"} <ArrowRightIcon size={14} /></button></nav><GuideFaq /><div className="guide-products"><div className="guide-products-head"><div><p className="eyebrow">{language === "bn" ? "Alvero থেকে সাহায্য" : "Helpful from Alvero"}</p><h2>{language === "bn" ? "আপনার রুটিনের জন্য পণ্য" : "Products for your ritual"}</h2></div><Link className="text-link" href="/category/haircare">{language === "bn" ? "সব দেখুন" : "View all"} <ArrowRightIcon size={14} /></Link></div><RelatedProducts /></div></div></div>;
}

function GuideCard({ post, language, readLabel }: { post: GuidePost; language: "en" | "bn"; readLabel: string }) {
  const copy = copyFor(post, language) as GuideCopy;
  return <Link href={`/guide/${post.slug}`} className="guide-card"><div className="guide-card-image"><img src={post.image} alt={copy.title} /><span>{post.category} · {post.readTime}</span></div><div className="guide-card-body"><div className="guide-card-copy"><h2>{copy.title}</h2><p>{copy.excerpt}</p></div><span className="guide-read">{readLabel} <ArrowRightIcon size={14} /></span></div></Link>;
}

function GuideFaq() {
  const { language, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return <section className="guide-faq"><div className="section-heading"><p className="eyebrow">{t("guide.faq")}</p><h2>{t("guide.faq")}</h2><p className="section-description">{t("guide.faqDesc")}</p></div><div className="faq-list">{guideFaqs.map((faq, index) => { const open = openIndex === index; return <div className={`faq-item ${open ? "open" : ""}`} key={faq.en}><button type="button" className="faq-question" aria-expanded={open} onClick={() => setOpenIndex(open ? null : index)}><span>{language === "bn" ? faq.bn : faq.en}</span><ChevronDownIcon size={15} /></button><div className="faq-answer" aria-hidden={!open}><div><p>{language === "bn" ? faq.answerBn : faq.answerEn}</p></div></div></div>; })}</div></section>;
}

export function GuideArticle({ post }: { post: GuidePost }) {
  const { language, t } = useLanguage();
  const copy = copyFor(post, language) as GuideCopy;
  const currentIndex = guidePosts.findIndex((item) => item.slug === post.slug);
  const previous = guidePosts[(currentIndex - 1 + guidePosts.length) % guidePosts.length];
  const next = guidePosts[(currentIndex + 1) % guidePosts.length];
  return <div className="guide-article-page"><div className="page-shell guide-article-shell"><div className="breadcrumb"><Link href="/">Home</Link><ChevronRightIcon size={13} /><Link href="/guide">{t("nav.careGuide")}</Link><ChevronRightIcon size={13} /><span>{copy.title}</span></div><article className="guide-article"><header className="guide-article-header"><p className="eyebrow">{post.category} · {post.readTime}</p><h1>{copy.title}</h1><p className="guide-article-intro">{copy.intro}</p><div className="article-language-row"><span>{language === "bn" ? "ভাষা পরিবর্তন করুন" : "Read this guide in"}</span><LanguageToggle /></div></header><div className="article-cover"><img src={post.image} alt={copy.title} /></div><div className="article-content">{copy.blocks.map((block, index) => <section key={`${block.heading}-${index}`}>{block.heading && <h2>{block.heading}</h2>}{block.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{block.bullets && <ul>{block.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}<div className="article-note"><LeafIcon size={18} /><p>{language === "bn" ? "মনে রাখবেন: চুল ও স্ক্যাল্পের প্রয়োজন ব্যক্তিভেদে আলাদা। অস্বস্তি বা দীর্ঘস্থায়ী সমস্যা থাকলে যোগ্য বিশেষজ্ঞের পরামর্শ নিন।" : "Remember: hair and scalp needs vary from person to person. Seek qualified professional advice for persistent or uncomfortable concerns."}</p></div></div><GuideFaq /><div className="article-help"><div><p className="eyebrow">{language === "bn" ? "রুটিনের সঙ্গে মিলিয়ে নিন" : "Make it part of your ritual"}</p><h2>{language === "bn" ? "Alvero-এর যে পণ্যগুলো সাহায্য করতে পারে" : "Alvero products that can help"}</h2></div><RelatedProducts /></div><nav className="article-pagination" aria-label="Guide pagination"><Link href={`/guide/${previous.slug}`}><ArrowLeftIcon size={15} /><span><small>{t("guide.previous")}</small><strong>{copyFor(previous, language).title}</strong></span></Link><Link href={`/guide/${next.slug}`}><span className="next-copy"><small>{t("guide.next")}</small><strong>{copyFor(next, language).title}</strong></span><ArrowRightIcon size={15} /></Link></nav></article></div></div>;
}
