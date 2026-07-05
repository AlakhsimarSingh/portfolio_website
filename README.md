# Alakhsimar Singh — Portfolio (Next.js)

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Build for production
```bash
npm run build
npm start
```

## Before going live
1. **Set your real domain.** Open `lib/site.ts` and either edit `SITE_URL` directly,
   or set an environment variable `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`
   (e.g. in Vercel's Project Settings → Environment Variables). This one value
   drives canonical URLs, Open Graph tags, the sitemap, robots.txt, and JSON-LD.
2. **Deploy.** Easiest path: push this folder to a GitHub repo and import it at
   vercel.com — zero config needed, Next.js is auto-detected.
3. Once live, submit `https://yourdomain.com/sitemap.xml` in Google Search Console.

## What's covered for SEO
- Per-page `<title>`, meta description, canonical URL, Open Graph & Twitter cards
  (`app/*/page.tsx`, each exports its own `metadata`)
- `Person` + `WebSite` JSON-LD sitewide (`app/layout.tsx`)
- `ScholarlyArticle` JSON-LD for every publication (`app/research/page.tsx`)
- `SoftwareSourceCode` JSON-LD for featured projects (`app/tech`, `app/freelance`)
- `BreadcrumbList` JSON-LD + visible breadcrumb trail on every sub-page (`components/Breadcrumbs.tsx`)
- Auto-generated `/sitemap.xml` (`app/sitemap.ts`) and `/robots.txt` (`app/robots.ts`)
- `/llms.txt` — a plain-language site summary for AI crawlers/agents (`public/llms.txt`)
- Semantic HTML headings, `aria-current` on the active breadcrumb, visible focus states

## Editing content
- Bio, nav links, contact info, accent colors → `lib/site.ts`
- Page copy and structure → `app/*/page.tsx`
- Publications list (add/edit papers) → `app/research/page.tsx`, the `publications` array near the top
- Design tokens / styling → `app/globals.css`

## File structure
```
app/
  layout.tsx        root layout, sitewide metadata + JSON-LD
  page.tsx           hub ("/")
  tech/page.tsx
  research/page.tsx
  freelance/page.tsx
  design/page.tsx
  sitemap.ts          generates /sitemap.xml
  robots.ts           generates /robots.txt
  globals.css
components/
  NavBar.tsx          client component, active-link highlighting
  Breadcrumbs.tsx      visible trail + BreadcrumbList JSON-LD
  Footer.tsx
  LensCard.tsx
lib/
  site.ts             name, links, nav, accent colors — single source of truth
  schema.ts           JSON-LD builder functions
public/
  llms.txt
```
