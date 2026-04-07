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
              {{ product.image }}
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
      products: [
        {
          id: 1,
          name: 'Крем для лица',
          brand: 'La Roche-Posay',
          category: 'Уход',
          price: 4500,
          image: '🧴'
        },
        {
          id: 2,
          name: 'Помада',
          brand: 'Maybelline',
          category: 'Косметика',
          price: 3500,
          image: '💄'
        },
        {
          id: 3,
          name: 'Парфюм Bloom',
          brand: 'Gucci',
          category: 'Парфюм',
          price: 12000,
          image: '🌸'
        }
      ]
    }
  },
  computed: {
    filteredProducts() {
      if (this.selectedCategory === 'Все') return this.products
      return this.products.filter(
        p => p.category === this.selectedCategory
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
  }
}
</script>