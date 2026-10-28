import { validateContact, type ContactInput } from "@/lib/contact";

// Validates enquiries server-side. No email or CRM integration is connected,
// so the response says the enquiry was validated, never that it was sent.
export async function POST(request: Request) {
  let body: Partial<ContactInput>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: "The request could not be read." }, { status: 400 });
  }

  // Bots fill the hidden honeypot; answer as if accepted so they learn nothing.
  if (body.company) {
    return Response.json({ ok: true, reference: "REF-000000", delivered: false });
  }

  const errors = validateContact(body);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const reference = `REF-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  return Response.json({ ok: true, reference, delivered: false });
}
