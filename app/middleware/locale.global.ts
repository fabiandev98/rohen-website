import { i18n, supportedLocales, type SupportedLocale } from '../i18n'

export default defineNuxtRouteMiddleware((to) => {
  const locale = to.params.locale

  if (typeof locale !== 'string') {
    return navigateTo({
      path: `/en${to.path === '/' ? '' : to.path}`,
      query: to.query,
      hash: to.hash,
    })
  }

  if (!supportedLocales.includes(locale as SupportedLocale)) {
    return navigateTo('/en')
  }

  i18n.global.locale.value = locale as SupportedLocale
})
