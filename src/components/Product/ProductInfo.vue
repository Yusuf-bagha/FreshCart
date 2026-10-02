<script setup>
import { computed, ref, watch } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useWishList } from '@/stores/wishList'
import Loading from '@/components/Loading.vue'

const props = defineProps({
  product: Object
})

const cartStore = useCartStore()
const wishList = useWishList()

const cartLoading = ref(false)

const cartEntry = computed(() =>
  cartStore.products.find(p => p.product._id === props.product._id)
)
const inCart = computed(() => !!cartEntry.value)

const quantity = ref(cartEntry.value?.count || 1)

watch(cartEntry, (entry) => {
  if (entry) quantity.value = entry.count
})

async function updateQty(newCount) {
  cartLoading.value = true
  await cartStore.updateQuantity(props.product._id, newCount)
  cartLoading.value = false
}

function decreaseQty() {
  if (quantity.value <= 1) return
  inCart.value ? updateQty(quantity.value - 1) : quantity.value--
}
function increaseQty() {
  if (quantity.value >= props.product.quantity) return
  inCart.value ? updateQty(quantity.value + 1) : quantity.value++
}
function onManualChange(e) {
  const value = Number(e.target.value)
  if (value < 1 || value > props.product.quantity) return
  inCart.value ? updateQty(value) : (quantity.value = value)
}

const unitPrice = computed(() => props.product.priceAfterDiscount || props.product.price)
const totalPrice = computed(() => (unitPrice.value * quantity.value).toFixed(2))

const discountPercent = computed(() => {
  const price = props.product.price
  const sale = props.product.priceAfterDiscount
  if (!sale || sale >= price) return 0
  return Math.round(((price - sale) / price) * 100)
})

async function addToCart() {
  cartLoading.value = true
  const desiredQty = quantity.value
  if (inCart.value) {
    await cartStore.updateQuantity(props.product._id, desiredQty)
  } else {
    await cartStore.addToCart(props.product._id)
    if (desiredQty > 1) {
      await cartStore.updateQuantity(props.product._id, desiredQty)
    }
  }
  cartLoading.value = false
}
</script>

