<script setup lang="ts">
import { computed } from 'vue'
import type { SupportedLocale } from '../../i18n'

const props = defineProps<{ locale: SupportedLocale; label: string }>()
const emit = defineEmits<{ select: [locale: SupportedLocale] }>()

const options: Array<{ code: SupportedLocale; label: string }> = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
]

const menuItems = computed(() =>
  options.map((option) => ({
    ...option,
    checked: props.locale === option.code,
    onSelect: () => emit('select', option.code),
  })),
)
</script>

<template>
  <UDropdownMenu
    :items="menuItems"
    :content="{ align: 'end', sideOffset: 8 }"
    :ui="{
      content: 'w-44 rounded-lg border border-gray-200 bg-white p-1 shadow-xl',
      item: 'rounded-md px-3 py-2.5 text-sm font-medium !text-slate-600 hover:!text-[#0D1B2A] data-highlighted:!text-[#0D1B2A] data-highlighted:before:!bg-[#F8F9FA]',
      itemLeadingIcon: 'hidden',
      itemLabel: '!text-slate-600 group-data-highlighted:!text-[#0D1B2A]',
    }"
    class="hidden lg:inline-flex"
  >
    <template #default="{ open }">
      <button
        class="inline-flex min-h-10 shrink-0 flex-nowrap items-center gap-2 whitespace-nowrap rounded-lg border px-4 py-2 text-sm font-semibold transition-colors"
        :class="
          open
            ? 'border-[#D4AF37] bg-white/10 text-[#D4AF37]'
            : 'border-white/40 text-white hover:bg-white/10'
        "
        :aria-label="label"
        :aria-expanded="open"
      >
        <UIcon name="i-lucide-globe-2" class="size-[17px] shrink-0" />
        <span
          class="locale-mark locale-mark--header shrink-0"
          :class="`locale-mark--${props.locale}`"
          >{{ props.locale.toUpperCase() }}</span
        >
        <UIcon
          :name="open ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
          class="size-3 shrink-0"
        />
      </button>
    </template>

    <template #item-leading="{ item }">
      <span class="locale-mark" :class="`locale-mark--${item.code}`">{{
        item.code.toUpperCase()
      }}</span>
    </template>
    <template #item-trailing="{ item }">
      <UIcon v-if="item.checked" name="i-lucide-check" class="ml-auto size-4 text-[#D4AF37]" />
    </template>
  </UDropdownMenu>
</template>

<style scoped>
.locale-mark {
  display: inline-grid;
  width: 1.5rem;
  height: 1rem;
  place-items: center;
  border-radius: 0.125rem;
  color: #fff;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1;
}

.locale-mark--header {
  width: 1.25rem;
  height: 0.875rem;
  font-size: 0.5625rem;
}

.locale-mark--en {
  background: #1b365d;
}
.locale-mark--es {
  background: linear-gradient(#aa151b 0 25%, #f1bf00 25% 75%, #aa151b 75%);
  color: #0d1b2a;
}
.locale-mark--pt {
  background: linear-gradient(90deg, #046a38 0 40%, #da291c 40%);
}
</style>
