"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRightIcon,
  BagIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  FacebookIcon,
  InstagramIcon,
  HeadsetIcon,
  LeafIcon,
  MenuIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
  ShieldIcon,
  TikTokIcon,
  TruckIcon,
  RefreshIcon,
  WhatsAppIcon
} from "@/components/icons";
import { brand, formatPrice, products } from "@/lib/data";
import { localizedProduct } from "@/lib/localize";
import { useCart } from "@/components/cart-context";
import { LanguageToggle, useLanguage } from "@/components/language-context";

const navGroups = [
  {
    key: "nav.haircare",
    href: "/category/haircare",
    children: [
      ["nav.hairOil", "/category/hair-oil"],
      ["nav.hairToner", "/category/hair-toner"],
      ["nav.shampoo", "/category/shampoo"],
      ["nav.packages", "/category/packages"],
      ["nav.allHaircare", "/category/haircare"]
    ]
  },
  {
    key: "nav.careGuide",
    href: "/guide",
    children: [
      ["nav.hairFall", "/guide/hair-fall-care"],
      ["nav.dryHair", "/guide/dry-hair-routine"],
      ["nav.scalpCare", "/guide/scalp-care-basics"],
      ["nav.findCare", "/guide"]
    ]
  }
];

const announcements = {
  en: [
    "🚚 Free Delivery On Complete Packages!",
    "🌿 Nature-inspired care for stronger, healthier hair",
    "💚 Cash on Delivery available across Bangladesh"
  ],
  bn: [
    "🚚 সম্পূর্ণ প্যাকেজে ফ্রি ডেলিভারি!",
    "🌿 শক্ত ও স্বাস্থ্যকর চুলের জন্য প্রকৃতি-অনুপ্রাণিত যত্ন",
    "💚 বাংলাদেশজুড়ে ক্যাশ অন ডেলিভারি"
  ]
};

