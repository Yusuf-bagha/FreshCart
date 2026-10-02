<script setup>
import { useWishList } from "@/stores/wishList";

const WhisListStore = useWishList();

</script>

<template>
  <div class="flex items-center justify-between mb-5">
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
        <span class="text-white w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl flex items-center justify-center bg-red-100">
          <i class="fa-solid fa-heart text-red-600"></i>
        </span>
        My WishList
      </h1>

      <p class="text-gray-500 mt-2">
        You have
        <span class="font-semibold text-red-600">
          {{ WhisListStore.wishListCount }}
        </span>
        items in your List
      </p>
    </div>
  </div>
</template>