'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode, RefObject } from 'react'
import { BarChart3, KanbanSquare, Languages, List, Menu, Search, StretchHorizontal, Tag, Trash2, Users, X } from 'lucide-react'
import type { Author, Category, Density, LangFilter, Layout, SeoFilter, ViewKey, WorkspaceQuery } from './types.ts'
import { VIEWS } from './types.ts'
import { cx, fmtNumber } from './format.ts'
import { MenuItem, MenuLabel, MenuSep, Popover } from './Popover.tsx'
import { Avatar, Kbd } from './ui.tsx'

// ---------------------------------------------------------------- saved-view tabs

export function ViewTabs({
  view,
  counts,
  panelId,
  onChange,
}: {
  view: ViewKey
  counts: Record<ViewKey, number> | null
  panelId: string
  onChange: (view: ViewKey) => void
}) {
  function onKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    const tabs = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'))
    const i = tabs.indexOf(document.activeElement as HTMLButtonElement)
    if (i < 0) return
    e.preventDefault()
    const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length]
    next?.focus()
    next?.click()
  }

  return (
    <div className="ct-articles-tabs" role="tablist" aria-label="Article views" onKeyDown={onKeyDown}>
      {VIEWS.map((v) => {
        const on = v.key === view
        return (
          <button
            key={v.key}
            type="button"
            role="tab"
            aria-selected={on}
            aria-controls={panelId}
            tabIndex={on ? 0 : -1}
            className={cx('ct-articles-tab', on && 'is-on')}
            onClick={() => onChange(v.key)}
          >
            {v.key === 'trash' ? (
              <Trash2 size={12} className="ct-articles-tab-ic" aria-hidden />
            ) : v.dot ? (
              <span className="ct-articles-tab-d" style={{ background: v.dot }} aria-hidden />
            ) : null}
            {v.label}
            <span className="ct-articles-tab-c">{counts ? fmtNumber(counts[v.key]) : '–'}</span>
          </button>
        )
      })}
    </div>
  )
}

// ---------------------------------------------------------------- filter chips

function Chip({
  icon,
  label,
  value,
  active,
  onClear,
  width = 240,
  children,
}: {
  icon: ReactNode
  label: string
  value: ReactNode
  active: boolean
  onClear: () => void
  width?: number
  children: (close: () => void) => ReactNode
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  return (
    <span className={cx('ct-articles-chip', active && 'is-on', open && 'is-open')}>
      <button
        ref={ref}
        type="button"
        className="ct-articles-chip-btn"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="ct-articles-chip-ic" aria-hidden>
          {icon}
        </span>
        {active ? (
          <>
            <span className="ct-articles-chip-k">{label}</span>
            <b>{value}</b>
          </>
        ) : (
          label
        )}
      </button>
      {active && (
        <button type="button" className="ct-articles-chip-x" aria-label={`Clear ${label.toLowerCase()} filter`} onClick={onClear}>
          <X size={12} aria-hidden />
        </button>
      )}
      <Popover open={open} anchorRef={ref} onClose={close} width={width} label={`${label} filter`}>
        {children(close)}
      </Popover>
    </span>
  )
}

function PopSearch({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="ct-articles-pop-search">
      <Search size={13} aria-hidden />
      <input data-autofocus value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} aria-label={placeholder} />
    </div>
  )
}

function toggleId(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
}

