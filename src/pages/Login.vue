<template >
    <div class="py-6 sm:py-10">
    <div class="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-4">
    <Logininfo/>
    <Logininput/>
    </div>
    </div>
</template>

<script setup>
import Logininfo from '@/components/Login/Logininfo.vue';
import Logininput from '@/components/Login/Logininput.vue';


</script>

<style lang="scss" scoped>

</style>