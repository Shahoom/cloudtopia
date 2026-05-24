import { getPayload } from 'payload'
import config from '../payload.config'

async function run() {
  const payload = await getPayload({ config })
  try {
    console.log('Finding project: en:lumma-clinics')
    const doc = await payload.findByID({
      collection: 'projects',
      id: 'en:lumma-clinics',
      depth: 0,
      overrideAccess: true,
    })
    console.log('Found project:', doc.id, doc.title)
  } catch (error) {
    console.error('Error finding project:', error)
  }
  process.exit(0)
}

run()
