<template>
    <NameTagger color="green" icon="categories" title="All Categories" subtitle="Browse our wide range of product categories"/>

    <div v-if="categoryStore.isLoading" class="flex justify-center py-12">
        <Loading />
    </div>

    <div v-else class="container mx-auto px-4 py-6 sm:py-8">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            <RouterLink
                v-for="category in categoryStore.categories"
                :key="category._id"
                :to="{ name: 'CategoryDetails', params: { id: category._id } }"
                class="group block bg-white rounded-2xl border border-gray-100 p-3 sm:p-6 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 hover:-translate-y-1"
            >
                <div class="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3 sm:mb-4">
                    <img
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        :src="optimizeImage(category.image, 320)"
                        @error="fallbackToOriginal($event, category.image)"
                        :alt="category.name"
                        width="320" height="320"
                        loading="lazy"
                    >
                </div>
                <h2 class="font-bold text-sm sm:text-base text-gray-900 text-center group-hover:text-my-green transition-colors">{{ category.name }}</h2>
                <span class="flex justify-center mt-2 text-xs text-primary-600 group-hover:text-my-green sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    View products
                </span>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCategoryStore } from '@/stores/categoryStore';
import NameTagger from '@/components/NameTagger.vue';
import Loading from '@/components/Loading.vue';
import { RouterLink } from 'vue-router';
import { optimizeImage, fallbackToOriginal } from '@/utils/image';

const categoryStore = useCategoryStore();

onMounted(() => {
    categoryStore.getAllCategories();
});
</script>