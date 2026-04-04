<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">

    <!-- Баннер -->
    <Banner />

    <!-- Категории -->
    <Categories />

    <!-- Секция "Популярные товары" -->
    <section class="max-w-7xl mx-auto px-4 py-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Популярные товары</h2>
      <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="product in products" :key="product.id" class="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col">
          <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover rounded-lg mb-3"/>
          <h3 class="font-semibold text-gray-900">{{ product.name }}</h3>
          <p class="text-gray-600 flex-grow">{{ product.description }}</p>
          <div class="flex justify-between items-center mt-2">
            <span class="text-pink-600 font-bold">{{ product.price }} ₸</span>
            <button @click="addToCart(product)" class="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-xl">В корзину</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Промо и бренды -->
    <PromoSection />

  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Banner from '../components/Banner.vue'
import Categories from '../components/Categories.vue'
import PromoSection from '../components/PromoSection.vue'
import Sales from './Sales.vue'
import New from './New.vue'
import Footer from '../components/Footer.vue'
import Payment from './Payment.vue'
import Profile from './Profile.vue'
import About from './About.vue'
import CategoryBodycare from './CategoryBodycare.vue'
import CategoryHaircare from './CategoryHaircare.vue'
import CategoryMakeup from './CategoryMakeup.vue'
import CategoryMen from './CategoryMen.vue'
import CategoryPerfume from './CategoryPerfume.vue'
import CategorySkincare from './CategorySkincare.vue'


export default {
  name: 'Home',
  components: {
    Header,
    Banner,
    Categories,
    Sales,
    New,
    Payment,
    Profile,
    About,
    CategoryBodycare,
    CategoryHaircare,
    CategoryMakeup,
    CategoryMen,
    CategorySkincare,
    CategoryPerfume,
    PromoSection,

    Footer
  },
  data() {
    return {
      cartCount: 0,
      products: [
        { id: 1, name: 'Матовая помада Velvet Kiss', description: 'Нежная текстура, стойкость до 8 часов.', price: 2490, image: 'https://source.unsplash.com/400x400/?lipstick,makeup', category: 'makeup' },
        { id: 2, name: 'Увлажняющий крем Glow Skin', description: 'С натуральными маслами и витамином Е.', price: 3290, image: 'https://source.unsplash.com/400x400/?cream,cosmetics', category: 'skincare' },
        { id: 3, name: 'Тушь для ресниц Volume Lash', description: 'Придает объем и длину, не осыпается.', price: 2790, image: 'https://source.unsplash.com/400x400/?mascara,makeup', category: 'makeup' },
        { id: 4, name: 'Тональный крем Natural Fit', description: 'Легкая формула, подходит для всех типов кожи.', price: 3590, image: 'https://source.unsplash.com/400x400/?foundation,makeup', category: 'makeup' },
        { id: 5, name: 'Палетка теней Rose Mood', description: '6 оттенков для дневного и вечернего макияжа.', price: 4590, image: 'https://source.unsplash.com/400x400/?eyeshadow,makeup', category: 'makeup' },
        { id: 6, name: 'Блеск для губ Shine Glow', description: 'Создает эффект влажных губ и ухаживает за ними.', price: 1990, image: 'https://source.unsplash.com/400x400/?lipgloss,cosmetics', category: 'makeup' },
      ]
    }
  },
  methods: {
    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const exists = cart.find(p => p.id === product.id)
      if (!exists) {
        cart.push(product)
        localStorage.setItem('cart', JSON.stringify(cart))
        this.cartCount = cart.length
        alert(`${product.name} добавлен в корзину!`)
      } else {
        alert('Этот товар уже в корзине!')
      }
    },
  }
}
</script>