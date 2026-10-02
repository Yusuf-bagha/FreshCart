<template>
    <NameTagger color="purple" icon="brands" :title="brandStore.selectedBrand?.name" />
    
    <div v-if="brandStore.isLoading" class="flex justify-center py-12">
        <Loading />
    </div>

    <div v-else class="container mx-auto px-4 py-6 sm:py-8">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            <ProductCard 
                v-for="product in products" 
                :key="product._id"
                :product="product"
            />
        </div>

        <div v-if="products.length === 0" class="text-center py-12 text-gray-400">
            No products found for this brand.
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useBrandStore } from '@/stores/brandsStore';
import NameTagger from '../NameTagger.vue';
import ProductCard from '../Home/ProductCard.vue'; 
import axios from 'axios';
import Loading from '../Loading.vue';

const route = useRoute();
const brandStore = useBrandStore();
const products = ref([]);

onMounted(async () => {
    await brandStore.getAllBrands();
    await brandStore.getSpecificBrand(route.params.id);

    const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?brand=${route.params.id}`
    );
    products.value = response.data.data;
});
</script>