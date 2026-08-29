# Ayra Naturals — Reference Analysis

**Source analysed:** `/home/user/uploads/Ayra Naturals — Where Nature Meets Luxury _ Natural Haircare & Skincare, COD Bangladesh.html`

**Analysis status:** The attached file is a saved/rendered homepage, not the original Git repository. It is sufficient to map the visible homepage structure, design tokens, responsive behavior, public content model, and several client-side interactions. The original React component source, private backend code, unavailable JS/CSS chunks, database, payment configuration, and full inner-page implementations are not included.

---

## 1. High-level technical conclusion

The rendered page is clearly built with **Next.js + React**:

- `_next/static/...` assets and font preloads
- React Server Components/Flight payload markers: `self.__next_f`
- `next-route-announcer`
- Next-generated font class names
- Turbopack-related chunk naming

The site also exposes strong signs of a **hybrid WordPress/Shoptimizer/WooCommerce environment**:

- The page contains `.shoptimizer` and `.woocommerce-breadcrumb` compatibility selectors.
- The custom page CSS explicitly neutralises Shoptimizer content wrappers.
- Product/media URLs are hosted under a WordPress uploads domain: `ayravps.aromaelitebd.shop/wp-content/uploads/...`.
- A theme endpoint is referenced at `wp-content/themes/shoptimizer/ayra-save.php`.

**Most likely architecture:** a custom Next.js/React storefront or page rendered within/alongside a WordPress/Shoptimizer commerce backend. The exact data-fetching and checkout implementation cannot be proven from this saved HTML alone.

Styling is a combination of:

- Tailwind-style utility classes
- Custom scoped CSS for the homepage components
- Inline styles for dynamic/admin-controlled values
- SVG icons drawn inline
- Google Fonts and Next-hosted font files

---

## 2. Brand/design direction

### Design personality

The visual language is:

- Natural and botanical
- Premium but approachable
- Dark forest-green luxury base
- Soft cream/white content surfaces
- Gold accents for premium details
- Rounded/pill-shaped controls
- Product-led ecommerce layout
- Strong social proof and promotional messaging

The design is not minimal-black luxury; it is a warm botanical ecommerce style with high-contrast green CTAs and rounded cards.

### Core design tokens found

| Token/use | Value |
|---|---|
| Main CTA/brand green | `#007F4E` |
| Dark green hover/background | `#005A32` |
| Dark root brand green | `#0B3D2E` |
| Dark hero gradient | `#071410` → `#0F2419` → `#071410` |
| Pale green | `#C9E4D4` |
| Medium announcement green | `#5DA67E` |
| Green text / hero accent | `#A8F0C8` |
| Premium gold | `#D6B76E` |
| Soft gold hover | `#E9D9A8` |
| Main text | `#111` / `#0E0E0E` |
| Muted text | `#555`, `#777`, `#888`, `#AAA` |
| Product discount red | `#DC2626` |
| Featured pink gradient | `#FFB8C2` → `#FF8FA0` |
| Neutral background | `#F9F9F9` / `#F5F5F5` |
| Border | approximately `#E0E0E0`, `#EBEBEB`, and theme token `border-line` |

### Shapes and effects

- Primary controls use `border-radius: 999px`.
- Product cards use approximately `12–16px` radius.
- Review cards use approximately `14px` radius.
- Header is a floating white rounded pill with a soft shadow.
- Product hover effect: slight upward movement, shadow increase, image scale around `1.04`.
- Hero uses layered image + dark vignette overlays.
- Transparent stat pills use glass-like background and `backdrop-filter: blur(10px)`.
- Motion is subtle: fade-up entrance, hover scale, image zoom, slide/drawer transitions, and a bouncing down-arrow.

---

## 3. Typography

The file references several Next font classes (`Poppins`, `Cormorant Garamond`, `Assistant`, `Fraunces`), but the visible custom homepage rules explicitly use:

- **Body:** `Inter`, sans-serif
- **Main headings/hero/stats:** `Playfair Display`, serif
- **Footer tagline:** Georgia/Times-style italic serif
- **Bangla support:** Google Font reference includes `Hind Siliguri`
- **Logo:** a CSS variable named `--font-logo`, with wide letter spacing and medium weight

Heading treatment:

- Serif, bold/extra-bold
- Dark text on light sections
- White text in hero/footer
- Hero second line is italic and pale green
- Section labels are small uppercase green eyebrows with wide letter spacing
- Buttons are compact uppercase text with approximately `.08em–.12em` letter spacing

