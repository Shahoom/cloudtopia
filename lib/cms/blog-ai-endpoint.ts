import type { PayloadRequest } from 'payload'
import { calculateBlogContentScores } from '../blog/intelligence.ts'

type BlogAIAction =
  | 'idea'
  | 'outline'
  | 'title'
  | 'excerpt'
  | 'intro'
  | 'rewrite'
  | 'faq'
  | 'seo'
  | 'social'
  | 'cta'
  | 'analyze'
  | 'translate'
  | 'optimize'

type BlogAIRequestBody = {
  action?: BlogAIAction
  postId?: string | number
  input?: Record<string, unknown>
}

const allowedActions = new Set<BlogAIAction>([
  'idea',
  'outline',
  'title',
  'excerpt',
  'intro',
  'rewrite',
  'faq',
  'seo',
  'social',
  'cta',
  'analyze',
  'translate',
  'optimize',
])

function preview(value: unknown, limit = 1400) {
  const text = typeof value === 'string' ? value : JSON.stringify(value)
  return (text || '').slice(0, limit)
}

async function parseBody(req: PayloadRequest): Promise<BlogAIRequestBody> {
  if (req.data && typeof req.data === 'object') return req.data as BlogAIRequestBody

  const text = await req.text?.()
  if (!text) return {}
  return JSON.parse(text) as BlogAIRequestBody
}

function actionPrompt(action: BlogAIAction, input: Record<string, unknown>, post: any) {
  const topic = input.topic || post?.title || post?.seo?.focusKeyword || 'CloudTopia insights'
  const context = {
    topic,
    articleTitle: post?.title,
    excerpt: post?.excerpt,
    focusKeyword: post?.seo?.focusKeyword,
    targetAudience: input.targetAudience || post?.targetAudience,
    serviceFocus: input.serviceFocus || post?.serviceFocus,
    contentType: post?.contentType,
    tone: input.tone || 'premium, practical, B2B, clear, helpful',
    selectedSection: input.section,
  }

  const instructions: Record<BlogAIAction, string> = {
    idea:
      'Generate 6 strong CloudTopia blog ideas. Include title ideas, content angle, search intent, suggested category, and suggested tags.',
    outline:
      'Generate a production-ready outline. Include intro direction, H2/H3 structure, FAQ ideas, CTA placements, and recommended structured blocks.',
    title:
      'Generate 10 stronger titles, an SEO title, a social title, a curiosity-driven title, and a professional B2B title.',
    excerpt:
      'Generate a short excerpt, an SEO meta description, and a social teaser.',
    intro:
      'Generate three intro options: professional, direct sales-focused, and educational.',
    rewrite:
      'Rewrite the selected section in five variants: clearer, shorter, more premium, more persuasive, and simpler. Preserve factual claims.',
    faq:
      'Generate 6 FAQ questions and answers suitable for schema. Keep answers concise, specific, and useful.',
    seo:
      'Generate a complete SEO package: meta title, meta description, focus keyword, secondary keywords, OG title, OG description, slug ideas, and internal link suggestions.',
    social:
      'Generate distribution copy: LinkedIn post, Instagram caption, X post, WhatsApp message, and email newsletter intro.',
    cta:
      'Generate CloudTopia service CTAs matched to the topic and category. Include title, description, primary button, secondary button, and placement guidance.',
    analyze:
      'Analyze content readiness.',
    translate:
      'Translate or localize the selected section according to the requested language. Preserve meaning and technical terminology.',
    optimize:
      'Produce an SEO optimization package as strict JSON (handled separately).',
  }

  return [
    'You are CloudTopia editorial AI inside a secure Payload CMS admin tool.',
    'CloudTopia builds websites, web applications, dashboards, admin panels, CRM/ERP-like systems, automation, AI-powered business solutions, and cloud digital transformation platforms.',
    'Output useful draft suggestions only. Do not claim content is final. Do not include markdown fences unless code is requested.',
    `Task: ${instructions[action]}`,
    `Context: ${JSON.stringify(context, null, 2)}`,
  ].join('\n\n')
}

async function callOpenAI(action: BlogAIAction, input: Record<string, unknown>, post: any) {
  const provider = process.env.AI_PROVIDER || 'openai'
  if (provider !== 'openai') {
    throw new Error(`AI_PROVIDER "${provider}" is not supported yet.`)
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured.')
  }

  const model = process.env.AI_MODEL || 'gpt-4o-mini'
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model,
      input: actionPrompt(action, input, post),
      temperature: 0.7,
    }),
  })

  const payload = await response.json()
  if (!response.ok) {
    throw new Error(payload?.error?.message || 'OpenAI request failed.')
  }

  const text = payload?.output_text || payload?.output?.[0]?.content?.[0]?.text
  if (typeof text !== 'string' || !text.trim()) {
    // Never dump the raw OpenAI envelope into the editor as a "success".
    throw new Error('OpenAI returned no usable text output.')
  }

  return text
}

function parseJsonLoose(text: unknown): any {
  if (typeof text !== 'string') throw new Error('AI returned no usable output.')
  let s = text.trim()
  // Strip markdown code fences if the model added them despite instructions.
  s = s.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()
  // Fall back to the outermost {...} if there is surrounding prose.
  if (s[0] !== '{') {
    const start = s.indexOf('{')
    const end = s.lastIndexOf('}')
    if (start >= 0 && end > start) s = s.slice(start, end + 1)
  }
  return JSON.parse(s)
}

/**
 * One-click SEO optimization. Works on the CURRENT editor content (passed via
 * `input`, so it runs even before the post is saved). Returns a strict JSON
 * package the client writes straight into the fields. Does NOT rewrite prose.
 */
