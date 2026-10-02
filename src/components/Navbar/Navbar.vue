<template>
  <header class="bg-white border-b border-gray-100 fixed w-full top-0 z-50 mx-auto">
    <Navupper class="hidden lg:flex container mx-auto px-4" />

    <div class="container mx-auto px-4">
      <div class="flex items-center h-16 lg:h-[72px] gap-4 lg:gap-8">

        <!-- LOGO -->
        <router-link to="/" class="shrink-0">
          <img :src="logo" alt="FreshCart" class="h-6 lg:h-8 w-auto" />
        </router-link>

        <!-- SEARCH BAR (desktop) -->
        <form @submit.prevent="submitSearch" class="hidden lg:flex flex-1 max-w-2xl">
          <div class="relative w-full" data-search>
            <input
              v-model="searchQuery"
              type="text"
              autocomplete="off"
              aria-label="Search products"
              placeholder="Search for products, brands and more..."
              @focus="onSearchFocus"
              @input="showSuggestions = true"
              @keydown.esc="showSuggestions = false"
              class="w-full px-5 py-3 pr-12 rounded-full border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-sm"
            />
            <button
              type="submit"
              aria-label="Search"
              class="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition-colors"
            >
              <i class="fa-solid fa-magnifying-glass text-sm"></i>
            </button>

            <SearchSuggestions
              v-if="dropdownOpen && !isMobileMenuOpen"
              :suggestions="suggestions"
              :state="searchState"
              :query="trimmedQuery"
              @select="onSuggestionSelect"
              @view-all="submitSearch"
            />
          </div>
        </form>

        <!-- NAV LINKS (desktop) -->
        <nav class="hidden xl:flex items-center gap-6">

          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="text-sm font-medium transition-colors"
            :class="$route.path === link.path ? 'text-green-700' : 'text-gray-600 hover:text-green-700'"
          >
            {{ link.label }}
          </router-link>

          <!-- Categories Dropdown (categories are fetched on first hover/focus) -->
          <div class="relative group" @mouseenter="loadCategories" @focusin="loadCategories">
            <button
              class="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-green-700 transition-colors py-2"
            >
              Categories
              <i class="fa-solid fa-chevron-down text-[10px] transition-transform duration-200 group-hover:rotate-180"></i>
            </button>

            <!-- Dropdown Panel -->
            <div class="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div class="bg-white border border-gray-100 rounded-xl shadow-xl py-2 min-w-[200px]">

                <!-- All Categories -->
                <router-link
                  to="/allcategories"
                  class="block px-4 py-2.5 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 transition-colors font-medium border-b border-gray-100"
                >
                  All Categories
                </router-link>

                <router-link
                  v-for="cat in categoryStore.categories"
                  :key="cat._id"
                  :to="{ name: 'CategoryDetails', params: { id: cat._id } }"
                  class="block px-4 py-2.5 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 transition-colors"
                >
                  {{ cat.name }}
                </router-link>

              </div>
            </div>
          </div>

        </nav>

        <!-- RIGHT ACTIONS -->
        <div class="flex items-center gap-1 lg:gap-3 ml-auto">

          <!-- Support (desktop) -->
          <router-link
            to="/contact"
            class="hidden lg:flex items-center gap-2 pr-3 mr-2 border-r border-gray-200 hover:opacity-80 transition-opacity"
          >
            <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
              <i class="fa-solid fa-headset text-green-600"></i>
            </div>
            <div class="text-xs">
              <div class="text-gray-500">Support</div>
              <div class="font-semibold text-gray-700">24/7 Help</div>
            </div>
          </router-link>

          <!-- Wishlist -->
          <router-link
            to="/wishlist"
            title="Wishlist"
            class="relative p-2.5 rounded-full hover:bg-red-100 transition-colors group"
          >
            <i class="fa-regular fa-heart text-xl text-gray-500 group-hover:text-red-500 transition-colors"></i>
            <span
              v-if="WishListStore.wishListCount"
              class="absolute top-0.5 right-0.5 size-[18px] rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white"
            >
              {{ WishListStore.wishListCount }}
            </span>
          </router-link>

          <!-- Cart -->
          <router-link
            to="/cart"
            title="Cart"
            class="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group"
          >
            <i class="fa-solid fa-cart-shopping text-xl text-gray-500 group-hover:text-green-700 transition-colors"></i>
            <span
              v-if="cartStore.itemsCount"
              class="absolute top-0.5 right-0.5 size-[18px] rounded-full bg-green-700 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white"
            >
              {{ cartStore.itemsCount }}
            </span>
          </router-link>

          <!-- Sign In -->
          <div v-if="!authStore.isLogged">
              <router-link
                to="/login"
                class="hidden lg:flex items-center gap-2 ml-2 px-5 py-2.5 rounded-full bg-green-800 hover:bg-green-900 text-white text-sm font-semibold transition-colors shadow-sm"
              >
                <i class="fa-regular fa-user text-xs"></i>
                Sign In
              </router-link>
          </div>

          <div v-else>
            <span class="hidden md:inline-block"><i class="fa-regular fa-circle-user text-xl"></i></span>
          </div>

          <!-- Mobile Menu Toggle -->
          <button
            :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
            :aria-expanded="isMobileMenuOpen"
            class="xl:hidden ml-1 w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center transition-colors"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <i :class="isMobileMenuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"></i>
          </button>

        </div>
      </div>
    </div>

    <!-- MOBILE MENU backdrop: tap outside to close -->
    <Transition name="fade">
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 bg-black/40 z-40 xl:hidden"
        aria-hidden="true"
        @click="isMobileMenuOpen = false"
      ></div>
    </Transition>

    <!-- MOBILE MENU -->
    <Transition name="slide-right">
      <div
        v-if="isMobileMenuOpen"
        class="fixed top-0 right-0 h-dvh w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 overflow-y-auto overscroll-contain z-50 xl:hidden"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
          <img :src="logo" alt="FreshCart" class="h-8 w-auto" />
          <button
            @click="isMobileMenuOpen = false"
            aria-label="Close menu"
            class="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <i class="fa-solid fa-xmark text-gray-600"></i>
          </button>
        </div>

        <!-- Search (mobile) -->
        <form @submit.prevent="submitSearch" class="p-4 border-b border-gray-100" data-search>
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              autocomplete="off"
              aria-label="Search products"
              placeholder="Search products..."
              @focus="onSearchFocus"
              @input="showSuggestions = true"
              @keydown.esc="showSuggestions = false"
              class="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 text-sm"
            />
            <button
              type="submit"
              aria-label="Search"
              class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-green-600 text-white flex items-center justify-center"
            >
              <i class="fa-solid fa-magnifying-glass text-sm"></i>
            </button>
          </div>

          <SearchSuggestions
            v-if="dropdownOpen"
            inline
            :suggestions="suggestions"
            :state="searchState"
            :query="trimmedQuery"
            @select="onSuggestionSelect"
            @view-all="submitSearch"
          />
        </form>

        <!-- Nav Links -->
        <nav class="p-4">
          <div class="space-y-1">
            <router-link
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              @click="isMobileMenuOpen = false"
              class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 transition-colors"
            >
              {{ link.label }}
            </router-link>

            <!-- Categories Toggle -->
            <button
              @click="isCategoriesOpen = !isCategoriesOpen"
              class="w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 transition-colors"
            >
              Categories
              <i
                class="fa-solid fa-chevron-down text-xs transition-transform duration-200"
                :class="isCategoriesOpen ? 'rotate-180' : ''"
              ></i>
            </button>

            <!-- Categories Dropdown -->
            <Transition name="slide-down">
              <div v-if="isCategoriesOpen" class="ml-4 space-y-1">
                <router-link
                  to="/allcategories"
                  @click="isMobileMenuOpen = false"
                  class="block px-4 py-2 rounded-lg text-sm text-gray-600 hover:text-green-700 hover:bg-green-50"
                >
                  All Categories
                </router-link>
                <router-link
                  v-for="cat in categoryStore.categories"
                  :key="cat._id"
                  :to="{ name: 'CategoryDetails', params: { id: cat._id } }"
                  @click="isMobileMenuOpen = false"
                  class="block px-4 py-2 rounded-lg text-sm text-gray-600 hover:text-green-700 hover:bg-green-50"
                >
                  {{ cat.name }}
                </router-link>
              </div>
            </Transition>
          </div>
        </nav>

        <div class="mx-4 border-t border-gray-100"></div>

        <!-- Wishlist & Cart -->
        <div class="p-4 space-y-1">
          <router-link
            to="/wishlist"
            @click="isMobileMenuOpen = false"
            class="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-green-50 transition-colors"
          >
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                <i class="fa-regular fa-heart text-red-500"></i>
              </div>
              <span class="font-medium text-gray-700">Wishlist</span>
            </div>
          </router-link>

          <router-link
            to="/cart"
            @click="isMobileMenuOpen = false"
            class="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-green-50 transition-colors"
          >
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center">
                <i class="fa-solid fa-cart-shopping text-green-600"></i>
              </div>
              <span class="font-medium text-gray-700">Cart</span>
            </div>
            <span
              v-if="cartStore.itemsCount"
              class="bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-full"
            >
              {{ cartStore.itemsCount > 9 ? '9+' : cartStore.itemsCount }}
            </span>
          </router-link>
        </div>

        <div class="mx-4 border-t border-gray-100"></div>

        <!-- User Section -->
        <div class="p-4 space-y-1">
          <!-- Logged In -->
          <template v-if="authStore.isLogged">
            <router-link
              to="/profile"
              @click="isMobileMenuOpen = false"
              class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-50 transition-colors"
            >
              <div class="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                <i class="fa-regular fa-user text-gray-500"></i>
              </div>
              <span class="font-medium text-gray-700">{{ authStore.user?.name }}</span>
            </router-link>

            <button
              @click="authStore.signOut(); isMobileMenuOpen = false"
              class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors w-full text-left"
            >
              <div class="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                <i class="fa-solid fa-right-from-bracket text-red-500"></i>
              </div>
              <span class="font-medium text-red-600">Sign Out</span>
            </button>
          </template>

          <!-- Not Logged In -->
          <template v-else>
            <router-link
              to="/login"
              @click="isMobileMenuOpen = false"
              class="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
            >
              <i class="fa-regular fa-user"></i>
              Sign In
            </router-link>
          </template>
        </div>

        <!-- Support -->
        <router-link
          to="/contact"
          @click="isMobileMenuOpen = false"
          class="mx-4 mt-2 p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3 hover:bg-green-50 transition-colors"
        >
          <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <i class="fa-solid fa-headset text-green-600"></i>
          </div>
          <div>
            <div class="text-sm font-semibold text-gray-700">Need Help?</div>
            <div class="text-sm text-green-600">Contact Support</div>
          </div>
        </router-link>

      </div>
    </Transition>

  </header>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navupper from './Navupper.vue'
