<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from '#app'
import ServiceDetailView from '../../views/services/ServiceDetailView.vue'

const route = useRoute()
const serviceId = computed(() => route.params.serviceId as string)
</script>

<template>
  <ServiceDetailView :service-id="serviceId" />
</template>
