/**
 * IndexNow API endpoint.
 *
 * IndexNow is a protocol from Microsoft that pushes URL changes to Bing,
 * Yandex, Seznam.cz, Naver, and (since 2024) some Google partners. Instead
 * of waiting for crawlers to discover updated content, you POST a list of
 * URLs and the change is reflected within minutes.
 *
 * Usage (server-side, after publishing/updating an insight):
 *
 *   await fetch('https://cloudtopia.net/api/indexnow', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({
 *       urls: ['https://cloudtopia.net/insights/my-new-post']
 *     }),
 *   })
 *
 * For now this is mainly a manual tool — you can curl it to push freshly
 * updated URLs without redeploying. In the future you can wire it into a
 * post-publish hook.
 *
 * The verification key file lives at:
 *   /public/54966996323336af549028a7aa9bdb8c.txt
 */

const HOST = 'cloudtopia.net'
const KEY = '54966996323336af549028a7aa9bdb8c'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`

// IndexNow accepts submissions to any participating engine — they share the
// data internally. We use Bing as the primary endpoint.
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/IndexNow'

export async function POST(req: Request) {
    let body: { urls?: string[] }
    try {
        body = await req.json()
    } catch {
        return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const urls = Array.isArray(body.urls) ? body.urls.filter((u) => typeof u === 'string') : []
    if (urls.length === 0) {
        return Response.json({ error: 'No URLs provided. Send { urls: [...] }.' }, { status: 400 })
    }

    // IndexNow caps batches at 10,000; we'll cap at 100 to stay polite.
    const safeUrls = urls.slice(0, 100)

    // Validate URLs match the host — IndexNow rejects mixed-host submissions.
    const invalidUrls = safeUrls.filter((u) => {
        try {
            return new URL(u).hostname !== HOST
        } catch {
            return true
        }
    })
    if (invalidUrls.length) {
        return Response.json(
            { error: `URLs must be on ${HOST}`, invalid: invalidUrls },
            { status: 400 },
        )
    }

    try {
        const response = await fetch(INDEXNOW_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({
                host: HOST,
                key: KEY,
                keyLocation: KEY_LOCATION,
                urlList: safeUrls,
            }),
            // IndexNow can be slow; give it 8s.
            signal: AbortSignal.timeout(8000),
        })

        // 200/202 = accepted; 422 = some URLs rejected (still partial success)
        return Response.json({
            ok: response.ok,
            status: response.status,
            submitted: safeUrls.length,
        })
    } catch (err) {
        return Response.json(
            { error: 'IndexNow submission failed', detail: String(err) },
            { status: 502 },
        )
    }
}

// Quick GET for sanity checks
export function GET() {
    return Response.json({
        endpoint: 'CloudTopia IndexNow proxy',
        host: HOST,
        keyLocation: KEY_LOCATION,
        usage: 'POST { urls: [...] }',
    })
}
