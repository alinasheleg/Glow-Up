<template>
  <div class="min-h-screen bg-pink-50 flex items-center justify-center px-4">
    <div class="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md">
      <h1 class="text-3xl font-bold text-center mb-2">Вход для партнёров</h1>
      <p class="text-center text-gray-500 mb-8">Войдите для управления товарами</p>

      <form @submit.prevent="loginPartner" class="space-y-5">
        <div>
          <label class="block mb-2 font-medium">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="example@email.com"
            class="w-full border rounded-lg px-4 py-3"
            required
          />
        </div>

        <div>
          <label class="block mb-2 font-medium">Пароль</label>
          <input
            v-model="password"
            type="password"
            placeholder="Введите пароль"
            class="w-full border rounded-lg px-4 py-3"
            required
          />
        </div>

        <button class="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition">
          Войти
        </button>
      </form>

      <p class="text-center mt-6 text-sm text-gray-500">
        Нет аккаунта?
        <router-link to="/partner-register" class="text-pink-600 font-medium">
          Зарегистрироваться
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PartnerLogin',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    loginPartner() {
      localStorage.setItem('partnerAuth', 'true')
      this.$router.push('/partner')
    }
  }
}
</script>