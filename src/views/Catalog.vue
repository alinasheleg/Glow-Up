<template>
  <div class="min-h-screen bg-pink-50 px-6 py-10">
    <div class="max-w-7xl mx-auto">

      <h1 class="text-4xl font-bold mb-8">Каталог товаров</h1>

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
        <p class="text-xl">Загрузка товаров...</p>
      </div>

      <!-- Пусто -->
      <div v-else-if="filteredProducts.length === 0" class="text-center py-20 text-gray-400">
        <p class="text-xl">Товаров не найдено</p>
      </div>

      <!-- Товары -->
      <div v-else class="grid md:grid-cols-4 gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded-2xl shadow p-4 hover:shadow-lg cursor-pointer"
        >
          <router-link :to="`/product/${product.id}`">
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
            <span class="text-pink-600 font-bold text-xl">{{ product.price }} ₸</span>
            <button
              @click="addToCart(product)"
              class="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
            >
              В корзину
            </button>
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
      selectedCategory: 'Все',
      categories: ['Все'],
      products: [],
      loading: true
    }
  },

  computed: {
    filteredProducts() {
      if (this.selectedCategory === 'Все') return this.products
      return this.products.filter(p => p.category === this.selectedCategory)
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
      alert('Добавлено в корзину!')
    }
  },

  async mounted() {
    try {
        const [productsRes, categoriesRes] = await Promise.all([
            axios.get('http://127.0.0.1:8001/api/products'),
            axios.get('http://127.0.0.1:8001/api/categories')
        ])
        this.products = productsRes.data.map(p => ({
            id: p.id,
            name: p.title,
            brand: p.brand,
            category: p.category,
            price: p.price,
            image: p.image,
            description: p.description
        }))
        this.categories = ['Все', ...categoriesRes.data.map(c => c.name)]
    } catch (error) {
        console.error('Ошибка загрузки:', error)
    } finally {
        this.loading = false
    }
}
}
</script>