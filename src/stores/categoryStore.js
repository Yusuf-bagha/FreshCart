import { defineStore } from 'pinia'
import { ref } from 'vue'
import publicClient from '@/api/publicClient';

export const useCategoryStore = defineStore('category', () => {
    const categories = ref([])
    const isLoading = ref(false)
    const error = ref(null)
    const selectedCategory = ref(null)

    let inflight = null

    async function getAllCategories() {
        if (categories.value.length > 0) return
        if (inflight) return inflight

        isLoading.value = true
        error.value = null
        inflight = publicClient.get('/v1/categories')
            .then(({ data }) => {
                categories.value = data.data
            })
            .catch((err) => {
                error.value = err.message
            })
            .finally(() => {
                isLoading.value = false
                inflight = null
            })

        return inflight
    }

    async function getSpecificCategory(id) {
        const found = categories.value.find(cat => cat._id === id)
        if (found) {
            selectedCategory.value = found
            return
        }

        isLoading.value = true
        error.value = null
        try {
            const { data } = await publicClient.get(`/v1/categories/${id}`)
            selectedCategory.value = data.data
        } catch (err) {
            error.value = err.message
        } finally {
            isLoading.value = false
        }
    }

    return { categories, isLoading, error, getAllCategories, getSpecificCategory, selectedCategory }
})