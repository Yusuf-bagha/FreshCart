<template>
    <div class="w-full py-8 sm:py-12 px-4 sm:px-8" :class="colorConfig[color].bg">
        <p class="text-white/70 text-sm mb-3 sm:mb-4">Home / {{ computedTitle }}</p>
        
        <div class="flex items-center gap-3 sm:gap-4">
            <div class="w-12 h-12 sm:w-16 sm:h-16 shrink-0 bg-white/20 rounded-xl flex items-center justify-center">
                <i class="text-white text-xl sm:text-2xl" :class="iconConfig[icon]"></i> 
            </div>
            <div class="min-w-0">
                <h1 class="text-white text-2xl sm:text-4xl font-bold">{{ computedTitle }}</h1>
                <p class="text-white/80 text-sm sm:text-base mt-1">{{ computedSubtitle }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCategoryStore } from '@/stores/categoryStore';

const props = defineProps({
    title:    { type: String, default: null },
    subtitle: { type: String, default: null },
    color:    { type: String, default: 'green' },
    icon:     { type: String, default: 'categories' } 
})

const categoryStore = useCategoryStore();

const computedTitle = computed(() => 
    props.title || categoryStore.selectedCategory?.name || 'All Categories'
)

const computedSubtitle = computed(() => {
    if (props.subtitle) return props.subtitle;
    if (props.title) return `Browse all ${props.title}`;
    return `Browse all ${categoryStore.selectedCategory?.name ?? ''} products`;
})

const colorConfig = {
    green:  { bg: 'bg-gradient-to-r from-green-500 to-green-400' },
    purple: { bg: 'bg-gradient-to-r from-purple-600 to-purple-400' },
    blue:   { bg: 'bg-gradient-to-r from-blue-600 to-blue-400' },
    orange: { bg: 'bg-gradient-to-r from-orange-500 to-orange-400' },
}

const iconConfig = {
    categories: 'fa-solid fa-layer-group',
    products:   'fa-solid fa-box',
    brands:     'fa-solid fa-tags',
    shop:       'fa-solid fa-store',

}
</script>