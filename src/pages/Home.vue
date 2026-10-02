<template>
  <HomeCarousel />
  <Info />

  <div class="container mx-auto px-4">
    <LazySection min-height="360px"><CategorySection /></LazySection>
    <LazySection min-height="240px"><Cards /></LazySection>
    <LazySection min-height="900px"><HomeProducts /></LazySection>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import Info from '@/components/Info.vue';
import HomeCarousel from '@/components/Home/HomeCarousel.vue';
import LazySection from '@/components/LazySection.vue';


const CategorySection = defineAsyncComponent(() => import('@/components/Categories/CategorySection.vue'));
const Cards = defineAsyncComponent(() => import('@/components/discountCards/Cards.vue'));
const HomeProducts = defineAsyncComponent(() => import('@/components/Home/HomeProducts.vue'));
</script>