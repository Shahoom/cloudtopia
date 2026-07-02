import type { SubServiceContent } from '@/components/services/SubServicePage'
import { generatedSubServices } from './business-systems-subservices'
import { generatedSubServicesAr } from './business-systems-subservices-ar'
import { subServiceHref } from './sub-service-routing'

/**
 * Tailored rich content for Business Systems — PILOT.
 *  - richPillarData: full "main page" content per pillar (renders via the
 *    /business-systems-development design through RichPillarPage).
 *  - businessSystemsSubServices: tailored ServiceDetail per sub-service (renders
 *    via the existing rich /services/[slug] detail template).
 *
 * Pilot scope: Custom ERP & CRM pillar + Odoo ERP Implementation sub-service.
 * Once approved, the same shape is filled for the remaining pillars / sub-services.
 */

const BS_IMG = '/images/services/business-systems-development'
const ICON = '/icons/services'

// ─────────────────────────────────────────────────────────────────────────
// Pillar "main page" data (uses the /business-systems-development design)
// ─────────────────────────────────────────────────────────────────────────

export type RichPillarCard = {
    name: string
    tagline: string
    description: string
    icon: string
    features: string[]
}

export type RichPillarData = {
    slug: string
    hero: { title: string; description: string }
    products: { title: string; thumbnail: string }[]
    solutionsTitle: string
    solutionsSubtitle: string
    cards: RichPillarCard[]
    overview: {
        badge: string
        title: string
        description: string
        metrics: { label: string; value: string }[]
        expertiseTitle: string
        expertiseDescription: string
        expertiseItems: string[]
        processTitle: string
        processSteps: { name: string; detail: string; status: string }[]
        showcase: { src: string; alt: string; caption: string; captionRight: string }
    }
    cta: { title: string; description: string; button: string; explore: string }
}

