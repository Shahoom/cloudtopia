import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { access } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";

import { LegacyIndustryPage } from "@/components/industry/detail/LegacyIndustryPage";
import {
  adaptLegacyIndustry,
  type LegacyIndustryViewModel,
} from "@/lib/industries/legacy-adapter";
import { getIndustryManifestEntry } from "@/lib/industries/manifest";
import type { IndustrySlug } from "@/lib/industries/slugs";
import type { Locale } from "@/lib/i18n/config";
import { getIndustry } from "@/lib/seo/industries";

const FALLBACK_SLUGS = [
  "fintech",
  "ecommerce-retail",
  "real-estate",
  "education",
  "travel-hospitality",
  "legal-firms",
  "construction",
  "retail",
  "professional-services",
  "government-public-sector",
] as const satisfies readonly IndustrySlug[];

type FallbackSlug = (typeof FALLBACK_SLUGS)[number];

type LegacyParityProjection = {
  name: string;
  heroTitle: string;
  description: string;
  problems: string[];
  useCases: Array<{ title: string; description: string }>;
  differentiators: string[];
  faqs: Array<{ question: string; answer: string }>;
  services: Array<{ label: string; href: string }>;
  marketHrefs: string[];
  ctaDestinations: { primary: string; secondary: string };
  visual: {
    accent: string;
    tint: string;
    workflow: string;
    heroImage: string;
    heroAlt: string;
    sceneDescription: string;
  };
};

const EXPECTED_HERO_DIMENSIONS: Record<
  FallbackSlug,
  { width: number; height: number }
> = {
  fintech: { width: 1181, height: 754 },
  "ecommerce-retail": { width: 1200, height: 742 },
  "real-estate": { width: 1200, height: 592 },
  education: { width: 2240, height: 1260 },
  "travel-hospitality": { width: 3200, height: 2400 },
  "legal-firms": { width: 1618, height: 1080 },
  construction: { width: 1200, height: 953 },
  retail: { width: 3536, height: 2185 },
  "professional-services": { width: 1200, height: 630 },
  "government-public-sector": { width: 1200, height: 685 },
};

const fixture = JSON.parse(
  readFileSync(
    new URL("./fixtures/industry-worlds/legacy-parity.json", import.meta.url),
    "utf8",
  ),
) as Record<FallbackSlug, Record<Locale, LegacyParityProjection>>;

function parityProjection(
  viewModel: LegacyIndustryViewModel,
): LegacyParityProjection {
  return {
    name: viewModel.name,
    heroTitle: viewModel.heroTitle,
    description: viewModel.description,
    problems: viewModel.problems,
    useCases: viewModel.useCases.map(({ title, description }) => ({
      title,
      description,
    })),
    differentiators: viewModel.differentiators,
    faqs: viewModel.faqs.map(({ question, answer }) => ({ question, answer })),
    services: viewModel.services.map(({ label, href }) => ({ label, href })),
    marketHrefs: viewModel.markets.map(({ href }) => href),
    ctaDestinations: {
      primary: viewModel.ctas.primary.href,
      secondary: viewModel.ctas.secondary.href,
    },
    visual: {
      accent: viewModel.visual.accent,
      tint: viewModel.visual.tint,
      workflow: viewModel.visual.workflow,
      heroImage: viewModel.visual.heroImage,
      heroAlt: viewModel.visual.heroAlt,
      sceneDescription: viewModel.visual.sceneDescription,
    },
  };
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function decodeHtml(value: string) {
  return value
    .replaceAll("&#x27;", "'")
    .replaceAll("&quot;", '"')
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function assertInOrder(haystack: string, values: readonly string[]) {
  let cursor = -1;

  for (const value of values) {
    const next = haystack.indexOf(value, cursor + 1);
    assert.notEqual(next, -1, `expected rendered copy: ${value}`);
    assert.ok(next > cursor, `expected ordered rendered copy: ${value}`);
    cursor = next;
  }
}

function resolvedSchema(viewModel: LegacyIndustryViewModel) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: viewModel.seo.title,
        description: viewModel.description,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          viewModel.breadcrumbLabels.home,
          viewModel.breadcrumbLabels.industries,
          viewModel.breadcrumbLabels.current,
        ],
      },
      {
        "@type": "Service",
        name: viewModel.seo.title,
        serviceType: viewModel.services.map(({ label }) => label),
      },
    ],
  };
}

