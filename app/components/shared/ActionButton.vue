<script setup lang="ts">
defineOptions({ inheritAttrs: false })

withDefaults(
  defineProps<{
    label: string
    href?: string
    icon?: string
    backgroundColor?: string
    textColor?: string
  }>(),
  {
    href: undefined,
    icon: undefined,
    backgroundColor: '#0D1B2A',
    textColor: '#FFFFFF',
  },
)
</script>

<template>
  <UButton
    v-bind="$attrs"
    :href="href"
    :icon="icon"
    color="neutral"
    class="min-h-10 rounded-lg px-4 py-2 text-sm font-semibold transition hover:brightness-110"
    :style="{ backgroundColor, color: textColor }"
  >
    {{ label }}
  </UButton>
</template>
