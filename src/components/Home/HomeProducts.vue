<template>
  <div class="text flex flex-wrap justify-between items-center gap-x-3 gap-y-2 my-6 sm:my-8">
    <div class="flex items-center gap-3">
      <GreenLine />
      <h2 class="font-bold text-2xl sm:text-3xl text-[#1e2939]">Featured <span class="text-[#096]">Products</span></h2>
    </div>
    <router-link to="/shop" class="text-sm sm:text-base text-green-700 whitespace-nowrap">
      View All Products <i class="fa-solid fa-arrow-right"></i>
    </router-link>
  </div>

  <!-- Loading -->
  <div v-if="isLoading" class="flex justify-center py-12">
    <Loading />
  </div>

  <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
    <ProductCard v-for="product in featured" :key="product._id" :product="product" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import GreenLine from '../GreenLine.vue';
import ProductCard from './ProductCard.vue';
import Loading from '../Loading.vue';
import publicClient from '@/api/publicClient';

// The home page only shows a teaser; the full catalog lives on /shop
const HOME_LIMIT = 10;

const products = ref([]);
const isLoading = ref(false);

// Ask the API for just 10, and slice as a safety net in case `limit` is ignored
const featured = computed(() => products.value.slice(0, HOME_LIMIT));

async function getAllProducts() {
  isLoading.value = true;
  try {
    const { data } = await publicClient.get('/v1/products', {
      params: { limit: HOME_LIMIT },
    });
    products.value = data.data;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  getAllProducts();
});
</script>

<style lang="scss" scoped>

</style>