<template>
  <div class="flex items-center justify-center py-10 sm:py-16">
    <div class="bg-white border border-gray-100 rounded-2xl p-6 sm:p-12 text-center max-w-sm w-full">

      <div class="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
        <i class="fa-solid fa-cart-shopping text-4xl text-green-700"></i>
      </div>

      <h2 class="text-lg font-medium text-gray-800 mb-2">Your cart is empty</h2>

      <p class="text-sm text-gray-500 mb-6 leading-relaxed">
        Looks like you haven't added anything yet. Start shopping and your items will appear here.
      </p>

      <router-link
        to="/shop"
        class="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200">
        <i class="fa-solid fa-bag-shopping"></i>
        Browse products
      </router-link>

    </div>
  </div>
</template>

<script setup></script>