const richPillarData: Record<string, RichPillarData> = {
    'custom-erp-crm-solutions': {
        slug: 'custom-erp-crm-solutions',
        hero: {
            title: 'Custom ERP & CRM Solutions',
            description:
                'Core ERP and CRM systems engineered around how your business actually runs — Odoo implementation, sales pipelines, multi-branch control, automated support, and role-based security. Built once, owned forever.',
        },
        products: [
            { title: 'Odoo ERP Implementation', thumbnail: `${BS_IMG}/1.webp` },
            { title: 'Sales CRM Pipeline', thumbnail: `${BS_IMG}/CRM System.webp` },
            { title: 'Multi-Branch Operations', thumbnail: `${BS_IMG}/2.webp` },
            { title: 'Automated Ticketing', thumbnail: `${BS_IMG}/3.webp` },
            { title: 'POS to ERP Sync', thumbnail: `${BS_IMG}/POS System.webp` },
            { title: 'Inventory Control', thumbnail: `${BS_IMG}/Inventory Management.webp` },
            { title: 'Role-Based Access', thumbnail: `${BS_IMG}/5.webp` },
            { title: 'Lead Distribution', thumbnail: `${BS_IMG}/6.webp` },
            { title: 'Data Migration', thumbnail: `${BS_IMG}/9.webp` },
            { title: 'E-Commerce Sync', thumbnail: `${BS_IMG}/11.avif` },
            { title: 'Booking Operations', thumbnail: `${BS_IMG}/booking system.webp` },
            { title: 'Sales Automation', thumbnail: `${BS_IMG}/CRM System.webp` },
            { title: 'Franchise Management', thumbnail: `${BS_IMG}/2.webp` },
            { title: 'Support Workflows', thumbnail: `${BS_IMG}/3.webp` },
            { title: 'Security Policies', thumbnail: `${BS_IMG}/1.webp` },
        ],
        solutionsTitle: 'What this pillar delivers',
        solutionsSubtitle: 'Eight core ERP & CRM capabilities — built, integrated, and owned by your team.',
        cards: [
            {
                name: 'Odoo ERP Implementation',
                tagline: 'Your operations, unified',
                description: 'Full Odoo setup, configuration, and customization across sales, inventory, accounting, and HR — tailored to your workflows, not the other way around.',
                icon: `${ICON}/systems.png`,
                features: ['Module configuration', 'Custom workflows', 'Data migration', 'Team training'],
            },
            {
                name: 'Sales CRM Pipeline',
                tagline: 'Close more, lose less',
                description: 'A CRM pipeline architected around your sales motion — stages, automations, reminders, and reporting that keep deals moving.',
                icon: `${ICON}/CRM System.png`,
                features: ['Pipeline design', 'Deal automation', 'Activity tracking', 'Sales reporting'],
            },
            {
                name: 'Legacy System Migration',
                tagline: 'Off the spreadsheets',
                description: 'Move scattered spreadsheets and outdated tools into one clean, structured system — with your history intact and deduplicated.',
                icon: `${ICON}/Admin Dashboard.png`,
                features: ['Data cleansing', 'Mapping & import', 'Validation', 'Zero data loss'],
            },
            {
                name: 'Lead Management Engine',
                tagline: 'Never drop a lead',
                description: 'Centralized capture and rule-based distribution so every lead lands with the right rep, instantly, with full source tracking.',
                icon: `${ICON}/Analytics Dashboard.png`,
                features: ['Central inbox', 'Auto-routing', 'Source tracking', 'SLA alerts'],
            },
            {
                name: 'Multi-Branch Operations',
                tagline: 'One system, every branch',
                description: 'Run multiple branches or franchises from one platform — shared data, per-branch controls, and consolidated reporting.',
                icon: `${ICON}/systems.png`,
                features: ['Branch hierarchy', 'Per-branch roles', 'Consolidated KPIs', 'Transfer flows'],
            },
            {
                name: 'Automated Ticketing',
                tagline: 'Support that scales',
                description: 'Customer support and ticketing with automated routing, SLAs, and a knowledge base — wired into your CRM.',
                icon: `${ICON}/Real-time Chat System.png`,
                features: ['Ticket routing', 'SLA tracking', 'Knowledge base', 'CRM linkage'],
            },
            {
                name: 'E-Commerce to ERP Sync',
                tagline: 'Orders, stock, in sync',
                description: 'Two-way sync between your storefront and ERP — orders, inventory, and customers stay aligned across every channel.',
                icon: `${ICON}/E-commerce Solutions.png`,
                features: ['Order sync', 'Live inventory', 'Customer sync', 'Multi-channel'],
            },
            {
                name: 'Role-Based Access (RBAC)',
                tagline: 'The right access, only',
                description: 'Granular permission matrices and security policies so each person sees and does exactly what their role allows — auditable end to end.',
                icon: `${ICON}/Customer Portal.png`,
                features: ['Permission matrix', 'Audit logs', 'Approval gates', 'Data policies'],
            },
        ],
        overview: {
            badge: 'Custom ERP & CRM Solutions',
            title: 'ERP & CRM systems built for how your business really runs',
            description:
                'We design and build core operational systems — Odoo ERP, sales CRM, multi-branch control, and automated support — that cut manual work, connect your data, and stay fully yours to extend. No bloated licences, no vendor lock-in.',
            metrics: [
                { label: 'Manual work cut', value: 'Up to 60%' },
                { label: 'Branches supported', value: 'Unlimited' },
                { label: 'Data ownership', value: '100%' },
                { label: 'Delivery model', value: 'Phased' },
            ],
            expertiseTitle: 'Where we go deep',
            expertiseDescription:
                'We specialize in ERP and CRM systems that integrate cleanly with your existing tools while staying flexible enough to grow with you.',
            expertiseItems: [
                'Odoo implementation & customization',
                'Sales pipeline & lead distribution design',
                'Multi-branch & franchise architecture',
                'Role-based security & audit trails',
                'E-commerce ↔ ERP synchronization',
                'Legacy migration with zero data loss',
            ],
            processTitle: 'How we deliver',
            processSteps: [
                { name: 'Discovery & mapping', detail: 'We map your real workflows, data, and roles before a line of config is written.', status: 'Phase 1' },
                { name: 'Build & integrate', detail: 'Configuration, customization, migration, and integrations with review gates and QA.', status: 'Phase 2' },
                { name: 'Launch & handoff', detail: 'Training, documentation, access handoff, and a support path your team owns.', status: 'Phase 3' },
            ],
            showcase: {
                src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80',
                alt: 'ERP and CRM dashboard showing pipelines, inventory, and analytics',
                caption: 'Unified ERP & CRM',
                captionRight: 'Real-time operations',
            },
        },
        cta: {
            title: 'Ready to unify your operations?',
            description: "Let's scope a custom ERP & CRM system around your workflows — with a free consultation and demo preview before you commit.",
            button: 'Start Your Project',
            explore: 'Explore All Services',
        },
    },
}

