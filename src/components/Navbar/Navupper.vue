<template>
  <div class="flex justify-between pt-3">
    <div class="left flex gap-5 text-sm">
      <span class="text-gray-600"><i class="fa-solid fa-truck text-[#16A34A]" aria-hidden="true"></i> Free on orders 500EGP</span>
      <span class="text-gray-600"><i class="fa-solid fa-gift text-[#16A34A]" aria-hidden="true"></i> New Arrivals Daily</span>
    </div>

    <div class="right text-sm flex gap-6">
      <!-- Contact: real tel:/mailto: links (they used to be plain <li>s that only looked clickable) -->
      <ul class="flex gap-6">
        <li>
          <a href="tel:+18001234567" class="flex items-center gap-x-4 text-gray-600 hover:text-green-700">
            <i class="fa-solid fa-phone" aria-hidden="true"></i>+1(800)1234567
          </a>
        </li>
        <li>
          <a href="mailto:support@freshcart.com" class="flex items-center gap-x-4 text-gray-600 hover:text-green-700">
            <i class="fa-regular fa-envelope" aria-hidden="true"></i>support@freshcart.com
          </a>
        </li>
      </ul>

      <span class="ml-3 w-px h-4 bg-gray-200" aria-hidden="true"></span>

      <div class="flex items-center gap-4">
       
        <ul v-if="!authStore.isLogged" class="flex gap-5">
          <li>
            <router-link to="/login" class="text-gray-600 hover:text-green-700">
              <i class="fa-regular fa-user" aria-hidden="true"></i> Sign In
            </router-link>
          </li>
          <li>
            <router-link to="/register" class="text-gray-600 hover:text-green-700">
              <i class="fa-solid fa-user-plus" aria-hidden="true"></i> Sign Up
            </router-link>
          </li>
        </ul>

        <ul v-else class="flex gap-5">
          <li class="text-gray-600">
            <i class="fa-regular fa-user" aria-hidden="true"></i> {{ authStore.user?.name }}
          </li>
          <li>
            <button type="button" @click="handleLogout" class="text-gray-600 hover:text-red-600 cursor-pointer">
              <i class="fa-solid fa-right-from-bracket" aria-hidden="true"></i> Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();

const router = useRouter();

function handleLogout() {
  authStore.signOut();
  router.push('/login');
}
</script>

<style lang="scss" scoped>

</style>