The new site should use local/self-hosted fonts or a deliberate fallback strategy rather than depending on external font loading.

---

## 4. Homepage information architecture

The homepage has **six rendered content sections**, plus a sticky header, footer, and cart drawer. A seventh “Featured In” section exists in markup but is currently hidden.

### A. Announcement bar + sticky header

Announcement text:

> ✅ 100% authentic Products — money back guarantee

Header behavior:

- `position: sticky; top: 0; z-index: 50`
- Announcement bar uses a pale-green to medium-green diagonal gradient.
- Desktop header is a white floating pill, around `64px` high, inside a centered max-width container.
- Desktop left: text logo `AYRA | NATURALS`.
- Desktop center: navigation.
- Desktop right: circular search button + green cart button with count badge.
- Mobile: compact floating pill with hamburger on the left, centered logo, cart button on the right.
- Header has separate desktop/mobile markup using `lg:hidden` and `hidden lg:flex`.

Desktop navigation:

- Haircare dropdown: Hair Oil, Hair Tonic, Serum, Haircare Packages, All Haircare
- Skincare dropdown: Face Toner, Facial Mask, Skincare Packages, All Skincare
- Hair Oils
- Packages
- Track My Order
- Refer & Win
- Free Hair Quiz

Dropdown style:

- Hover-driven
- White card, rounded corners, thin border, large soft shadow
- Approximate minimum width `210px`
- Green hover text and cream hover background

### B. Hero: `#top`

Visual structure:

- Full viewport on desktop (`100svh`/`100vh`)
- Dark forest-green gradient base
- Full-cover background image with low opacity (`0.15` in current data)
- Dark vertical vignette to keep white text readable
- Centered content
- Responsive typography via `clamp()`

Current content structure:

- H1 line 1: “Explore Our Premium”
- H1 italic line 2: “Natural Products.”
- Supporting paragraph about natural products and free delivery above ৳2,000
- Two CTAs: `BUY NOW`, `REVIEWS`
- Three glass stat pills:
  - `FREE` / `Delivery 1.5K+`
  - `1000+` / `5★ Reviews`
  - `100%` / `Money Back`
- Desktop-only animated down arrow near the bottom

CTA treatment:

- Primary: green filled pill, white text, subtle green shadow
- Secondary: transparent pill, white text, semi-transparent white border

Mobile hero:

- Height becomes content-driven rather than full viewport.
- Shorter supporting text is used.
- Buttons remain side-by-side in a compact row.
- Stats remain horizontally arranged with smaller padding/type.

### C. Best sellers: `#shop`

Section label: `Best Sellers This Month`

Title: `Must-Have For You`

Layout:

- White background
- Centered max-width container (`max-w-7xl`)
- Desktop grid: 4 columns
- Mobile grid: 2 columns
- Gap approximately `12–16px`
- 8 promotional product tiles

Card style:

- Tall image-first tile, approximately `3/4` aspect ratio
- Rounded corners around `12px`
- Image fills the card with `object-fit: cover`
- Discount badge at top-left
- Strong green gradient overlay from bottom upward
- White product name and price over the image
- Old price is crossed out and muted
- Orange translucent square cart icon at bottom-right
- Hover zoom on desktop

Current products include Luvhair Combo, Caffiene Combo, Facial Mask Combo, Golden Low Porosity Hair Oil, ProRepair Shampoo, Organic Hair Serum, Revive Hair Oil, and Hairbelle Combo.

Bottom CTA: outlined green `View More` pill.

### D. Exclusive products: `#exclusive-section`

Section label: `All Time Favourites`

Title: `Exclusive All Time Best Products`

Background:

- Very light white/green diagonal gradient
- Vertical padding around `3.5rem`

Layout:

- Desktop: 6 columns
- Tablet: 3 columns
- Mobile: 2 columns
- 6 product cards

Standard product card:

- White surface
- Thin neutral border
- Around `14px` radius
- Product image area uses `4/5` aspect ratio
- Discount badge at top-left
- Desktop `ADD TO CART` overlay appears on image hover
- Mobile add button is always visible below image
- Product title is small, medium-weight dark text
- Current/old price row
- Gold/orange star rating row
- Hover: translate up approximately `5px`, soft shadow

Bottom CTA: outlined green `View All Products` pill.

### E. Personalised concern finder: `#skin-concern`

Section label: `Personalised Care`

Title: `What's Your Skin Concern?`

Description:

> Select the concern below to find the products you need.

Background: `#F9F9F9`.

Interaction hierarchy:

