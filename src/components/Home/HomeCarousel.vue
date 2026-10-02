<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const images = [
  {
    id: 1,
    title: "Fresh Products Delivered to your Door",
    desc: "Get 20% off your first order",
    buttons: [
      { text: "Shop Now", type: "primary", to: "/shop" },
      { text: "View deals", type: "secondary", to: "/shop" },
    ],
  },
  {
    id: 2,
    title: "Premium Quality Guaranteed",
    desc: "Fresh from farm to your table",
    buttons: [
      { text: "Shop Now", type: "primary", to: "/shop" },
      { text: "Explore our brands", type: "secondary", to: "/brands" },
    ],
  },
  {
    id: 3,
    title: "Fast & Free Delivery",
    desc: "Same day delivery available",
    buttons: [
      { text: "Order Now", type: "primary", to: "/shop" },
      { text: "Delivery info", type: "secondary", to: "/shop" },
    ],
  },
]

const isPhone = typeof window !== 'undefined' && window.innerWidth < 640

const config = {
  height: isPhone ? 300 : 400,
  itemsToShow: 1,
  gap: 5,
}
</script>

<template>
  <Carousel v-bind="config">
    <Slide
      v-for="image in images"
      :key="image.id"
      class="hero-slide !justify-start text-white p-4 w-full"
    >
      <div class="content max-w-2xl ms-6 sm:ms-10 me-6 sm:me-0">
        <h2 class="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{{ image.title }}</h2>
        <p class="text-base sm:text-lg mb-4">{{ image.desc }}</p>

        <div class="flex flex-wrap gap-2 sm:gap-3">
          <router-link
            v-for="(btn, index) in image.buttons"
            :key="index"
            :to="btn.to"
            class="inline-block px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base rounded font-medium"
            :class="
              btn.type === 'primary'
                ? 'bg-white text-green-700'
                : 'border border-white text-white'
            "
          >
            {{ btn.text }}
          </router-link>
        </div>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<style>

.hero-slide {
  background: linear-gradient(to right, rgba(34, 197, 94, 0.9), rgba(74, 222, 128, 0.5)),
              url('/hero-mobile.webp') center / cover;
}
@media (min-width: 640px) {
  .hero-slide {
    background: linear-gradient(to right, rgba(34, 197, 94, 0.9), rgba(74, 222, 128, 0.5)),
                url('/hero.webp') center / cover;
  }
}

.carousel {
  --vc-pgn-background-color: rgba(255, 255, 255, 0.7);
  --vc-pgn-active-color: rgba(255, 255, 255, 1);
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

@media (max-width: 639px) {
  .carousel .carousel__prev,
  .carousel .carousel__next {
    display: none;
  }
}

.carousel .carousel__pagination-button {
  box-sizing: content-box;
  padding: max(0px, calc((24px - var(--vc-pgn-height, 4px)) / 2))
           max(0px, calc((24px - var(--vc-pgn-width, 16px)) / 2));
  background-clip: content-box;
}
</style>