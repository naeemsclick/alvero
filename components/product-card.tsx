"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { useLanguage } from "@/components/language-context";
import { localizedProduct } from "@/lib/localize";
import { ArrowRightIcon, BagIcon, StarIcon } from "@/components/icons";
import type { Product } from "@/lib/data";
import { formatPrice } from "@/lib/data";

export function ProductCard({ product, variant = "standard" }: { product: Product; variant?: "standard" | "tile" | "compact" }) {
  const { add } = useCart();
  const { language, t } = useLanguage();
  const copy = localizedProduct(product, language);
  const isTile = variant === "tile";
  const isCompact = variant === "compact";

  return (
    <article className={`product-card ${isTile ? "product-tile" : ""} ${isCompact ? "product-card-compact" : ""}`}>
      <Link href={`/product/${product.slug}`} className="product-image-wrap" aria-label={`${language === "bn" ? "দেখুন" : "View"} ${copy.name}`}>
        <img className="product-image" src={product.image} alt={copy.name} loading="lazy" />
        {product.discount && <span className={`discount-badge ${product.badge === "New" ? "discount-badge-green" : ""}`}>{product.discount}</span>}
        {product.badge && !isTile && <span className="product-badge">{product.badge}</span>}
        {!product.stock && <span className="stock-badge">{t("product.soldOut")}</span>}
        {isTile && <span className="tile-shade" />}
      </Link>
      {isTile && <button type="button" className="tile-cart" aria-label={`${t("product.add")} ${copy.name}`} disabled={!product.stock} onClick={() => add(product)}><BagIcon size={15} /></button>}
      <div className={`product-card-body ${isTile ? "tile-body" : ""}`}>
        <div className="product-card-topline"><span>{language === "bn" ? (product.category === "Packages" ? "প্যাকেজ" : product.category === "Hair Oil" ? "হেয়ার অয়েল" : product.category === "Hair Toner" ? "হেয়ার টোনার" : "শ্যাম্পু") : product.category}</span>{!isTile && <span className="card-stars"><StarIcon size={11} /> {product.rating.toFixed(1)}</span>}</div>
        <Link href={`/product/${product.slug}`} className="product-name">{copy.name}</Link>
        <p className="product-blurb">{copy.blurb}</p>
        <div className="price-row"><span className="price">{formatPrice(product.price)}</span>{product.oldPrice && <span className="old-price">{formatPrice(product.oldPrice)}</span>}</div>
        {isTile ? (
          <button type="button" className="tile-add" disabled={!product.stock} onClick={() => add(product)}>{product.stock ? t("product.quickAdd") : t("product.soldOut")} <ArrowRightIcon size={13} /></button>
        ) : (
          <button type="button" className="add-to-cart" disabled={!product.stock} onClick={() => add(product)}>{product.stock ? t("product.add") : t("product.soldOut")} <ArrowRightIcon size={14} /></button>
        )}
      </div>
    </article>
  );
}

export function ProductGrid({ products, variant = "standard" }: { products: Product[]; variant?: "standard" | "tile" | "compact" }) {
  return <div className={`product-grid ${variant === "tile" ? "product-grid-tiles" : ""} ${variant === "compact" ? "product-grid-compact" : ""}`}>{products.map((product) => <ProductCard key={product.slug} product={product} variant={variant} />)}</div>;
}
