<script setup>
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();
</script>

<template>
  <div class="flex items-center justify-between mb-5">
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
        <span class="text-white w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl flex items-center justify-center bg-green-600">
          <i class="fa-solid fa-cart-shopping text-white"></i>
        </span>
        Shopping Cart
      </h1>

      <p class="text-gray-500 mt-2">
        You have
        <span class="font-semibold text-green-600">
          {{ cartStore.itemsCount }}
        </span>
        items in your cart
      </p>
    </div>
  </div>
</template>