1. Main segmented tabs: `HAIR`, `SKIN`, `FACE`
2. Group-specific pill sub-tabs
3. Product grid changes without page navigation

Current hair concerns:

- Hair Fall
- Dandruff
- Dry Hair
- Hair Growth
- Scalp Care

Current skin concerns:

- Dryness (the current data only includes this skin subgroup)

Current face concerns:

- Face Acne
- Pigmentation
- Ageing
- Sun Protection

Product grid:

- 2 columns mobile
- 3 columns at small/tablet breakpoint
- 4 columns at large breakpoint
- Uses the standard product card
- Concern data is grouped under `window.__AYRA_DATA__.skinConcern`

Implementation behavior:

- `switchMain()` hides all groups and activates the selected group.
- `switchSub()` hides all concern products in the group and shows the selected concern.
- Active tabs become green with white text; inactive tabs are white with gray text and a light border.
- A later admin-sync function can rebuild the tabs and product grids from data, not just swap pre-rendered content.

### F. Results/testimonials: `#results`

Section label: `Real Results`

Title: `Testimonials — What Our Customers Say`

Description repeats the premium natural-products value proposition.

Layout:

- Two columns at large breakpoint
- Single column on mobile
- Light green/white diagonal gradient background

Left side: before/after slider

- Rounded `18px` image viewport
- `4/3` aspect ratio
- “Before” image as base
- “After” image clipped using `clip-path: inset(0 0 0 50%)`
- White vertical divider line
- White circular drag knob with left/right arrows
- Red `Before` label and green `After` label at top
- Bottom labels: `Before Using` and `After Using AYRA`
- Works with pointer, mouse, and touch events
- Below it are two stat callouts: `80% Hair Growth` and `60% Less Hair Fall`
- Green `Shop Now` CTA

Video-review banner:

- Green rounded rectangle
- Circular play icon area
- Heading `Watch Video Reviews`
- Supporting text `Real customers, real stories`
- Translucent `See More` button

Right side: reviews

- Heading `What Our Customers Say`
- `See All Reviews` outlined pill
- Vertically scrollable review column, around `480px` max height
- 7 review cards in current markup
- Each card contains colored initial avatar, customer name, `✓ Verified`, star rating, and Bangla review text
- Bottom CTA: `See All Customer Reviews`

### G. Featured In: `#featured`

This section exists but is currently hidden:

- `display: none`
- Data flag: `sections.ft: false`
- Intended pink gradient background
- Heading: `Featured In`
- Four circular logo containers
- Current logo data is empty (`New Brand` with no image URL)

For a new website, this should remain disabled until real media/partner logos and permission are available.

### H. Footer

Background:

- Dark green diagonal gradient: approximately `#08231A` → `#0B2F22` → `#071D15`
- Thin gold gradient rule above content
- Two large, very faint decorative leaf SVGs in opposite corners

Footer content:

- Centered AYRA | NATURALS logo framed by mirrored leaf SVG icons
- Italic tagline: `Where nature meets luxury`
- Four-column layout on desktop, two columns on small screens, one column on mobile:
  1. Brand description + five-star review count
  2. Shop links
  3. Help links
  4. The Ayra promise
- Promise items include:
  - 100% natural & organic
  - Cash on Delivery nationwide
  - Money-back guarantee
  - Fast delivery, fresh stock
- Bottom border divider
- Copyright and `Grown with [leaf] in Bangladesh`

---

## 5. Cart/search/navigation behavior

### Cart drawer

The saved initial state includes a right-side cart drawer:

- Fixed full-height panel
- Width `88vw`, max width `420px`
- Backdrop overlay: black with about `40%` opacity
- Panel is initially off-canvas via `translate-x-full`
- Slide transition around `300ms`
- Header: `Shopping Cart`, `Close →`
- Empty state: large cart SVG, `No items in your cart!`, `Shop Now` CTA
- “You May Also Like” horizontal product rail
- Related item cards around `150px` wide
- Buttons say `+ Add` or `Choose size`

### Search

A search icon button is present in the desktop header. The open/search interaction is handled by unavailable React client chunks, so the exact overlay behavior cannot be verified from this file.

### Product navigation

The page uses normal product/category URLs such as:

- `/category/haircare/`
- `/category/raw-oil/`
- `/category/hair-tonic/`
- `/category/serum/`
- `/category/haircare-packages/`
- `/category/skincare/`
- `/category/face-toner/`
- `/category/facial-mask/`
- `/category/skincare-packages/`
- `/category/package/`
- `/track/`
- `/recommendation/`
- `/refer-win/`
- `/reviews/`
- `/cart/`

