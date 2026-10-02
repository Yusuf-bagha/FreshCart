<script setup>
import logo from '@/assets/freshcart-logo.svg'
</script>

<template>
  <footer class="bg-[#101828] w-full overflow-hidden">

    <div class="container mx-auto px-6">
      <div
        class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] xl:grid-cols-[3fr_1fr_1fr_1fr_1fr] pt-8 sm:pt-9 pb-10 sm:pb-12 gap-x-6 md:gap-x-8 xl:gap-x-16 gap-y-8 sm:gap-y-10"
      >

        <div class="flex flex-col gap-4 col-span-2 md:col-span-4 lg:col-span-1">
          <img
            :src="logo"
            alt="FreshCart Logo"
            class="!w-48 sm:!w-60 object-contain bg-white mb-5"
            loading="lazy"
            decoding="async"
          />

          <p class="text-gray-400 text-sm leading-6 ">
            FreshCart is your one-stop destination for quality products. From fashion to electronics,
            we bring you the best brands <br/>at competitive prices with a seamless shopping experience.
          </p>

          <ul class="flex flex-col gap-3">
            <li class="hover:text-green-400 text-gray-400">
              <a href="tel:+18001234567" class="flex items-center gap-x-4">
                <i class="fa-solid fa-phone text-green-500"></i> +18001234567
              </a>
            </li>
            <li class="hover:text-green-400 text-gray-400">
              <a href="mailto:support@freshcart.com" class="flex items-center gap-x-4">
                <i class="fa-solid fa-envelope text-green-500"></i> support@freshcart.com
              </a>
            </li>
            <li class="flex items-center gap-x-4 text-gray-400">
              <i class="fa-solid fa-location-dot text-green-500"></i>
              123 Commerce Street, New York, NY 10001
            </li>
          </ul>
        </div>

        <div>
          <h2 class="text-white text-lg font-semibold mb-4">Shop</h2>
          <ul class="flex flex-col gap-y-4 text-gray-400 text-sm">
            <li class="hover:text-green-400"><router-link to="/shop" class="block">All Products</router-link></li>
            <li class="hover:text-green-400"><router-link to="/allcategories" class="block">Categories</router-link></li>
            <li class="hover:text-green-400"><router-link to="/brands" class="block">Brands</router-link></li>
            <li class="hover:text-green-400 cursor-pointer">Electronics</li>
            <li class="hover:text-green-400 cursor-pointer">Men's Fashion</li>
            <li class="hover:text-green-400 cursor-pointer">Women's Fashion</li>
          </ul>
        </div>

        <div>
          <h2 class="text-white text-lg font-semibold mb-4">Account</h2>
          <ul class="flex flex-col gap-y-4 text-gray-400 text-sm">
            <li class="hover:text-green-400 cursor-pointer">My Account</li>
            <li class="hover:text-green-400"><router-link to="/allorders" class="block">Order History</router-link></li>
            <li class="hover:text-green-400"><router-link to="/wishlist" class="block">Wishlist</router-link></li>
            <li class="hover:text-green-400"><router-link to="/cart" class="block">Shopping Cart</router-link></li>
            <li class="hover:text-green-400"><router-link to="/login" class="block">Sign In</router-link></li>
            <li class="hover:text-green-400"><router-link to="/register" class="block">Create Account</router-link></li>
          </ul>
        </div>

        <div>
          <h2 class="text-white text-lg font-semibold mb-4">Support</h2>
          <ul class="flex flex-col gap-y-4 text-gray-400 text-sm">
            <li class="hover:text-green-400 cursor-pointer">Contact Us</li>
            <li class="hover:text-green-400 cursor-pointer">Help Center</li>
            <li class="hover:text-green-400 cursor-pointer">Shipping Info</li>
            <li class="hover:text-green-400 cursor-pointer">Returns & Refunds</li>
            <li class="hover:text-green-400 cursor-pointer">Track order</li>
          </ul>
        </div>

        <div>
          <h2 class="text-white text-lg font-semibold mb-4">Legal</h2>
          <ul class="flex flex-col gap-y-4 text-gray-400 text-sm">
            <li class="hover:text-green-400 cursor-pointer">Privacy Policy</li>
            <li class="hover:text-green-400 cursor-pointer">Terms of Service</li>
            <li class="hover:text-green-400 cursor-pointer">Cookie Policy</li>
          </ul>
        </div>

      </div>
    </div>

    <div class="border-t border-white/10">
      <div
        class="container mx-auto px-6 py-6 
        flex flex-col gap-4 
        md:flex-row md:items-center md:justify-between"
      >
        <p class="text-gray-400 text-sm text-center md:text-left">
          © 2026 FreshCart. All rights reserved.
        </p>


        <div class="flex flex-wrap justify-center md:justify-end gap-4">

          <div class="flex items-center gap-1 text-gray-400">
            <i class="fa-solid fa-credit-card text-lg" aria-hidden="true"></i>
            <span>Visa</span>
          </div>

          <div class="flex items-center gap-1 text-gray-400">
            <i class="fa-solid fa-credit-card text-lg" aria-hidden="true"></i>
            <span>Mastercard</span>
          </div>

          <div class="flex items-center gap-1 text-gray-400">
            <i class="fa-solid fa-credit-card text-lg" aria-hidden="true"></i>
            <span>Paypal</span>
          </div>

        </div>
      </div>
    </div>

  </footer>
</template>

<style scoped>
footer {
  position: relative;
  z-index: 1;
}
</style>