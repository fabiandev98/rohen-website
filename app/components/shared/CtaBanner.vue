<script setup lang="ts">
import { contact } from '../../data/site'
import { useI18n } from 'vue-i18n'
import ActionButton from './ActionButton.vue'
const { t } = useI18n()
</script>
<template>
  <section class="py-16 bg-[#D4AF37]">
    <div
      class="max-w-[1280px] mx-auto px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
    >
      <div class="flex items-start gap-5">
        <div
          class="shrink-0 w-14 h-14 rounded-full border-2 border-[#0D1B2A]/50 flex items-center justify-center text-[#0D1B2A] text-2xl"
        >
          ◉
        </div>
        <div>
          <p class="mb-1 text-sm font-semibold uppercase tracking-[.12em] text-[#0D1B2A]">
            {{ t('cta.eyebrow') }}
          </p>
          <h2 class="text-xl font-bold leading-snug text-[#0D1B2A] lg:text-2xl">
            {{ t('cta.title') }}
          </h2>
        </div>
      </div>
      <ActionButton
        :href="contact.whatsappUrl"
        target="_blank"
        :label="t('common.contactUs')"
        icon="i-simple-icons-whatsapp"
        background-color="#0D1B2A"
        text-color="#D4AF37"
        class="flex min-h-[52px] items-center justify-center px-8 py-4 font-bold"
      />
    </div>
  </section>
</template>
