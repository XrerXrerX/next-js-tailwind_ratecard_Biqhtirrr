# CLAUDE.md

Guidance for Claude Code (and developers) working in this repository.

## What this is

A two-page marketing site for the TikTok KOL **Andien (@biqhtirrr)**:

- **`/`** — a **biolink** landing page: profile photo + CTA buttons (WhatsApp,
  TikTok, Instagram, and Copy-email with a "copied" toast).
- **`/ratecard`** — the full **rate card / media kit**: profile, audience demographics,
  pricing packages, analytics, and contact.

Built with **Next.js 15 (App Router)**, **React 18**, **TypeScript**, and **Tailwind
CSS**. Both pages are statically prerendered; there is no database, no auth, and no
backend state.

## Commands

```bash
npm run dev      # dev server (http://localhost:3000)
npm run build    # production build — run this to verify type-safety before deploy
npm start        # serve the production build on port 4023
npm run lint     # next lint
npx tsc --noEmit # type-check only
```

## Architecture

```
app/
  layout.tsx          Root layout: <html>, fonts (Plus Jakarta Sans), SEO metadata,
                      JSON-LD structured data, TikTok embed script.
  page.tsx            Biolink home (/). Client component (email copy + toast).
  ratecard/page.tsx   Rate card (/ratecard). Client component. The full media kit.
  globals.css         Global styles.
lib/
  site-content.ts     SHARED data + theme: SiteContent type, SITE_CONTENT, theme T.
                      Imported by both pages. Edit content here.
  utils.ts            cn() class-merge helper.
components/ui/         shadcn/ui primitives (Radix-based). ~47 components, mostly
                      unused (pages use inline styles). Available if needed.
hooks/                use-toast.
public/               Static assets (images served at site root, e.g. /11m.jpg).
```

Path alias: `@/*` → repo root (see `tsconfig.json`).

## Content model — IMPORTANT

**All page content is hardcoded** in the `SITE_CONTENT` constant in
`lib/site-content.ts` (typed by `SiteContent`), with theme colors in the `T` constant
in the same file. Both pages import from there, so one edit updates both. There is no
CMS.

👉 **See `CONTENT-GUIDE.md`** for a field-by-field map (which line edits what).

### History / removed back-office

This project previously had a JSON-backed admin editor. It has been **removed**:

- `app/adm-ads/` — admin editor UI (deleted)
- `app/api/content/` — GET/POST read/write of content (deleted)
- `app/api/upload/` — unauthenticated image upload (deleted)
- `data/content.json` — runtime content store (deleted)

`page.tsx` no longer fetches `/api/content`; `SITE_CONTENT` is the sole source of
truth. **Do not reintroduce the JSON/API approach** — content is intentionally
hardcoded and edited in source. There is now no server-side write surface (the old
`/api/upload` endpoint wrote files to `public/` without auth — it is gone, and
should stay gone).

## Conventions

- Both pages style components with **inline `style={{}}` objects** and the shared
  theme object `T` (from `lib/site-content.ts`), not Tailwind utility classes. Match
  that style when editing.
- `app/page.tsx` (biolink) is a `"use client"` component (the Copy-email button uses
  `useState` for the toast). Hover is handled by a small inline `<style>` block
  (`.biolink-btn`).
- `app/ratecard/page.tsx` is a `"use client"` component (uses `useState`/`useEffect`
  for scroll state, the email-copy button, and the image modal).
- Images live in `public/`; reference them with a root-relative path (`/foo.png`).
- After content/markup changes, run `npm run build` to catch type errors before
  deploying.
