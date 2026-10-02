<script setup>
import { ErrorMessage, Field, Form } from 'vee-validate';
import * as Yup from 'yup';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import Loading from '../Loading.vue';
import GoogleIcon from '@/icons/GoogleIcon.vue'; 
import FacebookIcon from '@/icons/FacebookIcon.vue';
import { showPassword } from '@/Composables/showpassword.js';
import { useAuthStore } from '@/stores/authStore';
import publicClient from '@/api/publicClient';
import { useCartStore } from '@/stores/cart';
import { useWishList } from '@/stores/wishList';

const loading = ref(false);
const authStore = useAuthStore();
const router = useRouter();
const cartStore = useCartStore();
const wishlistStore = useWishList();
const { inputType, toggleVisibility, iconClass } = showPassword();


const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required'),
});


function decodeJwtPayload(token) {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
}

async function onSubmit(values, { resetForm }) {
  loading.value = true;
  try {
   
    const { data } = await publicClient.post('/v1/auth/signin', {
      email: values.email,
      password: values.password,
    });
    const payload = decodeJwtPayload(data.token);
    authStore.SetToken(data.token);
    authStore.SetUser({ ...data.user, id: payload.id });

    cartStore.getCart();
    wishlistStore.fetchWishList();

    toast.success('Logged in successfully');
    resetForm();
    router.push({ name: 'home' });
  } catch (error) {
    toast.error(error.response?.data?.message || 'Something went wrong');
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-lg px-4 py-8 sm:px-6 sm:py-10">

    <h2 class="text-center text-2xl sm:text-3xl font-semibold mb-2"><span class="text-my-green">Fresh</span>Cart</h2>
    <h2 class="text-center text-2xl sm:text-3xl font-semibold mb-2">Welcome Back!</h2>
    <p class="text-center text-gray-500">Sign in to continue your fresh shopping experience</p>

    <div class="w-full flex justify-center my-8">

      <div class="flex flex-col gap-2 w-full max-w-md">

        <button type="button" class="w-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2 p-2 rounded-xl transition text-base sm:text-lg">
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>

        <button type="button" class="w-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2 p-2 rounded-xl transition text-base sm:text-lg">
          <FacebookIcon />
          <span>Continue with Facebook</span>
        </button>

      </div>

    </div>

    <div class="relative w-full h-[1px] my-6 flex items-center bg-[#F1F2F4]">
      <span class="absolute left-1/2 -translate-x-1/2 bg-white px-3 sm:px-4 text-gray-500 text-xs sm:text-sm whitespace-nowrap">OR CONTINUE WITH EMAIL</span>
    </div>

    <Form @submit="onSubmit" :validation-schema="validationSchema" class="space-y-5">

      <div class="flex flex-col gap-1">
        <label for="login-email" class="text-sm font-medium text-gray-700">Email Address</label>
        <Field name="email" v-slot="{ field, errorMessage }">
          <div class="relative">
            <i class="fa-solid fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true"></i>

            <input
              v-bind="field"
              id="login-email"
              type="email"
              autocomplete="email"
              placeholder="ali@example.com"
              class="border p-3 pl-10 rounded-md outline-none w-full transition text-sm"
              :class="[
                errorMessage
                  ? 'border-red-400 focus:ring-1 focus:ring-red-400'
                  : 'border-gray-300 focus:border-my-green focus:ring-1 focus:ring-my-green'
              ]"
            />
          </div>
        </Field>
        <ErrorMessage name="email" class="text-red-600 text-xs" />
      </div>

      <div class="flex flex-col gap-1">
        <div class="flex justify-between">
          <label for="login-password" class="text-sm font-medium text-gray-700">Password</label>
          <RouterLink to="/forgot-password" class="text-my-green hover:text-exo-secondary">
            Forgot Password?
          </RouterLink>
        </div>
        <Field name="password" v-slot="{ field, errorMessage }">
          <div class="relative">

            <i class="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true"></i>

            <input
              v-bind="field"
              id="login-password"
              :type="inputType"
              autocomplete="current-password"
              placeholder="Enter your password"
              class="border p-3 pl-10 pr-10 rounded-md outline-none w-full transition text-sm"
              :class="[
                errorMessage
                  ? 'border-red-400 focus:ring-1 focus:ring-red-400'
                  : 'border-gray-300 focus:border-my-green focus:ring-1 focus:ring-my-green'
              ]"
            />

            <button
              type="button"
              @click="toggleVisibility"
              aria-label="Show or hide password"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <i :class="iconClass" aria-hidden="true"></i>
            </button>

          </div>
        </Field>
        <ErrorMessage name="password" class="text-red-600 text-xs" />
      </div>

      <Field name="KeepsignedIn" type="checkbox" v-slot="{ field, errorMessage }">
        <label class="flex items-center gap-2 cursor-pointer">

          <input type="checkbox" v-bind="field" class="peer sr-only" />

          <div
            class="w-4 h-4 border rounded flex items-center justify-center peer-focus-visible:ring-2 peer-focus-visible:ring-my-green [&>i]:hidden peer-checked:[&>i]:block"
            :class="errorMessage ? 'border-red-500' : 'border-gray-400 peer-checked:bg-my-green peer-checked:border-my-green'"
          >
            <i class="fa-solid fa-check text-white text-[10px]" aria-hidden="true"></i>
          </div>

          <span class="pl-3 text-sm">
            keep me signed in
          </span>
        </label>

        <p v-if="errorMessage" class="text-red-600 text-sm mt-1">
          {{ errorMessage }}
        </p>
      </Field>

      <div class="flex justify-center">
        <button type="submit" :disabled="loading" class="bg-[#16a34a] text-white hover:bg-green-700 w-full flex items-center justify-center gap-2 p-3 rounded-xl transition font-medium text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed">
          <span>
            {{ loading ? 'Signing In...' : 'Sign In' }}
          </span>

          <Loading
            v-if="loading"
            :full="false"
            :size="18"
            color="#ffff"
          />
        </button>
      </div>

    </Form>

    <!-- Footer -->
    <p class="border-t pt-6 mt-6 text-center text-sm text-gray-500">
      New to FreshCart?
      <router-link to="/register" class="text-[#16a34a] hover:underline font-medium">Create an account</router-link>
    </p>

    <div class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-6 text-xs text-gray-500">
      <span><i class="fa-solid fa-lock " aria-hidden="true"></i> SSL Secured</span>
      <span><i class="fa-solid fa-shield-halved " aria-hidden="true"></i> 50K+ Users</span>
      <span><i class="fa-solid fa-star " aria-hidden="true"></i>4.9 Rating</span>

    </div>

  </div>
</template>