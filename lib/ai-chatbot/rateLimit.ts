type RateLimitReason = 'minute' | 'hour'

export type RateLimitResult =
  | {
      allowed: true
      remainingMinute: number
      remainingHour: number
    }
  | {
      allowed: false
      reason: RateLimitReason
      retryAfterSeconds: number
      remainingMinute: number
      remainingHour: number
    }

type RateLimiterOptions = {
  minuteLimit?: number
  hourLimit?: number
  now?: () => number
}

type VisitorBucket = {
  minute: number[]
  hour: number[]
}

export function createMemoryRateLimiter(options: RateLimiterOptions = {}) {
  const minuteLimit = options.minuteLimit ?? 10
  const hourLimit = options.hourLimit ?? 50
  const now = options.now ?? Date.now
  const buckets = new Map<string, VisitorBucket>()

  return {
    check(key: string): RateLimitResult {
      const timestamp = now()
      const minuteWindow = timestamp - 60_000
      const hourWindow = timestamp - 3_600_000
      const bucket = buckets.get(key) ?? { minute: [], hour: [] }

      bucket.minute = bucket.minute.filter((entry) => entry > minuteWindow)
      bucket.hour = bucket.hour.filter((entry) => entry > hourWindow)

      if (bucket.minute.length >= minuteLimit) {
        buckets.set(key, bucket)
        return {
          allowed: false,
          reason: 'minute',
          retryAfterSeconds: secondsUntil(bucket.minute[0], 60_000, timestamp),
          remainingMinute: 0,
          remainingHour: Math.max(0, hourLimit - bucket.hour.length),
        }
      }

      if (bucket.hour.length >= hourLimit) {
        buckets.set(key, bucket)
        return {
          allowed: false,
          reason: 'hour',
          retryAfterSeconds: secondsUntil(bucket.hour[0], 3_600_000, timestamp),
          remainingMinute: Math.max(0, minuteLimit - bucket.minute.length),
          remainingHour: 0,
        }
      }

      bucket.minute.push(timestamp)
      bucket.hour.push(timestamp)
      buckets.set(key, bucket)

      return {
        allowed: true,
        remainingMinute: Math.max(0, minuteLimit - bucket.minute.length),
        remainingHour: Math.max(0, hourLimit - bucket.hour.length),
      }
    },
    reset() {
      buckets.clear()
    },
  }
}

function secondsUntil(firstEntry: number, windowMs: number, now: number) {
  return Math.max(1, Math.ceil((firstEntry + windowMs - now) / 1000))
}

export const aiChatRateLimiter = createMemoryRateLimiter()
