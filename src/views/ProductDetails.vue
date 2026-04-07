<template>
  <div class="min-h-screen bg-white px-6 py-10">
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

      <div class="bg-gray-100 rounded-2xl h-96 flex items-center justify-center text-8xl">
        {{ product.image }}
      </div>

      <div>
        <h1 class="text-4xl font-bold mb-4">{{ product.name }}</h1>
        <p class="text-gray-500 text-lg mb-4">{{ product.brand }}</p>

        <div class="text-pink-600 text-3xl font-bold mb-6">
          {{ product.price }} ₸
        </div>

        <p class="text-gray-700 mb-6">
          {{ product.description }}
        </p>

        <button
          @click="addToCart"
          class="bg-pink-600 text-white px-8 py-4 rounded-xl"
        >
          В корзину
        </button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {}
    }
  },
  mounted() {
    const products = [
      {
        id: 1,
        name: 'Крем для лица',
        brand: 'La Roche-Posay',
        price: 4500,
        image: '🧴',
        description: 'Увлажняющий крем для ежедневного ухода'
      },
      {
        id: 2,
        name: 'Помада',
        brand: 'Maybelline',
        price: 3500,
        image: '💄',
        description: 'Стойкая помада с насыщенным цветом'
      },
      {
        id: 3,
        name: 'Парфюм Bloom',
        brand: 'Gucci',
        price: 12000,
        image: '🌸',
        description: 'Легкий цветочный аромат'
      }
    ]

    this.product = products.find(
      p => p.id == this.$route.params.id
    )
  },
  methods: {
    addToCart() {
      let cart = JSON.parse(localStorage.getItem('cart')) || []
      cart.push(this.product)
      localStorage.setItem('cart', JSON.stringify(cart))
      alert('Добавлено в корзину')
    }
  }
}
</script>