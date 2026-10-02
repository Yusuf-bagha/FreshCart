<script setup>
import { ErrorMessage, Field, Form } from 'vee-validate';
import * as Yup from 'yup';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import Loading from '../Loading.vue';
import GoogleIcon from '@/icons/GoogleIcon.vue'; 
import FacebookIcon from '@/icons/FacebookIcon.vue';
import publicClient from '@/api/publicClient';

const router = useRouter();
const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").min(3 , 'min is 3').max(15 , 'max is 15'),
    email: Yup.string().required('Email is required').email("Email is invalid"),
    password: Yup.string().required('password is required').matches( /^(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/ , 'Password must be at least 8 chars, include a number and a special character'),
    rePassword: Yup.string().required('rePassword is required').oneOf([Yup.ref('password')] , 'it dose not match the password'),
    phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/ , 'Egyptian phone number needed'),
    terms: Yup.boolean()
  .oneOf([true], 'You must accept the terms')
});

const password = ref('');
const loading = ref(false)

const passwordStrength = computed(() => {
  const val = password.value;
  if (!val) return { width: '0%', color: 'bg-gray-200', label: '' };

  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^a-zA-Z0-9]/.test(val)) score++;

  // score 0 (e.g. "abc") used to fall through and return undefined, which crashed the template
  // ("Cannot read properties of undefined") while typing a short lowercase password.
  if (score <= 1) return { width: '25%',  color: 'bg-red-500',    label: 'Weak' };
  if (score === 2) return { width: '50%',  color: 'bg-orange-400', label: 'Fair' };
  if (score === 3) return { width: '75%',  color: 'bg-yellow-400', label: 'Good' };
  return { width: '100%', color: 'bg-green-500',  label: 'Strong' };
});

