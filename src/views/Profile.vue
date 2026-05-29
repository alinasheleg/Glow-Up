<template>
  <div class="min-h-screen bg-gray-50">
   
    
    <section class="max-w-7xl mx-auto px-4 py-12">
      <!-- Если не авторизован -->
      <div v-if="!isLoggedIn" class="bg-white rounded-xl p-12 text-center shadow-md">
        <span class="text-6xl mb-4 block">👤</span>
        <h2 class="text-2xl font-bold mb-4">Войдите в аккаунт</h2>
        <p class="text-gray-600 mb-6">
          Для доступа к личному кабинету необходимо авторизоваться
        </p>
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
              <div 
                v-for="order in orders" 
                :key="order.id"
                class="border rounded-xl p-6 hover:shadow-md transition"
              >
                <div class="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <div class="flex items-center gap-3 mb-2">
                      <h3 class="font-bold text-lg">Заказ №{{ order.id }}</h3>
                      <span 
                        class="px-3 py-1 rounded-full text-xs font-bold"
                        :class="getOrderStatusClass(order.status)"
                      >
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
                  <div 
                    v-for="item in order.items" 
                    :key="item.id"
                    class="flex gap-3"
                  >
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
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Имя
                  </label>
                  <input 
                    v-model="user.name"
                    type="text" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Фамилия
                  </label>
                  <input 
                    v-model="user.lastName"
                    type="text" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input 
                  v-model="user.email"
                  type="email" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Телефон
                </label>
                <input 
                  v-model="user.phone"
                  type="tel" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Дата рождения
                </label>
                <input 
                  v-model="user.birthday"
                  type="date" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                />
                <p class="text-xs text-gray-500 mt-1">Получите подарок в день рождения 🎁</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Пол
                </label>
                <select 
                  v-model="user.gender"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                >
                  <option value="">Не указан</option>
                  <option value="male">Мужской</option>
                  <option value="female">Женский</option>
                </select>
              </div>

              <button 
                type="submit"
                class="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition font-medium"
              >
                Сохранить изменения
              </button>
            </form>
          </div>

          <!-- Адреса доставки -->
          <div v-if="activeTab === 'addresses'" class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold">Адреса доставки</h2>
              <button 
                @click="showAddressForm = true"
                class="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition font-medium"
              >
                + Добавить адрес
              </button>
            </div>

            <div v-if="addresses.length === 0" class="text-center py-12">
              <span class="text-6xl mb-4 block">📍</span>
              <p class="text-gray-600 mb-4">У вас пока нет сохраненных адресов</p>
            </div>

            <div v-else class="grid md:grid-cols-2 gap-4">
              <div 
                v-for="address in addresses" 
                :key="address.id"
                class="border rounded-xl p-6 hover:shadow-md transition"
              >
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <h3 class="font-bold mb-1">{{ address.title }}</h3>
                    <span 
                      v-if="address.isDefault"
                      class="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full font-medium"
                    >
                      Основной
                    </span>
                  </div>
                  <button class="text-gray-400 hover:text-red-500">
                    🗑️
                  </button>
                </div>
                <p class="text-sm text-gray-700 mb-1">{{ address.city }}</p>
                <p class="text-sm text-gray-700">{{ address.street }}, {{ address.house }}</p>
                <p class="text-sm text-gray-500">{{ address.apartment ? `кв. ${address.apartment}` : '' }}</p>
                <button class="text-sm text-pink-600 hover:text-pink-700 mt-3">
                  Редактировать
                </button>
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
                <div 
                  v-for="bonus in bonusHistory" 
                  :key="bonus.id"
                  class="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p class="font-medium">{{ bonus.description }}</p>
                    <p class="text-xs text-gray-500">{{ bonus.date }}</p>
                  </div>
                  <div 
                    class="font-bold"
                    :class="bonus.type === 'earned' ? 'text-green-600' : 'text-red-600'"
                  >
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
                <button class="w-full text-left px-4 py-3 border rounded-lg hover:bg-gray-50 transition">
                  Изменить пароль
                </button>
              </div>

              <div>
                <button 
                  @click="logout"
                  class="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-medium"
                >
                  Выйти из аккаунта
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    

  </div>