async function runOptimize(input: Record<string, unknown>) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('OPENAI_API_KEY is not configured.')
  const model = process.env.AI_MODEL || 'gpt-4o-mini'
  const language = input.locale === 'ar' ? 'Arabic' : 'English'

  const prompt = [
    'You are CloudTopia editorial SEO AI inside a secure Payload CMS admin tool.',
    'CloudTopia builds websites, web apps, dashboards, CRM/ERP systems, automation, and AI-powered business solutions.',
    `Write every output value in ${language}.`,
    'Produce an SEO optimization package for the article below.',
    'Return ONLY minified JSON — no markdown, no code fences, no commentary — with EXACTLY these keys:',
    '{"metaTitle":string,"metaDescription":string,"focusKeyword":string,"secondaryKeywords":string[],"excerpt":string,"shortExcerpt":string,"slugSuggestion":string,"internalLinks":[{"anchor":string,"target":string}],"warnings":string[]}',
    'Rules: metaTitle <= 60 characters; metaDescription <= 155 characters; shortExcerpt <= 120 characters; excerpt 1-2 sentences. slugSuggestion is lowercase kebab-case ASCII (transliterate Arabic). internalLinks: 2-4 relevant CloudTopia internal links (targets like /services, /contact, /articles, /about) with natural anchor text. warnings: short notes such as missing image alt text, no H2 subheadings, or thin content — empty array if none.',
    `Article title: ${String(input.title || '').slice(0, 200)}`,
    `Current excerpt: ${String(input.excerpt || '').slice(0, 400)}`,
    `Existing focus keyword (optional): ${String(input.focusKeyword || '')}`,
    `Article body (plain text):\n${String(input.contentPlain || '').slice(0, 6000)}`,
  ].join('\n\n')

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({ model, input: prompt, temperature: 0.4 }),
  })
  const payload = await response.json()
  if (!response.ok) throw new Error(payload?.error?.message || 'OpenAI request failed.')
  const text = payload?.output_text || payload?.output?.[0]?.content?.[0]?.text
  return parseJsonLoose(text)
}

async function logAIRequest(req: PayloadRequest, data: Record<string, unknown>) {
  try {
    await req.payload.create({
      collection: 'blog-ai-generation-logs' as any,
      data,
      overrideAccess: true,
      req,
    })
  } catch {
    // Logging should never break the editor flow.
  }
}

export async function handleBlogAIEndpoint(req: PayloadRequest): Promise<Response> {
  const { user } = await req.payload.auth({ headers: req.headers })
  if (!user) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  let body: BlogAIRequestBody
  try {
    body = await parseBody(req)
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const action = body.action
  if (!action || !allowedActions.has(action)) {
    return Response.json({ error: 'Unsupported AI assistant action.' }, { status: 400 })
  }

  let post: any = null
  if (body.postId && body.postId !== 'create') {
    try {
      post = await req.payload.findByID({
        collection: 'blog-posts' as any,
        id: body.postId,
        depth: 1,
        overrideAccess: true,
        req,
      })
    } catch {
      post = null
    }
  }

  const input = body.input || {}
  const provider = process.env.AI_PROVIDER || 'openai'
  const model = process.env.AI_MODEL || 'gpt-4o-mini'

  try {
    if (action === 'analyze') {
      if (!post) {
        return Response.json({ error: 'Save the post before running content analysis.' }, { status: 400 })
      }

      const result = calculateBlogContentScores({
        title: post.title,
        excerpt: post.excerpt,
        focusKeyword: post.seo?.focusKeyword,
        metaTitle: post.seo?.metaTitle,
        metaDescription: post.seo?.metaDescription,
        coverImageAlt: post.featuredImageAlt,
        category: typeof post.category === 'object' ? post.category?.name : post.category,
        author: typeof post.author === 'object' ? post.author?.name : post.author,
        publishedAt: post.publishedAt,
        showCTA: post.showCTA,
        content: post.content,
        contentBlocks: post.contentBlocks,
        tags: post.tags,
        internalLinks: post.internalLinksSuggestions,
      })

      await logAIRequest(req, {
        promptType: action,
        sourcePost: post?.id,
        user: (user as any).id,
        userEmail: (user as any).email,
        provider,
        model,
        inputPreview: preview(input),
        outputPreview: preview(result),
        status: 'success',
      })

      return Response.json({ result })
    }

    if (action === 'optimize') {
      const result = await runOptimize(input)
      await logAIRequest(req, {
        promptType: action,
        sourcePost: post?.id,
        user: (user as any).id,
        userEmail: (user as any).email,
        provider,
        model,
        inputPreview: preview(input),
        outputPreview: preview(result),
        status: 'success',
      })
      return Response.json({ result })
    }

    const result = await callOpenAI(action, input, post)
    await logAIRequest(req, {
      promptType: action,
      sourcePost: post?.id,
      user: (user as any).id,
      userEmail: (user as any).email,
      provider,
      model,
      inputPreview: preview(input),
      outputPreview: preview(result),
      status: 'success',
    })

    return Response.json({ result })
  } catch (error: any) {
    await logAIRequest(req, {
      promptType: action,
      sourcePost: post?.id,
      user: (user as any).id,
      userEmail: (user as any).email,
      provider,
      model,
      inputPreview: preview(input),
      outputPreview: '',
      status: 'error',
      errorMessage: error?.message || 'AI assistant request failed.',
    })

    return Response.json({ error: error?.message || 'AI assistant request failed.' }, { status: 503 })
  }
}
