<script setup>
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

const props = defineProps({
  paymentMethod: { type: String, default: "cash" },
});
const emit = defineEmits(["update:paymentMethod"]);

const { validate, errors } = useForm({
  validationSchema: yup.object({
    city: yup.string().required("City is required"),
    details: yup.string().required("Street address is required"),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
  }),
});

const { value: city }    = useField("city");
const { value: details } = useField("details");
const { value: phone }   = useField("phone");

async function submit() {
  const result = await validate();
  if (!result.valid) return null;
  return { 
    city: city.value,       
    details: details.value,  
    phone: phone.value       
  };
}

defineExpose({ submit });
</script>

<template>
  
  <form @submit.prevent class="lg:col-span-2 space-y-6">

    <!-- ── Shipping Address ── -->
    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <div class="bg-gradient-to-r from-green-600 to-green-700 px-4 sm:px-6 py-4">
        <h2 class="text-lg font-bold text-white flex items-center gap-2">
          <i class="fa-solid fa-house" aria-hidden="true"></i>
          Shipping Address
        </h2>
        <p class="text-gray-100 text-sm mt-1">Where should we deliver your order?</p>
      </div>

      <div class="p-4 sm:p-6 space-y-5">

        <!-- Info Banner -->
        <div class="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <i class="fa-solid fa-circle-info text-blue-600 text-sm" aria-hidden="true"></i>
          </div>
          <div>
            <p class="text-sm text-blue-800 font-medium">Delivery Information</p>
            <p class="text-xs text-blue-600 mt-0.5">Please ensure your address is accurate for smooth delivery</p>
          </div>
        </div>

        <!-- City -->
        <div>
          <label for="city" class="block text-sm font-semibold text-gray-700 mb-2">
            City <span class="text-red-600">*</span>
          </label>
          <div class="relative">
            <div class="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
              <i class="fa-solid fa-city text-gray-500 text-sm" aria-hidden="true"></i>
            </div>
            <input
              id="city"
              v-model="city"
              type="text"
              name="city"
              autocomplete="address-level2"
              :aria-invalid="!!errors.city"
              :aria-describedby="errors.city ? 'city-error' : undefined"
              placeholder="e.g. Cairo, Alexandria, Giza"
              :class="[
                'w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all',
                errors.city
                  ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                  : 'border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100',
              ]"
            />
          </div>
          <p v-if="errors.city" id="city-error" role="alert" class="mt-1.5 text-xs text-red-600 flex items-center gap-1">
            <i class="fa-solid fa-circle-exclamation" aria-hidden="true"></i> {{ errors.city }}
          </p>
        </div>

        <!-- Street Address -->
        <div>
          <label for="details" class="block text-sm font-semibold text-gray-700 mb-2">
            Street Address <span class="text-red-600">*</span>
          </label>
          <div class="relative">
            <div class="absolute left-4 top-4 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
              <i class="fa-solid fa-location-dot text-gray-500 text-sm" aria-hidden="true"></i>
            </div>
            <textarea
              id="details"
              v-model="details"
              rows="3"
              name="details"
              autocomplete="street-address"
              :aria-invalid="!!errors.details"
              :aria-describedby="errors.details ? 'details-error' : undefined"
              placeholder="Street name, building number, floor, apartment..."
              :class="[
                'w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all resize-none',
                errors.details
                  ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                  : 'border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100',
              ]"
            />
          </div>
          <p v-if="errors.details" id="details-error" role="alert" class="mt-1.5 text-xs text-red-600 flex items-center gap-1">
            <i class="fa-solid fa-circle-exclamation" aria-hidden="true"></i> {{ errors.details }}
          </p>
        </div>

        <!-- Phone -->
        <div>
          <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number <span class="text-red-600">*</span>
          </label>
          <div class="relative">
            <div class="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
              <i class="fa-solid fa-phone text-gray-500 text-sm" aria-hidden="true"></i>
            </div>
            <input
              id="phone"
              v-model="phone"
              type="tel"
              name="phone"
              autocomplete="tel"
              :aria-invalid="!!errors.phone"
              :aria-describedby="errors.phone ? 'phone-error' : undefined"
              placeholder="01xxxxxxxxx"
              :class="[
                'w-full px-4 py-3.5 pl-14 pr-4 sm:pr-36 border-2 rounded-xl focus:outline-none transition-all',
                errors.phone
                  ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                  : 'border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100',
              ]"
            />
            <span class="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500">
              Egyptian numbers only
            </span>
          </div>
          <p class="sm:hidden mt-1.5 text-xs text-gray-500">Egyptian numbers only (01xxxxxxxxx)</p>
          <p v-if="errors.phone" id="phone-error" role="alert" class="mt-1.5 text-xs text-red-600 flex items-center gap-1">
            <i class="fa-solid fa-circle-exclamation" aria-hidden="true"></i> {{ errors.phone }}
          </p>
        </div>

      </div>
    </div>

    <!-- ── Payment Method ── -->
    <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm mb-5">
      <div class="bg-gradient-to-r from-green-600 to-green-700 px-4 sm:px-6 py-4">
        <h2 class="text-lg font-bold text-white flex items-center gap-2">
          <i class="fa-solid fa-wallet" aria-hidden="true"></i>
          Payment Method
        </h2>
        <p class="text-gray-100 text-sm mt-1">Choose how you'd like to pay</p>
      </div>

      <div class="p-4 sm:p-6 space-y-4">

        <!-- The two options behave like radio buttons, so screen readers are told exactly that -->
        <div role="radiogroup" aria-label="Payment method" class="space-y-4">

          <!-- Cash on Delivery -->
          <button
            type="button"
            role="radio"
            :aria-checked="paymentMethod === 'cash'"
            @click="emit('update:paymentMethod', 'cash')"
            :class="[
              'w-full p-3 sm:p-5 rounded-xl border-2 transition-all flex items-center gap-3 sm:gap-4 group',
              paymentMethod === 'cash'
                ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm'
                : 'border-gray-200 hover:border-green-200 hover:bg-gray-50',
            ]"
          >
            <div
              :class="[
                'w-11 h-11 sm:w-14 sm:h-14 shrink-0 rounded-xl flex items-center justify-center transition-all',
                paymentMethod === 'cash'
                  ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30'
                  : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200',
              ]"
            >
              <i class="fa-solid fa-money-bill text-xl" aria-hidden="true"></i>
            </div>
            <div class="flex-1 min-w-0 text-left">
              <!-- span, not h3: a heading isn't allowed inside a button -->
              <span :class="['block font-bold', paymentMethod === 'cash' ? 'text-green-700' : 'text-gray-900']">
                Cash on Delivery
              </span>
              <span class="block text-xs sm:text-sm text-gray-500 mt-0.5">Pay when your order arrives at your doorstep</span>
            </div>
            <div
              :class="[
                'w-6 h-6 sm:w-7 sm:h-7 shrink-0 rounded-full flex items-center justify-center transition-all',
                paymentMethod === 'cash'
                  ? 'bg-green-600 text-white'
                  : 'border-2 border-gray-200',
              ]"
            >
              <i v-if="paymentMethod === 'cash'" class="fa-solid fa-check text-xs" aria-hidden="true"></i>
            </div>
          </button>

          <!-- Pay Online -->
          <button
            type="button"
            role="radio"
            :aria-checked="paymentMethod === 'online'"
            @click="emit('update:paymentMethod', 'online')"
            :class="[
              'w-full p-3 sm:p-5 rounded-xl border-2 transition-all flex items-center gap-3 sm:gap-4 group',
              paymentMethod === 'online'
                ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm'
                : 'border-gray-200 hover:border-green-200 hover:bg-gray-50',
            ]"
          >
            <div
              :class="[
                'w-11 h-11 sm:w-14 sm:h-14 shrink-0 rounded-xl flex items-center justify-center transition-all',
                paymentMethod === 'online'
                  ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30'
                  : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200',
              ]"
            >
              <i class="fa-solid fa-credit-card text-xl" aria-hidden="true"></i>
            </div>

            <div class="flex-1 min-w-0 text-left">
              <span :class="['block font-bold', paymentMethod === 'online' ? 'text-green-700' : 'text-gray-900']">
                Pay Online
              </span>
              <span class="block text-xs sm:text-sm text-gray-500 mt-0.5">Secure payment with Credit/Debit Card via Stripe</span>

              <span class="flex flex-wrap items-center gap-2 mt-2">
                <span class="rounded border border-blue-200 bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-blue-700">VISA</span>
                <span class="rounded border border-blue-200 bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-blue-700">Mastercard</span>
                <span class="rounded border border-blue-200 bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-blue-700">AMEX</span>
              </span>
            </div>

            <!-- Check mark -->
            <div
              :class="[
                'w-6 h-6 sm:w-7 sm:h-7 shrink-0 rounded-full flex items-center justify-center transition-all',
                paymentMethod === 'online'
                  ? 'bg-green-600 text-white'
                  : 'border-2 border-gray-200',
              ]"
            >
              <i v-if="paymentMethod === 'online'" class="fa-solid fa-check text-xs" aria-hidden="true"></i>
            </div>
          </button>

        </div>

        <div class="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 mt-4">
          <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <i class="fa-solid fa-shield-halved text-green-600" aria-hidden="true"></i>
          </div>
          <div>
            <p class="text-sm font-medium text-green-800">Secure & Encrypted</p>
            <p class="text-xs text-green-600 mt-0.5">Your payment info is protected with 256-bit SSL encryption</p>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>