"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, CheckIcon, MinusIcon, PlusIcon, ShieldIcon, StarIcon, TruckIcon } from "@/components/icons";
import { formatPrice, reviews } from "@/lib/data";
import { localizedProduct } from "@/lib/localize";
import { useCart } from "@/components/cart-context";
import { ReviewWall } from "@/components/home-sections";
import { useLanguage } from "@/components/language-context";
import { createOrder } from "@/lib/api";

export function CheckoutPage() {
  const { lines, subtotal, setQuantity, clear } = useCart();
  const { language, t } = useLanguage();
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const delivery = lines.length ? 60 : 0;
  const total = subtotal + delivery;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!lines.length || loading) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const itemsPayload = lines.map(({ product, quantity }) => ({
        name: product.name,
        quantity: quantity,
        price: product.price
      }));

      const res = await createOrder({
        customer_name: name,
        customer_phone: phone,
        items: itemsPayload,
        subtotal: subtotal,
        delivery_fee: delivery,
        total: total,
        payment_method: "cash_on_delivery",
        shipping_address: address
      });

      setSubmittedOrder(res);
      clear();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || (language === "bn" ? "অর্ডার সাবমিট করতে সমস্যা হয়েছে।" : "Failed to place order."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="cart-page">
      <div className="page-shell">
        <div className="breadcrumb">
          <Link href="/">{language === "bn" ? "হোম" : "Home"}</Link>
          <span>/</span>
          <span>{language === "bn" ? "কার্ট ও চেকআউট" : "Cart & checkout"}</span>
        </div>
        <div className="checkout-layout">
          <section className="checkout-panel">
            <p className="eyebrow">{t("checkout.almost")}</p>
            <h1 className="checkout-title">{t("checkout.shipping")}</h1>
            <form className="checkout-form" onSubmit={submit}>
              <label>
                {t("checkout.name")}
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === "bn" ? "আপনার পুরো নাম" : "Your full name"}
                />
              </label>
              <label>
                {t("checkout.phone")}
                <div className="phone-input">
                  <span className="phone-prefix">+88</span>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="015XXXXXXXX"
                  />
                </div>
              </label>
              <label>
                {t("checkout.address")}
                <textarea
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={language === "bn" ? "বাড়ি, রোড, এলাকা, শহর" : "House, road, area, city"}
                />
              </label>
              <div className="cash-note">
                <CheckIcon size={16} />
                <span>
                  <strong>{t("checkout.cash")}</strong>
                  <small>{t("checkout.cashCopy")}</small>
                </span>
              </div>

              {errorMsg && <p style={{ color: "red", margin: "8px 0" }}>{errorMsg}</p>}

              <button className="btn btn-primary checkout-submit" type="submit" disabled={loading}>
                {loading
                  ? language === "bn"
                    ? "অর্ডার প্রসেস হচ্ছে..."
                    : "Placing Order..."
                  : t("checkout.place")}{" "}
                <ArrowRightIcon size={15} />
              </button>

              {submittedOrder && (
                <div className="checkout-success" style={{ marginTop: "16px" }}>
                  <p>
                    🎉{" "}
                    <strong>
                      {language === "bn"
                        ? `অর্ডার সফল হয়েছে! (অর্ডার নং: ${submittedOrder.order_number})`
                        : `Order placed successfully! (Order #${submittedOrder.order_number})`}
                    </strong>
                  </p>
                  <p>
                    <small>
                      {language === "bn"
                        ? "আপনার দেওয়া ফোন নম্বর দিয়ে পরবর্তীতে অর্ডার ট্রাক করতে পারবেন।"
                        : "You can track your order status using your phone number."}
                    </small>
                  </p>
                </div>
              )}
            </form>
          </section>

          <aside className="checkout-panel order-summary">
            <div className="order-summary-head">
              <div>
                <p className="eyebrow">{t("cart.ritual")}</p>
                <h2>{t("checkout.summary")}</h2>
              </div>
              <span>
                {lines.length} {language === "bn" ? "টি পণ্য" : lines.length === 1 ? "item" : "items"}
              </span>
            </div>
            {lines.length ? (
              <>
                <div className="order-lines">
                  {lines.map(({ product, quantity }) => (
                    <div className="order-line" key={product.slug}>
                      <img src={product.image} alt="" />
                      <div>
                        <strong>{localizedProduct(product, language).name}</strong>
                        <span>
                          {language === "bn"
                            ? `পরিমাণ ${quantity} · প্রতি পিস ${formatPrice(product.price)}`
                            : `Qty ${quantity} · ${formatPrice(product.price)} each`}
                        </span>
                      </div>
                      <b>{formatPrice(product.price * quantity)}</b>
                      <div className="order-line-controls">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => setQuantity(product.slug, quantity - 1)}
                        >
                          <MinusIcon size={12} />
                        </button>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => setQuantity(product.slug, quantity + 1)}
                        >
                          <PlusIcon size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-totals">
                  <div>
                    <span>{t("cart.subtotal")}</span>
                    <strong>{formatPrice(subtotal)}</strong>
                  </div>
                  <div>
                    <span>{language === "bn" ? "ডেলিভারি" : "Delivery"}</span>
                    <strong>{formatPrice(delivery)}</strong>
                  </div>
                  <div>
                    <span>{language === "bn" ? "মোট" : "Total"}</span>
                    <strong>{formatPrice(total)}</strong>
                  </div>
                </div>
              </>
            ) : (
              <div className="order-empty">
                <p>{t("checkout.empty")}</p>
                <Link className="text-link" href="/category/haircare">
                  {t("cart.shopHaircare")} <ArrowRightIcon size={14} />
                </Link>
              </div>
            )}
          </aside>
        </div>

        <div className="checkout-feature-strip">
          <div>
            <TruckIcon size={17} />
            <span>
              <strong>{t("checkout.fast")}</strong>
              {language === "bn" ? "বাংলাদেশজুড়ে" : "Across Bangladesh"}
            </span>
          </div>
          <div>
            <ShieldIcon size={17} />
            <span>
              <strong>{t("checkout.secure")}</strong>
              {language === "bn" ? "সহজ ও নিরাপদ" : "Simple & safe"}
            </span>
          </div>
          <div>
            <StarIcon size={17} />
            <span>
              <strong>{t("checkout.thoughtful")}</strong>
              {language === "bn" ? "আপনার রুটিনের জন্য" : "Made for your ritual"}
            </span>
          </div>
        </div>

        <section className="checkout-reviews">
          <div className="section-heading">
            <p className="eyebrow">{language === "bn" ? "বাস্তব গল্প" : "Real stories"}</p>
            <h2>{language === "bn" ? "কাস্টমাররা কী বলছেন" : "What customers are saying"}</h2>
            <p className="section-description">
              {language === "bn" ? "অর্ডার দেওয়ার আগে একটু নিশ্চয়তা।" : "A little reassurance before you place your order."}
            </p>
          </div>
          <ReviewWall limit={reviews.length} />
        </section>
      </div>
    </div>
  );
}