function CategoryChip({ categories, selected, onChange }: { categories: Category[] | null; selected: string[]; onChange: (ids: string[]) => void }) {
  const [term, setTerm] = useState('')
  const byId = useMemo(() => new Map((categories ?? []).map((c) => [c.id, c])), [categories])
  const needle = term.trim().toLowerCase()
  const shown = (categories ?? []).filter((c) => !needle || c.name.toLowerCase().includes(needle))
  const value = selected.length === 1 ? byId.get(selected[0])?.name ?? '1 selected' : `${selected.length} selected`
  return (
    <Chip icon={<Tag size={14} />} label="Category" value={value} active={selected.length > 0} onClear={() => onChange([])} width={256}>
      {() => (
        <>
          {(categories?.length ?? 0) > 8 && <PopSearch value={term} onChange={setTerm} placeholder="Filter categories…" />}
          <div className="ct-articles-pop-list">
            {categories === null ? (
              <div className="ct-articles-pop-empty">Loading categories…</div>
            ) : shown.length === 0 ? (
              <div className="ct-articles-pop-empty">No categories found</div>
            ) : (
              shown.map((c) => (
                <MenuItem
                  key={c.id}
                  role="menuitemcheckbox"
                  checked={selected.includes(c.id)}
                  hint={c.locale === 'ar' ? 'AR' : undefined}
                  onSelect={() => onChange(toggleId(selected, c.id))}
                >
                  {c.name}
                </MenuItem>
              ))
            )}
          </div>
          {selected.length > 0 && (
            <>
              <MenuSep />
              <MenuItem onSelect={() => onChange([])}>Clear selection</MenuItem>
            </>
          )}
        </>
      )}
    </Chip>
  )
}

function AuthorChip({ authors, selected, onChange }: { authors: Author[] | null; selected: string[]; onChange: (ids: string[]) => void }) {
  const byId = useMemo(() => new Map((authors ?? []).map((a) => [a.id, a])), [authors])
  const value = selected.length === 1 ? byId.get(selected[0])?.name ?? '1 selected' : `${selected.length} selected`
  return (
    <Chip icon={<Users size={14} />} label="Author" value={value} active={selected.length > 0} onClear={() => onChange([])} width={248}>
      {() => (
        <div className="ct-articles-pop-list">
          {authors === null ? (
            <div className="ct-articles-pop-empty">Loading authors…</div>
          ) : authors.length === 0 ? (
            <div className="ct-articles-pop-empty">No authors yet</div>
          ) : (
            authors.map((a) => (
              <MenuItem key={a.id} role="menuitemcheckbox" checked={selected.includes(a.id)} onSelect={() => onChange(toggleId(selected, a.id))}>
                <span className="ct-articles-mi-av">
                  <Avatar id={a.id} name={a.name} src={a.avatar} size={18} />
                  <span className="ct-articles-trunc">{a.name}</span>
                </span>
              </MenuItem>
            ))
          )}
        </div>
      )}
    </Chip>
  )
}

const LANG_OPTIONS: Array<{ value: LangFilter; label: string; short: string }> = [
  { value: '', label: 'EN + AR', short: 'EN + AR' },
  { value: 'en', label: 'English only', short: 'EN' },
  { value: 'ar', label: 'Arabic only', short: 'AR' },
  { value: 'missing', label: 'Missing a translation', short: 'Missing translation' },
]

function LanguageChip({ value, inTrash, onChange }: { value: LangFilter; inTrash: boolean; onChange: (v: LangFilter) => void }) {
  const current = LANG_OPTIONS.find((o) => o.value === value) ?? LANG_OPTIONS[0]
  return (
    <Chip icon={<Languages size={14} />} label="Language" value={current.short} active={value !== ''} onClear={() => onChange('')} width={236}>
      {(close) => (
        <>
          {LANG_OPTIONS.map((o) => (
            <MenuItem
              key={o.value || 'all'}
              role="menuitemradio"
              checked={o.value === value}
              disabled={o.value === 'missing' && inTrash}
              onSelect={() => {
                onChange(o.value)
                close()
              }}
            >
              {o.label}
            </MenuItem>
          ))}
          <MenuLabel>Each article is an EN ⇄ AR pair that shares one slug.</MenuLabel>
        </>
      )}
    </Chip>
  )
}

const SEO_OPTIONS: Array<{ value: Exclude<SeoFilter, ''>; label: string; range: string; color: string }> = [
  { value: 'high', label: 'Good', range: '≥ 80', color: '#10b981' },
  { value: 'mid', label: 'Needs work', range: '50–79', color: '#0ea5e9' },
  { value: 'low', label: 'Poor', range: '< 50', color: '#e11d48' },
]

