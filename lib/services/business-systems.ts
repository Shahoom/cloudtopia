import type { DPGroup } from './digital-presence'

/**
 * CloudTopia — Business Systems Development, restructured.
 * Theme: Operational Efficiency → 4 pillar systems → sub-services.
 *
 * Industry-Specific Business Systems and Data Architecture & Business Intelligence
 * were removed. The "…Management Systems" offerings (order, sales, HR, inventory)
 * are consolidated into one focused Business Management Systems pillar.
 */

const t = (en: string, ar: string) => ({ en, ar })

export const businessSystemsGroups: DPGroup[] = [
    {
        slug: 'operational-efficiency',
        tagline: t('Run operations', 'تشغيل العمليات'),
        name: t('Operational Efficiency', 'الكفاءة التشغيلية'),
        pillars: [
            {
                slug: 'custom-erp-crm-solutions',
                name: t('Custom ERP & CRM Solutions', 'حلول ERP وCRM مخصصة'),
                description: t(
                    'Core ERP and CRM systems built and customized around your operations.',
                    'أنظمة ERP وCRM أساسية مبنية ومخصصة حول عملياتك.'),
                icon: '/icons/services/CRM System.png',
                href: '/services/custom-erp-crm-solutions',
                subServices: [
                    'Odoo ERP Implementation, Setup & Customization',
                    'Sales CRM Pipeline Architecture & Optimization',
                    'Legacy Spreadsheet & Outdated System Migration',
                    'Centralized Lead Management & Distribution Engines',
                    'Multi-Branch & Franchise Operations Management',
                    'Customer Support & Automated Ticketing Systems',
                    'Omnichannel E-Commerce to ERP Synchronization',
                    'Role-Based Access Control (RBAC) & Security Policies',
                ],
            },
            {
                slug: 'business-process-automation',
                name: t('Business Process Automation (BPA)', 'أتمتة عمليات الأعمال'),
                description: t(
                    'Automate proposals, invoicing, approvals, and follow-ups across your tools.',
                    'أتمتة العروض والفواتير والموافقات والمتابعات عبر أدواتك.'),
                icon: '/icons/services/Admin Dashboard.png',
                href: '/services/business-process-automation',
                subServices: [
                    'WhatsApp-to-CRM Lead Capture & Routing Setup',
                    'Automated Proposal, Quotation & PDF Generation',
                    'Automated Invoicing & Payment Reminder Workflows',
                    'Sales Follow-Up & Drip Campaign Automation',
                    'Purchase Order & Manager Approval Workflows',
                    'Cross-Platform API Syncing (Connecting Website, CRM & Accounting)',
                    'Electronic Signature (E-Sign) & Contract Management Automation',
                    'Automated Employee Onboarding & Offboarding Flows',
                ],
            },
            {
                slug: 'business-management-systems',
                name: t('Business Management Systems', 'أنظمة إدارة الأعمال'),
                description: t(
                    'Focused management systems for orders, sales, HR, and inventory — one connected operational backbone.',
                    'أنظمة إدارة مركّزة للطلبات والمبيعات والموارد البشرية والمخزون — عمود تشغيلي واحد مترابط.'),
                icon: '/icons/services/systems.png',
                href: '/services/business-management-systems',
                subServices: [
                    'Order Management Systems',
                    'Sales Management Systems',
                    'HR Management Systems',
                    'Inventory Management Systems',
                ],
            },
        ],
    },
]
