<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { contact, services } from '../../data/site'
import CtaBanner from '../../components/shared/CtaBanner.vue'
import ActionButton from '../../components/shared/ActionButton.vue'
defineEmits<{ navigate: [page: string] }>()
const hovered = ref('')
const icons = [
  'i-lucide-zoom-in',
  'i-lucide-chart-no-axes-combined',
  'i-lucide-package',
  'i-lucide-shield-check',
  'i-lucide-clipboard-list',
] as const
const { t } = useI18n()
</script>
<template>
  <main>
    <section class="bg-white overflow-hidden">
      <div
        class="max-w-[1280px] mx-auto px-6 lg:px-8 py-16 lg:py-0 flex flex-col lg:flex-row lg:min-h-[520px]"
      >
        <div class="flex flex-col justify-center lg:w-[52%] lg:pr-12 lg:py-20">
          <p class="eyebrow">{{ t('home.eyebrow') }}</p>
          <h1
            class="text-4xl sm:text-5xl lg:text-[52px] font-bold leading-[1.1] mb-5 text-[#0D1B2A]"
          >
            {{ t('home.title') }}<br /><span class="font-normal">{{ t('home.titleAccent') }}</span>
          </h1>
          <p class="text-base lg:text-lg leading-relaxed mb-8 max-w-[480px] text-[#6B7280]">
            {{ t('home.description') }}
          </p>
          <ActionButton
            :href="contact.whatsappUrl"
            target="_blank"
            :label="t('common.contactUs')"
            background-color="#0D1B2A"
            text-color="#FFFFFF"
            class="self-start"
          >
            ◉&nbsp; {{ t('common.whatsapp') }}
          </ActionButton>
        </div>
        <div class="lg:w-[48%] mt-10 lg:mt-0 relative">
          <div
            class="hidden lg:block absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-white to-transparent"
          ></div>
          <img
            src="https://images.unsplash.com/photo-1559297434-fae8a1916a79?w=900&h=640&fit=crop&auto=format"
            alt="Camión con contenedores en puerto logístico"
            class="w-full h-full object-cover min-h-[320px] max-h-[520px]"
          />
        </div>
      </div>
    </section>
    <section class="py-20 bg-[#F8F9FA]">
      <div class="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div class="text-center mb-12">
          <p class="eyebrow">{{ t('home.servicesEyebrow') }}</p>
          <h2 class="section-title">{{ t('home.servicesTitle') }}</h2>
        </div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          <article
            v-for="(card, i) in services"
            :key="card.id"
            class="group flex min-h-[330px] cursor-pointer flex-col rounded-lg bg-white p-6 transition-all duration-200 lg:col-span-2"
            :class="[
              hovered === card.id ? 'border-[#D4AF37] -translate-y-1 shadow-lg' : 'border-gray-200',
              i === 3 ? 'lg:col-start-2' : '',
            ]"
            style="border-width: 1px"
            @mouseenter="hovered = card.id"
            @mouseleave="hovered = ''"
            @click="$emit('navigate', `service-${card.id}`)"
          >
            <UIcon
              :name="icons[i]"
              class="mb-4 size-8 text-[#D4AF37] transition-transform duration-200 group-hover:scale-110"
            />
            <h3 class="text-base font-bold mb-3 leading-snug text-[#0D1B2A]">
              {{ t(`services.${card.id}.title`) }}
            </h3>
            <p class="text-sm leading-relaxed flex-1 mb-4 text-[#6B7280]">
              {{ t(`services.${card.id}.description`) }}
            </p>
            <UButton
              variant="link"
              color="neutral"
              class="text-sm font-semibold text-left"
              :class="hovered === card.id ? 'text-[#D4AF37]' : 'text-[#0D1B2A]'"
            >
              {{ t('common.explore') }} →
            </UButton>
          </article>
        </div>
      </div>
    </section>
    <section class="py-20 bg-white">
      <div
        class="max-w-[1280px] mx-auto px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16"
      >
        <div class="lg:w-1/2">
          <p class="eyebrow">{{ t('home.aboutEyebrow') }}</p>
          <h2 class="section-title mb-5">{{ t('home.aboutTitle') }}</h2>
          <p class="body-copy mb-4">{{ t('home.aboutDescription') }}</p>
          <p class="body-copy mb-8">{{ t('home.aboutVision') }}</p>
          <ActionButton
            :label="t('home.learnMore')"
            background-color="#0D1B2A"
            text-color="#FFFFFF"
            class="px-5 py-3"
            @click="$emit('navigate', 'nosotros')"
          >
            {{ t('home.learnMore') }} →
          </ActionButton>
        </div>
        <div class="lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1740914994657-f1cdffdc418e?w=800&h=560&fit=crop&auto=format"
            alt="Montacargas en bodega organizada"
            class="w-full h-80 lg:h-[400px] object-cover rounded-2xl"
          />
        </div>
      </div>
    </section>
    <CtaBanner />
  </main>
</template>
<style scoped>
.eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 0.75rem;
  color: #d4af37;
}
.section-title {
  font-size: clamp(1.875rem, 4vw, 2.25rem);
  font-weight: 700;
  color: #0d1b2a;
}
.body-copy {
  font-size: 1rem;
  line-height: 1.75;
  color: #6b7280;
}
</style>
