"use client";

import { Check, Link2 } from "lucide-react";
import { useState } from "react";

/** Copies the current page URL; uses the native share sheet where available. */
export function ShareButton({ title, className }: { title: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // dismissed — fall through to copying
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  return (
    <button type="button" onClick={share} className={`inline-flex min-h-11 items-center gap-2 ${className ?? ""}`}>
      {copied ? <Check size={15} aria-hidden /> : <Link2 size={15} aria-hidden />}
      <span aria-live="polite">{copied ? "Link copied" : "Share article"}</span>
    </button>
  );
}
