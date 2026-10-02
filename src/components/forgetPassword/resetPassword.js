import { ref } from "vue"
import axios from "axios"
import { toast } from "vue3-toastify"

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/auth"

export default function useResetPassword() {
  const isLoading = ref(false)

  async function resetPassword(email, newPassword) {
    isLoading.value = true
    try {
      await axios.put(`${BASE_URL}/resetPassword`, { email, newPassword })
      toast.success("Password updated, please sign in")
      return true
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not reset password")
      return false
    } finally {
      isLoading.value = false
    }
  }

  return { resetPassword, isLoading }
}