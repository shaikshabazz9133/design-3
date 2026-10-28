"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { emptyContact, validateContact, type ContactErrors, type ContactInput } from "@/lib/contact";

/** Header state: `scrolled` past the hero edge, `hidden` while scrolling down. */
export function useScrollHeader(threshold = 40) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > threshold);
    setHidden(y > 320 && y > prev + 4);
    if (y < prev - 4) setHidden(false);
  });

  return { scrolled, hidden };
}

/**
 * Mobile menu open state that closes on route change, on Escape, and when the
 * page is hidden by Next's Activity-based route preservation.
 */
export function useMobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useLayoutEffect(() => () => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return { open, setOpen, toggle: () => setOpen((o) => !o), pathname };
}

/** True when `href` is the current page, or a parent section of it. */
export function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; reference: string }
  | { state: "error"; message: string };

/** Contact form state with client validation, server re-validation and honest result states. */
export function useContactForm() {
  const [values, setValues] = useState<ContactInput>(emptyContact);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInput, boolean>>>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const next = {
      ...values,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    } as ContactInput;
    setValues(next);
    if (touched[name as keyof ContactInput]) {
      const all = validateContact(next);
      setErrors((prev) => ({ ...prev, [name]: all[name as keyof ContactInput] }));
    }
  };

  const onBlur = (e: { target: { name: string } }) => {
    const name = e.target.name as keyof ContactInput;
    setTouched((t) => ({ ...t, [name]: true }));
    const all = validateContact(values);
    setErrors((prev) => ({ ...prev, [name]: all[name] }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])));
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus({ state: "success", reference: data.reference });
      } else if (data.errors) {
        setErrors(data.errors);
        setStatus({ state: "error", message: "A few fields need another look." });
      } else {
        setStatus({ state: "error", message: data.message ?? "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ state: "error", message: "We couldn't reach the server. Check your connection and try again." });
    }
  };

  const reset = () => {
    setValues(emptyContact);
    setErrors({});
    setTouched({});
    setStatus({ state: "idle" });
  };

  /** Props for an input/select/textarea plus its a11y wiring. */
  const field = (name: keyof ContactInput) => ({
    id: `contact-${name}`,
    name,
    onChange,
    onBlur,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  return { values, errors, status, onSubmit, reset, field };
}