export function getRichPillarData(slug: string): RichPillarData | null {
    return richPillarData[slug] ?? null
}

// ─────────────────────────────────────────────────────────────────────────
// Tailored sub-service pages (SubServicePage template)
// ─────────────────────────────────────────────────────────────────────────

export const subServiceContent: Record<string, SubServiceContent> = {
    ...generatedSubServices,
    'odoo-erp-implementation': {
        slug: 'odoo-erp-implementation',
        service: 'Odoo ERP Implementation',
        pillarSlug: 'custom-erp-crm-solutions',
        pillarName: 'Custom ERP & CRM Solutions',
        seo: {
            title: 'Odoo ERP Implementation, Setup & Customization | CloudTopia',
            description:
                'CloudTopia implements and customizes Odoo ERP around your operations — sales, inventory, accounting, purchasing, and HR in one owned system. Free consultation and demo preview.',
        },
        hero: {
            eyebrow: 'Custom ERP & CRM',
            title: 'Odoo ERP Implementation, Setup & Customization',
            subtitle:
                'We turn Odoo into a system shaped around how your business actually runs — sales, inventory, accounting, purchasing, and HR connected in one platform you fully own.',
            chips: [
                'Community or Enterprise',
                'Tailored to your workflow',
                'Clean data migration',
                'Custom modules & screens',
                'Third-party integrations',
                'Role-based access',
                'Bilingual (AR + EN)',
                'Full ownership',
            ],
        },
        deliver: [
            {
                name: 'Edition & hosting setup',
                description: 'We pick the right Odoo edition, then install and host it cleanly and securely.',
                features: ['Community or Enterprise — we help you choose', 'Clean, secure install & hosting', 'Staging + production environments', 'Scheduled automated backups'],
            },
            {
                name: 'Module configuration',
                description: 'The modules you actually use, configured to match how you operate.',
                features: ['Sales, CRM & invoicing', 'Inventory with reordering rules', 'Accounting, taxes & VAT-ready', 'Purchase, HR & Manufacturing'],
            },
            {
                name: 'Custom workflows & screens',
                description: 'Tailored fields, screens, and automations — no rigid templates.',
                features: ['Custom fields & screens via Odoo Studio', 'Approval & automation rules', 'Role-based permissions', 'Bilingual AR + EN, RTL-ready'],
            },
            {
                name: 'Data migration',
                description: 'Your history brought into Odoo, cleansed and validated.',
                features: ['Map & cleanse legacy data', 'Customers, products & stock', 'Open balances & history', 'Validated, deduplicated import'],
            },
            {
                name: 'Integrations',
                description: 'Odoo connected to the rest of your stack in one flow.',
                features: ['Payment gateway & bank', 'E-commerce / website sync', 'WhatsApp & email automation', 'REST & XML-RPC APIs'],
            },
            {
                name: 'Access, reports & training',
                description: 'Reporting, permissions, and a team ready to run it.',
                features: ['Automated financial & ops reports', 'Dashboards per role', 'Hands-on team training', 'Documentation & handoff'],
            },
        ],
        outcomes: [
            { label: 'One source of truth', description: 'Sales, stock, and finance aligned in a single system.' },
            { label: 'Less manual work', description: 'Fewer re-entries and reconciliation errors across teams.' },
            { label: 'Clearer reporting', description: 'Faster month-end and real-time operational visibility.' },
            { label: 'You own it', description: 'A maintainable ERP your team controls — no lock-in.' },
        ],
        process: [
            { name: 'Discovery & mapping', detail: 'We map your real workflows, data, and roles before any configuration begins.', phase: 'Discovery' },
            { name: 'Configure & customize', detail: 'Module setup, custom screens, and automations built to your scope, with review gates.', phase: 'Build' },
            { name: 'Migrate & integrate', detail: 'Legacy data imported and validated; integrations connected and tested end to end.', phase: 'Integrate' },
            { name: 'Train & hand off', detail: 'Team training, documentation, access handoff, and a support path you own.', phase: 'Launch' },
        ],
        tech: ['Odoo', 'Odoo Studio', 'PostgreSQL', 'Python', 'XML / QWeb', 'REST & XML-RPC API', 'Docker'],
        industries: ['Retail & wholesale', 'Manufacturing', 'Trading & distribution', 'Services & agencies', 'Construction & contracting', 'Healthcare & clinics'],
        faqs: [
            { question: 'Do you use Odoo Community or Enterprise?', answer: 'Both — we recommend the edition that fits your budget and feature needs. Community keeps licensing free; Enterprise adds Studio, deeper accounting, and official support. We help you choose, and can migrate between them later.' },
            { question: 'Can you migrate our existing data and spreadsheets?', answer: 'Yes. We map, cleanse, deduplicate, and import your customers, products, stock, and history into Odoo with validation so nothing is lost or duplicated.' },
            { question: 'How long does an Odoo implementation take?', answer: 'A focused, single-department setup can launch in a few weeks. Multi-module, multi-branch rollouts are delivered in phases after discovery so each part is tested before the next goes live.' },
            { question: 'Do we own the system after launch?', answer: 'Fully. You receive the server access, database, custom modules, documentation, and training. There is no lock-in — your team can operate and extend it independently.' },
        ],
    },
}

