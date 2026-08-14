import { i18n, supportedLocales, type SupportedLocale } from '../i18n'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(i18n)

  if (import.meta.client) {
    const savedLocale = localStorage.getItem('rohen-locale') as SupportedLocale | null

    if (savedLocale && supportedLocales.includes(savedLocale)) {
      i18n.global.locale.value = savedLocale
    }
  }
})
