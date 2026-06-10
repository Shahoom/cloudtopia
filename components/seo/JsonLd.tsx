/**
 * Renders one or more JSON-LD schema objects as <script type="application/ld+json">.
 * Centralises the dangerouslySetInnerHTML boilerplate that was repeated across
 * dozens of layout/page files. Falsy entries (e.g. a null FAQ schema) are skipped.
 */
export function JsonLd({ schema }: { schema: unknown | unknown[] }) {
  const items = Array.isArray(schema) ? schema : [schema]
  return (
    <>
      {items
        .filter((item) => item != null && item !== false)
        .map((item, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
          />
        ))}
    </>
  )
}

export default JsonLd