function LogoLockup({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  return (
    <span className={`logo-lockup ${dark ? "logo-lockup-dark" : ""} ${compact ? "logo-lockup-compact" : ""}`}>
      <img src="/media/alvero-mark.png" alt="" aria-hidden="true" />
      <span className="logo-copy">
        <strong>ALVERO</strong>
        <span className="logo-divider">|</span>
        <small>HAIR SOLUTIONS</small>
      </span>
    </span>
  );
}

function CartButton() {
  const { count, setOpen } = useCart();
  const { t } = useLanguage();
  return <button className="cart-button" type="button" aria-label={t("header.openCart")} onClick={() => setOpen(true)}><BagIcon size={17} /><span className="cart-count">{count}</span></button>;
}

export function SiteHeader() {
  const [announcement, setAnnouncement] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { language, t } = useLanguage();

  useEffect(() => {
    const timer = window.setInterval(() => setAnnouncement((current) => (current + 1) % announcements.en.length), 5200);
    return () => window.clearInterval(timer);
  }, []);

  const searchResults = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return products.slice(0, 4);
    return products.filter((p) => `${p.name} ${p.category}`.toLowerCase().includes(term)).slice(0, 6);
  }, [search]);

  function closePanels() {
    setMenuOpen(false);
    setSearchOpen(false);
  }

  return (
    <>
      <header className="site-header">
        <div className="announcement-bar"><span key={`${language}-${announcement}`} className="announcement-text">{announcements[language][announcement]}</span></div>
        <div className="header-wrap">
          <div className="utility-bar">
            <a className="customer-care" href={`tel:${brand.phone.replace(/\s/g, "")}`} aria-label={`${t("header.customerCare")}: ${brand.phone}`}><span aria-hidden="true"><HeadsetIcon size={14} /></span><strong>{brand.phone}</strong></a>
            <div className="social-find"><span>{t("header.findUs")}</span><a href={brand.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookIcon size={14} /></a><a href={brand.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon size={14} /></a><a href={brand.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok"><TikTokIcon size={14} /></a><LanguageToggle compact /></div>
          </div>
          <div className="mobile-header-pill">
            <button className="icon-button menu-trigger" type="button" aria-label="Open menu" onClick={() => setMenuOpen(true)}><MenuIcon size={20} /></button>
            <Link href="/" aria-label="Alvero Hair Solutions home" onClick={closePanels}><LogoLockup compact /></Link>
            <CartButton />
          </div>

          <div className="desktop-header-pill">
            <Link href="/" className="brand-link" aria-label="Alvero Hair Solutions home" onClick={closePanels}><LogoLockup /></Link>
            <nav className="desktop-nav" aria-label="Primary navigation">
              {navGroups.map((group) => <div className="nav-group" key={group.key}><Link href={group.href} className="nav-link">{t(group.key)}<ChevronDownIcon size={12} /></Link><div className="nav-dropdown">{group.children.map(([label, href]) => <Link href={href} key={label} onClick={closePanels}>{t(label)}</Link>)}</div></div>)}
              <Link href="/category/hair-oil" className="nav-link">{t("nav.hairOils")}</Link>
              <Link href="/category/packages" className="nav-link">{t("nav.packages")}</Link>
              <Link href="/track" className="nav-link">{t("nav.track")}</Link>
              <Link href="/refer-win" className="nav-link nav-link-accent">{t("nav.refer")}</Link>
              <Link href="/#concerns" className="nav-link nav-link-accent strong">{t("nav.findCare")}</Link>
            </nav>
            <div className="header-actions"><button className="search-button" type="button" aria-label={t("header.search")} onClick={() => setSearchOpen(true)}><SearchIcon size={17} /></button><CartButton /></div>
          </div>
        </div>
      </header>

      {menuOpen && <div className="mobile-menu-layer" role="dialog" aria-modal="true" aria-label="Mobile navigation"><button className="drawer-backdrop" aria-label="Close menu" onClick={() => setMenuOpen(false)} /><aside className="mobile-menu-panel"><div className="mobile-menu-top"><LogoLockup /><button className="icon-button" type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}><CloseIcon size={20} /></button></div><div className="mobile-menu-links"><Link href="/category/haircare" onClick={closePanels}>{t("nav.haircare")} <ChevronRightIcon size={16} /></Link><Link href="/category/hair-oil" onClick={closePanels}>{t("nav.hairOils")} <ChevronRightIcon size={16} /></Link><Link href="/category/hair-toner" onClick={closePanels}>{t("nav.hairToner")} <ChevronRightIcon size={16} /></Link><Link href="/category/shampoo" onClick={closePanels}>{t("nav.shampoo")} <ChevronRightIcon size={16} /></Link><Link href="/category/packages" onClick={closePanels}>{t("nav.packages")} <ChevronRightIcon size={16} /></Link><Link href="/guide" onClick={closePanels}>{t("nav.careGuide")} <ChevronRightIcon size={16} /></Link><Link href="/track" onClick={closePanels}>{t("nav.track")} <ChevronRightIcon size={16} /></Link><Link href="/refer-win" onClick={closePanels}>{t("nav.refer")} <ChevronRightIcon size={16} /></Link></div><div className="mobile-menu-note"><LeafIcon size={18} /><span>{language === "bn" ? "স্বাস্থ্যকর চুল শুরু হয় সঠিক যত্ন থেকে।" : "Healthy hair begins with the right care."}</span></div></aside></div>}

      {searchOpen && <div className="search-layer" role="dialog" aria-modal="true" aria-label={t("header.search")}><button className="drawer-backdrop" aria-label="Close search" onClick={() => setSearchOpen(false)} /><div className="search-panel"><div className="search-panel-head"><div className="search-input-wrap"><SearchIcon size={18} /><input autoFocus value={search} onChange={(e) => setSearch(e.target.value)} placeholder={language === "bn" ? "অয়েল, টোনার বা কম্বো সার্চ করুন..." : "Search hair oil, toner, combo..."} /></div><button className="icon-button" type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}><CloseIcon size={20} /></button></div><p className="search-kicker">{search ? (language === "bn" ? "মিলে যাওয়া পণ্য" : "Matching products") : (language === "bn" ? "জনপ্রিয় কেয়ার এসেনশিয়াল" : "Popular care essentials")}</p><div className="search-results">{searchResults.length ? searchResults.map((product) => { const copy = localizedProduct(product, language); return <Link href={`/product/${product.slug}`} key={product.slug} className="search-result" onClick={() => setSearchOpen(false)}><img src={product.image} alt="" /><span><strong>{copy.name}</strong><small>{product.category} · {formatPrice(product.price)}</small></span><ChevronRightIcon size={16} /></Link>; }) : <p className="empty-search">{language === "bn" ? "কোনো পণ্য পাওয়া যায়নি।" : "No products found. Try “oil”, “toner” or “combo”."}</p>}</div></div></div>}
    </>
  );
}

