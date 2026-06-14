// Best-effort REAL client IP. cloudtopia.net sits behind Cloudflare → Vercel, so
// x-forwarded-for[0] is Cloudflare's edge IP (e.g. 162.158.x.x), NOT the visitor.
// Cloudflare puts the true client in cf-connecting-ip; prefer it. Fall back to
// x-real-ip, then x-forwarded-for. Capped so a spoofed header can't bloat the row.
export function getClientIp(headers: Headers): string {
  const cf = headers.get('cf-connecting-ip')?.trim()
  const real = headers.get('x-real-ip')?.trim()
  const fwd = headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return (cf || real || fwd || '').slice(0, 64)
}
