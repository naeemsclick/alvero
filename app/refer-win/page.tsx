"use client";

import Link from "next/link";
import { ArrowRightIcon, GiftIcon } from "@/components/icons";
import { useLanguage } from "@/components/language-context";

export default function ReferWinPage() {
  const { language, t } = useLanguage();
  const steps = language === "bn" ? [["আপনার নম্বর শেয়ার করুন", "যে নম্বর দিয়ে অর্ডার করেছেন সেটি জানিয়ে বন্ধুর সঙ্গে Alvero শেয়ার করুন।"], ["৬০ দিনের মধ্যে অর্ডার করুন", "আপনার বন্ধু আমাদের কাছ থেকে প্রথম অর্ডার করে গ্রহণ করবেন।"], ["পান ৳৩০০ উপহার", "পরের অর্ডারে আপনার পছন্দের একটি উপহার উপভোগ করুন।"]] : [["Share your number", "Tell us the number you ordered with, then share Alvero with a friend."], ["They order within 60 days", "Your friend places and receives their first order with us."], ["You get ৳300 free", "Enjoy a free gift of your choice on your next order."]];
  return <div className="utility-page"><div className="utility-card-wrap"><div className="utility-icon"><GiftIcon size={28} /></div><p className="eyebrow">{t("refer.kicker")}</p><h1>{t("refer.title")}</h1><p className="utility-lead">{t("refer.copy")}</p><div className="referral-card">{steps.map(([title, text], index) => <div className="referral-step" key={title}><span className="step-number">{index + 1}</span><div><strong>{title}</strong><p>{text}</p></div></div>)}<p className="referral-note">💬 {language === "bn" ? "পরের অর্ডারের পর আমাদের মেসেজ করে রিওয়ার্ড ক্লেইম করুন—এবং কোন পণ্যটি পছন্দ তা জানান!" : "After your next order, just message us to claim your reward — and tell us which product you’d like!"}</p></div><Link className="btn btn-primary utility-full-btn" href="https://www.facebook.com/AlveroHairSolutions" target="_blank" rel="noreferrer">{t("refer.start")} <ArrowRightIcon size={15} /></Link><p className="utility-back"><Link href="/">{language === "bn" ? "Alvero হোমে ফিরুন" : "Back to Alvero home"}</Link></p></div></div>;
}
