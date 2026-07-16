import { getIndustryVisual } from "@/components/industry/industryVisuals";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/url";
import { getIndustryManifestEntry } from "@/lib/industries/manifest";
import {
  CANONICAL_SERVICE_TARGETS,
  type CanonicalServiceId,
} from "@/lib/industries/service-targets";
import { isIndustrySlug } from "@/lib/industries/slugs";
import { countryLandingPages } from "@/lib/seo/country-landing-pages";
import { localizedValue, type IndustryData } from "@/lib/seo/industries";

export type LegacyIndustryLabels = {
  badge: string;
  problems: string;
  solution: string;
  useCases: string;
  services: string;
  relatedIndustries: string;
  features: string;
  benefits: string;
  process: string;
  markets: string;
  example: string;
  why: string;
  faqs: string;
  start: string;
  servicesCta: string;
  readyTitle: string;
  readyDesc: string;
  scope: string;
};

export type LegacyIndustryViewModel = {
  locale: Locale;
  slug: string;
  direction: "ltr" | "rtl";
  name: string;
  heroTitle: string;
  description: string;
  labels: LegacyIndustryLabels;
  breadcrumbLabels: {
    home: string;
    industries: string;
    current: string;
  };
  hub: {
    label: string;
    href: string;
  };
  relatedIndustries: Array<{
    slug: string;
    label: string;
    href: string;
  }>;
  seo: {
    title: string;
    description: string;
    image: string;
  };
  problems: string[];
  differentiators: string[];
  useCases: Array<{
    title: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  services: Array<{
    id: CanonicalServiceId;
    label: string;
    href: string;
    detail: string;
    status: string;
  }>;
  features: string[];
  benefits: string[];
  process: string[];
  markets: Array<{
    slug: string;
    name: string;
    href: string;
    currency: string;
    keyword: string;
  }>;
  ctas: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
  visual: {
    accent: string;
    tint: string;
    workflow: string;
    heroImage: string;
    heroAlt: string;
    sceneDescription: string;
  };
  hero: {
    eyebrow: string;
    metrics: Array<{ label: string; value: string }>;
    modes: Array<{
      label: string;
      title: string;
      description: string;
      items: string[];
    }>;
    protocols: Array<{
      name: string;
      detail: string;
      status: string;
    }>;
  };
  copy: {
    solutionSummary: string;
    example: string;
    marketPage: string;
  };
};

const labels: Record<Locale, LegacyIndustryLabels> = {
  en: {
    badge: "Industry Playbook",
    problems: "Problems we solve",
    solution: "CloudTopia solution",
    useCases: "Use cases we build",
    services: "Related services",
    relatedIndustries: "Related industries",
    features: "Digital features",
    benefits: "Business benefits",
    process: "Delivery process",
    markets: "Relevant markets",
    example: "Example build",
    why: "Why CloudTopia",
    faqs: "Common questions",
    start: "Start a project",
    servicesCta: "Explore services",
    readyTitle: "Ready to shape the right build?",
    readyDesc:
      "Send the sector, current workflow, and what needs to improve. We will reply with a practical scope direction.",
    scope: "Scope Direction",
  },
  ar: {
    badge: "دليل قطاعي",
    problems: "المشكلات التي نحلها",
    solution: "حل كلاود توبيا",
    useCases: "ما يمكننا بناؤه",
    services: "الخدمات المرتبطة",
    relatedIndustries: "قطاعات مرتبطة",
    features: "خصائص رقمية",
    benefits: "فوائد الأعمال",
    process: "طريقة التنفيذ",
    markets: "أسواق مرتبطة",
    example: "مثال تنفيذ",
    why: "لماذا كلاود توبيا",
    faqs: "أسئلة شائعة",
    start: "ابدأ مشروعاً",
    servicesCta: "استكشف الخدمات",
    readyTitle: "جاهز لتحديد نطاق التنفيذ المناسب؟",
    readyDesc:
      "أرسل القطاع، طريقة العمل الحالية، وما تريد تحسينه. سنرد باتجاه عملي للنطاق والخطوات.",
    scope: "اتجاه النطاق",
  },
};

const heroImages: Record<string, string> = {
  healthcare: "/images/homepage/Healthcare.png",
  fintech: "/images/homepage/Finance.png",
  "ecommerce-retail": "/images/homepage/E-commerce.webp",
  "real-estate": "/images/homepage/Real Estate.webp",
  education: "/images/homepage/Education.png",
  "travel-hospitality": "/images/homepage/Travel.webp",
  restaurants: "/images/homepage/Restaurants.jpg",
  "legal-firms": "/images/homepage/business systems.jpeg",
  construction: "/images/homepage/Logistics.webp",
  retail: "/images/homepage/E-commerce.jpg",
  "professional-services": "/images/homepage/digital presence.png",
  "logistics-supply-chain": "/images/homepage/Logistics.webp",
  "government-public-sector": "/images/homepage/cloud & infrastructure.webp",
};

function industryFeatures(name: string, locale: Locale) {
  return locale === "ar"
    ? [
        `صفحات خدمات مخصصة لقطاع ${name}`,
        "نماذج تأهيل تجمع الاحتياج والميزانية والوقت",
        "لوحات متابعة للطلبات والعملاء والمهام",
        "محتوى عربي وإنجليزي مع بنية SEO وأسئلة شائعة",
      ]
    : [
        `${name} service pages shaped around search intent`,
        "Qualification forms for need, budget, timing, and fit",
        "Dashboards for requests, customers, tasks, and reporting",
        "Arabic and English content with SEO structure and FAQs",
      ];
}

function industryBenefits(name: string, locale: Locale) {
  return locale === "ar"
    ? [
        `شرح أوضح لعروض ${name}`,
        "طلبات أكثر تأهيلاً وأقل متابعة يدوية",
        "تجربة عميل أفضل بين الموقع والفريق",
        "نظام قابل للتوسع مع CRM وERP والتكاملات",
      ]
    : [
        `Clearer explanation of ${name} offers`,
        "More qualified inquiries with less manual follow-up",
        "Better customer experience between site and team",
        "A scalable base for CRM, ERP, and integrations",
      ];
}

function industryProcess(locale: Locale) {
  return locale === "ar"
    ? [
        "فهم القطاع",
        "رسم رحلة العميل",
        "تصميم المحتوى والواجهة",
        "بناء النظام",
        "اختبار وإطلاق",
        "تحسين مستمر",
      ]
    : [
        "Sector discovery",
        "Customer journey map",
        "Content and UX design",
        "System build",
        "Testing and launch",
        "Continuous improvement",
      ];
}

function canonicalServiceId(href: string): CanonicalServiceId {
  const target = Object.entries(CANONICAL_SERVICE_TARGETS).find(
    ([, path]) => path === href,
  );

  if (!target) {
    throw new Error(`Unknown legacy industry service target: ${href}`);
  }

  return target[0] as CanonicalServiceId;
}

export function adaptLegacyIndustry(
  locale: Locale,
  industry: IndustryData,
): LegacyIndustryViewModel {
  if (!isIndustrySlug(industry.slug)) {
    throw new Error(`Unknown legacy industry slug: ${industry.slug}`);
  }

  const isRTL = locale === "ar";
  const pageLabels = labels[locale];
  const manifestEntry = getIndustryManifestEntry(industry.slug);
  const name = localizedValue(industry.name, locale);
  const description = localizedValue(industry.description, locale);
  const visual = getIndustryVisual(industry.slug);
  const features = industryFeatures(name, locale);
  const benefits = industryBenefits(name, locale);
  const process = industryProcess(locale);
  const problems = industry.problems.map((problem) =>
    localizedValue(problem, locale),
  );
  const services = industry.serviceLinks.map((service, index) => ({
    id: canonicalServiceId(service.href),
    label: localizedValue(service.label, locale),
    href: localePath(locale, service.href),
    detail:
      index === 0
        ? isRTL
          ? "مسار أولي مناسب لفهم الطلب والفرصة."
          : "A first path for understanding demand and opportunity."
        : isRTL
          ? "خدمة مرتبطة بمشكلة تشغيل أو نمو داخل القطاع."
          : "A service tied to an operating or growth problem in this sector.",
    status: pageLabels.scope,
  }));
  const heroImage =
    heroImages[industry.slug] || "/images/homepage/digital presence.png";
  const breadcrumbLabels = {
    home: isRTL ? "الرئيسية" : "Home",
    industries: isRTL ? "القطاعات" : "Industries",
    current: name,
  };

  return {
    locale,
    slug: industry.slug,
    direction: isRTL ? "rtl" : "ltr",
    name,
    heroTitle: localizedValue(industry.heroTitle, locale),
    description,
    labels: pageLabels,
    breadcrumbLabels,
    hub: {
      label: breadcrumbLabels.industries,
      href: localePath(locale, "/industries"),
    },
    relatedIndustries: manifestEntry.relatedIndustryIds.map((relatedSlug) => {
      const related = getIndustryManifestEntry(relatedSlug);

      return {
        slug: relatedSlug,
        label: related.label[locale],
        href: localePath(locale, related.route),
      };
    }),
    seo: {
      title: isRTL ? `حلول ${name} الرقمية` : `${name} Digital Solutions`,
      description,
      image: heroImage,
    },
    problems,
    differentiators: industry.differentiators.map((item) =>
      localizedValue(item, locale),
    ),
    useCases: industry.useCases.map((useCase) => ({
      title: localizedValue(useCase.title, locale),
      description: localizedValue(useCase.description, locale),
    })),
    faqs: industry.faqs.map((faq) => ({
      question: localizedValue(faq.question, locale),
      answer: localizedValue(faq.answer, locale),
    })),
    services,
    features,
    benefits,
    process,
    markets: countryLandingPages.slice(0, 6).map((country) => ({
      slug: country.slug,
      name: isRTL ? country.countryNameArabic : country.countryNameEnglish,
      href: isRTL ? country.arabicUrl : country.englishUrl,
      currency: country.currency,
      keyword: country.content[locale].primaryKeyword,
    })),
    ctas: {
      primary: {
        label: pageLabels.start,
        href: `/api/whatsapp?locale=${locale}`,
      },
      secondary: {
        label: pageLabels.servicesCta,
        href: localePath(locale, "/services"),
      },
    },
    visual: {
      accent: visual.accent,
      tint: visual.tint,
      workflow: localizedValue(visual.workflow, locale),
      heroImage,
      heroAlt: `${name} ${isRTL ? "صورة قطاعية" : "industry visual"}`,
      sceneDescription: isRTL
        ? `مشهد رقمي مخصص لقطاع ${name}`
        : `Tailored digital scene for ${name}`,
    },
    hero: {
      eyebrow: `${pageLabels.badge} / ${localizedValue(visual.workflow, locale)}`,
      metrics: [
        {
          label: pageLabels.services,
          value: String(industry.serviceLinks.length).padStart(2, "0"),
        },
        {
          label: pageLabels.features,
          value: String(features.length).padStart(2, "0"),
        },
        {
          label: pageLabels.process,
          value: String(process.length).padStart(2, "0"),
        },
      ],
      modes: [
        {
          label: pageLabels.problems,
          title: pageLabels.problems,
          description: isRTL
            ? `نبدأ من مشكلات قطاع ${name} قبل اختيار التقنية أو شكل الصفحة.`
            : `We start with the operating problems inside ${name} before choosing the interface or system shape.`,
          items: problems.slice(0, 4),
        },
        {
          label: pageLabels.solution,
          title: pageLabels.solution,
          description: isRTL
            ? `نحوّل احتياج قطاع ${name} إلى صفحات، نماذج، لوحات، وتكاملات عملية قابلة للتسليم.`
            : `We turn ${name} needs into pages, forms, dashboards, and practical integrations that can be delivered and owned.`,
          items: features,
        },
      ],
      protocols: services.map(({ label, detail, status }) => ({
        name: label,
        detail,
        status,
      })),
    },
    copy: {
      solutionSummary: isRTL
        ? `نحوّل احتياج قطاع ${name} إلى صفحات، نماذج، لوحات، وتكاملات عملية تدعم البيع والتشغيل وخدمة العملاء.`
        : `We turn ${name} needs into pages, forms, dashboards, and practical integrations that support sales, operations, and customer care.`,
      example: isRTL
        ? `مثال عملي لقطاع ${name}: صفحة خدمات مخصصة، نموذج تأهيل، لوحة متابعة، أسئلة شائعة، وربط مع خدمات كلاود توبيا المناسبة دون ادعاء دراسة حالة غير موثقة.`
        : `Example for ${name}: a focused service page, qualification form, dashboard, FAQ content, and links to relevant CloudTopia services without inventing an unverified case study.`,
      marketPage: isRTL ? "صفحة السوق" : "Market page",
    },
  };
}
