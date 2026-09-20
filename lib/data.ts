export type Product = {
  id?: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  categories?: { id: string; name: string; slug: string }[];
  price: number;
  oldPrice?: number;
  originalPrice?: number;
  regularPrice?: number;
  salePrice?: number;
  discount?: string;
  badge?: string;
  image: string;
  images?: string[];
  gallery?: string[];
  blurb: string;
  shortDescription?: string;
  description: string;
  features: string[];
  concerns: string[];
  rating: number;
  reviewCount: number;
  reviewsCount?: number;
  stock: boolean;
  inStock?: boolean;
  sizes?: string[];
};

export function normalizeWpProduct(prod: any): Product {
  const imagesList: string[] = prod.images?.length
    ? prod.images.map((img: any) => (typeof img === 'string' ? img : img.src))
    : (prod.image ? [prod.image] : ['/media/alvero-oil-bottle.webp']);

  const primaryImage = prod.image || imagesList[0] || '/media/alvero-oil-bottle.webp';
  const price = Number(prod.price || prod.regular_price || 0);
  const regularPrice = prod.regular_price ? Number(prod.regular_price) : (prod.regularPrice || prod.oldPrice || prod.originalPrice);
  const oldPrice = regularPrice && Number(regularPrice) > price ? Number(regularPrice) : undefined;
  const isInstock = prod.stock_status ? prod.stock_status === 'instock' : (prod.stock !== undefined ? Boolean(prod.stock) : (prod.inStock !== undefined ? Boolean(prod.inStock) : true));

  const rawCategories = Array.isArray(prod.categories) && prod.categories.length
    ? prod.categories.map((c: any) => ({
        id: String(c.id || c.slug),
        name: String(c.name || 'Haircare'),
        slug: String(c.slug || 'haircare')
      }))
    : [{ id: '0', name: prod.category || 'Haircare', slug: prod.categorySlug || 'haircare' }];

  const shortDesc = prod.short_description
    ? prod.short_description.replace(/<[^>]+>/g, '').trim()
    : (prod.blurb || prod.tagline || prod.shortDescription || 'Nature-led care for hair');
  const fullDesc = prod.description
    ? prod.description.replace(/<[^>]+>/g, '').trim()
    : (prod.description || '');

  let discount: string | undefined = prod.discount;
  if (!discount && oldPrice && oldPrice > price) {
    const pct = Math.round(((oldPrice - price) / oldPrice) * 100);
    discount = `${pct}% OFF`;
  }

  return {
    id: String(prod.id || prod.slug),
    slug: prod.slug,
    name: prod.name,
    category: rawCategories[0]?.name || prod.category || 'Haircare',
    categorySlug: rawCategories[0]?.slug || prod.categorySlug || 'haircare',
    categories: rawCategories,
    price: price,
    oldPrice: oldPrice,
    originalPrice: oldPrice,
    regularPrice: oldPrice,
    salePrice: price,
    discount: discount,
    badge: prod.featured ? 'Best Seller' : prod.badge,
    image: primaryImage,
    images: imagesList,
    gallery: imagesList,
    blurb: shortDesc,
    shortDescription: shortDesc,
    description: fullDesc,
    features: Array.isArray(prod.features) && prod.features.length ? prod.features : ['Lightweight botanical blend', 'Helps nourish hair roots', 'Suitable for regular hair care'],
    concerns: Array.isArray(prod.concerns) && prod.concerns.length ? prod.concerns : ['hair-fall', 'dry-hair', 'scalp-care', 'daily-care'],
    rating: Number(prod.rating || 4.9),
    reviewCount: Number(prod.reviewCount || prod.reviewsCount || 120),
    reviewsCount: Number(prod.reviewCount || prod.reviewsCount || 120),
    stock: isInstock,
    inStock: isInstock,
    sizes: prod.sizes || ['200ml']
  };
}


export type Review = {
  name: string;
  initials: string;
  rating: number;
  date: string;
  text: string;
  accent: string;
  image?: string;
};

