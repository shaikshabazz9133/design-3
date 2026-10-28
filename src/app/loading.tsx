export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="grid min-h-[70vh] place-items-center pt-24">
      <div className="flex flex-col items-center gap-5">
        <span className="block h-px w-24 origin-left animate-pulse bg-gold" />
        <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-mute">Preparing the room…</span>
      </div>
    </div>
  );
}
