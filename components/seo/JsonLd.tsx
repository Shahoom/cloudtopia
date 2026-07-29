/**
 * Renders one or more JSON-LD schema objects as <script type="application/ld+json">.
 * Centralises the dangerouslySetInnerHTML boilerplate that was repeated across
 * dozens of layout/page files. Falsy entries (e.g. a null FAQ schema) are skipped.
 */

// `<`, `>`, `&`, and the U+2028 / U+2029 line separators. The regex is built from
// char codes so the source file stays pure ASCII (the separators are invisible and
// easily corrupted if typed literally).
const JSONLD_UNSAFE = new RegExp('[<>&' + String.fromCharCode(0x2028, 0x2029) + ']', 'g')

/**
 * Serialize a schema object for safe inlining inside a <script> element.
 *
 * `JSON.stringify` does NOT escape `<`, so any CMS-authored value containing the
 * literal `</script>` (or `<!--`) would close the element early — browsers and
 * search/AI crawlers then discard the ENTIRE JSON-LD block for that URL, and the
 * stray markup becomes a stored-XSS sink. Rewriting these characters to their
 * \uXXXX form keeps the payload byte-identical after JSON.parse while making it
 * impossible to break out of the script element.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(
    JSONLD_UNSAFE,
    (ch) => '\\u' + ch.charCodeAt(0).toString(16).padStart(4, '0'),
  )
}

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
            dangerouslySetInnerHTML={{ __html: serializeJsonLd(item) }}
          />
        ))}
    </>
  )
}

export default JsonLd
