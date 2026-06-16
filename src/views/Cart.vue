<template>
  <div class="min-h-screen bg-gray-50">

    <section class="max-w-7xl mx-auto px-4 py-12">

      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
        🛒 {{ $t('cart.title') }}
      </h1>

      <!-- EMPTY CART -->
      <div v-if="cartItems.length === 0" class="bg-white rounded-xl p-12 text-center">

        <span class="text-6xl mb-4 block">🛍️</span>

        <h2 class="text-2xl font-bold mb-4">
          {{ $t('cart.emptyTitle') }}
        </h2>

        <p class="text-gray-600 mb-6">
          {{ $t('cart.emptyText') }}
        </p>

        <router-link to="/catalog">
          <button class="bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition font-medium">
            {{ $t('cart.goToCatalog') }}
          </button>
        </router-link>

      </div>

      <!-- CART ITEMS -->
      <div v-else class="grid lg:grid-cols-3 gap-6">

        <!-- ITEMS -->
        <div class="lg:col-span-2 space-y-4">

          <div
            v-for="item in cartItems"
            :key="item.id"
            class="bg-white rounded-xl p-6 shadow-md"
          >

            <div class="flex gap-4">

              <div class="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  v-if="item.image"
                  :src="item.image"
                  :alt="item.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-3xl">
                  🛍️
                </div>
              </div>

              <div class="flex-1">

                <h3 class="font-bold text-lg mb-1">{{ item.name }}</h3>
                <p class="text-sm text-gray-500 mb-2">{{ item.brand }}</p>

                <div class="flex items-center justify-between">

                  <!-- QUANTITY -->
                  <div class="flex items-center gap-3">

                    <button
                      @click="decreaseQuantity(item.id)"
                      class="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                    >
                      -
                    </button>

                    <span class="font-semibold">{{ item.quantity }}</span>

                    <button
                      @click="increaseQuantity(item.id)"
                      class="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                    >
                      +
                    </button>

                  </div>

                  <!-- PRICE -->
                  <div class="text-right">

                    <div class="text-xl font-bold text-pink-600">
                      {{ item.price * item.quantity }} {{ $t('product.currency') }}
                    </div>

                    <button
                      @click="removeItem(item.id)"
                      class="text-sm text-red-500 hover:text-red-700"
                    >
                      {{ $t('cart.remove') }}
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        <!-- SUMMARY -->
        <div class="lg:col-span-1">

          <div class="bg-white rounded-xl p-6 sticky top-24">

            <h3 class="font-bold text-xl mb-4">
              {{ $t('cart.summary') }}
            </h3>

            <div class="space-y-2 mb-4">

              <div class="flex justify-between">
                <span class="text-gray-600">
                  {{ $t('cart.items') }} ({{ totalItems }}):
                </span>
                <span class="font-semibold">
                  {{ subtotal }} {{ $t('product.currency') }}
                </span>
              </div>

              <div class="flex justify-between">
                <span class="text-gray-600">
                  {{ $t('cart.delivery') }}
                </span>
                <span class="font-semibold">
                  {{ deliveryCost }} {{ $t('product.currency') }}
                </span>
              </div>

            </div>

            <!-- PROMO -->
            <div class="mb-4">
              <input
                v-model="promoCode"
                type="text"
                :placeholder="$t('cart.promoPlaceholder')"
                class="w-full border rounded-lg px-3 py-2"
              >
            </div>

            <div class="border-t pt-4 mb-4">

              <div class="flex justify-between text-xl font-bold">

                <span>{{ $t('cart.total') }}:</span>

                <span class="text-pink-600">
                  {{ total }} {{ $t('product.currency') }}
                </span>

              </div>

            </div>

            <router-link to="/checkout">
              <button class="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition font-medium mb-3">
                {{ $t('cart.checkout') }}
              </button>
            </router-link>

            <router-link to="/catalog">
              <button class="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-medium">
                {{ $t('cart.continueShopping') }}
              </button>
            </router-link>

          </div>

        </div>

      </div>

    </section>

  </div>
</template>
<script>
export default {
  name: 'Cart',

  data() {
    return {
      cartItems: [],
      promoCode: ''
    }
  },

  mounted() {
    const cart = JSON.parse(localStorage.getItem('cart')) || []

    this.cartItems = cart.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }))
  },

  computed: {
    subtotal() {
      return this.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
    },

    deliveryCost() {
      return this.subtotal >= 15000 ? 0 : 1500
    },

    total() {
      return this.subtotal + this.deliveryCost
    },

    totalItems() {
      return this.cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      )
    }
  },

  methods: {
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cartItems))
    },

    increaseQuantity(id) {
      const item = this.cartItems.find(i => i.id === id)
      if (item) {
        item.quantity++
        this.saveCart()
      }
    },

    decreaseQuantity(id) {
      const item = this.cartItems.find(i => i.id === id)

      if (item && item.quantity > 1) {
        item.quantity--
        this.saveCart()
      }
    },

    removeItem(id) {
      this.cartItems = this.cartItems.filter(i => i.id !== id)
      this.saveCart()
    }
  }
}
</script>