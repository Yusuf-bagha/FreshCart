<template>
    <NameTagger color="green" icon="categories" />
    
    <div v-if="categoryStore.isLoading" class="flex justify-center py-12">
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
            No products found in this category.
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCategoryStore } from '@/stores/categoryStore';
import NameTagger from '../NameTagger.vue';
import ProductCard from '../Home/ProductCard.vue'; 
import axios from 'axios';
import Loading from '../Loading.vue';

const route = useRoute();
const categoryStore = useCategoryStore();
const products = ref([]);

async function loadProducts(id) {
    await categoryStore.getSpecificCategory(id);

    const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category=${id}`
    );
    products.value = response.data.data;
}

onMounted(() => loadProducts(route.params.id));

// (was calling an undefined fetchData) reload when the user jumps to another category
watch(() => route.params.id, (newId) => {
    if (newId) loadProducts(newId);
});
</script>