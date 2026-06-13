<template>
  <div class="min-h-screen bg-gray-50">

    <Banner />

    <section class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-4 items-center justify-between">

        <div class="flex-1 w-full">
          <input
            v-model="search"
            type="text"
            placeholder="Поиск товаров..."
            class="w-full px-5 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <select v-model="sort" class="px-4 py-3 rounded-2xl border border-gray-300">
          <option value="default">Сортировка</option>
          <option value="cheap">Сначала дешевые</option>
          <option value="expensive">Сначала дорогие</option>
        </select>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 pb-12">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">

        <aside class="bg-white rounded-2xl shadow-md p-6 h-fit">
          <h2 class="text-2xl font-bold mb-6">Категории</h2>
          <div class="space-y-3">
            <button
              v-for="cat in categories"
              :key="cat"
              @click="selectedCategory = cat"
              class="w-full text-left px-4 py-3 rounded-xl transition"
              :class="selectedCategory === cat ? 'bg-pink-500 text-white' : 'bg-gray-100 hover:bg-pink-100'"
            >
              {{ cat }}
            </button>
          </div>
        </aside>

        <div class="lg:col-span-3">

          <div class="flex gap-3 mb-8 flex-wrap">
            <button
              class="px-5 py-2 rounded-xl"
              :class="filter==='all' ? 'bg-pink-500 text-white' : 'bg-white shadow'"
              @click="filter='all'"
            >
              Все
            </button>
            <button
              class="px-5 py-2 rounded-xl"
              :class="filter==='popular' ? 'bg-pink-500 text-white' : 'bg-white shadow'"
              @click="filter='popular'"
            >
              Популярные
            </button>
            <button
              class="px-5 py-2 rounded-xl"
              :class="filter==='new' ? 'bg-pink-500 text-white' : 'bg-white shadow'"
              @click="filter='new'"
            >
              Новинки
            </button>
          </div>

          <h3 class="text-2xl font-bold mb-6">Рекомендованные товары</h3>

          <div v-if="loading" class="text-center py-20 text-gray-400">
            <p class="text-xl">Загрузка товаров...</p>
          </div>

          <div v-else-if="filteredProducts.length === 0" class="text-center py-20 text-gray-400">
            <p class="text-xl">Товаров не найдено</p>
          </div>

          <div v-else class="grid md:grid-cols-3 gap-6">
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="bg-white rounded-2xl shadow p-4 hover:shadow-lg"
            >
              <router-link :to="`/product/${product.id}`">
                <div class="h-48 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                  <img
                    v-if="product.image"
                    :src="`http://127.0.0.1:8001/storage/${product.image}`"
                    class="w-full h-full object-cover"
                  />
                  <span v-else class="text-gray-300 text-5xl">🛍️</span>
                </div>
                <h2 class="font-bold text-lg mt-3">{{ product.name }}</h2>
                <p class="text-gray-400 text-sm">{{ product.brand }}</p>
                <p class="text-gray-400 text-xs">{{ product.category }}</p>
              </router-link>
              <div class="flex justify-between items-center mt-3">
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
    </section>

    <PromoSection />
  </div>
</template>

<script>
import axios from 'axios'
import Banner from '../components/Banner.vue'
import PromoSection from '../components/PromoSection.vue'

export default {
  name: 'Home',
  components: {
    Banner,
    PromoSection,
  },
  data() {
    return {
      search: '',
      sort: 'default',
      filter: 'all',
      selectedCategory: 'Все',
      loading: true,
      products: [],
      categories: ['Все'],
    }
  },

  computed: {
    filteredProducts() {
      let items = this.products

      if (this.selectedCategory !== 'Все') {
        items = items.filter(p => p.category === this.selectedCategory)
      }

      if (this.search) {
        items = items.filter(p =>
          p.name.toLowerCase().includes(this.search.toLowerCase())
        )
      }

      if (this.sort === 'cheap') {
        items = [...items].sort((a, b) => a.price - b.price)
      }

      if (this.sort === 'expensive') {
        items = [...items].sort((a, b) => b.price - a.price)
      }

      return items
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
},

  methods: {
    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const exists = cart.find(item => item.id === product.id)
      if (exists) {
        exists.quantity = (exists.quantity || 1) + 1
      } else {
        cart.push({ ...product, quantity: 1 })
      }
      localStorage.setItem('cart', JSON.stringify(cart))
      alert('Добавлено в корзину!')
    }
  }
}
</script>