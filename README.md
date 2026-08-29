# Alvero Hair Solutions

A responsive Next.js + React ecommerce frontend for Alvero Hair Solutions.

## Included

- Homepage inspired by the supplied Ayra reference layout
- Haircare, Hair Oil, Hair Toner, Shampoo and Packages collections
- Product detail pages
- Cart drawer with localStorage persistence
- Cash on Delivery checkout prototype
- Track My Order page
- Refer & Win page
- Responsive desktop/mobile navigation
- Customer Care phone link and social links in the top header
- English/Bangla language switcher with Hind Siliguri mode
- Multi-banner hero carousel with zoom, white flash and slide-up transitions
- Search modal
- Before/after interaction
- Six-post Care Guide landing page and full article routes
- Bilingual guide articles with FAQ dropdowns
- Customer story/review components
- Local Alvero logo and product assets

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## GitHub + Vercel deployment (recommended)

1. Create a new GitHub repository.
2. Extract this project and upload all files, including `public/media` and `package-lock.json`.
3. Commit and push the project to GitHub.
4. Import the repository into Vercel.
5. Vercel will detect Next.js automatically.
6. Optional environment variable:

```text
NEXT_PUBLIC_SITE_URL=https://your-real-domain.com
```

Use the real production domain instead of the placeholder.

## Important before launch

- The checkout currently runs in demo mode and does not create a real order.
- Connect a backend/COD order endpoint before accepting customer orders.
- Replace provisional discount values and demo customer stories with approved content.
- Add real delivery charge rules, inventory and order tracking.
- Configure `NEXT_PUBLIC_SITE_URL` for production metadata and sitemap.
- Never commit API keys, payment secrets or database credentials.

## Project structure

```text
app/                 Next.js routes and global CSS
components/          Reusable React components
lib/data.ts          Brand, product, category and review data
public/media/        Local supplied logo and image assets
ALVERO_PROJECT_PLAN.md
AYRA_NATURALS_REFERENCE_ANALYSIS.md
```
