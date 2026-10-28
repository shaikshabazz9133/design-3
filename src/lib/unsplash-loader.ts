"use client";

type LoaderArgs = { src: string; width: number; quality?: number };

export default function unsplashLoader({ src, width, quality }: LoaderArgs) {
  if (!src.startsWith("https://images.unsplash.com/")) return src;
  const sep = src.includes("?") ? "&" : "?";
  return `${src}${sep}auto=format&fit=crop&w=${width}&q=${quality ?? 75}`;
}
