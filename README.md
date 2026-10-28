# Maison Aurelle

Dark editorial luxury interior design studio, London. A complete Next.js website: Home, About, Services, Projects (with filters), project details (gallery + before/after), Process, Testimonials, Journal (filters, search, articles) and Contact.

- **Palette:** espresso, bone and brass
- **Fonts:** Bodoni Moda + Manrope

## Run it

```bash
npm install   # only needed if node_modules is missing
npm run dev   # http://localhost:3000
npm run build && npm start
npm run lint
```

## Where things live

- `src/app/` — pages; `layout.tsx` holds fonts, header and footer; `template.tsx` the page transition
- `src/app/globals.css` — colour tokens and fonts (Tailwind v4 `@theme`)
- `src/components/site/` — this studio's header, footer, cards and sections
- `src/components/motion/`, `src/components/ui/` — animation primitives and accessible widgets
- `src/lib/content/site.ts` — all copy, projects, services, articles, team and FAQs
- `src/app/api/contact/route.ts` — server-side form validation

The contact form validates in the browser and on the server, but **no email service is connected** (the success message says so). Add a provider such as Resend or Postmark in `src/app/api/contact/route.ts` to deliver enquiries.

Photography is loaded from Unsplash; the studio, people, addresses and reviews are fictional sample content.
