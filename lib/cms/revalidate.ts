const cacheProfile = 'max'

export async function revalidateCmsTags(tags: string[]) {
  try {
    const { revalidateTag } = await import('next/cache.js')
    tags.forEach((tag) => revalidateTag(tag, cacheProfile))
  } catch {
    // Payload CLI commands run outside the Next runtime. In that context there is
    // nothing to revalidate, so cache invalidation is intentionally best-effort.
  }
}
