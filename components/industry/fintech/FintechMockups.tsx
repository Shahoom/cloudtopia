import type { ReactNode } from 'react'
import {
  Activity,
  ArrowDownLeft,
  ArrowUpRight,
  BellRing,
  Check,
  CheckCircle2,
  CreditCard,
  FileCheck2,
  Key,
  Lock,
  ScrollText,
  Server,
  ShieldCheck,
  User,
  Wallet,
} from 'lucide-react'

import type { Locale } from '@/lib/i18n/config'

import styles from './fintech-industry.module.css'

/**
 * Hand-built product-UI mockups for the FinTech Industry World.
 *
 * These replace the Paynext template's gray dimension placeholders. They are
 * plain static markup + CSS in the world's own violet palette — no bitmaps, no
 * network weight, crisp at any size.
 *
 * Three rules hold across every mock in this file:
 *
 * 1. DECORATIVE. Each mock is wrapped in a `MockFrame` that carries
 *    `aria-hidden="true"`. They illustrate the adjacent heading + copy and add
 *    nothing an assistive-tech user needs, so they stay out of the a11y tree.
 * 2. NO FABRICATED CLAIMS. Every number that could read as a metric or a
 *    currency figure is rendered masked (`••••`) or as a neutral redacted bar.
 *    Charts are unlabelled shape only. Merchants are transaction *types*
 *    ("Card payment"), never brand or bank names. Nothing here asserts a
 *    performance figure or a client outcome.
 * 3. SCALE-INVARIANT. `MockFrame` sets `container-type: inline-size` plus the
 *    aspect ratio of the placeholder it replaces, and every inner dimension is
 *    expressed in `cqw`. The mock therefore scales exactly like the `<img>` it
 *    replaced, so the hero cluster, mosaics, and layered stack keep their shape.
 */

/* ------------------------------------------------------------------ Copy */

/**
 * Bilingual labels. The mocks depict product UI, and product UI on the Arabic
 * locale is Arabic — so these are translated even though the mocks are
 * `aria-hidden`. Deliberately generic: states and record types only.
 */
const mockCopy = {
  en: {
    accounts: 'Accounts',
    balance: 'Available balance',
    cardPayment: 'Card payment',
    bankTransfer: 'Bank transfer',
    payout: 'Payout',
    refund: 'Refund',
    settled: 'Settled',
    pending: 'Pending',
    cleared: 'Cleared',
    paymentSent: 'Payment sent',
    volume: 'Volume',
    checkout: 'Checkout',
    amount: 'Amount',
    pay: 'Pay',
    ledger: 'Ledger',
    debit: 'Dr',
    credit: 'Cr',
    decision: 'Credit decision',
    eligibility: 'Eligibility',
    scoring: 'Scoring',
    repayment: 'Repayment',
    inReview: 'In review',
    security: 'Security',
    encrypted: 'Encrypted',
    accessRole: 'Access role',
    keyRotation: 'Key rotation',
    auditTrail: 'Audit trail',
    analytics: 'Analytics',
    throughput: 'Throughput',
    latency: 'Latency',
    exceptions: 'Exceptions',
    instances: 'Instances',
    events: 'Events',
    alert: 'Alert',
    resolved: 'Resolved',
    layers: 'Platform layers',
    encryption: 'Encryption',
    accessControl: 'Access control',
    keyManagement: 'Key management',
    handoff: 'Handoff',
    owner: 'Owner',
    evidence: 'Evidence',
    discovery: 'Discovery',
    architecture: 'Architecture',
    secureBuild: 'Secure build',
    integrate: 'Integrate',
  },
  ar: {
    accounts: 'الحسابات',
    balance: 'الرصيد المتاح',
    cardPayment: 'دفعة ببطاقة',
    bankTransfer: 'تحويل بنكي',
    payout: 'صرف مستحقات',
    refund: 'استرداد',
    settled: 'تمت التسوية',
    pending: 'قيد المعالجة',
    cleared: 'مُقاصّة',
    paymentSent: 'تم إرسال الدفعة',
    volume: 'الحجم',
    checkout: 'إتمام الدفع',
    amount: 'المبلغ',
    pay: 'ادفعوا',
    ledger: 'دفتر الأستاذ',
    debit: 'مدين',
    credit: 'دائن',
    decision: 'قرار ائتماني',
    eligibility: 'الأهلية',
    scoring: 'التقييم',
    repayment: 'السداد',
    inReview: 'قيد المراجعة',
    security: 'الأمان',
    encrypted: 'مشفَّر',
    accessRole: 'دور الوصول',
    keyRotation: 'تدوير المفاتيح',
    auditTrail: 'سجل التدقيق',
    analytics: 'التحليلات',
    throughput: 'معدّل المعالجة',
    latency: 'زمن الاستجابة',
    exceptions: 'الاستثناءات',
    instances: 'النسخ',
    events: 'الأحداث',
    alert: 'تنبيه',
    resolved: 'تمت المعالجة',
    layers: 'طبقات المنصة',
    encryption: 'التشفير',
    accessControl: 'التحكم بالوصول',
    keyManagement: 'إدارة المفاتيح',
    handoff: 'التسليم',
    owner: 'المالك',
    evidence: 'الأدلة',
    discovery: 'الاكتشاف',
    architecture: 'الهندسة',
    secureBuild: 'بناء آمن',
    integrate: 'التكامل',
  },
} as const satisfies Record<Locale, Record<string, string>>

