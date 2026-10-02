<template>
    <router-link
        :to="{ name: 'CategoryDetails', params: { id: category._id } }"
        class="block bg-white rounded-lg p-3 sm:p-4 text-center shadow-sm hover:shadow-md transition group"
    >
        <div class="h-16 w-16 sm:h-20 sm:w-20 overflow-hidden bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:bg-primary-200 transition">
            <img
                :src="optimizeImage(category.image, 160)"
                @error="fallbackToOriginal($event, category.image)"
                :alt="category.slug"
                class="w-full h-full object-cover"
                width="160" height="160" loading="lazy" decoding="async"
            >
        </div>
        <p class="text-sm sm:text-base line-clamp-2">{{ category.name }}</p>
    </router-link>
</template>

<script setup>
import { optimizeImage, fallbackToOriginal } from '@/utils/image'

defineProps({
    category: {
        type: Object,
        required: true
    },
})
</script>