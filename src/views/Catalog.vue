<template>
  <div class="min-h-screen bg-pink-50 px-6 py-10">
    <div class="max-w-7xl mx-auto">

      <h1 class="text-4xl font-bold mb-8">
        {{ $t('catalog.title') }}
      </h1>

      <!-- ПОИСК -->
      <div class="mb-6">
        <input
          v-model="search"
          type="text"
          :placeholder="$t('home.searchPlaceholder')"
          class="w-full px-5 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <!-- Категории -->
      <div class="flex gap-3 flex-wrap mb-8">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          class="px-5 py-2 rounded-full border transition"
          :class="selectedCategory === category ? 'bg-pink-600 text-white' : 'bg-white'"
        >
          {{ category }}
        </button>
      </div>

      <!-- Загрузка -->
      <div v-if="loading" class="text-center py-20 text-gray-400">
        <p class="text-xl">{{ $t('catalog.loading') }}</p>
      </div>

      <!-- Пусто -->
      <div v-else-if="filteredProducts.length === 0" class="text-center py-20 text-gray-400">
        <p class="text-xl">{{ $t('catalog.empty') }}</p>
      </div>

      <!-- Товары -->
      <div v-else class="grid md:grid-cols-4 gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="relative bg-white rounded-2xl shadow p-4 hover:shadow-lg cursor-pointer"
        > 
          <router-link :to="`/product/${product.id}`">
            <div v-if="product.discount > 0" class="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
              SALE
            </div>
            <!-- Картинка -->
            <div class="h-56 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
              <img
                v-if="product.image"
                :src="`http://127.0.0.1:8001/storage/${product.image}`"
                class="w-full h-full object-cover"
                :alt="product.name"
              />
              <span v-else class="text-gray-300 text-5xl">🛍️</span>
            </div>

            <h2 class="font-bold text-lg mt-4">{{ product.name }}</h2>
            <p class="text-gray-500 text-sm">{{ product.brand }}</p>
            <p class="text-gray-400 text-xs">{{ product.category }}</p>
          </router-link>

          <div class="flex justify-between items-center mt-4">
            <div class="flex flex-col">

              <!-- старая цена -->
              <span v-if="product.discount > 0" class="text-gray-400 line-through text-sm">
                {{ product.price }} ₸
              </span>

              <!-- новая цена -->
              <span class="text-pink-600 font-bold text-xl">
                {{ product.final_price }} ₸
              </span>

              <!-- скидка -->
              <span v-if="product.discount > 0" class="text-green-500 text-xs font-bold">
                -{{ product.discount }}%
              </span>

            </div>

            <div class="flex gap-2">

              <!-- FAVORITE -->
              <button
                @click.stop="toggleFavorite(product)"
                class="w-10 h-10 rounded-lg border flex items-center justify-center transition"
                :class="product.is_favorite
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-white text-gray-400 border-gray-300'"
              >
                ♥
              </button>

              <!-- CART -->
              <button
                @click.stop="addToCart(product)"
                class="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
              >
                🛒
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
  name: 'Catalog',

  data() {
    return {
      search: '',
      selectedCategory: 'Все',
      categories: ['Все'],
      products: [],
      loading: true
    }
  },

  computed: {
    filteredProducts() {
      let items = this.products

      if (this.selectedCategory !== 'Все') {
        items = items.filter(p =>
          (p.category || '').toLowerCase() === this.selectedCategory.toLowerCase()
        )
      }

      if (this.search) {
        items = items.filter(p =>
          p.name.toLowerCase().includes(this.search.toLowerCase())
        )
      }

      return items
    }
  },

  methods: {

    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || []
      const exists = cart.find(item => item.id === product.id)

      if (exists) {
        exists.quantity = (exists.quantity || 1) + 1
      } else {
        cart.push({ ...product, quantity: 1 })
      }

      localStorage.setItem('cart', JSON.stringify(cart))
      alert(this.$t('catalog.addedToCart'))
    },

    async toggleFavorite(product) {
      try {
        const token = localStorage.getItem('token')

        if (!token) {
          alert(this.$t('catalog.loginRequired'))
          return
        }

        const res = await axios.post(
          `http://127.0.0.1:8001/api/favorites/${product.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        product.is_favorite = res.data.favorite

      } catch (e) {
        console.log(e)
      }
    }
  },

  async mounted() {
    try {

      const productsRes = await axios.get('http://127.0.0.1:8001/api/products')

      this.products = productsRes.data.map(p => ({
        id: p.id,
        name: p.title,
        brand: p.brand,
        category: p.category ?? 'Без категории',
        price: p.price,
        final_price: p.final_price,
        discount: p.discount,
        image: p.image,
        is_favorite: p.is_favorite ?? false
      }))

      const uniqueCategories = [
        ...new Set(
          this.products
            .map(p => p.category)
            .filter(Boolean)
        )
      ]
      this.categories = ['Все', ...uniqueCategories]

    } catch (error) {
      console.error('Ошибка загрузки:', error)
    } finally {
      this.loading = false
    }
  }
}
</script>