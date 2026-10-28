"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useContactForm } from "@/components/ui/hooks";
import { BUDGETS, PROJECT_TYPES } from "@/lib/contact";
import { EASE_OUT } from "@/components/motion/primitives";

const label = "block font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-mute";
const input =
  "mt-3 block w-full border-0 border-b border-bone/20 bg-transparent px-0 py-3 font-sans text-[15px] font-light text-bone placeholder:text-mute/60 transition-colors focus:border-gold focus:outline-none focus:ring-0 aria-[invalid=true]:border-[#f0a08a]";

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p id={id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-2 font-sans text-xs text-[#f0a08a]">
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export function ContactForm({ email }: { email: string }) {
  const { values, errors, status, onSubmit, reset, field } = useContactForm();

  if (status.state === "success") {
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE_OUT }} className="border border-gold/40 bg-raised p-8 sm:p-12" role="status">
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold-soft">Reference {status.reference}</p>
        <h3 className="mt-5 font-serif text-4xl font-light text-bone">Thank you, {values.name.split(" ")[0]}.</h3>
        <p className="mt-5 font-sans text-[15px] font-light leading-7 text-mute">
          Your enquiry passed our checks and is ready for the studio. Please note this demonstration site isn&apos;t connected to an email service, so nothing has been sent. To reach the team today, write to{" "}
          <a href={`mailto:${email}`} className="text-bone underline decoration-gold underline-offset-4">{email}</a>.
        </p>
        <button type="button" onClick={reset} className="mt-8 font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-bone underline decoration-gold underline-offset-8">
          Send another enquiry
        </button>
      </motion.div>
    );
  }

  const submitting = status.state === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-10 sm:grid-cols-2" aria-describedby={status.state === "error" ? "form-status" : undefined}>
      <div>
        <label htmlFor="contact-name" className={label}>Full name *</label>
        <input {...field("name")} value={values.name} autoComplete="name" placeholder="Your name" className={input} required />
        <FieldError id="contact-name-error" message={errors.name} />
      </div>
      <div>
        <label htmlFor="contact-email" className={label}>Email *</label>
        <input {...field("email")} value={values.email} type="email" autoComplete="email" placeholder="you@example.com" className={input} required />
        <FieldError id="contact-email-error" message={errors.email} />
      </div>
      <div>
        <label htmlFor="contact-phone" className={label}>Telephone</label>
        <input {...field("phone")} value={values.phone} type="tel" autoComplete="tel" placeholder="Optional" className={input} />
        <FieldError id="contact-phone-error" message={errors.phone} />
      </div>
      <div>
        <label htmlFor="contact-projectType" className={label}>Project type *</label>
        <select {...field("projectType")} value={values.projectType} className={`${input} cursor-pointer`} required>
          <option value="" disabled>Select one</option>
          {PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
        <FieldError id="contact-projectType-error" message={errors.projectType} />
      </div>
      <fieldset className="sm:col-span-2">
        <legend className={label}>Indicative budget</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {BUDGETS.map((b) => (
            <label key={b} className="cursor-pointer">
              <input type="radio" name="budget" value={b} checked={values.budget === b} onChange={field("budget").onChange} className="peer sr-only" />
              <span className="inline-flex min-h-11 items-center border border-bone/20 px-4 font-sans text-xs font-light text-mute transition-colors peer-checked:border-bone peer-checked:bg-bone peer-checked:text-base peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-soft hover:border-bone/50">
                {b}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="sm:col-span-2">
        <label htmlFor="contact-message" className={label}>Tell us about your project *</label>
        <textarea {...field("message")} value={values.message} rows={5} placeholder="The property, the rooms involved, your timing…" className={`${input} resize-y`} required />
        <div className="flex justify-between gap-4">
          <FieldError id="contact-message-error" message={errors.message} />
          <span className="ml-auto mt-2 font-sans text-[11px] text-mute/70">{values.message.length}/2000</span>
        </div>
      </div>
      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 font-sans text-sm font-light leading-6 text-mute">
          <input {...field("consent")} type="checkbox" checked={values.consent} className="mt-1 h-4 w-4 shrink-0 accent-bone" />
          I&apos;m happy for Maison Aurelle to contact me about this enquiry. We never share your details.
        </label>
        <FieldError id="contact-consent-error" message={errors.consent} />
      </div>
      {/* Honeypot for bots — hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input {...field("company")} value={values.company} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={submitting}
          className="group relative inline-flex min-h-14 items-center justify-center gap-3 overflow-hidden bg-bone px-10 font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-base disabled:cursor-wait disabled:opacity-80"
        >
          <span aria-hidden className="absolute inset-0 -translate-x-[101%] bg-gold transition-transform duration-700 ease-luxe group-hover:translate-x-0 group-disabled:translate-x-[-101%]" />
          <span className="relative transition-colors duration-500 group-hover:text-base">{submitting ? "Sending…" : "Send enquiry"}</span>
          {submitting ? <Loader2 size={15} className="relative animate-spin" aria-hidden /> : <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden className="relative transition-colors duration-500 group-hover:text-base" />}
        </button>
        {status.state === "error" && (
          <p id="form-status" role="alert" className="font-sans text-sm text-[#f0a08a]">{status.message}</p>
        )}
      </div>
    </form>
  );
}
