<template>
    <NameTagger
        :title="heading"
        :subtitle="subheading"
        color="green"
    />

    <!-- px-4: keeps the 1st/5th cards off the screen edges and leaves room for hover:scale-105.
         scroll-mt-32 + min-h: clears the fixed navbar and stops the footer jumping while loading. -->
    <div ref="gridTop" class="container mx-auto px-4 scroll-mt-32 min-h-[50vh]">

        <!-- Loading -->
        <div v-if="isLoading" class="flex justify-center py-12">
            <Loading />
        </div>

        <!-- No results -->
        <div v-else-if="!products.length" class="py-16 text-center">
            <p class="text-lg font-semibold text-gray-700">No products found</p>
            <p class="mt-1 text-sm text-gray-500">Try a different search term.</p>
            <router-link to="/shop" class="mt-4 inline-block font-medium text-my-green">
                View all products
            </router-link>
        </div>

        <div v-else>
            <!-- invisible h2 so headings go h1 -> h2 -> h3 (card titles) without skipping a level -->
            <h2 class="sr-only">Products</h2>

            <div class="my-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
                <!-- first 4 cards are above the fold: load eagerly; the very first is the LCP image -->
                <ProductCard
                    v-for="(product, index) in products"
                    :key="product._id"
                    :product="product"
                    :img-loading="index < 4 ? 'eager' : 'lazy'"
                    :img-priority="index === 0 ? 'high' : 'auto'"
                />
            </div>
        </div>

        <Paginator v-model="page" :total-pages="totalPages" class="mt-12 mb-10" />
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductCard from '@/components/Home/ProductCard.vue';
import NameTagger from '@/components/NameTagger.vue';
import Loading from '@/components/Loading.vue';
import Paginator from '@/components/Paginator.vue';
import publicClient from '@/api/publicClient';
import { useSearchStore } from '@/stores/Searchstore';

// API default is 40 per page; 20 = 4 rows on desktop and half the images per page
const PAGE_SIZE = 20;

const route = useRoute();
const router = useRouter();
const searchStore = useSearchStore();

const products = ref([]);
const isLoading = ref(false);
const totalPages = ref(1);
const gridTop = ref(null);
let latestRequest = 0; // lets us ignore a slow response that arrives after a newer one

// Both live in the URL: /shop?keyword=shirt&page=2. Refresh, back button and shared links all work.
const keyword = computed(() => String(route.query.keyword ?? '').trim());

const page = computed({
    get: () => Math.max(1, Math.floor(Number(route.query.page)) || 1),
    set: (p) => router.push({ query: { ...route.query, page: p } }),
});

const heading = computed(() => (keyword.value ? 'Search Results' : 'All Products'));
const subheading = computed(() =>
    keyword.value
        ? `Showing results for “${keyword.value}”`
        : 'Browse our wide range of products'
);

async function getAllProducts() {
    const id = ++latestRequest;
    isLoading.value = true;
    try {
        if (keyword.value) {
            // Search: filter the locally cached catalog and paginate it here
            await searchStore.loadAll();
            if (id !== latestRequest) return;

            const matches = searchStore.search(keyword.value);
            totalPages.value = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
            const start = (page.value - 1) * PAGE_SIZE;
            products.value = matches.slice(start, start + PAGE_SIZE);
        } else {
            // Browse: normal server-side pagination
            const { data } = await publicClient.get('/v1/products', {
                params: { limit: PAGE_SIZE, page: page.value },
            });
            if (id !== latestRequest) return; // a newer request is on its way

            products.value = data.data;
            // 0 pages would make the "page too high" check below misfire, so floor at 1
            totalPages.value = Math.max(1, data.metadata?.numberOfPages ?? 1);
        }

        // e.g. /shop?page=99 -> jump to the last real page (the watcher below refetches)
        if (page.value > totalPages.value) {
            router.replace({ query: { ...route.query, page: totalPages.value } });
        }
    } catch (error) {
        if (id !== latestRequest) return;
        console.error(error);
        products.value = [];
    } finally {
        if (id === latestRequest) isLoading.value = false;
    }
}

// Refetch when the page OR the search keyword changes.
// A new keyword from the navbar arrives without ?page=, so it lands on page 1 automatically.
watch([page, keyword], async () => {
    // When leaving /shop the route changes before this component unmounts;
    // without this guard the watcher would fire a pointless request.
    if (route.name !== 'shop') return;
    await getAllProducts();
    gridTop.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

onMounted(getAllProducts);
</script>

<style lang="scss" scoped>

</style>