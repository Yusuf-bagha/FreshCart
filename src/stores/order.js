import { defineStore } from "pinia";
import { ref } from "vue";
import apiClient from "@/api/AxiosInterceptor";
import { toast } from "vue3-toastify";
import { useAuthStore } from "./authStore";

export const useOrderStore = defineStore("order", () => {
  const loading = ref(false);
  const error = ref(null);
  const authStore = useAuthStore();

  async function cashOrder(cartId, shippingAddress) {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await apiClient.post(
        `/v2/orders/${cartId}`,
        { shippingAddress },
      );
      toast.success(data.message);
      return data;
    } catch (err) {
      error.value = err?.response?.data?.message || "Failed to place order";
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function visaOrder(cartId, shippingAddress) {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await apiClient.post(
        `/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,
        { shippingAddress }
      );
      toast.success("Redirecting to payment...");
      return data;
    } catch (err) {
      error.value = err?.response?.data?.message || "Failed to initiate payment";
      toast.error(error.value);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function getUserOrders() {
    loading.value = true;
    error.value = null;
    try {
      const userId = authStore.user?.id;
      const { data } = await apiClient.get(`/v1/orders/user/${userId}`);
      return data;
    } catch (err) {
      error.value = err?.response?.data?.message || "Failed to fetch orders";
      return null;
    } finally {
      loading.value = false;
    }
  }

  return { loading, error, cashOrder, visaOrder, getUserOrders };
});