/** Masked value glyphs — never a real-looking figure. */
const MASK_AMOUNT = '••••'
const MASK_CARD = '•••• •••• •••• ••••'

export type MockProps = { locale: Locale }

/* ------------------------------------------------------------ Primitives */

type MockFrameProps = {
  /** Aspect ratio of the placeholder this mock replaces, e.g. "450 / 702". */
  ratio: string
  children: ReactNode
  tone?: 'light' | 'dark'
}

/**
 * Every mock's root. Carries the decorative flag, the aspect ratio, and the
 * container context that all inner `cqw` sizing resolves against.
 */
function MockFrame({ ratio, children, tone = 'light' }: MockFrameProps) {
  return (
    <div
      aria-hidden="true"
      className={[styles.mock, tone === 'dark' ? styles.mockDark : null]
        .filter(Boolean)
        .join(' ')}
      style={{ aspectRatio: ratio }}
    >
      {children}
    </div>
  )
}

/** Window chrome: three dots + a title, matching the house style. */
function MockChrome({ title, icon }: { title: string; icon?: ReactNode }) {
  return (
    <div className={styles.mockChrome}>
      <span className={styles.mockDot} />
      <span className={styles.mockDot} />
      <span className={styles.mockDot} />
      <strong className={styles.mockChromeTitle}>
        {icon ? <span className={styles.mockChromeIcon}>{icon}</span> : null}
        {title}
      </strong>
    </div>
  )
}

/** A redacted value — stands in for data without asserting one. */
function MockBar({ width, strong = false }: { width: number; strong?: boolean }) {
  return (
    <span
      className={[styles.mockBar, strong ? styles.mockBarStrong : null]
        .filter(Boolean)
        .join(' ')}
      style={{ inlineSize: `${width}%` }}
    />
  )
}

/** State chip. `tone` differentiates settled/active from pending/idle. */
function MockPill({ label, tone = 'on' }: { label: string; tone?: 'on' | 'off' }) {
  return (
    <span
      className={[styles.mockPill, tone === 'off' ? styles.mockPillMuted : null]
        .filter(Boolean)
        .join(' ')}
    >
      <span className={styles.mockPillDot} />
      {label}
    </span>
  )
}

/** Unlabelled bar chart. Shape only — no axis, no numbers, no claim. */
function MockChart({ bars }: { bars: readonly number[] }) {
  return (
    <div className={styles.mockChart}>
      {bars.map((height, index) => (
        <span
          className={styles.mockChartBar}
          key={index}
          style={{ blockSize: `${height}%` }}
        />
      ))}
    </div>
  )
}

/** Unlabelled area/line chart drawn as an inline SVG path. */
function MockArea() {
  return (
    <svg
      className={styles.mockArea}
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      focusable="false"
    >
      <path
        className={styles.mockAreaFill}
        d="M0 32 L12 26 L25 29 L38 18 L50 22 L63 12 L75 15 L88 7 L100 10 L100 40 L0 40 Z"
      />
      <path
        className={styles.mockAreaLine}
        d="M0 32 L12 26 L25 29 L38 18 L50 22 L63 12 L75 15 L88 7 L100 10"
      />
    </svg>
  )
}

