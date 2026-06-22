# CloudTopia Chatbot — UI/UX Redesign

Date: 2026-06-22
Status: Approved — implementing

## Problem

The AI chatbot looks generic and low-contrast on desktop (washed-out frosted glass over
the busy hero), and on mobile the message bubbles and quick-reply chips are **clipped off
the left edge** of the screen. A redundant double greeting (welcome + proactive) shows on
open, and there is excessive dead vertical space.

The backend is solid and must remain untouched: the deterministic flow engine, the OpenAI
fallback (`/api/ai-chat`), lead capture (`/api/ai-leads` → `ai-chat-leads` collection),
and transcript logging via `sendBeacon` (`/api/ai-chat/conversation` → `ai-chat-conversations`).
Leads and conversations must keep flowing to the CMS exactly as today.

## Decisions (from brainstorm)

- **Aesthetic:** Premium solid — clean solid surfaces, crisp shadows, high contrast,
  refined cyan-gradient header. No glassmorphism.
- **Launcher:** Keep the "Ask CloudTopia / اسأل CloudTopia" text pill, refined.
- **Scope:** Visual restyle **and** targeted UX polish. Backend/CMS untouched.

## Design language

- **Surfaces.** Light: `#ffffff` panel on `#f6f9fc` message canvas. Dark: `#0f1b2e` panel
  on `#0a1422` canvas. Single-layer crisp shadow, 20px window radius. No `backdrop-filter`
  on the panel (it caused the muddy look) — solid, fully legible over any page.
- **Accent.** One accent only: cyan `#0ea5e9 → #0284c7`. Header band, user bubbles, send
  button, focus rings. WhatsApp green only on the WhatsApp action.
- **Typography.** Assistant text `#1e293b` ~15px / 1.55 (raised contrast). Meta labels slate-500.

## Components

### Launcher (`AIChatbotButton.tsx`)
Keep pill + label. Tighter padding, logo in crisp white disc, subtler aura, calmer pulse.
Open state collapses to a dark circular ✕ on desktop (hidden on mobile, header ✕ closes).

### Window (`AIChatbotWindow.tsx`)
- Desktop: 384px wide, `max-height: min(40rem, 100vh - 7rem)`.
- Header: cyan gradient band, white title + subtitle, online dot, clear/close icon buttons
  with proper contrast on the band.
- Message canvas: solid `#f6f9fc`, comfortable padding (≥ 1rem each side — this is the
  mobile clip fix), custom scrollbar.
- Sticky input bar, solid surface.

### Message (`AIChatMessage.tsx`)
- Assistant: small round logo avatar to the side + solid white bubble with border + soft
  shadow. Bubble caps at ~85% of the (padded) canvas.
- User: cyan-gradient bubble, right-aligned, no avatar.
- Quick-reply chips: solid filled light-cyan cards, clear border, hover lift. Wrap inside
  padded canvas — never clip.

### Lead form (`AILeadForm.tsx`)
Single column, larger fields, section title ("Get a tailored quote" / "احصل على عرض مخصص"),
prominent submit. WhatsApp as a clear secondary action below.

### Orchestrator (`AIChatbot.tsx`)
- **Single smart greeting** on open: do not stack welcome + proactive. The proactive
  auto-open path stays, but when it fires it replaces/dedupes against the welcome rather
  than appending a second near-identical assistant message.
- No other logic changes. All flush/lead/flow behavior preserved.

## Mobile fixes (the real bugs)
- Full-screen sheet retains safe-area insets and 16px inputs.
- Canvas keeps horizontal padding so bubbles/chips never reach the viewport edge.
- Bubble max-width relative to the padded canvas (not the viewport).
- Send button clear of the corner.

## Non-goals
- No changes to flows, API routes, services, migrations, CMS collections, or i18n logic.
- No new dependencies.

## Verification
Desktop + mobile + dark-mode screenshots of: greeting, a flow answer with chips, the lead
form, and the input/loading state. Confirm no left-edge clipping on mobile. Confirm a lead
submit still POSTs to `/api/ai-leads` and the conversation still flushes to
`/api/ai-chat/conversation` (network check).
