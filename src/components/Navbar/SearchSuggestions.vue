<template>
  <div
    class="bg-white border border-gray-100 rounded-xl overflow-hidden"
    :class="inline ? 'mt-3' : 'absolute top-full left-0 right-0 mt-2 shadow-xl z-50'"
  >
    <p v-if="state === 'loading'" class="px-4 py-3 text-sm text-gray-500">Searching…</p>

    <p v-else-if="state === 'error'" class="px-4 py-3 text-sm text-red-600">
      Couldn't load results. Please try again.
    </p>

    <p v-else-if="!suggestions.length" class="px-4 py-3 text-sm text-gray-500">
      No products found for “{{ query }}”
    </p>

    <template v-else>
      <ul class="max-h-[60vh] overflow-y-auto">
        <li v-for="product in suggestions" :key="product._id">
          <!-- Picking a suggestion shows that product as a card in the Shop -->
          <router-link
            :to="{ name: 'shop', query: { keyword: product.title } }"
            @click="emit('select', product)"
            class="flex items-center gap-3 px-3 py-2 hover:bg-green-50 transition-colors"
          >
            <!-- small fixed-size thumbnail beside the name (inline size so no global CSS can blow it up) -->
            <img
              :src="optimizeImage(product.imageCover, 80)"
              @error="fallbackToOriginal($event, product.imageCover)"
              :alt="product.title"
              width="40"
              height="40"
              loading="lazy"
              decoding="async"
              style="width: 40px; height: 40px"
              class="flex-none rounded-md bg-gray-50 object-contain"
            />
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium text-gray-800">{{ product.title }}</p>
              <p class="truncate text-xs text-gray-500">
                <span class="font-semibold text-green-700">{{ product.priceAfterDiscount || product.price }} EGP</span>
                <span v-if="product.category?.name"> · {{ product.category.name }}</span>
              </p>
            </div>
          </router-link>
        </li>
      </ul>

      <button
        type="button"
        @click="emit('view-all')"
        class="w-full px-4 py-2.5 border-t border-gray-100 text-center text-sm font-medium text-green-700 hover:bg-green-50 transition-colors"
      >
        See all results for “{{ query }}” <i class="fa-solid fa-arrow-right text-xs"></i>
      </button>
    </template>
  </div>
</template>

<script setup>
import { optimizeImage, fallbackToOriginal } from '@/utils/image'

defineProps({
  suggestions: { type: Array, default: () => [] },
  // 'loading' | 'done' | 'error'
  state: { type: String, default: 'done' },
  query: { type: String, default: '' },
  // inline = normal flow (mobile menu); default = floating under the input (desktop)
  inline: { type: Boolean, default: false },
})

const emit = defineEmits(['select', 'view-all'])
</script>