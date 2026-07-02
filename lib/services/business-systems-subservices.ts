import type { SubServiceContent } from '@/components/services/SubServicePage'

// AUTO-GENERATED — tailored Business Systems sub-services. Regenerate via the bs-subservice-content workflow.

export const generatedSubServices: Record<string, SubServiceContent> = {
  "accounting-system-integration": {
    "slug": "accounting-system-integration",
    "service": "Accounting Integration",
    "pillarSlug": "business-process-automation",
    "pillarName": "Business Process Automation (BPA)",
    "seo": {
      "title": "Accounting System Integration | CloudTopia",
      "description": "Accounting system integration that posts sales, payroll and bank feeds into your books automatically — clean VAT, faster month-end. Free consultation and demo."
    },
    "hero": {
      "eyebrow": "Process Automation",
      "title": "Accounting System Integration",
      "subtitle": "Stop typing the same sale, expense, and payment into your books by hand. We wire your sales, payroll, inventory, and bank feeds straight into your accounting software so entries post themselves, VAT stays clean, and month-end stops being a scramble.",
      "chips": [
        "Auto-posted entries",
        "Bank feed matching",
        "VAT-ready in OMR",
        "No double entry",
        "Live reconciliation",
        "Bilingual AR + EN",
        "You own the code",
        "Free demo preview"
      ]
    },
    "deliver": [
      {
        "name": "Chart-of-accounts & VAT mapping",
        "description": "We map every transaction type from your operations to the right ledger account and tax code so each entry lands where your accountant expects it.",
        "features": [
          "Account & cost-centre mapping",
          "5% VAT and zero-rated codes",
          "OMR and multi-currency rules",
          "Sign-off with your accountant"
        ]
      },
      {
        "name": "Sales & POS posting",
        "description": "Sales from your store, POS, and invoicing tools post into accounting as journal entries the moment they are confirmed.",
        "features": [
          "Daily POS sales summaries",
          "Per-order or batched journals",
          "Discounts, refunds & tips split out",
          "Payment method breakdown"
        ]
      },
      {
        "name": "Bank feed reconciliation",
        "description": "We pull statement lines from your bank and match them against invoices, bills, and payouts so reconciliation is mostly done before you look.",
        "features": [
          "Automated statement import",
          "Rule-based auto-matching",
          "Gateway payout settlement",
          "Unmatched items flagged"
        ]
      },
      {
        "name": "Payables & expense capture",
        "description": "Supplier bills, staff expenses, and recurring costs flow into accounting with line items already coded and ready to approve.",
        "features": [
          "Bill & receipt OCR capture",
          "Auto-coded line items",
          "Approval routing before posting",
          "Recurring expense schedules"
        ]
      },
      {
        "name": "Payroll & inventory journals",
        "description": "Salaries, WPS runs, and stock movements turn into the right journals so your P&L and balance sheet reflect them without manual entry.",
        "features": [
          "Payroll & WPS journal posting",
          "Cost of goods sold on each sale",
          "Stock valuation adjustments",
          "Accruals & depreciation runs"
        ]
      },
      {
        "name": "Sync monitoring & handover",
        "description": "A live dashboard shows what posted, what failed, and why, with retries and alerts — then we hand you the code, mappings, and documentation.",
        "features": [
          "Live posting log & retries",
          "WhatsApp or email failure alerts",
          "Mapping reference docs",
          "Code & credential handover"
        ]
      }
    ],
    "outcomes": [
      {
        "label": "Books that stay current",
        "description": "Sales, expenses, and payments post as they happen, so your ledgers reflect reality instead of last month."
      },
      {
        "label": "Month-end in hours",
        "description": "Most lines are already matched and coded, so closing the period stops eating days of your finance team's time."
      },
      {
        "label": "Clean, audit-ready VAT",
        "description": "Every entry carries the correct tax code from the start, making VAT returns and audits far less stressful."
      },
      {
        "label": "Fewer costly mistakes",
        "description": "Removing manual re-keying cuts the typos, missed bills, and mismatched figures that quietly distort your numbers."
      }
    ],
    "industries": [
      "Retail & multi-branch stores",
      "Restaurants & hospitality",
      "Trading & wholesale distribution",
      "Construction & contracting",
      "Clinics & medical practices",
      "Logistics & freight forwarding"
    ],
    "faqs": [
      {
        "question": "Do we have to switch accounting software?",
        "answer": "No. We integrate with the system you already use, whether that is QuickBooks, Xero, Zoho Books, Odoo, or SAP. The integration sits around your books and feeds them, so your accountant keeps working in the tool they know."
      },
      {
        "question": "How does the VAT and OMR handling stay correct?",
        "answer": "During mapping we agree the exact tax code for each transaction type with your accountant, including 5% standard, zero-rated, and exempt items, so every posted entry is tagged correctly from day one. Multi-currency sales are converted and recorded in OMR, and your VAT return draws from clean, consistent data."
      },
      {
        "question": "What happens when an entry can't be matched or posted?",
        "answer": "Nothing is dropped silently. Unmatched bank lines and failed postings are queued, retried, and surfaced on the dashboard, and you get a WhatsApp or email alert when something needs a human decision. You stay in control of anything ambiguous."
      },
      {
        "question": "Will this replace our accountant or bookkeeper?",
        "answer": "No, it makes their work faster and cleaner. The integration handles the repetitive data entry and reconciliation so your finance team can focus on review, reporting, and decisions instead of typing the same numbers twice."
      },
      {
        "question": "Do we own the integration once it's built?",
        "answer": "Completely. You receive the connector code, the account and tax mappings, and plain-language documentation, with no vendor lock-in. Your team or any developer can run, audit, and extend it without depending on us."
      }
    ],
    "techStack": {
      "title": "The stack we build this on",
      "subtitle": "Real accounting APIs, resilient posting jobs, and bank-grade matching wired into one integration you own end to end.",
      "categories": [
        {
          "label": "Accounting platforms",
          "items": [
            {
              "name": "QuickBooks",
              "icon": "https://cdn.simpleicons.org/quickbooks/2CA01C"
            },
            {
              "name": "Xero",
              "icon": "https://cdn.simpleicons.org/xero/13B5EA"
            },
            {
              "name": "Zoho Books",
              "icon": "https://cdn.simpleicons.org/zoho/E42527"
            },
            {
              "name": "Odoo Accounting",
              "icon": "https://cdn.simpleicons.org/odoo/714B67"
            }
          ]
        },
        {
          "label": "Integration & posting",
          "items": [
            {
              "name": "n8n",
              "icon": "https://cdn.simpleicons.org/n8n/EA4B71"
            },
            {
              "name": "Node.js",
              "icon": "https://cdn.simpleicons.org/nodedotjs/5FA04E"
            },
            {
              "name": "Python",
              "icon": "https://cdn.simpleicons.org/python/3776AB"
            },
            {
              "name": "Celery",
              "icon": "https://cdn.simpleicons.org/celery/37814A"
            }
          ]
        },
        {
          "label": "Payments & bank feeds",
          "items": [
            {
              "name": "Stripe",
              "icon": "https://cdn.simpleicons.org/stripe/635BFF"
            },
            {
              "name": "PayPal",
              "icon": "https://cdn.simpleicons.org/paypal/003087"
            },
            {
              "name": "Thawani"
            },
            {
              "name": "Bank statement import"
            }
          ]
        },
        {
          "label": "Capture & matching",
          "items": [
            {
              "name": "Receipt OCR"
            },
            {
              "name": "Reconciliation rules"
            },
            {
              "name": "VAT tax engine"
            },
            {
              "name": "ETL pipeline"
            }
          ]
        },
        {
          "label": "Data & reliability",
          "items": [
            {
              "name": "PostgreSQL",
              "icon": "https://cdn.simpleicons.org/postgresql/4169E1"
            },
            {
              "name": "Redis",
              "icon": "https://cdn.simpleicons.org/redis/FF4438"
            },
            {
              "name": "Google Sheets",
              "icon": "https://cdn.simpleicons.org/googlesheets/34A853"
            },
            {
              "name": "Retry & queueing"
            }
          ]
        },
        {
          "label": "Monitoring & alerts",
          "items": [
            {
              "name": "WhatsApp",
              "icon": "https://cdn.simpleicons.org/whatsapp/25D366"
            },
            {
              "name": "Grafana",
              "icon": "https://cdn.simpleicons.org/grafana/F46800"
            },
            {
              "name": "Sentry",
              "icon": "https://cdn.simpleicons.org/sentry/362D59"
            },
            {
              "name": "Posting audit log"
            }
          ]
        }
      ]
    }
  },
  "automated-invoicing-payment-reminders": {
    "slug": "automated-invoicing-payment-reminders",
    "service": "Invoicing & Reminder Automation",
    "pillarSlug": "business-process-automation",
    "pillarName": "Business Process Automation (BPA)",
    "seo": {
      "title": "Automated Invoicing & Payment Reminders | CloudTopia",
      "description": "Automate invoicing and chase late payments with scheduled WhatsApp and email reminders that stop the moment clients pay. Free consultation and demo preview."
    },
    "hero": {
      "eyebrow": "Process Automation",
      "title": "Automated Invoicing & Payment Reminder Workflows",
      "subtitle": "Stop chasing payments by hand. We build a workflow that raises invoices automatically, sends polite WhatsApp and email reminders on your schedule, and goes quiet the moment a client pays.",
      "chips": [
        "Auto-generated invoices",
        "WhatsApp + email reminders",
        "Stops when paid",
        "Bilingual AR + EN",
        "VAT-ready templates",
        "Aging dashboard",
        "WhatsApp-first setup",
        "You own it all"
      ]
    },
    "deliver": [
      {
        "name": "Automated invoice generation",
        "description": "Invoices are created and numbered the moment an order, contract milestone, or subscription cycle triggers them.",
        "features": [
          "Trigger from order, deal, or due date",
          "Sequential VAT-ready numbering",
          "Branded AR + EN PDF templates",
          "Auto-send on creation"
        ]
      },
      {
        "name": "Reminder schedule engine",
        "description": "We map your follow-up cadence into timed steps that fire before and after the due date without anyone lifting a finger.",
        "features": [
          "Pre-due courtesy notice",
          "Day-after and 7/15/30-day chases",
          "Quiet-hours and weekend rules",
          "Escalating tone per stage"
        ]
      },
      {
        "name": "WhatsApp + email delivery",
        "description": "Reminders reach clients where they actually reply — on WhatsApp first, with email as a documented fallback.",
        "features": [
          "WhatsApp Business API messages",
          "Approved bilingual templates",
          "Email with attached PDF",
          "Delivery and read tracking"
        ]
      },
      {
        "name": "Stop-on-payment logic",
        "description": "When a payment lands the workflow detects it and instantly cancels any pending reminders for that invoice.",
        "features": [
          "Payment-gateway and bank-feed checks",
          "Manual mark-as-paid option",
          "Partial-payment handling",
          "Auto-cancel queued chases"
        ]
      },
      {
        "name": "Receivables dashboard",
        "description": "A live view of who owes what, how overdue it is, and which reminders have gone out.",
        "features": [
          "Aging buckets (0-30-60-90)",
          "Outstanding total by client",
          "Reminder history timeline",
          "Export to accounting"
        ]
      },
      {
        "name": "Receipts & reconciliation",
        "description": "Paid invoices generate a receipt and close themselves out cleanly against your records.",
        "features": [
          "Auto receipt on payment",
          "Thank-you confirmation message",
          "Reference matching to invoice",
          "Sync to ERP or sheet"
        ]
      }
    ],
    "outcomes": [
      {
        "label": "Faster cash collection",
        "description": "Invoices go out the day work is done and follow-ups never slip, so money arrives sooner."
      },
      {
        "label": "Hours back every week",
        "description": "No one manually drafts invoices or hunts down late payers across spreadsheets and chats."
      },
      {
        "label": "Fewer awkward calls",
        "description": "Polite, automatic reminders do the chasing, keeping client relationships calm and professional."
      },
      {
        "label": "Clear receivables view",
        "description": "You always know exactly who is overdue and by how much, with no end-of-month surprises."
      }
    ],
    "industries": [
      "Professional services & agencies",
      "Trading & wholesale distribution",
      "Construction & contracting",
      "Clinics & medical practices",
      "Facilities & maintenance services",
      "Logistics & freight forwarding"
    ],
    "faqs": [
      {
        "question": "Will clients keep getting reminders after they pay?",
        "answer": "No. The workflow watches for payment through your gateway, bank feed, or a manual mark-as-paid, and cancels every pending reminder for that invoice the moment it clears. Clients only ever get a thank-you and receipt, never a chase for something already settled."
      },
      {
        "question": "Can reminders go out in Arabic and English?",
        "answer": "Yes. Every invoice, WhatsApp message, and email is delivered bilingually with RTL-ready Arabic, and we set the language per client so each one is reached in the language they prefer. Templates are reviewed with you before anything goes live."
      },
      {
        "question": "Does this work with the accounting tool we already use?",
        "answer": "In most cases, yes. We connect to common gateways, bank feeds, and systems like Odoo, QuickBooks, Zoho, or even a Google Sheet, so invoicing and payment status stay in sync. During the free consultation we confirm exactly which connections your setup supports."
      },
      {
        "question": "How are the WhatsApp messages sent so they don't get blocked?",
        "answer": "We use the official WhatsApp Business API with pre-approved message templates, not an unofficial bot, so delivery is reliable and compliant. This keeps your number in good standing and lets clients reply to a real, monitored channel."
      },
      {
        "question": "Do we own the system once it's built?",
        "answer": "Completely. You receive the code, the workflow configuration, the database, and the documentation, with no vendor lock-in. Your team can run it, adjust the reminder cadence, and extend it without depending on us."
      }
    ],
    "techStack": {
      "title": "The stack we build this on",
      "subtitle": "Proven automation, messaging, and payment tooling wired into one reliable invoicing-and-reminder workflow you own end to end.",
      "categories": [
        {
          "label": "Automation & orchestration",
          "items": [
            {
              "name": "n8n",
              "icon": "https://cdn.simpleicons.org/n8n/EA4B71"
            },
            {
              "name": "Node.js",
              "icon": "https://cdn.simpleicons.org/nodedotjs/5FA04E"
            },
            {
              "name": "Python",
              "icon": "https://cdn.simpleicons.org/python/3776AB"
            },
            {
              "name": "Cron scheduling"
            }
          ]
        },
        {
          "label": "Messaging & reminders",
          "items": [
            {
              "name": "WhatsApp Business API",
              "icon": "https://cdn.simpleicons.org/whatsapp/25D366"
            },
            {
              "name": "Twilio"
            },
            {
              "name": "Resend",
              "icon": "https://cdn.simpleicons.org/resend/000000"
            },
            {
              "name": "Bilingual templates"
            }
          ]
        },
        {
          "label": "Payments & reconciliation",
          "items": [
            {
              "name": "Stripe",
              "icon": "https://cdn.simpleicons.org/stripe/635BFF"
            },
            {
              "name": "Thawani"
            },
            {
              "name": "Bank feed matching"
            },
            {
              "name": "Payment webhooks"
            }
          ]
        },
        {
          "label": "Data & records",
          "items": [
            {
              "name": "PostgreSQL",
              "icon": "https://cdn.simpleicons.org/postgresql/4169E1"
            },
            {
              "name": "Redis",
              "icon": "https://cdn.simpleicons.org/redis/FF4438"
            },
            {
              "name": "Google Sheets",
              "icon": "https://cdn.simpleicons.org/googlesheets/34A853"
            },
            {
              "name": "Invoice PDF engine"
            }
          ]
        },
        {
          "label": "Accounting integrations",
          "items": [
            {
              "name": "Odoo",
              "icon": "https://cdn.simpleicons.org/odoo/714B67"
            },
            {
              "name": "QuickBooks",
              "icon": "https://cdn.simpleicons.org/quickbooks/2CA01C"
            },
            {
              "name": "Zoho Books",
              "icon": "https://cdn.simpleicons.org/zoho/E42527"
            },
            {
              "name": "REST APIs"
            }
          ]
        },
        {
          "label": "Dashboard & hosting",
          "items": [
            {
              "name": "React",
              "icon": "https://cdn.simpleicons.org/react/61DAFB"
            },
            {
              "name": "Docker",
              "icon": "https://cdn.simpleicons.org/docker/2496ED"
            },
            {
              "name": "Nginx",
              "icon": "https://cdn.simpleicons.org/nginx/009639"
            },
            {
              "name": "Role-based access"
            }
          ]
        }
      ]
    }
  },
  "automated-proposal-quotation-generation": {
    "slug": "automated-proposal-quotation-generation",
    "service": "Quote & Proposal Automation",
    "pillarSlug": "business-process-automation",
    "pillarName": "Business Process Automation (BPA)",
    "seo": {
      "title": "Automated Quotation & Proposal PDFs | CloudTopia",
      "description": "Generate branded, error-free quotes and proposals as PDFs straight from your data, in Arabic and English. CRM-connected, you own the code. Free consultation."
    },
    "hero": {
      "eyebrow": "Process Automation",
      "title": "Automated Proposal, Quotation & PDF Generation",
      "subtitle": "Turn enquiries into branded, error-free quotes and proposals in minutes, generated as polished PDFs straight from your own data. Built around your pricing, your templates, and your approval rules, in Arabic and English.",
      "chips": [
        "Branded PDF output",
        "Bilingual AR / EN",
        "Live pricing rules",
        "CRM-connected",
        "Approval workflows",
        "WhatsApp delivery",
        "Online e-sign",
        "You own the code"
      ]
    },
    "deliver": [
      {
        "name": "Quote & Proposal Builder",
        "description": "An internal tool where your team assembles a quotation or proposal from reusable line items, scopes, and clause libraries in minutes instead of rebuilding documents from scratch.",
        "features": [
          "Reusable line-item catalog",
          "Saved scope & clause blocks",
          "Bilingual AR/EN templates",
          "Draft, review, send states"
        ]
      },
      {
        "name": "Branded PDF Engine",
        "description": "A generation engine that turns approved quote data into a pixel-accurate, print-ready PDF carrying your logo, fonts, colours, and legal footer every single time.",
        "features": [
          "Pixel-accurate layouts",
          "RTL Arabic typesetting",
          "Auto page breaks & totals",
          "VAT-ready number formatting"
        ]
      },
      {
        "name": "Pricing & Discount Logic",
        "description": "Configurable rules that calculate line totals, tiered discounts, taxes, and margins automatically so numbers are never keyed in by hand or wrong on the page.",
        "features": [
          "Tiered & volume discounts",
          "Auto VAT calculation",
          "Margin floor guardrails",
          "Currency & rounding rules"
        ]
      },
      {
        "name": "Approval & Numbering Flow",
        "description": "A routing layer that sends high-value or below-margin quotes for sign-off and stamps every document with a sequential, audit-safe reference number.",
        "features": [
          "Threshold-based approvals",
          "Sequential quote numbers",
          "Version history & revisions",
          "Locked once approved"
        ]
      },
      {
        "name": "CRM & Data Integration",
        "description": "Connections that pull client, product, and pricing data from your existing CRM, accounting, or product catalog so proposals build themselves from a single source of truth.",
        "features": [
          "CRM contact & deal sync",
          "Product catalog pull-through",
          "Push accepted quotes to accounting",
          "API & webhook hooks"
        ]
      },
      {
        "name": "Send, Track & E-Sign",
        "description": "Delivery that emails or WhatsApps the PDF to the client, then tells your team the moment it is opened, accepted, or signed off.",
        "features": [
          "Email & WhatsApp delivery",
          "Open & view tracking",
          "Online accept / e-sign",
          "Auto follow-up reminders"
        ]
      }
    ],
    "outcomes": [
      {
        "label": "Quotes out in minutes",
        "description": "Sales teams send accurate, branded proposals the same day an enquiry lands instead of waiting on a free analyst to format a document."
      },
      {
        "label": "No more pricing errors",
        "description": "Discounts, taxes, and totals are calculated by rules you set, so figures on the PDF are always right and never below your margin floor."
      },
      {
        "label": "Consistent brand & compliance",
        "description": "Every document carries the same logo, terms, numbering, and legal footer, keeping your proposals professional and audit-ready."
      },
      {
        "label": "Faster deal closure",
        "description": "Tracking and online acceptance shorten the gap between sending a quote and getting a signed yes, with timely automated follow-ups."
      }
    ],
    "industries": [
      "Construction & contracting",
      "Trading & equipment supply",
      "Professional & consulting services",
      "IT & managed service providers",
      "Manufacturing & industrial",
      "Logistics & freight forwarding"
    ],
    "faqs": [
      {
        "question": "How is this different from using a Word or Excel template?",
        "answer": "Templates still rely on a person to copy numbers, apply the right discount, and avoid breaking the layout, which is where errors and delays creep in. This is a real system that pulls live data, runs your pricing rules, and renders a locked PDF automatically, so every quote is consistent and correct without manual rework."
      },
      {
        "question": "Can it produce Arabic and English proposals?",
        "answer": "Yes. We build the document engine to handle full right-to-left Arabic typesetting alongside English, including mixed-language lines, and your team can generate either version from the same quote data. Layouts, fonts, and number formatting stay correct in both directions."
      },
      {
        "question": "Will it connect to the CRM and accounting tools we already use?",
        "answer": "That is the usual goal. We integrate with your existing CRM, product catalog, or accounting software through their APIs so client and pricing data flows in and accepted quotes flow out, with no double entry. Where a system has no API, we agree a clean import or sync approach during scoping."
      },
      {
        "question": "Do we own the system or are we tied to your subscription?",
        "answer": "You fully own the source code, the data, and the documentation. There is no vendor lock-in and no per-document licence fee from us. You can host it yourself or have us manage it, and you are free to extend or move it whenever you want."
      },
      {
        "question": "How do we know it fits our quoting process before committing?",
        "answer": "We start with a free consultation to map exactly how you quote today, then show you a demo preview built around your line items and document style before any commitment. You see your own proposal coming out of the system before you decide to proceed."
      }
    ],
    "techStack": {
      "title": "The stack we build this on",
      "subtitle": "A proven toolchain for fast quote assembly, rule-driven pricing, and pixel-accurate bilingual PDF output that your team fully owns.",
      "categories": [
        {
          "label": "Application & API",
          "items": [
            {
              "name": "Node.js",
              "icon": "https://cdn.simpleicons.org/nodedotjs/5FA04E"
            },
            {
              "name": "Python",
              "icon": "https://cdn.simpleicons.org/python/3776AB"
            },
            {
              "name": "React",
              "icon": "https://cdn.simpleicons.org/react/61DAFB"
            },
            {
              "name": "REST & Webhooks"
            }
          ]
        },
        {
          "label": "PDF & Documents",
          "items": [
            {
              "name": "Puppeteer",
              "icon": "https://cdn.simpleicons.org/puppeteer/40B5A4"
            },
            {
              "name": "HTML to PDF"
            },
            {
              "name": "RTL Arabic typesetting"
            },
            {
              "name": "LaTeX",
              "icon": "https://cdn.simpleicons.org/latex/008080"
            }
          ]
        },
        {
          "label": "Data & Storage",
          "items": [
            {
              "name": "PostgreSQL",
              "icon": "https://cdn.simpleicons.org/postgresql/4169E1"
            },
            {
              "name": "MySQL",
              "icon": "https://cdn.simpleicons.org/mysql/4479A1"
            },
            {
              "name": "Redis",
              "icon": "https://cdn.simpleicons.org/redis/FF4438"
            },
            {
              "name": "Document storage"
            }
          ]
        },
        {
          "label": "Pricing & Rules",
          "items": [
            {
              "name": "Rules engine"
            },
            {
              "name": "VAT & tax logic"
            },
            {
              "name": "Approval routing"
            },
            {
              "name": "Sequential numbering"
            }
          ]
        },
        {
          "label": "Delivery & Signing",
          "items": [
            {
              "name": "WhatsApp API",
              "icon": "https://cdn.simpleicons.org/whatsapp/25D366"
            },
            {
              "name": "Twilio",
              "icon": "https://cdn.simpleicons.org/twilio/F22F46"
            },
            {
              "name": "Email delivery"
            },
            {
              "name": "Online e-sign"
            }
          ]
        },
        {
          "label": "Integrations",
          "items": [
            {
              "name": "Zapier",
              "icon": "https://cdn.simpleicons.org/zapier/FF4F00"
            },
            {
              "name": "n8n",
              "icon": "https://cdn.simpleicons.org/n8n/EA4B71"
            },
            {
              "name": "Google Sheets",
              "icon": "https://cdn.simpleicons.org/googlesheets/34A853"
            },
            {
              "name": "CRM & accounting sync"
            }
          ]
        }
      ]
    }
  },
  "crm-development": {
    "slug": "crm-development",
    "service": "CRM Development",
    "pillarSlug": "custom-erp-crm-solutions",
    "pillarName": "Custom ERP & CRM Solutions",
    "seo": {
      "title": "Custom CRM Development in Oman | CloudTopia",
      "description": "Custom CRM development shaped around how your team really works — contacts, deals, follow-ups, and reports you fully own. Free consultation and demo preview."
    },
    "hero": {
      "eyebrow": "Custom ERP & CRM",
      "title": "Custom CRM Development Built Around Your Business",
      "subtitle": "We build a custom CRM shaped around how your team really works with customers — every contact, deal, and conversation in one place. You own the code, the data, and the documentation, with no monthly seat fees and no vendor lock-in.",
      "chips": [
        "Built around your workflow",
        "Contacts & accounts",
        "Deal & quote tracking",
        "WhatsApp-connected",
        "Bilingual AR + EN",
        "Role-based access",
        "You own the code",
        "No vendor lock-in"
      ]
    },
    "deliver": [
      {
        "name": "Contact & account model",
        "description": "We design the data model your business actually needs — people, companies, and the relationships between them — instead of bending you to a fixed template.",
        "features": [
          "Custom fields for your industry",
          "Company and contact hierarchies",
          "Merge and duplicate handling",
          "Full activity timeline per record"
        ]
      },
      {
        "name": "Deal & opportunity tracking",
        "description": "Every enquiry becomes a tracked deal with the stages, values, and owners that match how you really sell.",
        "features": [
          "Stages built from your sales motion",
          "Quote and product line items",
          "Win and loss reasons captured",
          "Per-owner and per-team views"
        ]
      },
      {
        "name": "Conversation & follow-up hub",
        "description": "Calls, emails, and WhatsApp threads live on the customer record so anyone picking it up sees the full history.",
        "features": [
          "WhatsApp Business integration",
          "Logged calls, emails, and notes",
          "Automated follow-up reminders",
          "Bilingual templated replies"
        ]
      },
      {
        "name": "Reports & dashboards",
        "description": "Live dashboards built on your own database show pipeline, activity, and conversion without exporting to spreadsheets.",
        "features": [
          "Pipeline and revenue dashboards",
          "Rep activity and response times",
          "Conversion and source reports",
          "Scheduled email summaries"
        ]
      },
      {
        "name": "Roles, access & audit",
        "description": "Granular permissions control who sees and edits what, with a full trail of every change for accountability.",
        "features": [
          "Role-based field and record access",
          "Branch and team data separation",
          "Change history and audit log",
          "Approval steps for sensitive actions"
        ]
      },
      {
        "name": "Migration, ownership & training",
        "description": "We move your existing data in cleanly, hand over the full system, and train your team to run it without us.",
        "features": [
          "Data import from sheets or old CRM",
          "Source code and documentation handover",
          "Hands-on team training",
          "Admin access with no lock-in"
        ]
      }
    ],
    "outcomes": [
      {
        "label": "One source of truth",
        "description": "Every customer, deal, and conversation lives in one system instead of scattered across phones, inboxes, and spreadsheets."
      },
      {
        "label": "Nothing falls through",
        "description": "Automated reminders and clear ownership mean follow-ups happen on time and no enquiry goes cold."
      },
      {
        "label": "A CRM your team uses",
        "description": "Because it is built around your real workflow, reps actually log in daily rather than working around it."
      },
      {
        "label": "You own it outright",
        "description": "The code, data, and documentation are yours — extend it, host it anywhere, and pay no per-seat licence."
      }
    ],
    "industries": [
      "Real estate & property",
      "Trading & distribution",
      "Professional services & consultancies",
      "Clinics & medical centres",
      "Construction & contracting",
      "Travel & tourism agencies"
    ],
    "faqs": [
      {
        "question": "How is a custom CRM different from Salesforce or Zoho?",
        "answer": "Off-the-shelf CRMs make you adapt your process to their structure and charge a recurring fee per user. We build the system around how your team already works, and you own the code and data outright with no per-seat licence. If a ready-made tool genuinely fits you better, we will say so before any commitment."
      },
      {
        "question": "Can the CRM capture leads from WhatsApp and our website?",
        "answer": "Yes. We connect your WhatsApp Business line and web forms so every enquiry becomes a CRM record automatically, with the source attached and the conversation logged on the contact. That removes manual copy-paste and the leads that get lost in a shared inbox."
      },
      {
        "question": "Can you move our existing data into the new CRM?",
        "answer": "We do this on most projects. We import contacts, deals, and history from spreadsheets or your current CRM, clean duplicates along the way, and map the old fields to your new structure. You see a demo preview with your real data before anything goes live."
      },
      {
        "question": "Will it work in both Arabic and English?",
        "answer": "Yes. The interface, templates, and notifications are fully bilingual and RTL-ready, so Arabic and English users each get a native experience. Customer-facing replies can go out in the language each contact prefers."
      },
      {
        "question": "Do we really own the system after launch?",
        "answer": "Completely. You receive the full source code, the database, and the documentation, plus administrator access. There is no lock-in — your team can host it, adjust it, and extend it independently of us."
      }
    ],
    "techStack": {
      "title": "The stack we build this on",
      "subtitle": "Proven, well-documented tools we use to build a CRM your team can own, host, and extend after launch.",
      "categories": [
        {
          "label": "Application",
          "items": [
            {
              "name": "Odoo CRM"
            },
            {
              "name": "Python",
              "icon": "https://cdn.simpleicons.org/python/3776AB"
            },
            {
              "name": "React",
              "icon": "https://cdn.simpleicons.org/react/61DAFB"
            },
            {
              "name": "Node.js",
              "icon": "https://cdn.simpleicons.org/nodedotjs/5FA04E"
            }
          ]
        },
        {
          "label": "Database",
          "items": [
            {
              "name": "PostgreSQL",
              "icon": "https://cdn.simpleicons.org/postgresql/4169E1"
            },
            {
              "name": "MySQL",
              "icon": "https://cdn.simpleicons.org/mysql/4479A1"
            },
            {
              "name": "Redis",
              "icon": "https://cdn.simpleicons.org/redis/FF4438"
            },
            {
              "name": "Custom data model"
            }
          ]
        },
        {
          "label": "Messaging & lead capture",
          "items": [
            {
              "name": "WhatsApp Business API",
              "icon": "https://cdn.simpleicons.org/whatsapp/25D366"
            },
            {
              "name": "Twilio"
            },
            {
              "name": "Web forms"
            },
            {
              "name": "Email-to-lead"
            }
          ]
        },
        {
          "label": "Automation",
          "items": [
            {
              "name": "n8n",
              "icon": "https://cdn.simpleicons.org/n8n/EA4B71"
            },
            {
              "name": "Zapier",
              "icon": "https://cdn.simpleicons.org/zapier/FF4F00"
            },
            {
              "name": "Follow-up reminders"
            },
            {
              "name": "Webhooks"
            }
          ]
        },
        {
          "label": "Reporting",
          "items": [
            {
              "name": "Metabase",
              "icon": "https://cdn.simpleicons.org/metabase/509EE3"
            },
            {
              "name": "Google Sheets",
              "icon": "https://cdn.simpleicons.org/googlesheets/34A853"
            },
            {
              "name": "Live dashboards"
            },
            {
              "name": "Scheduled summaries"
            }
          ]
        },
        {
          "label": "Security & hosting",
          "items": [
            {
              "name": "Docker",
              "icon": "https://cdn.simpleicons.org/docker/2496ED"
            },
            {
              "name": "Nginx",
              "icon": "https://cdn.simpleicons.org/nginx/009639"
            },
            {
              "name": "Role-based access"
            },
            {
              "name": "Automated backups"
            }
          ]
        }
      ]
    }
  },
  "cross-platform-api-integration": {
    "slug": "cross-platform-api-integration",
    "service": "Cross-Platform API Syncing",
    "pillarSlug": "business-process-automation",
    "pillarName": "Business Process Automation (BPA)",
    "seo": {
      "title": "Cross-Platform API Syncing in Oman | CloudTopia",
      "description": "Sync your website, CRM and accounting with cross-platform API integration — no double entry, no mismatched data. Free consultation and demo before you commit."
    },
    "hero": {
      "eyebrow": "Process Automation",
      "title": "Cross-Platform API Syncing (Website, CRM & Accounting)",
      "subtitle": "Stop copying the same order, contact, and invoice between three systems. We wire your website, CRM, and accounting together so every record updates itself the moment something changes — and you own the integration end to end.",
      "chips": [
        "Website to CRM",
        "CRM to accounting",
        "Two-way sync",
        "No double entry",
        "Webhook-driven",
        "Bilingual support",
        "You own the code",
        "Free demo preview"
      ]
    },
    "deliver": [
      {
        "name": "Integration Mapping & Field Matching",
        "description": "We map every record and field across your website, CRM, and accounting so the same customer, order, or invoice means the same thing in all three.",
        "features": [
          "Field-by-field mapping",
          "Record matching rules",
          "Duplicate handling",
          "Source-of-truth decisions"
        ]
      },
      {
        "name": "Website-to-CRM Lead & Order Sync",
        "description": "Form submissions, enquiries, and online orders land in your CRM instantly with the right owner, tags, and source attached.",
        "features": [
          "Form & checkout capture",
          "Auto-assign to rep",
          "Source tagging",
          "Instant CRM entry"
        ]
      },
      {
        "name": "CRM-to-Accounting Sync",
        "description": "Won deals and confirmed orders flow into your accounting system as invoices, customers, and payments without re-keying a thing.",
        "features": [
          "Invoice creation",
          "Customer record sync",
          "Payment status updates",
          "Tax-ready line items"
        ]
      },
      {
        "name": "Two-Way Real-Time Connectors",
        "description": "We build webhook and API connectors so a change in one system pushes to the others in seconds, in whichever direction you need.",
        "features": [
          "Webhook listeners",
          "Scheduled fallback polling",
          "Bidirectional updates",
          "Rate-limit handling"
        ]
      },
      {
        "name": "Sync Health Dashboard & Alerts",
        "description": "A live view of what synced, what failed, and why — with automatic retries and WhatsApp or email alerts when something needs a human.",
        "features": [
          "Live sync log",
          "Auto-retry queue",
          "Failure alerts",
          "One-click resync"
        ]
      },
      {
        "name": "Documentation & Full Handover",
        "description": "You receive the connector code, API mappings, and plain-language docs so your team can run, audit, and extend the integration without us.",
        "features": [
          "Connector source code",
          "Mapping reference docs",
          "Credential handover",
          "Team walkthrough"
        ]
      }
    ],
    "outcomes": [
      {
        "label": "No more double entry",
        "description": "Your team stops re-typing orders and invoices across systems, freeing hours every week for actual work."
      },
      {
        "label": "One source of truth",
        "description": "Customer, order, and payment data matches across website, CRM, and accounting, so reports finally agree."
      },
      {
        "label": "Faster cash flow",
        "description": "Won deals become invoices the same day, shortening the gap between sale and payment."
      },
      {
        "label": "Fewer costly errors",
        "description": "Automated mapping removes the typos and missed records that come from manual copying between tools."
      }
    ],
    "industries": [
      "Retail & e-commerce",
      "Real estate agencies",
      "Trading & distribution",
      "Professional services firms",
      "Healthcare clinics",
      "Logistics & freight forwarders"
    ],
    "faqs": [
      {
        "question": "Which platforms can you connect?",
        "answer": "If a system has an API or webhook, we can usually connect it — common setups include WordPress, WooCommerce, and custom websites talking to HubSpot, Zoho, Salesforce, or Odoo, then through to QuickBooks, Xero, Zoho Books, or Odoo accounting. In the free consultation we confirm exactly which of your tools can sync and which need a workaround."
      },
      {
        "question": "Will the sync run in real time or on a schedule?",
        "answer": "Most integrations are webhook-driven, so a change pushes across in seconds. Where a platform does not support webhooks, we add scheduled polling as a fallback, and you can see in the dashboard exactly when each system last synced."
      },
      {
        "question": "What happens when a sync fails?",
        "answer": "Failures are caught, logged, and automatically retried, and you get a WhatsApp or email alert if a record still needs attention. Nothing disappears silently — every event is visible in the sync log so you can resync with one click."
      },
      {
        "question": "Do I own the integration, or am I locked into you?",
        "answer": "You own it completely — the connector code, the field mappings, the documentation, and your data. There is no monthly platform fee to us and no vendor lock-in; your team can run and extend the integration on its own, and we are here if you want us."
      },
      {
        "question": "Can you avoid creating duplicate records?",
        "answer": "Yes. We define matching rules and a source of truth for each record type during the mapping phase, so an existing customer updates instead of duplicating. We also clean up existing duplicates as part of the initial setup where needed."
      }
    ],
    "techStack": {
      "title": "The stack we build this on",
      "subtitle": "Proven connectors, real APIs, and tooling chosen to keep your three systems in lockstep.",
      "categories": [
        {
          "label": "Integration & orchestration",
          "items": [
            {
              "name": "n8n",
              "icon": "https://cdn.simpleicons.org/n8n/EA4B71"
            },
            {
              "name": "Zapier",
              "icon": "https://cdn.simpleicons.org/zapier/FF4F00"
            },
            {
              "name": "Node.js",
              "icon": "https://cdn.simpleicons.org/nodedotjs/5FA04E"
            },
            {
              "name": "Webhooks"
            }
          ]
        },
        {
          "label": "CRM platforms",
          "items": [
            {
              "name": "HubSpot",
              "icon": "https://cdn.simpleicons.org/hubspot/FF7A59"
            },
            {
              "name": "Salesforce"
            },
            {
              "name": "Zoho",
              "icon": "https://cdn.simpleicons.org/zoho/E42527"
            },
            {
              "name": "Odoo CRM",
              "icon": "https://cdn.simpleicons.org/odoo/714B67"
            }
          ]
        },
        {
          "label": "Accounting systems",
          "items": [
            {
              "name": "QuickBooks",
              "icon": "https://cdn.simpleicons.org/quickbooks/2CA01C"
            },
            {
              "name": "Xero",
              "icon": "https://cdn.simpleicons.org/xero/13B5EA"
            },
            {
              "name": "Zoho Books",
              "icon": "https://cdn.simpleicons.org/zoho/E42527"
            },
            {
              "name": "Odoo Accounting",
              "icon": "https://cdn.simpleicons.org/odoo/714B67"
            }
          ]
        },
        {
          "label": "Website & e-commerce",
          "items": [
            {
              "name": "WordPress",
              "icon": "https://cdn.simpleicons.org/wordpress/21759B"
            },
            {
              "name": "WooCommerce",
              "icon": "https://cdn.simpleicons.org/woocommerce/96588A"
            },
            {
              "name": "Shopify",
              "icon": "https://cdn.simpleicons.org/shopify/7AB55C"
            },
            {
              "name": "Stripe",
              "icon": "https://cdn.simpleicons.org/stripe/635BFF"
            }
          ]
        },
        {
          "label": "Data & reliability",
          "items": [
            {
              "name": "PostgreSQL",
              "icon": "https://cdn.simpleicons.org/postgresql/4169E1"
            },
            {
              "name": "Redis",
              "icon": "https://cdn.simpleicons.org/redis/FF4438"
            },
            {
              "name": "REST & GraphQL APIs"
            },
            {
              "name": "Retry & queueing"
            }
          ]
        },
        {
          "label": "Alerts & notifications",
          "items": [
            {
              "name": "WhatsApp",
              "icon": "https://cdn.simpleicons.org/whatsapp/25D366"
            },
            {
              "name": "Telegram",
              "icon": "https://cdn.simpleicons.org/telegram/26A5E4"
            },
            {
              "name": "Gmail API",
              "icon": "https://cdn.simpleicons.org/gmail/EA4335"
            },
            {
              "name": "Slack"
            }
          ]
        }
      ]
    }
  },
  "custom-api-development": {
    "slug": "custom-api-development",
    "service": "Custom API Development & Integration",
    "pillarSlug": "business-process-automation",
    "pillarName": "Business Process Automation (BPA)",
    "seo": {
      "title": "Custom API Development & Integration | CloudTopia",
      "description": "Custom API development and integration — REST & GraphQL APIs that securely connect your systems, partners, and paid tools. Free consultation and demo preview."
    },
    "hero": {
      "eyebrow": "Process Automation",
      "title": "Custom API Development & Integration",
      "subtitle": "We build the APIs that let your software, your partners, and the apps you already pay for talk to each other — and we connect to almost any third-party or government service that exposes one. You own every endpoint, every key, and every line of code.",
      "chips": [
        "REST & GraphQL APIs",
        "Third-party integrations",
        "Webhooks & events",
        "Auth & rate limiting",
        "OpenAPI docs",
        "Bilingual (AR + EN)",
        "You own the code",
        "Free demo preview"
      ]
    },
    "deliver": [
      {
        "name": "Custom REST & GraphQL APIs",
        "description": "We design and build the endpoints your apps, partners, and internal tools need, modelled around your actual data and operations rather than a rigid template.",
        "features": [
          "Resource & schema design",
          "REST or GraphQL",
          "Versioned endpoints",
          "Pagination & filtering"
        ]
      },
      {
        "name": "Third-Party API Integration",
        "description": "We connect your systems to the external services you depend on and normalise their messy responses into one clean, predictable shape your team can rely on.",
        "features": [
          "Payment & SMS gateways",
          "Shipping & maps APIs",
          "Government & bank portals",
          "Response normalisation"
        ]
      },
      {
        "name": "Integration Middleware Layer",
        "description": "We build a middleware service that sits between your systems so each one talks to one stable interface instead of a tangle of point-to-point connections.",
        "features": [
          "Single integration hub",
          "Data transformation",
          "Legacy system adapters",
          "Decoupled services"
        ]
      },
      {
        "name": "Authentication & Rate Limiting",
        "description": "We secure every endpoint with proper authentication, scoped permissions, and rate limits so only the right callers get in and no one can overwhelm your service.",
        "features": [
          "API keys & OAuth 2.0",
          "JWT & token refresh",
          "Per-client rate limits",
          "Scoped access roles"
        ]
      },
      {
        "name": "Webhooks & Event Delivery",
        "description": "We add outbound webhooks and event handling so other systems react the moment something changes, with retries and a delivery log so nothing is lost silently.",
        "features": [
          "Outbound webhooks",
          "Signed payloads",
          "Automatic retries",
          "Delivery log & replay"
        ]
      },
      {
        "name": "API Docs & Full Handover",
        "description": "You receive interactive OpenAPI documentation, a ready-to-use request collection, and the full source so your developers can build against it without us.",
        "features": [
          "Interactive OpenAPI docs",
          "Postman collection",
          "Source code & keys",
          "Developer walkthrough"
        ]
      }
    ],
    "outcomes": [
      {
        "label": "Systems that connect",
        "description": "Your apps, partners, and paid tools exchange data automatically instead of relying on exports, emails, and manual re-keying."
      },
      {
        "label": "Faster to ship",
        "description": "New features and partner integrations plug into a stable, documented API instead of forcing a rebuild every time."
      },
      {
        "label": "Secure by design",
        "description": "Authentication, scoped access, and rate limiting protect your data and keep a clear record of who called what."
      },
      {
        "label": "No vendor lock-in",
        "description": "You hold the code, keys, and documentation, so your team or any developer can run and extend the API independently."
      }
    ],
    "industries": [
      "Fintech & payments",
      "Logistics & delivery",
      "E-commerce & retail",
      "Healthcare & clinics",
      "Insurance & brokerages",
      "Government & semi-government"
    ],
    "faqs": [
      {
        "question": "Can you connect to a system that has no public API?",
        "answer": "Often, yes. Where there is no official API we build adapters using database access, file feeds, secure scraping, or SDKs the vendor provides, then wrap it in a clean interface your other systems can use. In the free consultation we confirm exactly what is possible for your specific tools."
      },
      {
        "question": "Should my API be REST or GraphQL?",
        "answer": "It depends on how it will be used. REST is simple and a great fit for partner integrations and straightforward apps, while GraphQL shines when clients need to pull exactly the fields they want in one call. We recommend the right one for your case during scoping, and we can build both where it makes sense."
      },
      {
        "question": "How do you keep the API secure?",
        "answer": "Every endpoint is protected with authentication such as API keys, OAuth 2.0, or JWTs, plus scoped permissions so each caller only reaches what it should. We add rate limiting, request validation, and logging so abuse is blocked and every call is traceable."
      },
      {
        "question": "Will my developers be able to work with it after handover?",
        "answer": "Yes, that is the point. You receive interactive OpenAPI documentation, a Postman collection, the full source code, and the keys, plus a walkthrough with your team. There is no lock-in to us, so any competent developer can run and extend the API."
      },
      {
        "question": "Can you integrate with local Oman and GCC services?",
        "answer": "Yes. We regularly connect to regional payment gateways, SMS providers, courier and maps APIs, and government or bank portals used across Oman and the wider GCC. We handle the bilingual Arabic and English data and the quirks each provider tends to have."
      }
    ],
    "techStack": {
      "title": "The stack we build this on",
      "subtitle": "Battle-tested API frameworks, real authentication standards, and tooling chosen to keep your endpoints fast, secure, and easy to integrate against.",
      "categories": [
        {
          "label": "API frameworks",
          "items": [
            {
              "name": "Node.js",
              "icon": "https://cdn.simpleicons.org/nodedotjs/5FA04E"
            },
            {
              "name": "Express",
              "icon": "https://cdn.simpleicons.org/express/000000"
            },
            {
              "name": "NestJS",
              "icon": "https://cdn.simpleicons.org/nestjs/E0234E"
            },
            {
              "name": "FastAPI",
              "icon": "https://cdn.simpleicons.org/fastapi/009688"
            }
          ]
        },
        {
          "label": "API styles & contracts",
          "items": [
            {
              "name": "REST"
            },
            {
              "name": "GraphQL",
              "icon": "https://cdn.simpleicons.org/graphql/E10098"
            },
            {
              "name": "OpenAPI",
              "icon": "https://cdn.simpleicons.org/openapiinitiative/6BA539"
            },
            {
              "name": "Webhooks"
            }
          ]
        },
        {
          "label": "Auth & security",
          "items": [
            {
              "name": "OAuth 2.0"
            },
            {
              "name": "JWT",
              "icon": "https://cdn.simpleicons.org/jsonwebtokens/000000"
            },
            {
              "name": "Kong Gateway",
              "icon": "https://cdn.simpleicons.org/kong/003459"
            },
            {
              "name": "Rate limiting"
            }
          ]
        },
        {
          "label": "Data & messaging",
          "items": [
            {
              "name": "PostgreSQL",
              "icon": "https://cdn.simpleicons.org/postgresql/4169E1"
            },
            {
              "name": "MongoDB",
              "icon": "https://cdn.simpleicons.org/mongodb/47A248"
            },
            {
              "name": "Redis",
              "icon": "https://cdn.simpleicons.org/redis/FF4438"
            },
            {
              "name": "RabbitMQ",
              "icon": "https://cdn.simpleicons.org/rabbitmq/FF6600"
            }
          ]
        },
        {
          "label": "Docs & testing",
          "items": [
            {
              "name": "Swagger UI",
              "icon": "https://cdn.simpleicons.org/swagger/85EA2D"
            },
            {
              "name": "Postman",
              "icon": "https://cdn.simpleicons.org/postman/FF6C37"
            },
            {
              "name": "Contract tests"
            },
            {
              "name": "Mock servers"
            }
          ]
        },
        {
          "label": "Deploy & monitoring",
          "items": [
            {
              "name": "Docker",
              "icon": "https://cdn.simpleicons.org/docker/2496ED"
            },
            {
              "name": "Nginx",
              "icon": "https://cdn.simpleicons.org/nginx/009639"
            },
            {
              "name": "Sentry",
              "icon": "https://cdn.simpleicons.org/sentry/362D59"
            },
            {
              "name": "Grafana",
              "icon": "https://cdn.simpleicons.org/grafana/F46800"
            }
          ]
        }
      ]
    }
  },
  "customer-support-ticketing-systems": {
    "slug": "customer-support-ticketing-systems",
    "service": "Support & Ticketing System",
    "pillarSlug": "custom-erp-crm-solutions",
    "pillarName": "Custom ERP & CRM Solutions",
    "seo": {
      "title": "Customer Support & Ticketing Systems | CloudTopia",
      "description": "Custom support desks and automated ticketing systems that route, track, and resolve every customer issue across WhatsApp and email. Free consultation and demo."
    },
    "hero": {
      "eyebrow": "Custom ERP & CRM",
      "title": "Customer Support & Automated Ticketing Systems",
      "subtitle": "We build a support desk shaped around how your team really handles customers — every WhatsApp message, email, and call turned into a tracked ticket that routes itself, escalates on time, and never slips through the cracks.",
      "chips": [
        "WhatsApp + email intake",
        "Auto-routing & assignment",
        "SLA timers & escalation",
        "Knowledge base",
        "Linked to your CRM",
        "Bilingual (AR + EN)",
        "CSAT & response reports",
        "Full ownership"
      ]
    },
    "deliver": [
      {
        "name": "Omnichannel ticket intake",
        "description": "Turn every incoming message into one trackable ticket, no matter where the customer reached you.",
        "features": [
          "WhatsApp Business API inbox",
          "Email-to-ticket inbox",
          "Web form & in-app widget",
          "One thread per customer"
        ]
      },
      {
        "name": "Routing & assignment rules",
        "description": "Send each ticket to the right agent or team automatically, based on rules you control.",
        "features": [
          "Route by topic, language or product",
          "Round-robin & load balancing",
          "Priority & VIP flags",
          "Auto-assign with fallbacks"
        ]
      },
      {
        "name": "SLA timers & escalation",
        "description": "Put response and resolution clocks on every ticket so nothing ages out silently.",
        "features": [
          "First-response & resolution SLAs",
          "Breach warnings before they hit",
          "Auto-escalate to a manager",
          "Business-hours & holiday calendars"
        ]
      },
      {
        "name": "Automation & canned replies",
        "description": "Cut repetitive work with auto-replies, macros, and trigger-based actions.",
        "features": [
          "Instant acknowledgement messages",
          "Saved replies in AR + EN",
          "Auto-tagging & categorization",
          "Optional AI reply suggestions"
        ]
      },
      {
        "name": "Knowledge base & self-service",
        "description": "Deflect common questions with a searchable help center customers can use before they ever open a ticket.",
        "features": [
          "Bilingual articles, RTL-ready",
          "Search & suggested answers",
          "Public or login-only access",
          "Agent-side internal notes"
        ]
      },
      {
        "name": "CRM link & reporting",
        "description": "Connect tickets to the customer record and report on what your support team is actually delivering.",
        "features": [
          "Full history per customer",
          "Linked orders & accounts",
          "Agent & queue dashboards",
          "CSAT & response-time reports"
        ]
      }
    ],
    "outcomes": [
      {
        "label": "Nothing slips",
        "description": "Every message becomes a tracked ticket with an owner and a deadline, so requests stop getting lost in personal inboxes and chats."
      },
      {
        "label": "Faster replies",
        "description": "Auto-routing, canned answers, and SLA timers cut the time customers wait for a first response and a resolution."
      },
      {
        "label": "Clear accountability",
        "description": "Dashboards show who is handling what, where tickets are stuck, and which SLAs are at risk — in real time."
      },
      {
        "label": "You own it",
        "description": "The support system, its data, and its documentation are yours to run and extend, with no per-agent licence trap."
      }
    ],
    "industries": [
      "Retail & e-commerce",
      "Telecom & internet providers",
      "Banking & financial services",
      "Healthcare & clinics",
      "Logistics & delivery",
      "Government & public services"
    ],
    "faqs": [
      {
        "question": "Can customers reach support over WhatsApp?",
        "answer": "Yes. We connect the official WhatsApp Business API so every chat becomes a ticket your agents answer from one shared desk, with the full conversation kept on record. Email, web forms, and an in-app widget feed into the same place, so your team works from a single queue instead of scattered apps."
      },
      {
        "question": "How does a ticket get to the right agent?",
        "answer": "You define the routing rules and the system applies them automatically — by topic, language, product, branch, or VIP status. Tickets can be balanced round-robin across a team, escalated to a manager when an SLA is about to breach, and reassigned with fallbacks if nobody picks them up."
      },
      {
        "question": "Does it work in Arabic and English?",
        "answer": "Fully. The agent interface, customer help center, and canned replies all support Arabic and English, with proper right-to-left layout. Agents can answer a customer in the language they wrote in, and the knowledge base can hold both versions of every article."
      },
      {
        "question": "Can it connect to our CRM or ERP?",
        "answer": "Yes — that is the point. We link each ticket to the customer record so agents see past orders, accounts, and previous issues without switching systems. If you run Odoo, a custom CRM, or another platform, we integrate over its API so support and operations share the same data."
      },
      {
        "question": "Do we own the system and its data?",
        "answer": "Completely. You receive the source code, the database, the documentation, and admin access. There is no per-seat licensing and no lock-in — you can add agents, change workflows, or host it wherever you like, and your team can run it independently after handoff."
      }
    ],
    "techStack": {
      "title": "The stack we build this on",
      "subtitle": "Proven, ownable tools for intake, automation, and reporting — wired together around your support workflow.",
      "categories": [
        {
          "label": "Core platform",
          "items": [
            {
              "name": "Node.js",
              "icon": "https://cdn.simpleicons.org/nodedotjs/5FA04E"
            },
            {
              "name": "Python",
              "icon": "https://cdn.simpleicons.org/python/3776AB"
            },
            {
              "name": "React",
              "icon": "https://cdn.simpleicons.org/react/61DAFB"
            },
            {
              "name": "Odoo Helpdesk"
            }
          ]
        },
        {
          "label": "Channels & messaging",
          "items": [
            {
              "name": "WhatsApp Business API",
              "icon": "https://cdn.simpleicons.org/whatsapp/25D366"
            },
            {
              "name": "Twilio",
              "icon": "https://cdn.simpleicons.org/twilio/F22F46"
            },
            {
              "name": "Email (IMAP/SMTP)"
            },
            {
              "name": "Web chat widget"
            }
          ]
        },
        {
          "label": "Automation & AI",
          "items": [
            {
              "name": "n8n",
              "icon": "https://cdn.simpleicons.org/n8n/EA4B71"
            },
            {
              "name": "OpenAI",
              "icon": "https://cdn.simpleicons.org/openai/412991"
            },
            {
              "name": "SLA rule engine"
            },
            {
              "name": "Auto-routing"
            }
          ]
        },
        {
          "label": "Data & storage",
          "items": [
            {
              "name": "PostgreSQL",
              "icon": "https://cdn.simpleicons.org/postgresql/4169E1"
            },
            {
              "name": "Redis",
              "icon": "https://cdn.simpleicons.org/redis/FF4438"
            },
            {
              "name": "Full ticket history"
            },
            {
              "name": "Attachments store"
            }
          ]
        },
        {
          "label": "Reporting & access",
          "items": [
            {
              "name": "CSAT surveys"
            },
            {
              "name": "Queue dashboards"
            },
            {
              "name": "Role-based access"
            },
            {
              "name": "Audit logs"
            }
          ]
        },
        {
          "label": "Hosting & delivery",
          "items": [
            {
              "name": "Docker",
              "icon": "https://cdn.simpleicons.org/docker/2496ED"
            },
            {
              "name": "Nginx",
              "icon": "https://cdn.simpleicons.org/nginx/009639"
            },
            {
              "name": "Amazon Web Services",
              "icon": "https://cdn.simpleicons.org/amazonwebservices/FF9900"
            },
            {
              "name": "Automated backups"
            }
          ]
        }
      ]
    }
  },
  "ecommerce-erp-synchronization": {
    "slug": "ecommerce-erp-synchronization",
    "service": "E-Commerce ERP Sync",
    "pillarSlug": "custom-erp-crm-solutions",
    "pillarName": "Custom ERP & CRM Solutions",
    "seo": {
      "title": "E-Commerce to ERP Synchronization | CloudTopia",
      "description": "Connect your e-commerce, marketplaces, and POS to your ERP in real time — one stock count, no double entry. Free consultation and demo before you commit."
    },
    "hero": {
      "eyebrow": "Custom ERP & CRM",
      "title": "Omnichannel E-Commerce to ERP Synchronization",
      "subtitle": "Connect your online store, marketplaces, and POS to your ERP so orders, stock, and customers stay in sync across every channel — automatically, with no spreadsheets or double entry. You own the integration end to end.",
      "chips": [
        "Real-time order sync",
        "One live stock count",
        "Marketplace + POS",
        "No double entry",
        "Two-way inventory",
        "Bilingual AR + EN",
        "Full ownership",
        "WhatsApp-first support"
      ]
    },
    "deliver": [
      {
        "name": "Channel connectors",
        "description": "We connect each sales channel you run to one central sync layer.",
        "features": [
          "Shopify, WooCommerce & custom storefronts",
          "Amazon, noon & local marketplaces",
          "In-store POS terminals",
          "One unified order feed"
        ]
      },
      {
        "name": "Real-time order sync",
        "description": "Every order flows into your ERP the moment it is placed, fully mapped.",
        "features": [
          "Instant order push to ERP",
          "Line items, taxes & discounts",
          "Customer & shipping details",
          "Payment status & refunds"
        ]
      },
      {
        "name": "Two-way inventory engine",
        "description": "One stock figure shared across every channel, updated both ways.",
        "features": [
          "Single live stock count",
          "Auto-deduct on each sale",
          "Restock & purchase sync",
          "Per-warehouse allocation"
        ]
      },
      {
        "name": "Product & price mapping",
        "description": "Your catalog stays aligned across channels from one source of truth.",
        "features": [
          "SKU & barcode matching",
          "Variant & bundle handling",
          "Channel-specific pricing",
          "Image & description push"
        ]
      },
      {
        "name": "Fulfilment & returns flow",
        "description": "Shipping, tracking, and returns stay current on both sides.",
        "features": [
          "Status & tracking sync",
          "Courier & AWB updates",
          "Returns & restock handling",
          "WhatsApp order alerts"
        ]
      },
      {
        "name": "Conflict handling & monitoring",
        "description": "Guardrails that catch mismatches before they reach a customer.",
        "features": [
          "Oversell prevention",
          "Retry & queue on failures",
          "Mismatch alerts & logs",
          "Sync dashboard per channel"
        ]
      }
    ],
    "outcomes": [
      {
        "label": "No oversells",
        "description": "One shared stock count stops you selling items you no longer have."
      },
      {
        "label": "Zero double entry",
        "description": "Orders post straight to your ERP, so no one re-keys them by hand."
      },
      {
        "label": "Faster fulfilment",
        "description": "Picking, invoicing, and dispatch start the second an order lands."
      },
      {
        "label": "One clear view",
        "description": "Every channel's sales and stock visible in a single, owned system."
      }
    ],
    "industries": [
      "Retail & multi-store chains",
      "Fashion & apparel brands",
      "Electronics & appliances",
      "Grocery & FMCG distribution",
      "Health, beauty & cosmetics",
      "Trading & wholesale"
    ],
    "faqs": [
      {
        "question": "Which stores and marketplaces can you connect?",
        "answer": "We connect mainstream platforms like Shopify and WooCommerce, regional marketplaces such as noon and Amazon, and custom-built storefronts. We also tie in your in-store POS so online and offline sales draw from the same stock."
      },
      {
        "question": "How does the inventory sync stay accurate?",
        "answer": "Stock lives as a single live figure that every channel reads from and writes to. When an item sells anywhere, the count drops everywhere within seconds, and oversell guards plus retry queues catch any channel that is briefly unreachable."
      },
      {
        "question": "Do we have to replace our current store or ERP?",
        "answer": "No. The sync layer sits between the tools you already use, so you keep your existing storefront and ERP. We adapt the integration to your setup rather than forcing you onto new software."
      },
      {
        "question": "What happens if a channel goes offline or an order fails to sync?",
        "answer": "Failed syncs are queued and retried automatically, and you get an alert with a clear log of what went wrong. Nothing is silently dropped, and the sync dashboard shows the live status of every channel."
      },
      {
        "question": "Do we own the integration after launch?",
        "answer": "Yes, completely. You receive the source code, the configuration, and full documentation, with no vendor lock-in. Your team can run, extend, or hand it to another developer at any time."
      }
    ],
    "techStack": {
      "title": "The stack we build this on",
      "subtitle": "Proven channel APIs, a resilient sync layer, and your ERP — wired together so data moves reliably in both directions.",
      "categories": [
        {
          "label": "Storefronts & marketplaces",
          "items": [
            {
              "name": "Shopify",
              "icon": "https://cdn.simpleicons.org/shopify/7AB55C"
            },
            {
              "name": "WooCommerce",
              "icon": "https://cdn.simpleicons.org/woocommerce/96588A"
            },
            {
              "name": "PrestaShop",
              "icon": "https://cdn.simpleicons.org/prestashop/DF0067"
            },
            {
              "name": "Marketplace APIs"
            }
          ]
        },
        {
          "label": "ERP & POS",
          "items": [
            {
              "name": "Odoo",
              "icon": "https://cdn.simpleicons.org/odoo/714B67"
            },
            {
              "name": "SAP",
              "icon": "https://cdn.simpleicons.org/sap/0FAAFF"
            },
            {
              "name": "Zoho",
              "icon": "https://cdn.simpleicons.org/zoho/E42527"
            },
            {
              "name": "POS integration"
            }
          ]
        },
        {
          "label": "Sync services",
          "items": [
            {
              "name": "Node.js",
              "icon": "https://cdn.simpleicons.org/nodedotjs/5FA04E"
            },
            {
              "name": "Python",
              "icon": "https://cdn.simpleicons.org/python/3776AB"
            },
            {
              "name": "n8n",
              "icon": "https://cdn.simpleicons.org/n8n/EA4B71"
            },
            {
              "name": "Celery",
              "icon": "https://cdn.simpleicons.org/celery/37814A"
            }
          ]
        },
        {
          "label": "Data & queues",
          "items": [
            {
              "name": "PostgreSQL",
              "icon": "https://cdn.simpleicons.org/postgresql/4169E1"
            },
            {
              "name": "Redis",
              "icon": "https://cdn.simpleicons.org/redis/FF4438"
            },
            {
              "name": "RabbitMQ",
              "icon": "https://cdn.simpleicons.org/rabbitmq/FF6600"
            },
            {
              "name": "ETL pipeline"
            }
          ]
        },
        {
          "label": "Notifications",
          "items": [
            {
              "name": "WhatsApp",
              "icon": "https://cdn.simpleicons.org/whatsapp/25D366"
            },
            {
              "name": "Resend",
              "icon": "https://cdn.simpleicons.org/resend/000000"
            },
            {
              "name": "Mailgun",
              "icon": "https://cdn.simpleicons.org/mailgun/F06B66"
            },
            {
              "name": "Webhook alerts"
            }
          ]
        },
        {
          "label": "Infrastructure",
          "items": [
            {
              "name": "Docker",
              "icon": "https://cdn.simpleicons.org/docker/2496ED"
            },
            {
              "name": "Nginx",
              "icon": "https://cdn.simpleicons.org/nginx/009639"
            },
            {
              "name": "Grafana",
              "icon": "https://cdn.simpleicons.org/grafana/F46800"
            },
            {
              "name": "Sentry",
              "icon": "https://cdn.simpleicons.org/sentry/362D59"
            }
          ]
        }
      ]
    }
  },
  "employee-onboarding-automation": {
    "slug": "employee-onboarding-automation",
    "service": "Onboarding & Offboarding Automation",
    "pillarSlug": "business-process-automation",
    "pillarName": "Business Process Automation (BPA)",
    "seo": {
      "title": "Employee Onboarding Automation | CloudTopia",
      "description": "Automate employee onboarding and offboarding so accounts, access, and paperwork are handled in order, with a full audit trail. Free consultation and demo."
    },
    "hero": {
      "eyebrow": "Process Automation",
      "title": "Automated Employee Onboarding & Offboarding Flows",
      "subtitle": "Turn every new hire and exit into a single triggered workflow that creates accounts, grants the right access, chases signatures, and notifies every department on time. When someone leaves, the same flow revokes access the moment it should, so nothing slips through.",
      "chips": [
        "First-day readiness",
        "Account provisioning",
        "Access revocation",
        "E-signature paperwork",
        "Approval routing",
        "Asset tracking",
        "Audit trail",
        "Arabic + English"
      ]
    },
    "deliver": [
      {
        "name": "Trigger & intake forms",
        "description": "A bilingual intake form starts the flow the moment a hire is confirmed or a resignation is logged, capturing role, department, branch, and start or last-working day.",
        "features": [
          "Arabic + English forms",
          "Role & department fields",
          "Start / exit date capture",
          "Hire vs. exit branching"
        ]
      },
      {
        "name": "Task orchestration engine",
        "description": "We map your onboarding and offboarding checklist into ordered, role-aware tasks that fire to HR, IT, finance, and the line manager with the right deadlines.",
        "features": [
          "Sequenced task lists",
          "Per-role checklists",
          "Auto-assigned owners",
          "Deadline reminders"
        ]
      },
      {
        "name": "Account provisioning hooks",
        "description": "Connect to your email, directory, and core tools so accounts, mailboxes, and group memberships are created on onboarding and disabled on exit without manual tickets.",
        "features": [
          "Email & directory sync",
          "Group / licence assignment",
          "Day-one credentials",
          "One-click deprovision"
        ]
      },
      {
        "name": "Documents & e-signature",
        "description": "Offer letters, contracts, NDAs, and policy acknowledgements are generated from templates, sent for signature, and filed against the employee record automatically.",
        "features": [
          "Template document fill",
          "E-signature requests",
          "Acknowledgement tracking",
          "Auto-filed records"
        ]
      },
      {
        "name": "Approvals & asset handover",
        "description": "Route equipment requests, access approvals, and final clearances to the right approvers, and track laptops, SIMs, and access cards from issue to return.",
        "features": [
          "Multi-step approvals",
          "Asset issue / return log",
          "Exit clearance checklist",
          "Final-settlement handoff"
        ]
      },
      {
        "name": "Status dashboard & alerts",
        "description": "A live dashboard shows where every joiner and leaver stands, with WhatsApp and email alerts when a step is overdue or an access revocation is pending.",
        "features": [
          "Live flow status",
          "WhatsApp / email alerts",
          "Overdue-step flags",
          "Completion audit log"
        ]
      }
    ],
    "outcomes": [
      {
        "label": "Productive from day one",
        "description": "New hires arrive to working accounts, signed paperwork, and assigned equipment instead of waiting days for IT tickets to clear."
      },
      {
        "label": "No lingering access",
        "description": "Offboarding revokes logins, email, and building access on the exact last working day, closing the security gap that manual exits leave open."
      },
      {
        "label": "Less HR admin",
        "description": "Repetitive chasing across departments becomes one automated flow, freeing HR to handle the people part instead of the paperwork."
      },
      {
        "label": "Audit-ready records",
        "description": "Every account created, document signed, and asset returned is logged with a timestamp, so internal audits and labour-compliance reviews are straightforward."
      }
    ],
    "industries": [
      "Banking & financial services",
      "Healthcare & clinics",
      "Retail & multi-branch chains",
      "Construction & contracting",
      "Logistics & supply chain",
      "Professional services & consultancies"
    ],
    "faqs": [
      {
        "question": "Can it connect to the HR and email systems we already use?",
        "answer": "Yes. We build the flow around your existing stack, whether that is your Microsoft or Google email and directory, an Odoo or other HR module, or a directory you maintain. Where a tool offers an API or webhook, we provision and deprovision through it; where it does not, the flow generates a clear assigned task instead, so nothing is missed."
      },
      {
        "question": "How does the offboarding side prevent access from being left open?",
        "answer": "The exit flow is scheduled against the employee's last working day, so revocation tasks fire automatically at the right time rather than relying on someone remembering. Logins, email, group memberships, and asset returns each become a tracked step, and the dashboard flags anything still pending past its deadline."
      },
      {
        "question": "Is the system bilingual for our Arabic-speaking staff?",
        "answer": "It is. Intake forms, notifications, documents, and the dashboard are delivered in Arabic and English with full right-to-left support. Each employee and approver can work in the language they are comfortable with, while the underlying flow stays the same."
      },
      {
        "question": "Do we own the workflow, or are we locked into your platform?",
        "answer": "You own it outright. The code, the workflow definitions, the data, and the documentation are all handed over to you with no vendor lock-in. You can run it on your own infrastructure and have full freedom to extend or adjust it later, with or without us."
      },
      {
        "question": "Can we see how it works before committing?",
        "answer": "Yes. We start with a free consultation to map your current onboarding and exit steps, then show you a demo preview of the automated flow built around them. WhatsApp is the fastest way to reach us and book that first session."
      }
    ],
    "techStack": {
      "title": "The stack we build this on",
      "subtitle": "A practical toolchain for triggering flows, provisioning accounts, generating documents, and keeping a clean audit trail.",
      "categories": [
        {
          "label": "Workflow & orchestration",
          "items": [
            {
              "name": "n8n",
              "icon": "https://cdn.simpleicons.org/n8n/EA4B71"
            },
            {
              "name": "Node.js",
              "icon": "https://cdn.simpleicons.org/nodedotjs/5FA04E"
            },
            {
              "name": "Temporal"
            },
            {
              "name": "Zapier",
              "icon": "https://cdn.simpleicons.org/zapier/FF4F00"
            }
          ]
        },
        {
          "label": "Data & records",
          "items": [
            {
              "name": "PostgreSQL",
              "icon": "https://cdn.simpleicons.org/postgresql/4169E1"
            },
            {
              "name": "MySQL",
              "icon": "https://cdn.simpleicons.org/mysql/4479A1"
            },
            {
              "name": "Redis",
              "icon": "https://cdn.simpleicons.org/redis/FF4438"
            },
            {
              "name": "Audit logging"
            }
          ]
        },
        {
          "label": "Identity & provisioning",
          "items": [
            {
              "name": "Microsoft 365"
            },
            {
              "name": "Google Workspace"
            },
            {
              "name": "Keycloak",
              "icon": "https://cdn.simpleicons.org/keycloak/4D4D4D"
            },
            {
              "name": "Role-based access"
            }
          ]
        },
        {
          "label": "Documents & signatures",
          "items": [
            {
              "name": "DocuSign"
            },
            {
              "name": "PDF generation"
            },
            {
              "name": "Template merge"
            },
            {
              "name": "Google Sheets",
              "icon": "https://cdn.simpleicons.org/googlesheets/34A853"
            }
          ]
        },
        {
          "label": "Notifications",
          "items": [
            {
              "name": "WhatsApp",
              "icon": "https://cdn.simpleicons.org/whatsapp/25D366"
            },
            {
              "name": "Twilio"
            },
            {
              "name": "Email / SMTP"
            },
            {
              "name": "Slack"
            }
          ]
        },
        {
          "label": "Hosting & delivery",
          "items": [
            {
              "name": "Docker",
              "icon": "https://cdn.simpleicons.org/docker/2496ED"
            },
            {
              "name": "AWS"
            },
            {
              "name": "Nginx",
              "icon": "https://cdn.simpleicons.org/nginx/009639"
            },
            {
              "name": "React",
              "icon": "https://cdn.simpleicons.org/react/61DAFB"
            }
          ]
        }
      ]
    }
  },
  "esignature-contract-management": {
    "slug": "esignature-contract-management",
    "service": "E-Signature & Contract Automation",
    "pillarSlug": "business-process-automation",
    "pillarName": "Business Process Automation (BPA)",
    "seo": {
      "title": "E-Signature & Contract Automation | CloudTopia",
      "description": "Automate contract drafting, bilingual e-signing, and renewals with audit-ready records you fully own. Book a free consultation and demo preview with CloudTopia."
    },
    "hero": {
      "eyebrow": "Process Automation",
      "title": "E-Signature & Contract Management Automation",
      "subtitle": "Send, sign, and track contracts in hours instead of days, with bilingual signing pages and audit-ready records that hold up in a dispute. Built around your approval flow and owned entirely by you.",
      "chips": [
        "Same-day signing",
        "Bilingual signer pages",
        "Audit-ready trail",
        "Renewal alerts",
        "CRM & ERP sync",
        "WhatsApp notifications",
        "Tamper-evident seal",
        "You own the code"
      ]
    },
    "deliver": [
      {
        "name": "Document Template Builder",
        "description": "We turn your standard agreements into smart, reusable templates with auto-filled fields, clause libraries, and pre-placed signature blocks so a new contract is generated in seconds instead of rebuilt by hand.",
        "features": [
          "Reusable contract templates",
          "Auto-filled merge fields",
          "Approved clause library",
          "Pre-placed signature anchors"
        ]
      },
      {
        "name": "Sequential Signing Workflows",
        "description": "We map your real approval chain into ordered, parallel, or conditional signing routes so each contract reaches the right signer at the right step without anyone chasing emails.",
        "features": [
          "Ordered signer routing",
          "Parallel & conditional steps",
          "Auto reminder nudges",
          "Delegate & re-assign rules"
        ]
      },
      {
        "name": "Bilingual Signing Experience",
        "description": "Signers receive a clean Arabic or English signing page that mirrors their language and reads right-to-left correctly, so GCC counterparties sign with confidence on any device.",
        "features": [
          "Arabic & English pages",
          "Full RTL layout",
          "Mobile-ready signing",
          "Branded signer view"
        ]
      },
      {
        "name": "Audit Trail & Tamper Seal",
        "description": "Every signed contract is locked with a complete, timestamped audit trail capturing who signed, when, and from where, plus a tamper-evident seal you can prove in a dispute.",
        "features": [
          "Timestamped event log",
          "Signer identity capture",
          "Tamper-evident sealing",
          "Court-ready certificate"
        ]
      },
      {
        "name": "Contract Lifecycle Tracking",
        "description": "We build a central repository that tracks every contract from draft to signed to renewal, with status dashboards and alerts so nothing expires or auto-renews unnoticed.",
        "features": [
          "Central contract registry",
          "Status & stage dashboard",
          "Renewal & expiry alerts",
          "Full-text contract search"
        ]
      },
      {
        "name": "System & WhatsApp Integration",
        "description": "We wire signing into the tools you already use, so a signed contract updates your CRM, triggers the invoice, files the PDF, and pings the deal owner on WhatsApp automatically.",
        "features": [
          "CRM & ERP sync",
          "WhatsApp signing alerts",
          "Auto-file signed PDFs",
          "Trigger downstream actions"
        ]
      }
    ],
    "outcomes": [
      {
        "label": "Faster Deal Closure",
        "description": "Contracts that once waited days for printing, signing, and scanning get returned signed the same day, shortening your sales and onboarding cycles."
      },
      {
        "label": "Zero Missed Renewals",
        "description": "Automatic expiry and renewal alerts mean no contract lapses or silently auto-renews without your team deciding on it first."
      },
      {
        "label": "Dispute-Proof Records",
        "description": "A complete audit trail and tamper seal on every agreement give you defensible proof of consent if a signature or term is ever questioned."
      },
      {
        "label": "Hours Back Per Week",
        "description": "Removing manual drafting, chasing, filing, and data re-entry frees your admin and legal staff to focus on higher-value work."
      }
    ],
    "industries": [
      "Real Estate & Property Management",
      "Legal & Professional Services",
      "Construction & Contracting",
      "Financial Services & Lending",
      "Logistics & Freight Forwarding",
      "HR & Recruitment Agencies"
    ],
    "faqs": [
      {
        "question": "Are electronically signed contracts legally valid in Oman and the GCC?",
        "answer": "Yes. Oman's Electronic Transactions Law and equivalent regulations across the GCC recognise electronic signatures and records as legally binding when intent and identity are properly captured. We build the audit trail, timestamping, and signer verification needed to make each signature defensible, and you own that evidence in full."
      },
      {
        "question": "Do we have to move off the tools we already use?",
        "answer": "No. The automation connects to your existing CRM, ERP, accounting, and document storage rather than replacing them. A contract signed in the new flow updates those systems automatically, so your team keeps working where they already do."
      },
      {
        "question": "Can the signing experience work fully in Arabic?",
        "answer": "Yes. Every signing page, email, and reminder can be delivered in Arabic or English with correct right-to-left layout, and signers can choose their language. This keeps the experience clear for counterparties anywhere in the GCC."
      },
      {
        "question": "Who owns the system and the signed contracts once it is built?",
        "answer": "You do, completely. CloudTopia builds custom automation around your process and hands over the full source code, your data, and the documentation with no vendor lock-in. Your signed contracts and their audit trails live in infrastructure you control."
      },
      {
        "question": "Can we see how it works before committing?",
        "answer": "Absolutely. We start with a free consultation to map your contract and approval flow, then build a demo preview so you can see your own templates and signing routes in action before any commitment. The fastest way to begin is a message on WhatsApp."
      }
    ],
    "techStack": {
      "title": "The stack we build this on",
      "subtitle": "A signing and contract engine assembled from proven, open tools and your existing systems, all delivered as code you own.",
      "categories": [
        {
          "label": "Application Core",
          "items": [
            {
              "name": "Node.js",
              "icon": "https://cdn.simpleicons.org/nodedotjs/5FA04E"
            },
            {
              "name": "React",
              "icon": "https://cdn.simpleicons.org/react/61DAFB"
            },
            {
              "name": "TypeScript",
              "icon": "https://cdn.simpleicons.org/typescript/3178C6"
            },
            {
              "name": "Next.js",
              "icon": "https://cdn.simpleicons.org/nextdotjs/000000"
            }
          ]
        },
        {
          "label": "Documents & Signing",
          "items": [
            {
              "name": "PDF Generation"
            },
            {
              "name": "Signature Capture"
            },
            {
              "name": "Template Engine"
            },
            {
              "name": "OCR Field Extraction"
            }
          ]
        },
        {
          "label": "Data & Storage",
          "items": [
            {
              "name": "PostgreSQL",
              "icon": "https://cdn.simpleicons.org/postgresql/4169E1"
            },
            {
              "name": "Redis",
              "icon": "https://cdn.simpleicons.org/redis/FF4438"
            },
            {
              "name": "Amazon S3"
            },
            {
              "name": "Tamper-Evident Sealing"
            }
          ]
        },
        {
          "label": "Automation & Workflows",
          "items": [
            {
              "name": "n8n",
              "icon": "https://cdn.simpleicons.org/n8n/EA4B71"
            },
            {
              "name": "Approval Routing"
            },
            {
              "name": "Audit Trail Logging"
            },
            {
              "name": "Renewal Scheduler"
            }
          ]
        },
        {
          "label": "Notifications & Delivery",
          "items": [
            {
              "name": "WhatsApp",
              "icon": "https://cdn.simpleicons.org/whatsapp/25D366"
            },
            {
              "name": "Twilio",
              "icon": "https://cdn.simpleicons.org/twilio/F22F46"
            },
            {
              "name": "Email Delivery"
            },
            {
              "name": "Signer Reminders"
            }
          ]
        },
        {
          "label": "Integrations & Security",
          "items": [
            {
              "name": "REST & Webhook APIs"
            },
            {
              "name": "CRM & ERP Sync"
            },
            {
              "name": "Role-Based Access"
            },
            {
              "name": "Encryption at Rest"
            }
          ]
        }
      ]
    }
  },
  "hr-management-systems": {
    "slug": "hr-management-systems",
    "service": "HR Management Systems",
    "pillarSlug": "business-management-systems",
    "pillarName": "Business Management Systems",
    "seo": {
      "title": "HR Management Systems in Oman | CloudTopia",
      "description": "Custom HR management systems for Oman and GCC teams — one record for every employee, leave, attendance, and approvals you fully own. Free consultation and demo."
    },
    "hero": {
      "eyebrow": "Internal Apps",
      "title": "HR Management Systems",
      "subtitle": "One internal system that holds every employee record, runs leave and attendance, and routes approvals the way your company actually works. Built around your policies, bilingual in Arabic and English, and fully owned by you — no per-seat licence to renew.",
      "chips": [
        "Single employee record",
        "Leave & attendance",
        "Org chart & structure",
        "Self-service requests",
        "Document expiry alerts",
        "Role-based access",
        "Bilingual AR + EN",
        "Full ownership"
      ]
    },
    "deliver": [
      {
        "name": "Central employee record",
        "description": "A single, structured profile for every employee that replaces scattered spreadsheets and folders as your one source of truth.",
        "features": [
          "Personal, job & contract details",
          "Department, grade & reporting line",
          "Document & certificate store",
          "Full change history per field"
        ]
      },
      {
        "name": "Leave & attendance engine",
        "description": "Configurable leave types and attendance rules that match your handbook, with balances that update automatically as requests are approved.",
        "features": [
          "Annual, sick & unpaid leave rules",
          "Accrual, carry-over & encashment",
          "Shift, timesheet & overtime capture",
          "Public-holiday & weekend calendars"
        ]
      },
      {
        "name": "Self-service & approvals",
        "description": "An employee and manager portal where staff raise requests and managers approve them, instead of the HR team chasing email and paper.",
        "features": [
          "Leave, expense & letter requests",
          "Multi-level approval routing",
          "Manager team dashboard",
          "Arabic + English, RTL-ready"
        ]
      },
      {
        "name": "Org structure & directory",
        "description": "A live org chart and searchable staff directory that mirror your real hierarchy across branches and departments.",
        "features": [
          "Drag-to-build org chart",
          "Branch & department grouping",
          "Searchable employee directory",
          "Vacancy & headcount view"
        ]
      },
      {
        "name": "Document & compliance alerts",
        "description": "Automated tracking of every expiring document so visas, IDs, and contracts never lapse without an early warning.",
        "features": [
          "Passport, visa & resident-card dates",
          "Contract & certificate renewals",
          "WhatsApp & email reminders",
          "HR escalation dashboard"
        ]
      },
      {
        "name": "Reports & payroll handoff",
        "description": "The HR reports managers actually use, plus a clean export of approved leave and attendance that feeds your payroll run.",
        "features": [
          "Headcount, turnover & leave reports",
          "Attendance & overtime summaries",
          "Payroll-ready data export",
          "One-click Excel & PDF output"
        ]
      }
    ],
    "outcomes": [
      {
        "label": "One source of truth",
        "description": "Every employee detail, document, and leave balance lives in one place, so HR stops reconciling spreadsheets and starts trusting the numbers."
      },
      {
        "label": "HR off email duty",
        "description": "Self-service requests and manager approvals replace the daily back-and-forth, freeing your HR team for work that actually needs a person."
      },
      {
        "label": "Always compliant",
        "description": "Visa, ID, and contract expiries are flagged well in advance, and a complete change history makes labour audits straightforward."
      },
      {
        "label": "You own it all",
        "description": "The code, your employee data, and the documentation stay yours — no per-seat fees and no vendor lock-in as your headcount grows."
      }
    ],
    "industries": [
      "Construction & contracting",
      "Facilities & manpower services",
      "Retail & hospitality groups",
      "Healthcare & clinics",
      "Logistics & transport",
      "Professional services firms"
    ],
    "faqs": [
      {
        "question": "How is this different from an HR and payroll portal?",
        "answer": "This is the HR system of record — the single place that holds your people data, org structure, leave, and attendance and runs your approval flows. It produces a clean, payroll-ready export of approved leave and hours, and we can connect it directly to a payroll engine, but its job is to keep your HR data accurate and your day-to-day requests moving."
      },
      {
        "question": "Can we map our own leave policies and approval chains?",
        "answer": "Yes. We configure your exact leave types, accrual and carry-over rules, and weekend and public-holiday calendars, then build the approval routing to match your real hierarchy. Because you own the system, those rules can be adjusted as your handbook or labour requirements change."
      },
      {
        "question": "Will it remind us before visas, IDs, and contracts expire?",
        "answer": "It will. The system tracks passport, visa, resident-card, and contract dates and sends automated WhatsApp and email reminders ahead of each deadline. An HR dashboard escalates anything approaching expiry so nothing lapses unnoticed."
      },
      {
        "question": "Can our Arabic-speaking staff use it in their own language?",
        "answer": "The entire system is bilingual Arabic and English with full right-to-left support. Each employee and manager can switch to their preferred language, and requests, letters, and notifications follow that choice."
      },
      {
        "question": "Do we own the system, or is there a per-employee licence?",
        "answer": "You fully own the code, the database, and the documentation — there is no per-seat or per-employee licence to renew, so you can add unlimited staff without your costs changing. Start with a free consultation and a demo preview built around your structure; WhatsApp is the fastest way to reach us."
      }
    ],
    "techStack": {
      "title": "The stack we build this on",
      "subtitle": "A secure, maintainable foundation for sensitive HR data and everyday workflows that your team fully owns.",
      "categories": [
        {
          "label": "Application",
          "items": [
            {
              "name": "React",
              "icon": "https://cdn.simpleicons.org/react/61DAFB"
            },
            {
              "name": "Next.js",
              "icon": "https://cdn.simpleicons.org/nextdotjs/000000"
            },
            {
              "name": "TypeScript",
              "icon": "https://cdn.simpleicons.org/typescript/3178C6"
            },
            {
              "name": "Node.js",
              "icon": "https://cdn.simpleicons.org/nodedotjs/5FA04E"
            }
          ]
        },
        {
          "label": "Data & storage",
          "items": [
            {
              "name": "PostgreSQL",
              "icon": "https://cdn.simpleicons.org/postgresql/4169E1"
            },
            {
              "name": "Redis",
              "icon": "https://cdn.simpleicons.org/redis/FF4438"
            },
            {
              "name": "Encrypted document store"
            },
            {
              "name": "Automated backups"
            }
          ]
        },
        {
          "label": "Leave & attendance",
          "items": [
            {
              "name": "Accrual rules engine"
            },
            {
              "name": "Timesheet capture"
            },
            {
              "name": "Holiday calendars"
            },
            {
              "name": "Overtime tracking"
            }
          ]
        },
        {
          "label": "Access & security",
          "items": [
            {
              "name": "Role-based access"
            },
            {
              "name": "Audit logging"
            },
            {
              "name": "Single sign-on"
            },
            {
              "name": "Field encryption"
            }
          ]
        },
        {
          "label": "Notifications & export",
          "items": [
            {
              "name": "WhatsApp",
              "icon": "https://cdn.simpleicons.org/whatsapp/25D366"
            },
            {
              "name": "Email alerts"
            },
            {
              "name": "Payroll export"
            },
            {
              "name": "Excel & PDF reports"
            }
          ]
        },
        {
          "label": "Hosting & ops",
          "items": [
            {
              "name": "Docker",
              "icon": "https://cdn.simpleicons.org/docker/2496ED"
            },
            {
              "name": "Nginx",
              "icon": "https://cdn.simpleicons.org/nginx/009639"
            },
            {
              "name": "Regional hosting"
            },
            {
              "name": "GCC data residency"
            }
          ]
        }
      ]
    }
  },
  "inventory-management-systems": {
    "slug": "inventory-management-systems",
    "service": "Inventory Management Systems",
    "pillarSlug": "business-management-systems",
    "pillarName": "Business Management Systems",
    "seo": {
      "title": "Inventory Management Systems | CloudTopia",
      "description": "Custom inventory management systems that keep stock, costs, and reorder points accurate in real time — built around your operation. Free consultation and demo."
    },
    "hero": {
      "eyebrow": "Internal Apps",
      "title": "Inventory Management Systems",
      "subtitle": "Stop guessing what you have, what it cost, and what to reorder. We build an inventory system around your actual products, units, and suppliers — so every item, value, and movement stays accurate and yours to control.",
      "chips": [
        "Real-time stock",
        "Reorder automation",
        "Stock valuation",
        "Batch & expiry",
        "Supplier purchasing",
        "Multi-location ready",
        "Bilingual AR + EN",
        "Full ownership"
      ]
    },
    "deliver": [
      {
        "name": "Item & product catalogue",
        "description": "A structured catalogue that models your real products, units, categories, and suppliers instead of forcing your stock into someone else's template.",
        "features": [
          "SKUs, variants & barcodes",
          "Multiple units (piece, box, carton)",
          "Categories, brands & attributes",
          "Linked supplier & cost data"
        ]
      },
      {
        "name": "Real-time stock control",
        "description": "Every receipt, sale, return, and adjustment updates stock instantly, so the number on screen is the number on the shelf.",
        "features": [
          "Live on-hand & available stock",
          "Goods-in & goods-out entries",
          "Stock adjustments with reasons",
          "Full movement history per item"
        ]
      },
      {
        "name": "Reorder & demand planning",
        "description": "Min/max levels and consumption trends tell you what to reorder and how much, before a fast mover runs out.",
        "features": [
          "Reorder points per item",
          "Suggested purchase quantities",
          "Low-stock & out-of-stock alerts",
          "WhatsApp & email notifications"
        ]
      },
      {
        "name": "Purchasing & supplier orders",
        "description": "Raise purchase orders to suppliers, receive against them, and keep landed costs tied to each batch you bring in.",
        "features": [
          "Purchase orders to suppliers",
          "Partial & full goods receipt",
          "Landed cost per batch",
          "Supplier price & lead-time history"
        ]
      },
      {
        "name": "Valuation & costing",
        "description": "Know what your inventory is actually worth and what each item costs you, with consistent costing you can trust in reports.",
        "features": [
          "FIFO or weighted-average costing",
          "Live stock valuation report",
          "Cost of goods sold tracking",
          "Slow-mover & ageing analysis"
        ]
      },
      {
        "name": "Dashboards, roles & reports",
        "description": "Live inventory dashboards and exportable reports, with each role seeing only the items and locations it should.",
        "features": [
          "Stock, sales & valuation dashboards",
          "Role-based access per location",
          "Export to Excel & PDF",
          "Audit trail of every change"
        ]
      }
    ],
    "outcomes": [
      {
        "label": "Accurate stock, always",
        "description": "Live updates on every movement mean the system matches reality, so your team stops second-guessing the count."
      },
      {
        "label": "Less tied-up cash",
        "description": "Reorder rules and slow-mover reports cut dead stock and overstocking, freeing cash that was sitting on shelves."
      },
      {
        "label": "Fewer lost sales",
        "description": "Early low-stock alerts and demand trends keep your best-selling items in stock instead of out of stock."
      },
      {
        "label": "You own it",
        "description": "The system, code, data, and documentation are fully yours to run, extend, and export — no per-user fees, no lock-in."
      }
    ],
    "industries": [
      "Retail & supermarkets",
      "Wholesale & distribution",
      "Trading & import/export",
      "Pharmacy & medical supplies",
      "Restaurants & food service",
      "Building materials & hardware"
    ],
    "faqs": [
      {
        "question": "How is this different from the spreadsheets we use now?",
        "answer": "A spreadsheet does not update itself, control who edits what, or warn you when stock runs low — and it breaks the moment two people open it at once. The system enforces accurate counts on every movement, keeps a full history, and gives each item a single trustworthy balance. You get the structure of real software without losing the flexibility you liked in the sheet."
      },
      {
        "question": "Can it handle multiple branches or warehouses?",
        "answer": "Yes. Stock can be tracked per branch, store, or warehouse with consolidated totals across the whole business, and transfers between locations are recorded so nothing goes missing in between. We size this to where you are now and leave room to add locations later without a rebuild."
      },
      {
        "question": "Does it support batch numbers and expiry dates?",
        "answer": "It does. Items can carry batch and lot numbers with expiry dates, which is essential for pharmacy, food, and cosmetics, and the system can alert you before stock expires. Costing stays tied to each batch so your valuation reflects what you actually paid."
      },
      {
        "question": "Can it connect to our accounting, POS, or online store?",
        "answer": "Yes. We integrate the inventory system with your accounting software, point-of-sale, or e-commerce platform through their APIs so stock and sales stay in sync instead of being entered twice. If you do not have those systems yet, the inventory system runs on its own and can connect later."
      },
      {
        "question": "Do we really own the system, and is it in Arabic too?",
        "answer": "You own the code, the database, and the documentation outright — there is no vendor lock-in and nothing trapped in a proprietary format. The interface is fully bilingual Arabic and English with right-to-left support, and we give you a free consultation and demo preview before any commitment."
      }
    ],
    "techStack": {
      "title": "The stack we build this on",
      "subtitle": "Dependable, ownable technology for an inventory system that stays accurate under real daily volume — and stays yours.",
      "categories": [
        {
          "label": "Application",
          "items": [
            {
              "name": "Next.js",
              "icon": "https://cdn.simpleicons.org/nextdotjs/000000"
            },
            {
              "name": "React",
              "icon": "https://cdn.simpleicons.org/react/61DAFB"
            },
            {
              "name": "TypeScript",
              "icon": "https://cdn.simpleicons.org/typescript/3178C6"
            },
            {
              "name": "Tailwind CSS",
              "icon": "https://cdn.simpleicons.org/tailwindcss/06B6D4"
            }
          ]
        },
        {
          "label": "Inventory Backend",
          "items": [
            {
              "name": "Node.js",
              "icon": "https://cdn.simpleicons.org/nodedotjs/5FA04E"
            },
            {
              "name": "NestJS",
              "icon": "https://cdn.simpleicons.org/nestjs/E0234E"
            },
            {
              "name": "REST API"
            },
            {
              "name": "Stock & Costing Engine"
            }
          ]
        },
        {
          "label": "Data & Storage",
          "items": [
            {
              "name": "PostgreSQL",
              "icon": "https://cdn.simpleicons.org/postgresql/4169E1"
            },
            {
              "name": "Redis",
              "icon": "https://cdn.simpleicons.org/redis/FF4438"
            },
            {
              "name": "Batch & Serial Records"
            },
            {
              "name": "Movement Ledger"
            }
          ]
        },
        {
          "label": "Integrations & Alerts",
          "items": [
            {
              "name": "WhatsApp",
              "icon": "https://cdn.simpleicons.org/whatsapp/25D366"
            },
            {
              "name": "Accounting / POS API"
            },
            {
              "name": "E-commerce Sync"
            },
            {
              "name": "Webhooks"
            }
          ]
        },
        {
          "label": "Reporting",
          "items": [
            {
              "name": "Metabase",
              "icon": "https://cdn.simpleicons.org/metabase/509EE3"
            },
            {
              "name": "Grafana",
              "icon": "https://cdn.simpleicons.org/grafana/F46800"
            },
            {
              "name": "Excel & PDF Export"
            },
            {
              "name": "Stock Valuation Reports"
            }
          ]
        },
        {
          "label": "Access & Hosting",
          "items": [
            {
              "name": "Role-Based Access"
            },
            {
              "name": "Docker",
              "icon": "https://cdn.simpleicons.org/docker/2496ED"
            },
            {
              "name": "Nginx",
              "icon": "https://cdn.simpleicons.org/nginx/009639"
            },
            {
              "name": "Audit Logs"
            }
          ]
        }
      ]
    }
  },
  "lead-management-distribution": {
    "slug": "lead-management-distribution",
    "service": "Lead Management & Distribution",
    "pillarSlug": "custom-erp-crm-solutions",
    "pillarName": "Custom ERP & CRM Solutions",
    "seo": {
      "title": "Lead Management & Distribution Engine | CloudTopia",
      "description": "Centralize lead management and distribution: catch every enquiry in one inbox, auto-route to the right rep in seconds. Free consultation and demo preview."
    },
    "hero": {
      "eyebrow": "Custom ERP & CRM",
      "title": "Centralized Lead Management & Distribution Engines",
      "subtitle": "Every enquiry from WhatsApp, your website, ads, and phone lands in one inbox and is routed to the right rep in seconds. No lead sits unclaimed, no source goes untracked, and you fully own the whole engine — code, data, and rules.",
      "chips": [
        "One unified inbox",
        "Rule-based routing",
        "Round-robin & weighted",
        "SLA & response timers",
        "Full source tracking",
        "Duplicate detection",
        "Bilingual (AR + EN)",
        "Full ownership"
      ]
    },
    "deliver": [
      {
        "name": "Unified lead capture",
        "description": "Every channel your enquiries come from, pouring into one structured inbox instead of scattered chats and inboxes.",
        "features": [
          "WhatsApp, web forms & landing pages",
          "Ad platforms & call logs",
          "Email-to-lead parsing",
          "Walk-in & manual entry"
        ]
      },
      {
        "name": "Distribution rule engine",
        "description": "A routing brain you configure once that assigns each lead to the right owner the moment it arrives.",
        "features": [
          "Round-robin & weighted load",
          "By territory, branch or language",
          "By product, value or source",
          "Skill & availability matching"
        ]
      },
      {
        "name": "SLA & response enforcement",
        "description": "Countdown timers and escalations that make sure no lead waits longer than your promised response window.",
        "features": [
          "First-response SLA timers",
          "Auto-reassign on no-claim",
          "Manager escalation alerts",
          "Stale-lead recovery queue"
        ]
      },
      {
        "name": "Source & attribution tracking",
        "description": "Every lead stamped with where it came from so you can see which campaigns and channels actually pay off.",
        "features": [
          "UTM & campaign capture",
          "Per-source conversion rates",
          "Cost-per-lead inputs",
          "Channel ROI dashboards"
        ]
      },
      {
        "name": "Dedup & data hygiene",
        "description": "Automatic matching that catches repeat enquiries before they become duplicate work and double-calls.",
        "features": [
          "Phone & email matching",
          "Merge with full history",
          "Repeat-lead flagging",
          "Clean, validated records"
        ]
      },
      {
        "name": "Rep workspace & alerts",
        "description": "A focused queue and instant notifications so reps act on the freshest lead without digging through threads.",
        "features": [
          "Prioritized lead queue",
          "WhatsApp & push alerts",
          "One-tap claim & log",
          "Mobile-friendly, RTL-ready"
        ]
      }
    ],
    "outcomes": [
      {
        "label": "Faster first response",
        "description": "Leads reach a rep in seconds instead of sitting in a shared inbox for hours."
      },
      {
        "label": "Zero leaked leads",
        "description": "Every enquiry is captured, owned, and chased — nothing slips through the cracks."
      },
      {
        "label": "Fair, transparent workload",
        "description": "Routing rules split leads evenly so no rep is starved and none is overloaded."
      },
      {
        "label": "Spend you can trust",
        "description": "Source tracking shows which channels convert, so you fund what works and cut what doesn't."
      }
    ],
    "industries": [
      "Real estate & property",
      "Automotive dealerships",
      "Healthcare & clinics",
      "Education & training",
      "Insurance & financial services",
      "Travel & tourism"
    ],
    "faqs": [
      {
        "question": "Can you pull leads in from WhatsApp and our ad campaigns?",
        "answer": "Yes. WhatsApp is usually the first channel we connect, alongside web forms, Meta and Google lead ads, and call logs. Every enquiry lands in the same inbox already tagged with its source, so your team works from one list instead of switching between apps."
      },
      {
        "question": "How does the system decide which rep gets a lead?",
        "answer": "You set the rules — round-robin, weighted by capacity, or based on territory, branch, language, product, or lead value. The engine applies them the instant a lead arrives, and if the assigned rep doesn't claim it within your SLA window, it reassigns automatically."
      },
      {
        "question": "What stops the same lead being worked twice?",
        "answer": "Incoming leads are matched on phone and email against your existing records. Repeat enquiries are flagged and merged into the original contact with full history, so a customer who messages twice isn't called by two different reps."
      },
      {
        "question": "Does this replace our CRM or work with it?",
        "answer": "Either way. We can build it as a standalone capture-and-routing layer that feeds your current CRM, or as part of a custom CRM we build for you. The engine is yours to extend, and your leads and rules are never locked into someone else's platform."
      },
      {
        "question": "Will it work in Arabic and English?",
        "answer": "Yes. The interface, alerts, and auto-replies are delivered bilingually in Arabic and English with full RTL support, and you can route leads to reps by the customer's preferred language. Before any commitment you get a free consultation and a demo preview."
      }
    ],
    "techStack": {
      "title": "The stack we build this on",
      "subtitle": "A capture, routing, and notification engine assembled from proven tools you keep full control of.",
      "categories": [
        {
          "label": "Core & data",
          "items": [
            {
              "name": "Node.js",
              "icon": "https://cdn.simpleicons.org/nodedotjs/5FA04E"
            },
            {
              "name": "PostgreSQL",
              "icon": "https://cdn.simpleicons.org/postgresql/4169E1"
            },
            {
              "name": "Redis",
              "icon": "https://cdn.simpleicons.org/redis/FF4438"
            },
            {
              "name": "Python",
              "icon": "https://cdn.simpleicons.org/python/3776AB"
            }
          ]
        },
        {
          "label": "Lead capture",
          "items": [
            {
              "name": "WhatsApp Business",
              "icon": "https://cdn.simpleicons.org/whatsapp/25D366"
            },
            {
              "name": "Meta Lead Ads",
              "icon": "https://cdn.simpleicons.org/meta/0467DF"
            },
            {
              "name": "Web form intake"
            },
            {
              "name": "Google Sheets",
              "icon": "https://cdn.simpleicons.org/googlesheets/34A853"
            }
          ]
        },
        {
          "label": "Routing & automation",
          "items": [
            {
              "name": "n8n",
              "icon": "https://cdn.simpleicons.org/n8n/EA4B71"
            },
            {
              "name": "Routing rule engine"
            },
            {
              "name": "SLA timer service"
            },
            {
              "name": "Zapier",
              "icon": "https://cdn.simpleicons.org/zapier/FF4F00"
            }
          ]
        },
        {
          "label": "Alerts & messaging",
          "items": [
            {
              "name": "Twilio",
              "icon": "https://cdn.simpleicons.org/twilio/F22F46"
            },
            {
              "name": "WhatsApp alerts",
              "icon": "https://cdn.simpleicons.org/whatsapp/25D366"
            },
            {
              "name": "Email notifications"
            },
            {
              "name": "Push notifications"
            }
          ]
        },
        {
          "label": "Dashboards & access",
          "items": [
            {
              "name": "React",
              "icon": "https://cdn.simpleicons.org/react/61DAFB"
            },
            {
              "name": "Attribution dashboards"
            },
            {
              "name": "Role-based access"
            },
            {
              "name": "Audit logs"
            }
          ]
        },
        {
          "label": "Hosting & ops",
          "items": [
            {
              "name": "Docker",
              "icon": "https://cdn.simpleicons.org/docker/2496ED"
            },
            {
              "name": "Nginx",
              "icon": "https://cdn.simpleicons.org/nginx/009639"
            },
            {
              "name": "AWS",
              "icon": "https://cdn.simpleicons.org/amazonwebservices/FF9900"
            },
            {
              "name": "Scheduled backups"
            }
          ]
        }
      ]
    }
  },
  "legacy-system-migration": {
    "slug": "legacy-system-migration",
    "service": "Legacy System Migration",
    "pillarSlug": "custom-erp-crm-solutions",
    "pillarName": "Custom ERP & CRM Solutions",
    "seo": {
      "title": "Legacy Spreadsheet & System Migration | CloudTopia",
      "description": "Move scattered Excel files and outdated software into one clean, owned system — history intact, deduplicated, validated. Free consultation and demo preview."
    },
    "hero": {
      "eyebrow": "Custom ERP & CRM",
      "title": "Legacy Spreadsheet & Outdated System Migration",
      "subtitle": "Move years of scattered spreadsheets, ageing desktop software, and disconnected tools into one clean system that fits how you work today. Your history comes with you — cleansed, deduplicated, and verified — and the result is fully yours to own.",
      "chips": [
        "Excel & Access exit",
        "Zero data loss",
        "Cleansed & deduplicated",
        "Field-by-field mapping",
        "Parallel-run cutover",
        "Bilingual (AR + EN)",
        "Full ownership",
        "Free demo preview"
      ]
    },
    "deliver": [
      {
        "name": "Source audit & data mapping",
        "description": "We catalogue every spreadsheet, database, and old tool you rely on, then map each field to its new home.",
        "features": [
          "Inventory of files, tabs & systems",
          "Field-by-field mapping document",
          "Hidden formula & macro review",
          "Rules for duplicates & conflicts"
        ]
      },
      {
        "name": "Data cleansing & deduplication",
        "description": "We fix the mess that built up over years before any of it moves across.",
        "features": [
          "Merge duplicate customers & records",
          "Standardize formats, dates & codes",
          "Repair broken references & gaps",
          "Flag bad rows for your sign-off"
        ]
      },
      {
        "name": "Extraction & transformation (ETL)",
        "description": "We pull data out of locked-in formats and reshape it to fit the new structure.",
        "features": [
          "Export from Excel, Access & CSV",
          "Read legacy database tables",
          "Transform to the target schema",
          "Preserve open balances & history"
        ]
      },
      {
        "name": "Target system build",
        "description": "We stand up the clean system your data lands in — structured around your real workflow.",
        "features": [
          "Custom schema or ERP/CRM setup",
          "Relationships & validation rules",
          "Role-based access on the new data",
          "Bilingual AR + EN, RTL-ready"
        ]
      },
      {
        "name": "Validated import & reconciliation",
        "description": "Every batch is imported, counted, and checked against the source before you trust it.",
        "features": [
          "Staged trial imports first",
          "Row counts & totals reconciled",
          "Spot-check & exception reports",
          "Rollback safety on every load"
        ]
      },
      {
        "name": "Cutover, training & handoff",
        "description": "We move you off the old files for good — with your team ready and everything documented.",
        "features": [
          "Parallel run before final switch",
          "Clean cutover with a fallback plan",
          "Hands-on team training",
          "Mapping docs, data & access handed over"
        ]
      }
    ],
    "outcomes": [
      {
        "label": "One trusted record",
        "description": "No more conflicting versions across files — a single source everyone reads and updates."
      },
      {
        "label": "Nothing left behind",
        "description": "Years of customers, stock, and transactions arrive intact, cleansed, and reconciled."
      },
      {
        "label": "Off fragile spreadsheets",
        "description": "End the broken formulas, lost files, and one-person bottlenecks that come with manual workbooks."
      },
      {
        "label": "A foundation you own",
        "description": "Clean, structured data in a system your team controls and can build on — no lock-in."
      }
    ],
    "industries": [
      "Trading & distribution",
      "Retail & wholesale",
      "Construction & contracting",
      "Logistics & freight",
      "Healthcare & clinics",
      "Professional services & agencies"
    ],
    "faqs": [
      {
        "question": "Will we lose any data during the migration?",
        "answer": "No. We run staged trial imports, reconcile row counts and totals against your source files, and keep the originals untouched until you sign off. Any rows that fail validation are flagged for your review rather than silently dropped."
      },
      {
        "question": "Our spreadsheets are messy and full of duplicates — is that a problem?",
        "answer": "That is exactly what this service is for. Before anything moves, we merge duplicate records, standardize formats and dates, and repair broken references, so you land in the new system with clean data instead of carrying the mess forward."
      },
      {
        "question": "Can you migrate from old desktop software or an Access database, not just Excel?",
        "answer": "Yes. We extract from Excel, CSV, Microsoft Access, and most legacy databases or older line-of-business tools. If we can read the data, we can map, transform, and bring it into your new system."
      },
      {
        "question": "Do we have to stop working while you migrate?",
        "answer": "No. We run the new system in parallel with your old files first, so your team keeps operating during the move. Once the data reconciles and everyone is comfortable, we do a clean cutover with a fallback plan in place."
      },
      {
        "question": "What do we end up owning after the migration?",
        "answer": "Everything. You receive the cleansed data, the new system, the field-by-field mapping documentation, and full access. There is no lock-in — your team can run and extend it independently."
      }
    ],
    "techStack": {
      "title": "The stack we migrate on",
      "subtitle": "Proven tools for pulling data out of legacy formats, cleaning it, and loading it into a system you own.",
      "categories": [
        {
          "label": "Source formats",
          "items": [
            {
              "name": "Microsoft Excel"
            },
            {
              "name": "Google Sheets",
              "icon": "https://cdn.simpleicons.org/googlesheets/34A853"
            },
            {
              "name": "Microsoft Access"
            },
            {
              "name": "CSV / Flat files"
            }
          ]
        },
        {
          "label": "Extraction & ETL",
          "items": [
            {
              "name": "Python",
              "icon": "https://cdn.simpleicons.org/python/3776AB"
            },
            {
              "name": "pandas",
              "icon": "https://cdn.simpleicons.org/pandas/150458"
            },
            {
              "name": "ETL pipelines"
            },
            {
              "name": "OCR / Data capture"
            }
          ]
        },
        {
          "label": "Target databases",
          "items": [
            {
              "name": "PostgreSQL",
              "icon": "https://cdn.simpleicons.org/postgresql/4169E1"
            },
            {
              "name": "MySQL",
              "icon": "https://cdn.simpleicons.org/mysql/4479A1"
            },
            {
              "name": "Odoo",
              "icon": "https://cdn.simpleicons.org/odoo/714B67"
            },
            {
              "name": "Schema design"
            }
          ]
        },
        {
          "label": "Quality & validation",
          "items": [
            {
              "name": "Deduplication"
            },
            {
              "name": "Reconciliation reports"
            },
            {
              "name": "Data validation"
            },
            {
              "name": "Rollback safety"
            }
          ]
        },
        {
          "label": "Cloud & delivery",
          "items": [
            {
              "name": "Docker",
              "icon": "https://cdn.simpleicons.org/docker/2496ED"
            },
            {
              "name": "AWS"
            },
            {
              "name": "Automated backups"
            },
            {
              "name": "WhatsApp",
              "icon": "https://cdn.simpleicons.org/whatsapp/25D366"
            }
          ]
        }
      ]
    }
  },
  "multi-branch-operations-management": {
    "slug": "multi-branch-operations-management",
    "service": "Multi-Branch Operations System",
    "pillarSlug": "custom-erp-crm-solutions",
    "pillarName": "Custom ERP & CRM Solutions",
    "seo": {
      "title": "Multi-Branch & Franchise Operations | CloudTopia",
      "description": "Run every branch and franchisee on one multi-branch system in Muscat and the GCC. Live consolidated reporting, per-location control. Book a free consultation."
    },
    "hero": {
      "eyebrow": "Custom ERP & CRM",
      "title": "Multi-Branch & Franchise Operations Management",
      "subtitle": "Run every branch, outlet, and franchisee on one connected system, with live consolidated numbers for head office and clean per-location control for each manager. You own the code, the data, and the documentation outright.",
      "chips": [
        "One system, every branch",
        "Live consolidated reporting",
        "Per-location permissions",
        "Inter-branch transfers",
        "Arabic + English / RTL",
        "Franchisee onboarding",
        "You own everything",
        "Free consultation + demo"
      ]
    },
    "deliver": [
      {
        "name": "Branch & Franchise Hierarchy",
        "description": "We model your real structure, head office, regions, branches, and independent franchisees, so data rolls up correctly and each level sees only what it should.",
        "features": [
          "Region and branch grouping",
          "Franchisee vs owned outlets",
          "Per-branch profiles and settings",
          "Clean head-office rollup"
        ]
      },
      {
        "name": "Consolidated Head-Office Dashboard",
        "description": "One live view that combines sales, stock, and performance from every location, with the ability to drill from the group total down to a single branch.",
        "features": [
          "Group vs per-branch comparison",
          "Live sales and revenue rollup",
          "Branch league tables",
          "Drill-down to transactions"
        ]
      },
      {
        "name": "Per-Location Access & Roles",
        "description": "Branch managers and franchise staff log into the same system but are scoped to their own outlet, while head office keeps the full cross-branch view.",
        "features": [
          "Branch-scoped logins",
          "Role-based permissions",
          "Franchisee-limited visibility",
          "Head-office override view"
        ]
      },
      {
        "name": "Inter-Branch Stock & Transfers",
        "description": "Track inventory by location and move it between branches with proper requests, approvals, and a record both sides can trust.",
        "features": [
          "Stock balance per branch",
          "Transfer requests and approvals",
          "In-transit tracking",
          "Low-stock alerts by location"
        ]
      },
      {
        "name": "Franchisee Onboarding Workflow",
        "description": "A repeatable setup flow that spins up a new branch or franchisee with your standard catalog, pricing rules, and templates already in place.",
        "features": [
          "New-branch setup checklist",
          "Standard catalog and pricing",
          "Document and contract vault",
          "Royalty / fee tracking fields"
        ]
      },
      {
        "name": "Cross-Branch Reporting & Royalties",
        "description": "Automated reports that compare locations side by side and calculate franchise fees or royalties from the same numbers everyone is already using.",
        "features": [
          "Branch-vs-branch KPIs",
          "Royalty and fee calculation",
          "Scheduled report delivery",
          "Export to PDF and Excel"
        ]
      }
    ],
    "outcomes": [
      {
        "label": "One source of truth",
        "description": "Head office stops chasing branch spreadsheets and reads one set of numbers that every location feeds in real time."
      },
      {
        "label": "Faster branch openings",
        "description": "A repeatable onboarding flow gets a new outlet or franchisee operational on day one instead of reinventing the setup each time."
      },
      {
        "label": "Tighter stock control",
        "description": "Knowing exact stock per location and moving it cleanly between branches cuts dead inventory and lost sales from stockouts."
      },
      {
        "label": "Accountable franchisees",
        "description": "Per-branch dashboards and automatic royalty figures make every location measurable on the same yardstick."
      }
    ],
    "industries": [
      "Retail chains & multi-store groups",
      "Restaurant & café franchises",
      "Clinics & medical center groups",
      "Salons, spas & fitness chains",
      "Automotive service & spare-parts branches",
      "Logistics & distribution networks"
    ],
    "faqs": [
      {
        "question": "Can head office and individual branches see different things in the same system?",
        "answer": "Yes. We scope each login to a branch or franchisee so managers only see their own outlet, while head office keeps the full cross-branch view. Permissions are role-based, so you decide exactly who can see sales, stock, costs, or reports at each location."
      },
      {
        "question": "Will it work for both branches we own and independent franchisees?",
        "answer": "It will. We model owned outlets and franchisees as different node types in the same hierarchy, so consolidated reporting still works while franchisees get limited, fee-tracked access. Royalty or franchise-fee fields are calculated from the same live numbers, not re-keyed by hand."
      },
      {
        "question": "Can we move stock between branches and see who has what?",
        "answer": "Yes. Inventory is tracked per location, and branches can raise transfer requests that go through approval and in-transit tracking before they land. Both branches keep a record, and low-stock alerts fire per location so nothing quietly runs dry."
      },
      {
        "question": "Is the system available in Arabic as well as English?",
        "answer": "Every interface we build is bilingual Arabic and English with full right-to-left support, so branch staff and head office can each work in their preferred language. Reports and documents can be generated in either language too."
      },
      {
        "question": "Do we own the system, or are we locked into CloudTopia?",
        "answer": "You fully own the code, the data, and the documentation, with no vendor lock-in. We start with a free consultation and a demo preview before any commitment, and the fastest way to reach us is on WhatsApp."
      }
    ],
    "techStack": {
      "title": "The stack we build this on",
      "subtitle": "Proven, well-documented tools chosen so consolidated reporting stays fast and every branch stays in sync, code and data you fully own.",
      "categories": [
        {
          "label": "Core platform",
          "items": [
            {
              "name": "Python",
              "icon": "https://cdn.simpleicons.org/python/3776AB"
            },
            {
              "name": "Node.js",
              "icon": "https://cdn.simpleicons.org/nodedotjs/5FA04E"
            },
            {
              "name": "Odoo",
              "icon": "https://cdn.simpleicons.org/odoo/714B67"
            },
            {
              "name": "Django",
              "icon": "https://cdn.simpleicons.org/django/092E20"
            }
          ]
        },
        {
          "label": "Data & reporting",
          "items": [
            {
              "name": "PostgreSQL",
              "icon": "https://cdn.simpleicons.org/postgresql/4169E1"
            },
            {
              "name": "MySQL",
              "icon": "https://cdn.simpleicons.org/mysql/4479A1"
            },
            {
              "name": "Redis",
              "icon": "https://cdn.simpleicons.org/redis/FF4438"
            },
            {
              "name": "Metabase",
              "icon": "https://cdn.simpleicons.org/metabase/509EE3"
            }
          ]
        },
        {
          "label": "Branch interfaces",
          "items": [
            {
              "name": "React",
              "icon": "https://cdn.simpleicons.org/react/61DAFB"
            },
            {
              "name": "Next.js",
              "icon": "https://cdn.simpleicons.org/nextdotjs/000000"
            },
            {
              "name": "Bilingual RTL UI"
            },
            {
              "name": "Role-based access"
            }
          ]
        },
        {
          "label": "Sync & integrations",
          "items": [
            {
              "name": "REST APIs"
            },
            {
              "name": "n8n",
              "icon": "https://cdn.simpleicons.org/n8n/EA4B71"
            },
            {
              "name": "WhatsApp",
              "icon": "https://cdn.simpleicons.org/whatsapp/25D366"
            },
            {
              "name": "Google Sheets",
              "icon": "https://cdn.simpleicons.org/googlesheets/34A853"
            }
          ]
        },
        {
          "label": "Hosting & operations",
          "items": [
            {
              "name": "Docker",
              "icon": "https://cdn.simpleicons.org/docker/2496ED"
            },
            {
              "name": "Nginx",
              "icon": "https://cdn.simpleicons.org/nginx/009639"
            },
            {
              "name": "AWS",
              "icon": "https://cdn.simpleicons.org/amazonwebservices/FF9900"
            },
            {
              "name": "Automated backups"
            }
          ]
        }
      ]
    }
  },
  "order-management-systems": {
    "slug": "order-management-systems",
    "service": "Order Management System",
    "pillarSlug": "business-management-systems",
    "pillarName": "Business Management Systems",
    "seo": {
      "title": "Custom Order Management Systems | CloudTopia",
      "description": "A custom order management system that captures every order, reserves stock, and tracks it from quote to delivery — fully owned. Free consultation and demo."
    },
    "hero": {
      "eyebrow": "Custom ERP & CRM",
      "title": "Order Management Systems",
      "subtitle": "Run every order from one place — captured from any channel, checked against stock, invoiced, and tracked from confirmed to delivered. We build the order workflow around how your business actually sells, and you own all of it.",
      "chips": [
        "One order inbox",
        "Stock-checked at entry",
        "Quote to delivery",
        "Partial & backorders",
        "Auto invoicing",
        "WhatsApp order updates",
        "Bilingual (AR + EN)",
        "Full ownership"
      ]
    },
    "deliver": [
      {
        "name": "Order capture & entry",
        "description": "Every order lands in one place, whether it comes from a rep, a portal, the phone, or your store.",
        "features": [
          "Sales rep & counter order entry",
          "Web, WhatsApp & email orders",
          "Customer, pricing & terms auto-filled",
          "Duplicate and error checks on entry"
        ]
      },
      {
        "name": "Stock allocation & availability",
        "description": "Each order is checked against live stock and reserved the moment it is confirmed, so you never promise what you cannot ship.",
        "features": [
          "Real-time availability at entry",
          "Reserve stock on confirmation",
          "Allocate across warehouses & branches",
          "Backorder & partial-fulfilment handling"
        ]
      },
      {
        "name": "Order workflow & statuses",
        "description": "A clear lifecycle that moves each order through the exact steps your operation runs, with nothing falling between stages.",
        "features": [
          "Quote, confirmed, picked, shipped, delivered",
          "Credit limit & approval holds",
          "Edit, split & cancel with audit trail",
          "Per-stage owner and timestamps"
        ]
      },
      {
        "name": "Fulfilment & dispatch",
        "description": "Turn confirmed orders into picking lists, packing slips, and deliveries without re-keying a thing.",
        "features": [
          "Auto picking & packing documents",
          "Courier & driver assignment",
          "Delivery notes & proof of delivery",
          "Tracking pushed back to the order"
        ]
      },
      {
        "name": "Invoicing & payments",
        "description": "Invoices and receipts generate straight from the order, matched to what was actually shipped.",
        "features": [
          "Auto-invoice on dispatch",
          "Partial & consolidated invoicing",
          "Payment status & balance tracking",
          "Credit notes for returns"
        ]
      },
      {
        "name": "Tracking, alerts & reporting",
        "description": "Live visibility for your team and your customers, with the reports managers need to spot problems early.",
        "features": [
          "WhatsApp & email status alerts",
          "Self-service order tracking page",
          "Open, late & on-hold dashboards",
          "Fulfilment-time & sales reports"
        ]
      }
    ],
    "outcomes": [
      {
        "label": "No lost orders",
        "description": "Every order from every channel lands in one inbox and moves through a tracked lifecycle, so nothing is forgotten in a chat or notebook."
      },
      {
        "label": "Accurate promises",
        "description": "Stock is checked and reserved at order entry, so what you confirm to a customer is what you can actually deliver."
      },
      {
        "label": "Faster fulfilment",
        "description": "Picking, dispatch, and invoicing trigger straight from the order, cutting the time between confirmed and delivered."
      },
      {
        "label": "You own it",
        "description": "The system, code, data, and documentation are entirely yours to run and extend, with no per-order fees and no lock-in."
      }
    ],
    "industries": [
      "Trading & distribution",
      "Wholesale & B2B supply",
      "Retail & multi-store chains",
      "Food & beverage distribution",
      "Manufacturing & assembly",
      "Building materials & hardware"
    ],
    "faqs": [
      {
        "question": "How is this different from the order screen in our accounting software?",
        "answer": "Accounting tools record an order for invoicing; an order management system runs the whole lifecycle around it — availability checks, reservations, fulfilment steps, holds, and status tracking. We build that flow around how your team actually takes and ships orders, then connect it to your accounting so the financial side stays in sync without double entry."
      },
      {
        "question": "Can orders come in from WhatsApp, a sales rep, and our website all into one place?",
        "answer": "Yes. We funnel orders from your reps, counter staff, customer portal, WhatsApp, and website into a single order inbox, each tagged with its source. Your team works one consistent list instead of stitching orders together from different channels by hand."
      },
      {
        "question": "Can it handle partial deliveries, backorders, and order changes?",
        "answer": "It can. An order can ship in parts, hold a backorder for out-of-stock lines, and be edited, split, or cancelled with every change recorded in an audit trail. Invoices and stock reservations adjust to match what was actually fulfilled, not just what was ordered."
      },
      {
        "question": "Does it connect to our inventory and accounting systems?",
        "answer": "Yes. We integrate the order system with your inventory, ERP, accounting, or e-commerce platform through their APIs so stock, invoices, and customers stay consistent across all of them. If you do not have those systems yet, the order system can run on its own and connect later."
      },
      {
        "question": "Do we own the system after launch?",
        "answer": "Completely. You receive the source code, the database, and full documentation, along with team training and an access handoff — no vendor lock-in and no per-order charges. We start with a free consultation and a demo preview before any commitment, and you can reach us on WhatsApp throughout."
      }
    ],
    "techStack": {
      "title": "The stack we build this on",
      "subtitle": "A dependable, ownable order engine wired to your channels, stock, and accounting so every order moves cleanly from entry to delivery.",
      "categories": [
        {
          "label": "Order engine & backend",
          "items": [
            {
              "name": "Node.js",
              "icon": "https://cdn.simpleicons.org/nodedotjs/5FA04E"
            },
            {
              "name": "NestJS",
              "icon": "https://cdn.simpleicons.org/nestjs/E0234E"
            },
            {
              "name": "Python",
              "icon": "https://cdn.simpleicons.org/python/3776AB"
            },
            {
              "name": "Order state machine"
            }
          ]
        },
        {
          "label": "Data & records",
          "items": [
            {
              "name": "PostgreSQL",
              "icon": "https://cdn.simpleicons.org/postgresql/4169E1"
            },
            {
              "name": "MySQL",
              "icon": "https://cdn.simpleicons.org/mysql/4479A1"
            },
            {
              "name": "Redis",
              "icon": "https://cdn.simpleicons.org/redis/FF4438"
            },
            {
              "name": "Audit log store"
            }
          ]
        },
        {
          "label": "Channels & order intake",
          "items": [
            {
              "name": "WhatsApp Business API",
              "icon": "https://cdn.simpleicons.org/whatsapp/25D366"
            },
            {
              "name": "Shopify",
              "icon": "https://cdn.simpleicons.org/shopify/7AB55C"
            },
            {
              "name": "WooCommerce",
              "icon": "https://cdn.simpleicons.org/woocommerce/96588A"
            },
            {
              "name": "Order portal & forms"
            }
          ]
        },
        {
          "label": "Stock & accounting sync",
          "items": [
            {
              "name": "Odoo",
              "icon": "https://cdn.simpleicons.org/odoo/714B67"
            },
            {
              "name": "REST API"
            },
            {
              "name": "Inventory sync"
            },
            {
              "name": "Webhooks"
            }
          ]
        },
        {
          "label": "Customer interface",
          "items": [
            {
              "name": "React",
              "icon": "https://cdn.simpleicons.org/react/61DAFB"
            },
            {
              "name": "Next.js",
              "icon": "https://cdn.simpleicons.org/nextdotjs/000000"
            },
            {
              "name": "Order tracking page"
            },
            {
              "name": "PDF invoices & notes"
            }
          ]
        },
        {
          "label": "Access & hosting",
          "items": [
            {
              "name": "Role-based access"
            },
            {
              "name": "Docker",
              "icon": "https://cdn.simpleicons.org/docker/2496ED"
            },
            {
              "name": "Nginx",
              "icon": "https://cdn.simpleicons.org/nginx/009639"
            },
            {
              "name": "Automated backups"
            }
          ]
        }
      ]
    }
  },
  "purchase-order-approval-workflows": {
    "slug": "purchase-order-approval-workflows",
    "service": "PO Approval Workflows",
    "pillarSlug": "business-process-automation",
    "pillarName": "Business Process Automation (BPA)",
    "seo": {
      "title": "Purchase Order & Approval Workflows | CloudTopia",
      "description": "Automate purchase orders and manager approvals with multi-level routing, budget checks, WhatsApp sign-off, and audit trails. Free consultation and demo."
    },
    "hero": {
      "eyebrow": "Process Automation",
      "title": "Purchase Order & Manager Approval Workflows",
      "subtitle": "Replace email chains and paper sign-offs with a structured PO system that routes every request to the right approver, enforces your spending limits, and keeps a clean audit trail. Faster approvals, controlled spend, and a workflow your team fully owns.",
      "chips": [
        "Multi-level approvals",
        "Amount-based routing",
        "WhatsApp sign-off",
        "Live budget checks",
        "Delegation & escalation",
        "Full audit trail",
        "Bilingual (AR + EN)",
        "Full ownership"
      ]
    },
    "deliver": [
      {
        "name": "Requisition & PO capture",
        "description": "A clean intake form that turns purchase requests into structured POs with everything an approver needs to decide.",
        "features": [
          "Line items, quantities, and cost centres",
          "Supplier and budget code lookup",
          "Attach quotes, specs, and invoices",
          "Bilingual AR + EN, RTL-ready forms"
        ]
      },
      {
        "name": "Multi-level approval chains",
        "description": "Approval routes that mirror your real authority structure, branch by branch and department by department.",
        "features": [
          "Sequential and parallel approvers",
          "Amount-based thresholds and tiers",
          "Per-department and per-branch routing",
          "Mandatory vs. optional sign-offs"
        ]
      },
      {
        "name": "Delegation & escalation rules",
        "description": "Rules that keep approvals moving when a manager is on leave or sitting on a request too long.",
        "features": [
          "Out-of-office delegate assignment",
          "Auto-escalate after a set time",
          "Reminder nudges to pending approvers",
          "Skip or reroute on no response"
        ]
      },
      {
        "name": "Mobile & WhatsApp approvals",
        "description": "Managers approve or reject from their phone in seconds, without logging into a heavy desktop system.",
        "features": [
          "One-tap approve / reject links",
          "WhatsApp and email notifications",
          "Full request detail on mobile",
          "Comments and rejection reasons"
        ]
      },
      {
        "name": "Budget checks & spend limits",
        "description": "Live budget validation that flags overspend before a PO is ever approved, not after.",
        "features": [
          "Budget vs. committed-spend view",
          "Block or warn on limit breach",
          "Per-department spending caps",
          "Running totals by cost centre"
        ]
      },
      {
        "name": "Audit trail & PO reporting",
        "description": "A complete, tamper-evident record of who approved what, when, and why, with reporting on top.",
        "features": [
          "Time-stamped approval history",
          "Exportable PO and spend reports",
          "Pending, approved, rejected dashboards",
          "Supplier and cycle-time analytics"
        ]
      }
    ],
    "outcomes": [
      {
        "label": "Faster approvals",
        "description": "POs clear in hours instead of days once routing, reminders, and mobile sign-off replace email chasing."
      },
      {
        "label": "Controlled spend",
        "description": "Budget checks and authority limits stop unapproved or over-budget purchases before they happen."
      },
      {
        "label": "Full accountability",
        "description": "Every decision is logged with a name, time, and reason, so audits and disputes are settled in minutes."
      },
      {
        "label": "You own it",
        "description": "The workflow engine, data, and documentation are entirely yours to run and extend, with no vendor lock-in."
      }
    ],
    "industries": [
      "Construction & contracting",
      "Trading & distribution",
      "Manufacturing",
      "Retail & wholesale",
      "Healthcare & clinics",
      "Hospitality & facilities"
    ],
    "faqs": [
      {
        "question": "Can the approval chain match our exact authority matrix?",
        "answer": "Yes. We map your real delegation-of-authority rules, including amount thresholds, department routes, and per-branch approvers, then build the chain to match. Sequential, parallel, and conditional steps are all supported, and rules can be changed as your structure evolves."
      },
      {
        "question": "Can managers approve from their phone or WhatsApp?",
        "answer": "They can. We wire up mobile-friendly approval links plus WhatsApp and email notifications, so an approver sees the full request and taps approve or reject in seconds. There is no need to log into a heavy desktop system to keep purchases moving."
      },
      {
        "question": "Does it connect to our existing ERP or accounting system?",
        "answer": "Usually yes. We integrate the workflow with systems like Odoo or your accounting and inventory tools so approved POs flow straight through without re-keying. Where a direct integration is not possible, we use APIs, file exchange, or scheduled sync."
      },
      {
        "question": "What happens to requests when an approver is on leave?",
        "answer": "Delegation and escalation rules handle it automatically. You can assign a stand-in approver, auto-escalate after a set time, or send reminder nudges so nothing stalls. Every reroute is recorded in the audit trail."
      },
      {
        "question": "Do we own the system after launch?",
        "answer": "Fully. You receive the source code, database, and documentation, along with team training and an access handoff. There is no lock-in, so your team can run, audit, and extend the workflow independently. We start with a free consultation and demo preview before any commitment."
      }
    ],
    "techStack": {
      "title": "The stack we build this on",
      "subtitle": "Proven tools for routing, notifications, and integration, assembled around how your purchasing actually works.",
      "categories": [
        {
          "label": "Workflow & backend",
          "items": [
            {
              "name": "Node.js",
              "icon": "https://cdn.simpleicons.org/nodedotjs/5FA04E"
            },
            {
              "name": "Python",
              "icon": "https://cdn.simpleicons.org/python/3776AB"
            },
            {
              "name": "n8n",
              "icon": "https://cdn.simpleicons.org/n8n/EA4B71"
            },
            {
              "name": "Rules engine"
            }
          ]
        },
        {
          "label": "Data & records",
          "items": [
            {
              "name": "PostgreSQL",
              "icon": "https://cdn.simpleicons.org/postgresql/4169E1"
            },
            {
              "name": "MySQL",
              "icon": "https://cdn.simpleicons.org/mysql/4479A1"
            },
            {
              "name": "Redis",
              "icon": "https://cdn.simpleicons.org/redis/FF4438"
            },
            {
              "name": "Audit log store"
            }
          ]
        },
        {
          "label": "Notifications & sign-off",
          "items": [
            {
              "name": "WhatsApp",
              "icon": "https://cdn.simpleicons.org/whatsapp/25D366"
            },
            {
              "name": "Twilio"
            },
            {
              "name": "Email / SMTP"
            },
            {
              "name": "Mobile approval links"
            }
          ]
        },
        {
          "label": "ERP & accounting",
          "items": [
            {
              "name": "Odoo",
              "icon": "https://cdn.simpleicons.org/odoo/714B67"
            },
            {
              "name": "REST API"
            },
            {
              "name": "Google Sheets",
              "icon": "https://cdn.simpleicons.org/googlesheets/34A853"
            },
            {
              "name": "Webhooks"
            }
          ]
        },
        {
          "label": "Access & security",
          "items": [
            {
              "name": "Role-based access"
            },
            {
              "name": "Approval thresholds"
            },
            {
              "name": "Spend limits"
            },
            {
              "name": "Change history"
            }
          ]
        },
        {
          "label": "Infrastructure",
          "items": [
            {
              "name": "Docker",
              "icon": "https://cdn.simpleicons.org/docker/2496ED"
            },
            {
              "name": "Nginx",
              "icon": "https://cdn.simpleicons.org/nginx/009639"
            },
            {
              "name": "AWS"
            },
            {
              "name": "Scheduled backups"
            }
          ]
        }
      ]
    }
  },
  "role-based-access-control": {
    "slug": "role-based-access-control",
    "service": "RBAC & Security Policies",
    "pillarSlug": "custom-erp-crm-solutions",
    "pillarName": "Custom ERP & CRM Solutions",
    "seo": {
      "title": "Role-Based Access Control (RBAC) in Oman | CloudTopia",
      "description": "Secure your ERP and CRM with role-based access control, permission matrices, and audit trails so each user sees only what their role allows. Free consultation."
    },
    "hero": {
      "eyebrow": "Custom ERP & CRM",
      "title": "Role-Based Access Control (RBAC) & Security Policies",
      "subtitle": "Give every person exactly the access their role requires — no more, no less — across your ERP and CRM. We design permission matrices, enforce data-level rules, and log every action so sensitive records stay protected and fully auditable.",
      "chips": [
        "Permission matrices",
        "Field-level rules",
        "Audit trails",
        "Two-factor login",
        "Branch-based access",
        "Approval workflows",
        "You own it",
        "Arabic + English"
      ]
    },
    "deliver": [
      {
        "name": "Role & permission matrix",
        "description": "We map every job function to a clear set of permissions, so access reflects how your team actually works instead of a vague all-or-nothing login.",
        "features": [
          "Role discovery workshop",
          "Module-by-module rights",
          "Create, read, edit, delete control",
          "Documented permission map"
        ]
      },
      {
        "name": "Record & field-level rules",
        "description": "We restrict access down to individual records and fields, so a salesperson sees only their own deals and finance figures stay hidden from those who don't need them.",
        "features": [
          "Own-records-only rules",
          "Hidden sensitive fields",
          "Read-only vs editable",
          "Customer & supplier scoping"
        ]
      },
      {
        "name": "Branch & team segmentation",
        "description": "For multi-branch operations, we scope data and screens per branch or department so each location works in its own space without seeing the others.",
        "features": [
          "Per-branch data isolation",
          "Department-level views",
          "Shared vs private records",
          "Manager cross-branch access"
        ]
      },
      {
        "name": "Approval & escalation workflows",
        "description": "We build rules that route high-risk actions — large discounts, refunds, credit limits — for sign-off before they take effect.",
        "features": [
          "Threshold-based approvals",
          "Multi-step sign-off",
          "Maker-checker controls",
          "Auto-escalation alerts"
        ]
      },
      {
        "name": "Authentication & login security",
        "description": "We harden how people sign in with two-factor authentication, session timeouts, and password policies that fit your risk level.",
        "features": [
          "Two-factor authentication",
          "Session & idle timeouts",
          "Password & lockout policies",
          "Device and login alerts"
        ]
      },
      {
        "name": "Audit trail & access reports",
        "description": "Every login, edit, export, and permission change is logged, giving you a tamper-evident record and ready-to-review access reports.",
        "features": [
          "Who-did-what logging",
          "Change history per record",
          "Export & download tracking",
          "Periodic access reviews"
        ]
      }
    ],
    "outcomes": [
      {
        "label": "Data stays protected",
        "description": "Sensitive financials, payroll, and customer data are visible only to the roles that genuinely need them, shrinking the chance of internal leaks."
      },
      {
        "label": "Clean audit on demand",
        "description": "When auditors or management ask who changed what, you have a complete, time-stamped trail instead of guesswork."
      },
      {
        "label": "Fewer costly mistakes",
        "description": "Approval gates on discounts, refunds, and edits stop accidental or unauthorized changes before they hit your numbers."
      },
      {
        "label": "Faster, safer onboarding",
        "description": "New hires get the right access on day one from a predefined role, and leavers are revoked instantly without breaking anything."
      }
    ],
    "industries": [
      "Retail & multi-branch trading",
      "Banking & financial services",
      "Healthcare & clinics",
      "Logistics & distribution",
      "Construction & contracting",
      "Professional services firms"
    ],
    "faqs": [
      {
        "question": "What exactly is role-based access control?",
        "answer": "RBAC means access is tied to a person's role rather than handed out individually. We define roles like sales rep, branch manager, or accountant once, attach the right permissions to each, and assign people to roles — so access stays consistent and easy to manage as your team grows."
      },
      {
        "question": "Can one person see only their own customers and deals?",
        "answer": "Yes. We apply record-level rules so each user sees only the data they own or are assigned, while managers get a wider view. This keeps your pipeline and customer list private between team members without separate systems."
      },
      {
        "question": "Does this work with our existing ERP or CRM?",
        "answer": "In most cases, yes. We configure the native permission engine of platforms like Odoo and layer our own rules and audit logging where needed. If you're on a custom system we built, RBAC is woven directly into the application."
      },
      {
        "question": "Will we be able to manage roles ourselves later?",
        "answer": "Absolutely. We hand over a documented permission map and train your admins to create roles, adjust rights, and onboard staff. You fully own the code, data, and documentation — there's no lock-in and no dependency on us to add a user."
      },
      {
        "question": "How do we get started?",
        "answer": "Book a free consultation and we'll review your structure and show a demo preview of how access and audit trails would work for your team. The fastest way to reach us is WhatsApp, and we work in both Arabic and English."
      }
    ],
    "techStack": {
      "title": "The stack we secure this on",
      "subtitle": "Proven tools for permissions, authentication, and audit logging — configured around your ERP and CRM, not bolted on.",
      "categories": [
        {
          "label": "Access & Permissions",
          "items": [
            {
              "name": "Role-based access"
            },
            {
              "name": "Permission matrices"
            },
            {
              "name": "Record-level rules"
            },
            {
              "name": "Field-level security"
            }
          ]
        },
        {
          "label": "Authentication",
          "items": [
            {
              "name": "Two-factor (2FA)"
            },
            {
              "name": "Single sign-on"
            },
            {
              "name": "OAuth 2.0"
            },
            {
              "name": "Session policies"
            }
          ]
        },
        {
          "label": "Platform & ERP",
          "items": [
            {
              "name": "Odoo"
            },
            {
              "name": "Python",
              "icon": "https://cdn.simpleicons.org/python/3776AB"
            },
            {
              "name": "Node.js",
              "icon": "https://cdn.simpleicons.org/nodedotjs/5FA04E"
            },
            {
              "name": "PostgreSQL",
              "icon": "https://cdn.simpleicons.org/postgresql/4169E1"
            }
          ]
        },
        {
          "label": "Audit & Monitoring",
          "items": [
            {
              "name": "Audit trails"
            },
            {
              "name": "Access reviews"
            },
            {
              "name": "Redis",
              "icon": "https://cdn.simpleicons.org/redis/FF4438"
            },
            {
              "name": "Activity logging"
            }
          ]
        },
        {
          "label": "Hardening & Delivery",
          "items": [
            {
              "name": "Encryption"
            },
            {
              "name": "Docker",
              "icon": "https://cdn.simpleicons.org/docker/2496ED"
            },
            {
              "name": "Nginx",
              "icon": "https://cdn.simpleicons.org/nginx/009639"
            },
            {
              "name": "WhatsApp",
              "icon": "https://cdn.simpleicons.org/whatsapp/25D366"
            }
          ]
        }
      ]
    }
  },
  "sales-crm-pipeline-architecture": {
    "slug": "sales-crm-pipeline-architecture",
    "service": "Sales CRM Pipeline Architecture",
    "pillarSlug": "custom-erp-crm-solutions",
    "pillarName": "Custom ERP & CRM Solutions",
    "seo": {
      "title": "Sales CRM Pipeline Architecture & Setup | CloudTopia",
      "description": "CloudTopia builds a sales CRM pipeline around how your team really sells — clear stages, lead routing, follow-ups, and forecasts you own. Free consultation."
    },
    "hero": {
      "eyebrow": "Custom ERP & CRM",
      "title": "Sales CRM Pipeline Architecture & Optimization",
      "subtitle": "We architect a sales pipeline that mirrors how your team actually closes — clear stages, automatic follow-ups, and honest forecasts. The result is a CRM your reps trust and your team fully owns.",
      "chips": [
        "Stages that fit you",
        "Auto lead routing",
        "Follow-up reminders",
        "Accurate forecasting",
        "WhatsApp & email sync",
        "Rep activity tracking",
        "Bilingual (AR + EN)",
        "Full ownership"
      ]
    },
    "deliver": [
      {
        "name": "Pipeline & stage design",
        "description": "We map your real sales motion into a pipeline with clear entry and exit criteria for every stage.",
        "features": [
          "Stages built from your actual deals",
          "Win/loss reasons captured",
          "Multiple pipelines per team",
          "Exit criteria per stage"
        ]
      },
      {
        "name": "Lead capture & routing",
        "description": "Every enquiry lands in the CRM and reaches the right rep automatically, with the source attached.",
        "features": [
          "WhatsApp, web form & email capture",
          "Round-robin or rule-based routing",
          "Source & campaign tracking",
          "Duplicate detection"
        ]
      },
      {
        "name": "Follow-up automation",
        "description": "Reminders, tasks, and sequences fire on their own so no deal goes cold.",
        "features": [
          "Stage-based task creation",
          "Stale-deal alerts",
          "Templated email & WhatsApp replies",
          "Quote & approval workflows"
        ]
      },
      {
        "name": "Forecasting & reporting",
        "description": "Weighted pipeline value and conversion metrics that managers can actually trust.",
        "features": [
          "Weighted forecast by stage",
          "Conversion & velocity reports",
          "Per-rep and per-team dashboards",
          "Aging & bottleneck views"
        ]
      },
      {
        "name": "Pipeline health audit",
        "description": "We review an existing CRM, clean the clutter, and rebuild stages that have drifted from reality.",
        "features": [
          "Stuck-deal & data cleanup",
          "Stage logic re-mapping",
          "Rep adoption fixes",
          "Field & permission tidy-up"
        ]
      },
      {
        "name": "Access, training & handoff",
        "description": "Role-based access plus a team trained to run the pipeline day to day.",
        "features": [
          "Role-based permissions",
          "Manager vs. rep views",
          "Hands-on team training",
          "Documentation & handoff"
        ]
      }
    ],
    "outcomes": [
      {
        "label": "Fewer dropped leads",
        "description": "Every enquiry is captured and routed, so nothing slips through between channels."
      },
      {
        "label": "Faster deal cycles",
        "description": "Automated follow-ups keep deals moving instead of stalling in a rep's inbox."
      },
      {
        "label": "Forecasts you trust",
        "description": "Weighted, stage-based pipeline value replaces gut-feel guesses at month-end."
      },
      {
        "label": "You own it",
        "description": "The CRM, data, and configuration stay with your team — no vendor lock-in."
      }
    ],
    "industries": [
      "Real estate & property",
      "Trading & distribution",
      "Professional services & agencies",
      "Construction & contracting",
      "Travel & tourism",
      "Automotive sales & dealerships"
    ],
    "faqs": [
      {
        "question": "Do we have to switch CRMs, or can you optimize the one we use?",
        "answer": "Both are on the table. We can architect a fresh pipeline in Odoo or another CRM, or audit and rebuild the one you already run. If your current tool is the bottleneck, we will tell you honestly before any commitment."
      },
      {
        "question": "Can leads from WhatsApp and our website land in the pipeline automatically?",
        "answer": "Yes. We capture leads from WhatsApp, web forms, and email into a single inbox, then route each one to the right rep with the source attached. That removes manual copy-paste and the leads that get lost in between."
      },
      {
        "question": "How do you build a forecast we can actually rely on?",
        "answer": "We weight each deal by its stage probability and tie stages to real exit criteria, so the number reflects genuine momentum rather than optimism. Managers get conversion, velocity, and aging reports to see exactly where deals stall."
      },
      {
        "question": "Will our sales team actually use it?",
        "answer": "That is the whole point of designing the pipeline around your real motion instead of a generic template. We keep data entry light, automate the busywork, and train reps hands-on so the CRM helps them close rather than slowing them down."
      },
      {
        "question": "Do we own the pipeline and data after launch?",
        "answer": "Completely. You receive the configuration, the data, the documentation, and full administrator access. There is no lock-in — your team can run, adjust, and extend the pipeline independently."
      }
    ],
    "techStack": {
      "title": "The stack we build this on",
      "subtitle": "Proven CRM tooling and integrations we use to architect, automate, and report on your sales pipeline.",
      "categories": [
        {
          "label": "CRM platform",
          "items": [
            {
              "name": "Odoo CRM"
            },
            {
              "name": "PostgreSQL",
              "icon": "https://cdn.simpleicons.org/postgresql/4169E1"
            },
            {
              "name": "Python",
              "icon": "https://cdn.simpleicons.org/python/3776AB"
            },
            {
              "name": "Odoo Studio"
            }
          ]
        },
        {
          "label": "Lead capture",
          "items": [
            {
              "name": "WhatsApp Business API",
              "icon": "https://cdn.simpleicons.org/whatsapp/25D366"
            },
            {
              "name": "Web forms"
            },
            {
              "name": "Meta Lead Ads",
              "icon": "https://cdn.simpleicons.org/meta/0467DF"
            },
            {
              "name": "Email-to-lead"
            }
          ]
        },
        {
          "label": "Automation",
          "items": [
            {
              "name": "n8n",
              "icon": "https://cdn.simpleicons.org/n8n/EA4B71"
            },
            {
              "name": "Zapier",
              "icon": "https://cdn.simpleicons.org/zapier/FF4F00"
            },
            {
              "name": "Twilio"
            },
            {
              "name": "Lead routing rules"
            }
          ]
        },
        {
          "label": "Reporting & forecasting",
          "items": [
            {
              "name": "Pipeline dashboards"
            },
            {
              "name": "Weighted forecasting"
            },
            {
              "name": "Google Sheets",
              "icon": "https://cdn.simpleicons.org/googlesheets/34A853"
            },
            {
              "name": "Metabase",
              "icon": "https://cdn.simpleicons.org/metabase/509EE3"
            }
          ]
        },
        {
          "label": "Integrations & APIs",
          "items": [
            {
              "name": "REST & XML-RPC API"
            },
            {
              "name": "Webhooks"
            },
            {
              "name": "Node.js",
              "icon": "https://cdn.simpleicons.org/nodedotjs/5FA04E"
            },
            {
              "name": "Email & SMTP"
            }
          ]
        },
        {
          "label": "Security & hosting",
          "items": [
            {
              "name": "Role-based access"
            },
            {
              "name": "Docker",
              "icon": "https://cdn.simpleicons.org/docker/2496ED"
            },
            {
              "name": "Nginx",
              "icon": "https://cdn.simpleicons.org/nginx/009639"
            },
            {
              "name": "Automated backups"
            }
          ]
        }
      ]
    }
  },
  "sales-followup-drip-automation": {
    "slug": "sales-followup-drip-automation",
    "service": "Sales Follow-Up Automation",
    "pillarSlug": "business-process-automation",
    "pillarName": "Business Process Automation (BPA)",
    "seo": {
      "title": "Sales Follow-Up & Drip Automation | CloudTopia",
      "description": "CloudTopia builds custom sales follow-up and drip campaign automation chasing every lead on WhatsApp and email. Book a free consultation and demo preview."
    },
    "hero": {
      "eyebrow": "Process Automation",
      "title": "Sales Follow-Up & Drip Campaign Automation",
      "subtitle": "Stop losing deals to slow or forgotten follow-up. We build automation that chases every new lead on WhatsApp and email, nurtures the ones who go quiet, and hands your reps only the prospects ready to talk.",
      "chips": [
        "WhatsApp-first follow-up",
        "Timed drip sequences",
        "Lead scoring & routing",
        "Bilingual AR + EN",
        "CRM-connected",
        "Reply detection",
        "No-show recovery",
        "You own it"
      ]
    },
    "deliver": [
      {
        "name": "Instant lead-response automation",
        "description": "Every new enquiry gets a reply within seconds, day or night, before a competitor gets there first.",
        "features": [
          "WhatsApp + email auto-reply",
          "Triggers from web form, ads & DMs",
          "Assigns the lead to a rep instantly",
          "Logged straight into your CRM"
        ]
      },
      {
        "name": "Multi-step drip sequences",
        "description": "We map and build the timed message cadences that nurture a lead from first contact to closed deal.",
        "features": [
          "Stage-based message flows",
          "Delays, working-hours & day rules",
          "Branching by reply or no-reply",
          "Bilingual AR + EN, RTL-ready copy"
        ]
      },
      {
        "name": "Lead scoring & smart routing",
        "description": "Score and segment leads by behaviour so hot prospects reach a human while the rest keep getting nurtured.",
        "features": [
          "Scoring by source & engagement",
          "Hot-lead alerts to the right rep",
          "Round-robin or territory routing",
          "Quiet-lead recycling to a drip"
        ]
      },
      {
        "name": "Reply detection & auto-stop",
        "description": "The moment a lead replies or books, the sequence pauses and a person takes over the conversation.",
        "features": [
          "Detects WhatsApp & email replies",
          "Auto-pauses on human handoff",
          "Stops on unsubscribe or opt-out",
          "Resumes if the lead goes cold"
        ]
      },
      {
        "name": "Quote, no-show & re-engagement flows",
        "description": "Automated nudges for sent quotes, missed appointments, and dormant prospects who once showed interest.",
        "features": [
          "Quote follow-up reminders",
          "Appointment & no-show recovery",
          "Win-back drips for old leads",
          "Review & referral asks after a sale"
        ]
      },
      {
        "name": "Campaign dashboard & CRM sync",
        "description": "One view of what every sequence is doing, wired two-way into the CRM your team already uses.",
        "features": [
          "Sent, opened, replied & booked metrics",
          "Per-sequence conversion view",
          "Two-way CRM contact sync",
          "Automated daily summary to managers"
        ]
      }
    ],
    "outcomes": [
      {
        "label": "No lead left cold",
        "description": "Every enquiry is followed up on time, automatically, so deals stop slipping through the cracks."
      },
      {
        "label": "Reps focus on closers",
        "description": "Your team spends time only on leads warmed and qualified by the sequence, not chasing dead ends."
      },
      {
        "label": "Faster response, more replies",
        "description": "Second-by-second response times and consistent nudges lift reply and booking rates."
      },
      {
        "label": "A revivable pipeline",
        "description": "Dormant and lost leads keep getting nurtured, turning a stale list back into real conversations."
      }
    ],
    "industries": [
      "Real estate & brokerage",
      "Car dealerships & rentals",
      "Clinics & aesthetic centres",
      "Education & training institutes",
      "Travel & tourism agencies",
      "Trading & wholesale suppliers"
    ],
    "faqs": [
      {
        "question": "Will the follow-up messages go through WhatsApp?",
        "answer": "Yes. We build on the official WhatsApp Business API so your sequences send from a verified business number, not a personal one that risks being banned. Email, SMS, and other channels can run alongside it in the same flow."
      },
      {
        "question": "What happens when a lead actually replies?",
        "answer": "The automation detects the reply, instantly pauses that lead's sequence, and alerts the assigned rep so a real person takes over. Nobody gets a robotic message after they've already started a conversation, and the sequence can resume only if the lead goes quiet again."
      },
      {
        "question": "Can it work with the CRM or tools we already use?",
        "answer": "In most cases, yes. We connect to common CRMs and lead sources through their APIs, or we build a lightweight pipeline board for you if you don't have one. Either way the leads, replies, and outcomes all stay in sync."
      },
      {
        "question": "Are the messages in Arabic and English?",
        "answer": "Both. We write and structure bilingual, RTL-ready sequences and can branch the flow by a lead's language preference so each prospect gets messages that read naturally to them."
      },
      {
        "question": "Do we own the automation once it's built?",
        "answer": "Completely. You receive the workflows, the connected accounts, the message templates, and full documentation, with no vendor lock-in. Your team can run, edit, and extend the sequences on its own."
      }
    ],
    "techStack": {
      "title": "The stack we build this on",
      "subtitle": "Proven automation, messaging, and data tools wired into one follow-up engine you fully own.",
      "categories": [
        {
          "label": "Automation engine",
          "items": [
            {
              "name": "n8n",
              "icon": "https://cdn.simpleicons.org/n8n/EA4B71"
            },
            {
              "name": "Zapier",
              "icon": "https://cdn.simpleicons.org/zapier/FF4F00"
            },
            {
              "name": "Node.js",
              "icon": "https://cdn.simpleicons.org/nodedotjs/5FA04E"
            },
            {
              "name": "Python",
              "icon": "https://cdn.simpleicons.org/python/3776AB"
            }
          ]
        },
        {
          "label": "Messaging channels",
          "items": [
            {
              "name": "WhatsApp Business API",
              "icon": "https://cdn.simpleicons.org/whatsapp/25D366"
            },
            {
              "name": "Twilio",
              "icon": "https://cdn.simpleicons.org/twilio/F22F46"
            },
            {
              "name": "Email / SMTP"
            },
            {
              "name": "Telegram",
              "icon": "https://cdn.simpleicons.org/telegram/26A5E4"
            }
          ]
        },
        {
          "label": "CRM & lead sources",
          "items": [
            {
              "name": "HubSpot",
              "icon": "https://cdn.simpleicons.org/hubspot/FF7A59"
            },
            {
              "name": "Odoo CRM",
              "icon": "https://cdn.simpleicons.org/odoo/714B67"
            },
            {
              "name": "Meta Lead Ads",
              "icon": "https://cdn.simpleicons.org/meta/0467DF"
            },
            {
              "name": "Google Sheets",
              "icon": "https://cdn.simpleicons.org/googlesheets/34A853"
            }
          ]
        },
        {
          "label": "Data & storage",
          "items": [
            {
              "name": "PostgreSQL",
              "icon": "https://cdn.simpleicons.org/postgresql/4169E1"
            },
            {
              "name": "Redis",
              "icon": "https://cdn.simpleicons.org/redis/FF4438"
            },
            {
              "name": "Supabase",
              "icon": "https://cdn.simpleicons.org/supabase/3FCF8E"
            },
            {
              "name": "Lead scoring rules"
            }
          ]
        },
        {
          "label": "AI & personalization",
          "items": [
            {
              "name": "OpenAI",
              "icon": "https://cdn.simpleicons.org/openai/412991"
            },
            {
              "name": "Reply intent detection"
            },
            {
              "name": "AR / EN copy variants"
            },
            {
              "name": "Dynamic merge fields"
            }
          ]
        },
        {
          "label": "Hosting & delivery",
          "items": [
            {
              "name": "Docker",
              "icon": "https://cdn.simpleicons.org/docker/2496ED"
            },
            {
              "name": "NGINX",
              "icon": "https://cdn.simpleicons.org/nginx/009639"
            },
            {
              "name": "AWS",
              "icon": "https://cdn.simpleicons.org/amazonwebservices/FF9900"
            },
            {
              "name": "Scheduled cron jobs"
            }
          ]
        }
      ]
    }
  },
  "sales-management-systems": {
    "slug": "sales-management-systems",
    "service": "Sales Management System",
    "pillarSlug": "business-management-systems",
    "pillarName": "Business Management Systems",
    "seo": {
      "title": "Sales Management Systems in Oman | CloudTopia",
      "description": "Custom sales management systems that run your whole sales team — territories, targets, rep activity, and orders in one place you own. Free consultation."
    },
    "hero": {
      "eyebrow": "Custom ERP & CRM",
      "title": "Sales Management Systems",
      "subtitle": "Run your entire sales operation from one system built around how your team actually sells — accounts, territories, targets, daily activity, and order handoff all in one place. Your managers get a true picture of performance, and your team owns every line of the code and data.",
      "chips": [
        "Built around your team",
        "Territory & account mapping",
        "Target vs actual",
        "Rep activity tracking",
        "Order-to-cash handoff",
        "Manager oversight",
        "Bilingual (AR + EN)",
        "Full ownership"
      ]
    },
    "deliver": [
      {
        "name": "Account & territory management",
        "description": "We organise your customers, prospects, and coverage areas so every account has a clear owner and no territory overlaps.",
        "features": [
          "Account ownership & hierarchy",
          "Region & territory mapping",
          "Coverage gap & overlap checks",
          "Account history in one view"
        ]
      },
      {
        "name": "Targets & quota tracking",
        "description": "We set quotas per rep, team, product, or branch and track progress live so everyone sees where they stand against target.",
        "features": [
          "Monthly & quarterly quotas",
          "Per-rep and per-team targets",
          "Live target-vs-actual tracking",
          "Shortfall & overshoot alerts"
        ]
      },
      {
        "name": "Activity & visit logging",
        "description": "Reps log calls, meetings, and site visits from the field so managers can see real effort behind every number.",
        "features": [
          "Call, meeting & visit logs",
          "Mobile field check-ins",
          "Next-action scheduling",
          "Activity-per-account view"
        ]
      },
      {
        "name": "Quote & order handoff",
        "description": "Won deals turn into quotes and orders that pass cleanly to inventory, finance, or your ERP without re-keying.",
        "features": [
          "Quote generation & approval",
          "Order push to ERP/inventory",
          "Stock & price checks at quote",
          "Invoice & payment status sync"
        ]
      },
      {
        "name": "Manager control centre",
        "description": "Sales managers get one screen to monitor the whole team, spot stalling accounts, and step in before a deal is lost.",
        "features": [
          "Team performance dashboard",
          "Branch & region drill-down",
          "Stalled-account alerts",
          "Approval & override controls"
        ]
      },
      {
        "name": "Access, roles & handoff",
        "description": "Role-based permissions keep reps in their lane and managers across everything, with a trained team and full documentation.",
        "features": [
          "Role-based permissions",
          "Manager vs rep views",
          "Hands-on team training",
          "Documentation & ownership handoff"
        ]
      }
    ],
    "outcomes": [
      {
        "label": "One source of truth",
        "description": "Accounts, targets, activity, and orders live in one system instead of scattered spreadsheets and rep notebooks."
      },
      {
        "label": "Managers in control",
        "description": "Leaders see real activity and quota progress as it happens, so they coach and intervene instead of guessing at month-end."
      },
      {
        "label": "Cleaner order handoff",
        "description": "Won deals flow straight into quotes, orders, and your ERP, cutting re-keying errors and delays between sales and finance."
      },
      {
        "label": "You own it",
        "description": "The system, the data, and the documentation stay with your team — no per-seat licences and no vendor lock-in."
      }
    ],
    "industries": [
      "Wholesale distribution & FMCG",
      "Building materials & trading",
      "Automotive & equipment dealerships",
      "Real estate & property",
      "Industrial & MEP suppliers",
      "Pharmaceutical & medical supplies"
    ],
    "faqs": [
      {
        "question": "How is this different from just a CRM or a sales pipeline?",
        "answer": "A pipeline tracks deals; a sales management system runs the whole operation around them. On top of stages it covers territories and account ownership, quotas and target tracking, field activity, and the handoff of won deals into quotes, orders, and your ERP. It is the system your sales managers use to run the team day to day, not only to watch the funnel."
      },
      {
        "question": "Can it manage territories, quotas, and multiple branches?",
        "answer": "Yes. We map your regions and assign account ownership so coverage is clear and there are no overlaps, then set quotas per rep, team, product, or branch. Managers can drill from a company-wide view down to a single branch or rep, which makes it a natural fit for distributors and trading firms operating across the GCC."
      },
      {
        "question": "Will it connect to our ERP or accounting system for orders and invoices?",
        "answer": "It will. We push approved quotes and orders into your existing ERP, inventory, or accounting software and pull invoice and payment status back, so sales and finance work from the same numbers. That removes the manual re-keying that usually causes errors and delays between a closed deal and a fulfilled order."
      },
      {
        "question": "Can reps in the field use it in Arabic on their phones?",
        "answer": "Yes. The whole system is delivered in Arabic and English with full right-to-left layout, and the field screens — visit check-ins, activity logs, and account lookups — are built to work on a phone. Reps work in the language they prefer while managers see everything roll up in real time."
      },
      {
        "question": "How do we know it fits before committing?",
        "answer": "Start with a free consultation where we walk through how your team actually sells, then we prepare a demo preview tailored to your setup before any commitment. The fastest way to begin is a WhatsApp message, and we take it from there."
      }
    ],
    "techStack": {
      "title": "The stack we build this on",
      "subtitle": "Dependable tooling we use to run accounts, targets, activity, and order handoff in a system your team can audit and extend.",
      "categories": [
        {
          "label": "Application core",
          "items": [
            {
              "name": "Node.js",
              "icon": "https://cdn.simpleicons.org/nodedotjs/5FA04E"
            },
            {
              "name": "Python",
              "icon": "https://cdn.simpleicons.org/python/3776AB"
            },
            {
              "name": "React",
              "icon": "https://cdn.simpleicons.org/react/61DAFB"
            },
            {
              "name": "TypeScript",
              "icon": "https://cdn.simpleicons.org/typescript/3178C6"
            }
          ]
        },
        {
          "label": "Data & records",
          "items": [
            {
              "name": "PostgreSQL",
              "icon": "https://cdn.simpleicons.org/postgresql/4169E1"
            },
            {
              "name": "MySQL",
              "icon": "https://cdn.simpleicons.org/mysql/4479A1"
            },
            {
              "name": "Redis",
              "icon": "https://cdn.simpleicons.org/redis/FF4438"
            },
            {
              "name": "Audit logging"
            }
          ]
        },
        {
          "label": "ERP & order handoff",
          "items": [
            {
              "name": "Odoo",
              "icon": "https://cdn.simpleicons.org/odoo/714B67"
            },
            {
              "name": "REST APIs"
            },
            {
              "name": "Webhooks"
            },
            {
              "name": "Invoice sync"
            }
          ]
        },
        {
          "label": "Field & comms",
          "items": [
            {
              "name": "WhatsApp",
              "icon": "https://cdn.simpleicons.org/whatsapp/25D366"
            },
            {
              "name": "Google Maps",
              "icon": "https://cdn.simpleicons.org/googlemaps/4285F4"
            },
            {
              "name": "Mobile check-ins"
            },
            {
              "name": "Email & SMTP"
            }
          ]
        },
        {
          "label": "Targets & reporting",
          "items": [
            {
              "name": "Chart.js",
              "icon": "https://cdn.simpleicons.org/chartdotjs/FF6384"
            },
            {
              "name": "Metabase",
              "icon": "https://cdn.simpleicons.org/metabase/509EE3"
            },
            {
              "name": "Google Sheets",
              "icon": "https://cdn.simpleicons.org/googlesheets/34A853"
            },
            {
              "name": "Quota engine"
            }
          ]
        },
        {
          "label": "Access & hosting",
          "items": [
            {
              "name": "Role-based access"
            },
            {
              "name": "Docker",
              "icon": "https://cdn.simpleicons.org/docker/2496ED"
            },
            {
              "name": "Nginx",
              "icon": "https://cdn.simpleicons.org/nginx/009639"
            },
            {
              "name": "Automated backups"
            }
          ]
        }
      ]
    }
  },
  "whatsapp-crm-lead-capture": {
    "slug": "whatsapp-crm-lead-capture",
    "service": "WhatsApp Lead Capture & Routing",
    "pillarSlug": "business-process-automation",
    "pillarName": "Business Process Automation (BPA)",
    "seo": {
      "title": "WhatsApp-to-CRM Lead Capture & Routing | CloudTopia",
      "description": "Turn every WhatsApp message into a tracked CRM lead, auto-routed to the right rep in seconds with full source tracking. Free consultation and demo preview."
    },
    "hero": {
      "eyebrow": "Process Automation",
      "title": "WhatsApp-to-CRM Lead Capture & Routing Setup",
      "subtitle": "We connect your WhatsApp Business line straight into your CRM, so every enquiry becomes a tracked lead and lands with the right rep within seconds — no message left on read, no deal lost in a shared inbox.",
      "chips": [
        "WhatsApp Business API",
        "Instant lead capture",
        "Rule-based routing",
        "Full source tracking",
        "Round-robin assignment",
        "Bilingual AR + EN",
        "No vendor lock-in",
        "You own the data"
      ]
    },
    "deliver": [
      {
        "name": "WhatsApp Business connection",
        "description": "We connect your official WhatsApp Business line to your CRM through a verified, compliant integration.",
        "features": [
          "Official WhatsApp Business API setup",
          "Number verification & green-tick guidance",
          "Webhook listener for every inbound message",
          "Works with your existing business number"
        ]
      },
      {
        "name": "Automatic lead capture",
        "description": "Every new chat is parsed into a structured CRM record the moment it arrives — name, number, message, and timestamp.",
        "features": [
          "New contacts created instantly",
          "First message logged to the record",
          "Duplicate detection on phone number",
          "Media & attachments saved to the lead"
        ]
      },
      {
        "name": "Routing & assignment rules",
        "description": "We build the logic that decides who gets each lead, based on the rules your sales team actually works by.",
        "features": [
          "Round-robin or weighted distribution",
          "Route by branch, language, or product",
          "Working-hours & availability checks",
          "Fallback owner so nothing goes unassigned"
        ]
      },
      {
        "name": "Source & campaign tracking",
        "description": "We tag where each lead came from so you can see which channels and ads actually drive conversations.",
        "features": [
          "Click-to-WhatsApp ad attribution",
          "ref / UTM capture from chat links",
          "QR code & landing-page source tags",
          "Reporting by source in your CRM"
        ]
      },
      {
        "name": "Auto-replies & qualifying flow",
        "description": "An instant first reply greets the lead and gathers the basics before a rep ever picks up the chat.",
        "features": [
          "Bilingual AR + EN greeting & menu",
          "Qualifying questions on the record",
          "Office-hours auto-acknowledgement",
          "Hand-off to the assigned rep"
        ]
      },
      {
        "name": "Alerts, SLA & handoff",
        "description": "The right rep is notified the instant a lead lands, with escalation if it sits untouched.",
        "features": [
          "Instant assignment notifications",
          "SLA timer with stale-lead escalation",
          "Reassign on no-response",
          "Reply from inside the CRM"
        ]
      }
    ],
    "outcomes": [
      {
        "label": "No lead slips through",
        "description": "Every WhatsApp enquiry becomes a tracked record instead of a forgotten chat in a shared phone."
      },
      {
        "label": "Faster first response",
        "description": "Leads are assigned and acknowledged in seconds, so reps reach hot enquiries while intent is high."
      },
      {
        "label": "Fair, visible distribution",
        "description": "Round-robin and rule-based routing spread leads evenly and end the scramble over who takes what."
      },
      {
        "label": "Real channel insight",
        "description": "Source tracking shows which ads, links, and campaigns actually start conversations that close."
      }
    ],
    "industries": [
      "Real estate & property",
      "Car dealerships & rentals",
      "Clinics & medical centres",
      "Retail & e-commerce",
      "Travel & tourism agencies",
      "Education & training centres"
    ],
    "faqs": [
      {
        "question": "Do I have to change my WhatsApp number?",
        "answer": "No. We connect your existing WhatsApp Business number through the official API, so customers keep messaging the same line they already know. We handle the verification steps and guide you through the green-tick application where it applies."
      },
      {
        "question": "Which CRM does this work with?",
        "answer": "We build it around whatever CRM you run — Odoo, HubSpot, Zoho, or a custom system we develop for you. The routing rules, fields, and source tags are configured to match your existing pipeline rather than forcing you onto a fixed template."
      },
      {
        "question": "How does the lead get sent to the right person?",
        "answer": "We set up the routing logic with you — round-robin for even distribution, or rules based on branch, language, product line, or working hours. Each lead is assigned the moment it arrives, and if no one responds within your SLA it escalates or reassigns automatically."
      },
      {
        "question": "Can it reply automatically in Arabic and English?",
        "answer": "Yes. The instant greeting and qualifying flow are fully bilingual and RTL-ready, so an Arabic-speaking customer gets an Arabic reply and an English speaker gets English. The rep then takes over the conversation from inside the CRM."
      },
      {
        "question": "Do we own the setup once it is live?",
        "answer": "Completely. You receive the integration, the routing logic, the configuration, and the documentation, and the lead data lives in your own CRM. There is no lock-in — your team can run, adjust, and extend it without depending on us."
      }
    ],
    "techStack": {
      "title": "The stack we build this on",
      "subtitle": "Proven, well-documented tools wired into your CRM — chosen so your team can own and maintain the setup after launch.",
      "categories": [
        {
          "label": "Messaging",
          "items": [
            {
              "name": "WhatsApp Business API",
              "icon": "https://cdn.simpleicons.org/whatsapp/25D366"
            },
            {
              "name": "Twilio",
              "icon": "https://cdn.simpleicons.org/twilio/F22F46"
            },
            {
              "name": "Meta Cloud API",
              "icon": "https://cdn.simpleicons.org/meta/0467DF"
            },
            {
              "name": "Webhooks"
            }
          ]
        },
        {
          "label": "Automation & routing",
          "items": [
            {
              "name": "n8n",
              "icon": "https://cdn.simpleicons.org/n8n/EA4B71"
            },
            {
              "name": "Node.js",
              "icon": "https://cdn.simpleicons.org/nodedotjs/5FA04E"
            },
            {
              "name": "Routing rules engine"
            },
            {
              "name": "Round-robin assignment"
            }
          ]
        },
        {
          "label": "CRM targets",
          "items": [
            {
              "name": "Odoo CRM"
            },
            {
              "name": "HubSpot",
              "icon": "https://cdn.simpleicons.org/hubspot/FF7A59"
            },
            {
              "name": "Zoho CRM",
              "icon": "https://cdn.simpleicons.org/zoho/E42527"
            },
            {
              "name": "Custom CRM"
            }
          ]
        },
        {
          "label": "Data & storage",
          "items": [
            {
              "name": "PostgreSQL",
              "icon": "https://cdn.simpleicons.org/postgresql/4169E1"
            },
            {
              "name": "Redis",
              "icon": "https://cdn.simpleicons.org/redis/FF4438"
            },
            {
              "name": "Google Sheets",
              "icon": "https://cdn.simpleicons.org/googlesheets/34A853"
            },
            {
              "name": "Media storage"
            }
          ]
        },
        {
          "label": "Attribution",
          "items": [
            {
              "name": "Click-to-WhatsApp ads"
            },
            {
              "name": "UTM & ref capture"
            },
            {
              "name": "QR code sources"
            },
            {
              "name": "Source reporting"
            }
          ]
        },
        {
          "label": "Delivery & ops",
          "items": [
            {
              "name": "Docker",
              "icon": "https://cdn.simpleicons.org/docker/2496ED"
            },
            {
              "name": "Nginx",
              "icon": "https://cdn.simpleicons.org/nginx/009639"
            },
            {
              "name": "REST APIs"
            },
            {
              "name": "Monitoring & alerts"
            }
          ]
        }
      ]
    }
  },
  "workflow-automation": {
    "slug": "workflow-automation",
    "service": "Workflow Automation",
    "pillarSlug": "business-process-automation",
    "pillarName": "Business Process Automation (BPA)",
    "seo": {
      "title": "Workflow Automation in Oman | CloudTopia",
      "description": "CloudTopia builds custom workflow automation to link your apps, run multi-step processes, and end manual handoffs. Book a free consultation and demo preview."
    },
    "hero": {
      "eyebrow": "Process Automation",
      "title": "Workflow Automation",
      "subtitle": "Turn the repetitive, multi-step work your team does by hand into automation that runs itself. We map a real process end to end, then build the triggers, rules, and handoffs that move it forward without anyone copying data between apps or chasing the next step.",
      "chips": [
        "Trigger-based flows",
        "Cross-app handoffs",
        "Approval routing",
        "WhatsApp & email alerts",
        "Conditional logic",
        "Error retries & alerts",
        "Bilingual AR + EN",
        "You own it"
      ]
    },
    "deliver": [
      {
        "name": "Process mapping & build",
        "description": "We sit with your team, map a real workflow step by step, then build automation that mirrors exactly how it should run.",
        "features": [
          "End-to-end workflow blueprint",
          "Triggers, steps, and decision points",
          "Built around your actual process",
          "Bilingual AR + EN, RTL-ready"
        ]
      },
      {
        "name": "Triggers & event handling",
        "description": "Each flow starts on its own, the moment something happens, so no one has to remember to kick it off.",
        "features": [
          "Form, email, and webhook triggers",
          "Scheduled and time-based runs",
          "New-record and status-change events",
          "Incoming WhatsApp or chat messages"
        ]
      },
      {
        "name": "Conditional logic & branching",
        "description": "We encode your rules so the workflow makes the right call automatically instead of waiting on a person.",
        "features": [
          "If / then routing by field values",
          "Multi-branch and parallel paths",
          "Thresholds, tiers, and date rules",
          "Skip, hold, or re-route on conditions"
        ]
      },
      {
        "name": "Cross-system data handoffs",
        "description": "Information flows between your tools on its own, ending the copy-paste and re-keying between systems.",
        "features": [
          "Two-way sync across apps and sheets",
          "Field mapping and data formatting",
          "Create, update, and lookup records",
          "API and webhook connections"
        ]
      },
      {
        "name": "Tasks, approvals & notifications",
        "description": "The right person gets pinged at the right step, with one-tap actions that push the workflow forward.",
        "features": [
          "Auto-assigned tasks with deadlines",
          "Approve / reject from WhatsApp or email",
          "Reminders and overdue escalations",
          "Status updates to staff and customers"
        ]
      },
      {
        "name": "Monitoring, logs & error handling",
        "description": "Every run is logged, retried on failure, and visible on a dashboard, so a flow never breaks silently.",
        "features": [
          "Full run history and audit log",
          "Auto-retry with failure alerts",
          "Live status dashboard",
          "Bottleneck and cycle-time view"
        ]
      }
    ],
    "outcomes": [
      {
        "label": "Hours given back",
        "description": "The manual, repeatable steps your team does daily run on their own, freeing people for work that actually needs them."
      },
      {
        "label": "Fewer human errors",
        "description": "Rules and validation replace copy-paste and memory, so steps stop getting missed, mistyped, or skipped."
      },
      {
        "label": "Nothing stalls",
        "description": "Triggers, reminders, and escalations keep every process moving even when someone is busy or away."
      },
      {
        "label": "You own it",
        "description": "The workflows, connections, and documentation are entirely yours to run and extend, with no vendor lock-in."
      }
    ],
    "industries": [
      "Trading & distribution",
      "Logistics & freight",
      "Real estate & property",
      "Clinics & healthcare",
      "Professional services & consulting",
      "Retail & e-commerce"
    ],
    "faqs": [
      {
        "question": "How is this different from buying a tool like Zapier or Make myself?",
        "answer": "Off-the-shelf tools are great for simple two-app links, but they get expensive and fragile once a process has many steps, conditions, and edge cases. We design the whole workflow around how your business actually runs, build the logic that ready-made connectors can't handle, and host it so you are not paying per task forever. You end up with something that fits your process instead of forcing your process to fit the tool."
      },
      {
        "question": "Will it work with the apps and systems we already use?",
        "answer": "In most cases, yes. We connect to common CRMs, accounting, inventory, and spreadsheet tools through their APIs or webhooks, and we can bridge older systems with scheduled syncs or file exchange. Where no connection exists, we build a lightweight one so your tools talk to each other."
      },
      {
        "question": "What happens when a step fails or an app is down?",
        "answer": "Reliability is built in, not bolted on. Each workflow retries failed steps automatically, alerts you when something needs a human, and keeps a full log of every run so nothing breaks silently. You can always see what ran, what is pending, and what needs attention."
      },
      {
        "question": "Can the automation send WhatsApp messages and handle approvals?",
        "answer": "Yes. We build on the official WhatsApp Business API so flows can notify staff or customers and collect one-tap approvals from a phone. Email, SMS, and in-app tasks can run in the same workflow, and a sequence can pause or branch based on the response."
      },
      {
        "question": "Do we own the automation after it is built?",
        "answer": "Completely. You receive the workflows, the connected accounts, the source code, and full documentation, with no vendor lock-in. Your team can run, edit, and extend everything on its own, and we start with a free consultation and demo preview before any commitment."
      }
    ],
    "techStack": {
      "title": "The stack we build this on",
      "subtitle": "Proven automation, integration, and messaging tools wired into one reliable engine you fully own.",
      "categories": [
        {
          "label": "Automation engine",
          "items": [
            {
              "name": "n8n",
              "icon": "https://cdn.simpleicons.org/n8n/EA4B71"
            },
            {
              "name": "Make",
              "icon": "https://cdn.simpleicons.org/make/6D00CC"
            },
            {
              "name": "Zapier",
              "icon": "https://cdn.simpleicons.org/zapier/FF4F00"
            },
            {
              "name": "Custom rules engine"
            }
          ]
        },
        {
          "label": "Backend & logic",
          "items": [
            {
              "name": "Node.js",
              "icon": "https://cdn.simpleicons.org/nodedotjs/5FA04E"
            },
            {
              "name": "Python",
              "icon": "https://cdn.simpleicons.org/python/3776AB"
            },
            {
              "name": "REST & webhooks"
            },
            {
              "name": "Scheduled cron jobs"
            }
          ]
        },
        {
          "label": "Integrations",
          "items": [
            {
              "name": "Odoo",
              "icon": "https://cdn.simpleicons.org/odoo/714B67"
            },
            {
              "name": "Google Sheets",
              "icon": "https://cdn.simpleicons.org/googlesheets/34A853"
            },
            {
              "name": "Airtable",
              "icon": "https://cdn.simpleicons.org/airtable/18BFFF"
            },
            {
              "name": "Gmail",
              "icon": "https://cdn.simpleicons.org/gmail/EA4335"
            }
          ]
        },
        {
          "label": "Notifications & actions",
          "items": [
            {
              "name": "WhatsApp Business API",
              "icon": "https://cdn.simpleicons.org/whatsapp/25D366"
            },
            {
              "name": "Twilio",
              "icon": "https://cdn.simpleicons.org/twilio/F22F46"
            },
            {
              "name": "Email / SMTP"
            },
            {
              "name": "One-tap approvals"
            }
          ]
        },
        {
          "label": "Data & storage",
          "items": [
            {
              "name": "PostgreSQL",
              "icon": "https://cdn.simpleicons.org/postgresql/4169E1"
            },
            {
              "name": "Redis",
              "icon": "https://cdn.simpleicons.org/redis/FF4438"
            },
            {
              "name": "Supabase",
              "icon": "https://cdn.simpleicons.org/supabase/3FCF8E"
            },
            {
              "name": "Run & audit logs"
            }
          ]
        },
        {
          "label": "Hosting & reliability",
          "items": [
            {
              "name": "Docker",
              "icon": "https://cdn.simpleicons.org/docker/2496ED"
            },
            {
              "name": "NGINX",
              "icon": "https://cdn.simpleicons.org/nginx/009639"
            },
            {
              "name": "AWS",
              "icon": "https://cdn.simpleicons.org/amazonwebservices/FF9900"
            },
            {
              "name": "Retries & monitoring"
            }
          ]
        }
      ]
    }
  }
}
