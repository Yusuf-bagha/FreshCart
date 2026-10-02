<template>
    <div class="lg:col-span-1">
        <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden lg:sticky lg:top-32 shadow-sm ">

            <div class="bg-gradient-to-r from-[#16a34a] to-[#15803d] px-4 sm:px-6 py-4">
                <h2 class="text-lg font-bold text-white flex items-center gap-2">
                    <i class="fa-solid fa-bag-shopping"></i>
                    Order Summary
                </h2>
                <p class="text-white text-sm mt-1">{{ cartStore.itemsCount }} items in your cart</p>
            </div>

            <div class="p-4 sm:p-6 space-y-5">
                <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <i class="fa-solid fa-truck text-green-500"></i>
                    </div>
                    <div>
                        <p class="font-semibold text-green-700">Free Shipping!</p>
                        <p class="text-sm text-green-600">You qualify for free delivery</p>
                    </div>
                </div>

                <div class="space-y-3">
                    <div class="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span class="font-medium text-gray-900">{{ cartStore.totalPrice.toLocaleString() }} EGP</span>
                    </div>
                    <div class="flex justify-between text-gray-600">
                        <span>Shipping</span><span class="font-medium text-green-600">FREE</span>
                    </div>
                    <div class="border-t border-dashed border-gray-200 pt-3 mt-3">
                        <div class="flex justify-between items-baseline">
                            <span class="text-gray-900 font-semibold">Total</span>
                            <div class="text-right"><span class="text-2xl font-bold text-gray-900">{{ cartStore.totalPrice.toLocaleString() }}</span>
                                <span class="text-sm text-gray-500 ml-1">EGP</span>
                            </div>
                        </div>
                    </div>

                    <button
                        class="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-green-400 hover:text-green-600 hover:bg-green-50/50 transition-all">
                        <i class="fa-solid fa-tag"></i>
                        <span class="text-sm font-medium">Apply Promo Code</span>
                    </button>

                    <router-link
                        v-if="buttonConfig.isLink"
                        to="/checkout"
                        class="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-600/20 active:scale-[0.98]"
                        >
                        <i :class="`fa-solid ${buttonConfig.icon}`"></i>
                        <span>{{ buttonConfig.label }}</span>
                    </router-link>

                        <button
                        v-else
                        @click="emit('submit')"
                        class="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-600/20 active:scale-[0.98]"
                        >
                        <i :class="`fa-solid ${buttonConfig.icon}`"></i>
                        <span>{{ buttonConfig.label }}</span>
                        </button>

                    <div class="flex items-center justify-center gap-4 py-2">
                        <div class="flex items-center gap-1.5 text-xs text-gray-500">
                            <i class="fa-solid fa-shield-halved text-green-500"></i>
                            <span>Secure Payment</span>
                        </div>
                        <div class="w-px h-4 bg-gray-200"></div>
                        <div class="flex items-center gap-1.5 text-xs text-gray-500">
                            <i class="fa-solid fa-truck text-blue-500"></i>
                            <span>Fast Delivery</span>
                        </div>
                    </div>

                    <div class="justify-center flex mt-2">
                    <router-link to="/shop"
                        class="text-my-green hover:text-green-700 font-medium text-sm flex items-center gap-2">
                        <i class="fa-solid fa-arrow-left-long"></i> Continue Shopping
                    </router-link>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cart";

const props = defineProps({
  paymentMethod: { type: String, default: "cash" },
});
const emit = defineEmits(["submit"]);

const cartStore = useCartStore();
const route = useRoute();

const isCheckout = computed(() => route.name === "checkout"); 

const buttonConfig = computed(() => {
  if (!isCheckout.value) {
    return { label: "Secure Checkout", icon: "fa-bag-shopping", isLink: true };
  }
  if (props.paymentMethod === "cash") {
    return { label: "Place Order", icon: "fa-wallet", isLink: false };
  }
  return { label: "Proceed to Payment", icon: "fa-shield-halved", isLink: false };
});
</script>

<style lang="scss" scoped></style>