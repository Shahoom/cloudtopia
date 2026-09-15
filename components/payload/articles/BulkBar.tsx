'use client'

import { useCallback, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { AlertTriangle, ArchiveRestore, ChevronDown, CircleDot, Download, Languages, MoreHorizontal, RefreshCw, Search, Tag, Trash2 } from 'lucide-react'
import type { Category, Status, ViewKey } from './types.ts'
import { BULK_STATUS_OPTIONS, STATUS_DOT, STATUS_LABELS } from './types.ts'
import { categoryColor, cx, fmtNumber, plural } from './format.ts'
import { MenuItem, MenuLabel, MenuSep, Popover } from './Popover.tsx'
import { btn, Checkbox, Kbd, Spinner } from './ui.tsx'

export type BulkBusy = 'status' | 'category' | 'translate' | 'recalc' | 'export' | 'trash' | 'restore' | 'destroy' | null
export type ConfirmKind = 'trash' | 'destroy'

function MenuButton({
  label,
  icon,
  iconOnly,
  disabled,
  busy,
  width = 224,
  children,
}: {
  label: string
  icon: ReactNode
  iconOnly?: boolean
  disabled?: boolean
  busy?: boolean
  width?: number
  children: (close: () => void) => ReactNode
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  return (
    <>
      <button
        ref={ref}
        type="button"
        className={cx(btn('sm', 'ghost'), iconOnly && 'is-icon')}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={iconOnly ? label : undefined}
        title={iconOnly ? label : undefined}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
      >
        {busy ? <Spinner /> : icon}
        {!iconOnly && label}
        {!iconOnly && <ChevronDown size={12} className="ct-articles-caret" aria-hidden />}
      </button>
      <Popover open={open} anchorRef={ref} onClose={close} width={width} label={label}>
        {children(close)}
      </Popover>
    </>
  )
}

function CategoryPicker({ categories, onPick }: { categories: Category[] | null; onPick: (id: string) => void }) {
  const [term, setTerm] = useState('')
  const needle = term.trim().toLowerCase()
  const shown = (categories ?? []).filter((c) => !needle || c.name.toLowerCase().includes(needle))
  return (
    <>
      {(categories?.length ?? 0) > 8 && (
        <div className="ct-articles-pop-search">
          <Search size={13} aria-hidden />
          <input data-autofocus value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Find a category…" aria-label="Find a category" />
        </div>
      )}
      <div className="ct-articles-pop-list">
        {categories === null ? (
          <div className="ct-articles-pop-empty">Loading categories…</div>
        ) : shown.length === 0 ? (
          <div className="ct-articles-pop-empty">No categories found</div>
        ) : (
          shown.map((c) => (
            <MenuItem
              key={c.id}
              icon={<span className="ct-articles-sq" style={{ background: categoryColor(c.slug || c.id) }} />}
              hint={c.locale === 'ar' ? 'AR' : undefined}
              onSelect={() => onPick(c.id)}
            >
              {c.name}
            </MenuItem>
          ))
        )}
      </div>
    </>
  )
}

export function BulkBar({
  view,
  count,
  totalMatching,
  selectingAll,
  categories,
  translatable,
  busy,
  progress,
  confirm,
  onSelectAll,
  onClear,
  onConfirm,
  onStatus,
  onCategory,
  onTranslate,
  onRecalc,
  onExport,
  onTrash,
  onRestore,
  onDestroy,
}: {
  view: ViewKey
  count: number
  totalMatching: number
  selectingAll: boolean
  categories: Category[] | null
  translatable: number
  busy: BulkBusy
  progress: { done: number; total: number } | null
  confirm: ConfirmKind | null
  onSelectAll: () => void
  onClear: () => void
  onConfirm: (kind: ConfirmKind | null) => void
  onStatus: (status: Status) => void
  onCategory: (id: string) => void
  onTranslate: () => void
  onRecalc: () => void
  onExport: () => void
  onTrash: () => void
  onRestore: () => void
  onDestroy: () => void
}) {
  const locked = busy !== null
  const allSelected = totalMatching > 0 && count >= totalMatching

  return (
    <div className={cx('ct-articles-bulk', confirm && 'is-confirm')} role="region" aria-label="Bulk actions">
      <Checkbox state={allSelected ? 'on' : 'mixed'} onToggle={onClear} label="Clear selection" />
      <span className="ct-articles-bulk-n">
        <b>{fmtNumber(count)}</b> selected
      </span>
      {!allSelected ? (
        <button type="button" className="ct-articles-link" onClick={onSelectAll} disabled={selectingAll || locked}>
          {selectingAll ? 'Selecting…' : `Select all ${fmtNumber(totalMatching)}`}
        </button>
      ) : (
        <span className="ct-articles-bulk-all">All matching articles</span>
      )}
      <span className="ct-articles-vr" aria-hidden />

      {confirm ? (
        <div className="ct-articles-bulk-confirm" role="alertdialog" aria-live="assertive">
          <AlertTriangle size={14} aria-hidden />
          <span className="ct-articles-bulk-q">
            {confirm === 'trash'
              ? `Move ${plural(count, 'article')} to trash? You can restore them from Trash.`
              : `Permanently delete ${plural(count, 'article')}? This can’t be undone.`}
          </span>
          <button type="button" className={btn('sm', 'ghost')} onClick={() => onConfirm(null)} disabled={locked}>
            Cancel
          </button>
          <button
            type="button"
            className={cx(btn('sm'), 'is-danger-solid')}
            autoFocus
            onClick={confirm === 'trash' ? onTrash : onDestroy}
            disabled={locked}
          >
            {locked ? <Spinner /> : <Trash2 size={14} aria-hidden />}
            {confirm === 'trash' ? 'Move to trash' : 'Delete permanently'}
          </button>
        </div>
      ) : view === 'trash' ? (
        <>
          <button type="button" className={btn('sm', 'ghost')} onClick={onRestore} disabled={locked}>
            {busy === 'restore' ? <Spinner /> : <ArchiveRestore size={14} aria-hidden />}
            Restore
          </button>
          <button type="button" className={btn('sm', 'ghost', 'danger')} onClick={() => onConfirm('destroy')} disabled={locked}>
            <Trash2 size={14} aria-hidden />
            Delete permanently
          </button>
        </>
      ) : (
        <>
          <MenuButton label="Change status" icon={<CircleDot size={14} aria-hidden />} busy={busy === 'status'} disabled={locked}>
            {(close) => (
              <>
                {BULK_STATUS_OPTIONS.map((s) => (
                  <MenuItem
                    key={s}
                    icon={<span className="ct-articles-dot" style={{ background: STATUS_DOT[s] }} />}
                    onSelect={() => {
                      close()
                      onStatus(s)
                    }}
                  >
                    {STATUS_LABELS[s]}
                  </MenuItem>
                ))}
                <MenuSep />
                <MenuLabel>Scheduling needs a date per article, so set it in the editor.</MenuLabel>
              </>
            )}
          </MenuButton>
          <MenuButton label="Change category" icon={<Tag size={14} aria-hidden />} busy={busy === 'category'} disabled={locked} width={256}>
            {(close) => (
              <CategoryPicker
                categories={categories}
                onPick={(id) => {
                  close()
                  onCategory(id)
                }}
              />
            )}
          </MenuButton>
          {translatable > 0 && (
            <button type="button" className={btn('sm', 'ghost')} onClick={onTranslate} disabled={locked} title="Creates blank drafts in the missing language">
              {busy === 'translate' ? <Spinner /> : <Languages size={14} aria-hidden />}
              Add {translatable === 1 ? 'missing translation' : `${fmtNumber(translatable)} missing translations`}
            </button>
          )}
          <MenuButton label="More actions" icon={<MoreHorizontal size={14} aria-hidden />} iconOnly busy={busy === 'recalc' || busy === 'export'} disabled={locked}>
            {(close) => (
              <>
                <MenuItem
                  icon={<RefreshCw size={14} />}
                  onSelect={() => {
                    close()
                    onRecalc()
                  }}
                >
                  Recalculate SEO scores
                </MenuItem>
                <MenuItem
                  icon={<Download size={14} />}
                  onSelect={() => {
                    close()
                    onExport()
                  }}
                >
                  Export selection as JSON
                </MenuItem>
              </>
            )}
          </MenuButton>
          <button type="button" className={btn('sm', 'ghost', 'danger')} onClick={() => onConfirm('trash')} disabled={locked}>
            <Trash2 size={14} aria-hidden />
            Move to trash
          </button>
        </>
      )}

      <span className="ct-articles-sp" />
      {progress ? (
        <span className="ct-articles-bulk-prog" aria-live="polite">
          <Spinner />
          {fmtNumber(progress.done)} / {fmtNumber(progress.total)}
        </span>
      ) : (
        <span className="ct-articles-bulk-hint">
          <Kbd>Esc</Kbd> to clear
        </span>
      )}
    </div>
  )
}
