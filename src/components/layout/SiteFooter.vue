<script setup lang="ts">
import RohenLogo from './RohenLogo.vue'
import { useI18n } from 'vue-i18n'
import { contact, services } from '../../data/site'
defineEmits<{ navigate: [page: string] }>()
const { t } = useI18n()
</script>
<template>
  <footer class="bg-[#0D1B2A]">
    <div class="max-w-[1280px] mx-auto px-6 lg:px-8 pt-16 pb-8">
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div>
          <RohenLogo light />
          <p class="text-sm leading-relaxed my-5 text-slate-400">
            {{ t('footer.description') }}
          </p>
          <div class="flex gap-3">
            <a :href="contact.linkedin" target="_blank" class="social">in</a
            ><a :href="contact.whatsappUrl" target="_blank" class="social">◉</a>
          </div>
        </div>
        <div>
          <h3>{{ t('footer.navigation') }}</h3>
          <button
            v-for="l in [
              { n: t('nav.home'), p: 'inicio' },
              { n: t('nav.about'), p: 'nosotros' },
              { n: t('nav.services'), p: 'servicios' },
              { n: t('nav.contact'), p: 'contacto' },
            ]"
            :key="l.p"
            class="footer-link"
            @click="$emit('navigate', l.p)"
          >
            {{ l.n }}
          </button>
        </div>
        <div>
          <h3>{{ t('footer.services') }}</h3>
          <button
            v-for="s in services"
            :key="s.id"
            class="footer-link"
            @click="$emit('navigate', `service-${s.id}`)"
          >
            {{ t(`services.${s.id}.title`) }}
          </button>
        </div>
        <div>
          <h3>{{ t('footer.contact') }}</h3>
          <a :href="`mailto:${contact.email}`" class="footer-link">✉ {{ contact.email }}</a
          ><a :href="contact.phoneUrl" class="footer-link">☎ {{ contact.whatsappLabel }}</a>
          <p class="footer-link">⌖ {{ contact.location }}</p>
        </div>
      </div>
      <div
        class="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4 text-xs text-slate-500"
      >
        <p>
          © {{ new Date().getFullYear() }} ROHEN Supply Chain Solutions. {{ t('footer.rights') }}
        </p>
        <div class="flex gap-6">
          <button>{{ t('footer.privacy') }}</button><button>{{ t('footer.terms') }}</button>
        </div>
      </div>
    </div>
  </footer>
</template>
<style scoped>
h3 {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #94a3b8;
  margin-bottom: 1.25rem;
}
.footer-link {
  display: block;
  color: #cbd5e1;
  font-size: 0.875rem;
  text-align: left;
  margin-bottom: 0.75rem;
}
.footer-link:hover {
  color: white;
}
.social {
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid rgb(255 255 255/0.15);
  border-radius: 0.5rem;
  display: grid;
  place-items: center;
  color: #cbd5e1;
}
</style>
