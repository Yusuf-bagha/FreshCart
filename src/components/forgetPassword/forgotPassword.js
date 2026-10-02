import { ref } from "vue"
import axios from "axios"
import { toast } from "vue3-toastify"

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/auth"

export default function useEmailConfirmation() {
  const isLoading = ref(false)

  async function sendResetEmail(email) {
    isLoading.value = true
    try {
      const { data } = await axios.post(`${BASE_URL}/forgotPasswords`, { email })
      toast.success(data.message)
      return true
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
      return false
    } finally {
      isLoading.value = false
    }
  }

  return { sendResetEmail, isLoading }
}