import SearchSuggestions from './SearchSuggestions.vue'
import logo from '@/assets/freshcart-logo.svg'
import { useDebounce } from '@/Composables/useDebounce.js'
import { useAuthStore } from '@/stores/authStore'
import { useCategoryStore } from '@/stores/categoryStore'
import { useCartStore } from '@/stores/cart'
import { useWishList } from '@/stores/wishList'
import { useSearchStore } from '@/stores/Searchstore'

const route = useRoute()
const router = useRouter()
const categoryStore = useCategoryStore()
const authStore = useAuthStore()
const cartStore = useCartStore()
const WishListStore = useWishList()
const searchStore = useSearchStore()

const isMobileMenuOpen = ref(false)
const isCategoriesOpen = ref(false)

const navLinks = [
  { path: '/',       label: 'Home'   },
  { path: '/shop',   label: 'Shop'   },
  { path: '/brands', label: 'Brands' },
]

// ---------- Categories (fetched only when a dropdown is opened) ----------
function loadCategories() {
  categoryStore.getAllCategories()
}

watch(isCategoriesOpen, (open) => {
  if (open) loadCategories()
})

// ---------- Search ----------
const MIN_CHARS = 2          // don't search for 1 letter
const SUGGESTION_LIMIT = 5
const DEBOUNCE_MS = 300

