# landofstoneflowers.com

Astro static site · Cloudflare Pages · EN / RU / JP

## Stack
- **Framework:** Astro 4 (static output)
- **Hosting:** Cloudflare Pages (free tier)
- **Registrar:** Cloudflare Registrar
- **Languages:** EN (root) · RU (`/ru/`) · JP (`/ja/`)

---

## Local dev

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # dist/
npm run preview    # preview the build
```

---

## Deploy to Cloudflare Pages

### First time
1. Push this repo to GitHub (`sveta-landofstoneflowers-site`)
2. Cloudflare Dashboard → Pages → **Create a project** → Connect to Git
3. Settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Click **Save and Deploy**

### Connect domain
1. Cloudflare Dashboard → Pages → your project → **Custom domains**
2. Add `landofstoneflowers.com`
3. DNS updates automatically (domain is on Cloudflare Registrar)

### Auto-deploy
Every `git push` to `main` triggers a new deploy — no manual steps.

---

## File structure

```
src/
  layouts/
    Layout.astro       ← shared HTML shell + SEO head
  pages/
    index.astro        ← EN (root /)
    ru/index.astro     ← RU (/ru/)
    ja/index.astro     ← JP (/ja/)
    sitemap.xml.astro  ← auto-generated sitemap
  styles/
    global.css         ← design tokens + base styles
public/
  _headers             ← Cloudflare cache + security headers
  _redirects           ← URL redirects
  favicon.svg
  llms.txt             ← LLM/AI crawler description
  robots.txt
  styles/
    global.css         ← served as static asset
  images/              ← add book cover + illustration images here
```

---

## Adding images

Replace placeholder `<div>` blocks in each page with real `<img>` tags:

```astro
<!-- Hero book cover -->
<img src="/images/cover-en.jpg" alt="The Land of Stone Flowers book cover" width="560" height="720" />

<!-- Gallery spreads -->
<img src="/images/spread-1.jpg" alt="..." loading="lazy" />
```

Recommended image sizes:
- Book cover: 560×720px (2× for retina: 1120×1440px)
- Gallery spreads: 900×1200px
- OG image: 1200×630px → save as `/public/og-image.jpg`

---

## SEO checklist

- [x] `<title>` + `<meta name="description">` per language
- [x] Open Graph tags
- [x] hreflang alternates (EN / RU / JA / x-default)
- [x] JSON-LD `Book` + `Person` schema
- [x] `sitemap.xml` (auto-generated)
- [x] `robots.txt` (LLM crawlers welcome)
- [x] `llms.txt`
- [x] Cloudflare cache headers
- [ ] Add real `og-image.jpg` (1200×630)
- [ ] Verify canonical URLs after deploy
- [ ] Submit sitemap to Google Search Console
