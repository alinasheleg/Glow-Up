<template>
  <div class="min-h-screen bg-gray-50">

    <!-- Баннер -->
    <Banner />

    <!-- Верхняя панель -->
    <section class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-4 items-center justify-between">

        <!-- Поиск -->
        <div class="flex-1 w-full">
          <input
            v-model="search"
            type="text"
            placeholder="Поиск товаров..."
            class="w-full px-5 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <!-- Сортировка -->
        <select
          v-model="sort"
          class="px-4 py-3 rounded-2xl border border-gray-300"
        >
          <option value="default">Сортировка</option>
          <option value="cheap">Сначала дешевые</option>
          <option value="expensive">Сначала дорогие</option>
        </select>
      </div>
    </section>

    <!-- Основной блок -->
    <section class="max-w-7xl mx-auto px-4 pb-12">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">

        <!-- Левая колонка категории -->
        <aside class="bg-white rounded-2xl shadow-md p-6 h-fit">
          <h2 class="text-2xl font-bold mb-6">Категории</h2>

          <div class="space-y-3">
            <button
              v-for="cat in categories"
              :key="cat"
              @click="selectedCategory = cat"
              class="w-full text-left px-4 py-3 rounded-xl transition"
              :class="selectedCategory === cat
                ? 'bg-pink-500 text-white'
                : 'bg-gray-100 hover:bg-pink-100'"
            >
              {{ cat }}
            </button>
          </div>
        </aside>

        <!-- Правая колонка товары -->
        <div class="lg:col-span-3">

          <!-- Фильтр -->
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

          <!-- Товары -->
          <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col"
            >
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-52 object-cover rounded-xl mb-4"
              />

              <h3 class="font-semibold text-lg">{{ product.name }}</h3>

              <p class="text-gray-500 text-sm mb-3">
                {{ product.description }}
              </p>

              <div class="mt-auto flex justify-between items-center">
                <span class="text-pink-600 font-bold">{{ product.price }} ₸</span>

                <button
                  @click="addToCart(product)"
                  class="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-xl"
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
      search: '',
      sort: 'default',
      filter: 'all',
      selectedCategory: 'Все',

      categories: [
        'Все',
        'Уход за кожей',
        'Макияж',
        'Парфюмерия',
        'Уход за волосами',
        'Для тела',
        'Для мужчин'
      ],

      products: [
        {
          id: 1,
          name: 'Матовая помада',
          description: 'Стойкая текстура',
          price: 2490,
          category: 'Макияж',
          image: 'https://source.unsplash.com/400x400/?lipstick'
        },
        {
          id: 2,
          name: 'Крем для лица',
          description: 'Увлажнение кожи',
          price: 3290,
          category: 'Уход за кожей',
          image: 'https://source.unsplash.com/400x400/?cream'
        },
        {
          id: 3,
          name: 'Парфюм',
          description: 'Легкий аромат',
          price: 5990,
          category: 'Парфюмерия',
          image: 'https://source.unsplash.com/400x400/?perfume'
        }
      ]
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

  methods: {
    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]')
      cart.push(product)
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }
}
</script>