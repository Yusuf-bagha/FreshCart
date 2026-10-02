<template>
    <NameTagger title="Brands" subtitle="Shop from your favorite brands" color="purple" />
    
    <div v-if="brandStore.isLoading" class="flex justify-center py-12">
        <Loading />
    </div>

    <div v-else class="container mx-auto px-4 py-6 sm:py-10">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-5">
            <router-link
                v-for="brand in brandStore.brands" 
                :key="brand._id" 
                :to="{ name: 'BrandDetails', params: { id: brand._id } }"
                class="group bg-white rounded-2xl border border-gray-100 p-3 sm:p-5 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all duration-300 hover:-translate-y-1"
            >
                <div class="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-2 sm:mb-3 p-2 sm:p-3 flex items-center justify-center">
                <img :src="optimizeImage(brand.image, 240)" @error="fallbackToOriginal($event, brand.image)" :alt="brand.name" width="240" height="240" loading="lazy" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500">
                </div>
                <h3 class="font-semibold text-gray-900 text-center text-sm group-hover:text-violet-600 transition-colors truncate">{{ brand.name }}</h3> 
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'; 
import { optimizeImage, fallbackToOriginal } from '@/utils/image';
import NameTagger from '@/components/NameTagger.vue';
import Loading from '@/components/Loading.vue';
import { useBrandStore } from '@/stores/brandsStore';

const brandStore = useBrandStore() 

onMounted(() => {
    brandStore.getAllBrands() 
})
</script>