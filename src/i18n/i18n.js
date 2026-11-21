import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import bn from './locales/bn.json'
import { applyDomLanguage, startDomTranslationObserver } from './translateDom.js'

const savedLanguage = (() => {
  try {
    return localStorage.getItem('notunayon-language') === 'bn' ? 'bn' : 'en'
  } catch {
    return 'en'
  }
})()

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      bn: { translation: bn },
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    supportedLngs: ['en', 'bn'],
    interpolation: { escapeValue: false },
    saveMissing: import.meta.env.DEV,
  })

document.documentElement.lang = savedLanguage
document.documentElement.dir = 'ltr'
startDomTranslationObserver(() => i18n.resolvedLanguage)
applyDomLanguage(savedLanguage)

export function changeWebsiteLanguage(language) {
  const next = language === 'bn' ? 'bn' : 'en'
  i18n.changeLanguage(next)
  localStorage.setItem('notunayon-language', next)
  document.documentElement.lang = next
  applyDomLanguage(next)
}

export default i18n
