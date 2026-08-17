<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguageSelector from './LanguageSelector.vue'
import RohenLogo from './RohenLogo.vue'
import ActionButton from '../shared/ActionButton.vue'
import { contact, services } from '../../data/site'
import { supportedLocales, type SupportedLocale } from '../../i18n/types'
import { navigateTo } from '#app'
import { useSwitchLocalePath } from '#imports'
defineProps<{ activePage: string }>()
const emit = defineEmits<{ navigate: [page: string] }>()
const { locale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const mobile = ref(false)
const mobileServices = ref(false)
const localeIcons: Record<SupportedLocale, string> = {
  en: 'i-circle-flags-us',
  es: 'i-circle-flags-es',
  pt: 'i-circle-flags-pt',
}
function go(page: string) {
  emit('navigate', page)
  mobile.value = false
}
function setLocale(nextLocale: SupportedLocale) {
  if (nextLocale === locale.value) return

  void navigateTo(switchLocalePath(nextLocale))
}
const serviceMenuItems = computed(() =>
  services.map((service) => ({
    label: t(`services.${service.id}.title`),
    icon: 'i-lucide-dot',
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
        <UButton
          variant="ghost"
          color="neutral"
          class="relative text-sm font-semibold after:absolute after:-bottom-2 after:left-1/2 after:h-0.5 after:w-6 after:-translate-x-1/2 after:scale-x-0 after:rounded-full after:bg-[#D4AF37] after:transition-transform after:duration-200"
          :class="activePage === 'inicio' ? 'text-[#D4AF37] after:scale-x-100' : 'text-white'"
          @click="go('inicio')"
        >
          {{ t('nav.home') }}
        </UButton>
        <UDropdownMenu
          v-slot="{ open }"
          :items="serviceMenuItems"
          :content="{ align: 'start', sideOffset: 10 }"
          :ui="{
            content: 'w-[380px] rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl',
            item: 'rounded-lg px-4 py-2.5 text-sm font-medium text-[#0D1B2A] data-[highlighted]:!bg-[#FDF7E7] data-[highlighted]:!text-[#0D1B2A]',
            itemLeadingIcon: 'size-5 !text-[#D4AF37]',
            itemLabel:
              'whitespace-normal leading-snug text-[#0D1B2A] group-data-[highlighted]:!text-[#0D1B2A]',
          }"
        >
          <button
            class="relative flex items-center gap-1 text-sm font-semibold after:absolute after:-bottom-2 after:left-1/2 after:h-0.5 after:w-6 after:-translate-x-1/2 after:scale-x-0 after:rounded-full after:bg-[#D4AF37] after:transition-transform after:duration-200"
            :class="
              open || activePage.includes('service') || activePage === 'servicios'
                ? 'text-[#D4AF37] after:scale-x-100'
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
        <UButton
          v-for="item in [
            { l: t('nav.about'), p: 'nosotros' },
            { l: t('nav.contact'), p: 'contacto' },
          ]"
          :key="item.p"
          variant="ghost"
          color="neutral"
          class="relative text-sm font-semibold after:absolute after:-bottom-2 after:left-1/2 after:h-0.5 after:w-6 after:-translate-x-1/2 after:scale-x-0 after:rounded-full after:bg-[#D4AF37] after:transition-transform after:duration-200"
          :class="activePage === item.p ? 'text-[#D4AF37] after:scale-x-100' : 'text-white'"
          @click="go(item.p)"
        >
          {{ item.l }}
        </UButton>
      </nav>
      <div class="flex items-center gap-4">
        <ActionButton
          :href="contact.whatsappUrl"
          target="_blank"
          :label="t('common.contactUs')"
          icon="i-simple-icons-whatsapp"
          background-color="#D4AF37"
          text-color="#0D1B2A"
          class="hidden lg:flex"
        />
        <div class="hidden lg:block">
          <LanguageSelector
            :locale="locale as SupportedLocale"
            :label="t('language')"
            @select="setLocale"
          />
        </div>
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
      <UButton
        variant="ghost"
        color="neutral"
        class="w-full text-left py-4 text-white font-semibold border-b border-white/10"
        @click="go('inicio')"
      >
        {{ t('nav.home') }}
      </UButton>
      <UButton
        variant="ghost"
        color="neutral"
        class="w-full flex justify-between py-4 text-white font-semibold border-b border-white/10"
        @click="mobileServices = !mobileServices"
      >
        {{ t('nav.services') }} <span>{{ mobileServices ? '−' : '+' }}</span>
      </UButton>
      <div v-if="mobileServices" class="pl-4">
        <UButton
          v-for="s in services"
          :key="s.id"
          variant="ghost"
          color="neutral"
          class="block w-full text-left py-3 text-sm text-[#D4AF37] border-b border-white/5"
          @click="go(`service-${s.id}`)"
        >
          {{ t(`services.${s.id}.title`) }}
        </UButton>
      </div>
      <UButton
        variant="ghost"
        color="neutral"
        class="w-full text-left py-4 text-white font-semibold border-b border-white/10"
        @click="go('nosotros')"
      >
        {{ t('nav.about') }}
      </UButton>
      <UButton
        variant="ghost"
        color="neutral"
        class="w-full text-left py-4 text-white font-semibold border-b border-white/10"
        @click="go('contacto')"
      >
        {{ t('nav.contact') }}
      </UButton>
      <div class="mt-6 border-t border-white/10 pt-5">
        <p class="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          {{ t('language') }}
        </p>
        <div class="grid grid-cols-3 gap-2">
          <UButton
            v-for="code in supportedLocales"
            :key="code"
            variant="ghost"
            color="neutral"
            class="rounded-lg border px-2 py-2 text-sm font-semibold"
            :class="
              locale === code
                ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                : 'border-white/15 text-white'
            "
            @click="setLocale(code)"
          >
            <UIcon :name="localeIcons[code]" class="size-4" />
            {{ code.toUpperCase() }}
          </UButton>
        </div>
      </div>
      <UButton
        :href="contact.whatsappUrl"
        target="_blank"
        class="mt-6 flex justify-center text-white text-sm font-semibold px-4 py-3 rounded-lg bg-[#1B365D]"
      >
        {{ t('common.whatsapp') }}
      </UButton>
    </div>
  </header>
</template>
