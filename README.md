# CloudTopia — Digital & Cloud Technologies

A bilingual (English/Arabic) marketing website for CloudTopia, built with Next.js 14, React 18, TypeScript, and Tailwind CSS. Features rich animations, 3D elements, and a modern design system.

## 🚀 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript, React 18 |
| **Styling** | Tailwind CSS 3.4 |
| **Animations** | Framer Motion, GSAP |
| **3D / Visual** | Three.js, React Three Fiber/Drei, Spline, tsparticles |
| **UI** | Radix UI primitives, Lucide icons |
| **i18n** | Custom bilingual system (EN/AR with RTL support) |

## 📋 Prerequisites

- **Node.js** ≥ 18.0 — [download](https://nodejs.org/)
- **npm** (comes with Node.js)

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
CloudTopia/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (Header, Footer, i18n, theme)
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Global styles
│   ├── sitemap.ts                # Auto-generated XML sitemap
│   ├── about/                    # About Us page
│   ├── services/                 # Services overview
│   ├── website-design/           # Website Design service page
│   ├── content-creation/         # Content Creation service page
│   ├── social-media-marketing/   # Social Media Marketing page
│   ├── ecommerce-solutions/      # E-Commerce Solutions page
│   ├── restaurant-qr-menu/       # Restaurant QR Menu page
│   ├── business-systems-development/ # Business Systems page
│   ├── web-applications/         # Web Applications page
│   ├── labs/                     # CloudTopia Labs (R&D)
│   ├── projects/                 # Projects portfolio
│   ├── contact/                  # Contact page
│   ├── privacy/                  # Privacy Policy
│   └── terms/                    # Terms of Service
├── components/
│   ├── Header.tsx                # Navigation with tubelight navbar
│   ├── Footer.tsx                # Site footer
│   ├── LanguageSwitcher.tsx      # EN/AR toggle
│   ├── theme-provider.tsx        # Dark/light theme
│   └── ui/                       # 40 reusable UI components
├── lib/
│   ├── utils.ts                  # Utility functions
│   └── i18n/                     # Internationalization
│       ├── LanguageContext.tsx    # Language context provider
│       ├── config.ts             # i18n config
│       └── translations/         # EN & AR translation files
├── hooks/                        # Custom React hooks
├── public/
│   ├── fonts/                    # Custom fonts
│   ├── icons/                    # Service & project icons
│   ├── images/                   # Images & assets
│   ├── robots.txt                # Search engine crawler rules
│   └── manifest.json             # PWA manifest
├── middleware.ts                  # i18n middleware
├── next.config.js                # Next.js config + security headers
├── tailwind.config.ts            # Tailwind theme & custom colors
└── tsconfig.json                 # TypeScript config
```

## 🌐 Bilingual Support

The site supports **English** and **Arabic** with full RTL layout:
- Language toggle in the header
- All page content available in both languages
- Translation files in `lib/i18n/translations/`
- RTL-aware component layouts

## 🔒 Security

Security headers configured in `next.config.js`:
- HSTS, CSP, X-Frame-Options, XSS Protection
- Referrer Policy, Permissions Policy
- No `X-Powered-By` header exposed

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full instructions.

**Quick deploy to Vercel:**
1. Push to GitHub
2. Import on [vercel.com/new](https://vercel.com/new)
3. Deploy — Vercel auto-detects Next.js

## 📄 License

Proprietary — CloudTopia © 2025

---

**Built for [CloudTopia](https://cloudtopia.net)**