export const brand = {
  name: "ALVERO",
  descriptor: "HAIR SOLUTIONS",
  tagline: "We believe healthy hair begins with the right care.",
  description:
    "At Alvero Hair Solutions, we believe healthy hair begins with the right care. Our mission is to provide effective, high-quality hair solutions that restore confidence and enhance natural beauty.",
  phone: "+88 01811899068",
  whatsapp: "https://wa.me/8801811899068",
  email: "alverohairsolutions@gmail.com",
  address: "Dhaka, Bangladesh, 1212",
  facebook: "https://www.facebook.com/AlveroHairSolutions",
  instagram: "https://www.instagram.com/alverohairsolutions",
  tiktok: "https://www.tiktok.com/@alverohairsolutions",
  creatorName: "Naeem Nahiyan",
  creatorUrl: "https://www.facebook.com/naeemdaprince/"
};

export const categories = [
  { slug: "haircare", label: "Haircare" },
  { slug: "hair-oil", label: "Hair Oil" },
  { slug: "hair-toner", label: "Hair Toner" },
  { slug: "shampoo", label: "Shampoo" },
  { slug: "packages", label: "Packages" }
];

export const products: Product[] = [
  {
    slug: "alvero-hair-oil-200ml",
    name: "Alvero Hair Oil — 200ml",
    category: "Hair Oil",
    categorySlug: "hair-oil",
    price: 600,
    oldPrice: 850,
    discount: "29% OFF",
    badge: "Best Seller",
    image: "/media/hair-oil-nature.webp",
    gallery: ["/media/hair-oil-nature.webp", "/media/hair-oil-botanical.webp", "/media/hair-oil-herbal.webp"],
    blurb: "Botanical nourishment for stronger, healthier-looking hair.",
    description:
      "A nature-inspired hair oil crafted for everyday nourishment. Massage it into the scalp and lengths to help hair feel softer, smoother and beautifully cared for.",
    features: ["Lightweight botanical blend", "Helps nourish hair roots", "Suitable for regular hair care", "200ml bottle"],
    concerns: ["hair-fall", "dry-hair", "scalp-care", "daily-care"],
    rating: 4.9,
    reviewCount: 124,
    stock: true
  },
  {
    slug: "alvero-botanical-glow-oil",
    name: "Botanical Glow Hair Oil",
    category: "Hair Oil",
    categorySlug: "hair-oil",
    price: 600,
    oldPrice: 800,
    discount: "25% OFF",
    badge: "New",
    image: "/media/hair-oil-botanical.webp",
    gallery: ["/media/hair-oil-botanical.webp", "/media/hair-oil-botanical-2.webp"],
    blurb: "A warm botanical ritual for shine, softness and daily confidence.",
    description:
      "Bring a little luxury to your hair ritual with a botanical oil designed to leave strands looking glossy and feeling nourished.",
    features: ["Botanical-inspired formula", "Adds a healthy-looking shine", "Easy-to-use pump bottle", "200ml bottle"],
    concerns: ["dry-hair", "daily-care", "scalp-care"],
    rating: 4.8,
    reviewCount: 86,
    stock: true
  },
  {
    slug: "alvero-herbal-hair-oil",
    name: "Alvero Herbal Hair Oil",
    category: "Hair Oil",
    categorySlug: "hair-oil",
    price: 600,
    oldPrice: 850,
    discount: "29% OFF",
    image: "/media/hair-oil-herbal.webp",
    gallery: ["/media/hair-oil-herbal.webp", "/media/hair-oil-nature.webp"],
    blurb: "A gentle herbal care essential for a calmer, softer hair routine.",
    description:
      "A simple herbal-inspired oil for the days your hair needs an extra moment of care. Use consistently as part of a relaxing scalp massage routine.",
    features: ["Herbal-inspired ingredients", "Supports a mindful scalp massage", "Suitable for all hair types", "200ml bottle"],
    concerns: ["dry-hair", "scalp-care", "daily-care"],
    rating: 4.7,
    reviewCount: 63,
    stock: true
  },
  {
    slug: "alvero-hair-toner-200ml",
    name: "Alvero Hair Toner — 200ml",
    category: "Hair Toner",
    categorySlug: "hair-toner",
    price: 350,
    oldPrice: 500,
    discount: "30% OFF",
    badge: "Daily Care",
    image: "/media/hair-toner.webp",
    gallery: ["/media/hair-toner.webp", "/media/alvero-cover.webp"],
    blurb: "A refreshing botanical mist for a clean, cared-for scalp feel.",
    description:
      "A refreshing toner for your everyday routine. Apply to the scalp as directed and enjoy a light, botanical-feeling step between wash days.",
    features: ["Refreshing daily step", "Botanical-inspired care", "Fine mist application", "200ml bottle"],
    concerns: ["hair-fall", "hair-growth", "scalp-care", "daily-care"],
    rating: 4.8,
    reviewCount: 98,
    stock: true
  },
  {
    slug: "alvero-botanical-shampoo-200ml",
    name: "Alvero Botanical Shampoo — 200ml",
    category: "Shampoo",
    categorySlug: "shampoo",
    price: 500,
    oldPrice: 650,
    discount: "23% OFF",
    badge: "Gentle Cleanse",
    image: "/media/shampoo.webp",
    gallery: ["/media/shampoo.webp", "/media/hair-care-benefits.webp"],
    blurb: "A botanical cleanse for fresh, balanced and healthy-looking hair.",
    description:
      "A gentle, botanical-inspired shampoo for a clean and refreshed wash-day ritual. Pair it with Alvero Hair Oil and Hair Toner for a complete routine.",
    features: ["Botanical cleansing ritual", "Comfortable everyday formula", "Pairs with the Alvero routine", "200ml bottle"],
    concerns: ["dandruff", "scalp-care", "daily-care"],
    rating: 4.8,
    reviewCount: 74,
    stock: true
  },
  {
    slug: "complete-hair-care-combo",
    name: "Complete Natural Hair Care Combo",
    category: "Packages",
    categorySlug: "packages",
    price: 1250,
    oldPrice: 1600,
    discount: "22% OFF",
    badge: "Best Value",
    image: "/media/complete-combo.webp",
    gallery: ["/media/complete-combo.webp", "/media/hair-care-benefits.webp", "/media/alvero-cover.webp"],
    blurb: "Oil, shampoo and toner together for a complete care ritual.",
    description:
      "Your complete Alvero ritual in one package: hair oil, botanical shampoo and hair toner. A simple routine designed for regular care and consistent results.",
    features: ["Hair Oil — 200ml", "Botanical Shampoo — 200ml", "Hair Toner — 200ml", "Save with the complete combo"],
    concerns: ["hair-fall", "dry-hair", "scalp-care", "daily-care"],
    rating: 4.9,
    reviewCount: 211,
    stock: true
  },
  {
    slug: "nature-in-every-drop-combo",
    name: "Nature In Every Drop Combo",
    category: "Packages",
    categorySlug: "packages",
    price: 1250,
    oldPrice: 1700,
    discount: "26% OFF",
    badge: "Limited Offer",
    image: "/media/hair-oil-nature.webp",
    gallery: ["/media/hair-oil-nature.webp", "/media/hair-oil-botanical-2.webp"],
    blurb: "A premium-looking ritual inspired by nature’s own ingredients.",
    description:
      "A curated combo for anyone beginning a consistent Alvero hair care routine. Enjoy the natural look and feel of a carefully designed daily ritual.",
    features: ["Curated hair care pairing", "Nature-inspired presentation", "Ideal for gifting", "Cash on Delivery available"],
    concerns: ["dry-hair", "daily-care", "scalp-care"],
    rating: 4.8,
    reviewCount: 137,
    stock: true
  },
  {
    slug: "stronger-hair-ritual",
    name: "Stronger Hair Ritual — 3 Step Care",
    category: "Packages",
    categorySlug: "packages",
    price: 1250,
    oldPrice: 1750,
    discount: "29% OFF",
    badge: "Complete Care",
    image: "/media/hair-care-benefits.webp",
    gallery: ["/media/hair-care-benefits.webp", "/media/complete-combo.webp", "/media/hair-toner.webp"],
    blurb: "Nourish, cleanse and refresh with one simple three-step routine.",
    description:
      "A complete three-step routine for customers who want to make hair care a simple, repeatable habit: nourish, cleanse and refresh.",
    features: ["Nourish with Hair Oil", "Cleanse with Shampoo", "Refresh with Hair Toner", "Designed for routine building"],
    concerns: ["hair-growth", "hair-fall", "daily-care", "scalp-care"],
    rating: 4.9,
    reviewCount: 93,
    stock: true
  }
];

