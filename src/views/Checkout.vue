<template>
  <div class="min-h-screen bg-gray-50">
 
    
    <section class="max-w-7xl mx-auto px-4 py-12">
      <!-- Breadcrumbs -->
      <div class="mb-6 flex items-center gap-2 text-sm">
        <router-link to="/cart" class="text-gray-600 hover:text-pink-600">
          {{ $t('checkout.cart') }}
        </router-link>
        <span class="text-gray-400">→</span>
        <span class="text-pink-600 font-medium">
          {{ $t('checkout.title') }}
        </span>
      </div>

      <!-- Заголовок -->
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
        🛍️ {{ $t('checkout.title') }}
      </h1>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Левая колонка - Форма -->
        <div class="lg:col-span-2 space-y-6">

          <!-- Контактные данные -->
          <div class="bg-white rounded-xl p-6 shadow-md">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
              <span>👤</span> {{ $t('checkout.contact') }}
            </h2>

            <div class="space-y-4">
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ $t('checkout.firstName') }} *
                  </label>
                  <input 
                    v-model="orderForm.firstName"
                    type="text"
                    required
                    :placeholder="$t('checkout.firstNamePlaceholder')"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ $t('checkout.lastName') }} *
                  </label>
                  <input 
                    v-model="orderForm.lastName"
                    type="text"
                    required
                    :placeholder="$t('checkout.lastNamePlaceholder')"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ $t('checkout.phone') }} *
                </label>
                <input 
                  v-model="orderForm.phone"
                  type="tel"
                  required
                  :placeholder="$t('checkout.phonePlaceholder')"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ $t('checkout.email') }} *
                </label>
                <input 
                  v-model="orderForm.email"
                  type="email"
                  required
                  placeholder="example@email.com"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                />
                <p class="text-xs text-gray-500 mt-1">
                  {{ $t('checkout.emailHint') }}
                </p>
              </div>
            </div>
          </div>

          <!-- Способ доставки -->
          <div class="bg-white rounded-xl p-6 shadow-md">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
              <span>🚚</span> {{ $t('checkout.delivery') }}
            </h2>

            <div class="space-y-3">
              <label 
                v-for="delivery in deliveryMethods" 
                :key="delivery.id"
                class="flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition"
                :class="orderForm.delivery === delivery.id ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-pink-300'"
              >
                <input 
                  v-model="orderForm.delivery"
                  type="radio"
                  :value="delivery.id"
                  class="mt-1"
                />
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-semibold">{{ delivery.name }}</span>
                    <span class="text-pink-600 font-bold">{{ delivery.price }} ₸</span>
                  </div>
                  <p class="text-sm text-gray-600">{{ delivery.description }}</p>
                  <p class="text-xs text-gray-500 mt-1">
                    {{ $t('checkout.term') }}: {{ delivery.time }}
                  </p>
                </div>
              </label>
            </div>
          </div>

          <!-- Адрес доставки -->
          <div v-if="orderForm.delivery !== 'pickup'" class="bg-white rounded-xl p-6 shadow-md">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
              <span>📍</span> {{ $t('checkout.address') }}
            </h2>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ $t('checkout.city') }} *
                </label>
                <select 
                  v-model="orderForm.city"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                >
                  <option value="">{{ $t('checkout.selectCity') }}</option>
                  <option value="astana">Астана</option>
                  <option value="almaty">Алматы</option>
                  <option value="shymkent">Шымкент</option>
                  <option value="karaganda">Караганда</option>
                  <option value="aktobe">Актобе</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ $t('checkout.street') }} *
                </label>
                <input 
                  v-model="orderForm.street"
                  type="text"
                  required
                  :placeholder="$t('checkout.streetPlaceholder')"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>

          <!-- Оплата -->
          <div class="bg-white rounded-xl p-6 shadow-md">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
              <span>💳</span> {{ $t('checkout.payment') }}
            </h2>

            <div class="space-y-3">
              <label 
                v-for="payment in paymentMethods" 
                :key="payment.id"
                class="flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition"
                :class="orderForm.payment === payment.id ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-pink-300'"
              >
                <input 
                  v-model="orderForm.payment"
                  type="radio"
                  :value="payment.id"
                  class="mt-1"
                />
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-xl">{{ payment.icon }}</span>
                    <span class="font-semibold">{{ payment.name }}</span>
                  </div>
                  <p class="text-sm text-gray-600">{{ payment.description }}</p>
                </div>
              </label>
            </div>
          </div>

          <!-- Промокод -->
          <div class="bg-white rounded-xl p-6 shadow-md">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
              <span>🎟️</span> {{ $t('checkout.promo') }}
            </h2>

            <div class="flex gap-3">
              <input 
                v-model="promoCode"
                type="text"
                :placeholder="$t('checkout.promoPlaceholder')"
                class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
              />
              <button 
                @click="applyPromoCode"
                class="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition font-medium"
              >
                {{ $t('checkout.apply') }}
              </button>
            </div>

            <p v-if="promoApplied" class="text-green-600 text-sm mt-2">
              ✓ {{ $t('checkout.promoApplied') }}
            </p>
          </div>

        </div>

        <!-- Правая колонка -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl p-6 shadow-md sticky top-24">
            <h2 class="text-xl font-bold mb-4">
              {{ $t('checkout.summary') }}
            </h2>

            <button 
              @click="submitOrder"
              class="w-full bg-pink-600 text-white py-4 rounded-lg hover:bg-pink-700 transition font-bold text-lg mb-4"
            >
              {{ $t('checkout.submit') }}
            </button>
          </div>
        </div>
      </div>
    </section>
    
 
  </div>
