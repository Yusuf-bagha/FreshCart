import { defineStore } from "pinia";
import apiClient from "@/api/AxiosInterceptor";
import { useAuthStore } from "./authStore";

function isQueuedOffline(err) {
  return !err.response && !navigator.onLine;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: null,
    loading: false,
    error: null,
  }),

  getters: {
    products: (state) => state.cart?.data?.products || [],
    itemsCount: (state) => state.cart?.numOfCartItems ?? 0,
    totalPrice: (state) => state.cart?.data?.totalCartPrice ?? 0,
    cartId: (state) => state.cart?.data?._id ?? null,
    cartIds: (state) => new Set((state.cart?.data?.products || []).map((p) => p.product._id)),
    isInCart() {
      return (productId) => this.cartIds.has(productId);
    },
  },

  actions: {
    async fetchCart() {
      if (this._inflight) return this._inflight;
      this._inflight = apiClient.get("/v2/cart")
        .then(({ data }) => { this.cart = data; })
        .finally(() => { this._inflight = null; });
      return this._inflight;
    },

    async getCart() {
      this.loading = true;
      this.error = null;
      try {
        await this.fetchCart();
      } catch (err) {
        this.error = err?.response?.data?.message || "Failed to load cart";
      } finally {
        this.loading = false;
      }
    },

    async addToCart(productId) {
  if (!useAuthStore().isLogged) {
    this.error = "Please login first";
    return;
  }
  this.loading = true;
  this.error = null;
  try {
    await apiClient.post("/v2/cart", { productId });
    await this.fetchCart();
  } catch (err) {
    if (!isQueuedOffline(err)) {
      this.error = err?.response?.data?.message || "Failed to add to cart";
    }
  } finally {
    this.loading = false;
  }
},

    async updateQuantity(productId, count) {
      if (!useAuthStore().isLogged) return;
      this.error = null;
      try {
        await apiClient.put(`/v2/cart/${productId}`, { count });
        await this.fetchCart();
      } catch (err) {
        if (!isQueuedOffline(err)) {
          this.error = err?.response?.data?.message || "Failed to update item";
        }
      }
    },

    async removeItem(productId) {
      if (!useAuthStore().isLogged) return;
      this.error = null;
      try {
        await apiClient.delete(`/v2/cart/${productId}`);
        await this.fetchCart();
      } catch (err) {
        if (!isQueuedOffline(err)) {
          this.error = err?.response?.data?.message || "Failed to remove item";
        }
      }
    },

    async clearCart() {
    if (!useAuthStore().isLogged) return;
      this.error = null;
      try {
        await apiClient.delete("/v2/cart");
        await this.fetchCart();
      } catch (err) {
        if (!isQueuedOffline(err)) {
          this.error = err?.response?.data?.message || "Failed to clear cart";
        }
      }
    },

    resetCart() {
      this.cart = null;
      this.loading = false;
      this.error = null;
    },
  },
});