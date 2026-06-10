import { NextRequest, NextResponse } from 'next/server'
import { aiChatRateLimiter } from '@/lib/ai-chatbot/rateLimit.ts'
import { generateAIRecommendationDetails } from '@/lib/solution-finder/aiRecommendation.ts'
import { deriveSolutionFinderCountryHint, getHeaderCountryCode } from '@/lib/solution-finder/countryHint.ts'
import { buildSolutionFinderLead, saveSolutionFinderLead } from '@/lib/solution-finder/leadService.ts'
import type { SolutionFinderPayload } from '@/lib/solution-finder/types.ts'

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

export async function POST(req: NextRequest) {
  const rate = aiChatRateLimiter.check(`solution-finder:${getRateLimitKey(req)}`)
  if (!rate.allowed) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 })
  }

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
    const inferredCountry = deriveSolutionFinderCountryHint({
      explicitCountry: body.country,
      headerCountryCode: getHeaderCountryCode(req.headers),
      pageUrl: body.pageUrl,
    })

    const normalizedPayload: SolutionFinderPayload = {
      name: body.name?.trim() || 'Unknown',
      phone: body.phone?.trim() || '',
      email: body.email?.trim().toLowerCase() || '',
      company: body.company?.trim() || '',
      country: inferredCountry,
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
      baseRecommendation: body.baseRecommendation,
      pageUrl: body.pageUrl || '',
      locale: body.locale === 'ar' ? 'ar' : 'en',
      source: 'solution-finder',
      createdAt: body.createdAt || new Date().toISOString(),
    }

    const aiRecommendation = await generateAIRecommendationDetails({
      locale: normalizedPayload.locale || 'en',
      answers: normalizedPayload,
      deterministicRecommendation: {
        packageTitle: normalizedPayload.baseRecommendation?.packageTitle || normalizedPayload.recommendedPackage || 'CloudTopia Digital Solution',
        personalizedIntro: normalizedPayload.baseRecommendation?.personalizedIntro || normalizedPayload.description || 'A tailored CloudTopia recommendation based on the submitted answers.',
        recommendedServices: normalizedPayload.baseRecommendation?.recommendedServices || [],
        keyFeatures: normalizedPayload.baseRecommendation?.keyFeatures || [],
        deliveryApproach: normalizedPayload.baseRecommendation?.deliveryApproach || '',
        estimatedTimeline: normalizedPayload.baseRecommendation?.estimatedTimeline || normalizedPayload.timeline || '',
        budgetRange: normalizedPayload.baseRecommendation?.budgetRange || normalizedPayload.budget || '',
      },
    })

    const crmLead = buildSolutionFinderLead(normalizedPayload, aiRecommendation)
    const lead = {
      ...crmLead,
      ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '',
      userAgent: req.headers.get('user-agent') || '',
    }

    const saveResult = await saveSolutionFinderLead(crmLead)

    // ── 1. Log the lead for local visibility ─────────────────────────────────
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

    // The lead's recommendation is only durably captured if persistence
    // succeeded. Never claim success when saveResult.saved is false — otherwise
    // the wizard shows a success screen for a lead that was actually lost.
    if (!saveResult.saved) {
      return NextResponse.json(
        {
          success: false,
          error: 'We could not save your request right now. Please try again or contact us directly.',
          saved: false,
          destination: saveResult.destination,
        },
        { status: 503 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your recommendation has been recorded. CloudTopia will be in touch shortly.',
        saved: saveResult.saved,
        destination: saveResult.destination,
        aiRecommendation,
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

function getRateLimitKey(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const realIp = request.headers.get('x-real-ip')?.trim()
  const session = request.headers.get('x-ai-chat-session')?.trim()

  return session || forwardedFor || realIp || 'anonymous'
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
