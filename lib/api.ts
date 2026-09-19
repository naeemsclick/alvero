import { normalizeWpProduct, type Product } from "@/lib/data";

const WC_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://cms.alvero.com.bd';

export interface OrderPayload {
  order_number?: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  items: { name: string; quantity: number; price?: number }[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  payment_method: string;
  shipping_address: string;
  placed_at?: string;
}

export async function createOrder(data: OrderPayload) {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Failed to place order in WooCommerce' }));
    throw error;
  }

  return await res.json();
}

export async function trackOrdersByPhone(phone: string) {
  const res = await fetch(`/api/track?phone=${encodeURIComponent(phone)}`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Failed to track WooCommerce orders');
  }

  return await res.json();
}

// Fetch Site Settings from WordPress Admin (Hero Banner, Announcement, Pixels, Links)
export async function fetchStoreSettings() {
  try {
    const res = await fetch(`${WC_URL}/wp-json/alvero/v1/settings`, { cache: 'no-store' });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('Error fetching WordPress store settings:', err);
  }
  return null;
}

// Fetch Care Guides / Blog Posts from WordPress Admin Posts
export async function fetchWpGuides() {
  try {
    const res = await fetch(`${WC_URL}/wp-json/wp/v2/posts?_embed`, { cache: 'no-store' });
    if (res.ok) {
      const posts = await res.json();
      return posts.map((p: any) => ({
        id: p.id,
        slug: p.slug,
        title: p.title?.rendered || 'Alvero Care Guide',
        excerpt: p.excerpt?.rendered?.replace(/<[^>]+>/g, '') || '',
        content: p.content?.rendered || '',
        image: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://alvero.pages.dev/media/alvero-guide-1.jpg',
        date: p.date,
      }));
    }
  } catch (err) {
    console.error('Error fetching WordPress care guides:', err);
  }
  return [];
}

// Fetch Live Products from WooCommerce REST API via Route Handler
export async function fetchWpProducts(): Promise<Product[]> {
  try {
    const res = await fetch('/api/products', { cache: 'no-store' });
    if (res.ok) {
      const items = await res.json();
      if (Array.isArray(items)) {
        return items.map((item) => normalizeWpProduct(item));
      }
    }
  } catch (err) {
    console.error('Error fetching WooCommerce products:', err);
  }
  return [];
}
