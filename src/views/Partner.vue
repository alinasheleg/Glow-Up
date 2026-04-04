<template>
  <div class="min-h-screen bg-gray-100 p-8">

    <div class="max-w-7xl mx-auto">

      <!-- Заголовок -->
      <div class="flex justify-between items-center mb-10">
        <div>
          <h1 class="text-4xl font-bold">Кабинет партнёра</h1>
          <p class="text-gray-500 mt-2">Управление товарами и аналитикой</p>
        </div>

        <button
          @click="showForm = !showForm"
          class="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl shadow-md"
        >
          Добавить товар
        </button>
      </div>

      <!-- Статистика -->
      <div class="grid md:grid-cols-4 gap-6 mb-10">

        <div class="bg-white p-6 rounded-2xl shadow-md">
          <p class="text-gray-500">Всего товаров</p>
          <h2 class="text-3xl font-bold mt-2">{{ products.length }}</h2>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-md">
          <p class="text-gray-500">Категорий</p>
          <h2 class="text-3xl font-bold mt-2">{{ uniqueCategories }}</h2>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-md">
          <p class="text-gray-500">Средняя цена</p>
          <h2 class="text-3xl font-bold mt-2">{{ averagePrice }} ₸</h2>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-md">
          <p class="text-gray-500">Активных товаров</p>
          <h2 class="text-3xl font-bold mt-2">{{ products.length }}</h2>
        </div>

      </div>

      <!-- Поиск и фильтр -->
      <div class="flex gap-4 mb-8">
        <input
          v-model="search"
          placeholder="Поиск товара..."
          class="flex-1 px-4 py-3 rounded-xl border"
        />

        <select
          v-model="selectedCategory"
          class="px-4 py-3 rounded-xl border"
        >
          <option value="">Все категории</option>
          <option v-for="cat in categories" :key="cat">{{ cat }}</option>
        </select>
      </div>

      <!-- Форма -->
      <div v-if="showForm" class="bg-white rounded-2xl shadow-md p-8 mb-10">

        <h2 class="text-2xl font-semibold mb-6">Добавление товара</h2>

        <div class="grid md:grid-cols-2 gap-5">

          <input v-model="newProduct.name" placeholder="Название" class="px-4 py-3 border rounded-xl" />
          <input v-model="newProduct.price" placeholder="Цена" type="number" class="px-4 py-3 border rounded-xl" />
          <input v-model="newProduct.category" placeholder="Категория" class="px-4 py-3 border rounded-xl" />
          <input v-model="newProduct.image" placeholder="Ссылка на фото" class="px-4 py-3 border rounded-xl" />

        </div>

        <textarea
          v-model="newProduct.description"
          rows="4"
          placeholder="Описание товара"
          class="w-full mt-5 px-4 py-3 border rounded-xl"
        ></textarea>

        <button
          @click="addProduct"
          class="mt-5 bg-pink-500 text-white px-6 py-3 rounded-xl"
        >
          Сохранить
        </button>

      </div>

      <!-- Список товаров -->
      <div class="grid md:grid-cols-3 gap-6">

        <div
          v-for="(product, index) in filteredProducts"
          :key="index"
          class="bg-white rounded-2xl shadow-md p-4"
        >

          <img
            :src="product.image"
            class="w-full h-52 object-cover rounded-xl mb-4"
          />

          <h3 class="text-xl font-semibold">{{ product.name }}</h3>

          <p class="text-gray-500 text-sm mb-2">{{ product.description }}</p>

          <p class="font-bold text-pink-600 mb-2">{{ product.price }} ₸</p>

          <p class="text-sm text-gray-400 mb-4">{{ product.category }}</p>

          <div class="flex gap-3">

            <button
              @click="editProduct(index)"
              class="flex-1 bg-yellow-400 text-white py-2 rounded-xl"
            >
              Изменить
            </button>

            <button
              @click="deleteProduct(index)"
              class="flex-1 bg-red-500 text-white py-2 rounded-xl"
            >
              Удалить
            </button>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'Partner',

  data() {
    return {
      showForm: false,
      search: '',
      selectedCategory: '',

      newProduct: {
        name: '',
        price: '',
        category: '',
        description: '',
        image: ''
      },

      products: JSON.parse(localStorage.getItem('partnerProducts') || '[]')
    }
  },

  computed: {
    categories() {
      return [...new Set(this.products.map(p => p.category))]
    },

    uniqueCategories() {
      return this.categories.length
    },

    averagePrice() {
      if (!this.products.length) return 0
      return Math.round(
        this.products.reduce((sum, p) => sum + Number(p.price), 0) / this.products.length
      )
    },

    filteredProducts() {
      return this.products.filter(product => {
        return (
          product.name.toLowerCase().includes(this.search.toLowerCase()) &&
          (this.selectedCategory === '' || product.category === this.selectedCategory)
        )
      })
    }
  },

  methods: {
    addProduct() {
      if (!this.newProduct.name) return

      this.products.push({ ...this.newProduct })

      localStorage.setItem('partnerProducts', JSON.stringify(this.products))

      this.newProduct = {
        name: '',
        price: '',
        category: '',
        description: '',
        image: ''
      }

      this.showForm = false
    },

    deleteProduct(index) {
      this.products.splice(index, 1)
      localStorage.setItem('partnerProducts', JSON.stringify(this.products))
    },

    editProduct(index) {
      this.newProduct = { ...this.products[index] }
      this.products.splice(index, 1)
      this.showForm = true
    }
  }
}
</script>