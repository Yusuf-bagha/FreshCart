<template>
  <section class="py-6 sm:py-10">
    <div>
      <div class="grid md:grid-cols-2 gap-4 sm:gap-6">
        <div
          v-for="card in promoCards"
          :key="card.code"
          class="relative overflow-hidden rounded-2xl p-5 sm:p-8 text-white"
          :class="card.gradient"
        >
          <div class="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div class="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

          <div class="relative z-10">
            <div class="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
              <span aria-hidden="true">{{ card.emoji }}</span>
              <span>{{ card.badge }}</span>
            </div>

            <h3 class="text-xl sm:text-2xl md:text-3xl font-bold mb-2">{{ card.title }}</h3>
            <p class="text-white/80 mb-4">{{ card.description }}</p>

            <div class="flex flex-wrap items-center gap-x-4 gap-y-1 mb-5 sm:mb-6">
              <div class="text-2xl sm:text-3xl font-bold">{{ card.discount }}</div>
              <div class="text-sm text-white/70">
                Use code: <span class="font-bold text-white">{{ card.code }}</span>
              </div>
            </div>

            <router-link :to="card.link"
              class="inline-flex items-center gap-2 bg-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              :class="card.btnColor">

              {{ card.btnText }}
              <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

const promoCards = [
  {
    gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
    emoji: '🔥',
    badge: 'Deal of the Day',
    title: 'Fresh Organic Fruits',
    description: 'Get up to 40% off on selected organic fruits',
    discount: '40% OFF',
    code: 'ORGANIC40',
    link: '/shop',
    btnText: 'Shop Now',
    btnColor: 'text-emerald-700',
  },
  {
    gradient: 'bg-gradient-to-br from-orange-400 to-rose-500',
    emoji: '✨',
    badge: 'New Arrivals',
    title: 'Exotic Vegetables',
    description: 'Discover our latest collection of premium vegetables',
    discount: '25% OFF',
    code: 'FRESH25',
    link: '/shop',
    btnText: 'Explore Now',
    btnColor: 'text-orange-700',
  },
]
</script>