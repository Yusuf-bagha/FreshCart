<template>
  <div class="container mx-auto px-4">

    <OrderHeader :count="orders.length" />

    <div v-if="orderStore.loading" class="text-center py-10">
      <Loading/>
    </div>

    <div v-else-if="!orders.length" class="text-center py-10 text-gray-500">
      No orders found
    </div>

    <div v-else class="space-y-5 mt-6">
      <OrderCard
        v-for="order in orders"
        :key="order._id"
        :order="order"
        :show-details="openedOrder === order._id"
        @toggle-details="toggleDetails"
      />
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useOrderStore } from "@/stores/order";

import OrderCard from "@/components/Orders/OrderCard.vue";
import OrderHeader from "@/components/Orders/OrderHeader.vue";
import Loading from "@/components/Loading.vue";

const orderStore = useOrderStore();

const orders = ref([]);
const openedOrder = ref(null);

async function fetchOrders() {
  const data = await orderStore.getUserOrders();

  if (data) {
    orders.value = data;
  }
}

function toggleDetails(orderId) {
  openedOrder.value =
    openedOrder.value === orderId ? null : orderId;
}

onMounted(() => {
  fetchOrders();
});
</script>