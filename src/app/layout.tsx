import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { BackToTop, CursorFollower, ScrollProgress } from "@/components/motion/extras";
import { MotionRoot } from "@/components/motion/primitives";
import { Loader } from "@/components/site/Loader";
import { site } from "@/lib/content/site";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-bodoni",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: {
    default: "Maison Aurelle — Luxury Interior Architecture, London",
    template: "%s — Maison Aurelle",
  },
  description: site.brand.description,
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { address, phone, phoneHref, email } = site.brand;
  return (
    <html lang="en" className={`${bodoni.variable} ${manrope.variable} antialiased`}>
      <body className="min-h-dvh bg-base font-sans text-bone">
        <MotionRoot>
          <Loader />
          <ScrollProgress className="bg-gold" />
          <CursorFollower className="border border-gold/70" activeClassName="border border-gold bg-gold/15" />
          <Header brand={{ address, phone, phoneHref, email }} />
          <main id="main">{children}</main>
          <Footer />
          <BackToTop className="bg-raised text-bone" ringClassName="stroke-gold" />
        </MotionRoot>
      </body>
    </html>
  );
}
