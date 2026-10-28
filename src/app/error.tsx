"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center px-5 pt-24 text-center">
      <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold-soft">Something went amiss</p>
      <h1 className="mt-6 font-serif text-5xl font-light leading-tight text-bone sm:text-6xl">This page didn&apos;t load as intended.</h1>
      <p className="mt-6 font-sans text-[15px] font-light leading-7 text-mute">Please try again — if the problem continues, our studio is happy to help by phone or email.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <button type="button" onClick={reset} className="min-h-12 bg-deep px-7 font-sans text-[11px] uppercase tracking-[0.24em] text-bone transition-colors hover:bg-gold hover:text-base">
          Try again
        </button>
        <Link href="/" className="inline-flex min-h-12 items-center border border-bone/30 px-7 font-sans text-[11px] uppercase tracking-[0.24em] transition-colors hover:bg-bone hover:text-base">
          Return home
        </Link>
      </div>
    </section>
  );
}
