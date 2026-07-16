import { categoryAccent, categoryGlyphName, categoryGlyphs } from './categoryColor'

type CategoryLike = { name?: string | null; slug?: string | null; color?: string | null } | null | undefined
type Size = 'hero' | 'lead' | 'card' | 'thumb'

const SIZES: Record<Size, { pad: number; title: number; glyph: number; kicker: boolean; wm: boolean }> = {
  hero: { pad: 36, title: 34, glyph: 150, kicker: true, wm: true },
  lead: { pad: 22, title: 24, glyph: 104, kicker: true, wm: true },
  card: { pad: 16, title: 18, glyph: 84, kicker: true, wm: true },
  thumb: { pad: 10, title: 12, glyph: 46, kicker: false, wm: true },
}

// Editorial fallback used anywhere a post has no cover image. Deterministic from
// the post's category so cover-less posts look designed, never broken. Fills its
// positioned parent by default (drop into an existing aspect-ratio container with
// className="absolute inset-0").
export function TypographicCover({
  title,
  category,
  size = 'card',
  className = '',
}: {
  title: string
  category?: CategoryLike
  size?: Size
  className?: string
}) {
  const color = categoryAccent(category)
  const Glyph = categoryGlyphs[categoryGlyphName(category)]
  const s = SIZES[size]

  return (
    <div
      aria-hidden={false}
      className={`ed-cover ${className}`}
      style={{ height: '100%', width: '100%', padding: s.pad, borderRadius: 'inherit' }}
    >
      <span className="ed-cover__rule" style={{ background: color }} />
      <Glyph className="ed-cover__glyph" size={s.glyph} style={{ color, opacity: 0.1 }} aria-hidden="true" />
      {s.kicker && category?.name && (
        <span className="ed-kicker" style={{ color, marginBottom: 8 }}>
          {category.name}
        </span>
      )}
      <span className="ed-cover__title" style={{ fontSize: s.title }}>
        {title}
      </span>
      {s.wm && <span className="ed-cover__wm">CloudTopia</span>}
    </div>
  )
}
