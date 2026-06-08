import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// Ensure we have an API key, otherwise this will throw at runtime if not handled
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'OpenAI API key is not configured.' }, { status: 500 })
  }

  try {
    const { text } = await req.json()

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Invalid input text.' }, { status: 400 })
    }

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

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
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

    return NextResponse.json({ result: jsonResult })
  } catch (error: any) {
    console.error('AI Generation Error:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