/* ------------------------------------------------------- Hero cluster ×3 */

const WALLET_ROWS = [
  { key: 'cardPayment', status: 'settled', out: true },
  { key: 'bankTransfer', status: 'cleared', out: false },
  { key: 'payout', status: 'pending', out: true },
  { key: 'refund', status: 'settled', out: false },
] as const

/**
 * Hero — large card (was hero_lg.webp, 450×702).
 * A wallet / account screen: balance card, masked card number, ledger rows.
 */
export function FintechWalletMock({ locale }: MockProps) {
  const t = mockCopy[locale]
  return (
    <MockFrame ratio="450 / 702">
      <MockChrome title={t.accounts} icon={<Wallet />} />
      <div className={styles.mockBody}>
        <div className={styles.mockCardFace}>
          <div className={styles.mockCardTop}>
            <span className={styles.mockCardLabel}>{t.balance}</span>
            <span className={styles.mockCardChip} />
          </div>
          <strong className={styles.mockCardAmount}>{MASK_AMOUNT}</strong>
          <span className={styles.mockCardNumber}>{MASK_CARD}</span>
        </div>
        {/* grow: this frame is tall and portrait, so the rows fill it as a
            list rather than clustering in the middle */}
        <div className={`${styles.mockRows} ${styles.mockRowsGrow}`}>
          {WALLET_ROWS.map((row) => (
            <div className={styles.mockRow} key={row.key}>
              <span className={styles.mockRowIcon}>
                {row.out ? <ArrowUpRight /> : <ArrowDownLeft />}
              </span>
              <span className={styles.mockRowMain}>
                <span className={styles.mockRowLabel}>{t[row.key]}</span>
                <MockBar width={row.out ? 52 : 66} />
              </span>
              <span className={styles.mockRowAmount}>{MASK_AMOUNT}</span>
            </div>
          ))}
        </div>
        <div className={styles.mockRowsFooter}>
          <MockPill label={t.settled} />
          <MockPill label={t.pending} tone="off" />
        </div>
      </div>
    </MockFrame>
  )
}

/**
 * Hero — small card 1 (was hero_sm_1.webp, 259×219).
 * A payment confirmation receipt.
 */
export function FintechConfirmMock({ locale }: MockProps) {
  const t = mockCopy[locale]
  return (
    <MockFrame ratio="259 / 219">
      <div className={styles.mockConfirm}>
        <span className={styles.mockConfirmIcon}>
          <CheckCircle2 />
        </span>
        <strong className={styles.mockConfirmLabel}>{t.paymentSent}</strong>
        <span className={styles.mockConfirmAmount}>{MASK_AMOUNT}</span>
        <MockPill label={t.settled} />
      </div>
    </MockFrame>
  )
}

/**
 * Hero — small card 2 (was hero_sm_2.webp, 247×219).
 * A transaction-volume snippet: unlabelled bars.
 */
export function FintechSparkMock({ locale }: MockProps) {
  const t = mockCopy[locale]
  return (
    <MockFrame ratio="247 / 219">
      <div className={styles.mockSpark}>
        <span className={styles.mockSectionLabel}>
          <Activity />
          {t.volume}
        </span>
        <MockBar width={58} strong />
        <MockChart bars={[42, 68, 54, 82, 63, 91]} />
      </div>
    </MockFrame>
  )
}

/* ---------------------------------------------------------- Services ×3 */

/**
 * Services — "Payment & wallet systems" (was card_img_6.webp, 715×372).
 * A checkout card: masked card number, brand-neutral chip, amount, CTA.
 */
