<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { contact, services } from '../../data/site'
import CtaBanner from '../../components/shared/CtaBanner.vue'
import ActionButton from '../../components/shared/ActionButton.vue'
const props = defineProps<{ serviceId: string }>()
const { t, tm } = useI18n()
const active = ref(0)
type ServiceDetail = { scope: string[]; value: string[] }
const methods = computed(() => [
  {
    title: t('serviceDetail.methodSteps.diagnosis.title'),
    headline: t('serviceDetail.methodSteps.diagnosis.headline'),
    description: t('serviceDetail.methodSteps.diagnosis.description'),
  },
  {
    title: t('serviceDetail.methodSteps.planning.title'),
    headline: t('serviceDetail.methodSteps.planning.headline'),
    description: t('serviceDetail.methodSteps.planning.description'),
  },
  {
    title: t('serviceDetail.methodSteps.implementation.title'),
    headline: t('serviceDetail.methodSteps.implementation.headline'),
    description: t('serviceDetail.methodSteps.implementation.description'),
  },
  {
    title: t('serviceDetail.methodSteps.optimization.title'),
    headline: t('serviceDetail.methodSteps.optimization.headline'),
    description: t('serviceDetail.methodSteps.optimization.description'),
  },
])
const service = computed(() => services.find((s) => s.id === props.serviceId))
const detail = computed(() =>
  service.value
    ? (tm(`serviceDetail.details.${service.value.id}`) as unknown as ServiceDetail)
    : undefined,
)
const timelineItems = computed(() =>
  methods.value.map((method, index) => ({
    title: method.title,
    value: index,
    ui: index === methods.value.length - 1 ? { item: 'flex-none' } : undefined,
  })),
)
const activeMethod = computed(() => methods.value[active.value] ?? methods.value[0]!)

function selectMethod(event: Event, item: { value?: string | number }) {
  if (!(event.target instanceof Element) || !event.target.closest('[data-slot="indicator"]')) {
    return
  }

  const index = Number(item.value)

  if (Number.isInteger(index) && index >= 0 && index < methods.value.length) {
    active.value = index
  }
}

watch(
  () => props.serviceId,
  () => (active.value = 0),
)
</script>
<template>
  <main v-if="service && detail">
    <section class="bg-white overflow-hidden">
      <div
        class="max-w-[1280px] mx-auto px-6 lg:px-8 py-16 lg:py-0 flex flex-col lg:flex-row lg:min-h-[480px]"
      >
        <div class="flex flex-col justify-center lg:w-[52%] lg:pr-12 lg:py-20">
          <p class="eyebrow">{{ t(`services.${service.id}.eyebrow`) }}</p>
          <h1 class="text-3xl lg:text-[44px] font-bold leading-tight mb-5 text-[#0D1B2A]">
            {{ t(`services.${service.id}.title`) }}
          </h1>
          <p class="text-base lg:text-lg leading-relaxed mb-8 text-[#6B7280]">
            {{ t(`services.${service.id}.description`) }}
          </p>
          <ActionButton
            :href="contact.whatsappUrl"
            target="_blank"
            :label="t('common.contactUs')"
            background-color="#0D1B2A"
            text-color="#FFFFFF"
            class="self-start"
          >
            <!--
            ◉&nbsp; {{ t('common.whatsapp') }}
            -->
            {{ t('common.contactUs') }}
          </ActionButton>
        </div>
        <div class="lg:w-[48%] mt-10 lg:mt-0">
          <img
            :src="service.image"
            :alt="t(`services.${service.id}.title`)"
            class="w-full h-full object-cover min-h-[320px] max-h-[480px]"
          />
        </div>
      </div>
    </section>
    <section class="py-20 bg-[#F8F9FA]">
      <div class="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div
          class="bg-white rounded-2xl p-8 lg:p-12 border border-gray-200 grid lg:grid-cols-2 gap-12 lg:gap-16"
        >
          <div>
            <h2 class="list-title">
              <UIcon name="i-lucide-circle-dot" class="size-7 shrink-0 text-[#D4AF37]" />
              {{ t('serviceDetail.scope') }}
            </h2>
            <ul class="space-y-4 lg:space-y-5">
              <li
                v-for="item in detail.scope"
                :key="item"
                class="flex items-start gap-3 text-base lg:text-lg leading-relaxed text-[#34445B]"
              >
                <span
                  class="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#0D1B2A] text-white"
                >
                  <UIcon name="i-lucide-check" class="size-3.5" />
                </span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="list-title">
              <UIcon name="i-lucide-star" class="size-7 shrink-0 text-[#D4AF37]" />
              {{ t('serviceDetail.value') }}
            </h2>
            <div class="space-y-3 lg:space-y-4">
              <div
                v-for="item in detail.value"
                :key="item"
                class="flex items-center gap-4 rounded-xl border border-gray-200 bg-[#F8F9FA] px-5 py-4 text-base lg:text-lg leading-relaxed text-[#34445B]"
              >
                <UIcon name="i-lucide-zap" class="size-5 shrink-0 text-[#D4AF37]" />
                <span>{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-20">
      <div class="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div class="text-center mb-14">
          <p class="eyebrow">{{ t('serviceDetail.methodology') }}</p>
          <h2 class="text-3xl lg:text-4xl font-bold text-[#0D1B2A]">
            {{ t('serviceDetail.methodologyTitle') }}
          </h2>
        </div>
        <UTimeline
          v-model="active"
          :items="timelineItems"
          orientation="horizontal"
          color="neutral"
          :ui="{
            root: 'w-full pb-12 lg:pb-14',
            indicator:
              'size-14 lg:size-16 cursor-pointer !border-2 !border-gray-200 !bg-white !text-gray-400 transition-transform duration-200 hover:scale-110 hover:!border-[#D4AF37] group-data-[state=active]:!border-[#0D1B2A] group-data-[state=active]:!bg-[#0D1B2A] group-data-[state=active]:!text-[#D4AF37]',
            separator: 'h-px bg-gray-200 group-data-[state=completed]:!bg-[#0D1B2A]',
            wrapper:
              'absolute top-[68px] left-11 w-44 -translate-x-1/2 text-center lg:top-20 lg:left-12',
            title:
              'hidden sm:block text-xs lg:text-sm font-bold leading-tight text-gray-400 group-data-[state=active]:!text-[#0D1B2A]',
          }"
          @select="selectMethod"
        >
          <template #indicator="{ item }"> 0{{ Number(item.value) + 1 }} </template>
        </UTimeline>
        <div class="mt-10 p-6 lg:p-8 rounded-xl bg-[#F8F9FA] border border-gray-200">
          <p class="eyebrow">{{ activeMethod.title }}</p>
          <h3 class="text-xl font-bold mb-3 text-[#0D1B2A]">{{ activeMethod.headline }}</h3>
          <p class="text-gray-500 max-w-2xl">{{ activeMethod.description }}</p>
        </div>
      </div>
    </section>
    <CtaBanner />
  </main>
  <div v-else class="min-h-[60vh] grid place-items-center text-gray-500">
    {{ t('common.notFound') }}
  </div>
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
.list-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #0d1b2a;
  margin-bottom: 2rem;
}
</style>
