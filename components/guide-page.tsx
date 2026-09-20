"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage, LanguageToggle } from "@/components/language-context";
import { ArrowLeftIcon, ArrowRightIcon, ChevronDownIcon, ChevronRightIcon, LeafIcon } from "@/components/icons";
import { guideFaqs, type GuideCopy } from "@/lib/guide";
import { RelatedProducts } from "@/components/home-sections";
import { fetchWpGuides, fetchWpGuideBySlug } from "@/lib/api";

function copyFor(item: { en: GuideCopy; bn: GuideCopy }, language: "en" | "bn"): GuideCopy {
  return item[language];
}

function GuideSkeleton() {
  return (
    <div className="guide-grid" style={{ opacity: 0.6 }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="guide-card" style={{ height: 320, background: "rgba(0,0,0,0.03)", borderRadius: 12 }} />
      ))}
    </div>
  );
}

export function GuidePage() {
  const { language, t } = useLanguage();
  const [page, setPage] = useState(1);
  const [wpPosts, setWpPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(false);

    fetchWpGuides()
      .then((posts) => {
        if (isMounted) {
          setWpPosts(posts || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching WordPress care guides:", err);
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, []);

  const pageSize = 6;
  const pageCount = Math.ceil(wpPosts.length / pageSize);
  const visiblePosts = wpPosts.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="guide-page">
      <div className="page-shell guide-shell">
        <div className="guide-hero">
          <p className="eyebrow">{t("guide.kicker")}</p>
          <h1>{t("guide.title")}</h1>
          <p className="guide-subtitle">{t("guide.subtitle")}</p>
          <p className="guide-description">{t("guide.desc")}</p>
          <div className="guide-language-row">
            <span>{language === "bn" ? "ভাষা বেছে নিন" : "Choose language"}</span>
            <LanguageToggle />
          </div>
        </div>

        {loading ? (
          <GuideSkeleton />
        ) : error ? (
          <div className="collection-empty">{language === "bn" ? "গাইড লোড করতে সমস্যা হয়েছে।" : "Failed to load care guides."}</div>
        ) : wpPosts.length > 0 ? (
          <div className="guide-grid">
            {visiblePosts.map((post: any) => (
              <GuideCard key={post.slug || post.id} post={post} language={language} readLabel={t("guide.read")} />
            ))}
          </div>
        ) : (
          <div className="collection-empty">{language === "bn" ? "বর্তমানে কোনো হেয়ার কেয়ার গাইড পাওয়া যায়নি।" : "No care guides available at the moment."}</div>
        )}

        {!loading && pageCount > 1 && (
          <nav className="guide-pagination" aria-label="Guide pages">
            <button type="button" disabled={page === 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>
              <ArrowLeftIcon size={14} /> {language === "bn" ? "আগের পেজ" : "Previous page"}
            </button>
            <div>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
                <button type="button" key={number} className={page === number ? "active" : ""} aria-current={page === number ? "page" : undefined} onClick={() => setPage(number)}>
                  {number}
                </button>
              ))}
            </div>
            <button type="button" disabled={page === pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))}>
              {language === "bn" ? "পরের পেজ" : "Next page"} <ArrowRightIcon size={14} />
            </button>
          </nav>
        )}

        <GuideFaq />
        <div className="guide-products">
          <div className="guide-products-head">
            <div>
              <p className="eyebrow">{language === "bn" ? "Alvero থেকে সাহায্য" : "Helpful from Alvero"}</p>
              <h2>{language === "bn" ? "আপনার রুটিনের জন্য পণ্য" : "Products for your ritual"}</h2>
            </div>
            <Link className="text-link" href="/category/haircare">
              {language === "bn" ? "সব দেখুন" : "View all"} <ArrowRightIcon size={14} />
            </Link>
          </div>
          <RelatedProducts />
        </div>
      </div>
    </div>
  );
}

