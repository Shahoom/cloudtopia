import { getPayload } from 'payload'
import config from '../payload.config.ts'
import { authors } from '../lib/authors.ts'
import { ar } from '../lib/i18n/translations/ar.ts'
import { en } from '../lib/i18n/translations/en.ts'
import { serviceFAQs } from '../lib/seo/service-faqs.ts'
import { isPayloadConfigured } from '../lib/cms/env.ts'

const dictionaries = { en, ar }
const locales = ['en', 'ar'] as const

async function upsertByField({
  collection,
  field,
  value,
  data,
}: {
  collection: string
  field: string
  value: string
  data: Record<string, unknown>
}) {
  const payload = await getPayload({ config })
  const existing = await payload.find({
    collection: collection as any,
    where: { [field]: { equals: value } },
    limit: 1,
    depth: 0,
  })

  if (existing.docs[0]) {
    await payload.update({
      collection: collection as any,
      id: existing.docs[0].id,
      data,
    })
    return
  }

  await payload.create({
    collection: collection as any,
    data,
  })
}

async function seed() {
  if (!isPayloadConfigured()) {
    throw new Error('Set DATABASE_URL and PAYLOAD_SECRET before running seed:payload in production.')
  }

  for (const locale of locales) {
    await upsertByField({
      collection: 'site-content',
      field: 'locale',
      value: locale,
      data: {
        locale,
        dictionary: dictionaries[locale],
      },
    })

    const projects = (dictionaries[locale] as any).projects?.projectCards || []
    for (const project of projects) {
      const cmsKey = `${locale}:${project.id}`
      await upsertByField({
        collection: 'projects',
        field: 'cmsKey',
        value: cmsKey,
        data: {
          ...project,
          cmsKey,
          id: cmsKey,
          locale,
          features: (project.features || []).map((feature: string) => ({ feature })),
        },
      })
    }
  }

  for (const author of Object.values(authors)) {
    await upsertByField({
      collection: 'authors',
      field: 'slug',
      value: author.slug,
      data: {
        slug: author.slug,
        name: author.name,
        role: author.role,
        bio: author.bio,
        knowsAbout: (author.knowsAbout || []).map((topic) => ({ topic })),
        sameAs: (author.sameAs || []).map((url) => ({ url })),
      },
    })
  }

  for (const [serviceSlug, faqs] of Object.entries(serviceFAQs)) {
    await upsertByField({
      collection: 'service-faqs',
      field: 'serviceSlug',
      value: serviceSlug,
      data: {
        serviceSlug,
        faqs,
      },
    })
  }

  console.log('Payload seed complete.')
}

await seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