function SeoChip({ value, onChange }: { value: SeoFilter; onChange: (v: SeoFilter) => void }) {
  const current = SEO_OPTIONS.find((o) => o.value === value)
  return (
    <Chip icon={<BarChart3 size={14} />} label="SEO score" value={current?.range ?? ''} active={Boolean(current)} onClear={() => onChange('')} width={216}>
      {(close) => (
        <>
          {SEO_OPTIONS.map((o) => (
            <MenuItem
              key={o.value}
              role="menuitemradio"
              checked={o.value === value}
              icon={<span className="ct-articles-dot" style={{ background: o.color }} />}
              hint={o.value === value ? undefined : o.range}
              onSelect={() => {
                onChange(o.value === value ? '' : o.value)
                close()
              }}
            >
              {o.label}
            </MenuItem>
          ))}
        </>
      )}
    </Chip>
  )
}

// ---------------------------------------------------------------- toolbar

type FilterPatch = Partial<Pick<WorkspaceQuery, 'categories' | 'authors' | 'lang' | 'seo'>>

export function FilterBar({
  query,
  qInput,
  onQInput,
  searchRef,
  categories,
  authors,
  onFilters,
  onClearAll,
  density,
  onDensity,
  onLayout,
}: {
  query: WorkspaceQuery
  qInput: string
  onQInput: (value: string) => void
  searchRef: RefObject<HTMLInputElement | null>
  categories: Category[] | null
  authors: Author[] | null
  onFilters: (patch: FilterPatch) => void
  onClearAll: () => void
  density: Density
  onDensity: (d: Density) => void
  onLayout: (l: Layout) => void
}) {
  const hasFilters = Boolean(qInput.trim() || query.categories.length || query.authors.length || query.lang || query.seo)
  const table = query.layout === 'table'

  return (
    <div className="ct-articles-bar">
      <label className="ct-articles-search">
        <Search size={14} aria-hidden />
        <input
          ref={searchRef}
          value={qInput}
          onChange={(e) => onQInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== 'Escape') return
            e.stopPropagation()
            if (qInput) onQInput('')
            else e.currentTarget.blur()
          }}
          placeholder="Search titles and slugs…"
          aria-label="Search articles by title or slug"
          enterKeyHint="search"
          autoComplete="off"
          spellCheck={false}
        />
        {qInput ? (
          <button type="button" className="ct-articles-search-x" aria-label="Clear search" onClick={() => onQInput('')}>
            <X size={12} aria-hidden />
          </button>
        ) : (
          <Kbd>/</Kbd>
        )}
      </label>

      <CategoryChip categories={categories} selected={query.categories} onChange={(ids) => onFilters({ categories: ids })} />
      <LanguageChip value={query.lang} inTrash={query.view === 'trash'} onChange={(lang) => onFilters({ lang })} />
      <AuthorChip authors={authors} selected={query.authors} onChange={(ids) => onFilters({ authors: ids })} />
      <SeoChip value={query.seo} onChange={(seo) => onFilters({ seo })} />
      {hasFilters && (
        <button type="button" className="ct-articles-link is-muted" onClick={onClearAll}>
          Clear filters
        </button>
      )}

      <span className="ct-articles-sp" />

      <div className="ct-articles-seg" role="group" aria-label="Layout">
        <button type="button" className={cx(table && 'is-on')} aria-pressed={table} onClick={() => onLayout('table')}>
          <List size={14} aria-hidden />
          <span className="ct-articles-seg-t">Table</span>
        </button>
        <button type="button" className={cx(!table && 'is-on')} aria-pressed={!table} onClick={() => onLayout('board')}>
          <KanbanSquare size={14} aria-hidden />
          <span className="ct-articles-seg-t">Board</span>
        </button>
      </div>
      <div className="ct-articles-seg" role="group" aria-label="Row density">
        <button
          type="button"
          className={cx(density === 'comfortable' && 'is-on')}
          aria-pressed={density === 'comfortable'}
          aria-label="Comfortable rows"
          title="Comfortable rows"
          disabled={!table}
          onClick={() => onDensity('comfortable')}
        >
          <StretchHorizontal size={14} aria-hidden />
        </button>
        <button
          type="button"
          className={cx(density === 'compact' && 'is-on')}
          aria-pressed={density === 'compact'}
          aria-label="Compact rows"
          title="Compact rows"
          disabled={!table}
          onClick={() => onDensity('compact')}
        >
          <Menu size={14} aria-hidden />
        </button>
      </div>
    </div>
  )
}
