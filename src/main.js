import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "@fortawesome/fontawesome-free/css/fontawesome.min.css"
import "@fortawesome/fontawesome-free/css/solid.min.css"
import "@fortawesome/fontawesome-free/css/regular.min.css"
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { createPinia } from 'pinia'
import { useCartStore } from '@/stores/cart'
import { useWishList } from '@/stores/wishList'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)  
app.use(router)  
app.use(Vue3Toastify, {
    autoClose: 3000,
    position: "bottom-right",
    pauseOnHover: true,
})
if ('serviceWorker' in navigator) {
navigator.serviceWorker.addEventListener('message', (event) => {
  if (event.data?.type === 'SYNC_COMPLETE') {
    const { queue, success } = event.data;
    if (!success) return;
    if (queue.startsWith('cart-')) useCartStore().fetchCart();
    if (queue.startsWith('wishlist-')) useWishList().fetchWishList();
  }
});
}
app.mount('#app')