async function onSubmit(values , {resetForm}){
  loading.value = true
  try {
    const { terms, ...payload } = values
    await publicClient.post('/v1/auth/signup', payload)
    toast.success("Account created successfully")
    resetForm();
    router.push('/login')
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong")
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <div class="bg-white rounded-2xl shadow-lg px-4 py-8 sm:px-6 sm:py-10">

    <h2 class="text-center text-2xl sm:text-3xl font-semibold mb-2">Create Your Account</h2>
    <p class="text-center text-gray-500">Start your fresh journey with us today</p>

    <div class="flex gap-2 my-8">
      <button type="button"
        class="border border-gray-300 hover:bg-gray-100 flex justify-center items-center gap-2 grow p-2 rounded transition">
        <GoogleIcon />
        <span>Google</span>
      </button>
      <button type="button"
        class="border border-gray-300 hover:bg-gray-100 flex justify-center items-center gap-2 grow p-2 rounded transition">
        <FacebookIcon />
        <span>Facebook</span>
      </button>
    </div>

    <div class="relative w-full h-[1px] my-6 flex items-center bg-[#F1F2F4]">
      <span class="absolute left-1/2 -translate-x-1/2 bg-white px-4 text-gray-500 text-sm">or</span>
    </div>

    <Form @submit="onSubmit" :validation-schema="validationSchema" class="space-y-5" :initial-values="{ terms: false }">

      <div class="flex flex-col gap-1">
        <label for="reg-name" class="text-sm font-medium text-gray-700">Name*</label>

        <Field name="name"  v-slot="{ field, errorMessage }">

          <input v-bind="field" id="reg-name" type="text" autocomplete="name" placeholder="Ali"
            :class="['border p-3 rounded-md outline-none w-full transition text-sm',
              errorMessage
                ? 'border-red-400 focus:ring-1 focus:ring-red-400'
                : 'border-gray-300 focus:border-my-green focus:ring-1 focus:ring-my-green']" />
        </Field>
        <ErrorMessage name="name" class="text-red-600 text-xs" />
      </div>

      <div class="flex flex-col gap-1">
        <label for="reg-email" class="text-sm font-medium text-gray-700">Email*</label>
        <Field name="email"  v-slot="{ field, errorMessage }">
          <input v-bind="field" id="reg-email" type="email" autocomplete="email" placeholder="ali@example.com"
            :class="['border p-3 rounded-md outline-none w-full transition text-sm',
              errorMessage
                ? 'border-red-400 focus:ring-1 focus:ring-red-400'
                : 'border-gray-300 focus:border-my-green focus:ring-1 focus:ring-my-green']" />
        </Field>
        <ErrorMessage name="email" class="text-red-600 text-xs" />
      </div>

      <div class="flex flex-col gap-1">
        <label for="reg-password" class="text-sm font-medium text-gray-700">Password*</label>
        <Field name="password"  v-slot="{ field, errorMessage }">
          <input v-bind="field" id="reg-password" type="password" autocomplete="new-password" placeholder="Create a strong password"
            v-model="password"
            :class="['border p-3 rounded-md outline-none w-full transition text-sm',
              errorMessage
                ? 'border-red-400 focus:ring-1 focus:ring-red-400'
                : 'border-gray-300 focus:border-my-green focus:ring-1 focus:ring-my-green']" />
        </Field>
        <ErrorMessage name="password" class="text-red-600 text-xs" />

        <div class="flex items-center gap-2">
          <div class="grow h-1 bg-gray-200 rounded overflow-hidden">
            <div
              :class="passwordStrength.color"
              :style="{ width: passwordStrength.width }"
              class="h-full transition-all duration-500"
            ></div>
          </div>
          <span class="text-sm font-medium" aria-live="polite">{{ passwordStrength.label }}</span>
        </div>
        <p class="text-gray-500 text-xs" v-if="passwordStrength.label !=='Strong'">Must be at least 8 characters with numbers and symbols</p>
        <p class="text-green-700 text-xs" v-else>Your password is good </p>
      </div>

      <div class="flex flex-col gap-1">
        <label for="reg-repassword" class="text-sm font-medium text-gray-700">Confirm Password*</label>
        <Field name="rePassword"  v-slot="{ field, errorMessage }">
          <input v-bind="field" id="reg-repassword" type="password" autocomplete="new-password" placeholder="Confirm your password"
            :class="['border p-3 rounded-md outline-none w-full transition text-sm',
              errorMessage
                ? 'border-red-400 focus:ring-1 focus:ring-red-400'
                : 'border-gray-300 focus:border-my-green focus:ring-1 focus:ring-my-green']" />
        </Field>
        <ErrorMessage name="rePassword" class="text-red-600 text-xs" />
      </div>

      <div class="flex flex-col gap-1">
        <label for="reg-phone" class="text-sm font-medium text-gray-700">Phone Number*</label>
        <Field name="phone"  v-slot="{ field, errorMessage }">
          <input v-bind="field" id="reg-phone" type="tel" autocomplete="tel" placeholder="01xxxxxxxxx"
            :class="['border p-3 rounded-md outline-none w-full transition text-sm',
              errorMessage
                ? 'border-red-400 focus:ring-1 focus:ring-red-400'
                : 'border-gray-300 focus:border-my-green focus:ring-1 focus:ring-my-green']" />
        </Field>
        <ErrorMessage name="phone" class="text-red-600 text-xs" />
      </div>

      <Field name="terms" type="checkbox" v-slot="{ field, errorMessage }">
        <label class="flex items-center gap-2 cursor-pointer">

          <input type="checkbox" v-bind="field" class="peer sr-only" />

          <div
            class="w-4 h-4 border rounded flex items-center justify-center peer-focus-visible:ring-2 peer-focus-visible:ring-my-green [&>i]:hidden peer-checked:[&>i]:block"
            :class="errorMessage ? 'border-red-500' : 'border-gray-400 peer-checked:bg-my-green peer-checked:border-my-green'"
          >
            <i class="fa-solid fa-check text-white text-[10px]" aria-hidden="true"></i>
          </div>

          <span class="pl-3 text-sm">I agree to the
            <span class="text-[#16a34a] hover:underline">Terms of Service</span> and
            <span class="text-[#16a34a] hover:underline">Privacy Policy</span>
          </span>
        </label>

        <p v-if="errorMessage" class="text-red-600 text-sm mt-1">
          {{ errorMessage }}
        </p>
      </Field>

      <button type="submit"
        :disabled="loading"
        class="bg-[#16a34a] text-white hover:bg-green-700 w-full flex items-center justify-center gap-2 p-3 rounded-md transition font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed">
        <i v-if="!loading" class="fa-solid fa-user-plus" aria-hidden="true"></i>

        <span>
          {{ loading ? 'Creating Account...' : 'Create My Account' }}
        </span>
        <Loading v-if="loading" :full="false" :size="18" color="#fff" />
      </button>

    </Form>

    <p class="border-t pt-6 mt-6 text-center text-sm text-gray-500">
      Already have an account?
      <router-link to="/login" class="text-[#16a34a] hover:underline font-medium">Sign In</router-link>
    </p>

  </div>
</template>