function CartLine({ slug, quantity, image, name, price }: { slug: string; quantity: number; image: string; name: string; price: number }) {
  const { setQuantity, remove } = useCart();
  return <div className="drawer-line"><img src={image} alt="" /><div className="drawer-line-copy"><strong>{name}</strong><span>{formatPrice(price)}</span><div className="mini-quantity"><button type="button" aria-label={`Decrease ${name}`} onClick={() => setQuantity(slug, quantity - 1)}><MinusIcon size={12} /></button><span>{quantity}</span><button type="button" aria-label={`Increase ${name}`} onClick={() => setQuantity(slug, quantity + 1)}><PlusIcon size={12} /></button></div></div><button className="remove-line" type="button" aria-label={`Remove ${name}`} onClick={() => remove(slug)}><CloseIcon size={15} /></button></div>;
}

export function CartDrawer() {
  const { lines, subtotal, open, setOpen, add } = useCart();
  const { language, t } = useLanguage();
  const suggestions = products.filter((product) => !lines.some((line) => line.product.slug === product.slug)).slice(0, 3);
  if (!open) return null;
  return <div className="cart-layer" role="dialog" aria-modal="true" aria-label={t("cart.title")}><button className="drawer-backdrop" aria-label="Close cart" onClick={() => setOpen(false)} /><aside className="cart-drawer"><div className="drawer-head"><div><span className="eyebrow">{t("cart.ritual")}</span><h2>{t("cart.title")}</h2></div><button className="icon-button" type="button" aria-label="Close cart" onClick={() => setOpen(false)}><CloseIcon size={20} /></button></div><div className="drawer-body">{lines.length ? <><div className="drawer-lines">{lines.map(({ product, quantity }) => <CartLine key={product.slug} slug={product.slug} quantity={quantity} image={product.image} name={localizedProduct(product, language).name} price={product.price} />)}</div><div className="drawer-summary"><span>{t("cart.subtotal")}</span><strong>{formatPrice(subtotal)}</strong></div><p className="drawer-note">{language === "bn" ? "ডেলিভারি চেকআউটে হিসাব হবে। বাংলাদেশজুড়ে ক্যাশ অন ডেলিভারি।" : "Delivery is calculated at checkout. Cash on Delivery available across Bangladesh."}</p><Link className="btn btn-primary drawer-cta" href="/cart" onClick={() => setOpen(false)}>{t("cart.checkout")} <ArrowRightIcon size={15} /></Link></> : <div className="empty-cart"><div className="empty-cart-icon"><BagIcon size={42} /></div><h3>{t("cart.emptyTitle")}</h3><p>{t("cart.emptyCopy")}</p><Link className="btn btn-primary" href="/category/haircare" onClick={() => setOpen(false)}>{t("cart.shopHaircare")} <ArrowRightIcon size={15} /></Link></div>}{suggestions.length > 0 && <div className="drawer-suggestions"><div className="drawer-suggestion-head"><h3>{t("cart.mayLike")}</h3><span>{t("cart.quickAdd")}</span></div><div className="drawer-suggestion-row">{suggestions.map((product) => <div className="drawer-suggestion" key={product.slug}><Link href={`/product/${product.slug}`} onClick={() => setOpen(false)}><img src={product.image} alt="" /><strong>{localizedProduct(product, language).name}</strong></Link><div><span>{formatPrice(product.price)}</span><button type="button" onClick={() => add(product)}>+ {language === "bn" ? "যোগ" : "Add"}</button></div></div>)}</div></div>}</div></aside></div>;
}

