import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Layers,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { HeroOrbitDeck } from "@/components/ui/hero-modern";
import { PageBreadcrumbs } from "@/components/ui/PageBreadcrumbs";
import type { Locale } from "@/lib/i18n/config";
import type { LegacyIndustryViewModel } from "@/lib/industries/legacy-adapter";

type LegacyIndustryPageProps = {
  locale: Locale;
  viewModel: LegacyIndustryViewModel;
  schema: unknown | unknown[];
};

export function LegacyIndustryPage({
  locale,
  viewModel,
  schema,
}: LegacyIndustryPageProps) {
  const isRTL = viewModel.direction === "rtl";

  return (
    <div
      className="relative min-h-screen bg-[#f4f1f8] text-eerie"
      dir={viewModel.direction}
    >
      <JsonLd schema={schema} />

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <PageBreadcrumbs
          locale={locale}
          items={[
            {
              label: viewModel.hub.label,
              href: viewModel.hub.href,
            },
            { label: viewModel.breadcrumbLabels.current },
          ]}
        />
      </div>

      <HeroOrbitDeck
        eyebrow={viewModel.hero.eyebrow}
        title={viewModel.heroTitle}
        description={viewModel.description}
        image={{
          src: viewModel.visual.heroImage,
          alt: viewModel.visual.heroAlt,
        }}
        metrics={viewModel.hero.metrics}
        modes={viewModel.hero.modes}
        protocols={viewModel.hero.protocols}
        primaryCta={viewModel.ctas.primary}
        secondaryCta={viewModel.ctas.secondary}
        visualCaption={viewModel.name}
        visualCaptionRight={viewModel.visual.sceneDescription}
        dir={viewModel.direction}
      />

      <section className="relative px-4 py-16 sm:px-6 lg:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-eerie/10 bg-white p-8 shadow-sm">
            <div
              className={`mb-5 flex h-12 w-12 items-center justify-center rounded-lg ${viewModel.visual.tint}`}
            >
              <HelpCircle
                className={`h-5 w-5 ${viewModel.visual.accent}`}
                aria-hidden="true"
              />
            </div>
            <h2 className="mb-6 text-2xl font-black text-eerie md:text-3xl">
              {viewModel.labels.problems}
            </h2>
            <div className="grid gap-4">
              {viewModel.problems.map((problem) => (
                <div
                  key={problem}
                  className="flex gap-3 border-t border-neutral-200 pt-4"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-sky-700"
                    aria-hidden="true"
                  />
                  <p className="leading-8 text-neutral-700">{problem}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-eerie/10 bg-white/72 p-8 backdrop-blur">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-white text-sky-700">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="mb-6 text-2xl font-black text-eerie md:text-3xl">
              {viewModel.labels.why}
            </h2>
            <div className="grid gap-4">
              {viewModel.differentiators.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 border-t border-sky-900/15 pt-4"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-sky-700"
                    aria-hidden="true"
                  />
                  <p className="leading-8 text-neutral-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-eerie/10 bg-white px-4 py-16 sm:px-6 lg:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.44fr_1fr] lg:items-end">
            <div>
              <p
                className={`mb-3 text-sm font-black uppercase tracking-[0.16em] ${viewModel.visual.accent}`}
              >
                {viewModel.labels.solution}
              </p>
              <h2 className="text-3xl font-black leading-tight text-eerie md:text-4xl">
                {viewModel.labels.features}
              </h2>
            </div>
            <p className="max-w-3xl border-s-4 border-sky-600 bg-[#f4f1f8] px-5 py-4 text-base font-semibold leading-8 text-neutral-700">
              {viewModel.copy.solutionSummary}
            </p>
          </div>
          <div className="grid gap-px border border-eerie bg-eerie md:grid-cols-2 lg:grid-cols-4">
            {viewModel.features.map((item, index) => (
              <article
                key={item}
                className="min-h-52 bg-[#f4f1f8] p-6 transition-colors duration-200 hover:bg-white"
              >
                <div className="mb-8 flex items-center justify-between gap-3">
                  <Layers className="h-5 w-5 text-sky-700" aria-hidden="true" />
                  <span className="font-mono text-xs font-black text-neutral-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-lg font-black leading-tight text-eerie">
                  {item}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-16 sm:px-6 lg:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="border border-eerie/10 bg-white p-8 shadow-sm">
            <div
              className={`mb-5 flex h-12 w-12 items-center justify-center border border-eerie/10 ${viewModel.visual.tint}`}
            >
              <Sparkles
                className={`h-5 w-5 ${viewModel.visual.accent}`}
                aria-hidden="true"
              />
            </div>
            <h2 className="mb-6 text-2xl font-black text-eerie md:text-3xl">
              {viewModel.labels.benefits}
            </h2>
            <div className="grid gap-3">
              {viewModel.benefits.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 border border-neutral-200 bg-[#f4f1f8] p-4"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-sky-700"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-semibold leading-7 text-neutral-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-eerie bg-eerie p-8 text-white">
            <div className="mb-5 flex h-12 w-12 items-center justify-center border border-white/20 bg-white/10">
              <Workflow className="h-5 w-5 text-sky-300" aria-hidden="true" />
            </div>
            <h2 className="mb-6 text-2xl font-black text-white md:text-3xl">
              {viewModel.labels.process}
            </h2>
            <div className="grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
              {viewModel.process.map((item, index) => (
                <div key={item} className="min-h-36 bg-white/8 p-4">
                  <p className="mb-7 font-mono text-xs font-black text-sky-300">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-base font-black leading-tight text-white">
                    {item}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-eerie/10 bg-white px-4 py-16 sm:px-6 lg:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-eerie">
              <Layers className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <h2 className="mb-4 text-3xl font-black text-eerie md:text-4xl">
              {viewModel.labels.useCases}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {viewModel.useCases.map((useCase, index) => (
              <article
                key={useCase.title}
                className="rounded-lg border border-eerie/10 bg-[#f4f1f8] p-7"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <Workflow
                    className="h-5 w-5 text-sky-700"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-black text-neutral-400 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-black text-eerie">
                  {useCase.title}
                </h3>
                <p className="leading-8 text-neutral-600">
                  {useCase.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 border-t border-eerie/10 pt-8">
            <h2 className="mb-5 text-2xl font-black text-eerie">
              {viewModel.labels.services}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {viewModel.services.map((service) => (
                <Link
                  key={service.id}
                  href={service.href}
                  className="group flex items-center justify-between gap-3 border border-eerie/10 bg-[#f4f1f8] px-5 py-4 text-sm font-black text-eerie transition-colors duration-200 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                  <span>{service.label}</span>
                  <ArrowRight
                    className={`h-4 w-4 shrink-0 text-sky-700 transition-transform duration-200 group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1" : ""}`}
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-eerie/10 pt-8">
            <h2 className="mb-5 text-2xl font-black text-eerie">
              {viewModel.labels.relatedIndustries}
            </h2>
            <div className="flex flex-wrap gap-3">
              {viewModel.relatedIndustries.map((relatedIndustry) => (
                <Link
                  key={relatedIndustry.slug}
                  href={relatedIndustry.href}
                  className="group inline-flex items-center gap-3 border border-eerie/10 bg-white px-5 py-4 text-sm font-black text-eerie transition-colors duration-200 hover:bg-[#f4f1f8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                  {relatedIndustry.label}
                  <ArrowRight
                    className={`h-4 w-4 shrink-0 text-sky-700 transition-transform duration-200 group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1" : ""}`}
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-16 sm:px-6 lg:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.42fr_1fr]">
          <div className="border border-eerie bg-white p-7 shadow-[8px_8px_0_rgba(2,132,199,0.12)]">
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-black text-sky-700">
              <Workflow className="h-4 w-4" aria-hidden="true" />
              {viewModel.labels.example}
            </div>
            <h2 className="text-3xl font-black leading-tight text-eerie md:text-4xl">
              {viewModel.labels.example}
            </h2>
            <p className="mt-5 text-base font-semibold leading-8 text-neutral-700">
              {viewModel.copy.example}
            </p>
          </div>
          <div className="grid gap-px border border-eerie bg-eerie sm:grid-cols-2 lg:grid-cols-3">
            {viewModel.markets.map((market) => (
              <Link
                key={market.slug}
                href={market.href}
                className="group bg-white p-5 transition-colors duration-200 hover:bg-[#f4f1f8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-neutral-400">
                  {viewModel.labels.markets}
                </p>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-black text-eerie">
                    {market.name}
                  </h3>
                  <span className="border border-neutral-200 px-2 py-1 text-[11px] font-black text-neutral-600">
                    {market.currency}
                  </span>
                </div>
                <p className="mt-3 line-clamp-2 text-xs font-semibold leading-6 text-neutral-600">
                  {market.keyword}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-sky-700">
                  {viewModel.copy.marketPage}
                  <ArrowRight
                    className={`h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 ${isRTL ? "rotate-180 group-hover:-translate-x-1" : ""}`}
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-16 sm:px-6 lg:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-3xl font-black text-eerie md:text-4xl">
            {viewModel.labels.faqs}
          </h2>
          <div className="space-y-4">
            {viewModel.faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-lg border border-eerie/10 bg-white p-6 shadow-sm"
              >
                <h3 className="mb-3 text-lg font-black text-eerie">
                  {faq.question}
                </h3>
                <p className="text-base leading-8 text-neutral-700">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden bg-eerie px-4 py-16 sm:px-6 lg:px-8 md:py-24"
        data-header-theme="dark"
      >
        <div className="relative mx-auto grid max-w-7xl gap-8 border border-white/15 bg-white/[0.04] p-7 md:grid-cols-[1fr_auto] md:items-center md:p-9">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-black text-sky-300">
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              {viewModel.name}
            </div>
            <h2 className="mb-5 text-3xl font-black text-white md:text-5xl">
              {viewModel.labels.readyTitle}
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-white/75">
              {viewModel.labels.readyDesc}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link
              href={viewModel.ctas.primary.href}
              className="inline-flex items-center justify-center gap-2 border border-white bg-white px-7 py-4 font-black text-eerie transition-colors duration-200 hover:bg-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
            >
              {viewModel.ctas.primary.label}
              <ArrowRight
                className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </Link>
            <Link
              href={viewModel.ctas.secondary.href}
              className="inline-flex items-center justify-center gap-2 border border-white/25 px-7 py-4 font-black text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
            >
              {viewModel.ctas.secondary.label}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
