import type { ReactNode } from "react";

export function SectionHeading({ eyebrow, title, description, light = false, align = "center", children }: { eyebrow?: string; title: string; description?: string; light?: boolean; align?: "center" | "left"; children?: ReactNode }) {
  return (
    <div className={`section-heading ${light ? "section-heading-light" : ""} section-heading-${align}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
      {children}
    </div>
  );
}