</template>

<script>

import api from '@/api/axios'

export default {
  name: 'Profile',
  components: {
 
  },
  data() {
    return {
      isLoggedIn: false, 
      activeTab: 'orders',
      showAddressForm: false,
      tabs: [
        { id: 'orders', name: 'Заказы', icon: '📦' },
        { id: 'profile', name: 'Профиль', icon: '👤' },
        { id: 'addresses', name: 'Адреса', icon: '📍' },
        { id: 'bonuses', name: 'Бонусы', icon: '🎁' },
        { id: 'settings', name: 'Настройки', icon: '⚙️' }
      ],
      user: {
        name: '',
        lastName: '',
        email: '',
        phone: '',
        birthday: '',
        gender: '',
        bonuses: 0
      },
      orders: [
        {
          id: '2024-001',
          date: '10 ноября 2024',
          status: 'delivered',
          statusText: 'Доставлен',
          total: 5870,
          itemsCount: 3,
          items: [
            { id: 1, name: 'Увлажняющий крем', brand: 'La Roche-Posay', price: 2890, quantity: 1, icon: '✨' },
            { id: 2, name: 'Тушь для ресниц', brand: "L'Oréal", price: 1490, quantity: 2, icon: '💄' }
          ]
        },
        {
          id: '2024-002',
          date: '5 ноября 2024',
          status: 'processing',
          statusText: 'В обработке',
          total: 8990,
          itemsCount: 1,
          items: [
            { id: 3, name: 'Парфюмерная вода Bloom', brand: 'Gucci', price: 8990, quantity: 1, icon: '🌸' }
          ]
        }
      ],
      addresses: [
        {
          id: 1,
          title: 'Дом',
          city: 'Астана',
          street: 'ул. Кабанбай батыра',
          house: '52',
          apartment: '15',
          isDefault: true
        },
        {
          id: 2,
          title: 'Работа',
          city: 'Астана',
          street: 'пр. Кунаева',
          house: '12/1',
          apartment: '',
          isDefault: false
        }
      ],
      bonusHistory: [
        { id: 1, description: 'Начисление за заказ №2024-001', amount: 293, type: 'earned', date: '10 ноября 2024' },
        { id: 2, description: 'Списание на заказ №2024-002', amount: 500, type: 'spent', date: '5 ноября 2024' },
        { id: 3, description: 'Бонус за регистрацию', amount: 500, type: 'earned', date: '1 ноября 2024' }
      ]
    }
  },

  async mounted() {

  const token = localStorage.getItem('token')

  if (!token) {

    this.$router.push('/login')
    return

  }

  try {

    const response = await api.get('/me')

    this.user = {
      ...this.user,
      ...response.data
    }

    this.isLoggedIn = true

  } catch (error) {

    console.log(error)

    localStorage.removeItem('token')
    localStorage.removeItem('user')

    this.$router.push('/login')

  }

},

  methods: {
    getOrderStatusClass(status) {
      const classes = {
        'delivered': 'bg-green-100 text-green-700',
        'processing': 'bg-blue-100 text-blue-700',
        'shipping': 'bg-yellow-100 text-yellow-700',
        'cancelled': 'bg-red-100 text-red-700'
      }
      return classes[status] || 'bg-gray-100 text-gray-700'
    },
    saveProfile() {
      alert('Профиль сохранен!')
    },
    async logout() {

      if (!confirm('Вы действительно хотите выйти?')) {
        return
      }

      try {

        await api.post('/logout')

      } catch (error) {

        console.log(error)

      }

      localStorage.removeItem('token')
      localStorage.removeItem('user')

      this.isLoggedIn = false

      this.$router.push('/login')

    }
  }
}
</script>