</template>

<script>
export default {
  name: 'Checkout',

  data() {
    return {
      orderForm: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        delivery: 'courier',
        city: '',
        zip: '',
        street: '',
        house: '',
        apartment: '',
        entrance: '',
        comment: '',
        payment: 'card'
      },

      promoCode: '',
      promoApplied: false,

      cartItems: [],

      deliveryMethods: [
        { id: 'courier', name: 'Курьерская доставка', price: 1500, description: 'Доставка по городу', time: '1-2 дня' },
        { id: 'pickup', name: 'Пункты выдачи', price: 800, description: 'Самовывоз из пункта CDEK', time: '2-5 дней' },
        { id: 'post', name: 'Постамат', price: 1000, description: 'Круглосуточная выдача', time: '2-5 дней' },
        { id: 'store', name: 'Самовывоз из магазина', price: 0, description: 'Бесплатно', time: 'в день заказа' }
      ],

      paymentMethods: [
        { id: 'card', name: 'Банковская карта', icon: '💳', description: 'Visa, Mastercard, МИР' },
        { id: 'kaspi', name: 'Kaspi QR', icon: '🏦', description: 'Оплата через Kaspi' },
        { id: 'cash', name: 'Наличными', icon: '💵', description: 'При получении заказа' },
        { id: 'wallet', name: 'Электронный кошелек', icon: '📱', description: 'СБП, ЮMoney' }
      ]
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
      const method = this.deliveryMethods.find(
        d => d.id === this.orderForm.delivery
      )

      return method ? (this.subtotal >= 15000 ? 0 : method.price) : 0
    },

    discount() {
      return this.promoApplied ? Math.round(this.subtotal * 0.1) : 0
    },

    total() {
      return this.subtotal + this.deliveryCost - this.discount
    },

    totalItems() {
      return this.cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      )
    }
  },

  methods: {
    applyPromoCode() {
      if (this.promoCode.toLowerCase() === 'glowup10') {
        this.promoApplied = true
      } else {
        alert('Неверный промокод')
      }
    },

    submitOrder() {
      if (!this.orderForm.firstName || !this.orderForm.phone || !this.orderForm.email) {
        alert('Заполните обязательные поля')
        return
      }

      alert(`Заказ оформлен!
Сумма: ${this.total} ₸
Способ доставки: ${this.orderForm.delivery}
Способ оплаты: ${this.orderForm.payment}`)

      localStorage.removeItem('cart')

      this.$router.push('/profile')
    }
  }
}
</script>