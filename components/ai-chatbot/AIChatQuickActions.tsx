import styles from './AIChatbot.module.css'

const actions = {
  ar: ['أريد موقعًا لشركتي', 'أحتاج نظام CRM أو ERP', 'أريد تطبيق ويب أو لوحة تحكم', 'كم التكلفة؟', 'أريد استشارة مجانية'],
  en: ['I need a company website', 'I need CRM or ERP', 'I need a web app or dashboard', 'How much does it cost?', 'I want a free consultation'],
}

export function AIChatQuickActions({
  locale,
  disabled,
  onSelect,
}: {
  locale: 'ar' | 'en'
  disabled: boolean
  onSelect: (value: string) => void
}) {
  return (
    <div className={styles.quickActions} aria-label={locale === 'ar' ? 'اقتراحات سريعة' : 'Quick actions'}>
      {actions[locale].map((action) => (
        <button key={action} className={styles.quickAction} type="button" onClick={() => onSelect(action)} disabled={disabled}>
          {action}
        </button>
      ))}
    </div>
  )
}
