// Bespoke, per-sub-service content for the website-design / website-development
// detail pages (the `digital-presence` website-creation services). The visual
// design + section components are shared across all of these pages, but the COPY
// is hand-crafted per service here — never string-templated from the slug — so
// each page reads uniquely for users and search engines.
//
// This registry grows section-by-section. Today it holds the hero (section 1).
// A slug present here renders the new bespoke website design; any slug NOT here
// falls back to the shared /services/[service] template, untouched.

export type ServiceLocale = "en" | "ar";

export type HeroContent = {
    /** Small eyebrow / pill label above the title. */
    badge: string;
    /** First line of the H1 (neutral/dark). */
    title1: string;
    /** Second line of the H1 (brand gradient) — carries the primary keyword. */
    title2: string;
    /** One- to two-sentence value proposition under the H1. */
    subtitle: string;
};

export type WebsiteServiceContent = {
    hero: Record<ServiceLocale, HeroContent>;
};

export const websiteServiceContent: Record<string, WebsiteServiceContent> = {
    "business-website-development": {
        hero: {
            en: {
                badge: "Business Websites",
                title1: "Business websites that",
                title2: "turn visitors into customers",
                subtitle:
                    "A fast, multilingual business website engineered around your services, your leads, and your growth — and owned 100% by you.",
            },
            ar: {
                badge: "مواقع الشركات",
                title1: "مواقع شركات",
                title2: "تحوّل الزوار إلى عملاء",
                subtitle:
                    "موقع أعمال سريع ومتعدد اللغات مبني حول خدماتك وعملائك ونموّك — وتملكه بالكامل.",
            },
        },
    },
    "landing-page-design": {
        hero: {
            en: {
                badge: "Landing Pages",
                title1: "Landing pages built",
                title2: "to convert, not just look good",
                subtitle:
                    "High-converting, lightning-fast landing pages for campaigns, launches, and ads — with the copy, structure, and tracking that win the click.",
            },
            ar: {
                badge: "صفحات الهبوط",
                title1: "صفحات هبوط مصمّمة",
                title2: "للتحويل لا للمظهر فقط",
                subtitle:
                    "صفحات هبوط سريعة وعالية التحويل للحملات والإطلاقات والإعلانات — بمحتوى وبنية وتتبّع يكسب النقرة.",
            },
        },
    },
    "corporate-website-design": {
        hero: {
            en: {
                badge: "Corporate Websites",
                title1: "Corporate websites with",
                title2: "the authority your brand deserves",
                subtitle:
                    "Polished, credible corporate sites for established companies — investor-ready, multilingual, and built to represent you at the highest level.",
            },
            ar: {
                badge: "المواقع المؤسسية",
                title1: "مواقع مؤسسية",
                title2: "بالمصداقية التي تليق بعلامتك",
                subtitle:
                    "مواقع مؤسسية أنيقة وموثوقة للشركات الراسخة — متعددة اللغات وجاهزة لتمثيلك على أعلى مستوى.",
            },
        },
    },
    "ecommerce-website-development": {
        hero: {
            en: {
                badge: "E-commerce Websites",
                title1: "Online stores designed",
                title2: "to sell around the clock",
                subtitle:
                    "Conversion-focused e-commerce builds with secure checkout, fast catalogs, and Arabic + English storefronts your customers trust.",
            },
            ar: {
                badge: "المتاجر الإلكترونية",
                title1: "متاجر إلكترونية مصمّمة",
                title2: "لتبيع على مدار الساعة",
                subtitle:
                    "متاجر تركّز على التحويل بدفع آمن وكتالوج سريع وواجهات عربية وإنجليزية يثق بها عملاؤك.",
            },
        },
    },
    "portfolio-websites": {
        hero: {
            en: {
                badge: "Portfolio Websites",
                title1: "Portfolio websites that",
                title2: "make your work unforgettable",
                subtitle:
                    "Striking, image-first portfolios for creatives, studios, and professionals — designed to showcase the work and book the next client.",
            },
            ar: {
                badge: "مواقع معرض الأعمال",
                title1: "مواقع أعمال",
                title2: "تجعل إبداعك لا يُنسى",
                subtitle:
                    "مواقع معرض أعمال بصرية لافتة للمبدعين والاستوديوهات والمحترفين — تبرز عملك وتجلب العميل التالي.",
            },
        },
    },
    "real-estate-website-development": {
        hero: {
            en: {
                badge: "Real Estate Websites",
                title1: "Real estate websites with",
                title2: "listings that close deals",
                subtitle:
                    "Property platforms with searchable listings, map views, and lead capture — built for agencies and developers across the Gulf.",
            },
            ar: {
                badge: "المواقع العقارية",
                title1: "مواقع عقارية",
                title2: "بقوائم تُغلق الصفقات",
                subtitle:
                    "منصات عقارية ببحث للقوائم وعرض على الخرائط والتقاط للعملاء — مبنية للمكاتب والمطوّرين في الخليج.",
            },
        },
    },
    "restaurant-website-development": {
        hero: {
            en: {
                badge: "Restaurant Websites",
                title1: "Restaurant websites that",
                title2: "fill tables and take orders",
                subtitle:
                    "Mouth-watering restaurant sites with menus, reservations, and QR ordering — fast, mobile-first, and bilingual for every guest.",
            },
            ar: {
                badge: "مواقع المطاعم",
                title1: "مواقع مطاعم",
                title2: "تملأ الطاولات وتستقبل الطلبات",
                subtitle:
                    "مواقع مطاعم شهيّة بقوائم وحجوزات وطلب عبر QR — سريعة وبواجهة جوّال أولاً وبلغتين لكل ضيف.",
            },
        },
    },
    "educational-website-development": {
        hero: {
            en: {
                badge: "Education Websites",
                title1: "Education websites built",
                title2: "to enroll and engage",
                subtitle:
                    "Websites for schools, academies, and course creators — with programs, admissions, and student portals that make learning easy to find.",
            },
            ar: {
                badge: "المواقع التعليمية",
                title1: "مواقع تعليمية",
                title2: "للتسجيل والتفاعل",
                subtitle:
                    "مواقع للمدارس والأكاديميات وصنّاع الدورات — ببرامج وقبول وبوابات طلاب تجعل التعلّم سهل الوصول.",
            },
        },
    },
    "website-redesign": {
        hero: {
            en: {
                badge: "Website Redesign",
                title1: "Website redesigns that",
                title2: "modernize and outperform",
                subtitle:
                    "Turn a dated, slow site into a fast, modern, search-optimized experience — without losing your rankings or your content.",
            },
            ar: {
                badge: "إعادة تصميم المواقع",
                title1: "إعادة تصميم مواقع",
                title2: "تُحدّث وتتفوّق",
                subtitle:
                    "حوّل موقعاً قديماً وبطيئاً إلى تجربة حديثة وسريعة ومهيّأة للبحث — دون فقدان ترتيبك أو محتواك.",
            },
        },
    },
    "website-maintenance": {
        hero: {
            en: {
                badge: "Website Care",
                title1: "Website maintenance that",
                title2: "keeps you fast and secure",
                subtitle:
                    "Ongoing updates, backups, security, and performance care — so your website stays fast, safe, and online while you run your business.",
            },
            ar: {
                badge: "صيانة المواقع",
                title1: "صيانة مواقع",
                title2: "تبقيك سريعاً وآمناً",
                subtitle:
                    "تحديثات ونسخ احتياطي وأمان وعناية بالأداء — ليبقى موقعك سريعاً وآمناً ومتاحاً بينما تدير عملك.",
            },
        },
    },
};

/** Stable list of the website sub-service slugs that use the new bespoke design. */
export const websiteServiceSlugs = Object.keys(websiteServiceContent);

/** Returns bespoke content for a website sub-service, or null to fall back to the shared template. */
export function getWebsiteServiceContent(slug: string): WebsiteServiceContent | null {
    return websiteServiceContent[slug] ?? null;
}

/** Narrow a raw locale string to the supported set. */
export function asServiceLocale(locale: string): ServiceLocale {
    return locale === "ar" ? "ar" : "en";
}
