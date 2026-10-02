<script setup>
import { VueSpinnerRing } from 'vue3-spinners'

defineProps({
  size: {
    type: Number,
    default: 50
  },
  color: {
    type: String,
    default: '#16a34a'
  },
  full: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div v-if="full" class="flex items-center justify-center w-full py-10">
    <VueSpinnerRing :size="size" :color="color" />
  </div>

  <VueSpinnerRing v-else :size="size" :color="color" />
</template>