import { container } from "./ui";

/** Placeholder shown while a project or article streams in. */
export function DetailSkeleton({ dark }: { dark?: boolean }) {
  return (
    <div role="status" aria-label="Loading" className="animate-pulse">
      {dark ? (
        <div className="h-[92svh] min-h-[560px] bg-raised">
          <div className={`${container} flex h-full flex-col justify-end gap-6 pb-20`}>
            <div className="h-3 w-40 bg-bone/10" />
            <div className="h-20 w-3/4 max-w-3xl bg-bone/10" />
            <div className="h-4 w-1/2 max-w-md bg-bone/10" />
          </div>
        </div>
      ) : (
        <div className={`${container} flex flex-col items-center gap-6 pb-14 pt-44`}>
          <div className="h-3 w-32 bg-champagne" />
          <div className="h-16 w-full max-w-3xl bg-raised" />
          <div className="h-3 w-64 bg-champagne" />
          <div className="mt-8 aspect-[21/9] w-full bg-raised" />
        </div>
      )}
    </div>
  );
}
