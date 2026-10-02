<template>
  <div class="bg-white border relative border-gray-200 rounded-lg overflow-hidden min-w-0 transition-all duration-300 ease-in-out shadow-sm sm:shadow-md sm:hover:-translate-y-1 sm:hover:scale-[1.03] hover:shadow-2xl h-full flex flex-col">

    <!-- Image -->
    <div class="h-32 sm:h-44 md:h-52 w-4/5 sm:w-3/4 mx-auto mt-2 sm:mt-0 flex items-center justify-center">
      <img
        :loading="imgLoading"
        :fetchpriority="imgPriority"
        :src="optimizeImage(product.imageCover, 300)"
        @error="fallbackToOriginal($event, product.imageCover)"
        :alt="product.title"
        width="300"
        height="300"
        decoding="async"
        class="w-full h-full object-contain"
      >
    </div>

    <div>
      <div v-if="discountPercent > 0" class="absolute top-2 left-2 sm:top-3 sm:left-3">
        <span class="bg-red-600 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">-{{ discountPercent }}%</span>
      </div>

      <div class="absolute top-2 right-2 flex flex-col space-y-1 sm:space-y-2">
        <button
          type="button"
          @click="wishList.toggleWishList(product._id)"
          :aria-label="wishList.isLiked(product._id) ? 'Remove from wishlist' : 'Add to wishlist'"
          :aria-pressed="wishList.isLiked(product._id)"
          class="bg-white h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center shadow-sm text-xs sm:text-sm cursor-pointer group"
        >
          <i :class="wishList.isLiked(product._id)
            ? 'fa-solid fa-heart text-red-500'
            : 'fa-regular fa-heart text-gray-600 group-hover:text-red-500'"
          ></i>
        </button>

        <button
          type="button"
          aria-label="Compare product"
          class="bg-white h-7 w-7 sm:h-8 sm:w-8 rounded-full hidden sm:flex items-center justify-center text-gray-600 hover:text-[#16a34a] shadow-sm text-xs sm:text-sm"
        >
          <i class="fa-solid fa-arrows-rotate"></i>
        </button>

        <router-link
          :to="{ name: 'product-details', params: { id: product._id } }"
          aria-label="View product"
          class="bg-white h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-[#16a34a] shadow-sm text-xs sm:text-sm cursor-pointer"
        >
          <i class="fa-regular fa-eye"></i>
        </router-link>
      </div>
    </div>

    <div class="p-2.5 sm:p-4 flex flex-col flex-1">

      <div class="text-[11px] sm:text-xs text-gray-500 mb-1 truncate">{{ product.category.name }}</div>

      <h3 class="font-medium mb-1 text-[13px] leading-snug sm:text-base flex-1">
        <router-link
          :to="{ name: 'product-details', params: { id: product._id } }"
          class="line-clamp-2"
        >
          {{ product.title }}
        </router-link>
      </h3>

      <div class="flex items-center mb-1.5 sm:mb-2">
        <i class="fa-solid fa-star text-yellow-400 text-xs sm:text-sm mr-1"></i>
        <span class="text-[11px] sm:text-xs text-gray-500">{{ product.ratingsAverage }} | ({{ product.ratingsQuantity }})</span>
      </div>

      <div class="flex items-center justify-between gap-1.5 mt-auto">
        <div class="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-2 min-w-0">
          <span
            class="text-sm sm:text-lg font-bold"
            :class="product.priceAfterDiscount ? 'text-green-700' : 'text-gray-800'"
          >
            {{ product.priceAfterDiscount || product.price }} EGP
          </span>
          <span v-if="product.priceAfterDiscount" class="text-[11px] sm:text-xs text-gray-500 line-through">
            {{ product.price }} EGP
          </span>
        </div>

        <button
          type="button"
          @click="addProductToCart()"
          :disabled="loading"
          aria-label="Add to cart"
          class="h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center transition text-white disabled:opacity-70 shrink-0"
        >
          <Loading v-if="loading" :size="24" />
          <i v-else class="fa-solid fa-circle-plus text-[#16a34a] hover:text-[#15803D] text-2xl sm:text-4xl cursor-pointer"></i>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Loading from '../Loading.vue'
import { useCartStore } from '@/stores/cart'
import { useWishList } from '@/stores/wishList'
import { optimizeImage, fallbackToOriginal } from '@/utils/image'

const props = defineProps({
  product: { type: Object, required: true },
  imgLoading: { type: String, default: 'lazy' },
  imgPriority: { type: String, default: 'auto' },
})

const loading = ref(false);
const cartStore = useCartStore();
const wishList = useWishList();

async function addProductToCart() {
  loading.value = true;
  await cartStore.addToCart(props.product._id);
  loading.value = false;
}

const discountPercent = computed(() => {
  const price = props.product.price
  const sale = props.product.priceAfterDiscount
  if (!sale || sale >= price) return 0
  return Math.round(((price - sale) / price) * 100)
})
</script>