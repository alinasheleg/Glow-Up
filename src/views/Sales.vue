<template>
  <div class="min-h-screen bg-gray-50">
  
    
    <section class="max-w-7xl mx-auto px-4 py-12">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">🔥 Акции</h1>
      <p class="text-gray-600 mb-8">Скидки до 50% на популярные товары</p>
      <div v-if="loading" class="text-center text-gray-400 py-10">
        Загрузка...
      </div>

      <div v-else-if="!promotions.length" class="text-center text-gray-500">
        Акций пока нет
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div
          v-for="promo in promotions"
          :key="promo.id"
          class="relative bg-white rounded-2xl shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-xl"
        >

          <!-- БЕЙДЖ СКИДКИ -->
          <div class="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            -{{ promo.discount }}%
          </div>

          <!-- КАРТИНКА -->
          <div class="h-48 overflow-hidden">
            <img
              :src="promo.image || 'default-promo.jpg'"
              class="w-full h-full object-cover hover:scale-105 transition duration-300"
            />
          </div>

          <!-- КОНТЕНТ -->
          <div class="p-5">

            <h3 class="text-lg font-bold text-gray-900">
              {{ promo.title }}
            </h3>

            <p class="text-gray-500 text-sm mt-2 line-clamp-2">
              {{ promo.description }}
            </p>

            <!-- ПОДСВЕТКА СКИДКИ -->
            <div class="mt-4 flex items-center justify-between">

              <span class="text-pink-600 font-extrabold text-lg">
                -{{ promo.discount }}%
              </span>

              <button class="bg-pink-600 hover:bg-pink-700 text-white text-sm px-4 py-2 rounded-lg transition">
                Смотреть
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
    
    
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Sales',
  components: {
    Header,
    Footer
  },

  data() {
    return {
      promotions: [],
      loading: true
    }
  },

  async mounted() {
    await this.fetchPromotions()
  },

  methods: {
    async fetchPromotions() {
      try {
        const res = await fetch('http://127.0.0.1:8001/api/promotions')
        this.promotions = await res.json()
      } catch (e) {
        console.error('Ошибка загрузки акций', e)
      } finally {
        this.loading = false
      }
    },
    
  },
  
}
</script>