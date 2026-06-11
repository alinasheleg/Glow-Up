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
          class="px-5 py-2 rounded-full border"
          :class="selectedCategory === category ? 'bg-pink-600 text-white' : 'bg-white'"
        >
          {{ category }}
        </button>
      </div>

      <!-- Товары -->
      <div class="grid md:grid-cols-4 gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded-2xl shadow p-4 hover:shadow-lg cursor-pointer"
        >
          <router-link :to="`/product/${product.id}`">
            <div class="h-56 bg-gray-100 rounded-xl flex items-center justify-center text-5xl">
              {{ product.title }}
            </div>

            <h2 class="font-bold text-lg mt-4">{{ product.name }}</h2>
            <p class="text-gray-500">{{ product.brand }}</p>
          </router-link>

          <div class="flex justify-between items-center mt-4">
            <span class="text-pink-600 font-bold text-xl">{{ product.price }} ₸</span>

            <button
              @click="addToCart(product)"
              class="bg-pink-600 text-white px-4 py-2 rounded-lg"
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
  data() {
    return {
      selectedCategory: 'Все',
      categories: [
        'Все',
        'Уход',
        'Косметика',
        'Парфюм',
        'Волосы',
        'Для тела'
      ],
      products: []
    }
  },

  computed: {
    filteredProducts() {
      if (this.selectedCategory === 'Все') return this.products

      return this.products.filter(p =>
        p.category === this.selectedCategory
      )
    }
  },

  methods: {
    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || []
      cart.push(product)
      localStorage.setItem('cart', JSON.stringify(cart))
      alert('Добавлено в корзину')
    }
  },

  async mounted() {
    try {
      console.log('LOAD PRODUCTS...')

      const response = await axios.get('http://127.0.0.1:8000/api/products')

      console.log('API RESPONSE:', response.data)

      this.products = response.data.map(product => ({
        id: product.id,
        name: product.title,
        brand: product.brand,
        category: product.category ?? 'Все',
        price: product.price,
        image: product.image
      }))
    } catch (error) {
      console.error('Ошибка загрузки товаров:', error)
    }
  }
}

</script>