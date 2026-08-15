<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from '#app'
import { supportedLocales, type SupportedLocale } from './i18n'
import SiteFooter from './components/layout/SiteFooter.vue'
import SiteHeader from './components/layout/SiteHeader.vue'

const route = useRoute()
const router = useRouter()
const currentLocale = computed<SupportedLocale>(() => {
  const locale = route.params.locale

  return typeof locale === 'string' && supportedLocales.includes(locale as SupportedLocale)
    ? (locale as SupportedLocale)
    : 'en'
})

const activePage = computed(() => {
  if (route.name === 'locale') return 'inicio'
  if (route.name === 'locale-services') return 'servicios'
  if (route.name === 'locale-about') return 'nosotros'
  if (route.name === 'locale-contact') return 'contacto'
  if (route.name === 'locale-services-serviceId') return `service-${route.params.serviceId}`

  return ''
})

function navigate(target: string) {
  if (target.startsWith('service-')) {
    void router.push({
      name: 'locale-services-serviceId',
      params: { locale: currentLocale.value, serviceId: target.replace('service-', '') },
    })
    return
  }

  const routes = {
    inicio: 'locale',
    servicios: 'locale-services',
    nosotros: 'locale-about',
    contacto: 'locale-contact',
  } as const

  void router.push({
    name: routes[target as keyof typeof routes] ?? 'locale',
    params: { locale: currentLocale.value },
  })
}

onMounted(() => {
  document.title = 'ROHEN Supply Chain Solutions'
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white">
    <SiteHeader :active-page="activePage" @navigate="navigate" />
    <div class="flex-1">
      <NuxtPage @navigate="navigate" />
    </div>
    <SiteFooter @navigate="navigate" />
  </div>
</template>
