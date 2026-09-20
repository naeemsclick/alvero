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

export interface AnnouncementItem {
  id: string;
  text_en: string;
  text_bn: string;
  enabled: boolean;
}

export interface MenuItemChild {
  id: string;
  label_en: string;
  label_bn: string;
  href: string;
  enabled: boolean;
  accent?: boolean;
}

export interface MenuItem {
  id: string;
  label_en: string;
  label_bn: string;
  href: string;
  enabled: boolean;
  accent?: boolean;
  children?: MenuItemChild[];
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
  navigation: {
    announcements: AnnouncementItem[];
    main_menu: MenuItem[];
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
  navigation: {
    announcements: [
      { id: '1', text_en: '🚚 Free Delivery On Complete Packages!', text_bn: '🚚 সম্পূর্ণ প্যাকেজে ফ্রি ডেলিভারি!', enabled: true },
      { id: '2', text_en: '🌿 Nature-inspired care for stronger, healthier hair', text_bn: '🌿 শক্ত ও স্বাস্থ্যকর চুলের জন্য প্রকৃতি-অনুপ্রাণিত যত্ন', enabled: true },
      { id: '3', text_en: '💚 Cash on Delivery available across Bangladesh', text_bn: '💚 বাংলাদেশজুড়ে ক্যাশ অন ডেলিভারি', enabled: true },
    ],
    main_menu: [
      {
        id: 'haircare',
        label_en: 'Haircare',
        label_bn: 'চুলের যত্ন',
        href: '/category/haircare',
        enabled: true,
        accent: false,
        children: [
          { id: 'hair-oil', label_en: 'Hair Oil', label_bn: 'হেয়ার অয়েল', href: '/category/hair-oil', enabled: true, accent: false },
          { id: 'hair-toner', label_en: 'Hair Toner', label_bn: 'হেয়ার টোনার', href: '/category/hair-toner', enabled: true, accent: false },
          { id: 'shampoo', label_en: 'Shampoo', label_bn: 'শ্যাম্পু', href: '/category/shampoo', enabled: true, accent: false },
          { id: 'packages', label_en: 'Packages', label_bn: 'প্যাকেজ', href: '/category/packages', enabled: true, accent: false },
          { id: 'all-haircare', label_en: 'All Haircare', label_bn: 'সব হেয়ার কেয়ার', href: '/category/haircare', enabled: true, accent: false },
        ],
      },
      {
        id: 'care-guide',
        label_en: 'Care Guide',
        label_bn: 'কেয়ার গাইড',
        href: '/guide',
        enabled: true,
        accent: false,
        children: [
          { id: 'hair-fall', label_en: 'Hair Fall', label_bn: 'চুল পড়া', href: '/guide/hair-fall-care', enabled: true, accent: false },
          { id: 'dry-hair', label_en: 'Dry Hair Routine', label_bn: 'শুষ্ক চুল', href: '/guide/dry-hair-routine', enabled: true, accent: false },
          { id: 'scalp-care', label_en: 'Scalp Care Basics', label_bn: 'স্ক্যাল্প কেয়ার', href: '/guide/scalp-care-basics', enabled: true, accent: false },
          { id: 'find-care-guide', label_en: 'Find Your Care', label_bn: 'আপনার যত্ন বেছে নিন', href: '/guide', enabled: true, accent: false },
        ],
      },
      { id: 'standalone-hair-oil', label_en: 'Hair Oils', label_bn: 'হেয়ার অয়েল', href: '/category/hair-oil', enabled: true, accent: false },
      { id: 'standalone-packages', label_en: 'Packages', label_bn: 'প্যাকেজ', href: '/category/packages', enabled: true, accent: false },
      { id: 'track', label_en: 'Track My Order', label_bn: 'অর্ডার ট্র্যাক করুন', href: '/track', enabled: true, accent: false },
      { id: 'refer', label_en: 'Refer & Win', label_bn: 'রেফার & জিতুন', href: '/refer-win', enabled: true, accent: true },
      { id: 'find-care-concerns', label_en: 'Find Your Care', label_bn: 'আপনার যত্ন বেছে নিন', href: '/#concerns', enabled: true, accent: true },
    ],
  },
};

// Fetch Site Settings from WordPress Admin (Hero Banner, Announcement, Pixels, Links)
export async function fetchStoreSettings(): Promise<StoreSettings> {
  try {
    const res = await fetch(`${WC_URL}/wp-json/alvero/v1/settings`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && (data.site || data.navigation)) {
        return {
          site: {
            ...DEFAULT_STORE_SETTINGS.site,
            ...(data.site || {}),
            social: {
              ...DEFAULT_STORE_SETTINGS.site.social,
              ...(data.site?.social || {})
            },
            footer: {
              ...DEFAULT_STORE_SETTINGS.site.footer,
              ...(data.site?.footer || {})
            }
          },
          navigation: {
            announcements: Array.isArray(data.navigation?.announcements) && data.navigation.announcements.length > 0
              ? data.navigation.announcements
              : DEFAULT_STORE_SETTINGS.navigation.announcements,
            main_menu: Array.isArray(data.navigation?.main_menu) && data.navigation.main_menu.length > 0
              ? data.navigation.main_menu
              : DEFAULT_STORE_SETTINGS.navigation.main_menu,
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