const searchQuery = ref('')
const { debounced, settled, cancel } = useDebounce(searchQuery, DEBOUNCE_MS)

const suggestions = ref([])
const searchState = ref('idle')          // 'idle' | 'loading' | 'done' | 'error'
const showSuggestions = ref(false)
let latestSearch = 0                     // request counter: lets us ignore stale responses

const trimmedQuery = computed(() => searchQuery.value.trim())
const dropdownOpen = computed(() => showSuggestions.value && searchState.value !== 'idle')

// Start downloading the catalog as soon as the box is focused, so results are instant while typing
function onSearchFocus() {
  showSuggestions.value = true
  searchStore.loadAll().catch(() => {})   // errors surface when the user actually searches
}

function resetSearch() {
  latestSearch++
  suggestions.value = []
  searchState.value = 'idle'
  showSuggestions.value = false
}

// Runs on every keystroke: show "Searching…" right away, or reset if the box is (nearly) empty
watch(searchQuery, (value) => {
  latestSearch++                         // anything still in flight is now out of date
  if (value.trim().length < MIN_CHARS) {
    suggestions.value = []
    searchState.value = 'idle'
  } else {
    searchState.value = 'loading'
  }
})


watch(settled, async () => {
  const q = debounced.value.trim()
  if (q.length < MIN_CHARS) return

  const id = ++latestSearch
  try {
    await searchStore.loadAll()          // downloads the catalog once; instant after that
    if (id !== latestSearch) return      // a newer search started; drop this result
    suggestions.value = searchStore.search(q).slice(0, SUGGESTION_LIMIT)
    searchState.value = 'done'
  } catch (error) {
    if (id !== latestSearch) return
    console.error(error)
    suggestions.value = []
    searchState.value = 'error'
  }
})

// Enter / search button / "See all results": go to the shop filtered by the keyword
function submitSearch() {
  const q = trimmedQuery.value
  cancel()                               // drop any pending debounced search
  resetSearch()
  isMobileMenuOpen.value = false
  if (!q) return
  router.push({ name: 'shop', query: { keyword: q } })
}

// A suggestion was clicked: the router-link opens /shop?keyword=<title> (that product shows as a card).
// Keep its title in the box so it's clear what the Shop is showing.
function onSuggestionSelect(product) {
  cancel()
  resetSearch()
  searchQuery.value = product?.title ?? ''
  isMobileMenuOpen.value = false
}

// Close the dropdown when clicking anywhere outside a search box
function onDocumentPointerDown(event) {
  if (!event.target.closest('[data-search]')) showSuggestions.value = false
}

onMounted(() => document.addEventListener('pointerdown', onDocumentPointerDown))
onBeforeUnmount(() => document.removeEventListener('pointerdown', onDocumentPointerDown))

// ...and whenever the route changes
watch(() => route.fullPath, () => {
  showSuggestions.value = false
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.2s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>