<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from '#app'
import { useLocalePath } from '#imports'
import SiteFooter from './components/layout/SiteFooter.vue'
import SiteHeader from './components/layout/SiteHeader.vue'

const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()

const activePage = computed(() => {
  const path = route.path.replace(/^\/(en|es|pt)(?=\/|$)/, '') || '/'

  if (path === '/') return 'inicio'
  if (path === '/services') return 'servicios'
  if (path === '/about') return 'nosotros'
  if (path === '/contact') return 'contacto'
  if (path.startsWith('/services/')) return `service-${route.params.serviceId}`

  return ''
})

function navigate(target: string) {
  if (target.startsWith('service-')) {
    void router.push(localePath(`/services/${target.replace('service-', '')}`))
    return
  }

  const paths = {
    inicio: '/',
    servicios: '/services',
    nosotros: '/about',
    contacto: '/contact',
  } as const

  void router.push(localePath(paths[target as keyof typeof paths] ?? '/'))
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
