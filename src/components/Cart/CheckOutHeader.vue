<template>
    <div class="header flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
    <div class="left">
        <div>
    <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
        <span class="text-white w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl flex items-center justify-center bg-green-600">
        <i class="fa-solid fa-receipt text-white"></i>
        </span>
        Complete Your Order
    </h1>

    <p class="text-gray-500 mt-2">
    Review your items and complete your purchase
    </p>
    </div>
    </div>
        <div class="flex sm:justify-center mt-0 sm:mt-2">
                    <router-link to="/cart"
                        class="text-my-green hover:text-green-700 font-medium text-sm flex items-center gap-2">
                        <i class="fa-solid fa-arrow-left-long"></i> Back to cart
                    </router-link>
    </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>