export function FintechCheckoutMock({ locale }: MockProps) {
  const t = mockCopy[locale]
  return (
    <MockFrame ratio="715 / 372">
      <MockChrome title={t.checkout} icon={<CreditCard />} />
      <div className={styles.mockBody}>
        <div className={styles.mockCardFace}>
          <div className={styles.mockCardTop}>
            <span className={styles.mockCardLabel}>{t.amount}</span>
            <span className={styles.mockCardChip} />
          </div>
          <strong className={styles.mockCardAmount}>{MASK_AMOUNT}</strong>
          <span className={styles.mockCardNumber}>{MASK_CARD}</span>
        </div>
        <div className={styles.mockCheckoutFoot}>
          <span className={styles.mockCta}>
            <Lock />
            {t.pay}
          </span>
          <MockPill label={t.encrypted} />
        </div>
      </div>
    </MockFrame>
  )
}

const LEDGER_ROWS = [
  { key: 'cardPayment', side: 'debit', status: 'settled' },
  { key: 'bankTransfer', side: 'credit', status: 'cleared' },
  { key: 'payout', side: 'debit', status: 'pending' },
] as const

/**
 * Services — "Core banking & ledger platforms" (was card_img_7.webp, 715×292).
 * A double-entry ledger: record type, Dr/Cr side, masked amount, state.
 */
export function FintechLedgerMock({ locale }: MockProps) {
  const t = mockCopy[locale]
  return (
    <MockFrame ratio="715 / 292">
      <MockChrome title={t.ledger} icon={<ScrollText />} />
      <div className={styles.mockBody}>
        <div className={styles.mockRows}>
          {LEDGER_ROWS.map((row) => (
            <div className={styles.mockRow} key={row.key}>
              <span className={styles.mockSide}>
                {row.side === 'debit' ? t.debit : t.credit}
              </span>
              <span className={styles.mockRowMain}>
                <span className={styles.mockRowLabel}>{t[row.key]}</span>
                <MockBar width={row.side === 'debit' ? 48 : 62} />
              </span>
              <span className={styles.mockRowAmount}>{MASK_AMOUNT}</span>
              <MockPill
                label={t[row.status]}
                tone={row.status === 'pending' ? 'off' : 'on'}
              />
            </div>
          ))}
        </div>
      </div>
    </MockFrame>
  )
}

const CREDIT_ROWS = ['eligibility', 'scoring', 'repayment'] as const

/**
 * Services — "Lending & credit engines" (was card_img_8.webp, 536×267).
 * An explainable decision panel: criteria rows + a state, no score invented.
 */
export function FintechCreditMock({ locale }: MockProps) {
  const t = mockCopy[locale]
  return (
    <MockFrame ratio="536 / 267">
      <MockChrome title={t.decision} icon={<FileCheck2 />} />
      <div className={styles.mockBody}>
        <div className={styles.mockRows}>
          {CREDIT_ROWS.map((key) => (
            <div className={styles.mockRow} key={key}>
              <span className={styles.mockRowTick}>
                <Check />
              </span>
              <span className={styles.mockRowMain}>
                <span className={styles.mockRowLabel}>{t[key]}</span>
              </span>
              <MockBar width={key === 'scoring' ? 34 : 26} strong />
            </div>
          ))}
        </div>
        <div className={styles.mockRowsFooter}>
          <MockPill label={t.inReview} tone="off" />
          <MockBar width={30} />
        </div>
      </div>
    </MockFrame>
  )
}

/* ---------------------------------------------------------- Features ×5 */

const SECURITY_FIELDS = ['accessRole', 'keyRotation'] as const

/**
 * Features — "Multi-layer security & encryption" (was card_img_3.webp, 715×508).
 * A security panel: shield, encrypted field rows, audit trail.
 */
export function FintechSecurityMock({ locale }: MockProps) {
  const t = mockCopy[locale]
  return (
    <MockFrame ratio="715 / 508">
      <MockChrome title={t.security} icon={<ShieldCheck />} />
      <div className={styles.mockBody}>
        <div className={styles.mockShield}>
          <span className={styles.mockShieldIcon}>
            <Lock />
          </span>
          <span className={styles.mockShieldText}>
            <span className={styles.mockRowLabel}>{t.encrypted}</span>
            <span className={styles.mockMaskLine}>{MASK_CARD}</span>
          </span>
        </div>
        <div className={styles.mockRows}>
          {SECURITY_FIELDS.map((key) => (
            <div className={styles.mockRow} key={key}>
              <span className={styles.mockRowIcon}>
                {key === 'accessRole' ? <User /> : <Key />}
              </span>
              <span className={styles.mockRowMain}>
                <span className={styles.mockRowLabel}>{t[key]}</span>
              </span>
              <span className={styles.mockRowAmount}>{MASK_AMOUNT}</span>
              <span className={styles.mockRowTick}>
                <Lock />
              </span>
            </div>
          ))}
        </div>
        <div className={styles.mockTimeline}>
          <span className={styles.mockSectionLabel}>
            <ScrollText />
            {t.auditTrail}
          </span>
          {[74, 58, 66].map((width, index) => (
            <span className={styles.mockTimelineItem} key={index}>
              <MockBar width={width} />
            </span>
          ))}
        </div>
      </div>
    </MockFrame>
  )
}

