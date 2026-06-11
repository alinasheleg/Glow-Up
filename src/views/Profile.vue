<template>
  <div class="min-h-screen bg-gray-50">
    <section class="max-w-7xl mx-auto px-4 py-12">
      <!-- Если не авторизован -->
      <div v-if="!isLoggedIn" class="bg-white rounded-xl p-12 text-center shadow-md">
        <span class="text-6xl mb-4 block">👤</span>
        <h2 class="text-2xl font-bold mb-4">Войдите в аккаунт</h2>
        <p class="text-gray-600 mb-6">Для доступа к личному кабинету необходимо авторизоваться</p>
        <router-link to="/login">
          <button class="bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition font-medium">
            Войти
          </button>
        </router-link>
      </div>

      <!-- Если авторизован -->
      <div v-else>
        <!-- Заголовок и приветствие -->
        <div class="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold mb-2">Привет, {{ user.name }}! 👋</h1>
              <p class="text-lg opacity-90">Рады видеть вас снова</p>
            </div>
            <div class="hidden md:block">
              <div class="bg-white/20 backdrop-blur rounded-xl p-6 text-center">
                <div class="text-3xl font-bold">{{ user.bonuses }}</div>
                <div class="text-sm">бонусов</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Табы -->
        <div class="mb-6">
          <div class="flex flex-wrap gap-2 bg-white rounded-xl p-2 shadow-md">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="px-6 py-3 rounded-lg font-medium transition"
              :class="activeTab === tab.id ? 'bg-pink-600 text-white' : 'text-gray-700 hover:bg-gray-100'"
            >
              <span class="mr-2">{{ tab.icon }}</span>
              {{ tab.name }}
            </button>
          </div>
        </div>

        <!-- Контент табов -->
        <div class="bg-white rounded-xl shadow-md">

          <!-- Мои заказы -->
          <div v-if="activeTab === 'orders'" class="p-6">
            <h2 class="text-2xl font-bold mb-6">Мои заказы</h2>
            <div v-if="orders.length === 0" class="text-center py-12">
              <span class="text-6xl mb-4 block">📦</span>
              <p class="text-gray-600 mb-4">У вас пока нет заказов</p>
              <router-link to="/catalog">
                <button class="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition">
                  Перейти в каталог
                </button>
              </router-link>
            </div>
            <div v-else class="space-y-4">
              <div v-for="order in orders" :key="order.id" class="border rounded-xl p-6 hover:shadow-md transition">
                <div class="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <div class="flex items-center gap-3 mb-2">
                      <h3 class="font-bold text-lg">Заказ №{{ order.id }}</h3>
                      <span class="px-3 py-1 rounded-full text-xs font-bold" :class="getOrderStatusClass(order.status)">
                        {{ order.statusText }}
                      </span>
                    </div>
                    <p class="text-sm text-gray-500">{{ order.date }}</p>
                  </div>
                  <div class="text-right mt-3 md:mt-0">
                    <div class="text-2xl font-bold text-pink-600">{{ order.total }} ₸</div>
                    <p class="text-sm text-gray-500">{{ order.itemsCount }} товара</p>
                  </div>
                </div>
                <div class="space-y-3 mb-4">
                  <div v-for="item in order.items" :key="item.id" class="flex gap-3">
                    <div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span class="text-2xl">{{ item.icon }}</span>
                    </div>
                    <div class="flex-1">
                      <h4 class="font-semibold text-sm">{{ item.name }}</h4>
                      <p class="text-xs text-gray-500">{{ item.brand }}</p>
                      <div class="flex justify-between items-center mt-1">
                        <span class="text-xs text-gray-600">{{ item.quantity }} шт</span>
                        <span class="font-bold text-sm">{{ item.price }} ₸</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Личные данные -->
          <div v-if="activeTab === 'profile'" class="p-6">
            <h2 class="text-2xl font-bold mb-6">Личные данные</h2>
            <form @submit.prevent="saveProfile" class="max-w-2xl space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Имя</label>
                  <input v-model="user.name" type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Фамилия</label>
                  <input v-model="user.lastName" type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input v-model="user.email" type="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                <input v-model="user.phone" type="tel" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Дата рождения</label>
                <input v-model="user.birthday" type="date" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none" />
                <p class="text-xs text-gray-500 mt-1">Получите подарок в день рождения 🎁</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Пол</label>
                <select v-model="user.gender" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none">
                  <option value="">Не указан</option>
                  <option value="male">Мужской</option>
                  <option value="female">Женский</option>
                </select>
              </div>
              <button type="submit" class="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition font-medium">
                Сохранить изменения
              </button>
            </form>
          </div>

          <!-- Адреса доставки -->
          <div v-if="activeTab === 'addresses'" class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold">Адреса доставки</h2>
              <button @click="openCreateAddress" class="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition font-medium">
                + Добавить адрес
              </button>
            </div>
            <div v-if="addresses.length === 0" class="text-center py-12">
              <span class="text-6xl mb-4 block">📍</span>
              <p class="text-gray-600 mb-4">У вас пока нет сохраненных адресов</p>
            </div>
            <div v-else class="grid md:grid-cols-2 gap-4">
              <div v-for="address in addresses" :key="address.id" class="border rounded-xl p-6 hover:shadow-md transition">
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <h3 class="font-bold mb-1">{{ address.title }}</h3>
                    <span v-if="address.is_default" class="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full font-medium">Основной</span>
                  </div>
                  <button class="text-gray-400 hover:text-red-500" @click="deleteAddress(address.id)">
                    <span class="text-xl">🗑️</span>
                  </button>
                </div>
                <p class="text-sm text-gray-700">
                  {{ address.city }}, {{ address.street }}, {{ address.house }}
                  <span v-if="address.apartment">, кв. {{ address.apartment }}</span>
                </p>
                <p v-if="address.comment" class="text-xs text-gray-500 mt-1">{{ address.comment }}</p>
                <button class="text-sm text-pink-600 hover:text-pink-700 mt-3" @click="openEditAddress(address)">Редактировать</button>
              </div>
            </div>
            <!-- MODAL ADDRESS -->
            <div v-if="showAddressForm" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div class="bg-white p-6 rounded-xl w-full max-w-lg">
                <h2 class="text-xl font-bold mb-4">{{ mode === 'edit' ? 'Редактирование адреса' : 'Новый адрес' }}</h2>
                <div class="space-y-3">
                  <input v-model="formAddress.title" placeholder="Название" class="w-full border p-2 rounded">
                  <input v-model="formAddress.city" placeholder="Город" class="w-full border p-2 rounded">
                  <input v-model="formAddress.street" placeholder="Улица" class="w-full border p-2 rounded">
                  <input v-model="formAddress.house" placeholder="Дом" class="w-full border p-2 rounded">
                  <input v-model="formAddress.apartment" placeholder="Квартира" class="w-full border p-2 rounded">
                  <textarea v-model="formAddress.comment" placeholder="Комментарий" class="w-full border p-2 rounded"></textarea>
                </div>
                <div class="flex justify-end gap-2 mt-4">
                  <button @click="closeAddressForm" class="px-4 py-2 bg-gray-200 rounded">Отмена</button>
                  <button @click="saveAddress" class="px-4 py-2 bg-pink-600 text-white rounded">Сохранить</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Бонусы -->
          <div v-if="activeTab === 'bonuses'" class="p-6">
            <h2 class="text-2xl font-bold mb-6">Бонусная программа</h2>
            <div class="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white mb-6">
              <div class="text-center">
                <div class="text-5xl font-bold mb-2">{{ user.bonuses }}</div>
                <p class="text-lg mb-4">доступных бонусов</p>
                <p class="text-sm opacity-90">1 бонус = 1 ₸</p>
              </div>
            </div>
            <div class="grid md:grid-cols-3 gap-4 mb-6">
              <div class="bg-pink-50 rounded-xl p-6 text-center">
                <div class="text-3xl mb-2">💳</div>
                <div class="text-2xl font-bold text-gray-900">5%</div>
                <p class="text-sm text-gray-600">Кэшбэк с покупок</p>
              </div>
              <div class="bg-purple-50 rounded-xl p-6 text-center">
                <div class="text-3xl mb-2">🎁</div>
                <div class="text-2xl font-bold text-gray-900">30%</div>
                <p class="text-sm text-gray-600">Можно оплатить</p>
              </div>
              <div class="bg-pink-50 rounded-xl p-6 text-center">
                <div class="text-3xl mb-2">⏰</div>
                <div class="text-2xl font-bold text-gray-900">365</div>
                <p class="text-sm text-gray-600">дней срок</p>
              </div>
            </div>
            <div class="border-t pt-6">
              <h3 class="font-bold mb-4">История бонусов</h3>
              <div class="space-y-3">
                <div v-for="bonus in bonusHistory" :key="bonus.id" class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p class="font-medium">{{ bonus.description }}</p>
                    <p class="text-xs text-gray-500">{{ bonus.date }}</p>
                  </div>
                  <div class="font-bold" :class="bonus.type === 'earned' ? 'text-green-600' : 'text-red-600'">
                    {{ bonus.type === 'earned' ? '+' : '-' }}{{ bonus.amount }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Настройки -->
          <div v-if="activeTab === 'settings'" class="p-6">
            <h2 class="text-2xl font-bold mb-6">Настройки</h2>
            <div class="max-w-2xl space-y-6">
              <div class="border-b pb-6">
                <h3 class="font-bold mb-4">Уведомления</h3>
                <div class="space-y-3">
                  <label class="flex items-center justify-between cursor-pointer">
                    <span>Email уведомления о заказах</span>
                    <input type="checkbox" checked class="w-5 h-5 text-pink-600 rounded">
                  </label>
                  <label class="flex items-center justify-between cursor-pointer">
                    <span>SMS уведомления о доставке</span>
                    <input type="checkbox" checked class="w-5 h-5 text-pink-600 rounded">
                  </label>
                  <label class="flex items-center justify-between cursor-pointer">
                    <span>Рассылка о новинках и акциях</span>
                    <input type="checkbox" class="w-5 h-5 text-pink-600 rounded">
                  </label>
                </div>
              </div>
              <div class="border-b pb-6">
                <h3 class="font-bold mb-4">Безопасность</h3>
                <button @click="showPasswordModal = true" class="w-full text-left px-4 py-3 border rounded-lg hover:bg-gray-50 transition">
                  Изменить пароль
                </button>
              </div>
              <div>
                <button @click="logout" class="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-medium">
                  Выйти из аккаунта
                </button>
              </div>
            </div>
          </div>

          <!-- Кабинет партнёра -->
          <div v-if="activeTab === 'partner'" class="p-6">

            <!-- HEADER -->
            <div class="flex justify-between items-center mb-6">
              <h1 class="text-3xl font-bold text-gray-800">Кабинет партнёра</h1>
              <div class="flex gap-4">
                <button
                  @click="loadPartnerOrders"
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

            <!-- СТАТИСТИКА -->
            <div class="grid md:grid-cols-4 gap-4 mb-8">
              <div class="bg-white border p-5 rounded-2xl shadow">
                <p class="text-gray-400 text-sm">Товары</p>
                <p class="text-2xl font-bold text-purple-600">{{ partnerProducts.length }}</p>
              </div>
              <div class="bg-white border p-5 rounded-2xl shadow">
                <p class="text-gray-400 text-sm">Заказы</p>
                <p class="text-2xl font-bold text-pink-600">{{ partnerOrders.length }}</p>
              </div>
              <div class="bg-white border p-5 rounded-2xl shadow">
                <p class="text-gray-400 text-sm">Сумма заказов</p>
                <p class="text-2xl font-bold text-rose-500">{{ partnerTotalOrdersSum }} ₸</p>
              </div>
              <div class="bg-white border p-5 rounded-2xl shadow">
                <p class="text-gray-400 text-sm">Средняя цена</p>
                <p class="text-2xl font-bold text-indigo-500">{{ partnerAveragePrice }} ₸</p>
              </div>
            </div>

            <!-- ЗАКАЗЫ -->
            <div v-if="showPartnerOrders" class="bg-gray-50 border p-6 rounded-2xl mb-8">
              <div class="flex justify-between mb-4">
                <h2 class="text-2xl font-bold">Заказы</h2>
                <button @click="showPartnerOrders = false" class="text-red-500 font-bold">Закрыть</button>
              </div>
              <div v-if="partnerOrders.length === 0" class="text-gray-400">Заказов нет</div>
              <div v-else class="space-y-2">
                <div v-for="(o, i) in partnerOrders" :key="i" class="border p-3 rounded-xl bg-white">
                  <p><b>Товар:</b> {{ o.productName }}</p>
                  <p><b>Цена:</b> {{ o.finalPrice }} ₸</p>
                </div>
              </div>
            </div>

            <!-- ФОРМА ДОБАВЛЕНИЯ/РЕДАКТИРОВАНИЯ -->
            <div v-if="showPartnerForm" class="bg-gray-50 border p-8 rounded-2xl mb-8">
              <h2 class="text-2xl font-semibold mb-6">
                {{ isEditMode ? 'Редактировать товар' : 'Добавить товар' }}
              </h2>
              <div class="grid md:grid-cols-2 gap-4">
                <input v-model="partnerForm.name" placeholder="Название" class="border px-4 py-3 rounded-xl bg-white" />
          
                <input v-model="partnerForm.price" type="number" placeholder="Цена партнёра" class="border px-4 py-3 rounded-xl bg-white" />
                <select v-model="partnerForm.category" class="border px-4 py-3 rounded-xl bg-white">
                  <option disabled value="">Выберите категорию</option>
                  <option>Уход за кожей</option>
                  <option>Макияж</option>
                  <option>Парфюмерия</option>
                  <option>Уход за волосами</option>
                  <option>Для тела</option>
                  <option>Для мужчин</option>
                </select>
                <div class="border px-4 py-3 rounded-xl bg-white flex items-center justify-between">
                  <input
                    ref="fileInput"
                    type="file"
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
                    {{ partnerFormFile ? '1 фото выбрано' : 'Нет фото' }}
                  </span>
                </div>
              </div>
              <p class="text-purple-600 font-medium mt-4">Наценка: {{ markup }}%</p>
              <p class="text-pink-600 font-bold">Итоговая цена: {{ getFinalPrice(partnerForm.price) }} ₸</p>
              <textarea
                v-model="partnerForm.description"
                placeholder="Описание"
                class="w-full mt-4 border px-4 py-3 rounded-xl bg-white"
              ></textarea>

              <!-- Превью фото -->
              <div v-if="partnerForm.imagePreview" class="mt-4">
                <img :src="partnerForm.imagePreview" class="h-32 rounded-xl object-cover" />
              </div>

              <div class="flex gap-3 mt-4">
                <button
                  @click="savePartnerProduct"
                  :disabled="savingProduct"
                  class="bg-pink-500 text-white px-6 py-3 rounded-xl disabled:opacity-50"
                >
                  {{ savingProduct ? 'Сохранение...' : 'Сохранить' }}
                </button>
                <button
                  @click="showPartnerForm = false"
                  class="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl"
                >
                  Отмена
                </button>
              </div>
            </div>

            <!-- ТОВАРЫ -->
            <div v-if="partnerProducts.length === 0" class="text-center py-12 text-gray-400">
              <p class="text-xl">Товаров пока нет</p>
              <p class="text-sm mt-2">Нажмите «Добавить товар» чтобы добавить первый</p>
            </div>
            <div v-else class="grid md:grid-cols-3 gap-6">
              <div v-for="(p, i) in partnerProducts" :key="i" class="bg-gray-50 border rounded-2xl shadow p-4">
                <div class="h-40 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center mb-3">
                  <img
                    v-if="p.image"
                    :src="`http://127.0.0.1:8001/storage/${p.image}`"
                    class="w-full h-full object-cover"
                  />
                  <span v-else class="text-gray-300 text-4xl">🛍️</span>
                </div>
                <h3 class="text-xl font-semibold">{{ p.name }}</h3>
                <p class="text-gray-500 text-sm">{{ p.description }}</p>
                <p class="text-gray-400 text-sm">{{ p.category }}</p>
                <p class="text-gray-400 text-sm">{{ p.brand }}</p>
                <p class="text-gray-500 text-sm mt-2">Цена: {{ p.price }} ₸</p>
                <p class="text-pink-600 font-bold">Итог: {{ getFinalPrice(p.price) }} ₸</p>
                <div class="flex gap-2 mt-3">
                  <button @click="editPartnerProduct(p, i)" class="bg-blue-500 text-white flex-1 py-2 rounded-xl">Редактировать</button>
                  <button @click="deletePartnerProduct(p.id, i)" class="bg-red-500 text-white flex-1 py-2 rounded-xl">Удалить</button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>

    <!-- MODAL PASSWORD -->
    <div v-if="showPasswordModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Изменить пароль</h2>
        <div class="space-y-3">
          <input v-model="passwordForm.current_password" type="password" placeholder="Текущий пароль" class="w-full border p-2 rounded">
          <input v-model="passwordForm.new_password" type="password" placeholder="Новый пароль" class="w-full border p-2 rounded">
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <button @click="showPasswordModal = false" class="px-4 py-2 bg-gray-200 rounded">Отмена</button>
          <button @click="changePassword" class="px-4 py-2 bg-pink-600 text-white rounded">Сохранить</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import api from '@/api/axios'

export default {
  name: 'Profile',

  data() {
    return {
      isLoggedIn: false,
      activeTab: 'orders',
      showAddressForm: false,
      mode: 'create',

      tabs: [
        { id: 'orders', name: 'Заказы', icon: '📦' },
        { id: 'profile', name: 'Профиль', icon: '👤' },
        { id: 'addresses', name: 'Адреса', icon: '📍' },
        { id: 'bonuses', name: 'Бонусы', icon: '🎁' },
        { id: 'settings', name: 'Настройки', icon: '⚙️' },
      ],

      isPartner: false,

      user: {
        name: '',
        lastName: '',
        email: '',
        phone: '',
        birthday: '',
        gender: '',
        bonuses: 0
      },

      formAddress: {
        id: null,
        title: '',
        city: '',
        street: '',
        house: '',
        apartment: '',
        comment: ''
      },

      editingId: null,
      orders: [],
      addresses: [],
      bonusHistory: [],
      showPasswordModal: false,
      passwordForm: {
        current_password: '',
        new_password: ''
      },

      // --- ПАРТНЁР ---
      markup: 10,
      showPartnerOrders: false,
      showPartnerForm: false,
      isEditMode: false,
      editIndex: null,
      savingProduct: false,
      partnerOrders: [],
      partnerProducts: [],
      partnerFormFile: null,
      partnerForm: {
        name: '',
        brand: '',
        price: '',
        category: '',
        description: '',
        imagePreview: null
      }
    }
  },

  computed: {
    partnerTotalOrdersSum() {
      return this.partnerOrders.reduce((sum, o) => sum + Number(o.finalPrice || 0), 0)
    },
    partnerAveragePrice() {
      if (this.partnerProducts.length === 0) return 0
      const total = this.partnerProducts.reduce((sum, p) => sum + Number(p.price || 0), 0)
      return Math.round(total / this.partnerProducts.length)
    }
  },

  async mounted() {
    const token = localStorage.getItem('token')
    const partnerAuth = localStorage.getItem('partnerAuth')

    // Если партнёр
    if (partnerAuth && !token) {
      const partner = JSON.parse(localStorage.getItem('partner') || '{}')
      this.user = {
        ...this.user,
        name: partner.name || 'Партнёр',
        email: partner.email || ''
      }
      this.isLoggedIn = true
      this.isPartner = true
      this.tabs = [
        { id: 'partner', name: 'Кабинет партнёра', icon: '🤝' },
        { id: 'settings', name: 'Настройки', icon: '⚙️' }
      ]
      this.activeTab = 'partner'

      // Загружаем товары партнёра с API
      await this.loadPartnerProducts()
      return
    }

    // Если обычный юзер
    if (!token) {
      this.$router.push('/login')
      return
    }

    try {
      const userResponse = await api.get('/me')
      this.user = { ...this.user, ...userResponse.data }
      this.isLoggedIn = true
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this.$router.push('/login')
      }
      if (error.response?.status === 403) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this.$router.push('/banned')
      }
    }

    this.isPartner = false

    try {
      const ordersResponse = await api.get('/orders')
      this.orders = ordersResponse.data
    } catch (e) { console.log(e) }

    try {
      const addressesResponse = await api.get('/addresses')
      const raw = addressesResponse.data
      const list = Array.isArray(raw) ? raw : raw?.data ?? []
      this.addresses = list.map(a => ({
        id: a.id, title: a.title, city: a.city,
        street: a.street, house: a.house,
        apartment: a.apartment, is_default: a.is_default, comment: a.comment
      }))
    } catch (e) { console.log(e) }

    try {
      const bonusesResponse = await api.get('/bonuses')
      this.user.bonuses = bonusesResponse.data.bonuses || 0
      this.bonusHistory = bonusesResponse.data.history || []
    } catch (e) { console.log(e) }
  },

  methods: {

    // --- ОБЫЧНЫЙ ЮЗЕР ---

    getOrderStatusClass(status) {
      const classes = {
        'delivered': 'bg-green-100 text-green-700',
        'processing': 'bg-blue-100 text-blue-700',
        'shipping': 'bg-yellow-100 text-yellow-700',
        'cancelled': 'bg-red-100 text-red-700'
      }
      return classes[status] || 'bg-gray-100 text-gray-700'
    },

    async saveProfile() {
      try {
        const response = await api.post('/user/update', {
          name: this.user.name,
          lastName: this.user.lastName,
          email: this.user.email,
          phone: this.user.phone,
          birthday: this.user.birthday,
          gender: this.user.gender
        })
        this.user = { ...this.user, ...response.data.user }
        alert('Профиль успешно сохранен!')
      } catch (error) {
        alert(JSON.stringify(error.response?.data))
      }
    },

    async logout() {
      if (!confirm('Вы действительно хотите выйти?')) return
      try {
        await api.post('/logout')
      } catch (error) {
        console.log(error)
      }
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('partnerAuth')
      localStorage.removeItem('partner')
      this.isLoggedIn = false
      this.$router.push('/login')
    },

    openCreateAddress() {
      this.mode = 'create'
      this.showAddressForm = true
      this.editingId = null
      this.formAddress = { id: null, title: '', city: '', street: '', house: '', apartment: '', comment: '' }
    },

    openEditAddress(address) {
      this.mode = 'edit'
      this.showAddressForm = true
      this.editingId = address.id
      this.formAddress = { ...address }
    },

    async saveAddress() {
      try {
        if (this.mode === 'create') {
          const res = await api.post('/addresses', this.formAddress)
          this.addresses.push(res.data)
        }
        if (this.mode === 'edit') {
          const res = await api.put(`/addresses/${this.editingId}`, this.formAddress)
          const index = this.addresses.findIndex(a => a.id === this.editingId)
          if (index !== -1) this.addresses[index] = res.data
        }
        this.closeAddressForm()
      } catch (e) {
        alert('Ошибка сохранения адреса')
      }
    },

    closeAddressForm() {
      this.showAddressForm = false
      this.mode = 'create'
      this.editingId = null
      this.formAddress = { id: null, title: '', city: '', street: '', house: '', apartment: '', comment: '' }
    },

    async deleteAddress(id) {
      if (!confirm('Удалить адрес?')) return
      try {
        await api.delete(`/addresses/${id}`)
        this.addresses = this.addresses.filter(a => a.id !== id)
      } catch (e) {
        alert(e.response?.data?.message || 'Ошибка удаления адреса')
      }
    },

    async changePassword() {
      try {
        const res = await api.post('/user/change-password', this.passwordForm)
        alert(res.data.message)
        this.showPasswordModal = false
        this.passwordForm = { current_password: '', new_password: '' }
      } catch (e) {
        alert(e.response?.data?.message || 'Ошибка смены пароля')
      }
    },

    // --- ПАРТНЁР ---

    getFinalPrice(price) {
      return Math.round(Number(price || 0) * (1 + this.markup / 100))
    },

    async loadPartnerProducts() {
      try {
        const partner = JSON.parse(localStorage.getItem('partner') || '{}')
        const response = await axios.get(
          `http://127.0.0.1:8001/api/partner/products?partner_id=${partner.id}`
        )
        this.partnerProducts = response.data.map(p => ({
          id: p.id,
          name: p.title,
          brand: p.brand,
          category: p.category,
          price: p.price,
          description: p.description,
          image: p.image
        }))
      } catch (e) {
        console.log('Ошибка загрузки товаров партнёра', e)
      }
    },

    loadPartnerOrders() {
      this.showPartnerOrders = !this.showPartnerOrders
    },

    openAddForm() {
      this.showPartnerForm = true
      this.isEditMode = false
      this.editIndex = null
      this.partnerFormFile = null
      this.partnerForm = {
        name: '',
        brand: '',
        price: '',
        category: '',
        description: '',
        imagePreview: null
      }
    },

    editPartnerProduct(product, index) {
  this.showPartnerForm = true
  this.isEditMode = true
  this.editIndex = index
  this.partnerFormFile = null
  this.partnerForm = {
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category,
    description: product.description,
    imagePreview: product.image ? `http://127.0.0.1:8001/storage/${product.image}` : null // ← вот это
  }
},

    async savePartnerProduct() {
      if (!this.partnerForm.name || !this.partnerForm.price || !this.partnerForm.category) {
        alert('Заполните название, цену и категорию')
        return
      }

      this.savingProduct = true

      try {
    const partner = JSON.parse(localStorage.getItem('partner') || '{}')

    const formData = new FormData()
    formData.append('title', this.partnerForm.name)
    formData.append('brand', partner.name)
    formData.append('category', this.partnerForm.category)
    formData.append('price', this.partnerForm.price)
    formData.append('description', this.partnerForm.description || '')
    formData.append('partner_id', partner.id)

    if (this.partnerFormFile) {
        formData.append('image', this.partnerFormFile)
    }

    if (this.isEditMode) {
        // РЕДАКТИРОВАНИЕ
        formData.append('_method', 'PUT')
        const response = await axios.post(
            `http://127.0.0.1:8001/api/partner/products/${this.partnerForm.id}`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        )
        const updated = response.data.product
        this.partnerProducts[this.editIndex] = {
            id: updated.id,
            name: updated.title,
            brand: updated.brand,
            category: updated.category,
            price: updated.price,
            description: updated.description,
            image: updated.image
        }
        this.partnerProducts = [...this.partnerProducts]
    } else {
        // СОЗДАНИЕ
        const response = await axios.post(
            'http://127.0.0.1:8001/api/partner/products',
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        )
        const newProduct = response.data.product
        this.partnerProducts.push({
            id: newProduct.id,
            name: newProduct.title,
            brand: newProduct.brand,
            category: newProduct.category,
            price: newProduct.price,
            description: newProduct.description,
            image: newProduct.image
        })
    }

    this.showPartnerForm = false
    this.partnerFormFile = null
    this.partnerForm = { name: '', brand: '', price: '', category: '', description: '', imagePreview: null }
    alert(this.isEditMode ? 'Товар обновлён!' : 'Товар добавлен!')

      } catch (e) {
        console.log(e)
        alert(e.response?.data?.message || 'Ошибка сохранения товара')
      } finally {
        this.savingProduct = false
      }
    },

    async deletePartnerProduct(productId, index) {
      if (!confirm('Удалить товар?')) return
      try {
        await axios.delete(`http://127.0.0.1:8001/api/partner/products/${productId}`)
        this.partnerProducts.splice(index, 1)
      } catch (e) {
        // если роута удаления нет — просто убираем локально
        this.partnerProducts.splice(index, 1)
      }
    },

    handleImages(event) {
      const file = event.target.files[0]
      if (!file) return

      this.partnerFormFile = file

      const reader = new FileReader()
      reader.onload = (e) => {
        this.partnerForm.imagePreview = e.target.result
      }
      reader.readAsDataURL(file)

      this.$refs.fileInput.value = ''
    }
  }
}
</script>