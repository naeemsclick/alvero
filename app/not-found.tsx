import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

export default function NotFound() {
  return <div className="not-found"><div><p className="eyebrow">A little detour</p><h1>Page not found</h1><p>Let’s take you back to a calmer hair care routine.</p><Link className="btn btn-primary" href="/">Back to home <ArrowRightIcon size={15} /></Link></div></div>;
}
