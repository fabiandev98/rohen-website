<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguageSelector from './LanguageSelector.vue'
import RohenLogo from './RohenLogo.vue'
import { contact, services } from '../../data/site'
import { supportedLocales, type SupportedLocale } from '../../i18n'
defineProps<{ activePage: string }>()
const emit = defineEmits<{ navigate: [page: string] }>()
const { locale, t } = useI18n()
const mobile = ref(false)
const mobileServices = ref(false)
const localeOptions: Record<SupportedLocale, { flag: string }> = {
  en: { flag: 'EN' },
  es: { flag: 'ES' },
  pt: { flag: 'PT' },
}
function go(page: string) {
  emit('navigate', page)
  mobile.value = false
}
function setLocale(nextLocale: SupportedLocale) {
  locale.value = nextLocale
  localStorage.setItem('rohen-locale', nextLocale)
}
const serviceMenuItems = computed(() =>
  services.map((service) => ({
    label: t(`services.${service.id}.title`),
    onSelect: () => go(`service-${service.id}`),
  })),
)
watch(mobile, (v) => (document.body.style.overflow = v ? 'hidden' : ''))
onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>
<template>
  <header class="sticky top-0 z-50 bg-[#0D1B2A]">
    <div class="max-w-[1280px] mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
      <button @click="go('inicio')"><RohenLogo light /></button>
      <nav class="hidden lg:flex items-center gap-8">
        <button
          class="text-sm font-semibold"
          :class="activePage === 'inicio' ? 'text-[#D4AF37]' : 'text-white'"
          @click="go('inicio')"
        >
          {{ t('nav.home') }}
        </button>
        <UDropdownMenu
          v-slot="{ open }"
          :items="serviceMenuItems"
          :content="{ align: 'start', sideOffset: 10 }"
          :ui="{
            content: 'w-64 rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl',
            item: 'rounded-lg px-4 py-2.5 text-sm font-medium text-[#0D1B2A] hover:bg-[#F8F9FA] hover:text-[#D4AF37]',
          }"
        >
          <button
            class="flex items-center gap-1 text-sm font-semibold"
            :class="
              open || activePage.includes('service') || activePage === 'servicios'
                ? 'text-[#D4AF37]'
                : 'text-white'
            "
            :aria-expanded="open"
          >
            {{ t('nav.services') }}
            <UIcon
              :name="open ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
              class="size-3.5"
            />
          </button>
        </UDropdownMenu>
        <button
          v-for="item in [
            { l: t('nav.about'), p: 'nosotros' },
            { l: t('nav.contact'), p: 'contacto' },
          ]"
          :key="item.p"
          class="text-sm font-semibold"
          :class="activePage === item.p ? 'text-[#D4AF37]' : 'text-white'"
          @click="go(item.p)"
        >
          {{ item.l }}
        </button>
      </nav>
      <div class="flex items-center gap-4">
        <a
          :href="contact.whatsappUrl"
          target="_blank"
          class="hidden lg:flex border border-white/40 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-white/10"
          >◉&nbsp; {{ t('common.whatsapp') }}</a
        >
        <LanguageSelector
          :locale="locale as SupportedLocale"
          :label="t('language')"
          @select="setLocale"
        />
        <button
          class="lg:hidden text-white p-2 text-2xl"
          aria-label="Menú"
          @click="mobile = !mobile"
        >
          {{ mobile ? '×' : '☰' }}
        </button>
      </div>
    </div>
    <div v-if="mobile" class="lg:hidden fixed inset-0 top-16 z-40 bg-[#0D1B2A] p-6">
      <button
        class="w-full text-left py-4 text-white font-semibold border-b border-white/10"
        @click="go('inicio')"
      >
        {{ t('nav.home') }}
      </button>
      <button
        class="w-full flex justify-between py-4 text-white font-semibold border-b border-white/10"
        @click="mobileServices = !mobileServices"
      >
        {{ t('nav.services') }} <span>{{ mobileServices ? '−' : '+' }}</span>
      </button>
      <div v-if="mobileServices" class="pl-4">
        <button
          v-for="s in services"
          :key="s.id"
          class="block w-full text-left py-3 text-sm text-[#D4AF37] border-b border-white/5"
          @click="go(`service-${s.id}`)"
        >
          {{ t(`services.${s.id}.title`) }}
        </button>
      </div>
      <button
        class="w-full text-left py-4 text-white font-semibold border-b border-white/10"
        @click="go('nosotros')"
      >
        {{ t('nav.about') }}
      </button>
      <button
        class="w-full text-left py-4 text-white font-semibold border-b border-white/10"
        @click="go('contacto')"
      >
        {{ t('nav.contact') }}
      </button>
      <div class="mt-6 border-t border-white/10 pt-5">
        <p class="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          {{ t('language') }}
        </p>
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="code in supportedLocales"
            :key="code"
            class="rounded-lg border px-2 py-2 text-sm font-semibold"
            :class="
              locale === code
                ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                : 'border-white/15 text-white'
            "
            @click="setLocale(code)"
          >
            {{ localeOptions[code].flag }} {{ code.toUpperCase() }}
          </button>
        </div>
      </div>
      <a
        :href="contact.whatsappUrl"
        target="_blank"
        class="mt-6 flex justify-center text-white text-sm font-semibold px-4 py-3 rounded-lg bg-[#1B365D]"
        >{{ t('common.whatsapp') }}</a
      >
    </div>
  </header>
</template>
