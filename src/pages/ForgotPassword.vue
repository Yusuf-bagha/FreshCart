<template>
  <div class="py-10">
    <div class="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-4">
    <ForgotPasswordInfo />
    <ForgotPasswordForm
        :step="step"
        :loading="loading"
        @submit="onFormSubmit"
        @resend="sendResetEmail(email)"
        @back="step = 1"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ForgotPasswordForm from '@/components/forgetPassword/ForgotPasswordForm.vue'
import ForgotPasswordInfo from '@/components/forgetPassword/ForgotPasswordInfo.vue'
import useEmailConfirmation from '@/components/forgetPassword/forgotPassword'
import useResetCode from '@/components/forgetPassword/resetCode'
import useResetPassword from '@/components/forgetPassword/resetPassword' 

const router = useRouter()
const step = ref(1)
const email = ref('')

const { sendResetEmail, isLoading: sending } = useEmailConfirmation()
const { verifyResetCode, isLoading: verifying } = useResetCode()
const { resetPassword, isLoading: resetting } = useResetPassword()

const loading = computed(() => sending.value || verifying.value || resetting.value)

async function onFormSubmit(values) {
    console.log('step', step.value, values)
  if (step.value === 1) {
    if (await sendResetEmail(values.email)) {
    email.value = values.email
    step.value = 2
    }
  } else if (step.value === 2) {
    if (await verifyResetCode(values.resetCode)) {
      step.value = 3
    }
  } else {
    if (await resetPassword(email.value, values.newPassword)) {
      router.push('/login')
    }
  }
}
</script>