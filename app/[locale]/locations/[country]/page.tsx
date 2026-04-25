import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, CreditCard, Building2, TrendingUp, Globe, CheckCircle2 } from 'lucide-react'
import { getLocation, locationSlugs } from '@/lib/seo/locations'
import { ogImagesFor } from '@/lib/og/og-image'

type PageProps = {
    params: { locale: string; country: string }
}

export async function generateStaticParams() {
    const locales = ['en', 'ar', 'tr']
    return locales.flatMap((locale) => locationSlugs.map((country) => ({ locale, country })))
}

const SERVICE_LABELS: Record<string, Record<string, string>> = {
    'website-design': { en: 'Websites & Landing Pages', ar: 'مواقع وصفحات هبوط', tr: 'Web Siteleri' },
    'ecommerce-solutions': { en: 'E-commerce Stores', ar: 'متاجر إلكترونية', tr: 'E-ticaret Mağazaları' },
    'restaurant-qr-menu': { en: 'QR Menu Systems', ar: 'أنظمة قائمة QR', tr: 'QR Menü Sistemleri' },
    'business-systems-development': { en: 'Custom CRM & Business Systems', ar: 'أنظمة CRM وأعمال مخصصة', tr: 'Özel CRM & İş Sistemleri' },
    'web-applications': { en: 'Web Applications & SaaS', ar: 'تطبيقات ويب وSaaS', tr: 'Web Uygulamaları & SaaS' },
    'social-media-marketing': { en: 'Social Media Marketing', ar: 'تسويق التواصل الاجتماعي', tr: 'Sosyal Medya Pazarlama' },
    'content-creation': { en: 'Bilingual Content Creation', ar: 'إنشاء محتوى ثنائي اللغة', tr: 'İki Dilli İçerik Üretimi' },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const location = getLocation(params.country)
    if (!location) return { title: 'Location Not Found' }

    const name = locale === 'ar' ? location.nameAr : locale === 'tr' ? location.nameTr : location.nameEn

    const titles: Record<string, string> = {
        en: `Digital Agency in ${name} — Websites, E-commerce & Custom Systems`,
        ar: `وكالة رقمية في ${name} — مواقع، متاجر إلكترونية، وأنظمة مخصصة`,
        tr: `${name} Dijital Ajans — Web Siteleri, E-Ticaret & Özel Sistemler`,
    }
    const descs: Record<string, string> = {
        en: `CloudTopia builds bilingual Arabic + English websites, e-commerce stores, and custom business systems for companies in ${location.country}. ${location.paymentMethods.slice(0, 3).join(', ')} ready. Fixed pricing.`,
        ar: `كلاود توبيا تبني مواقع ومتاجر إلكترونية وأنظمة أعمال مخصصة ثنائية اللغة عربي + إنجليزي للشركات في ${name}. ${location.paymentMethods.slice(0, 3).join('، ')} جاهزة. تسعير ثابت.`,
        tr: `CloudTopia, ${name}\'deki şirketler için iki dilli Arapça + İngilizce web siteleri, e-ticaret mağazaları ve özel iş sistemleri inşa eder. ${location.paymentMethods.slice(0, 3).join(', ')} hazır. Sabit fiyatlandırma.`,
    }

    return {
        title: titles[locale],
        description: descs[locale],
        openGraph: {
            title: titles[locale],
            description: descs[locale],
            url: `https://cloudtopia.net/${locale}/locations/${params.country}`,
            // Per-country OG override: /public/images/og/locations/{country}-{locale}.jpg
            // Drop a Saudi/Riyadh image at locations/saudi-arabia-en.jpg etc.
            images: ogImagesFor({ page: `locations/${params.country}`, locale }),
        },
        alternates: {
            canonical: `https://cloudtopia.net/${locale}/locations/${params.country}`,
            languages: {
                'en': `https://cloudtopia.net/en/locations/${params.country}`,
                'ar': `https://cloudtopia.net/ar/locations/${params.country}`,
                'tr': `https://cloudtopia.net/tr/locations/${params.country}`,
                'x-default': `https://cloudtopia.net/en/locations/${params.country}`,
            },
        },
    }
}

