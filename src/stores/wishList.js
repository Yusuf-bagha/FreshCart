import apiClient from "@/api/AxiosInterceptor";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { toast } from "vue3-toastify";
import { useAuthStore } from "./authStore";

function isQueuedOffline(err) {
  return !err.response && !navigator.onLine;
}

let inflight = null;

export const useWishList = defineStore("wishlist", () => {
  const wishList = ref([]);
  const isLoading = ref(false);

  const wishListIds = computed(() => new Set(wishList.value.map((p) => p._id)));
  const wishListCount = computed(() => wishList.value.length);

  function isLiked(productId) {
    return wishListIds.value.has(productId);
  }

  async function fetchWishList() {
    if (inflight) return inflight;
    inflight = apiClient.get("/v1/wishlist")
      .then(({ data }) => { wishList.value = data.data; })
      .catch(() => { toast.error("Failed to load wishlist"); })
      .finally(() => { inflight = null; });
    return inflight;
  }

  async function addToWishList(productId) {
    if (!useAuthStore().isLogged) return;
    isLoading.value = true;
    try {
      const { data } = await apiClient.post("/v1/wishlist", { productId });
      await fetchWishList();
      toast.success(data.message);
    } catch (error) {
      if (isQueuedOffline(error)) {
        toast.info("You're offline — this will sync once you're back online");
      } else if (error.response?.status === 401) {
        toast.warning("Please login first!");
      } else {
        toast.error(error.response?.data?.message || "Failed to add to wishlist");
      }
    } finally {
      isLoading.value = false;
    }
  }

  async function removeFromWishList(productId) {
    if (!useAuthStore().isLogged) return;
    isLoading.value = true;
    try {
      await apiClient.delete(`/v1/wishlist/${productId}`);
      await fetchWishList();
      toast.success("Product removed successfully from your wishlist");
    } catch (error) {
      if (isQueuedOffline(error)) {
        toast.info("You're offline — removal will sync once you're back online");
      } else {
        toast.error("Failed to remove from wishlist");
      }
    } finally {
      isLoading.value = false;
    }
  }

  async function toggleWishList(productId) {
    if (isLiked(productId)) {
      await removeFromWishList(productId);
    } else {
      await addToWishList(productId);
    }
  }

  function resetWhishList() {
    wishList.value = [];
    isLoading.value = false;
  }

  return {
    wishList, isLoading, wishListIds, isLiked,
    fetchWishList, addToWishList, removeFromWishList, toggleWishList,
    wishListCount, resetWhishList,
  };
});