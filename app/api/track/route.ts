import { NextResponse } from 'next/server';

const WC_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://cms.alvero.com.bd';
const CK = process.env.WC_CONSUMER_KEY || '';
const CS = process.env.WC_CONSUMER_SECRET || '';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone') || '';

    if (!phone) {
      return NextResponse.json({ data: [] });
    }

    const endpoint = `${WC_URL}/index.php?rest_route=/wc/v3/orders&search=${encodeURIComponent(phone)}&consumer_key=${CK}&consumer_secret=${CS}`;

    const res = await fetch(endpoint, {
      headers: {
        'Accept': 'application/json'
      },
      cache: 'no-store'
    });

    if (!res.ok) {
      return NextResponse.json({ message: 'Failed to track WooCommerce orders' }, { status: res.status });
    }

    const orders = await res.json();
    return NextResponse.json({
      data: Array.isArray(orders) ? orders.map((o: any) => ({
        order_number: `ORD-${o.id}`,
        customer_name: o.billing?.first_name || 'Customer',
        customer_phone: o.billing?.phone,
        total: o.total,
        status: o.status,
        placed_at: o.date_created
      })) : []
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
