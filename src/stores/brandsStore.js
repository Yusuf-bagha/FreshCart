import publicClient from '@/api/publicClient';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useBrandStore = defineStore('Brand', () => {
    const brands = ref([]);
    const isLoading = ref(false)
    const error = ref(null)
    const selectedBrand = ref(null)

    async function getAllBrands() {
        if (brands.value.length > 0) return

        isLoading.value = true
        error.value = null
        try {
            const { data } = await publicClient({
                method: "get",
                url: '/v1/brands'
            });
            brands.value = data.data
        } catch (err) {
            error.value = err.message
        } finally {
            isLoading.value = false
        }
    }

    async function getSpecificBrand(id) {
        const found = brands.value.find(brand => brand._id === id)
        if (found) {
            selectedBrand.value = found
            return
        }

        isLoading.value = true
        error.value = null
        try {
            const { data } = await publicClient({
                method: "get",
                url: `/v1/brands/${id}`
            });
            selectedBrand.value = data.data
        } catch (err) {
            error.value = err.message
        } finally {
            isLoading.value = false
        }
    }

    return { brands, isLoading, error, getAllBrands, getSpecificBrand, selectedBrand }
})