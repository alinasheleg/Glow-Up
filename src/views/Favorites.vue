<template>
  <div class="min-h-screen bg-gray-50 px-6 py-10">

    <h1 class="text-3xl font-bold mb-8">❤️ Избранное</h1>

    <div v-if="loading" class="text-gray-400 text-center">
      Загрузка...
    </div>

    <div v-else-if="products.length === 0" class="text-center text-gray-400">
      У вас пока нет избранных товаров
    </div>

    <div v-else class="grid md:grid-cols-4 gap-6">

      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition"
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

          <h2 class="font-bold text-lg mt-3">{{ product.title }}</h2>
          <p class="text-gray-400 text-sm">{{ product.brand }}</p>

        </router-link>

        <div class="flex justify-between items-center mt-3">
          <span class="text-pink-600 font-bold">
            {{ product.price }} ₸
          </span>

          <button
            @click="removeFromFavorites(product.id)"
            class="text-red-500 text-xl"
          >
            ♥
          </button>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Favorites',

  data() {
    return {
      products: [],
      loading: true
    }
  },

  async mounted() {
    await this.loadFavorites()
  },

  methods: {

    async loadFavorites() {
      try {
        const res = await axios.get(
          'http://127.0.0.1:8001/api/favorites',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )

        this.products = res.data

      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },

    async removeFromFavorites(id) {
      try {
        await axios.post(
          `http://127.0.0.1:8001/api/favorites/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )

        // мгновенно убираем из UI
        this.products = this.products.filter(p => p.id !== id)

      } catch (e) {
        console.log(e)
      }
    }

  }
}
</script>