<template>
  <div
    class="bg-white rounded-2xl border transition-all duration-300 overflow-hidden border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200"
  >
    <div class="p-3 sm:p-6">
      <div class="flex gap-3 sm:gap-5">

        <!-- Product Image -->
        <div class="relative shrink-0">
          <div
            class="w-16 h-16 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-1.5 sm:p-2.5 overflow-hidden"
          >
            <img
              v-if="firstProduct"
              :src="firstProduct.imageCover"
              :alt="firstProduct.title"
              class="w-full h-full object-contain"
            />
          </div>

          <!-- Extra Items Count -->
          <div
            v-if="order.cartItems.length > 1"
            class="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
          >
            +{{ order.cartItems.length - 1 }}
          </div>
        </div>

        <!-- Order Info -->
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-3 mb-3">

            <div>
              <!-- Status Badge -->
              <div
                :class="statusConfig.badge"
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg mb-2"
              >
                <i :class="statusConfig.icon" class="text-xs"></i>
                <span class="text-xs font-semibold">
                  {{ statusConfig.label }}
                </span>
              </div>

              <!-- Order ID -->
              <h3
                class="font-bold text-gray-900 text-lg flex items-center gap-2"
              >
                <i class="fa-solid fa-hashtag text-xs text-gray-400"></i>
                {{ order.id }}
              </h3>
            </div>

            <!-- Payment Method -->
            <div
              :class="
                order.paymentMethodType === 'cash'
                  ? 'bg-gray-100'
                  : 'bg-purple-100'
              "
              class="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
            >
              <i
                :class="
                  order.paymentMethodType === 'cash'
                    ? 'fa-solid fa-money-bill text-gray-600'
                    : 'fa-solid fa-credit-card text-purple-600'
                "
              >
              </i>
            </div>
          </div>

          <!-- Meta Info -->
          <div
            class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4"
          >
            <span class="flex items-center gap-1.5">
              <i
                class="fa-solid fa-calendar-days text-xs text-gray-400"
              ></i>
              {{ formattedDate }}
            </span>

            <span class="hidden sm:block w-1 h-1 rounded-full bg-gray-300"></span>

            <span class="flex items-center gap-1.5">
              <i class="fa-solid fa-box text-xs text-gray-400"></i>
              {{ order.cartItems.length }} items
            </span>

            <span class="hidden sm:block w-1 h-1 rounded-full bg-gray-300"></span>

            <span class="flex items-center gap-1.5">
              <i class="fa-solid fa-location-dot text-xs text-gray-400"></i>
              {{ order.shippingAddress.city }}
            </span>
          </div>

          <!-- Price + Button -->
          <div class="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
            <div>
              <span class="text-xl sm:text-2xl font-bold text-gray-900">
                {{ order.totalOrderPrice.toLocaleString() }}
              </span>

              <span class="text-sm font-medium text-gray-500 tracking-wide ml-1">
                EGP
              </span>
            </div>

            <button
              @click="$emit('toggle-details', order.id)"
              class="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              {{ showDetails ? "Hide Details" : "Details" }}

              <i
                class="fa-solid fa-chevron-down text-xs transition-transform duration-300"
                :class="{ 'rotate-180': showDetails }"
              ></i>
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },

  showDetails: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["toggle-details"]);

const firstProduct = computed(() => {
  return props.order.cartItems?.[0]?.product || null;
});

const formattedDate = computed(() => {
  return new Date(props.order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const statusConfig = computed(() => {
  if (props.order.isDelivered) {
    return {
      label: "Delivered",
      icon: "fa-solid fa-circle-check",
      badge: "bg-green-100 text-green-600",
    };
  }

  if (props.order.isPaid) {
    return {
      label: "On the way",
      icon: "fa-solid fa-truck",
      badge: "bg-blue-100 text-blue-600",
    };
  }

  return {
    label: "Processing",
    icon: "fa-solid fa-clock",
    badge: "bg-amber-100 text-amber-600",
  };
});
</script>