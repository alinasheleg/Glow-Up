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

      <div class="max-w-6xl mx-auto px-6 py-4">
        <p class="text-sm text-gray-400">
          <router-link to="/" class="hover:text-pink-500">Главная</router-link>
          <span class="mx-2">/</span>
          <router-link to="/catalog" class="hover:text-pink-500">Каталог</router-link>
          <span class="mx-2">/</span>
          <span class="text-gray-600">{{ product?.title }}</span>
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
                {{ product?.title }}
              </h1>

              <!-- Цена -->
              <div class="flex items-center gap-4 mb-6">
                <span class="text-4xl font-bold text-pink-600">
                  {{ (product.price || 0).toLocaleString() }} ₸
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
      <!-- ОТЗЫВЫ -->
<div class="mt-16 max-w-6xl mx-auto px-6">

  <h2 class="text-2xl font-bold mb-4">
    Отзывы ({{ reviewStats?.count || 0 }})
  </h2>

  <!-- рейтинг -->
  <div v-if="reviewStats" class="mb-6 text-gray-600">
    Средняя оценка:
    <span class="font-bold text-pink-600">
      {{ reviewStats.avg || 0 }}
    </span>
  </div>

  <!-- форма -->
  <div v-if="isAuth" class="bg-white p-4 rounded-2xl shadow mb-6">

    <div class="flex gap-1 mb-3">
      <select v-model="newReview.rating" class="border rounded p-2">
        <option v-for="n in 5" :key="n" :value="n">
          {{ n }} ★
        </option>
      </select>
    </div>

    <textarea
      v-model="newReview.content"
      placeholder="Напишите отзыв..."
      class="w-full border rounded p-3 mb-3"
    ></textarea>

    <button
      @click="submitReview"
      class="bg-pink-600 text-white px-6 py-2 rounded-xl"
    >
      Отправить
    </button>

  </div>

  <!-- список -->
  <div v-if="reviewLoading" class="text-gray-400">
    Загрузка отзывов...
  </div>

  <div v-else>
    <div v-if="reviews.length === 0" class="text-gray-400">
      Пока нет отзывов
    </div>

    <div v-for="r in reviews" :key="r.id" class="bg-white p-4 rounded-2xl shadow mb-3">

      <div class="flex justify-between items-center mb-2">
        
        <div class="flex items-center gap-2">
          <span class="text-lg">👤</span>
          <span class="font-semibold">
            {{ r.user?.name || 'Пользователь' }}
          </span>
        </div>

        <div class="flex items-center gap-3">
          <span class="text-pink-600 font-semibold">
            {{ r.rating }} ★
          </span>

          <button
            v-if="r.user_id === currentUserId"
            @click="editReview(r)"
            class="text-gray-400 hover:text-pink-600 transition"
            title="Редактировать"
          >
            ✏️
          </button>
        </div>

      </div>

      <p class="text-gray-600">
        {{ r.content }}
      </p>
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
      reviews: [],
      reviewStats: null,
      reviewLoading: true,
      newReview: {
        rating: 5,
        content: ''
        },
      isAuth: false,
      currentUserId: null,
      edit: {
        id: null,
        rating: 5,
        content: ''
      }
    }
    
  },

  async mounted() {
    console.log('ID:', this.$route.params.id)
    this.isAuth = !!localStorage.getItem('token')
  try {
    const id = this.$route.params.id

    const response = await axios.get(`http://127.0.0.1:8001/api/products/${id}`)

    this.product = response.data

    if (localStorage.getItem('token')) {
      try {
        const me = await axios.get('/api/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        this.currentUserId = me.data.id
      } catch {}
    }

    await this.loadReviews()

  } catch (error) {
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
     async loadReviews() {
      try {
        const id = this.$route.params.id

        const res = await axios.get(
          `http://127.0.0.1:8001/api/products/${id}/reviews`
        )

        this.reviews = res.data.reviews
        this.reviewStats = {
          avg: res.data.avg_rating,
          count: res.data.count
        }

      } catch (e) {
        console.log('reviews error', e)
      } finally {
        this.reviewLoading = false
      }
    },

    async submitReview() {
      try {
        const id = this.$route.params.id

        await axios.post(
          `http://127.0.0.1:8001/api/products/${id}/reviews`,
          this.newReview,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )

        this.newReview = { rating: 5, content: '' }

        await this.loadReviews()

      } catch (e) {
        alert(e.response?.data?.message || 'Ошибка')
      }
    },
    async updateReview(reviewId, rating, content) {
      try {
        await axios.put(
          `http://127.0.0.1:8001/api/reviews/${reviewId}`,
          {
            rating,
            content
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )

        await this.loadReviews()

      } catch (e) {
        console.log(e)
        alert(e.response?.data?.message || 'Ошибка обновления')
      }
    },
    editReview(review) {
      const newContent = prompt('Редактировать отзыв:', review.content)
      if (newContent === null) return

      const newRating = parseInt(prompt('Рейтинг (1-5):', review.rating))

      if (!newRating || newRating < 1 || newRating > 5) {
        alert('Рейтинг должен быть от 1 до 5')
        return
      }

      this.updateReview(review.id, newRating, newContent)
    }
  },
}
</script>