<template>
<div class="lg:w-3/5 min-w-0" v-if="product">
    <div class="bg-white rounded-xl shadow-sm p-4 sm:p-6">

    <div class="flex flex-wrap gap-2 mb-4">
        <router-link v-if="product.category" :to="{ name: 'CategoryDetails', params: { id: product.category._id } }"
        class="bg-[#DCFCE7] text-primary-700 text-xs px-3 py-1.5 rounded-full hover:bg-primary-100 transition">
        {{product.category.name}}
        </router-link>
        <router-link v-if="product.brand" :to="{ name: 'BrandDetails', params: { id: product.brand._id } }" class="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
        {{ product.brand.name }}
        </router-link>
    </div>

    <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
    {{product.title}}
    </h1>

    <div class="flex items-center gap-3 mb-4">
    <div class="text-yellow-400 flex items-center gap-0.5">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
    </div>
    <span class="text-sm text-gray-600">3.4 (7 reviews)</span>
    </div>

    <div class="flex items-center flex-wrap gap-3 mb-6">
      <span class="text-2xl sm:text-3xl font-bold text-gray-900">
        {{ product.priceAfterDiscount || product.price }} EGP
      </span>
      <span
        v-if="product.priceAfterDiscount && product.priceAfterDiscount < product.price"
        class="text-xl text-gray-400 line-through"
      >
        {{ product.price }} EGP
      </span>
      <span
        v-if="product.priceAfterDiscount && product.priceAfterDiscount < product.price"
        class="bg-red-500 text-white text-xs px-2 py-1 rounded"
      >
        SAVE {{discountPercent}}%
      </span>
    </div>

    <div class="flex items-center gap-2 mb-6">
      <span
        class="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full"
        :class="product.quantity > 0 
          ? 'bg-green-50 text-green-700' 
          : 'bg-red-50 text-red-700'"
      >
        <span
          class="w-2 h-2 rounded-full"
          :class="product.quantity > 0 ? 'bg-green-500' : 'bg-red-500'"
        ></span>
        {{ product.quantity > 0 ? 'In Stock' : 'Out of Stock' }}
      </span>
    </div>

      <div class="border-t border-gray-100 pt-5 mb-6">
        <p class="text-gray-600 leading-relaxed">
         {{ product.description }}
        </p>
      </div>

      <!-- Quantity -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
        <div class="flex items-center gap-4">
          <div class="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
            <button
              type="button"
              @click="decreaseQty"
              :disabled="quantity <= 1"
              class="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-50"
            >
              <i class="fas fa-minus"></i>
            </button>
            <input
              id="qty"
              type="number"
              min="1"
              :max="product.quantity"
              :value="quantity"
              @input="onManualChange"
              class="w-16 text-center border-0 focus:ring-0 focus:outline-none text-lg font-medium"
            />
            <button
              type="button"
              @click="increaseQty"
              :disabled="quantity >= product.quantity"
              class="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-50"
            >
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <span class="text-sm text-gray-500">{{ product.quantity }} available</span>
        </div>
      </div>

      <!-- Total -->
      <div class="bg-gray-50 rounded-lg p-4 mb-6">
        <div class="flex justify-between items-center">
          <span class="text-gray-600">Total Price:</span>
          <span class="text-2xl font-bold text-green-600">{{ totalPrice }} EGP</span>
        </div>
      </div>

      <!-- Add to Cart / Buy Now -->
      <div class="flex flex-col sm:flex-row gap-3 mb-6">
        <button
          type="button"
          @click="addToCart"
          :disabled="cartLoading || product.quantity === 0"
          class="flex-1 py-3.5 px-6 rounded-xl font-medium active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-60"
          :class="inCart ? 'bg-gray-700 text-white hover:bg-gray-800' : 'bg-green-600 text-white hover:bg-green-700 shadow-primary-600/25'"
        >
          <Loading v-if="cartLoading" />
          <template v-else>
            <i class="fas fa-cart-shopping"></i>
            {{ inCart ? 'Update Cart' : 'Add to Cart' }}
          </template>
        </button>
        <button class="flex-1 bg-gray-900 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          <i class="fas fa-bolt"></i>
          Buy Now
        </button>
      </div>

      <!-- Wishlist / Share -->
      <div class="flex gap-3 mb-6">
        <button
          type="button"
          @click="wishList.toggleWishList(product._id)"
          class="flex-1 border-2 py-3 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2"
          :class="wishList.isLiked(product._id)
            ? 'border-red-300 text-red-600'
            : 'border-gray-200 text-gray-700 hover:border-green-300 hover:text-green-600'"
        >
          <i :class="wishList.isLiked(product._id) ? 'fas fa-heart' : 'far fa-heart'"></i>
          {{ wishList.isLiked(product._id) ? 'In Wishlist' : 'Add to Wishlist' }}
        </button>
        <button class="border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:border-green-300 hover:text-green-600 transition">
          <i class="fas fa-share-nodes"></i>
        </button>
      </div>

      <!-- Perks -->
      <div class="border-t border-gray-100 pt-6">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-green-500">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 bg-green-100  rounded-full flex items-center justify-center shrink-0">
              <i class="fas fa-truck-fast"></i>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 text-sm">Free Delivery</h4>
              <p class="text-xs text-gray-500">Orders over $50</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 bg-green-100 text-primary-600 rounded-full flex items-center justify-center shrink-0">
              <i class="fas fa-arrow-rotate-left"></i>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 text-sm">30 Days Return</h4>
              <p class="text-xs text-gray-500">Money back</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 bg-green-100 text-primary-600 rounded-full flex items-center justify-center shrink-0">
              <i class="fas fa-shield-halved"></i>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 text-sm">Secure Payment</h4>
              <p class="text-xs text-gray-500">100% Protected</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>