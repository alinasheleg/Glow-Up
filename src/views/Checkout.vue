<template>
  <div class="min-h-screen bg-gray-50">
    <section class="max-w-7xl mx-auto px-4 py-12">
      <!-- Навигация -->
      <div class="mb-6 flex items-center gap-2 text-sm">
        <router-link to="/cart" class="text-gray-600 hover:text-pink-600">Корзина</router-link>
        <span class="text-gray-400">→</span>
        <span class="text-pink-600 font-medium">Оформление заказа</span>
      </div>

      <!-- Заголовок -->
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8">🛍️ Оформление заказа</h1>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Левая колонка -->
        <div class="lg:col-span-2 space-y-6">

          <!-- Контактные данные -->
          <div class="bg-white rounded-xl p-6 shadow-md">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
              <span>👤</span> Контактные данные
            </h2>

            <div class="space-y-4">
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Имя *</label>
                  <input v-model="orderForm.firstName" type="text" required placeholder="Ваше имя"
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Фамилия *</label>
                  <input v-model="orderForm.lastName" type="text" required placeholder="Ваша фамилия"
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Телефон *</label>
                <input v-model="orderForm.phone" type="tel" required placeholder="+7 (___) ___-__-__"
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input v-model="orderForm.email" type="email" required placeholder="example@email.com"
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" />
                <p class="text-xs text-gray-500 mt-1">На этот email придет подтверждение заказа</p>
              </div>
            </div>
          </div>

          <!-- Способ доставки -->
          <div class="bg-white rounded-xl p-6 shadow-md">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">🚚 Выберите способ доставки</h2>

            <div class="grid md:grid-cols-2 gap-8">
              <label
                v-for="option in deliveryOptions"
                :key="option.id"
                class="cursor-pointer bg-white p-6 rounded-xl shadow transition relative border-2"
                :class="orderForm.delivery === option.id ? 'border-pink-400 ring-2 ring-pink-100' : 'border-transparent hover:border-gray-200'"
              >
                <input
                  type="radio"
                  class="absolute opacity-0"
                  name="delivery"
                  :value="option.id"
                  v-model="orderForm.delivery"
                />
                <div class="flex items-start gap-4 mb-4">
                  <span class="text-4xl">{{ option.icon }}</span>
                  <div>
                    <h3 class="text-xl font-bold">{{ option.title }}</h3>
                    <p class="text-gray-600">{{ option.subtitle }}</p>
                  </div>
                </div>

                <ul class="text-gray-700 mb-4 space-y-1">
                  <li v-for="(line, i) in option.details" :key="i">{{ line }}</li>
                </ul>

                <div class="bg-pink-50 text-gray-800 rounded-lg p-3 text-sm leading-relaxed">
                  <div v-for="(note, i) in option.notes" :key="i">✓ {{ note }}</div>
                </div>
              </label>
            </div>

            <div v-if="selectedDelivery" class="mt-10 p-4 bg-pink-50 rounded-lg text-gray-800 text-center">
              <p class="text-lg">
                Вы выбрали: <span class="font-bold text-pink-600">{{ selectedDelivery.title }}</span> 💗
              </p>
            </div>
          </div>

          <!-- Адрес доставки -->
          <div v-if="orderForm.delivery !== 'pickup'" class="bg-white rounded-xl p-6 shadow-md">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
              <span>📍</span> Адрес доставки
            </h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Город *</label>
                <input v-model="orderForm.city" type="text" placeholder="Введите город"
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Адрес *</label>
                <input v-model="orderForm.street" type="text" placeholder="Улица, дом, квартира"
                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" />
              </div>
            </div>
          </div>

          <!-- Способ оплаты -->
          <div class="bg-white rounded-xl p-6 shadow-md">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
              <span>💳</span> Способ оплаты
            </h2>
            <div class="space-y-3">
              <label v-for="payment in paymentMethods" :key="payment.id"
                     class="flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition"
                     :class="orderForm.payment === payment.id ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-pink-300'">
                <input v-model="orderForm.payment" type="radio" :value="payment.id" class="mt-1" />
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

          <!-- Кнопка -->
          <button @click="submitOrder"
                  class="w-full bg-pink-600 text-white py-4 rounded-lg hover:bg-pink-700 transition font-bold text-lg">
            Подтвердить заказ
          </button>
        </div>

        <!-- Правая колонка -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl p-6 shadow-md sticky top-24">
            <h2 class="text-xl font-bold mb-4">Ваш заказ</h2>
            <p class="text-gray-600 text-sm mb-4">Корзина пуста. Добавьте товары, чтобы оформить заказ.</p>

            <button @click="$router.push('/catalog')"
                    class="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition font-medium">
              Перейти в каталог
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Checkout",
  data() {
    return {
      orderForm: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        delivery: null,
        city: '',
        street: '',
        payment: 'card'
      },
      deliveryOptions: [
        {
          id: 'courier',
          icon: '🚛',
          title: 'Курьерская доставка',
          subtitle: 'Доставка по Астане и Алматы',
          details: [
            '⏱ Срок: 1–2 дня',
            '💰 Стоимость: 1500 ₸',
            '🎁 Бесплатно от 15 000 ₸',
            '🕒 Время: с 10:00 до 20:00'
          ],
          notes: [
            'Курьер свяжется за час до доставки',
            'Оплата наличными или картой',
            'Можно примерить перед оплатой'
          ]
        },
        {
          id: 'pickup',
          icon: '🏬',
          title: 'Пункты выдачи',
          subtitle: 'Самовывоз из пунктов CDEK',
          details: [
            '⏱ Срок: 2–5 дней',
            '💰 Стоимость: 800 ₸',
            '🎁 Бесплатно от 10 000 ₸',
            '📍 Пункты: 150+ по Казахстану'
          ],
          notes: [
            'Хранение 5 дней бесплатно',
            'SMS уведомление о прибытии',
            'Удобный график работы'
          ]
        },
        {
          id: 'locker',
          icon: '📦',
          title: 'Постаматы',
          subtitle: 'Круглосуточная выдача заказов',
          details: [
            '⏱ Срок: 2–5 дней',
            '💰 Стоимость: 1000 ₸',
            '🎁 Бесплатно от 15 000 ₸',
            '📍 Доступ: 24/7'
          ],
          notes: [
            'Получение в любое время суток',
            'Быстрая выдача за 2 минуты',
            'Хранение 3 дня бесплатно'
          ]
        },
        {
          id: 'store',
          icon: '🛍️',
          title: 'Самовывоз из магазина',
          subtitle: 'Забрать из нашего магазина',
          details: [
            '⏱ Срок: в день заказа',
            '💰 Стоимость: бесплатно',
            '📍 Адрес: г. Астана, ул. Кабанбай батыра 1',
            '🕒 Время: Пн–Вс 10:00–21:00'
          ],
          notes: [
            'Готовность заказа в течение 2 часов',
            'Консультация продавца',
            'Возможность обмена на месте'
          ]
        }
      ],
      paymentMethods: [
        { id: 'card', name: 'Карта онлайн', icon: '💳', description: 'Visa / Mastercard' },
        { id: 'cash', name: 'Наличными', icon: '💵', description: 'Оплата при получении' }
      ]
    }
  },
  computed: {
    selectedDelivery() {
      return this.deliveryOptions.find(opt => opt.id === this.orderForm.delivery)
    }
  },
  methods: {
    submitOrder() {
      if (!this.orderForm.firstName || !this.orderForm.phone || !this.orderForm.email) {
        alert('Пожалуйста, заполните обязательные поля.');
        return;
      }
      alert('✅ Заказ успешно оформлен!');
      this.$router.push('/profile');
    }
  }
}
</script>

<style scoped>
input[type='radio']:focus + div {
  outline: none;
}
</style>