export const reviews: Review[] = [
  {
    name: "Farzana Rahman",
    initials: "F",
    rating: 5,
    date: "12 August 2026",
    text: "The packaging feels premium and the oil has become a very relaxing part of my weekly routine. My hair feels much softer.",
    accent: "#19734a",
    image: "/media/hair-oil-botanical.webp"
  },
  {
    name: "Sadia Islam",
    initials: "S",
    rating: 5,
    date: "08 August 2026",
    text: "I ordered the full combo and the delivery was quick. The three-step routine is easy to follow and the products look beautiful.",
    accent: "#2f9d73",
    image: "/media/complete-combo.webp"
  },
  {
    name: "Nusrat Jahan",
    initials: "N",
    rating: 4,
    date: "02 August 2026",
    text: "The toner feels light and refreshing. I like that the bottles look clean and the instructions are easy to understand.",
    accent: "#ad7b31",
    image: "/media/hair-toner.webp"
  },
  {
    name: "Maliha Chowdhury",
    initials: "M",
    rating: 5,
    date: "28 July 2026",
    text: "A lovely local hair care brand. I bought the shampoo and oil together and the whole experience felt thoughtful.",
    accent: "#c34b70",
    image: "/media/shampoo.webp"
  },
  {
    name: "Tanjim Ahmed",
    initials: "T",
    rating: 5,
    date: "21 July 2026",
    text: "The combo price is good and Cash on Delivery made ordering easy. I would recommend trying the complete routine.",
    accent: "#4772a8",
    image: "/media/hair-care-benefits.webp"
  },
  {
    name: "Raisa Noor",
    initials: "R",
    rating: 4,
    date: "17 July 2026",
    text: "The hair oil has a pleasant feel and does not make my routine complicated. Very nice presentation too.",
    accent: "#8a5bb6",
    image: "/media/hair-oil-herbal.webp"
  },
  {
    name: "Afsana Hossain",
    initials: "A",
    rating: 5,
    date: "10 July 2026",
    text: "I purchased the three-step set as a gift. The branding and product images are beautiful and the recipient loved it.",
    accent: "#cb7a39",
    image: "/media/before-after.webp"
  },
  {
    name: "Jannatul Ferdous",
    initials: "J",
    rating: 5,
    date: "04 July 2026",
    text: "Fast response from the page and the products arrived safely. The green and gold branding looks very premium.",
    accent: "#168b74",
    image: "/media/alvero-cover.webp"
  }
];

