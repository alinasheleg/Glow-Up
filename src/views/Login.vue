<template>
  <div class="min-h-screen bg-gray-50">

    <section class="max-w-md mx-auto px-4 py-12">

      <div class="bg-white rounded-2xl shadow-lg p-8">

        <!-- HEADER -->
        <div class="text-center mb-8">

          <div class="w-20 h-20 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span class="text-4xl">👤</span>
          </div>

          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            Вход в аккаунт
          </h1>

          <p class="text-gray-600">
            Войдите чтобы продолжить покупки
          </p>

        </div>

        <!-- FORM -->
        <form @submit.prevent="handleLogin" class="space-y-6">

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

          <!-- PASSWORD -->
          <div>

            <label class="block text-sm font-medium text-gray-700 mb-2">
              Пароль
            </label>

            <input
              v-model="password"
              type="password"
              required
              placeholder="••••••••"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
            />

          </div>

          <!-- FORGOT -->
          <div class="text-right">

            <a
              href="#"
              class="text-sm text-pink-600 hover:text-pink-700"
            >
              Забыли пароль?
            </a>

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

            {{ loading ? 'Вход...' : 'Войти' }}

          </button>

        </form>

        <!-- PARTNER -->
        <div class="mt-6 space-y-3">

          <router-link to="/partner-login">

            <button class="w-full border border-pink-500 text-pink-600 py-3 rounded-lg font-medium hover:bg-pink-50 transition">
              Войти как партнер
            </button>

          </router-link>

          <router-link to="/partner-register">

            <button class="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition">
              Зарегистрироваться как партнер
            </button>

          </router-link>

        </div>

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

        <!-- SOCIAL -->
        <div class="space-y-3">

          <button class="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">

            <span class="text-xl">🔵</span>

            <span class="font-medium">
              Войти через Google
            </span>

          </button>

          <button class="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">

            <span class="text-xl">📱</span>

            <span class="font-medium">
              Войти через телефон
            </span>

          </button>

        </div>

        <!-- REGISTER -->
        <div class="text-center mt-6">

          <p class="text-gray-600 mt-4">

            Нет аккаунта?

            <router-link
              to="/register"
              class="text-pink-600 font-medium hover:underline"
            >
              Зарегистрироваться
            </router-link>

          </p>

        </div>

      </div>

    </section>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',

  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: ''
    }
  },

  methods: {

    async handleLogin() {


  try {

    const response = await axios.post(
      'http://127.0.0.1:8000/api/login',
      {
        email: this.email,
        password: this.password
      } 
    )
      
localStorage.setItem(
  'token',
  response.data.token
)

localStorage.setItem(
  'user',
  JSON.stringify(response.data.user)
)
this.$router.push('/')

    console.log(response)

  } catch (error) {

  console.log(error)

  if (error.response) {

    console.log('STATUS:')
    console.log(error.response.status)

    console.log('DATA:')
    console.log(error.response.data)

    alert(JSON.stringify(error.response.data))

  } else {

    console.log(error.message)

  }

}finally {

        this.loading = false

      }

    }

  }
}
</script>