export function SiteFooter() {
  const { language, t } = useLanguage();
  return <footer className="site-footer"><div className="footer-gold-line" /><div className="footer-inner"><div className="footer-branding"><LogoLockup dark /><p>{language === "bn" ? "সঠিক যত্নে স্বাস্থ্যকর চুলের শুরু।" : brand.tagline}</p></div><div className="footer-grid"><div className="footer-intro"><p>{language === "bn" ? "Alvero Hair Solutions-এ আমরা বিশ্বাস করি সঠিক যত্নেই স্বাস্থ্যকর চুলের শুরু। আত্মবিশ্বাস ফিরিয়ে আনতে ও প্রাকৃতিক সৌন্দর্য বাড়াতে আমাদের হেয়ার কেয়ার সমাধান তৈরি।" : brand.description}</p><div className="footer-socials" aria-label="Social media links"><a href={brand.facebook} target="_blank" rel="noreferrer" aria-label="Alvero on Facebook"><FacebookIcon size={16} /></a><a href={brand.instagram} target="_blank" rel="noreferrer" aria-label="Alvero on Instagram"><InstagramIcon size={16} /></a><a href={brand.tiktok} target="_blank" rel="noreferrer" aria-label="Alvero on TikTok"><TikTokIcon size={16} /></a></div></div><div><h3>{t("footer.shop")}</h3><ul><li><Link href="/category/haircare">{t("nav.haircare")}</Link></li><li><Link href="/category/hair-oil">{t("nav.hairOil")}</Link></li><li><Link href="/category/hair-toner">{t("nav.hairToner")}</Link></li><li><Link href="/category/shampoo">{t("nav.shampoo")}</Link></li><li><Link href="/category/packages">{t("nav.packages")}</Link></li></ul></div><div><h3>{t("footer.help")}</h3><ul><li><Link href="/track">{t("nav.track")}</Link></li><li><Link href="/cart">{language === "bn" ? "কার্ট ও চেকআউট" : "Cart & checkout"}</Link></li><li><Link href="/#reviews">{language === "bn" ? "কাস্টমার স্টোরি" : "Customer stories"}</Link></li><li><Link href="/refer-win">{t("nav.refer")}</Link></li><li><Link href="/guide">{t("nav.careGuide")}</Link></li></ul></div><div><h3>{t("footer.promise")}</h3><ul className="promise-list"><li><span><LeafIcon size={14} /></span>{t("footer.nature")}</li><li><span><TruckIcon size={14} /></span>{t("footer.delivery")}</li><li><span><ShieldIcon size={14} /></span>{t("footer.quality")}</li><li><span><RefreshIcon size={14} /></span>{t("footer.support")}</li></ul></div></div><div className="footer-contact-row"><a href={`tel:${brand.phone.replace(/\s/g, "")}`}><span>{t("footer.call")}</span><strong>{brand.phone}</strong></a><a href={brand.whatsapp} target="_blank" rel="noreferrer"><span>WhatsApp</span><strong className="contact-value"><WhatsAppIcon size={13} /> {brand.phone}</strong></a><a href={`mailto:${brand.email}`}><span>{t("footer.email")}</span><strong>{brand.email}</strong></a><a href="https://www.google.com/maps/search/?api=1&query=Dhaka%20Bangladesh%201212" target="_blank" rel="noreferrer"><span>{t("footer.find")}</span><strong>{brand.address}</strong></a></div></div><div className="footer-bottom"><span>© 2026 Alvero Hair Solutions. All rights reserved.</span><span>{t("footer.created")} <a href={brand.creatorUrl} target="_blank" rel="noreferrer"><FacebookIcon size={13} /> {brand.creatorName}</a></span></div></footer>;
}