export default function LocationPage({ params }: PageProps) {
    const locale = params.locale ?? 'en'
    const location = getLocation(params.country)
    if (!location) notFound()

    const isRTL = locale === 'ar'
    const name = locale === 'ar' ? location.nameAr : locale === 'tr' ? location.nameTr : location.nameEn

    const L = {
        en: {
            badge: `Serving ${location.country}`,
            heroTitleStart: 'Your digital agency in',
            heroTitleEnd: '.',
            heroDesc: `CloudTopia builds bilingual Arabic + English websites, e-commerce stores, and custom business systems for companies in ${location.country}. Full local payment integration, VAT-ready, and optimized for ${location.country} customers.`,
            ctaStart: 'Start a project',
            ctaPricing: 'See pricing',
            marketTitle: `The ${location.country} market`,
            paymentsTitle: 'Local payment methods we integrate',
            servicesTitle: `What we build for ${location.country} businesses`,
            citiesTitle: `Cities we serve`,
            faqTitle: 'Questions from teams in ' + location.country,
            faq1Q: `Do you have a local office in ${location.country}?`,
            faq1A: `We operate remotely across the Gulf with team members who travel regularly to ${location.capital} and major ${location.country} cities for on-site discovery, photography, and training. Most projects are delivered fully remote with ${location.language}-native communication.`,
            faq2Q: `What payment methods do you integrate for ${location.country} e-commerce?`,
            faq2A: `For ${location.country} e-commerce we integrate ${location.paymentMethods.join(', ')}. VAT is configured at ${location.vatRate} by default and tax invoices are bilingual Arabic + English.`,
            faq3Q: `How long does a project in ${location.country} take?`,
            faq3A: `Same timelines as our global clients: landing pages 1–2 weeks, business websites 3–5 weeks, e-commerce stores 4–8 weeks, custom systems 6–16 weeks. Local nuances (Hijri dates, prayer time integration, Arabic content) are built in, not bolted on.`,
            readyTitle: `Ready to build in ${location.country}?`,
            readyDesc: 'One business day reply. Scope draft or 20-minute call.',
        },
        ar: {
            badge: `نخدم ${name}`,
            heroTitleStart: 'وكالتك الرقمية في',
            heroTitleEnd: '.',
            heroDesc: `كلاود توبيا تبني مواقع ومتاجر إلكترونية وأنظمة أعمال مخصصة ثنائية اللغة عربي + إنجليزي للشركات في ${name}. تكامل مدفوعات محلي كامل، جاهز لضريبة القيمة المضافة، ومحسّن لعملاء ${name}.`,
            ctaStart: 'ابدأ مشروعاً',
            ctaPricing: 'شاهد الأسعار',
            marketTitle: `سوق ${name}`,
            paymentsTitle: 'طرق الدفع المحلية التي ندمجها',
            servicesTitle: `ما نبنيه لأعمال ${name}`,
            citiesTitle: `المدن التي نخدمها`,
            faqTitle: `أسئلة من فرق في ${name}`,
            faq1Q: `هل لديكم مكتب محلي في ${name}؟`,
            faq1A: `نعمل عن بُعد عبر الخليج بأعضاء فريق يسافرون بانتظام إلى ${location.capital} ومدن ${name} الرئيسية للاستكشاف الميداني، التصوير، والتدريب. معظم المشاريع تُسلَّم عن بُعد بالكامل بتواصل بالعربية الأصيلة.`,
            faq2Q: `ما طرق الدفع التي تدمجونها للتجارة الإلكترونية في ${name}؟`,
            faq2A: `للتجارة الإلكترونية في ${name} ندمج ${location.paymentMethods.join('، ')}. ضريبة القيمة المضافة تُعَدّ بنسبة ${location.vatRate} افتراضياً والفواتير الضريبية ثنائية اللغة عربي + إنجليزي.`,
            faq3Q: `كم يستغرق المشروع في ${name}؟`,
            faq3A: `نفس الجداول الزمنية كعملائنا عالمياً: صفحات الهبوط ١–٢ أسبوع، مواقع الأعمال ٣–٥ أسابيع، المتاجر الإلكترونية ٤–٨ أسابيع، الأنظمة المخصصة ٦–١٦ أسبوعاً. الفروق المحلية (التواريخ الهجرية، تكامل أوقات الصلاة، المحتوى العربي) مبنية، لا مضافة.`,
            readyTitle: `جاهز للبناء في ${name}؟`,
            readyDesc: 'رد خلال يوم عمل واحد. مسوّدة نطاق أو مكالمة 20 دقيقة.',
        },
        tr: {
            badge: `${name}\'de hizmet veriyoruz`,
            heroTitleStart: 'Dijital ajansınız',
            heroTitleEnd: '\'de.',
            heroDesc: `CloudTopia, ${name}\'deki şirketler için iki dilli Arapça + İngilizce web siteleri, e-ticaret mağazaları ve özel iş sistemleri inşa eder. Tam yerel ödeme entegrasyonu, KDV hazır ve ${name} müşterileri için optimize edilmiştir.`,
            ctaStart: 'Projeye başla',
            ctaPricing: 'Fiyatları gör',
            marketTitle: `${name} pazarı`,
            paymentsTitle: 'Entegre ettiğimiz yerel ödeme yöntemleri',
            servicesTitle: `${name} işletmeleri için ne inşa ediyoruz`,
            citiesTitle: `Hizmet verdiğimiz şehirler`,
            faqTitle: `${name}\'deki ekiplerden sorular`,
            faq1Q: `${name}\'de yerel bir ofisiniz var mı?`,
            faq1A: `Körfez genelinde uzaktan çalışıyoruz. Ekip üyelerimiz saha keşfi, fotoğrafçılık ve eğitim için ${location.capital} ve büyük ${name} şehirlerine düzenli olarak gider. Çoğu proje ${location.language} anadil iletişimiyle tamamen uzaktan teslim edilir.`,
            faq2Q: `${name} e-ticareti için hangi ödeme yöntemlerini entegre ediyorsunuz?`,
            faq2A: `${name} e-ticareti için ${location.paymentMethods.join(', ')} entegre ediyoruz. KDV varsayılan olarak ${location.vatRate} yapılandırılır ve vergi faturaları iki dillidir Arapça + İngilizce.`,
            faq3Q: `${name}\'de bir proje ne kadar sürer?`,
            faq3A: `Küresel müşterilerimizle aynı zaman çizelgeleri: açılış sayfaları 1–2 hafta, iş siteleri 3–5 hafta, e-ticaret mağazaları 4–8 hafta, özel sistemler 6–16 hafta. Yerel nüanslar (Hicri tarihler, namaz vakti entegrasyonu, Arapça içerik) baştan inşa edilmiştir, sonradan eklenmez.`,
            readyTitle: `${name}\'de inşa etmeye hazır mısın?`,
            readyDesc: 'Bir iş günü içinde yanıt. Kapsam taslağı veya 20 dakikalık görüşme.',
        },
    }[locale as 'en' | 'ar' | 'tr'] || {} as any

    const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: `CloudTopia — ${location.country}`,
        description: `Digital agency serving ${location.country}: websites, e-commerce, custom CRMs, and web applications.`,
        url: `https://cloudtopia.net/${locale}/locations/${location.slug}`,
        image: 'https://cloudtopia.net/logo.svg',
        priceRange: '$$',
        areaServed: { '@type': 'Country', name: location.country, identifier: location.countryCode },
        provider: { '@type': 'Organization', name: 'CloudTopia', url: 'https://cloudtopia.net' },
        knowsAbout: location.paymentMethods.map((pm) => `${pm} Payment Integration`).concat(['Arabic RTL Web Design', `${location.country} VAT Configuration`, 'Bilingual Content']),
        currenciesAccepted: [location.currency, 'USD'],
    }

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            { '@type': 'Question', name: L.faq1Q, acceptedAnswer: { '@type': 'Answer', text: L.faq1A } },
            { '@type': 'Question', name: L.faq2Q, acceptedAnswer: { '@type': 'Answer', text: L.faq2A } },
            { '@type': 'Question', name: L.faq3Q, acceptedAnswer: { '@type': 'Answer', text: L.faq3A } },
        ],
    }

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `https://cloudtopia.net/${locale}` },
            { '@type': 'ListItem', position: 2, name: 'Locations', item: `https://cloudtopia.net/${locale}/locations` },
            { '@type': 'ListItem', position: 3, name: location.country, item: `https://cloudtopia.net/${locale}/locations/${location.slug}` },
        ],
    }

    return (
        <div className="relative min-h-screen bg-lavender" dir={isRTL ? 'rtl' : 'ltr'}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            {/* Hero */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] overflow-hidden" data-header-theme="light">
                <div className="pointer-events-none absolute top-0 left-1/4 w-[600px] h-[400px] bg-primary-200/30 rounded-full blur-[120px]" />
                <div className="pointer-events-none absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-secondary-200/30 rounded-full blur-[120px]" />

                <div className="relative max-w-5xl mx-auto">
                    <div className={`flex ${isRTL ? 'justify-end' : 'justify-start'} mb-6`}>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-neutral-200 shadow-sm text-sm font-semibold text-neutral-800">
                            <MapPin className="w-3.5 h-3.5 text-primary-600" />
                            {L.badge}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.05] mb-8">
                        {L.heroTitleStart}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">{name}</span>
                        {L.heroTitleEnd}
                    </h1>

                    <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-3xl mb-10">{L.heroDesc}</p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                            href={`/${locale}/contact`}
                            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-neutral-900 text-white font-semibold hover:bg-neutral-800 transition-colors"
                        >
                            {L.ctaStart}
                            <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                        </Link>
                        <Link
                            href={`/${locale}/pricing`}
                            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-neutral-300 hover:border-neutral-900 font-semibold transition-colors"
                        >
                            {L.ctaPricing}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Market insight + Payment methods */}
            <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-3xl bg-white border border-neutral-200">
                        <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-5">
                            <TrendingUp className="w-5 h-5 text-primary-700" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">{L.marketTitle}</h2>
                        <p className="text-base text-neutral-600 leading-relaxed mb-5">{location.marketInsight}</p>
                        <dl className="grid grid-cols-2 gap-4 pt-5 border-t border-neutral-200">
                            <div>
                                <dt className="text-xs font-bold uppercase tracking-wider text-neutral-500">Capital</dt>
                                <dd className="text-base font-semibold text-neutral-900 mt-1">{location.capital}</dd>
                            </div>
                            <div>
                                <dt className="text-xs font-bold uppercase tracking-wider text-neutral-500">Currency</dt>
                                <dd className="text-base font-semibold text-neutral-900 mt-1">{location.currency}</dd>
                            </div>
                            <div>
                                <dt className="text-xs font-bold uppercase tracking-wider text-neutral-500">VAT</dt>
                                <dd className="text-base font-semibold text-neutral-900 mt-1">{location.vatRate}</dd>
                            </div>
                            <div>
                                <dt className="text-xs font-bold uppercase tracking-wider text-neutral-500">Language</dt>
                                <dd className="text-base font-semibold text-neutral-900 mt-1">{location.language}</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="p-8 rounded-3xl bg-gradient-to-br from-primary-600 to-secondary-700 text-white">
                        <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-5">
                            <CreditCard className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">{L.paymentsTitle}</h2>
                        <div className="flex flex-wrap gap-2">
                            {location.paymentMethods.map((pm) => (
                                <span
                                    key={pm}
                                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/15 border border-white/25 text-sm font-semibold backdrop-blur-sm"
                                >
                                    {pm}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="max-w-3xl mb-12">
                        <div className="w-12 h-12 rounded-xl bg-secondary-100 flex items-center justify-center mb-5">
                            <Building2 className="w-5 h-5 text-secondary-700" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">{L.servicesTitle}</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {location.services.map((s) => {
                            const label = SERVICE_LABELS[s]?.[locale] || SERVICE_LABELS[s]?.en || s
                            return (
                                <Link
                                    key={s}
                                    href={`/${locale}/${s}`}
                                    className="group flex items-center justify-between p-5 rounded-2xl bg-lavender border border-neutral-200 hover:border-neutral-900 hover:bg-white transition-all"
                                >
                                    <span className="text-base md:text-lg font-semibold text-neutral-900">{label}</span>
                                    <ArrowRight className={`w-5 h-5 text-primary-700 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Cities */}
            <section className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <Globe className="w-5 h-5 text-primary-700" />
                        <h3 className="text-xl md:text-2xl font-bold text-neutral-900">{L.citiesTitle}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {location.cities.map((city) => (
                            <span
                                key={city}
                                className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-neutral-200 text-sm font-semibold text-neutral-700"
                            >
                                {city}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-10">{L.faqTitle}</h2>
                    <div className="space-y-4">
                        {[
                            { q: L.faq1Q, a: L.faq1A },
                            { q: L.faq2Q, a: L.faq2A },
                            { q: L.faq3Q, a: L.faq3A },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-lavender border border-neutral-200">
                                <h3 className="text-lg font-bold text-neutral-900 mb-3 flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary-600 shrink-0 mt-1" />
                                    {item.q}
                                </h3>
                                <p className={`text-base text-neutral-600 leading-relaxed ${isRTL ? 'pr-8' : 'pl-8'}`}>{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0a1a] overflow-hidden" data-header-theme="dark">
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{ backgroundImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(14,165,233,0.18), transparent 60%)' }}
                />
                <div className="relative max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">{L.readyTitle}</h2>
                    <p className="text-lg text-white/75 mb-8">{L.readyDesc}</p>
                    <Link
                        href={`/${locale}/contact`}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-neutral-900 font-semibold hover:bg-cyan-100 transition-colors"
                    >
                        {L.ctaStart}
                        <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </Link>
                </div>
            </section>
        </div>
    )
}
