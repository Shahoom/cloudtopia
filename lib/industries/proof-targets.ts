export const PROJECT_IDS = [
  'kvaii-logistics',
  'ram-sustainable',
  'artucky-ecommerce',
  'comics-topia',
  'joory-cafe',
  'luxury-world-tourism',
  'dhofar-tourism',
] as const

export type ProjectId = (typeof PROJECT_IDS)[number]
