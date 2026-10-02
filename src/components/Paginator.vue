<template>
  <nav
    v-if="totalPages > 1"
    aria-label="Pagination"
    class="flex items-center justify-center gap-2"
  >
    <button
      type="button"
      aria-label="Previous page"
      :disabled="modelValue <= 1"
      @click="go(modelValue - 1)"
      class="h-10 w-10 shrink-0 rounded-full border border-gray-200 bg-white text-gray-600 flex items-center justify-center shadow-sm transition-colors hover:bg-green-50 hover:border-green-200 hover:text-green-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-600"
    >
      <i class="fa-solid fa-chevron-left text-xs"></i>
    </button>

    <ul class="hidden sm:flex items-center gap-2">
      <li v-for="item in items" :key="item">
        <button
          v-if="typeof item === 'number'"
          type="button"
          :aria-label="`Page ${item}`"
          :aria-current="item === modelValue ? 'page' : undefined"
          @click="go(item)"
          class="h-10 min-w-10 px-3 rounded-full border text-sm font-semibold flex items-center justify-center transition-colors"
          :class="item === modelValue
            ? 'bg-green-600 border-green-600 text-white shadow-sm'
            : 'bg-white border-gray-200 text-gray-700 hover:bg-green-50 hover:border-green-200 hover:text-green-700'"
        >
          {{ item }}
        </button>

        <span v-else class="h-10 w-6 flex items-center justify-center text-gray-500" aria-hidden="true">…</span>
      </li>
    </ul>

    <span class="sm:hidden px-2 text-sm font-medium text-gray-600">
      Page {{ modelValue }} of {{ totalPages }}
    </span>

    <button
      type="button"
      aria-label="Next page"
      :disabled="modelValue >= totalPages"
      @click="go(modelValue + 1)"
      class="h-10 w-10 shrink-0 rounded-full border border-gray-200 bg-white text-gray-600 flex items-center justify-center shadow-sm transition-colors hover:bg-green-50 hover:border-green-200 hover:text-green-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-600"
    >
      <i class="fa-solid fa-chevron-right text-xs"></i>
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Number, required: true },   // current page (1-based)
  totalPages: { type: Number, required: true },
  siblings: { type: Number, default: 1 },          // pages shown each side of the current one
})

const emit = defineEmits(['update:modelValue'])

function go(page) {
  const next = Math.min(Math.max(page, 1), props.totalPages)
  if (next !== props.modelValue) emit('update:modelValue', next)
}

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => from + i)

const items = computed(() => {
  const total = props.totalPages
  const current = props.modelValue
  const s = props.siblings

  const maxSlots = s * 2 + 5
  if (total <= maxSlots) return range(1, total)

  const left = Math.max(current - s, 1)
  const right = Math.min(current + s, total)
  const showLeftDots = left > 2
  const showRightDots = right < total - 1
  const edgeCount = s * 2 + 3

  if (!showLeftDots) return [...range(1, edgeCount), 'dots-right', total]
  if (!showRightDots) return [1, 'dots-left', ...range(total - edgeCount + 1, total)]
  return [1, 'dots-left', ...range(left, right), 'dots-right', total]
})
</script>