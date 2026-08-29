"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, PackageIcon } from "@/components/icons";
import { useLanguage } from "@/components/language-context";

export function TrackView() {
  const [submitted, setSubmitted] = useState(false);
  const { language, t } = useLanguage();
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
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
            {t("checkout.name")}
            <input required placeholder={language === "bn" ? "আপনার পুরো নাম" : "Your full name"} />
          </label>
          <label>
            {t("checkout.phone")}
            <div className="phone-input">
              <span className="phone-prefix">+88</span>
              <input required type="tel" placeholder="018XXXXXXXX" />
            </div>
          </label>
          <button className="btn btn-primary utility-full-btn" type="submit">
            {t("track.track")} <ArrowRightIcon size={15} />
          </button>
          {submitted && <p className="track-result">{t("track.demo")}</p>}
        </form>
        <p className="utility-back">
          <Link href="/">{language === "bn" ? "Alvero হোমে ফিরুন" : "Back to Alvero home"}</Link>
        </p>
      </div>
    </div>
  );
}
