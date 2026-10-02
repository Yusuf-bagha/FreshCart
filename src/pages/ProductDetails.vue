<template>
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
        <Loading />
    </div>    <div class="container mx-auto px-4" v-else>
   <div class="flex flex-col lg:flex-row gap-4 lg:gap-8" v-if="product"> 
     <ProductSwiper :product="product" />
    <ProductInfo :product="product" />
   </div>
    </div>
</template>

<script setup>
import apiClient from '@/api/AxiosInterceptor';
import Loading from '@/components/Loading.vue';
import ProductInfo from '@/components/Product/ProductInfo.vue';
import ProductSwiper from '@/components/Product/ProductSwiper.vue';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const product = ref(null)
const route = useRoute()
const isLoading = ref(true)

async function getSpecificProduct() {
  isLoading.value = true;
  try {
    const { data } = await apiClient({
      method: 'get',
      url: `/v1/products/${route.params.id}`
    });
    product.value = data.data;
    console.log(data);
  } catch (error) {
    console.log(error.message);
  } finally {
    isLoading.value = false;
  }
}

onMounted(()=>{
    getSpecificProduct();
})
</script>

<style lang="scss" scoped>

</style>