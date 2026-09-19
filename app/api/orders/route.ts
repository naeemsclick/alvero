import { NextResponse } from 'next/server';

const WC_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://cms.alvero.com.bd';
const CK = process.env.WC_CONSUMER_KEY || '';
const CS = process.env.WC_CONSUMER_SECRET || '';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const endpoint = `${WC_URL}/index.php?rest_route=/wc/v3/orders&consumer_key=${CK}&consumer_secret=${CS}`;

    const payload = {
      payment_method: 'cod',
      payment_method_title: 'Cash on Delivery',
      set_paid: false,
      billing: {
        first_name: data.customer_name,
        phone: data.customer_phone,
        address_1: data.shipping_address,
        email: data.customer_email || `${data.customer_phone}@customer.alvero.com`
      },
      shipping: {
        first_name: data.customer_name,
        address_1: data.shipping_address
      },
      line_items: [
        {
          product_id: 13,
          quantity: data.items?.[0]?.quantity || 1
        }
      ],
      shipping_lines: [
        {
          method_title: 'Delivery Charge',
          method_id: 'flat_rate',
          total: String(data.delivery_fee || 70)
        }
      ]
    };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Failed to place order in WooCommerce' }));
      return NextResponse.json(error, { status: res.status });
    }

    const order = await res.json();
    return NextResponse.json({
      order_number: `ORD-${order.id}`,
      id: order.id,
      total: order.total,
      status: order.status
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