Multiple product slugs are embedded in the homepage data.

---

## 6. Public data/content model

The page embeds a global data object:

`window.__AYRA_DATA__`

Its top-level groups are:

- `hero`
- `excl`
- `featured`
- `brand`
- `footer`
- `urls`
- `sections`
- `products`
- `reviews`
- `skinConcern`
- `concerns`

This is especially useful for the rebuild. We can preserve the same concept but use a typed, maintainable data model, for example:

```ts
{
  hero: { title, italicTitle, description, primaryCta, secondaryCta, stats, backgroundImage },
  products: Product[],
  collections: Collection[],
  concerns: ConcernGroup[],
  reviews: Review[],
  footer: FooterContent
}
```

The current implementation supports changing copy, links, images, colors, products, concerns, reviews, and section visibility from injected data. The source contains an admin/live-sync routine that updates DOM text, links, images, and concern grids.

---

## 7. Responsive system

The utility classes indicate a Tailwind-like breakpoint system:

- Base/mobile: one/two-column compact layouts
- `sm` around `640px`
- `lg` around `1024px`
- `xl` around `1280px`
- Main container uses `max-w-7xl` for content sections
- Footer uses a narrower `max-w-6xl`

Important responsive changes:

- Desktop header switches to mobile header below `lg`.
- Best sellers: 2 columns mobile, 4 large.
- Exclusive products: 2 mobile, 3 small/tablet, 6 large.
- Concern product grids: 2 mobile, 3 small/tablet, 4 large.
- Before/after and reviews stack on mobile.
- Product add-to-cart overlay changes from hover-only on desktop to always visible on mobile.
- Featured circular logos shrink from about `120px` to `78px` on very small screens.
- Hero switches from full viewport height to content height on mobile.

---

## 8. Items to improve in the new implementation

The reference is visually strong, but the rebuild should improve these areas:

1. Use React state/components instead of global DOM functions for tabs and sliders.
2. Use semantic buttons/links and prevent nested-clickable-card event conflicts.
3. Give cart/add buttons real accessible labels and keyboard focus states.
4. Use a single consistent route convention (`/reviews/` versus `/review/` is inconsistent in the reference).
5. Keep the product catalog in a typed data layer or CMS instead of duplicated markup plus an injected global object.
6. Self-host critical fonts and optimise product images with Next Image or an equivalent pipeline.
7. Validate marketing claims such as “80% Hair Growth”, “100% natural”, and “money back” before publishing them on the new brand.
8. Remove browser-extension artifacts present in the saved file (`plasmo`, `chrome-extension`, CSS Peeper markers, `give-freely-root`, and `bis_skin_checked`). These are not part of the real site implementation.
9. Use real media/partner logos only with appropriate permission; the current Featured In section is empty and hidden.
10. Keep checkout/payment secrets server-side. The saved page exposes public media URLs and a theme endpoint reference, but it does not expose private credentials.

---

## 9. What can be recreated for the new site

Using this analysis plus the new logo/content, an original Next.js/React implementation can recreate:

- Floating announcement bar and pill header
- Desktop dropdown navigation and mobile menu
- Full-screen botanical hero
- Promotional product tile grid
- Standard product cards with discount/rating states
- Concern-based product finder
- Before/after slider
- Review/social-proof section
- Off-canvas cart drawer
- Dark botanical footer
- Responsive behavior across desktop, tablet, and mobile

The visual direction can be very close, while the code, content, images, logo, routes, and data model should be original to the new brand. The attached HTML is enough to begin the design system and homepage structure; product detail, checkout, and backend integrations still require the new project requirements.

---

## 10. Screenshot-based analysis of inner pages

The additional full-page screenshots are 1920px wide and confirm that the same global chrome is reused across the site:

- A thin rotating announcement bar at the top
- A centered floating white pill navigation
- AYRA | NATURALS wordmark on the left
- Haircare, Skincare, Hair Oils, Packages, Track My Order, Refer & Win, and Free Hair Quiz links
- Search control and dark-green cart/count control on the right
- The same dark botanical footer across the pages

### Category/archive pages

Screenshots confirm a shared archive template for Haircare, Raw Oil, Package, and Skincare:

