<script setup lang="ts">
defineProps<{ light?: boolean }>()
</script>
<template>
  <div class="flex items-center gap-3">
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="4" fill="#0D1B2A" />
      <path
        d="M10 8h12c4.4 0 8 3.6 8 8s-3.6 8-8 8h-4l8 8H21L14 24h-4v8H6V8h4zm0 12h8c2.2 0 4-1.8 4-4s-1.8-4-4-4h-8v8z"
        fill="white"
      />
      <path d="M21 24l8 8" stroke="#D4AF37" stroke-width="2.5" stroke-linecap="round" />
    </svg>
    <div>
      <div
        class="text-lg font-bold leading-none tracking-wide"
        :class="light ? 'text-white' : 'text-[#0D1B2A]'"
      >
        ROHEN
      </div>
      <div
        class="text-[9px] font-semibold tracking-widest leading-none mt-0.5 uppercase"
        :class="light ? 'text-slate-400' : 'text-gray-500'"
      >
        Supply Chain Solutions
      </div>
    </div>
  </div>
</template>
