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

export interface StoreSettings {
  site: {
    logo_url: string;
    brand_name: string;
    descriptor: string;
    phone: string;
    whatsapp_url: string;
    email: string;
    address: string;
    social: {
      facebook: string;
      instagram: string;
      tiktok: string;
    };
    footer: {
      tagline_en: string;
      tagline_bn: string;
      description_en: string;
      description_bn: string;
      copyright: string;
    };
  };
}

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  site: {
    logo_url: '/media/alvero-mark.png',
    brand_name: 'ALVERO',
    descriptor: 'HAIR SOLUTIONS',
    phone: '+88 01811899068',
    whatsapp_url: 'https://wa.me/8801811899068',
    email: 'alverohairsolutions@gmail.com',
    address: 'Dhaka, Bangladesh, 1212',
    social: {
      facebook: 'https://www.facebook.com/AlveroHairSolutions',
      instagram: 'https://www.instagram.com/alverohairsolutions',
      tiktok: 'https://www.tiktok.com/@alverohairsolutions',
    },
    footer: {
      tagline_en: 'We believe healthy hair begins with the right care.',
      tagline_bn: 'সঠিক যত্নে স্বাস্থ্যকর চুলের শুরু।',
      description_en: 'At Alvero Hair Solutions, we believe healthy hair begins with the right care. Our mission is to provide effective, high-quality hair solutions that restore confidence and enhance natural beauty.',
      description_bn: 'Alvero Hair Solutions-এ আমরা বিশ্বাস করি সঠিক যত্নেই স্বাস্থ্যকর চুলের শুরু। আত্মবিশ্বাস ফিরিয়ে আনতে ও প্রাকৃতিক সৌন্দর্য বাড়াতে আমাদের হেয়ার কেয়ার সমাধান তৈরি।',
      copyright: '© 2026 Alvero Hair Solutions. All rights reserved.',
    },
  },
};

// Fetch Site Settings from WordPress Admin (Hero Banner, Announcement, Pixels, Links)
export async function fetchStoreSettings(): Promise<StoreSettings> {
  try {
    const res = await fetch(`${WC_URL}/wp-json/alvero/v1/settings`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.site) {
        return {
          site: {
            ...DEFAULT_STORE_SETTINGS.site,
            ...data.site,
            social: {
              ...DEFAULT_STORE_SETTINGS.site.social,
              ...(data.site.social || {})
            },
            footer: {
              ...DEFAULT_STORE_SETTINGS.site.footer,
              ...(data.site.footer || {})
            }
          }
        };
      }
    }
  } catch (err) {
    console.error('Error fetching WordPress store settings:', err);
  }
  return DEFAULT_STORE_SETTINGS;
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
        excerpt: p.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim() || '',
        content: p.content?.rendered || '',
        image: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
        date: p.date,
      }));
    }
  } catch (err) {
    console.error('Error fetching WordPress care guides:', err);
  }
  return [];
}

export async function fetchWpGuideBySlug(slug: string) {
  try {
    const res = await fetch(`${WC_URL}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`, { cache: 'no-store' });
    if (res.ok) {
      const posts = await res.json();
      if (Array.isArray(posts) && posts.length > 0) {
        const p = posts[0];
        return {
          id: p.id,
          slug: p.slug,
          title: p.title?.rendered || 'Alvero Care Guide',
          excerpt: p.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim() || '',
          content: p.content?.rendered || '',
          image: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
          date: p.date,
        };
      }
    }
  } catch (err) {
    console.error('Error fetching WordPress guide by slug:', err);
  }
  return null;
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