- White/light neutral page background
- Breadcrumb near the top of the content container
- Large bold category heading
- Product count below/near the heading
- Four-column desktop grid
- No visible sidebar or filter panel in the supplied desktop states
- Cards use large botanical product imagery, rounded corners, thin gray border, and compact lower information area
- Red discount badge at the top-left
- Dark/gray `Stock Out` badge at the top-right where applicable
- Product name and current/old price appear below the image
- Cards have consistent image ratio and equal visual rhythm across rows
- Archive pages end directly in the shared footer

Observed product counts in the supplied screenshots:

- Haircare: 44 products
- Raw Oil: 23 products
- Package: 18 products
- Skincare: 13 products

This makes the catalog experience a simple, image-led four-column storefront rather than a filter-heavy marketplace. Mobile behavior still needs mobile screenshots to verify, but the HTML's Tailwind breakpoints suggest the grid collapses to two columns.

### Product details page

The product screenshot confirms a more complete product template than the homepage HTML alone showed:

1. Breadcrumb / category context
2. Two-column product hero
   - Large rounded product image/gallery on the left
   - Product title, badges, sale countdown, price and old price on the right
3. Quantity stepper and bordered `Add to Cart` button
4. Full-width green `Buy Now` button
5. Trust microcopy/icons below the CTA:
   - Cash on Delivery
   - Authentic
   - Easy Return
6. Collapsible `Description` row with plus icon
7. Customer reviews section with:
   - Large average rating (`4.8` in the screenshot)
   - Total review count
   - Horizontal rating distribution bars for 5★ through 1★
   - Trust chips such as Verified Purchases Only, Authentic Reviews, 4.8/5 Average Rating, and Bangladesh's Most Trusted
   - `Write a Review` CTA
8. Horizontal review-highlight carousel with image cards
9. Two-column detailed review list/cards with reviewer, verified marker, star rating, date, and text
10. `You may also like` horizontal product carousel
11. Four-value service strip:
   - Free Shipping
   - 30 Days Return
   - Fast Delivery
   - Secure Checkout
12. Large social-proof media wall headed `Trusted by 41K+ Happy Customers`
13. Shared footer

The product page is therefore strongly conversion-oriented: buy controls appear immediately, followed by trust signals, reviews, related products, service guarantees, and user-generated proof.

### Cart / checkout state

The supplied cart screenshots show a checkout-like state rather than only a minimal empty cart drawer:

- Shipping address form is placed on the left
- Order summary is placed on the right and can be collapsed/expanded
- Product thumbnail, product name, quantity/price and total are shown in the summary
- A large green `Place Order (Cash on delivery)` CTA is used
- Form styling remains consistent with the site: light background, rounded fields, green action button, subtle borders
- A large review wall appears below the order area with an average rating block, rating distribution, and many screenshot-style review cards

The existing homepage HTML contains a right-side empty cart drawer, while the screenshots prove there is also a dedicated cart/checkout route with a fuller order form. These should be implemented as separate states/components in the new build.

### Refer & Win page

The refer page confirms a simple campaign/utility-page template:

- Same announcement bar and navigation
- Very light mint/cream page background
- Small rounded gift icon near the top
- Centered gold/green uppercase eyebrow `REFER & WIN`
- White rounded instruction card
- Three numbered steps with green circular number markers
- A soft cream note/callout inside the card
- Full-width green `Get started →` button
- Large intentional empty space before the footer
- Shared footer

This is a good reusable pattern for promotional pages: a compact centered card with strong whitespace and one primary action.

### Track My Order page

The tracking screenshot shows the same utility-page layout:

- Small package icon
- Italic serif heading: `Where’s my order?`
- Supporting sentence about entering details
- Centered white rounded form card
- Name field
- Phone number field
- Green `Track My Order →` button
- Large whitespace below the form
- Shared footer

### Screenshot-informed design priorities for the rebuild

The inner pages reveal that the new website should not be treated as a homepage-only landing page. It needs a reusable ecommerce design system with:

- `SiteChrome` for announcement/header/footer
- `ProductCard` and `ProductGrid`
- `ProductDetail` with gallery, pricing, urgency, quantity, and CTAs
- `ReviewSummary`, `ReviewHighlightRail`, and `ReviewGrid`
- `CartSummary`, `ShippingForm`, and `CheckoutOrderPanel`
- `UtilityPage` for tracking and referral campaigns
- `ServiceTrustStrip` and `UGCWall`
- Shared responsive breakpoints and spacing tokens

The supplied screenshots significantly increase confidence about the site’s visual system and page hierarchy. They do not reveal private backend logic or original component source, but they are enough to build an original, close visual/UX implementation once the new brand assets and content are supplied.
