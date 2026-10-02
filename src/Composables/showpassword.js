import { ref, computed } from 'vue'

export function showPassword() {
  const isVisible = ref(false)

  const inputType = computed(() =>
    isVisible.value ? 'text' : 'password'
  )

  const toggleVisibility = () => {
    isVisible.value = !isVisible.value
  }

  const iconClass = computed(() =>
    isVisible.value ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'
  )

  return {
    isVisible,
    inputType,
    toggleVisibility,
    iconClass
  }
}