export const ugcImages = [
  "/media/complete-combo.webp",
  "/media/hair-oil-botanical.webp",
  "/media/hair-toner.webp",
  "/media/shampoo.webp",
  "/media/hair-oil-herbal.webp",
  "/media/hair-care-benefits.webp"
];

export const promiseItems = [
  { icon: "leaf", title: "Botanical Care", text: "Nature-inspired ingredients" },
  { icon: "truck", title: "Fast Delivery", text: "Across Bangladesh" },
  { icon: "shield", title: "Quality First", text: "Carefully packed orders" },
  { icon: "refresh", title: "Easy Support", text: "Here when you need us" }
];

export const concernGroups = [
  { id: "hair-fall", label: "Hair Fall", match: "hair-fall" },
  { id: "dry-hair", label: "Dry Hair", match: "dry-hair" },
  { id: "scalp-care", label: "Scalp Care", match: "scalp-care" },
  { id: "hair-growth", label: "Hair Growth", match: "hair-growth" },
  { id: "daily-care", label: "Daily Care", match: "daily-care" }
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(slug: string) {
  if (slug === "haircare" || slug === "all") return products;
  return products.filter((product) => product.categorySlug === slug);
}

export function getProductsByConcern(concern: string) {
  return products.filter((product) => product.concerns.includes(concern));
}

export function formatPrice(value: number) {
  return `৳${value.toLocaleString("en-BD")}`;
}
