<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { contact, services } from '../../data/site'
import CtaBanner from '../../components/shared/CtaBanner.vue'
const props = defineProps<{ serviceId: string }>()
const { t } = useI18n()
const active = ref(0)
const details: Record<string, { scope: string[]; value: string[] }> = {
  procurement: {
    scope: [
      'Análisis de gasto y segmentación de categorías.',
      'Estrategia de abastecimiento y definición de sourcing.',
      'Evaluación, selección y desarrollo de proveedores.',
      'Negociación de contratos y gestión de condiciones.',
      'Gestión de desempeño y riesgos de proveedores.',
      'Mejora continua y generación de ahorros sostenibles.',
    ],
    value: [
      'Reducción de costos totales sin comprometer calidad.',
      'Proveedores más confiables y relaciones estratégicas.',
      'Procesos de compra más ágiles y eficientes.',
      'Visibilidad total del gasto y mejor control presupuestal.',
      'Cadenas de suministro más resilientes y sostenibles.',
    ],
  },
  'planning-cost-control': {
    scope: [
      'Planificación de la demanda y pronóstico.',
      'Planificación de materiales y requerimientos.',
      'Elaboración de presupuesto operativo.',
      'Proyección y control de costos.',
      'Planificación de inventarios y BOQ.',
      'Control presupuestal y seguimiento de desviaciones.',
    ],
    value: [
      'Control financiero claro y estructurado.',
      'Pronósticos más precisos y confiables.',
      'Reducción de desperdicios y sobrecostos.',
      'Mejor toma de decisiones basada en datos.',
      'Rentabilidad mejorada y sostenible.',
    ],
  },
  'logistics-materials': {
    scope: [
      'Gestión y control de inventarios.',
      'Recepción, almacenamiento y despacho de materiales.',
      'Planificación de entregas y distribución.',
      'Control de stock y puntos de reorden.',
      'Organización de sitio y aplicación de 5S.',
      'Manejo seguro y eficiente de materiales.',
    ],
    value: [
      'Disponibilidad garantizada de materiales clave.',
      'Reducción de desperdicios y pérdidas operativas.',
      'Menor número de faltantes y paros por desabasto.',
      'Mayor productividad del equipo operativo.',
      'Trazabilidad completa del flujo de materiales.',
    ],
  },
  'advisory-risk': {
    scope: [
      'Evaluación de riesgos en la cadena de suministro.',
      'Inteligencia de mercado y benchmarking.',
      'Monitoreo de factores geopolíticos y regulatorios.',
      'Análisis de riesgos por proveedor y categoría.',
      'Planificación de escenarios y planes de contingencia.',
    ],
    value: [
      'Reducción del nivel de exposición a riesgos críticos.',
      'Continuidad operativa ante disrupciones externas.',
      'Mayor preparación ante escenarios adversos.',
      'Decisiones más rápidas e informadas.',
      'Cadena de suministro más resiliente y adaptable.',
    ],
  },
}
const methods = [
  {
    title: 'Diagnóstico',
    headline: 'Entendemos tu operación actual',
    description:
      'Realizamos un análisis profundo de tu situación, procesos y oportunidades para establecer un punto de partida claro.',
  },
  {
    title: 'Planificación',
    headline: 'Definimos la estrategia',
    description:
      'Diseñamos un plan adaptado a tu operación, estableciendo prioridades, responsables y metas medibles.',
  },
  {
    title: 'Implementación',
    headline: 'Ejecutamos con tu equipo',
    description:
      'Acompañamos la ejecución de las mejoras junto con tu equipo, asegurando resultados concretos.',
  },
  {
    title: 'Optimización',
    headline: 'Mejoramos de forma continua',
    description:
      'Monitoreamos el desempeño para sostener los resultados e identificar nuevas oportunidades.',
  },
] as const
const service = computed(() => services.find((s) => s.id === props.serviceId))
const detail = computed(() => details[props.serviceId])
const timelineItems = methods.map((method, index) => ({
  title: method.title,
  value: index,
}))
const activeMethod = computed(() => methods[active.value] ?? methods[0])

function selectMethod(_event: Event, item: { value?: string | number }) {
  const index = Number(item.value)

  if (Number.isInteger(index) && index >= 0 && index < methods.length) {
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
          <UButton :href="contact.whatsappUrl" target="_blank" class="primary self-start">
            ◉&nbsp; {{ t('common.whatsapp') }}
          </UButton>
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
          class="bg-white rounded-2xl p-8 lg:p-12 border border-gray-200 grid lg:grid-cols-2 gap-12"
        >
          <div>
            <h2 class="list-title">◎ {{ t('serviceDetail.scope') }}</h2>
            <ul class="space-y-4">
              <li v-for="item in detail.scope" :key="item" class="flex gap-3 text-sm text-gray-700">
                <b class="text-[#D4AF37]">✓</b>{{ item }}
              </li>
            </ul>
          </div>
          <div>
            <h2 class="list-title">☆ {{ t('serviceDetail.value') }}</h2>
            <div class="space-y-3">
              <div
                v-for="item in detail.value"
                :key="item"
                class="p-4 rounded-lg bg-[#F8F9FA] border border-gray-200 text-sm text-gray-700"
              >
                <b class="text-[#D4AF37]">⚡</b> {{ item }}
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
            root: 'w-full',
            item: 'cursor-pointer',
            indicator:
              'size-14 lg:size-16 !border-2 !border-gray-200 !bg-white !text-gray-400 group-data-[state=active]:!border-[#0D1B2A] group-data-[state=active]:!bg-[#0D1B2A] group-data-[state=active]:!text-[#D4AF37]',
            separator: 'h-px bg-gray-200 group-data-[state=completed]:!bg-[#0D1B2A]',
            wrapper: 'pt-3 text-center',
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
.primary {
  display: inline-flex;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  background: #0d1b2a;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
}
.list-title {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #0d1b2a;
  margin-bottom: 1.5rem;
}
</style>
