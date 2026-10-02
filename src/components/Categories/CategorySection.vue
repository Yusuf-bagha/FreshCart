<template>
    <div>
        <div class="text flex flex-wrap items-center justify-between gap-x-3 gap-y-2 my-6 sm:my-8">
            <div class="wraper flex items-center gap-3">
                <GreenLine />
                <h2 class="font-bold text-2xl sm:text-3xl text-[#1e2939]">Shop By <span class="text-[#096]">Category</span></h2>
            </div>
            <router-link to="/allcategories" class="text-sm sm:text-base text-green-700 whitespace-nowrap">
                View All Categories <i class="fa-solid fa-arrow-right"></i>
            </router-link>
        </div>

        <div v-if="categoryStore.isLoading" class="flex justify-center py-12">
            <Loading />
        </div>

        <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <CategoryBlock
                v-for="category in featured"
                :category="category"
                :key="category._id"
            />
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import GreenLine from '../GreenLine.vue';
import CategoryBlock from '../Categories/CategoryBlock.vue';
import { useCategoryStore } from '@/stores/categoryStore';
import Loading from '../Loading.vue';

const categoryStore = useCategoryStore();

// 6 fills exactly one row on desktop (6 cols), two on tablet (3), three on mobile (2).
// The rest are one click away via "View All Categories".
const featured = computed(() => categoryStore.categories.slice(0, 6));

onMounted(() => {
    categoryStore.getAllCategories();
});
</script>