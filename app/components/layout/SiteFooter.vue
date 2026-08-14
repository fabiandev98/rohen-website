<script setup lang="ts">
import RohenLogo from './RohenLogo.vue'
import { useI18n } from 'vue-i18n'
import { contact, services } from '../../data/site'
defineEmits<{ navigate: [page: string] }>()
const { t } = useI18n()
</script>
<template>
  <footer class="border-t border-gray-200 bg-white">
    <div class="max-w-[1280px] mx-auto px-6 lg:px-8 pt-12 pb-6">
      <div class="grid gap-10 mb-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <RohenLogo />
          <p class="my-5 text-sm leading-relaxed text-gray-500">
            {{ t('footer.description') }}
          </p>
          <div class="flex gap-3">
            <a :href="contact.linkedin" target="_blank" class="social">in</a
            ><a :href="contact.whatsappUrl" target="_blank" class="social" aria-label="WhatsApp">
              <UIcon name="i-simple-icons-whatsapp" class="size-4" /> </a
            ><a :href="contact.instagram" target="_blank" class="social" aria-label="Instagram">
              <UIcon name="i-simple-icons-instagram" class="size-4" />
            </a>
          </div>
        </div>
        <div>
          <h3>{{ t('footer.navigation') }}</h3>
          <UButton
            v-for="l in [
              { n: t('nav.home'), p: 'inicio' },
              { n: t('nav.about'), p: 'nosotros' },
              { n: t('nav.services'), p: 'servicios' },
              { n: t('nav.contact'), p: 'contacto' },
            ]"
            :key="l.p"
            variant="link"
            color="neutral"
            class="footer-link"
            @click="$emit('navigate', l.p)"
          >
            {{ l.n }}
          </UButton>
        </div>
        <div>
          <h3>{{ t('footer.services') }}</h3>
          <UButton
            v-for="s in services"
            :key="s.id"
            variant="link"
            color="neutral"
            class="footer-link"
            @click="$emit('navigate', `service-${s.id}`)"
          >
            {{ t(`services.${s.id}.title`) }}
          </UButton>
        </div>
        <div>
          <h3>{{ t('footer.contact') }}</h3>
          <a :href="`mailto:${contact.email}`" class="footer-link">✉ {{ contact.email }}</a
          ><a :href="contact.phoneUrl" class="footer-link">☎ {{ contact.whatsappLabel }}</a>
          <p class="footer-link">⌖ {{ contact.location }}</p>
        </div>
      </div>
      <div
        class="flex flex-col justify-between gap-4 border-t border-gray-200 pt-6 text-xs text-gray-400 sm:flex-row"
      >
        <p>
          © {{ new Date().getFullYear() }} ROHEN Supply Chain Solutions. {{ t('footer.rights') }}
        </p>
        <div class="flex gap-6">
          <UButton variant="link" color="neutral">{{ t('footer.privacy') }}</UButton>
          <UButton variant="link" color="neutral">{{ t('footer.terms') }}</UButton>
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
  color: #0d1b2a;
  margin-bottom: 1.25rem;
}
.footer-link {
  display: block;
  color: #6b7280;
  font-size: 0.875rem;
  text-align: left;
  margin-bottom: 0.75rem;
}
.footer-link:hover {
  color: #0d1b2a;
}
.social {
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  display: grid;
  place-items: center;
  color: #0d1b2a;
  transition:
    border-color 0.2s,
    color 0.2s,
    background-color 0.2s;
}
.social:hover {
  border-color: #d4af37;
  background-color: #fdf7e7;
  color: #0d1b2a;
}
</style>
