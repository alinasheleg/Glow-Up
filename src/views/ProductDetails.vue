<template>
  <div class="min-h-screen bg-gray-50">

    <div v-if="loading" class="text-center py-40 text-gray-400">
      <p class="text-xl">Загрузка...</p>
    </div>

    <div v-else-if="!product" class="text-center py-40 text-gray-400">
      <p class="text-xl">Товар не найден</p>
      <router-link to="/catalog" class="text-pink-600 mt-4 block">← В каталог</router-link>
    </div>

    <div v-else>

      <!-- Хлебные крошки -->
      <div class="max-w-6xl mx-auto px-6 py-4">
        <p class="text-sm text-gray-400">
          <router-link to="/" class="hover:text-pink-500">Главная</router-link>
          <span class="mx-2">/</span>
          <router-link to="/catalog" class="hover:text-pink-500">Каталог</router-link>
          <span class="mx-2">/</span>
          <span class="text-gray-600">{{ product.title }}</span>
        </p>
      </div>

      <!-- Основной блок -->
      <div class="max-w-6xl mx-auto px-6 pb-16">
        <div class="grid md:grid-cols-2 gap-12">

          <!-- Левая: картинка -->
          <div>
            <div class="bg-white rounded-3xl shadow-md overflow-hidden aspect-square flex items-center justify-center">
              <img
                v-if="product.image"
                :src="`http://127.0.0.1:8001/storage/${product.image}`"
                class="w-full h-full object-cover"
              />
              <span v-else class="text-gray-200 text-9xl">🛍️</span>
            </div>
          </div>

          <!-- Правая: инфо -->
          <div class="flex flex-col justify-between">
            <div>

              <!-- Бейджи -->
              <div class="flex gap-2 mb-4">
                <span class="bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full">
                  {{ product.category }}
                </span>
                <span class="bg-purple-100 text-purple-600 text-xs font-semibold px-3 py-1 rounded-full">
                  {{ product.brand }}
                </span>
              </div>

              <!-- Название -->
              <h1 class="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {{ product.title }}
              </h1>

              <!-- Цена -->
              <div class="flex items-center gap-4 mb-6">
                <span class="text-4xl font-bold text-pink-600">
                  {{ product.price.toLocaleString() }} ₸
                </span>
              </div>

              <!-- Разделитель -->
              <div class="border-t border-gray-100 mb-6"></div>

              <!-- Описание -->
              <div class="mb-8">
                <h3 class="font-semibold text-gray-700 mb-2">Описание</h3>
                <p class="text-gray-500 leading-relaxed">
                  {{ product.description || 'Описание отсутствует' }}
                </p>
              </div>

              <!-- Характеристики -->
              <div class="bg-gray-50 rounded-2xl p-5 mb-8">
                <h3 class="font-semibold text-gray-700 mb-3">Характеристики</h3>
                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400">Бренд</span>
                    <span class="font-medium text-gray-700">{{ product.brand }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400">Категория</span>
                    <span class="font-medium text-gray-700">{{ product.category }}</span>
                  </div>
                </div>
              </div>

            </div>

            <!-- Кнопка -->
            <div class="flex gap-3">
              <button
                @click="toggleFavorite"
                class="w-16 rounded-2xl border text-2xl transition"
                :class="product.is_favorite
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-white text-gray-400 border-gray-300'"
              >
                ♥
              </button>
              <button
                @click="addToCart"
                class="flex-1 bg-pink-600 hover:bg-pink-700 text-white text-lg font-semibold py-4 rounded-2xl transition"
              >
                🛒 В корзину
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProductDetail',

  data() {
    return {
      product: null,
      loading: true,
    }
  },

  async mounted() {
    try {
      const id = this.$route.params.id

      const response = await axios.get(
        `http://127.0.0.1:8001/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )

      this.product = response.data

    } catch (error) {
      console.error('Ошибка загрузки товара:', error)
      this.product = null
    } finally {
      this.loading = false
    }
  },

  methods: {
    addToCart() {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const exists = cart.find(item => item.id === this.product.id)
      if (exists) {
        exists.quantity = (exists.quantity || 1) + 1
      } else {
        cart.push({ ...this.product, quantity: 1 })
      }
      localStorage.setItem('cart', JSON.stringify(cart))
      alert('Добавлено в корзину!')
    },
    async toggleFavorite() {
      try {
        await axios.post(
          `http://127.0.0.1:8001/api/favorites/${this.product.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )

        // просто переключаем UI (без второго запроса)
        this.product.is_favorite = !this.product.is_favorite

      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>