import { createI18n } from 'vue-i18n'
import en from '../locales/en'
import es from '../locales/es'
import pt from '../locales/pt'

export const supportedLocales = ['en', 'es', 'pt'] as const
export type SupportedLocale = (typeof supportedLocales)[number]

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, es, pt },
})
