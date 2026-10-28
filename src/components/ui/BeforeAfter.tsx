"use client";

import Image from "next/image";
import { useId, useState } from "react";

type Props = {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
  labelClassName?: string;
  handleClassName?: string;
  lineClassName?: string;
};

/**
 * Drag-to-compare slider. The control is a native range input layered over the
 * images, so it works with touch, mouse and keyboard (arrow keys) for free.
 */
export function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
  className,
  labelClassName,
  handleClassName,
  lineClassName,
}: Props) {
  const [pos, setPos] = useState(50);
  const id = useId();

  return (
    <div className={`relative isolate select-none overflow-hidden ${className ?? ""}`}>
      <Image src={after} alt={afterAlt} fill sizes="(min-width: 1024px) 80vw, 100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image
          src={before}
          alt={beforeAlt}
          fill
          sizes="(min-width: 1024px) 80vw, 100vw"
          className="object-cover grayscale-[35%] sepia-[20%]"
        />
      </div>

      <span className={`absolute left-4 top-4 ${labelClassName ?? ""}`}>Before</span>
      <span className={`absolute right-4 top-4 ${labelClassName ?? ""}`}>After</span>

      <div aria-hidden className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className={`absolute inset-y-0 -translate-x-1/2 w-px ${lineClassName ?? "bg-white"}`} />
        <div
          className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center ${handleClassName ?? ""}`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </div>
      </div>

      <label htmlFor={id} className="sr-only">
        Drag to compare before and after
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
