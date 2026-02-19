# Deployment Guide — CloudTopia

## Recommended: Vercel

Vercel is the recommended platform for deploying Next.js applications.

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Production ready"
   git push origin main
   ```

2. **Import on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your GitHub repository
   - Vercel auto-detects Next.js — no extra config needed
   - Click **Deploy**

3. **Custom Domain** (optional)
   - In Vercel Dashboard → Settings → Domains
   - Add `cloudtopia.net` and configure DNS:
     - `A` record → `76.76.21.21`
     - `CNAME` for `www` → `cname.vercel-dns.com`

### Build Settings (auto-detected)

| Setting | Value |
|---------|-------|
| Framework | Next.js |
| Build Command | `next build` |
| Output Directory | `.next` |
| Install Command | `npm install` |

---

## Alternative Platforms

### Netlify
```bash
npm run build
# Deploy the `.next` output via Netlify CLI or Git integration
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test both English and Arabic language modes
- [ ] Submit sitemap to [Google Search Console](https://search.google.com/search-console)
- [ ] Submit sitemap to [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [ ] Verify `robots.txt` at `https://cloudtopia.net/robots.txt`
- [ ] Verify `sitemap.xml` at `https://cloudtopia.net/sitemap.xml`
- [ ] Test security headers at [securityheaders.com](https://securityheaders.com)
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev) audit
- [ ] Set up Google Analytics 4 or Plausible Analytics
- [ ] Add favicon files (`favicon.ico`, `icon-192x192.png`, `icon-512x512.png`, `apple-touch-icon.png`)
- [ ] Add Open Graph image (`og-image.png`) for social sharing

---

## Environment

No environment variables are required for the base deployment. If adding analytics or third-party integrations, configure them in `.env.local`:

```env
# Example (not currently required)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```
