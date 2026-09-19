import { NextResponse } from 'next/server';

const WC_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://cms.alvero.com.bd';
const CK = process.env.WC_CONSUMER_KEY || '';
const CS = process.env.WC_CONSUMER_SECRET || '';

export async function GET() {
  try {
    const endpoint = `${WC_URL}/index.php?rest_route=/wc/v3/products&consumer_key=${CK}&consumer_secret=${CS}&per_page=100`;
    const res = await fetch(endpoint, { cache: 'no-store' });

    if (res.ok) {
      const items = await res.json();
      const products = Array.isArray(items) ? items.map((prod: any) => ({
        id: String(prod.id),
        slug: prod.slug,
        name: prod.name,
        category: prod.categories?.[0]?.name || 'Haircare',
        categorySlug: prod.categories?.[0]?.slug || 'haircare',
        price: Number(prod.price || prod.regular_price || 0),
        originalPrice: prod.regular_price ? Number(prod.regular_price) : undefined,
        rating: 4.9,
        reviewsCount: 120,
        volume: '200ml',
        badge: prod.featured ? 'Best Seller' : undefined,
        tagline: prod.short_description?.replace(/<[^>]+>/g, '') || 'Nature-led care for hair',
        description: prod.description?.replace(/<[^>]+>/g, '') || '',
        images: prod.images?.length ? prod.images.map((img: any) => img.src) : ['/media/alvero-oil-bottle.webp'],
        inStock: prod.stock_status === 'instock',
      })) : [];
      return NextResponse.json(products);
    } else {
      return NextResponse.json([], { status: res.status });
    }
  } catch (err: any) {
    console.error('Error fetching WooCommerce products in route handler:', err);
    return NextResponse.json([], { status: 500 });
  }
}
