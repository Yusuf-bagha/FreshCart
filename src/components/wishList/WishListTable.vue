<template>
  <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-3">

    <div class="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
      <div class="col-span-6">Product</div>
      <div class="col-span-2 text-center">Price</div>
      <div class="col-span-2 text-center">Status</div>
      <div class="col-span-2 text-center">Actions</div>
    </div>

    <!-- Items -->
    <div class="divide-y divide-gray-100">

      <div v-if="wishListStore.wishList.length === 0" class="py-16 text-center text-gray-400">
        <i class="fa-regular fa-heart text-4xl mb-3"></i>
        <p class="text-sm">Your wishlist is empty.</p>
      </div>

      <!-- Wishlist Rows -->
      <div
        v-for="item in wishListStore.wishList"
        :key="item._id"
        class="grid grid-cols-2 md:grid-cols-12 gap-x-3 gap-y-3 md:gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors"
      >
        <!-- Product -->
        <div class="col-span-2 md:col-span-6 flex items-center gap-3 sm:gap-4">
          <div class="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0">
            <img
              :src="item.imageCover"
              :alt="item.title"
              class="w-full h-full object-contain p-1.5"
            />
          </div>
          <div class="min-w-0">
            <p class="font-medium text-gray-900 line-clamp-2">{{ item.title }}</p>
            <p class="text-sm text-gray-400 mt-1">{{ item.brand?.name }}</p>
          </div>
        </div>

        <!-- Price -->
        <div class="col-span-1 md:col-span-2 flex md:justify-center items-center gap-2">
          <span class="md:hidden text-sm text-gray-500">Price:</span>
          <div class="text-left md:text-center">
            <div class="font-semibold text-gray-900">{{ item.priceAfterDiscount || item.price }} EGP</div>
            <div v-if="item.priceAfterDiscount" class="text-sm text-gray-400 line-through">
              {{ item.price }} EGP
            </div>
          </div>
        </div>

        <!-- Status -->
        <div class="col-span-1 md:col-span-2 flex justify-end md:justify-center items-center gap-2">

          <!-- In Cart -->
          <span
            v-if="cartStore.isInCart(item._id)"
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
          >
            <i class="fa-solid fa-cart-shopping text-[10px]"></i>
            In Cart
          </span>

          <!-- In Stock -->
          <span
            v-else
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            In Stock
          </span>
        </div>

        <!-- Actions -->
        <div class="col-span-2 md:col-span-2 flex items-center gap-2 md:justify-center">

        
        <RouterLink
            v-if="cartStore.isInCart(item._id)"
            to="/cart"
            class="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
        >
            <i class="fa-solid fa-check text-xs text-green-600"></i>
            <span class="md:hidden lg:inline">View Cart</span>
        </RouterLink>

        <!-- Add to Cart (if not in cart) -->
        <button
            v-else
            @click="cartStore.addToCart(item._id)"
            :disabled="cartStore.loading"
            class="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
        >
            <i class="fa-solid fa-cart-shopping text-xs"></i>
            <span class="md:hidden lg:inline">Add to Cart</span>
        </button>

        <!-- Remove from Wishlist -->
        <button
            @click="wishListStore.removeFromWishList(item._id)"
            :disabled="wishListStore.isLoading"
            class="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all disabled:opacity-50"
            title="Remove from wishlist"
          >
            <i class="fa-solid fa-trash text-sm"></i>
          </button>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useWishList } from "@/stores/wishList";
import { useCartStore } from "@/stores/cart";

const wishListStore = useWishList();
const cartStore = useCartStore();
</script>