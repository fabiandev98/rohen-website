<script setup lang="ts">
import RohenLogo from './RohenLogo.vue'
import { useI18n } from 'vue-i18n'
import { contact } from '../../data/site'
defineEmits<{ navigate: [page: string] }>()
const { t } = useI18n()
</script>
<template>
  <footer class="border-t border-[#1B365D] bg-[#0D1B2A]">
    <div class="max-w-[1280px] mx-auto px-6 lg:px-8 pt-12 pb-6">
      <div class="footer-grid grid grid-cols-2 gap-10 mb-10 lg:grid-cols-3">
        <div class="footer-brand col-span-2 lg:col-span-1">
          <RohenLogo light class="footer-logo" />
          <p class="my-5 text-sm leading-relaxed text-slate-300">
            {{ t('footer.description') }}
          </p>
          <div class="footer-social flex gap-3">
            <a :href="contact.linkedin" target="_blank" class="social">in</a
            ><a :href="contact.whatsappUrl" target="_blank" class="social" aria-label="WhatsApp">
              <UIcon name="i-simple-icons-whatsapp" class="size-4" /> </a
            ><a :href="contact.instagram" target="_blank" class="social" aria-label="Instagram">
              <UIcon name="i-simple-icons-instagram" class="size-4" />
            </a>
          </div>
        </div>
        <div class="footer-navigation col-span-2 lg:col-span-1">
          <h3>{{ t('footer.navigation') }}</h3>
          <div class="footer-nav-links">
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
        </div>
        <div class="footer-contact col-span-2 lg:col-span-1">
          <h3>{{ t('footer.contact') }}</h3>
          <a :href="`mailto:${contact.email}`" class="footer-link">
            <UIcon name="i-lucide-mail" class="size-4 shrink-0" />
            {{ contact.email }}
          </a>
          <a :href="contact.phoneUrl" class="footer-link">
            <UIcon name="i-lucide-phone" class="size-4 shrink-0" />
            {{ contact.whatsappLabel }}
          </a>
          <p class="footer-link">
            <UIcon name="i-lucide-map-pin" class="size-4 shrink-0" />
            {{ contact.location }}
          </p>
        </div>
      </div>
      <div
        class="flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 text-center text-xs text-slate-400 sm:flex-row sm:text-left"
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
  color: #d4af37;
  margin-bottom: 1.25rem;
}
.footer-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #cbd5e1;
  font-size: 0.875rem;
  text-align: left;
  margin-bottom: 0.75rem;
}
.footer-link:hover {
  color: #ffffff;
}
@media (max-width: 639px) {
  .footer-grid {
    gap: 2.5rem;
    text-align: center;
  }
  .footer-logo,
  .footer-social {
    justify-content: center;
  }
  .footer-navigation h3,
  .footer-contact h3 {
    display: none;
  }
  .footer-nav-links {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.25rem 1rem;
  }
  .footer-nav-links .footer-link {
    margin-bottom: 0;
  }
  .footer-contact .footer-link {
    justify-content: center;
  }
}
.social {
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid rgb(255 255 255 / 0.12);
  border-radius: 0.5rem;
  display: grid;
  place-items: center;
  color: #ffffff;
  transition:
    border-color 0.2s,
    color 0.2s,
    background-color 0.2s;
}
.social:hover {
  border-color: rgb(212 175 55 / 0.65);
  background-color: rgb(255 255 255 / 0.06);
  color: #d4af37;
}
</style>
