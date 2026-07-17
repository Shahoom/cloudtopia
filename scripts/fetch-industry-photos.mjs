import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

/**
 * Curated Unsplash imagery for Industry Worlds. Two steps so photos are chosen
 * by eye, not by "whatever ranked first":
 *
 *   UNSPLASH_ACCESS_KEY=xxx node scripts/fetch-industry-photos.mjs sheet <slug> "<query>" [cacheDir]
 *     -> 1 API call. Writes a numbered contact sheet + a candidates JSON.
 *
 *   UNSPLASH_ACCESS_KEY=xxx node scripts/fetch-industry-photos.mjs pick <slug> 2,5,8 [cacheDir]
 *     -> downloads only the chosen candidates into public/images/industries/<slug>/
 *        as <slug>-1.jpg.., appends CREDITS.md, and reports each download to
 *        Unsplash (their API guideline).
 *
 * The access key is read from the environment and never written to disk.
 */
const KEY = process.env.UNSPLASH_ACCESS_KEY
if (!KEY) {
  console.error('Missing UNSPLASH_ACCESS_KEY env var')
  process.exit(1)
}

const [cmd, slug, arg, cacheDirRaw] = process.argv.slice(2)
const cacheDir = cacheDirRaw || '/tmp'
const root = process.cwd()
const jsonPath = join(cacheDir, `candidates-${slug}.json`)
const sheetPath = join(cacheDir, `sheet-${slug}.jpg`)

const api = async (url) => {
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${KEY}` } })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json()
}
const grab = async (url) => Buffer.from(await (await fetch(url)).arrayBuffer())

if (cmd === 'sheet') {
  const data = await api(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(arg)}&per_page=30&orientation=landscape&content_filter=high`,
  )
  const picks = (data.results || [])
    .filter((p) => p.width >= 2000 && p.width / p.height >= 1.3)
    .slice(0, 9)
  if (!picks.length) {
    console.error(`No suitable landscape results for "${arg}"`)
    process.exit(1)
  }

  const W = 380
  const H = 250
  const tiles = []
  for (const [i, p] of picks.entries()) {
    const buf = await grab(`${p.urls.raw}&w=${W}&h=${H}&fit=crop&q=70&fm=jpg`)
    const badge = Buffer.from(
      `<svg width="${W}" height="${H}"><rect x="0" y="0" width="46" height="34" fill="#000" opacity="0.75"/><text x="23" y="24" font-family="Arial" font-size="20" font-weight="bold" fill="#fff" text-anchor="middle">${i + 1}</text></svg>`,
    )
    tiles.push(
      await sharp(buf).resize(W, H, { fit: 'cover' }).composite([{ input: badge, top: 0, left: 0 }]).jpeg().toBuffer(),
    )
  }
  const cols = 3
  const rows = Math.ceil(tiles.length / cols)
  await sharp({ create: { width: W * cols, height: H * rows, channels: 3, background: '#111' } })
    .composite(tiles.map((input, i) => ({ input, left: (i % cols) * W, top: Math.floor(i / cols) * H })))
    .jpeg({ quality: 80 })
    .toFile(sheetPath)

  await writeFile(
    jsonPath,
    JSON.stringify(
      picks.map((p) => ({
        id: p.id,
        raw: p.urls.raw,
        download_location: p.links.download_location,
        html: p.links.html,
        alt: p.alt_description,
        name: p.user.name,
        profile: p.user.links.html,
      })),
      null,
      2,
    ),
  )
  console.log(picks.map((p, i) => `${i + 1}. ${(p.alt_description || '').slice(0, 62)} — ${p.user.name}`).join('\n'))
  console.log(`\nsheet: ${sheetPath}`)
  process.exit(0)
}

if (cmd === 'pick') {
  if (!existsSync(jsonPath)) {
    console.error(`No candidates cached for "${slug}". Run the sheet step first.`)
    process.exit(1)
  }
  const candidates = JSON.parse(await readFile(jsonPath, 'utf8'))
  const indices = String(arg)
    .split(',')
    .map((n) => Number(n.trim()))
    .filter((n) => n >= 1 && n <= candidates.length)
  if (!indices.length) {
    console.error('Give 1-based indices, e.g. "2,5,8"')
    process.exit(1)
  }

  const outDir = join(root, 'public/images/industries', slug)
  await mkdir(outDir, { recursive: true })
  const credits = []
  for (const [i, idx] of indices.entries()) {
    const p = candidates[idx - 1]
    const name = `${slug}-${i + 1}.jpg`
    const buf = await grab(`${p.raw}&w=1800&q=85&fm=jpg&fit=max`)
    await sharp(buf)
      .resize({ width: 1800, withoutEnlargement: true })
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toFile(join(outDir, name))
    try {
      await api(p.download_location)
    } catch {
      /* non-fatal */
    }
    credits.push(
      `- ${name} — photo by [${p.name}](${p.profile}?utm_source=cloudtopia&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=cloudtopia&utm_medium=referral) (${p.html})`,
    )
    console.log(`wrote images/industries/${slug}/${name}  <- #${idx} by ${p.name}`)
  }
  await writeFile(
    join(outDir, 'CREDITS.md'),
    `# ${slug} imagery credits\n\nPhotos used under the [Unsplash License](https://unsplash.com/license).\n\n${credits.join('\n')}\n`,
  )
  console.log(`\ncredits -> public/images/industries/${slug}/CREDITS.md`)
  process.exit(0)
}

console.error('Usage: <sheet|pick> <slug> <query|indices> [cacheDir]')
process.exit(1)
