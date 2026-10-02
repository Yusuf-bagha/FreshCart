<template>

    <div class="overflow-x-clip">
        <Navbar />
        
        <main class="mt-18 lg:mt-28 min-h-screen">
            <RouterView />
        </main>
        <Footer />
    </div>
</template>

<script setup>
import Navbar from '@/components/Navbar/Navbar.vue';
import { defineAsyncComponent } from 'vue';
import { RouterView } from 'vue-router';
const Footer = defineAsyncComponent(() => import('@/components/Footer.vue'))
</script>

<style lang="scss" scoped>

</style>