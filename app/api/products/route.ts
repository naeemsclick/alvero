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
      const products = Array.isArray(items) ? items.map((prod: any) => {
        const imagesList = prod.images?.length
          ? prod.images.map((img: any) => img.src)
          : ['/media/alvero-oil-bottle.webp'];
        const primaryImage = imagesList[0] || '/media/alvero-oil-bottle.webp';

        const rawCategories = Array.isArray(prod.categories) && prod.categories.length
          ? prod.categories.map((c: any) => ({
              id: String(c.id),
              name: String(c.name),
              slug: String(c.slug)
            }))
          : [{ id: '0', name: 'Haircare', slug: 'haircare' }];

        const price = Number(prod.price || prod.regular_price || 0);
        const regularPrice = prod.regular_price ? Number(prod.regular_price) : undefined;
        const oldPrice = regularPrice && regularPrice > price ? regularPrice : undefined;
        const isInstock = prod.stock_status === 'instock';

        const shortDesc = prod.short_description
          ? prod.short_description.replace(/<[^>]+>/g, '').trim()
          : 'Nature-led care for hair';
        const fullDesc = prod.description
          ? prod.description.replace(/<[^>]+>/g, '').trim()
          : '';

        let discount: string | undefined = undefined;
        if (oldPrice && oldPrice > price) {
          const pct = Math.round(((oldPrice - price) / oldPrice) * 100);
          discount = `${pct}% OFF`;
        }

        return {
          id: String(prod.id),
          slug: prod.slug,
          name: prod.name,
          category: rawCategories[0]?.name || 'Haircare',
          categorySlug: rawCategories[0]?.slug || 'haircare',
          categories: rawCategories,
          price: price,
          oldPrice: oldPrice,
          originalPrice: oldPrice,
          regularPrice: regularPrice,
          salePrice: price,
          discount: discount,
          badge: prod.featured ? 'Best Seller' : undefined,
          image: primaryImage,
          images: imagesList,
          gallery: imagesList,
          blurb: shortDesc,
          shortDescription: shortDesc,
          description: fullDesc,
          features: ['Lightweight botanical blend', 'Helps nourish hair roots', 'Suitable for regular hair care'],
          concerns: ['hair-fall', 'dry-hair', 'scalp-care', 'daily-care'],
          rating: 4.9,
          reviewCount: 120,
          reviewsCount: 120,
          stock: isInstock,
          inStock: isInstock,
          sizes: ['200ml']
        };
      }) : [];
      return NextResponse.json(products);
    } else {
      return NextResponse.json([], { status: res.status });
    }
  } catch (err: any) {
    console.error('Error fetching WooCommerce products in route handler:', err);
    return NextResponse.json([], { status: 500 });
  }
}