const ANALYTICS_TILES = ['throughput', 'latency', 'exceptions'] as const

/**
 * Features — "Real-time analytics & dashboards" (was card_img_5.webp, 938×494).
 * KPI tiles with redacted values + an unlabelled bar chart.
 */
export function FintechAnalyticsMock({ locale }: MockProps) {
  const t = mockCopy[locale]
  return (
    <MockFrame ratio="938 / 494">
      <MockChrome title={t.analytics} icon={<Activity />} />
      <div className={styles.mockBody}>
        <div className={styles.mockTiles}>
          {ANALYTICS_TILES.map((key, index) => (
            <span className={styles.mockTile} key={key}>
              <span className={styles.mockTileLabel}>{t[key]}</span>
              <MockBar width={[62, 48, 38][index]} strong />
            </span>
          ))}
        </div>
        <MockChart bars={[38, 62, 46, 74, 55, 86, 64, 92]} />
      </div>
    </MockFrame>
  )
}

/**
 * Features — "Cloud-native scalability" (was card_img_6.webp, 715×372).
 * An area chart + instance tiles. Trend shape only; no figures.
 */
export function FintechScaleMock({ locale }: MockProps) {
  const t = mockCopy[locale]
  return (
    <MockFrame ratio="715 / 372">
      <MockChrome title={t.instances} icon={<Server />} />
      <div className={styles.mockBody}>
        <MockArea />
        <div className={styles.mockTiles}>
          {[0, 1, 2, 3].map((index) => (
            <span className={styles.mockNode} key={index}>
              <Server />
              <MockBar width={[70, 55, 82, 44][index]} />
            </span>
          ))}
        </div>
      </div>
    </MockFrame>
  )
}

/**
 * Features — "Open-banking & API integrations" (was card_img_4_1/2/3.webp).
 * Three layered endpoint strips. This mock renders the `.featureCardStack`
 * structure itself, so the mosaic's layered offsets and z-order stay in CSS and
 * survive unchanged.
 *
 * Each strip is only ~70-85px tall at render size, so it holds a single row:
 * method chip, path, redacted payload, status dot. Endpoint paths are ASCII and
 * version-generic — they read identically in both locales and name no provider.
 */
const API_STRIPS = [
  { ratio: '828 / 150', method: 'POST', path: '/v1/payments' },
  { ratio: '968 / 154', method: 'GET', path: '/v1/accounts' },
  { ratio: '1056 / 184', method: 'POST', path: '/v1/transfers' },
] as const

export function FintechApiStackMock() {
  return (
    <div className={styles.featureCardStack}>
      {API_STRIPS.map((strip) => (
        <div className={styles.featureCardStackItem} key={strip.path}>
          <MockFrame ratio={strip.ratio}>
            <div className={styles.mockStrip}>
              <span className={styles.mockEndpoint}>
                <span className={styles.mockMethod}>{strip.method}</span>
                <code className={styles.mockCode}>{strip.path}</code>
                <span className={styles.mockEndpointBar}>
                  <MockBar width={100} />
                </span>
                <span className={styles.mockPillDot} />
              </span>
            </div>
          </MockFrame>
        </div>
      ))}
    </div>
  )
}

/** The subject is the event; the pill is its state — never the same word twice. */
const EVENT_ROWS = [
  { subject: 'exceptions', status: 'alert', tone: 'off', bar: 70 },
  { subject: 'cardPayment', status: 'resolved', tone: 'on', bar: 52 },
  { subject: 'bankTransfer', status: 'resolved', tone: 'on', bar: 61 },
] as const

