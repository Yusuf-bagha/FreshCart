import { ref } from "vue"
import axios from "axios"
import { toast } from "vue3-toastify"

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/auth"

export default function useResetCode() {
  const isLoading = ref(false)

  async function verifyResetCode(resetCode) {
    isLoading.value = true
    try {
      await axios.post(`${BASE_URL}/verifyResetCode`, { resetCode })
      toast.success("Code verified")
      return true
    } catch (error) {
        console.log(error.response?.status, error.response?.data)
      toast.error(error.response?.data?.message || "Invalid or expired code")
      return false
    } finally {
      isLoading.value = false
    }
  }

  return { verifyResetCode, isLoading }
}