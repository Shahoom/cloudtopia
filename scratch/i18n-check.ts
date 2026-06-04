import { en } from '../lib/i18n/translations/en'
import { ar } from '../lib/i18n/translations/ar'

function getKeys(obj: any, prefix = ''): string[] {
  let keys: string[] = []
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        keys = keys.concat(getKeys(obj[key], fullKey))
      } else {
        keys.push(fullKey)
      }
    }
  }
  return keys
}

const enKeys = getKeys(en)
const arKeys = getKeys(ar)

const missingInAr = enKeys.filter(k => !arKeys.includes(k))
const missingInEn = arKeys.filter(k => !enKeys.includes(k))

console.log('--- Translation Keys Diff ---')
console.log(`Total English keys: ${enKeys.length}`)
console.log(`Total Arabic keys: ${arKeys.length}`)

if (missingInAr.length > 0) {
  console.log(`\nMissing in Arabic dictionary (${missingInAr.length} keys):`)
  missingInAr.slice(0, 20).forEach(k => console.log(`  - ${k}`))
  if (missingInAr.length > 20) console.log(`  ... and ${missingInAr.length - 20} more`)
} else {
  console.log('\nAll English keys are present in Arabic!')
}

if (missingInEn.length > 0) {
  console.log(`\nMissing in English dictionary (${missingInEn.length} keys):`)
  missingInEn.slice(0, 20).forEach(k => console.log(`  - ${k}`))
  if (missingInEn.length > 20) console.log(`  ... and ${missingInEn.length - 20} more`)
} else {
  console.log('\nAll Arabic keys are present in English!')
}
