"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon, ChevronRightIcon } from "@/components/icons";
import { categories, type Product } from "@/lib/data";
import { ProductGrid } from "@/components/product-card";
import { useLanguage } from "@/components/language-context";
import { fetchWpProducts } from "@/lib/api";

function CategorySkeleton() {
  return (
    <div className="product-grid" style={{ opacity: 0.6 }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="product-card" style={{ height: 350, background: "rgba(0,0,0,0.03)", borderRadius: 12 }} />
      ))}
    </div>
  );
}

export function CategoryView({ slug }: { slug: string }) {
  const { language, t } = useLanguage();
  const [wpProducts, setWpProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(false);
    fetchWpProducts()
      .then((items) => {
        if (isMounted) {
          setWpProducts(items || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error loading category products:", err);
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      });
    return () => { isMounted = false; };
  }, [slug]);

  const knownCategory = categories.find((item) => item.slug === slug);
  const categoryLabel = knownCategory
    ? (language === "bn"
        ? ({ Haircare: "হেয়ার কেয়ার", "Hair Oil": "হেয়ার অয়েল", "Hair Toner": "হেয়ার টোনার", Shampoo: "শ্যাম্পু", Packages: "প্যাকেজ" } as Record<string, string>)[knownCategory.label] || knownCategory.label
        : knownCategory.label)
    : slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  const isAllCategory = slug === "haircare" || slug === "all";

  const categoryProducts = isAllCategory
    ? wpProducts
    : wpProducts.filter((p) => {
        if (Array.isArray(p.categories) && p.categories.some((c) => c.slug === slug || c.slug.toLowerCase() === slug.toLowerCase() || c.name.toLowerCase() === slug.replace(/-/g, ' '))) {
          return true;
        }
        if (p.categorySlug === slug) return true;
        if (p.category && p.category.toLowerCase().replace(/\s+/g, '-') === slug) return true;
        if (p.category && p.category.toLowerCase().includes(slug.replace(/-/g, ' '))) return true;
        return false;
      });

  return (
    <div className="collection-page">
      <div className="page-shell">
        <div className="breadcrumb">
          <Link href="/">{language === "bn" ? "হোম" : "Home"}</Link>
          <ChevronRightIcon size={13} />
          <span>{categoryLabel}</span>
        </div>
        <div className="collection-head">
          <div className="collection-title">
            <h1>{categoryLabel}</h1>
            <p>{loading ? "..." : categoryProducts.length} {language === "bn" ? "টি পণ্য, আপনার রুটিনের জন্য বাছাই করা" : t("collection.essentials")}</p>
          </div>
          <div className="collection-tools">
            <span>{t("collection.browse")}</span>
            <select
              defaultValue={slug}
              aria-label={t("collection.browse")}
              onChange={(event) => { window.location.href = `/category/${event.target.value}`; }}
            >
              <option value={slug}>{categoryLabel}</option>
              {categories.filter((item) => item.slug !== slug).map((item) => (
                <option value={item.slug} key={item.slug}>
                  {language === "bn" ? ({ Haircare: "হেয়ার কেয়ার", "Hair Oil": "হেয়ার অয়েল", "Hair Toner": "হেয়ার টোনার", Shampoo: "শ্যাম্পু", Packages: "প্যাকেজ" } as Record<string, string>)[item.label] : item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="category-pills">
          <Link className={slug === "haircare" ? "active" : ""} href="/category/haircare">{t("collection.allHaircare")}</Link>
          {categories.filter((item) => item.slug !== "haircare").map((item) => (
            <Link className={slug === item.slug ? "active" : ""} href={`/category/${item.slug}`} key={item.slug}>
              {language === "bn" ? ({ Haircare: "হেয়ার কেয়ার", "Hair Oil": "হেয়ার অয়েল", "Hair Toner": "হেয়ার টোনার", Shampoo: "শ্যাম্পু", Packages: "প্যাকেজ" } as Record<string, string>)[item.label] : item.label}
            </Link>
          ))}
        </div>
        {loading ? (
          <CategorySkeleton />
        ) : error ? (
          <div className="collection-empty">{language === "bn" ? "পণ্য লোড করতে সমস্যা হয়েছে।" : "Failed to load products from WooCommerce."}</div>
        ) : categoryProducts.length > 0 ? (
          <ProductGrid products={categoryProducts} />
        ) : (
          <div className="collection-empty">{language === "bn" ? "এই কালেকশনে এখনো কোনো পণ্য নেই।" : "No products in this collection yet."}</div>
        )}
        <div className="collection-bottom-note">
          <span><strong>{t("collection.help")}</strong> {t("collection.start")}</span>
          <Link href="/category/packages">{t("collection.explore")} <ArrowRightIcon size={14} /></Link>
        </div>
      </div>
    </div>
  );
}