/**
 * Arabic translations. Entries may be PARTIAL — e.g. just `seo` + `hero` for the
 * Arabic SEO pass — and are merged field-by-field over the English entry at the
 * getter, so any untranslated field (deliver, faqs, techStack…) falls back to EN.
 */
export const subServiceContentAr: Record<string, Partial<SubServiceContent>> = {
    ...generatedSubServicesAr,
}

export function getBusinessSystemsSubService(slug: string, locale = 'en'): SubServiceContent | null {
    const en = subServiceContent[slug] ?? null
    if (locale !== 'ar') return en
    const ar = subServiceContentAr[slug]
    if (!ar) return en
    if (!en) return ar as SubServiceContent
    return { ...en, ...ar } // Arabic fields override; missing ones fall back to English
}

// Per-pillar demand order (high-search/high-priority first). BS slugs were
// hand-assigned, so we list them explicitly here rather than deriving from the
// catalog names. Any sub-service not listed (e.g. absorbed legacy services) is
// appended after these, in its natural order.
const BS_PILLAR_ORDER: Record<string, string[]> = {
    'custom-erp-crm-solutions': [
        'odoo-erp-implementation',
        'sales-crm-pipeline-architecture',
        'legacy-system-migration',
        'lead-management-distribution',
        'multi-branch-operations-management',
        'customer-support-ticketing-systems',
        'ecommerce-erp-synchronization',
        'role-based-access-control',
    ],
    'business-management-systems': [
        'order-management-systems',
        'sales-management-systems',
        'hr-management-systems',
        'inventory-management-systems',
    ],
    'business-process-automation': [
        'whatsapp-crm-lead-capture',
        'automated-proposal-quotation-generation',
        'automated-invoicing-payment-reminders',
        'sales-followup-drip-automation',
        'purchase-order-approval-workflows',
        'cross-platform-api-integration',
        'esignature-contract-management',
        'employee-onboarding-automation',
    ],
}

/** All sub-services that belong to a pillar, with their slug + display copy. */
export function getBusinessSystemsSubServicesByPillar(
    pillarSlug: string,
    locale = 'en',
): { slug: string; name: string; desc: string; href: string }[] {
    const all = Object.values(subServiceContent).filter((s) => s.pillarSlug === pillarSlug)
    const bySlug = new Map(all.map((s) => [s.slug, s]))
    const ordered: SubServiceContent[] = []
    for (const slug of BS_PILLAR_ORDER[pillarSlug] ?? []) {
        const s = bySlug.get(slug)
        if (s) { ordered.push(s); bySlug.delete(slug) }
    }
    for (const s of bySlug.values()) ordered.push(s) // legacy/absorbed services last
    return ordered.map((s) => {
        const ar = locale === 'ar' ? subServiceContentAr[s.slug] : undefined
        return {
            slug: s.slug,
            name: ar?.hero?.title ?? s.hero.title,
            desc: ar?.hero?.subtitle ?? s.hero.subtitle,
            href: subServiceHref(pillarSlug, s.slug),
        }
    })
}

export const businessSystemsSubServiceSlugs = Object.keys(subServiceContent)
