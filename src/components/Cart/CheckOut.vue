<template>
  <div class="container mx-auto px-4">
    <check-out-header class="mb-6 sm:mb-8" />
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      <AddressBox
        ref="addressBox"
        :paymentMethod="paymentMethod"
        @update:paymentMethod="paymentMethod = $event"
      />
      <OrderSummary
        :paymentMethod="paymentMethod"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { useOrderStore } from "@/stores/order";
import AddressBox from "./AddressBox.vue";
import OrderSummary from "./OrderSummary.vue";
import CheckOutHeader from "./CheckOutHeader.vue";

const router = useRouter();
const cartStore = useCartStore();
const orderStore = useOrderStore();

const paymentMethod = ref("cash");
const addressBox = ref(null);

async function onSubmit() {
  if (!addressBox.value) return;
  const values = await addressBox.value.submit();
   console.log('values:', values);
  if (!values) return;

const cartId = cartStore.cartId;
  const shippingAddress = {
    details: values.details,
    phone: values.phone,
    city: values.city,
  };

  if (paymentMethod.value === "cash") {
    const result = await orderStore.cashOrder(cartId, shippingAddress);
    if (result) {
      cartStore.resetCart();
      router.push("/");
    }
  } else {
  const result = await orderStore.visaOrder(cartStore.cartId, shippingAddress);
  console.log('visa result:', result);
  if (result) {
    window.location.href = result.session?.url;
  }
}
}
</script>