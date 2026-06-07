<template>
  <div class="min-h-screen bg-gray-50">
    <Header :cartCount="0" :favoritesCount="0" />

    <section class="max-w-md mx-auto px-4 py-12">
      <div class="bg-white rounded-2xl shadow-lg p-8">

        <div class="text-center mb-8">
          <div class="w-20 h-20 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span class="text-4xl">✨</span>
          </div>

          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            Регистрация
          </h1>

          <p class="text-gray-600">
            Создайте аккаунт для покупок
          </p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-5">

          <!-- NAME -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Имя
            </label>

            <input
              v-model="name"
              type="text"
              required
              placeholder="Ваше имя"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
            />
          </div>

          <!-- EMAIL -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              v-model="email"
              type="email"
              required
              placeholder="example@email.com"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
            />
          </div>

          <!-- PHONE -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Телефон
            </label>

            <input
              v-model="phone"
              type="tel"
              required
              placeholder="+7 (___) ___-__-__"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
            />
          </div>

          <!-- PASSWORD -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Пароль
            </label>

            <input
              v-model="password"
              type="password"
              required
              placeholder="Минимум 6 символов"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
            />
          </div>

          <!-- CONFIRM PASSWORD -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Подтвердите пароль
            </label>

            <input
              v-model="confirmPassword"
              type="password"
              required
              placeholder="Повторите пароль"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
            />
          </div>

          <!-- TERMS -->
          <div class="flex items-start">
            <input
              v-model="agreeToTerms"
              type="checkbox"
              required
              class="mt-1 w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
            />

            <label class="ml-2 text-sm text-gray-600">
              Я согласен с
              <a href="#" class="text-pink-600 hover:text-pink-700">
                условиями использования
              </a>
              и
              <a href="#" class="text-pink-600 hover:text-pink-700">
                политикой конфиденциальности
              </a>
            </label>
          </div>

          <!-- ERROR -->
          <div
            v-if="error"
            class="bg-red-100 text-red-700 p-3 rounded-lg text-sm"
          >
            {{ error }}
          </div>

          <!-- BUTTON -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition font-medium text-lg disabled:opacity-50"
          >

            {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}

          </button>

        </form>

        <!-- DIVIDER -->
        <div class="relative my-6">

          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>

          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500">
              или
            </span>
          </div>

        </div>

        <!-- GOOGLE -->
        <div class="space-y-3">

          <button
            class="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <span class="text-xl">🔵</span>

            <span class="font-medium">
              Регистрация через Google
            </span>
          </button>

        </div>

        <!-- LOGIN -->
        <div class="text-center mt-6">

          <p class="text-gray-600">
            Уже есть аккаунт?

            <router-link
              to="/login"
              class="text-pink-600 hover:text-pink-700 font-medium"
            >
              Войти
            </router-link>

          </p>

        </div>

      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import axios from 'axios'

import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {

  name: 'Register',

  components: {
    Header,
    Footer
  },

  data() {
    return {

      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,

      loading: false,
      error: null

    }
  },

  methods: {

    async handleRegister() {

      this.error = null

      // passwords check
      if (this.password !== this.confirmPassword) {

        this.error = 'Пароли не совпадают'
        return

      }

      try {

        this.loading = true

        const response = await axios.post(
         'http://127.0.0.1:8001/api/register',
          {
            name: this.name,
            email: this.email,
            phone: this.phone,
            password: this.password
          }
        )

        // save token
        localStorage.setItem(
          'token',
          response.data.token
        )

        // save user
        localStorage.setItem(
          'user',
          JSON.stringify(response.data.user)
        )

        // redirect
        this.$router.push('/profile')

      } catch (error) {

        console.log(error)

        if (error.response?.data?.message) {

          this.error = error.response.data.message

        } else {

          this.error = 'Ошибка регистрации'

        }

      } finally {

        this.loading = false

      }

    }

  }

}
</script>