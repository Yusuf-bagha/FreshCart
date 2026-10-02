<template>
  <div class="order-last lg:order-first">

    <div class="main mb-6">
      <h1 class="font-semibold text-3xl sm:text-4xl leading-9 sm:leading-10 text-[#364153]">
        Welcome to <span class="text-[#16A34A]">FreshCart</span>
      </h1>

      <p class="text-lg sm:text-xl leading-7 font-medium text-[#364153]">
        Join thousands of happy customers who enjoy fresh groceries<br class="hidden lg:block" />
        delivered right to their doorstep.
      </p>
    </div>

    <ul>
     <li v-for="(li, index) in liValues" :key="index" class="flex gap-4 mb-5">

  <div class="w-12 h-12 text-lg bg-green-300 text-primary-600 rounded-full flex items-center justify-center shrink-0">
    <i :class="['fa-solid', li.icon, 'text-green-700']"></i>
  </div>

  <div>
    <h4 class="font-semibold text-lg text-[#364153]">
      {{ li.title }}
    </h4>

    <p class="text-base text-[#4a5565]">
      {{ li.desc }}
    </p>
  </div>

</li>
    </ul>

    <div class="review bg-white shadow-sm p-4 rounded-md mt-8 sm:mt-15">

    <div class="flex items-center gap-4 mb-4">

      <img
        :src="reviewAuthor"
        alt="author"
        class="w-12 h-12 rounded-full object-cover"
      />

      <div>
        <h3 class="font-semibold text-[#364153]">Sarah Johnson</h3>

        <div class="flex gap-1 text-yellow-400">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
      </div>

    </div>

    <blockquote>
      <p class="italic text-gray-600">
        "FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!"
      </p>
    </blockquote>

  </div>

  </div>
</template>

<script setup>
import reviewAuthor from "@/assets/review-author.webp";
const liValues =[
    {
    title:"Premium Quality",
    desc:"Premium quality products sourced from trusted suppliers.",
    icon:"fa-star"
    },

    {
    title:"Fast Delivery",
    desc:"Same-day delivery available in most areas",
    icon:"fa-truck-fast"
    },

    {
    title:"Secure Shopping",
    desc:"Your data and payments are completely secure",
    icon: "fa-shield-halved"
    },

]
</script>

<style lang="scss" scoped>

</style>