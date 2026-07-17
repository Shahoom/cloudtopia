import { buildSitemapEntriesFromCMS } from '@/lib/sitemap-data'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

const HOST = 'cloudtopia.net'
const KEY = '54966996323336af549028a7aa9bdb8c'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/IndexNow'

/**
 * Cron-triggered IndexNow batch submitter. Posts recently changed URLs
 * from the sitemap to api.indexnow.org so Bing + Yandex (and Google
 * partners that consume the IndexNow feed) re-crawl content within
 * minutes instead of waiting for organic crawl. Wired to a daily Vercel
 * Cron in vercel.json. Vercel auto-injects `Authorization: Bearer
 * $CRON_SECRET` when CRON_SECRET is set in the project env.
 *
 * By default only URLs whose sitemap lastModified falls within the last
 * ~25h are submitted (the daily delta, with an hour of cron-jitter
 * slack) — resubmitting all ~380 unchanged URLs every day reads as spam
 * to IndexNow. Pass `?full=1` for a deliberate full resubmit (e.g.
 * after a domain-wide change or an IndexNow key rotation).
 */
const RECENT_WINDOW_MS = 25 * 60 * 60 * 1000

export async function GET(req: Request) {
    // Fail CLOSED: if CRON_SECRET is unset OR the Authorization header does not
    // match, reject. Never allow this endpoint to be triggered by anyone simply
    // because the secret happens to be unconfigured.
    const secret = process.env.CRON_SECRET
    const auth = req.headers.get('authorization')
    if (!secret || auth !== `Bearer ${secret}`) {
        return Response.json({ error: 'unauthorized' }, { status: 401 })
    }

    const full = new URL(req.url).searchParams.get('full') === '1'
    const cutoff = Date.now() - RECENT_WINDOW_MS
    const urls = (await buildSitemapEntriesFromCMS())
        .filter((e) => {
            if (full) return true
            if (!e.lastModified) return false
            const d = new Date(e.lastModified)
            return !isNaN(d.getTime()) && d.getTime() >= cutoff
        })
        .map((e) => (typeof e.url === 'string' ? e.url : String(e.url)))
        .filter((u) => u.startsWith(`https://${HOST}`))

    // IndexNow accepts up to 10000 URLs per call, but 100 is a polite batch
    // that matches the existing /api/indexnow cap.
    const chunks: string[][] = []
    for (let i = 0; i < urls.length; i += 100) chunks.push(urls.slice(i, i + 100))

    const batches: Array<{ count: number; status: number; ok: boolean }> = []
    for (const chunk of chunks) {
        try {
            const r = await fetch(INDEXNOW_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                body: JSON.stringify({
                    host: HOST,
                    key: KEY,
                    keyLocation: KEY_LOCATION,
                    urlList: chunk,
                }),
                signal: AbortSignal.timeout(10_000),
            })
            batches.push({ count: chunk.length, status: r.status, ok: r.ok })
        } catch {
            batches.push({ count: chunk.length, status: 0, ok: false })
        }
    }

    return Response.json({ mode: full ? 'full' : 'recent', total: urls.length, batches })
}
