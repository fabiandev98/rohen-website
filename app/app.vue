<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from '#app'
import SiteFooter from './components/layout/SiteFooter.vue'
import SiteHeader from './components/layout/SiteHeader.vue'

const route = useRoute()
const router = useRouter()

const activePage = computed(() => {
  if (route.name === 'index') return 'inicio'
  if (route.name === 'services') return 'servicios'
  if (route.name === 'about') return 'nosotros'
  if (route.name === 'contact') return 'contacto'
  if (route.name === 'services-serviceId') return `service-${route.params.serviceId}`

  return ''
})

function navigate(target: string) {
  if (target.startsWith('service-')) {
    void router.push({
      name: 'services-serviceId',
      params: { serviceId: target.replace('service-', '') },
    })
    return
  }

  const routes = {
    inicio: 'index',
    servicios: 'services',
    nosotros: 'about',
    contacto: 'contact',
  } as const

  void router.push({ name: routes[target as keyof typeof routes] ?? 'index' })
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
