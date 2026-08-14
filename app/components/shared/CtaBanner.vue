<script setup lang="ts">
import { contact } from '../../data/site'
import { useI18n } from 'vue-i18n'
import ActionButton from './ActionButton.vue'
const { t } = useI18n()
</script>
<template>
  <section class="py-16 bg-[#0D1B2A]">
    <div
      class="max-w-[1280px] mx-auto px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
    >
      <div class="flex items-start gap-5">
        <div
          class="shrink-0 w-14 h-14 rounded-full border-2 border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] text-2xl"
        >
          ◉
        </div>
        <div>
          <p class="text-xs font-semibold uppercase tracking-[.12em] mb-1 text-[#D4AF37]">
            {{ t('cta.eyebrow') }}
          </p>
          <h2 class="text-2xl lg:text-3xl font-bold text-white">
            {{ t('cta.title') }}
          </h2>
        </div>
      </div>
      <ActionButton
        :href="contact.whatsappUrl"
        target="_blank"
        :label="t('common.contactUs')"
        icon="i-simple-icons-whatsapp"
        background-color="#D4AF37"
        text-color="#0D1B2A"
        class="flex min-h-[52px] items-center justify-center px-8 py-4 font-bold"
      />
    </div>
  </section>
</template>