test("legacy fallback parity is preserved for ten slugs in both locales", async (t) => {
  for (const slug of FALLBACK_SLUGS) {
    for (const locale of ["en", "ar"] as const) {
      await t.test(`${slug}/${locale}`, async () => {
        const industry = getIndustry(slug);
        assert.ok(industry, `expected legacy source data for ${slug}`);

        const viewModel = adaptLegacyIndustry(locale, industry);
        assert.deepEqual(parityProjection(viewModel), fixture[slug][locale]);

        const schema = resolvedSchema(viewModel);
        const html = renderToStaticMarkup(
          <LegacyIndustryPage
            locale={locale}
            viewModel={viewModel}
            schema={schema}
          />,
        );
        const decodedHtml = decodeHtml(html);

        assert.equal((html.match(/<main\b/g) || []).length, 0);
        assert.equal((html.match(/<h1\b/g) || []).length, 1);
        assert.equal((html.match(/application\/ld\+json/g) || []).length, 1);
        assert.match(
          decodedHtml,
          new RegExp(escapeRegExp(viewModel.seo.title)),
        );

        assert.match(
          decodedHtml,
          new RegExp(`alt="${escapeRegExp(viewModel.visual.heroAlt)}"`),
        );
        assert.match(
          decodedHtml,
          new RegExp(escapeRegExp(viewModel.visual.sceneDescription)),
        );
        assert.ok(viewModel.visual.heroAlt.trim().length > 0);
        assert.ok(viewModel.visual.sceneDescription.trim().length > 0);

        const localeTextPattern =
          locale === "ar" ? /[\u0600-\u06ff]/u : /[a-z]/iu;
        assert.match(viewModel.visual.heroAlt, localeTextPattern);
        assert.match(viewModel.visual.sceneDescription, localeTextPattern);

        const heroAsset = fileURLToPath(
          new URL(`../public${viewModel.visual.heroImage}`, import.meta.url),
        );
        await access(heroAsset);
        const metadata = await sharp(heroAsset).metadata();
        assert.equal(metadata.width, EXPECTED_HERO_DIMENSIONS[slug].width);
        assert.equal(metadata.height, EXPECTED_HERO_DIMENSIONS[slug].height);
        assert.ok((metadata.width || 0) > 0);
        assert.ok((metadata.height || 0) > 0);

        assert.match(
          html,
          new RegExp(`href="${escapeRegExp(viewModel.hub.href)}"`),
        );
        assert.match(
          decodedHtml,
          new RegExp(escapeRegExp(viewModel.hub.label)),
        );

        for (const service of viewModel.services) {
          assert.match(
            html,
            new RegExp(`href="${escapeRegExp(service.href)}"`),
          );
        }

        for (const market of viewModel.markets) {
          assert.match(html, new RegExp(`href="${escapeRegExp(market.href)}"`));
        }

        assert.equal(viewModel.relatedIndustries.length, 2);
        assert.deepEqual(
          viewModel.relatedIndustries.map(
            ({ slug: relatedSlug }) => relatedSlug,
          ),
          [...getIndustryManifestEntry(slug).relatedIndustryIds],
        );
        for (const relatedIndustry of viewModel.relatedIndustries) {
          assert.match(
            html,
            new RegExp(`href="${escapeRegExp(relatedIndustry.href)}"`),
          );
          assert.match(
            decodedHtml,
            new RegExp(escapeRegExp(relatedIndustry.label)),
          );
        }

        for (const cta of Object.values(viewModel.ctas)) {
          assert.match(html, new RegExp(`href="${escapeRegExp(cta.href)}"`));
        }

        assertInOrder(decodedHtml, viewModel.problems);
        assertInOrder(decodedHtml, viewModel.differentiators);
        assertInOrder(
          decodedHtml,
          viewModel.useCases.flatMap(({ title, description }) => [
            title,
            description,
          ]),
        );
        assertInOrder(
          decodedHtml,
          viewModel.faqs.flatMap(({ question, answer }) => [question, answer]),
        );

        const expectedLabels =
          locale === "ar"
            ? {
                home: "الرئيسية",
                industries: "القطاعات",
                services: "الخدمات المرتبطة",
                seoTitle: `حلول ${viewModel.name} الرقمية`,
              }
            : {
                home: "Home",
                industries: "Industries",
                services: "Related services",
                seoTitle: `${viewModel.name} Digital Solutions`,
              };

        assert.equal(viewModel.breadcrumbLabels.home, expectedLabels.home);
        assert.equal(
          viewModel.breadcrumbLabels.industries,
          expectedLabels.industries,
        );
        assert.equal(viewModel.labels.services, expectedLabels.services);
        assert.equal(viewModel.seo.title, expectedLabels.seoTitle);
        assert.match(
          decodedHtml,
          new RegExp(escapeRegExp(expectedLabels.home)),
        );
        assert.match(
          decodedHtml,
          new RegExp(escapeRegExp(expectedLabels.industries)),
        );
        assert.match(
          decodedHtml,
          new RegExp(escapeRegExp(expectedLabels.services)),
        );
      });
    }
  }
});
