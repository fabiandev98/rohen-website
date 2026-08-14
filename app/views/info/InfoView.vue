<script setup lang="ts">
import { contact, services } from '../../data/site'
import { useI18n } from 'vue-i18n'
defineProps<{ page: string }>()
defineEmits<{ navigate: [page: string] }>()
const { t } = useI18n()
const values = [
  ['Rigor técnico', 'Aplicamos metodologías probadas y análisis sólidos en cada proyecto.'],
  [
    'Compromiso con resultados',
    'Medimos nuestro éxito por el impacto real que generamos en la operación.',
  ],
  ['Transparencia', 'Comunicamos con claridad y honestidad en cada etapa del proceso.'],
  ['Adaptabilidad', 'Diseñamos soluciones a la medida de cada cliente y su contexto.'],
  ['Colaboración', 'Trabajamos como extensión del equipo interno de cada organización.'],
  ['Mejora continua', 'Buscamos constantemente nuevas oportunidades de eficiencia y valor.'],
]
</script>
<template>
  <main class="py-20">
    <div class="max-w-[1280px] mx-auto px-6 lg:px-8">
      <template v-if="page === 'nosotros'"
        ><div class="heading">
          <p class="eyebrow">SOBRE NOSOTROS</p>
          <h1>Enfoque estratégico. Resultados reales.</h1>
          <p>
            Somos un equipo de profesionales especializados en supply chain, logística y consultoría
            estratégica, comprometidos con el éxito de nuestros clientes.
          </p>
        </div>
        <div class="flex flex-col lg:flex-row gap-12 items-center mb-20">
          <img
            src="https://images.unsplash.com/photo-1689942010216-dc412bb1e7a9?w=800&h=560&fit=crop&auto=format"
            alt="Bodega industrial"
            class="lg:w-1/2 w-full h-80 lg:h-96 object-cover rounded-2xl"
          />
          <div class="lg:w-1/2">
            <h2 class="text-2xl font-bold mb-4 text-[#0D1B2A]">Nuestra misión</h2>
            <p class="copy">
              Ayudamos a empresas a transformar su cadena de suministro en una ventaja competitiva
              sostenible, a través de soluciones prácticas, estructuradas y orientadas a resultados.
            </p>
            <p class="copy mt-4">
              Trabajamos de forma cercana con cada cliente, entendiendo su operación y sus
              objetivos, para diseñar e implementar soluciones que realmente funcionen.
            </p>
          </div>
        </div>
        <div class="text-center mb-10">
          <p class="eyebrow">NUESTROS VALORES</p>
          <h2 class="text-3xl font-bold text-[#0D1B2A]">Lo que nos define</h2>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="v in values"
            :key="v[0]"
            class="p-6 rounded-xl border border-gray-200 bg-[#F8F9FA]"
          >
            <i class="block w-2 h-2 rounded-full mb-4 bg-[#D4AF37]"></i>
            <h3 class="font-bold mb-2 text-[#0D1B2A]">{{ v[0] }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ v[1] }}</p>
          </article>
        </div></template
      >
      <template v-else-if="page === 'servicios'"
        ><div class="heading">
          <p class="eyebrow">NUESTROS SERVICIOS</p>
          <h1>Soluciones a la medida de tu operación.</h1>
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
              Ver servicio →
            </UButton>
          </article>
        </div></template
      >
      <template v-else
        ><div class="heading">
          <p class="eyebrow">CONTACTO</p>
          <h1>Hablemos sobre tu operación.</h1>
          <p>
            La forma más rápida de contactarnos es por WhatsApp. También puedes escribirnos al
            correo o llamarnos directamente.
          </p>
        </div>
        <div class="grid lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <a :href="contact.whatsappUrl" target="_blank" class="contact-card"
            ><b>WHATSAPP</b><span>{{ contact.whatsappLabel }}</span></a
          ><a :href="`mailto:${contact.email}`" class="contact-card"
            ><b>EMAIL</b><span>{{ contact.email }}</span></a
          >
          <div class="contact-card">
            <b>UBICACIÓN</b><span>{{ contact.location }}</span>
          </div>
        </div>
        <div class="mt-12 text-center">
          <UButton
            :href="contact.whatsappUrl"
            target="_blank"
            class="inline-flex text-white text-sm font-semibold px-8 py-4 rounded-lg bg-[#0D1B2A]"
          >
            INICIAR CONVERSACIÓN POR WHATSAPP
          </UButton>
        </div></template
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
  padding: 2rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  text-align: center;
  color: #0d1b2a;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.contact-card b {
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: #d4af37;
}
.contact-card span {
  font-weight: 600;
}
</style>
