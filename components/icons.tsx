import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (props: IconProps) => ({
  width: props.size ?? 20,
  height: props.size ?? 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props
});

export function SearchIcon(props: IconProps) {
  return <svg {...base(props)}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>;
}

export function BagIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M6 8h12l1 13H5L6 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>;
}

export function MenuIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M4 6h16M4 12h16M4 18h16" /></svg>;
}

export function CloseIcon(props: IconProps) {
  return <svg {...base(props)}><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

export function ChevronDownIcon(props: IconProps) {
  return <svg {...base(props)}><path d="m6 9 6 6 6-6" /></svg>;
}

export function ChevronRightIcon(props: IconProps) {
  return <svg {...base(props)}><path d="m9 18 6-6-6-6" /></svg>;
}

export function ArrowRightIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M4 12h15M13 6l6 6-6 6" /></svg>;
}

export function ArrowLeftIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M20 12H5m6-6-6 6 6 6" /></svg>;
}

export function LeafIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M20 4C10 4 4 8 4 15c0 2.7 1.8 5 4.7 5 5.9 0 10.4-6 11.3-16Z" /><path d="M4 20c3.2-5.2 7.3-8.4 12.4-10.6" /></svg>;
}

export function TruckIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></svg>;
}

export function ShieldIcon(props: IconProps) {
  return <svg {...base(props)}><path d="m12 3 8 3v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z" /><path d="m9 12 2 2 4-4" /></svg>;
}

export function RefreshIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M20 11a8 8 0 0 0-14.8-4L3 9" /><path d="M3 4v5h5M4 13a8 8 0 0 0 14.8 4L21 15" /><path d="M21 20v-5h-5" /></svg>;
}

export function PlayIcon(props: IconProps) {
  return <svg {...base(props)} fill="currentColor" stroke="none"><path d="m8 5 11 7-11 7V5Z" /></svg>;
}

export function PlusIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M12 5v14M5 12h14" /></svg>;
}

export function MinusIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M5 12h14" /></svg>;
}

export function CheckIcon(props: IconProps) {
  return <svg {...base(props)}><path d="m5 12 4 4L19 6" /></svg>;
}

export function MapPinIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.3" /></svg>;
}

export function MailIcon(props: IconProps) {
  return <svg {...base(props)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
}

export function PhoneIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M7 3h3l1.2 4-2 1.3a14 14 0 0 0 6.5 6.5l1.3-2 4 1.2v3c0 1.1-.9 2-2 2C11.2 19.9 4.1 12.8 3 5c0-1.1.9-2 2-2h2Z" /></svg>;
}

export function HeadsetIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M4 13v-1a8 8 0 0 1 16 0v1" /><path d="M4 13h3v5H5a1 1 0 0 1-1-1v-4ZM20 13h-3v5h2a1 1 0 0 0 1-1v-4Z" /><path d="M17 18c0 1.7-1.8 3-4 3h-1" /></svg>;
}

export function WhatsAppIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M20.4 11.7a8.2 8.2 0 0 1-12.1 7.2L4 20l1.2-4.1a8.2 8.2 0 1 1 15.2-4.2Z" /><path d="M9.2 8.2c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.3.1.5-.1.7l-.5.6c.6 1.1 1.5 1.9 2.6 2.5l.5-.5c.2-.2.4-.2.7-.1l1.5.7c.3.1.4.3.4.6v.4c0 .3-.1.5-.4.7-.4.3-1.1.4-1.5.3-2.7-.6-5-2.8-5.7-5.5-.1-.4 0-1.1.3-1.5Z" /></svg>;
}

export function GiftIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M4 10h16v10H4zM3 7h18v3H3zM12 7v13" /><path d="M12 7H8.5A2.5 2.5 0 1 1 11 4.5L12 7ZM12 7h3.5A2.5 2.5 0 1 0 13 4.5L12 7Z" /></svg>;
}

export function PackageIcon(props: IconProps) {
  return <svg {...base(props)}><path d="m4 7 8-4 8 4-8 4-8-4Z" /><path d="M4 7v10l8 4 8-4V7M12 11v10" /></svg>;
}

export function FacebookIcon(props: IconProps) {
  return <svg {...base(props)} fill="currentColor" stroke="none"><path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.2V10H7.3v3h2.8v8h3.4Z" /></svg>;
}

export function InstagramIcon(props: IconProps) {
  return <svg {...base(props)}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg>;
}

export function TikTokIcon(props: IconProps) {
  return <svg {...base(props)}><path d="M14 4v10.1a4.2 4.2 0 1 1-3.1-4.1" /><path d="M14 4c.7 2.3 2.1 3.5 4.5 3.7" /></svg>;
}

export function StarIcon(props: IconProps) {
  return <svg {...base(props)} fill="currentColor" stroke="none"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" /></svg>;
}

export function ClockIcon(props: IconProps) {
  return <svg {...base(props)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
}

export function SparkleIcon(props: IconProps) {
  return <svg {...base(props)}><path d="m12 2 1.2 5.4L18 9l-4.8 1.6L12 16l-1.2-5.4L6 9l4.8-1.6L12 2ZM19 15l.6 2.4L22 18l-2.4.6L19 21l-.6-2.4L16 18l2.4-.6L19 15Z" /></svg>;
}
