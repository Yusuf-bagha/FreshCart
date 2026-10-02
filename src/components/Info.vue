<template>
  <section class="py-8 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="flex flex-col sm:flex-row items-center text-center sm:text-left gap-2 sm:gap-4 bg-white p-3 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div
            class="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0"
            :class="feature.bg"
          >
            <i :class="[feature.icon, feature.color]" class="text-lg sm:text-xl"></i>
          </div>
          <div>
            <h3 class="font-semibold text-gray-800 text-xs sm:text-sm">{{ feature.title }}</h3>
            <p class="text-[11px] sm:text-xs text-gray-500">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    icon: 'fa-solid fa-truck',
    title: 'Free Shipping',
    description: 'On orders over 500 EGP',
    bg: 'bg-blue-50',
    color: 'text-blue-500',
  },
  {
    icon: 'fa-solid fa-shield-halved',
    title: 'Secure Payment',
    description: '100% secure transactions',
    bg: 'bg-emerald-50',
    color: 'text-emerald-500',
  },
  {
    icon: 'fa-solid fa-arrow-rotate-left',
    title: 'Easy Returns',
    description: '14-day return policy',
    bg: 'bg-orange-50',
    color: 'text-orange-500',
  },
  {
    icon: 'fa-solid fa-headset',
    title: '24/7 Support',
    description: 'Dedicated support team',
    bg: 'bg-purple-50',
    color: 'text-purple-500',
  },
]
</script>