<script setup lang="ts">
import logo from '../../assets/images/rohen-logo.svg'

defineProps<{ light?: boolean }>()
</script>
<template>
  <div class="flex items-center gap-3">
    <svg v-if="light" class="h-10 w-auto" viewBox="0 0 406 430" fill="none" aria-label="Rohen logo">
      <path
        fill="white"
        d="m27 55 60 66h179l13 4 8 5 8 8 6 10 3 11v12l-6 17-15 15-16 6H144l157 183h91L282 269l1-3 11-1 19-6 24-15 10-10 10-14 10-23 4-19v-31l-3-17-11-27-19-23-12-9-16-8-21-6-18-2Z"
      />
      <path fill="#D4AF37" d="m36 163-1 103 3 5 118 122h95l-2-5-70-79-65-77-73-66Z" />
    </svg>
    <img v-else :src="logo" alt="Rohen" class="h-10 w-auto" />
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
