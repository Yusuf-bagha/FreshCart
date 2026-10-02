<template>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

        <div class="lg:col-span-2 flex flex-col gap-4 sm:gap-6">

            <productCard v-for="product in products" :key="product._id" :product="product" />

            <div class="mt-2 sm:mt-6 pt-5 sm:pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 mb-3">
                <router-link to="/shop"
                    class="text-my-green hover:text-green-700 font-medium text-sm flex items-center gap-2">
                    <i class="fa-solid fa-arrow-left-long"></i>
                    Continue Shopping
                </router-link>

                <button @click="clearCart"
                    class="h-10 px-4 rounded-xl cursor-pointer border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center gap-2 justify-center disabled:opacity-40 transition-all duration-200">
                    <i class="fa-solid fa-trash"></i>
                    <span>Clear all items</span>
                </button>
            </div>

        </div>

        <OrderSummary :totalPrice="totalPrice" :itemsCount="itemsCount" />

    </div>
</template>

<script setup>
import OrderSummary from './OrderSummary.vue';
import ProductCard from './productCard.vue';
defineProps({
    products: Array,
    totalPrice: Number,
    itemsCount: Number,
    clearCart: Function,
});

</script>

<style lang="scss" scoped></style>