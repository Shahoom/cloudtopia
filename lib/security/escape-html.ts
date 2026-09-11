/**
 * Entity-escape a user-supplied string before interpolating it into HTML
 * (notification emails, etc.). Prevents attacker-styled phishing content from
 * rendering inside trusted internal templates.
 */
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
