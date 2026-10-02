<template>
    <div class="container mx-auto px-4">
    <WishListHeader />
    <WishListTable />
    </div>
</template>

<script setup>
import WishListHeader from '@/components/wishList/WishListHeader.vue';
import WishListTable from '@/components/wishList/WishListTable.vue';
import { useCartStore } from '@/stores/cart';
import { useWishList } from '@/stores/wishList';
import { onMounted } from 'vue';
const WishListStore = useWishList();
const cartStore = useCartStore();
onMounted(() => {
    WishListStore.fetchWishList();
    cartStore.getCart();
});
</script>

<style lang="scss" scoped>

</style>