function GuideCard({ post, language, readLabel }: { post: any; language: "en" | "bn"; readLabel: string }) {
  const title = post.title || 'Alvero Care Guide';
  const excerpt = post.excerpt || '';
  const image = post.image || null;
  const category = 'Care Guide';
  const slug = post.slug;

  return (
    <Link href={`/guide/${slug}`} className="guide-card">
      <div className="guide-card-image" style={!image ? { display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f3ef' } : undefined}>
        {image ? (
          <img src={image} alt={title} />
        ) : (
          <div style={{ textAlign: 'center', color: '#888' }}>
            <LeafIcon size={32} />
          </div>
        )}
        <span>{category}</span>
      </div>
      <div className="guide-card-body">
        <div className="guide-card-copy">
          <h2>{title}</h2>
          <p>{excerpt}</p>
        </div>
        <span className="guide-read">
          {readLabel} <ArrowRightIcon size={14} />
        </span>
      </div>
    </Link>
  );
}

function GuideFaq() {
  const { language, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="guide-faq">
      <div className="section-heading">
        <p className="eyebrow">{t("guide.faq")}</p>
        <h2>{t("guide.faq")}</h2>
        <p className="section-description">{t("guide.faqDesc")}</p>
      </div>
      <div className="faq-list">
        {guideFaqs.map((faq, index) => {
          const open = openIndex === index;
          return (
            <div className={`faq-item ${open ? "open" : ""}`} key={faq.en}>
              <button type="button" className="faq-question" aria-expanded={open} onClick={() => setOpenIndex(open ? null : index)}>
                <span>{language === "bn" ? faq.bn : faq.en}</span>
                <ChevronDownIcon size={15} />
              </button>
              <div className="faq-answer" aria-hidden={!open}>
                <div>
                  <p>{language === "bn" ? faq.answerBn : faq.answerEn}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function GuideArticle({ slug, post: initialPost }: { slug?: string; post?: any }) {
  const [article, setArticle] = useState<any>(initialPost || null);
  const [loading, setLoading] = useState(!initialPost);
  const { language, t } = useLanguage();

  useEffect(() => {
    if (!initialPost && slug) {
      let isMounted = true;
      setLoading(true);
      fetchWpGuideBySlug(slug).then((res) => {
        if (isMounted) {
          setArticle(res);
          setLoading(false);
        }
      }).catch(() => {
        if (isMounted) setLoading(false);
      });
      return () => { isMounted = false; };
    }
  }, [slug, initialPost]);

  if (loading) {
    return (
      <div className="guide-article-page" style={{ opacity: 0.6, padding: "80px 0" }}>
        <div className="page-shell guide-article-shell">
          <div style={{ height: 350, background: "rgba(0,0,0,0.03)", borderRadius: 16 }} />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="guide-article-page" style={{ padding: "100px 0", textAlign: "center" }}>
        <div className="page-shell guide-article-shell">
          <h2>{language === "bn" ? "গাইডটি পাওয়া যায়নি" : "Guide Not Found"}</h2>
          <div style={{ marginTop: 24 }}>
            <Link className="btn btn-primary" href="/guide">{language === "bn" ? "সব গাইড দেখুন" : "View All Care Guides"} <ArrowRightIcon size={14} /></Link>
          </div>
        </div>
      </div>
    );
  }

  const title = article.title || article.en?.title || 'Alvero Care Guide';
  const excerpt = article.excerpt || article.en?.excerpt || '';
  const content = article.content || '';
  const image = article.image || null;

  return (
    <div className="guide-article-page">
      <div className="page-shell guide-article-shell">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRightIcon size={13} />
          <Link href="/guide">{t("nav.careGuide")}</Link>
          <ChevronRightIcon size={13} />
          <span>{title}</span>
        </div>
        <article className="guide-article">
          <header className="guide-article-header">
            <p className="eyebrow">Care Guide</p>
            <h1>{title}</h1>
            <p className="guide-article-intro">{excerpt}</p>
            <div className="article-language-row">
              <span>{language === "bn" ? "ভাষা বেছে নিন" : "Language options"}</span>
              <LanguageToggle />
            </div>
          </header>

          {image && (
            <div className="article-cover">
              <img src={image} alt={title} />
            </div>
          )}

          <div className="article-content" dangerouslySetInnerHTML={{ __html: content || `<p>${excerpt}</p>` }} />

          <div className="article-note">
            <LeafIcon size={18} />
            <p>
              {language === "bn"
                ? "মনে রাখবেন: চুল ও স্ক্যাল্পের প্রয়োজন ব্যক্তিভেদে আলাদা। অস্বস্তি বা দীর্ঘস্থায়ী সমস্যা থাকলে যোগ্য বিশেষজ্ঞের পরামর্শ নিন।"
                : "Remember: hair and scalp needs vary from person to person. Seek qualified professional advice for persistent or uncomfortable concerns."}
            </p>
          </div>
          <GuideFaq />
          <div className="article-help">
            <div>
              <p className="eyebrow">{language === "bn" ? "রুটিনের সঙ্গে মিলিয়ে নিন" : "Make it part of your ritual"}</p>
              <h2>{language === "bn" ? "Alvero-এর যে পণ্যগুলো সাহায্য করতে পারে" : "Alvero products that can help"}</h2>
            </div>
            <RelatedProducts />
          </div>
        </article>
      </div>
    </div>
  );
}
