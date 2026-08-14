<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SiteHeader from './components/layout/SiteHeader.vue'
import SiteFooter from './components/layout/SiteFooter.vue'

const route = useRoute()
const router = useRouter()

const activePage = computed(() => {
  if (route.name === 'home') return 'inicio'
  if (route.name === 'services') return 'servicios'
  if (route.name === 'about') return 'nosotros'
  if (route.name === 'contact') return 'contacto'
  if (route.name === 'service') return `service-${route.params.serviceId}`

  return ''
})

function navigate(target: string) {
  if (target.startsWith('service-')) {
    void router.push({ name: 'service', params: { serviceId: target.replace('service-', '') } })
    return
  }

  const routes = {
    inicio: 'home',
    servicios: 'services',
    nosotros: 'about',
    contacto: 'contact',
  } as const

  void router.push({ name: routes[target as keyof typeof routes] ?? 'home' })
}
onMounted(() => {
  document.title = 'ROHEN Supply Chain Solutions'
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white">
    <SiteHeader :active-page="activePage" @navigate="navigate" />
    <div class="flex-1">
      <RouterView @navigate="navigate" />
    </div>
    <SiteFooter @navigate="navigate" />
  </div>
</template>
