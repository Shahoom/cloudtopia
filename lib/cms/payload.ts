import 'server-only'
import config from '../../payload.config.ts'
import { getPayload } from 'payload'
import { isPayloadConfigured as hasPayloadConfig } from './env.ts'

export function isPayloadConfigured() {
  return hasPayloadConfig()
}

export async function getPayloadClient() {
  if (!isPayloadConfigured()) {
    throw new Error('Payload is not configured. Set DATABASE_URL and PAYLOAD_SECRET.')
  }

  return getPayload({ config })
}
