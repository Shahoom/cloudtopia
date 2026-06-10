import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { getPayloadClient, isPayloadConfigured } from '@/lib/cms/payload'

export const runtime = 'nodejs'

// Lazy-init: the OpenAI SDK throws at construction when no API key is set,
// and a module-scope client would crash `next build` (page-data collection
// imports this module) on hosts where OPENAI_API_KEY is not configured.
let openaiClient: OpenAI | null = null
function getOpenAI() {
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  }
  return openaiClient
}

function preview(value: unknown, limit = 1400) {
  const text = typeof value === 'string' ? value : JSON.stringify(value)
  return (text || '').slice(0, limit)
}

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'OpenAI API key is not configured.' }, { status: 500 })
  }

  // ── Auth gate ──────────────────────────────────────────────────────────────
  // This endpoint spends OpenAI credits, so it must never be callable
  // anonymously. Require a logged-in Payload user (admin session cookie).
  if (!isPayloadConfigured()) {
    return NextResponse.json({ error: 'Service is not configured.' }, { status: 503 })
  }

  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: req.headers })
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const provider = process.env.AI_PROVIDER || 'openai'
  const model = 'gpt-4o'

  const logGeneration = async (data: Record<string, unknown>) => {
    try {
      await payload.create({
        collection: 'blog-ai-generation-logs',
        data: {
          // The fixed promptType enum has no "generate full post" value; outline
          // is the closest match for a complete production-ready draft.
          promptType: 'outline',
          user: (user as { id: number }).id,
          userEmail: (user as { email?: string }).email,
          provider,
          model,
          ...data,
        } as never,
        overrideAccess: true,
      })
    } catch {
      // Logging should never break the editor flow.
    }
  }

  let inputText = ''
  try {
    const { text } = await req.json()

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Invalid input text.' }, { status: 400 })
    }
    inputText = text

    const prompt = `
You are an expert technical content writer and SEO specialist for CloudTopia, a premium digital agency.
Analyze the following raw text/notes and generate a complete, production-ready blog post.

Return the result as a raw JSON object (without markdown formatting blocks) containing EXACTLY these keys:
- "title": A catchy, SEO-friendly title.
- "slug": A URL-friendly slug.
- "excerpt": A compelling 1-2 sentence summary.
- "content_paragraphs": An array of strings, where each string is a paragraph of the article. Do not include HTML.
- "metaTitle": SEO Meta Title (max 60 chars).
- "metaDescription": SEO Meta Description (max 160 chars).
- "focusKeyword": The primary SEO keyword.
- "categoryName": A guessed category name (e.g. "Web Development", "AI", "Business Systems").

Raw Text:
${text}
`

    const response = await getOpenAI().chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    })

    const rawResult = response.choices[0]?.message?.content
    if (!rawResult) {
      throw new Error('No content returned from OpenAI.')
    }

    const jsonResult = JSON.parse(rawResult)

    // Convert paragraphs into Payload CMS Lexical JSON format
    const lexicalContent = {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        children: (jsonResult.content_paragraphs || []).map((text: string) => ({
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          children: [
            {
              type: 'text',
              format: 0,
              mode: 'normal',
              text: text,
              style: '',
              detail: 0,
              version: 1,
            },
          ],
        })),
      },
    }

    // Replace paragraphs with lexical content
    jsonResult.content = lexicalContent
    delete jsonResult.content_paragraphs

    await logGeneration({
      inputPreview: preview(inputText),
      outputPreview: preview(jsonResult.title || jsonResult),
      status: 'success',
    })

    return NextResponse.json({ result: jsonResult })
  } catch (error: any) {
    console.error('AI Generation Error:', error)
    await logGeneration({
      inputPreview: preview(inputText),
      outputPreview: '',
      status: 'error',
      errorMessage: error?.message || 'Internal Server Error',
    })
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
