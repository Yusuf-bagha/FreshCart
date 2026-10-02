<template>
    <div class="container mx-auto px-4">
        <Header :itemsCount="cartStore.itemsCount" />

        <div v-if="cartStore.loading" class="flex justify-center py-16">
            <Loading />
        </div>

        <EmptyCart v-else-if="cartStore.products.length === 0" />

        <ProductList
            v-else
            :products="cartStore.products"
            :totalPrice="cartStore.totalPrice"
            :itemsCount="cartStore.itemsCount"
            :clearCart="cartStore.clearCart"
        />
    </div>
</template>

<script setup>
import Header from '@/components/Cart/Header.vue';
import ProductList from '@/components/Cart/productList.vue';
import EmptyCart from '@/components/Cart/EmptyCart.vue';
import { onMounted } from 'vue';
import { useCartStore } from "@/stores/cart";
import Loading from '@/components/Loading.vue';

const cartStore = useCartStore();

onMounted(() => {
    cartStore.getCart();
});
</script>