import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/Layout/MainLayout.vue'
import Home from '../pages/Home.vue'
import { useAuthStore } from '@/stores/authStore/index.js'


const Shop = () => import('../pages/shop.vue')
const Login = () => import('@/pages/Login.vue')
const Register = () => import('@/pages/Register.vue')
const Brands = () => import('@/pages/Brands.vue')
const CategoryDetails = () => import('@/components/Categories/CategoryDetails.vue')
const AllCategories = () => import('@/pages/AllCategories.vue')
const BrandDetails = () => import('@/components/Brands/BrandDetails.vue')
const ProductDetails = () => import('@/pages/ProductDetails.vue')
const Cart = () => import('@/pages/Cart.vue')
const WishList = () => import('@/pages/WishList.vue')
const CheckOut = () => import('@/components/Cart/CheckOut.vue') 
const AllOrders = () => import('@/pages/AllOrders.vue')
const ForgotPassword = () => import('@/pages/ForgotPassword.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '', name: 'home', component: Home, meta: { requireAuth: true } },
        { path: 'login', name: 'login', component: Login, meta: { requireAuth: false } },
        { path: 'register', name: 'register', component: Register, meta: { requireAuth: false } },
        { path: 'brands', name: 'brands', component: Brands, meta: { requireAuth: true } },
        { path: 'brands/:id', name: 'BrandDetails', component: BrandDetails, meta: { requireAuth: true } },
        { path: 'shop', name: 'shop', component: Shop, meta: { requireAuth: true } },
        { path: 'category/:id', name: 'CategoryDetails', component: CategoryDetails, meta: { requireAuth: true } },
        { path: 'allcategories', name: 'allcategories', component: AllCategories, meta: { requireAuth: true } },
        { path: 'product/:id', name: 'product-details', component: ProductDetails },
        { path: 'cart', name: 'cart', component: Cart, meta: { requireAuth: true } },
        { path: 'wishlist', name: 'wishlist', component: WishList, meta: { requireAuth: true } },
        { path: 'checkout', name: 'checkout', component: CheckOut, meta: { requireAuth: true } },
        { path: 'allorders', name: 'allorders', component: AllOrders, meta: { requireAuth: true } },
        { path: 'forgot-password', name: 'forgot-password', component: ForgotPassword, meta: { requireAuth: false } },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (!authStore.isLogged && to.meta.requireAuth) {
    return { name: 'login' }
  }

  if (authStore.isLogged && to.meta.requireAuth === false) {
    return { name: 'home' }
  }

  return true
})

export default router