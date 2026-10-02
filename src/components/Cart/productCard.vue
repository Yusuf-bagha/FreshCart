<script setup>
import { computed, ref } from "vue";
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();

const loading = ref({
  increase: false,
  decrease: false,
  remove: false,
});

const props = defineProps({
  product: Object,
});

const totalPrice = computed(() => {
  return (props.product?.price || 0) * (props.product?.count || 0);
});

async function increase() {
  loading.value.increase = true;

  await cartStore.updateQuantity(
    props.product.product._id,
    props.product.count + 1
  );

  loading.value.increase = false;
}

async function decrease() {
  if (props.product.count <= 1) return;

  loading.value.decrease = true;

  await cartStore.updateQuantity(
    props.product.product._id,
    props.product.count - 1
  );

  loading.value.decrease = false;
}

async function onManualChange(e) {
  const value = Number(e.target.value);

  if (value < 0) return;

  loading.value.increase = true;

  await cartStore.updateQuantity(
    props.product.product._id,
    value
  );

  loading.value.increase = false;
}

async function removeItem() {
  loading.value.remove = true;

  await cartStore.removeItem(props.product.product._id);

  loading.value.remove = false;
}
</script>
<template>
  <div class="lg:col-span-2">
    <div class="space-y-4">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-5">
        <div class="flex gap-3 sm:gap-6">
          <router-link class="relative shrink-0 group" :to="`/product/${product.product._id}`">
            <div class="w-20 h-20 sm:w-32 sm:h-32 rounded-xl bg-gray-50 p-2 sm:p-3 border border-gray-100 overflow-hidden">
              <img :src="product.product.imageCover" :alt="product.product.title" loading="lazy"
                class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110">
            </div>
          </router-link>
          <div class="flex-1 min-w-0 flex flex-col">
            <div class="mb-2 sm:mb-3">
              <router-link :to="`/product/${product.product._id}`">
                <h3
                  class="font-semibold hover:text-green-500 text-gray-900 group-hover/title:text-primary-600 transition-colors leading-snug sm:leading-relaxed text-sm sm:text-lg line-clamp-2">
                  {{ product.product.title }}</h3>
              </router-link>
              <div class="flex items-center gap-2 mt-2">
                <span
                  class="inline-block px-2.5 py-1 bg-gradient-to-r from-primary-50 to-emerald-50 text-primary-700 text-xs font-medium rounded-full">{{
                    product.product.category.name }}</span>
                <span class="text-xs text-gray-400">•</span>
              </div>
            </div>

            <div class="mb-2 sm:mb-4">
              <div class="flex items-baseline gap-2">
                <span class="text-green-600 font-bold text-base sm:text-lg">{{ product.price }} EGP</span>
                <span class="text-xs text-gray-400">per unit</span>
              </div>
            </div>

            <div class="mt-auto flex flex-wrap items-center justify-between gap-3 sm:gap-4">
              <div class="flex flex-col gap-1">
                <label class="text-sm font-medium" :for="`count-${product.product._id}`">Quantity <span class="text-red-500">*</span></label>
                <div class="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                  <button
                    class="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    @click="decrease" :disabled="loading.decrease">
                    <i v-if="!loading.decrease">−</i>
                    <i v-else class="fa-solid fa-spinner animate-spin text-sm"></i>
                  </button>
                  <input :id="`count-${product.product._id}`" :value="product.count" type="number" min="0" name="count" @input="onManualChange"
                    required class="w-12 sm:w-15 text-center py-2 focus:outline-none border-0 outline-none bg-transparent" />
                  <button
                    class="h-8 w-8 rounded-lg bg-green-500 shadow-sm flex items-center justify-center text-white hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed"
                    @click="increase" :disabled="loading.increase">
                    <i v-if="!loading.increase">+</i>
                    <i v-else class="fa-solid fa-spinner animate-spin text-sm"></i>
                  </button>
                </div>
              </div>
              <div class="flex items-center gap-3 sm:gap-4">
                <div class="text-right">
                  <p class="text-xs text-gray-400 mb-0.5">Total</p>
                  <p class="text-lg sm:text-xl font-bold text-gray-900">{{ totalPrice.toLocaleString() }} <span
                      class="text-sm font-medium text-gray-400">EGP</span></p>
                </div>
                <button @click="removeItem" :disabled="loading.remove"
                  class="h-9 w-9 sm:h-10 sm:w-10 rounded-xl cursor-pointer border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center disabled:opacity-40 transition-all duration-200">
                  <i v-if="!loading.remove" class="fa-solid fa-trash"></i>
                  <i v-else class="fa-solid fa-spinner animate-spin"></i>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>