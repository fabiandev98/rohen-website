<script setup lang="ts">
import { useRoute } from '#app'
import ServiceDetailView from '../../../views/services/ServiceDetailView.vue'

const route = useRoute()
</script>

<template>
  <ServiceDetailView :service-id="String(route.params.serviceId)" />
</template>
