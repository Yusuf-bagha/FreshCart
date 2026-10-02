<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/authStore';
import { onMounted } from 'vue';
import { useWishList } from './stores/wishList';
import { useCartStore } from './stores/cart';

const wishList = useWishList();
const authStore = useAuthStore();
const cartStore = useCartStore();

function debounce(fn, delay) {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

function reconcile() {
  if (!authStore.isLogged) return
  cartStore.fetchCart()
  wishList.fetchWishList()
}
const debouncedReconcile = debounce(reconcile, 300)

onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    authStore.SetToken(token)
  }
  reconcile() 

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') debouncedReconcile()
  })
  window.addEventListener('online', debouncedReconcile)
})
</script>

<template>
  <RouterView :key="$route.fullPath"/>
</template>

<style scoped>
</style>