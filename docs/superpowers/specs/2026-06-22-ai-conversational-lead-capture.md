# CloudTopia Chatbot — Conversational AI Lead Capture

Date: 2026-06-22
Status: Approved — implementing

## Goal

Replace the pop-up quote form with a conversational, "deep-trained" AI agent. When a
visitor shows interest (or finishes their questions / asks for a quote or consultation),
the AI asks — naturally, not as a form — for their **name, email, and what kind of
project** they want. It organizes everything it has (inferring missing fields from the
chat) and submits it as a lead to the CMS, then confirms and offers a WhatsApp handoff.

The AI must also deeply understand the whole site and all CloudTopia services.

## Decisions (from brainstorm)

- Collect **name, email, project type**; ask 1–2 at a time, infer the rest from the chat.
- **Remove** the pop-up form entirely — chat only.
- **Smart trigger:** start collecting on interest / end of questions / explicit request /
  tapping a consultation/quote chip.
- Lead capture depends on OpenAI (accepted tradeoff: if OpenAI is down, flows still answer
  and WhatsApp is still offered, but no auto lead).

## Architecture

### 1. `submit_lead` OpenAI tool (`app/api/ai-chat/route.ts`)
- Pass `tools: [submit_lead]` to `responses.create`. Parameters (all optional except
  `summary`): `name, email, phone, country, projectType, businessType, budgetRange,
  timeline, summary`.
- Tool-calling loop:
  1. If the model emits a `function_call` for `submit_lead`, parse its JSON args.
  2. Map to `AILeadInput` (`serviceNeeded = projectType`, `message = summary`), attach
     `pageUrl`, `language`, `ipAddress`, `source: 'ai_chatbot'`, `createdAt`.
  3. `saveAIChatLead()` → `ai-chat-leads` collection.
  4. `buildWhatsappHandoff()` → handoff URL.
  5. Append `function_call_output` (saved/failed) to the input and call the model again to
     get a natural confirmation message.
  6. Respond `{ reply, leadSaved, whatsappUrl, lead }`.
- No tool call → current behavior (`reply` + `extractLeadSignals`).
- Preserve rate limiting, validation, the no-key fallback, and error fallback.
- Guardrails: at most one `submit_lead` execution per request; cap the tool loop to a
  single round-trip.

### 2. System prompt (`lib/ai-chatbot/systemPrompt.ts`)
Add a **Lead Capture Protocol** and reinforce service mastery:
- Detect interest / completion / explicit quote-or-consultation requests.
- Then ask for name, email, and project type — conversationally, 1–2 at a time, no form,
  no nagging. Keep answering the visitor's questions; never block on data collection.
- If a field is refused or absent, infer it from the conversation; never ask twice.
- Call `submit_lead` exactly once, with an organized `summary`, when there is enough to act
  (project need + name/email, or after the visitor has given what they will).
- After submitting, confirm warmly and offer WhatsApp.
- Recommend the right service layer using the provided knowledge; bilingual AR/EN.

### 3. Types (`lib/ai-chatbot/types.ts`)
Extend `AIChatResponse` with optional `leadSaved: boolean` and `whatsappUrl: string | null`.

### 4. Client (`components/ai-chatbot/AIChatbot.tsx`)
- Remove `showLeadForm`, `handleLeadSubmitted`, and the `AILeadForm` render.
- Add `leadCaptureActive` (state + ref). Routing in `submitMessage`:
  - If `leadCaptureActive` → go straight to the AI (skip flow matching), so slot-filling
    isn't intercepted by a flow.
  - Else match a flow. If a flow matches and its action is **not** `lead-form`, answer
    deterministically. Otherwise route to the AI (and set `leadCaptureActive`).
- `handleChip`: consultation/quote chip (flow node action `lead-form`) → route to AI and set
  `leadCaptureActive`; other chips behave as today.
- Parse the AI response: on `leadSaved` set `leadCaptured`, clear `leadCaptureActive`, set
  `latestWhatsappUrl`, and flush the conversation with `leadCaptured: true`.

### 5. Window (`components/ai-chatbot/AIChatbotWindow.tsx`)
Remove the `AILeadForm` import, the `showLeadForm` prop, and the lead-form render. Keep the
standalone WhatsApp CTA.

### 6. Cleanup
Delete `AILeadForm.tsx`; remove its now-unused CSS blocks (`leadForm`, `formGrid`,
`submitLeadButton`, `leadFormTitle`, `leadFormHint`). Keep `whatsappCta`.

## Non-goals
- No DB/migration changes (the `email` column already exists).
- No change to flows for pure Q&A, conversation logging, rate limiting, or RTL/i18n.

## Verification
- Drive a full capture in the preview: ask the AI a question, express interest, answer its
  name/email/project questions, and confirm `POST /api/ai-chat` returns `leadSaved: true`
  with a `whatsappUrl`, and a new row appears in `ai_chat_leads`.
- Confirm the transcript still flushes to `ai_chat_conversations` with `leadCaptured: true`.
- Confirm no pop-up form renders. Check AR + EN.
