"use client";

import Link from "next/link";
import { ArrowRightIcon, ChevronRightIcon } from "@/components/icons";
import { categories, getProductsByCategory } from "@/lib/data";
import { ProductGrid } from "@/components/product-card";
import { useLanguage } from "@/components/language-context";

export function CategoryView({ slug }: { slug: string }) {
  const { language, t } = useLanguage();
  const category = categories.find((item) => item.slug === slug) ?? categories[0];
  const categoryProducts = getProductsByCategory(slug);
  const categoryLabel = language === "bn" ? ({ Haircare: "হেয়ার কেয়ার", "Hair Oil": "হেয়ার অয়েল", "Hair Toner": "হেয়ার টোনার", Shampoo: "শ্যাম্পু", Packages: "প্যাকেজ" } as Record<string, string>)[category.label] : category.label;
  return <div className="collection-page"><div className="page-shell"><div className="breadcrumb"><Link href="/">{language === "bn" ? "হোম" : "Home"}</Link><ChevronRightIcon size={13} /><span>{categoryLabel}</span></div><div className="collection-head"><div className="collection-title"><h1>{categoryLabel}</h1><p>{categoryProducts.length} {language === "bn" ? "টি পণ্য, আপনার রুটিনের জন্য বাছাই করা" : t("collection.essentials")}</p></div><div className="collection-tools"><span>{t("collection.browse")}</span><select defaultValue={slug} aria-label={t("collection.browse")} onChange={(event) => { window.location.href = `/category/${event.target.value}`; }}><option value={slug}>{categoryLabel}</option>{categories.filter((item) => item.slug !== slug).map((item) => <option value={item.slug} key={item.slug}>{language === "bn" ? ({ Haircare: "হেয়ার কেয়ার", "Hair Oil": "হেয়ার অয়েল", "Hair Toner": "হেয়ার টোনার", Shampoo: "শ্যাম্পু", Packages: "প্যাকেজ" } as Record<string, string>)[item.label] : item.label}</option>)}</select></div></div><div className="category-pills"><Link className={slug === "haircare" ? "active" : ""} href="/category/haircare">{t("collection.allHaircare")}</Link>{categories.filter((item) => item.slug !== "haircare").map((item) => <Link className={slug === item.slug ? "active" : ""} href={`/category/${item.slug}`} key={item.slug}>{language === "bn" ? ({ Haircare: "হেয়ার কেয়ার", "Hair Oil": "হেয়ার অয়েল", "Hair Toner": "হেয়ার টোনার", Shampoo: "শ্যাম্পু", Packages: "প্যাকেজ" } as Record<string, string>)[item.label] : item.label}</Link>)}</div>{categoryProducts.length ? <ProductGrid products={categoryProducts} /> : <div className="collection-empty">{language === "bn" ? "এই কালেকশনে এখনো কোনো পণ্য নেই।" : "No products in this collection yet."}</div>}<div className="collection-bottom-note"><span><strong>{t("collection.help")}</strong> {t("collection.start")}</span><Link href="/category/packages">{t("collection.explore")} <ArrowRightIcon size={14} /></Link></div></div></div>;
}
