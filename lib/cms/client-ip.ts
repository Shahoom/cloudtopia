// Best-effort client IP from proxy headers (Vercel sets x-forwarded-for).
// Returns '' when unavailable. Capped so a spoofed header can't bloat the row.
export function getClientIp(headers: Headers): string {
  const fwd = headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const real = headers.get('x-real-ip')?.trim()
  return (fwd || real || '').slice(0, 64)
}
