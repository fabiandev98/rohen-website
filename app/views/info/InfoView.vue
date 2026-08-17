<script setup lang="ts">
import { computed } from 'vue'
import { contact, services } from '../../data/site'
import { useI18n } from 'vue-i18n'
defineProps<{ page: string }>()
defineEmits<{ navigate: [page: string] }>()
const { t } = useI18n()
const locationMapUrl =
  'https://www.google.com/maps/search/?api=1&query=Business%20Centre%2C%20Sharjah%2C%20United%20Arab%20Emirates'
const valueKeys = [
  'technicalRigor',
  'resultsCommitment',
  'transparency',
  'adaptability',
  'collaboration',
  'continuousImprovement',
] as const
const values = computed(() =>
  valueKeys.map((key) => ({
    title: t(`about.values.${key}.title`),
    description: t(`about.values.${key}.description`),
  })),
)
const valueIcons = [
  'i-lucide-badge-check',
  'i-lucide-target',
  'i-lucide-eye',
  'i-lucide-sliders-horizontal',
  'i-lucide-handshake',
  'i-lucide-chart-no-axes-combined',
] as const
</script>
<template>
  <main class="py-20">
    <div class="max-w-[1280px] mx-auto px-6 lg:px-8">
      <template v-if="page === 'nosotros'"
        ><div class="heading">
          <p class="eyebrow">{{ t('about.eyebrow') }}</p>
          <h1>{{ t('about.title') }}</h1>
          <p>{{ t('about.description') }}</p>
        </div>
        <div class="flex flex-col lg:flex-row gap-12 items-center mb-20">
          <img
            src="https://images.unsplash.com/photo-1689942010216-dc412bb1e7a9?w=800&h=560&fit=crop&auto=format"
            :alt="t('about.imageAlt')"
            class="lg:w-1/2 w-full h-80 lg:h-96 object-cover rounded-2xl"
          />
          <div class="lg:w-1/2">
            <h2 class="text-2xl font-bold mb-4 text-[#0D1B2A]">{{ t('about.missionTitle') }}</h2>
            <p class="copy">{{ t('about.missionDescription') }}</p>
            <p class="copy mt-4">{{ t('about.missionApproach') }}</p>
          </div>
        </div>
        <div class="text-center mb-10">
          <p class="eyebrow">{{ t('about.valuesEyebrow') }}</p>
          <h2 class="text-3xl font-bold text-[#0D1B2A]">{{ t('about.valuesTitle') }}</h2>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="(v, index) in values"
            :key="v.title"
            class="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-lg"
          >
            <UIcon
              :name="valueIcons[index]"
              class="mb-4 size-7 text-[#D4AF37] transition-transform duration-200 group-hover:translate-x-1"
            />
            <h3 class="font-bold mb-2 text-[#0D1B2A]">{{ v.title }}</h3>
            <p class="text-sm leading-relaxed text-[#4B5563]">{{ v.description }}</p>
          </article>
        </div></template
      >
      <template v-else-if="page === 'servicios'"
        ><div class="heading">
          <p class="eyebrow">{{ t('home.servicesEyebrow') }}</p>
          <h1>{{ t('home.servicesTitle') }}</h1>
        </div>
        <div class="space-y-6">
          <article
            v-for="s in services"
            :key="s.id"
            class="flex flex-col lg:flex-row lg:items-center gap-6 p-8 rounded-xl border border-gray-200 cursor-pointer hover:shadow-md"
            @click="$emit('navigate', `service-${s.id}`)"
          >
            <div class="flex-1">
              <p class="eyebrow">{{ t(`services.${s.id}.eyebrow`) }}</p>
              <h2 class="text-xl font-bold mb-2 text-[#0D1B2A]">
                {{ t(`services.${s.id}.title`) }}
              </h2>
              <p class="text-sm text-gray-500">{{ t(`services.${s.id}.description`) }}</p>
            </div>
            <UButton variant="link" color="neutral" class="font-semibold text-sm">
              {{ t('common.viewService') }} →
            </UButton>
          </article>
        </div></template
      >
      <template v-else
        ><div class="heading">
          <p class="eyebrow">{{ t('contactPage.eyebrow') }}</p>
          <h1>{{ t('contactPage.title') }}</h1>
          <p>{{ t('contactPage.description') }}</p>
        </div>
        <div class="grid gap-5 max-w-3xl mx-auto lg:grid-cols-3">
          <a :href="contact.whatsappUrl" target="_blank" rel="noopener" class="contact-card">
            <UIcon name="i-simple-icons-whatsapp" class="contact-icon" />
            <b>WHATSAPP</b>
            <span>{{ contact.whatsappLabel }}</span>
          </a>
          <a :href="`mailto:${contact.email}`" class="contact-card">
            <UIcon name="i-lucide-mail" class="contact-icon" />
            <b>EMAIL</b>
            <span>{{ contact.email }}</span>
          </a>
          <a :href="locationMapUrl" target="_blank" rel="noopener" class="contact-card">
            <UIcon name="i-lucide-map-pin" class="contact-icon" />
            <b>{{ t('contactPage.location') }}</b>
            <span>{{ contact.location }}</span>
          </a>
        </div>
        ></template
      >
    </div>
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
.heading {
  text-align: center;
  margin-bottom: 4rem;
}
.heading h1 {
  font-size: clamp(2.25rem, 5vw, 3rem);
  font-weight: 700;
  color: #0d1b2a;
  margin-bottom: 1.25rem;
}
.heading > p:last-child,
.copy {
  font-size: 1rem;
  line-height: 1.75;
  color: #6b7280;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
}
.contact-card {
  min-height: 12.5rem;
  padding: 1.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  text-align: center;
  color: #0d1b2a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}
.contact-card:hover {
  border-color: #d4af37;
  box-shadow: 0 12px 24px rgb(13 27 42 / 0.08);
  transform: translateY(-3px);
}
.contact-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #d4af37;
}
.contact-card b {
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: #d4af37;
}
.contact-card span {
  font-weight: 600;
  line-height: 1.45;
}
</style>
