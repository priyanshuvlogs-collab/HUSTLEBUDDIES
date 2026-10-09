# Hustle Buddies Inc — Marketing Site

Single-page marketing site for Hustle Buddies Inc, an AI marketing agency.
React + Vite + TypeScript, Tailwind CSS, React Three Fiber, GSAP ScrollTrigger,
Framer Motion, Lottie, Lenis, React Hook Form + Zod.

> **Before launch:** work through [`PLACEHOLDERS.md`](./PLACEHOLDERS.md). Every bracketed
> item must be replaced with real, verifiable information, or removed. Do not invent
> clients, numbers, testimonials, or credentials.

## Quick start

Requires Node 20+.

```bash
npm install
npm run dev        # http://localhost:5173 (the /api/contact endpoint works locally too)
```

| Script              | What it does                                               |
| ------------------- | ---------------------------------------------------------- |
| `npm run dev`       | Dev server with hot reload                                 |
| `npm run build`     | Type-check and build to `dist/`                            |
| `npm run preview`   | Serve the production build locally (port 4173)             |
| `npm run typecheck` | TypeScript only                                            |
| `npm run lint`      | ESLint                                                     |
| `npm run format`    | Prettier                                                   |
| `npm run lottie`    | Regenerate the placeholder Lottie icons in `public/lottie` |

## Editing content

**All copy lives in [`src/content.ts`](./src/content.ts).** Edit text there; you do not
need to touch components. That includes the hero, services, process steps, results,
about/team, FAQ, contact copy, and footer links.

- **Form options** (budget ranges, services list): `src/lib/schema.ts`. These are shared
  by the browser form and the server, so validation stays in sync.
- **Results:** set each item's `value` to a verified number to turn on the counter
  animation. While `value` is `0`, the card shows `[X]%` and a "placeholder" badge.
- **Team photos:** put a WebP/AVIF file (square, ~160px) in `public/team/` and set
  `photo: '/team/name.webp'` on the member in `content.ts`.
- **Logo:** replace `src/components/brand/Logo.tsx` (and `markPaths.ts`, used by the
  preloader), plus `public/logo.svg` and `public/favicon.svg`.
- **Lottie icons:** drop designer-made JSON files into `public/lottie/` using the same
  names (`content`, `ads`, `seo`, `automation`, `strategy`, `analytics`). Avoid
  Lottie _expressions_: the site uses the light player, which skips them (no `eval`,
  CSP-safe).
- **Colors / type:** design tokens are in `src/styles/tokens.css`.

## Project structure

```
api/contact.ts              Vercel function → server/handleContact.ts
netlify/functions/contact.ts Netlify function → server/handleContact.ts
server/handleContact.ts     Validation (Zod), sanitising, honeypot, webhook forwarding
server/devApi.ts            Serves /api/contact during `vite dev` / `vite preview`
src/content.ts              All copy
src/lib/                    Zod schema, sanitiser, GSAP setup, analytics, WebGL checks
src/hooks/                  useReducedMotion, useInView, useGsap, useLenis, useMagnetic, …
src/components/three/       Lazy-loaded WebGL scenes (hero, particles) + parallax shapes
src/components/sections/    One file per page section
src/components/ui|layout/   Buttons, accordion, counter, nav, menu, footer, cursor, preloader
public/                     Fonts, Lottie JSON, OG image, robots.txt, sitemap.xml
```

## Contact form

The form posts JSON to `/api/contact`. The server re-validates with the same Zod schema,
strips HTML/control characters, drops honeypot submissions, and forwards the result to
`CONTACT_WEBHOOK_URL` (e.g. a CRM, GoHighLevel, Zapier or Make webhook).

**If `CONTACT_WEBHOOK_URL` is not set, submissions are only written to the function
logs.** Set it before launch.

## Environment variables

Copy `.env.example` to `.env` for local development.

| Name                  | Where           | Purpose                                                          |
| --------------------- | --------------- | ---------------------------------------------------------------- |
| `VITE_GA_ID`          | Build (public)  | GA4 measurement ID. Analytics stays off while it is `G-XXXXXXX`. |
| `CONTACT_WEBHOOK_URL` | Server (secret) | Destination for contact submissions                              |

Never commit real secrets. Set them in the hosting dashboard.

## Deployment

### Vercel

1. Push the repo to GitHub and import it at vercel.com/new. The framework (Vite) is picked up automatically.
2. Add `VITE_GA_ID` and `CONTACT_WEBHOOK_URL` under **Settings → Environment Variables**.
3. Deploy. `vercel.json` adds the CSP and security headers; `api/contact.ts` becomes the
   `/api/contact` function.

### Netlify

1. Import the repo at app.netlify.com. `netlify.toml` sets the build command, publish
   folder, functions folder, and headers.
2. Add the same environment variables under **Site configuration → Environment variables**.
3. Deploy. `netlify/functions/contact.ts` is served at `/api/contact`.

### After deploying

- Replace `https://www.example.com` in `index.html`, `public/robots.txt`,
  `public/sitemap.xml`, and `site.url` in `src/content.ts` with your domain.
- Submit the form once and confirm it arrives at your webhook.
- If you add third-party scripts or embeds (e.g. Calendly), allow their domains in the
  `Content-Security-Policy` in **both** `vercel.json` and `netlify.toml`.

## Quality checks run on this build

- `npm run build` and `npm run lint`: clean.
- Playwright at 375, 768, 1024, and 1440px, with and without reduced motion: no
  horizontal scroll, exactly one `h1`, no console errors.
- Contact form: invalid submit shows inline errors; valid submit returns 200 and shows
  the success state; malformed API payloads get a 422.
- App verified under the production CSP (3D scene and Lottie icons load, no violations).
- Lighthouse desktop (local `vite preview`, headless Chromium): Performance 100,
  Accessibility 100, Best Practices 100, SEO 100. Re-run on the deployed site to confirm.

`npm audit` reports advisories in dev-only tooling (Tailwind 3's file watcher chain);
production dependencies audit clean.

See [`ANIMATIONS.md`](./ANIMATIONS.md) for the motion inventory and performance notes.
