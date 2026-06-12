import {
  EXPERIMENTAL_TableFeature,
  BlocksFeature,
  CodeBlock,
  FixedToolbarFeature,
  InlineToolbarFeature,
  UploadFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

/**
 * Shared Lexical feature set for the blog `content` field. Exported on its own
 * so the BlogPosts field editor AND the markdown→Lexical converter in
 * blog-import-endpoint.ts use IDENTICAL features (headings, lists, tables,
 * code blocks, uploads) — otherwise imported content could contain nodes the
 * field can't render.
 */
export const blogRichTextFeatures = ({ defaultFeatures }: { defaultFeatures: any[] }) => [
  ...defaultFeatures,
  FixedToolbarFeature(),
  InlineToolbarFeature(),
  UploadFeature({
    enabledCollections: ['media'],
    maxDepth: 1,
  }),
  BlocksFeature({
    blocks: [CodeBlock()],
  }),
  EXPERIMENTAL_TableFeature(),
]

export const blogRichTextEditor = lexicalEditor({ features: blogRichTextFeatures })
