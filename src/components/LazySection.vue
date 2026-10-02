<template>
  <div ref="root" :style="visible ? undefined : { minHeight }">
    <slot v-if="visible" />
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  minHeight: { type: String, default: '400px' },
  rootMargin: { type: String, default: '300px' },
})

const root = ref(null)
const visible = ref(false)
let observer = null

onMounted(() => {
  if (!('IntersectionObserver' in window)) {
    visible.value = true
    return
  }
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true
        observer.disconnect() 
      }
    },
    { rootMargin: props.rootMargin }
  )
  observer.observe(root.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>