/**
 * Features — "Observability & alerting" (was card_img_7.webp, 715×292).
 * An event stream: one open alert, two resolutions, redacted metadata.
 */
export function FintechEventsMock({ locale }: MockProps) {
  const t = mockCopy[locale]
  return (
    <MockFrame ratio="715 / 292">
      <MockChrome title={t.events} icon={<BellRing />} />
      <div className={styles.mockBody}>
        <div className={styles.mockRows}>
          {EVENT_ROWS.map((row) => (
            <div className={styles.mockRow} key={row.subject}>
              <span className={styles.mockRowIcon}>
                {row.tone === 'off' ? <BellRing /> : <Check />}
              </span>
              <span className={styles.mockRowMain}>
                <span className={styles.mockRowLabel}>{t[row.subject]}</span>
                <MockBar width={row.bar} />
              </span>
              <MockPill label={t[row.status]} tone={row.tone} />
            </div>
          ))}
        </div>
      </div>
    </MockFrame>
  )
}

/* ---------------------------------------------------- Approach blocks ×2 */

const PLATFORM_LAYERS = [
  { key: 'encryption', icon: <Lock /> },
  { key: 'accessControl', icon: <User /> },
  { key: 'keyManagement', icon: <Key /> },
  { key: 'auditTrail', icon: <ScrollText /> },
] as const

/**
 * Approach — "Security-first architecture" (was vision_card_img.webp, 624×415).
 * The security layers drawn as a stack, foundation upward.
 */
export function FintechLayersMock({ locale }: MockProps) {
  const t = mockCopy[locale]
  return (
    <MockFrame ratio="624 / 415" tone="dark">
      <div className={styles.mockBodyDark}>
        <span className={styles.mockSectionLabel}>
          <ShieldCheck />
          {t.layers}
        </span>
        <div className={styles.mockLayerStack}>
          {PLATFORM_LAYERS.map((layer, index) => (
            <span
              className={styles.mockLayer}
              key={layer.key}
              style={{ inlineSize: `${100 - index * 9}%` }}
            >
              <span className={styles.mockLayerIcon}>{layer.icon}</span>
              <span className={styles.mockLayerLabel}>{t[layer.key]}</span>
              <MockBar width={22} />
            </span>
          ))}
        </div>
      </div>
    </MockFrame>
  )
}

/** Delivery stages — each carries a named owner and an evidence path. */
const HANDOFF_ROWS = [
  { key: 'discovery', owner: 54 },
  { key: 'architecture', owner: 42 },
  { key: 'secureBuild', owner: 60 },
  { key: 'integrate', owner: 48 },
] as const

/**
 * Approach — "Compliance-ready delivery" (was mission_card_img.webp, 624×415).
 * Delivery stages, each with a named-owner slot and an evidence slot — the
 * point the adjacent copy makes about traceable handoffs.
 */
export function FintechHandoffMock({ locale }: MockProps) {
  const t = mockCopy[locale]
  return (
    <MockFrame ratio="624 / 415">
      <MockChrome title={t.handoff} icon={<FileCheck2 />} />
      <div className={styles.mockBody}>
        <div className={styles.mockHandoffHead}>
          <span className={styles.mockHandoffCol}>{t.owner}</span>
          <span className={styles.mockHandoffCol}>{t.evidence}</span>
        </div>
        <div className={`${styles.mockRows} ${styles.mockRowsGrow}`}>
          {HANDOFF_ROWS.map((row) => (
            <div className={styles.mockRow} key={row.key}>
              <span className={styles.mockRowTick}>
                <Check />
              </span>
              <span className={styles.mockRowMain}>
                <span className={styles.mockRowLabel}>{t[row.key]}</span>
              </span>
              <span className={styles.mockOwner}>
                <User />
                <MockBar width={row.owner} />
              </span>
              <span className={styles.mockRowTick}>
                <ScrollText />
              </span>
            </div>
          ))}
        </div>
        <div className={styles.mockRowsFooter}>
          <MockPill label={t.auditTrail} />
          <MockBar width={26} />
        </div>
      </div>
    </MockFrame>
  )
}
