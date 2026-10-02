<script setup>
import { computed } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { showPassword } from '@/Composables/showpassword.js'

const props = defineProps({
  step: { type: Number, default: 1 },
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['submit', 'resend', 'back'])

const schemas = {
  1: yup.object({
    email: yup
      .string()
      .required('Email address is required')
      .email('Please enter a valid email address')
  }),
  2: yup.object({
    resetCode: yup
      .string()
      .required('Reset code is required')
      .matches(/^\d{6}$/, 'Code must be 6 digits')
  }),
  3: yup.object({
    newPassword: yup
      .string()
      .required('New password is required')
      .min(6, 'Password must be at least 6 characters')
  })
}

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: computed(() => schemas[props.step]),
  initialValues: {
    email: '',
    resetCode: '',
    newPassword: ''
  }
})

const [email, emailProps] = defineField('email')
const [resetCode, resetCodeProps] = defineField('resetCode')
const [newPassword, newPasswordProps] = defineField('newPassword')
const { inputType, toggleVisibility, iconClass } = showPassword()
const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})

const content = {
  1: {
    title: 'Forgot Password?',
    subtitle: "No worries, we'll send you a reset code",
    field: 'email',
    label: 'Email Address',
    icon: 'fa-envelope',
    button: 'Send Reset Code',
    loadingText: 'Sending...'
  },
  2: {
    title: 'Enter Reset Code',
    subtitle: 'We sent a code to your email',
    field: 'resetCode',
    label: 'Reset Code',
    icon: 'fa-key',
    button: 'Verify Code',
    loadingText: 'Verifying...'
  },
  3: {
    title: 'Set New Password',
    subtitle: 'Choose a new password for your account',
    field: 'newPassword',
    label: 'New Password',
    icon: 'fa-lock',
    button: 'Reset Password',
    loadingText: 'Saving...'
  }
}

const current = computed(() => content[props.step])
const stepIcons = ['fa-envelope', 'fa-key', 'fa-lock']

const inputBase =
  'w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed'
const inputError = 'border-red-500 focus:border-red-500 focus:ring-red-100'
</script>

<template>
  <div class="w-full">
    <div class="bg-white rounded-2xl shadow-xl p-5 sm:p-8 lg:p-12">
      <div class="text-center mb-8">
        <div class="flex items-center justify-center mb-4">
          <span class="text-3xl font-bold text-green-600">Fresh<span class="text-gray-800">Cart</span></span>
        </div>
        <h1 class="text-2xl font-bold text-gray-800 mb-2">{{ current.title }}</h1>
        <p class="text-gray-600">{{ current.subtitle }}</p>
      </div>

      <div class="flex items-center justify-center mb-8">
        <div v-for="(icon, i) in stepIcons" :key="icon" class="flex items-center">
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300"
            :class="[
              step >= i + 1 ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400',
              step === i + 1 && 'ring-4 ring-green-100'
            ]"
          >
            <i class="fa-solid" :class="icon"></i>
          </div>
          <div
            v-if="i < stepIcons.length - 1"
            class="w-8 sm:w-16 h-0.5 mx-1 sm:mx-2 transition-all duration-300"
            :class="step > i + 1 ? 'bg-green-600' : 'bg-gray-200'"
          ></div>
        </div>
      </div>

      <form class="space-y-6" @submit="onSubmit">
        <div>
          <label :for="current.field" class="block text-sm font-semibold text-gray-700 mb-2">
            {{ current.label }}
          </label>
          <div class="relative">
            <input
              v-if="step === 1"
              id="email"
              v-model="email"
              v-bind="emailProps"
              :disabled="loading"
              :class="[inputBase, errors.email && inputError]"
              placeholder="Enter your email address"
              type="email"
              name="email"
            />

            <input
              v-else-if="step === 2"
              id="resetCode"
              v-model="resetCode"
              v-bind="resetCodeProps"
              :disabled="loading"
              :class="[inputBase, 'tracking-widest', errors.resetCode && inputError]"
              placeholder="Enter the  code"
              type="text"
              inputmode="numeric"
              maxlength="6"
              autocomplete="one-time-code"
              name="resetCode"
            />

            <template v-else>
  <input
    id="newPassword"
    v-model="newPassword"
    v-bind="newPasswordProps"
    :disabled="loading"
    :class="[inputBase, 'pr-12', errors.newPassword && inputError]"
    placeholder="Enter your new password"
    :type="inputType"
    autocomplete="new-password"
    name="newPassword"
  />
  <button
    type="button"
    class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
    :aria-label="inputType === 'password' ? 'Show password' : 'Hide password'"
    @click="toggleVisibility"
  >
    <i :class="iconClass" aria-hidden="true"></i>
  </button>
</template>

            <i
              class="fa-solid absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base pointer-events-none"
              :class="current.icon"
              aria-hidden="true"
            ></i>
          </div>
          <p v-if="errors[current.field]" class="mt-2 text-sm text-red-600">
            {{ errors[current.field] }}
          </p>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? current.loadingText : current.button }}
        </button>

        <div v-if="step === 1" class="text-center">
          <RouterLink
            to="/login"
            class="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            <i class="fa-solid fa-arrow-left text-xs" aria-hidden="true"></i>
            Back to Sign In
          </RouterLink>
        </div>

        <div v-else-if="step === 2" class="flex items-center justify-between text-sm">
          <button
            type="button"
            class="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
            @click="emit('back')"
          >
            <i class="fa-solid fa-arrow-left text-xs" aria-hidden="true"></i>
            Change email
          </button>
          <button
            type="button"
            :disabled="loading"
            class="text-green-600 hover:text-green-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            @click="emit('resend')"
          >
            Resend code
          </button>
        </div>
      </form>

      <div class="text-center mt-8 pt-6 border-t border-gray-100">
        <p class="text-gray-600">
          Remember your password?
          <RouterLink to="/login" class="text-green-600 hover:text-green-700 font-semibold transition-colors">
            Sign In
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>