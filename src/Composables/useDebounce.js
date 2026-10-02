import { ref, watch, onScopeDispose } from 'vue'


export function useDebounce(source, delay = 300) {
  const debounced = ref(source.value)
  const settled = ref(0)
  let timer = null

  function cancel() {
    clearTimeout(timer)
    timer = null
  }

  function apply(value) {
    debounced.value = value
    settled.value++
  }

  function flush() {
    cancel()
    apply(source.value)
  }

  watch(source, (value) => {
    cancel()
    timer = setTimeout(() => {
      timer = null
      apply(value)
    }, delay)
  })

  onScopeDispose(cancel)

  return { debounced, settled, flush, cancel }
}