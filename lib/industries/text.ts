const LTR_ISOLATE = '\u2068'
const POP_DIRECTIONAL_ISOLATE = '\u2069'

export function isolateLtrToken(token: string): string {
  return `${LTR_ISOLATE}${token}${POP_DIRECTIONAL_ISOLATE}`
}
