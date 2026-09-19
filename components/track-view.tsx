"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, PackageIcon } from "@/components/icons";
import { useLanguage } from "@/components/language-context";
import { trackOrdersByPhone } from "@/lib/api";

export function TrackView() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[] | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const { language, t } = useLanguage();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!phone || loading) return;

    setLoading(true);
    setErrorMsg("");
    setOrders(null);

    try {
      const res = await trackOrdersByPhone(phone);
      if (res.data && res.data.length > 0) {
        setOrders(res.data);
      } else {
        setErrorMsg(
          language === "bn"
            ? "এই ফোন নম্বরে কোনো অর্ডার খুঁজে পাওয়া যায়নি।"
            : "No orders found for this phone number."
        );
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        language === "bn"
          ? "অর্ডার ট্র্যাক করতে ব্যর্থ হয়েছে। নম্বরটি চেক করুন।"
          : "Failed to track order. Please check the phone number."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="utility-page">
      <div className="utility-card-wrap">
        <div className="utility-icon">
          <PackageIcon size={28} />
        </div>
        <p className="eyebrow">{t("track.kicker")}</p>
        <h1>{t("track.title")}</h1>
        <p className="utility-lead">{t("track.copy")}</p>
        <form className="track-form" onSubmit={submit}>
          <label>
            {t("checkout.phone")}
            <div className="phone-input">
              <span className="phone-prefix">+88</span>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="018XXXXXXXX"
              />
            </div>
          </label>
          <button className="btn btn-primary utility-full-btn" type="submit" disabled={loading}>
            {loading
              ? language === "bn"
                ? "খুঁজা হচ্ছে..."
                : "Searching..."
              : t("track.track")}{" "}
            <ArrowRightIcon size={15} />
          </button>
        </form>

        {errorMsg && (
          <p className="track-result" style={{ color: "red", marginTop: "16px" }}>
            {errorMsg}
          </p>
        )}

        {orders && orders.length > 0 && (
          <div style={{ marginTop: "24px", textAlign: "left" }}>
            <h3 style={{ marginBottom: "12px", fontSize: "1.1rem" }}>
              {language === "bn" ? "পাওয়া অর্ডারসমূহ:" : "Your Orders:"}
            </h3>
            {orders.map((ord: any) => (
              <div
                key={ord.id}
                style={{
                  background: "#f9f9f9",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  border: "1px solid #eee"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                  <span>#{ord.order_number}</span>
                  <span style={{ color: ord.status === "completed" ? "green" : "#d97706" }}>
                    {ord.status.toUpperCase()} ({ord.delivery_status})
                  </span>
                </div>
                <div style={{ fontSize: "0.9rem", color: "#555", marginTop: "6px" }}>
                  <p>Customer: {ord.customer_name}</p>
                  <p>Total: ৳{ord.total}</p>
                  <p>Address: {ord.shipping_address}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="utility-back" style={{ marginTop: "20px" }}>
          <Link href="/">{language === "bn" ? "Alvero হোমে ফিরুন" : "Back to Alvero home"}</Link>
        </p>
      </div>
    </div>
  );
}
