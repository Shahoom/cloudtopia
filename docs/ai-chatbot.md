# CloudTopia AI Chatbot

## What Was Added

CloudTopia now has a floating AI sales/support chatbot on public pages. It answers in Arabic or English, uses local CloudTopia knowledge files, qualifies leads, routes visitors to the correct WhatsApp number, and submits lead forms through a backend API.

## Main Files

- `components/ai-chatbot/` - Floating chat widget, quick actions, messages, and lead form.
- `app/api/ai-chat/route.ts` - Server-only OpenAI Responses API endpoint.
- `app/api/ai-leads/route.ts` - Lead capture endpoint.
- `lib/ai-chatbot/` - OpenAI client, prompt, local knowledge retrieval, lead extraction, WhatsApp routing, rate limiting, and lead storage abstraction.
- `data/cloudtopia-ai/` - Local markdown knowledge source used before any vector store.
- `collections/AIChatLeads.ts` - Payload collection for chatbot leads when the database schema is available.

## Environment Variables

Add the real key only in hosting/local environment variables:

```bash
OPENAI_API_KEY=
```

Optional:

```bash
OPENAI_MODEL=gpt-4.1-mini
NEXT_PUBLIC_SITE_URL=https://cloudtopia.net
NEXT_PUBLIC_CLOUDTOPIA_TR_WHATSAPP=905011511116
NEXT_PUBLIC_CLOUDTOPIA_OMAN_WHATSAPP=96895886393
```

If `OPENAI_MODEL` is missing, the backend defaults to `gpt-4.1-mini`.

## Knowledge Updates

Edit markdown files in `data/cloudtopia-ai/`. The backend reads these files directly and selects only relevant sections for the latest visitor message.

This can later be upgraded to OpenAI File Search or vector stores, but the current implementation intentionally requires no OpenAI dashboard setup, no file upload, and no manual vector store creation.

## WhatsApp Routing

Oman/GCC routes use `96895886393`. Turkey/Iraq/Levant routes use `905011511116`.

Routing checks visitor country text first, then page URL patterns such as `/ar/sa`, `/uae`, `/oman`, `/ar/tr`, `/iraq`, `/jordan`, and `/lebanon`.

## Lead Saving

Leads are submitted to `/api/ai-leads`, then `saveAIChatLead()` attempts to save them to Payload collection `ai-chat-leads`.

If Payload is not configured or the Payload table is not available yet, the service falls back to a small Postgres table named `ai_chatbot_leads` when `DATABASE_URL` exists. If no database is available, the frontend still shows the WhatsApp handoff. The integration point for another CRM/database is `lib/ai-chatbot/leadService.ts`.

## Security And Abuse Protection

- OpenAI API key is used only in backend route handlers.
- Chat input is validated and trimmed to 2,000 characters.
- Conversation history sent to OpenAI is limited to the latest 12 messages.
- In-memory rate limiting blocks bursts over 10 messages/minute or 50/hour per visitor/session.
- For production serverless scale, replace the in-memory limiter with Redis/Upstash in `lib/ai-chatbot/rateLimit.ts`.
- API errors are logged only in development and never leaked to visitors.
