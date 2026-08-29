# Alvero Hair Solutions — Page Map, Component Structure & Development Plan

## Brand inputs received

- Brand: **ALVERO Hair Solutions**
- Tagline: **We believe healthy hair begins with the right care.**
- Phone/WhatsApp: **01811899068**
- Email: **alverohairsolutions@gmail.com**
- Address: **Dhaka, Bangladesh, 1212**
- Facebook: https://www.facebook.com/AlveroHairSolutions
- Instagram: https://www.instagram.com/alverohairsolutions
- TikTok: https://www.tiktok.com/@alverohairsolutions
- Logo and creative assets: stored in `public/media/`
- Prices:
  - Hair Oil 200ml — ৳600
  - Shampoo 200ml — ৳500
  - Hair Toner 200ml — ৳350
  - Complete Combo — ৳1,250
- Footer: © 2026 Alvero Hair Solutions. All rights reserved.
- Creator credit: Naeem Nahiyan with Facebook link opening in a new tab

## Page map

### Public pages

- `/`
  - Announcement bar and global header
  - Hero
  - Must-Have For You product tiles
  - Exclusive Hair Care Rituals
  - Brand promise banner
  - Hair concern finder
  - Before/after results and demo customer stories
  - Service promise strip
  - Botanical visual grid
  - Footer
- `/category/haircare`
  - All haircare products
- `/category/hair-oil`
  - Hair oil products
- `/category/hair-toner`
  - Hair toner products
- `/category/shampoo`
  - Shampoo products
- `/category/packages`
  - Complete and bundled routines
- `/product/[slug]`
  - Product gallery
  - Pricing, sale timer, quantity and cart actions
  - Product description and features
  - Trust/service strip
  - Customer review summary and review grid
  - Related products
  - UGC/product-story wall
- `/cart`
  - Shipping form
  - Order summary
  - Cash on Delivery order action
  - Service reassurance
  - Customer story wall
- `/track`
  - Name/phone order tracking form (demo state ready for API integration)
- `/refer-win`
  - Referral instructions and CTA
- `/guide`
  - Hair Care Guide landing page
  - Six blog-style guide cards in a two-column desktop grid
  - English/Bangla language switcher
  - Common question accordion
- `/guide/[slug]`
  - Full bilingual guide article
  - Language switcher below article title
  - Long-form care tips, bullets, FAQ and related products

### Future pages ready to add

- `/reviews`
- `/guide`
- `/contact`
- `/about`
- `/privacy`
- `/terms`
- `/return-policy`
- Admin/CMS integration

## Component structure

```text
app/
  layout.tsx                 Global metadata, CartProvider, header, footer, drawer
  page.tsx                   Homepage route
  globals.css                Design system and responsive styles
  category/[slug]/page.tsx   Collection route
  product/[slug]/page.tsx    Product route
  cart/page.tsx              Checkout route
  track/page.tsx             Tracking utility page
  refer-win/page.tsx         Referral utility page
  not-found.tsx              Branded 404
  robots.ts                  Robots metadata route

components/
  icons.tsx                  Inline SVG icon system
  cart-context.tsx           Client cart state and localStorage persistence
  site-chrome.tsx            Announcement, header, nav, search, cart drawer, footer
  section-heading.tsx        Shared section heading
  product-card.tsx           Standard/tile/compact product cards and grids
  home-sections.tsx          Homepage, concern finder, results, reviews, related cards
  product-detail.tsx         Product gallery, timer, purchase panel and detail content
  checkout.tsx               Shipping form, order summary and checkout review wall

lib/
  data.ts                    Brand, categories, products, concerns, reviews and helpers

public/media/
  Local logo, cover, product and story assets supplied by the client
```

## Implementation decisions

- Next.js App Router + React + TypeScript
- Original Alvero implementation inspired by the supplied Ayra reference, not a verbatim code/assets copy
- Local creative assets instead of external image URLs
- CSS variables for green/mint/cream/gold design tokens
- Responsive breakpoints around 760px, 960px and 1120px
- English default with an English/Bangla language provider and Hind Siliguri mode
- Static product data initially; structure is ready to replace with a CMS/API
- Client-side cart with localStorage persistence
- Multi-slide hero with subtle zoom, 10% white flash and slide-up content transitions
- Top utility header with Customer Care phone link and hoverable Facebook/Instagram/TikTok icons
- Care Guide landing/article templates with six bilingual posts and FAQ accordions
- Demo Cash on Delivery order flow with success state
- Social links use `target="_blank"` and `rel="noreferrer"`
- Creator credit includes inline Facebook icon with aligned link
- Semantic buttons/links and visible keyboard focus behavior in common controls

## Development plan

### Phase 1 — completed in this workspace

- Create Next.js/React project
- Add Alvero design tokens and responsive CSS
- Import and optimise supplied assets into local media paths
- Build shared announcement/header/navigation/footer
- Build homepage sections
- Build category pages
- Build product details template
- Build cart/checkout prototype
- Build Track My Order and Refer & Win pages
- Add cart drawer, search modal, tabs, timer and before/after interaction
- Validate with TypeScript and production build

### Phase 2 — content and visual refinement

- Replace demo review copy with approved customer stories
- Confirm final discount/original prices
- Add final product descriptions, ingredients, directions and usage warnings
- Choose final homepage hero creative and crop for mobile
- Add mobile screenshots/QA against the supplied reference style
- Add final favicon, OG image and brand metadata

### Phase 3 — commerce integration

- Connect products to backend/CMS
- Persist inventory and stock status
- Connect Cash on Delivery order endpoint
- Add delivery charge rules and location validation
- Add order tracking endpoint
- Add transactional email/SMS/WhatsApp notifications
- Add analytics and conversion events

### Phase 4 — production quality

- Add real review moderation/data source
- Add sitemap and production domain metadata
- Add accessibility audit
- Add image optimisation and cache strategy
- Add error/loading states
- Test mobile Safari/Chrome and slow network behavior
- Deploy to production
