import { NextRequest, NextResponse } from 'next/server'

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/solution-finder
//
// Accepts wizard submission, stores the lead, and optionally:
//   1. Sends a notification email to the CloudTopia team.
//   2. Creates a lead in the CloudTopia CRM (if integration is active).
//   3. Triggers a WhatsApp notification (if integration is active).
//
// Environment variables needed:
//   SOLUTION_FINDER_NOTIFY_EMAIL   — team email for lead notifications
//   SOLUTION_FINDER_FROM_EMAIL     — sender address (e.g. leads@cloudtopia.co)
//   RESEND_API_KEY / SENDGRID_API_KEY — if using an email service
//   CLOUDTOPIA_CRM_WEBHOOK         — optional CRM webhook URL
// ─────────────────────────────────────────────────────────────────────────────

export const runtime = 'nodejs'

type SolutionFinderPayload = {
  name?: string
  phone?: string
  email?: string
  company?: string
  country?: string
  industry?: string
  projectType?: string
  businessGoal?: string
  budget?: string
  timeline?: string
  description?: string
  contactMethod?: string
  wantContact?: boolean
  recommendedPackage?: string
  recommendedRoute?: string
  source?: string
  createdAt?: string
}

export async function POST(req: NextRequest) {
  try {
    const body: SolutionFinderPayload = await req.json()

    // ── Basic validation ──────────────────────────────────────────────────────
    if (!body.email && !body.phone) {
      return NextResponse.json(
        { error: 'At least one contact method (email or phone) is required.' },
        { status: 400 }
      )
    }

    // ── Sanitize payload ──────────────────────────────────────────────────────
    const lead = {
      name: body.name?.trim() || 'Unknown',
      phone: body.phone?.trim() || '',
      email: body.email?.trim().toLowerCase() || '',
      company: body.company?.trim() || '',
      country: body.country?.trim() || '',
      industry: body.industry || '',
      projectType: body.projectType || '',
      businessGoal: body.businessGoal || '',
      budget: body.budget || '',
      timeline: body.timeline || '',
      description: body.description?.trim() || '',
      contactMethod: body.contactMethod || 'email',
      wantContact: body.wantContact ?? true,
      recommendedPackage: body.recommendedPackage || '',
      recommendedRoute: body.recommendedRoute || '',
      source: 'solution-finder',
      createdAt: body.createdAt || new Date().toISOString(),
      ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '',
      userAgent: req.headers.get('user-agent') || '',
    }

    // ── 1. Log the lead (always works — replace with DB write) ────────────────
    console.log('[SolutionFinder] New lead received:', JSON.stringify(lead, null, 2))

    // ── 2. Optional: Send email notification to CloudTopia team ──────────────
    const notifyEmail = process.env.SOLUTION_FINDER_NOTIFY_EMAIL
    if (notifyEmail) {
      try {
        await sendEmailNotification(lead, notifyEmail)
      } catch (err) {
        console.error('[SolutionFinder] Email notification failed:', err)
        // Non-fatal: continue even if email fails
      }
    }

    // ── 3. Optional: Forward to CRM webhook ──────────────────────────────────
    const crmWebhook = process.env.CLOUDTOPIA_CRM_WEBHOOK
    if (crmWebhook) {
      try {
        await fetch(crmWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...lead, type: 'solution-finder-lead' }),
        })
      } catch (err) {
        console.error('[SolutionFinder] CRM webhook failed:', err)
        // Non-fatal
      }
    }

    // ── 4. TODO: Persist to database ─────────────────────────────────────────
    // When CloudTopia's database is ready, insert here:
    //
    // await db.insert(solutionFinderLeads).values(lead)
    //
    // Or via Payload CMS:
    // await payload.create({ collection: 'solution-finder-leads', data: lead })

    return NextResponse.json(
      {
        success: true,
        message: 'Your recommendation has been recorded. CloudTopia will be in touch shortly.',
        lead: {
          name: lead.name,
          recommendedPackage: lead.recommendedPackage,
        },
      },
      { status: 201 }
    )
  } catch (err: any) {
    console.error('[SolutionFinder] Unexpected error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again or contact us directly.' },
      { status: 500 }
    )
  }
}

// ─── Email helper (stub — wire up Resend / SendGrid / Nodemailer) ─────────────
async function sendEmailNotification(lead: Record<string, any>, toEmail: string) {
  const fromEmail = process.env.SOLUTION_FINDER_FROM_EMAIL || 'noreply@cloudtopia.co'
  const resendKey = process.env.RESEND_API_KEY

  if (!resendKey) {
    // Fallback: just log
    console.log(`[SolutionFinder] Would send email to ${toEmail} from ${fromEmail}`)
    return
  }

  const subject = `🎯 New Solution Finder Lead — ${lead.recommendedPackage} (${lead.industry})`
  const html = `
    <h2 style="color:#0284c7">New CloudTopia Solution Finder Lead</h2>
    <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
      <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f1f8">Name</td><td style="padding:8px 12px">${lead.name}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f1f8">Email</td><td style="padding:8px 12px">${lead.email}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f1f8">Phone</td><td style="padding:8px 12px">${lead.phone}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f1f8">Company</td><td style="padding:8px 12px">${lead.company}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f1f8">Country</td><td style="padding:8px 12px">${lead.country}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f1f8">Industry</td><td style="padding:8px 12px">${lead.industry}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f1f8">Project Type</td><td style="padding:8px 12px">${lead.projectType}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f1f8">Business Goal</td><td style="padding:8px 12px">${lead.businessGoal}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f1f8">Budget</td><td style="padding:8px 12px">${lead.budget}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f1f8">Timeline</td><td style="padding:8px 12px">${lead.timeline}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f1f8">Recommended Package</td><td style="padding:8px 12px;color:#0284c7;font-weight:bold">${lead.recommendedPackage}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f1f8">Contact Method</td><td style="padding:8px 12px">${lead.contactMethod}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f1f8">Description</td><td style="padding:8px 12px">${lead.description || '—'}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;background:#f4f1f8">Submitted At</td><td style="padding:8px 12px">${lead.createdAt}</td></tr>
    </table>
    <p style="margin-top:24px;font-size:12px;color:#999">This lead was submitted via the CloudTopia Solution Finder on cloudtopia.co</p>
  `

  // Send via Resend API
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject,
      html,
    }),
  })
}
