<template>
  <div class="min-h-screen bg-pink-50 p-8">
    <div class="max-w-7xl mx-auto">

      <!-- HEADER -->
      <div class="flex justify-between items-center mb-6">

        <h1 class="text-4xl font-bold text-gray-800">
          Кабинет партнёра
        </h1>

        <div class="flex gap-4">

          <button
            @click="loadOrders"
            class="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-xl shadow-md"
          >
            Заказы
          </button>

          <button
            @click="openAddForm"
            class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-md"
          >
            Добавить товар
          </button>

        </div>
      </div>

      <!-- 📊 STATISTICS PANEL -->
      <div class="grid md:grid-cols-4 gap-4 mb-10">

        <div class="bg-white p-5 rounded-2xl shadow">
          <p class="text-gray-400 text-sm">Товары</p>
          <p class="text-2xl font-bold text-purple-600">
            {{ products.length }}
          </p>
        </div>

        <div class="bg-white p-5 rounded-2xl shadow">
          <p class="text-gray-400 text-sm">Заказы</p>
          <p class="text-2xl font-bold text-pink-600">
            {{ orders.length }}
          </p>
        </div>

        <div class="bg-white p-5 rounded-2xl shadow">
          <p class="text-gray-400 text-sm">Сумма заказов</p>
          <p class="text-2xl font-bold text-rose-500">
            {{ totalOrdersSum }} ₸
          </p>
        </div>

        <div class="bg-white p-5 rounded-2xl shadow">
          <p class="text-gray-400 text-sm">Средняя цена</p>
          <p class="text-2xl font-bold text-indigo-500">
            {{ averagePrice }} ₸
          </p>
        </div>

      </div>

      <!-- ORDERS -->
      <div v-if="showOrders" class="bg-white p-6 rounded-2xl shadow mb-10">

        <div class="flex justify-between mb-4">
          <h2 class="text-2xl font-bold">Заказы</h2>
          <button @click="showOrders = false" class="text-red-500 font-bold">
            Закрыть
          </button>
        </div>

        <div v-if="orders.length === 0" class="text-gray-400">
          Заказов нет
        </div>

        <div v-else class="space-y-2">
          <div v-for="(o, i) in orders" :key="i" class="border p-3 rounded-xl">
            <p><b>Товар:</b> {{ o.productName }}</p>
            <p><b>Цена:</b> {{ o.finalPrice }} ₸</p>
          </div>
        </div>
      </div>

      <!-- FORM -->
      <div v-if="showForm" class="bg-white p-8 rounded-2xl shadow mb-10">

        <h2 class="text-2xl font-semibold mb-6">
          {{ isEditMode ? 'Редактировать товар' : 'Добавить товар' }}
        </h2>

        <div class="grid md:grid-cols-2 gap-4">

          <input v-model="form.name" placeholder="Название" class="border px-4 py-3 rounded-xl" />

          <input v-model="form.price" type="number" placeholder="Цена партнёра" class="border px-4 py-3 rounded-xl" />

          <select v-model="form.category" class="border px-4 py-3 rounded-xl">
            <option disabled value="">Выберите категорию</option>
            <option>Уход за кожей</option>
            <option>Макияж</option>
            <option>Парфюмерия</option>
            <option>Уход за волосами</option>
            <option>Для тела</option>
            <option>Для мужчин</option>
          </select>

          <!-- ФОТО -->
          <div class="border px-4 py-3 rounded-xl flex items-center justify-between">

            <input
              ref="fileInput"
              type="file"
              multiple
              accept="image/*"
              @change="handleImages"
              class="hidden"
            />

            <button
              type="button"
              @click="$refs.fileInput.click()"
              class="bg-purple-500 text-white px-4 py-2 rounded-xl shadow"
            >
              Добавить фото
            </button>

            <span class="text-sm font-medium text-pink-600">
              {{ form.images.length }}
            </span>

          </div>

        </div>

        <p class="text-purple-600 font-medium mt-4">
          Наценка: {{ markup }}%
        </p>

        <p class="text-pink-600 font-bold">
          Итоговая цена: {{ getFinalPrice(form.price) }} ₸
        </p>

        <textarea
          v-model="form.description"
          placeholder="Описание"
          class="w-full mt-4 border px-4 py-3 rounded-xl"
        ></textarea>

        <button
          @click="saveProduct"
          class="mt-4 bg-pink-500 text-white px-6 py-3 rounded-xl"
        >
          Сохранить
        </button>

      </div>

      <!-- PRODUCTS -->
      <div class="grid md:grid-cols-3 gap-6">

        <div
          v-for="(p, i) in products"
          :key="i"
          class="bg-white rounded-2xl shadow p-4"
        >

          <div class="grid grid-cols-2 gap-2">
            <img
              v-for="(img, index) in p.images"
              :key="index"
              :src="img"
              class="h-28 w-full object-cover rounded-xl"
            />
          </div>

          <h3 class="text-xl font-semibold mt-3">{{ p.name }}</h3>
          <p class="text-gray-500 text-sm">{{ p.description }}</p>
          <p class="text-gray-400 text-sm">{{ p.category }}</p>

          <p class="text-gray-500 text-sm mt-2">
            Цена: {{ p.price }} ₸
          </p>

          <p class="text-pink-600 font-bold">
            Итог: {{ getFinalPrice(p.price) }} ₸
          </p>

          <div class="flex gap-2 mt-3">

            <button @click="editProduct(i)" class="bg-yellow-400 flex-1 py-2 rounded-xl">
              Изм.
            </button>

            <button @click="deleteProduct(i)" class="bg-red-500 text-white flex-1 py-2 rounded-xl">
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
  name: "Partner",

  data() {
    return {
      showForm: false,
      showOrders: false,
      isEditMode: false,
      editIndex: null,

      markup: 10,

      orders: JSON.parse(localStorage.getItem("orders") || "[]"),
      products: JSON.parse(localStorage.getItem("products") || "[]"),

      form: {
        name: "",
        price: "",
        category: "",
        description: "",
        images: []
      }
    };
  },

  computed: {

    totalOrdersSum() {
      return this.orders.reduce((sum, o) => sum + Number(o.finalPrice || 0), 0);
    },

    averagePrice() {
      if (this.products.length === 0) return 0;
      const total = this.products.reduce((sum, p) => sum + Number(p.price || 0), 0);
      return Math.round(total / this.products.length);
    }

  },

  methods: {

    getFinalPrice(price) {
      return Math.round(Number(price || 0) * (1 + this.markup / 100));
    },

    openAddForm() {
      this.showForm = true;
      this.isEditMode = false;
      this.editIndex = null;

      this.form = {
        name: "",
        price: "",
        category: "",
        description: "",
        images: []
      };
    },

    loadOrders() {
      this.orders = JSON.parse(localStorage.getItem("orders") || "[]");
      this.showOrders = !this.showOrders;
    },

    editProduct(i) {
      this.showForm = true;
      this.isEditMode = true;
      this.editIndex = i;
      this.form = JSON.parse(JSON.stringify(this.products[i]));
    },

    saveProduct() {
      if (this.isEditMode) {
        this.products.splice(this.editIndex, 1, JSON.parse(JSON.stringify(this.form)));
      } else {
        this.products.push(JSON.parse(JSON.stringify(this.form)));
      }

      localStorage.setItem("products", JSON.stringify(this.products));

      this.showForm = false;
      this.isEditMode = false;
      this.editIndex = null;
    },

    deleteProduct(i) {
      this.products.splice(i, 1);
      localStorage.setItem("products", JSON.stringify(this.products));
    },

    handleImages(event) {
      const files = Array.from(event.target.files);

      files.forEach(file => {
        const reader = new FileReader();

        reader.onload = (e) => {
          this.form.images.push(e.target.result);
        };

        reader.readAsDataURL(file);
      });

      this.$refs.fileInput.value = "";
    }

  }
};
</script>