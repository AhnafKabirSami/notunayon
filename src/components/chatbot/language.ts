import type { ChatLanguage } from '../../types/index.ts'

const banglaScript = /[\u0980-\u09FF]/
const banglishWords = [
  'ami',
  'apni',
  'ki',
  'kemon',
  'ache',
  'pawa',
  'pabe',
  'te',
  'er',
  'gobor',
  'sar',
  'dhaner',
  'tush',
  'poultry',
  'kichu',
  'koto',
  'bangladesh',
]

export function detectLanguage(text: string, previousLanguage: ChatLanguage = 'en'): ChatLanguage {
  const value = String(text || '').trim()
  if (banglaScript.test(value)) return 'bn'

  const words = value.toLowerCase().match(/[a-z]+/g) || []
  if (words.some((word) => banglishWords.includes(word))) return 'bn-en'

  if (
    /^(hi|hello|hey|thanks|thank you|okay|ok|how are you|what|tell|what is|is|where|how)/i.test(
      value,
    )
  ) {
    return previousLanguage === 'bn' ? previousLanguage : 'en'
  }
  return previousLanguage || 'en'
}
