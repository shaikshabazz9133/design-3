// Shared by the client forms and the /api/contact route so both sides
// enforce exactly the same rules.

export const PROJECT_TYPES = [
  "Full residence",
  "Single room",
  "Kitchen",
  "Commercial space",
  "Renovation",
  "Consultation only",
] as const;

export const BUDGETS = [
  "Under €25k",
  "€25k – €75k",
  "€75k – €200k",
  "€200k +",
  "Not sure yet",
] as const;

export type ContactInput = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
  consent: boolean;
  /** Honeypot: real visitors never see or fill this field. */
  company: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const emptyContact: ContactInput = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  message: "",
  consent: false,
  company: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s-]{7,20}$/;

export function validateContact(input: Partial<ContactInput>): ContactErrors {
  const errors: ContactErrors = {};
  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const phone = (input.phone ?? "").trim();
  const message = (input.message ?? "").trim();

  if (name.length < 2) errors.name = "Please tell us your name.";
  else if (name.length > 80) errors.name = "That name is a little long — 80 characters max.";

  if (!email) errors.email = "We need an email address to reply.";
  else if (!EMAIL_RE.test(email)) errors.email = "That email address doesn't look quite right.";

  if (phone && !PHONE_RE.test(phone)) errors.phone = "Use digits, spaces and + ( ) - only.";

  if (!input.projectType || !(PROJECT_TYPES as readonly string[]).includes(input.projectType))
    errors.projectType = "Choose the option closest to your project.";

  if (input.budget && !(BUDGETS as readonly string[]).includes(input.budget))
    errors.budget = "Choose one of the listed ranges.";

  if (message.length < 20) errors.message = "A few more details please — at least 20 characters.";
  else if (message.length > 2000) errors.message = "Please keep your message under 2,000 characters.";

  if (!input.consent) errors.consent = "Please confirm we may contact you about your enquiry.";

  return errors;
}
