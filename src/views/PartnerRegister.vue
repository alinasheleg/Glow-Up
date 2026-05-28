<template>
  <div class="min-h-screen bg-pink-50 flex items-center justify-center px-4">
    <div class="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md">
      <h1 class="text-3xl font-bold text-center mb-2">Регистрация партнёра</h1>
      <p class="text-center text-gray-500 mb-8">
        Создайте аккаунт для управления товарами
      </p>

      <form @submit.prevent="registerPartner" class="space-y-5">
        <div>
          <label class="block mb-2 font-medium">Имя</label>
          <input
            v-model="name"
            type="text"
            placeholder="Введите имя"
            class="w-full border rounded-lg px-4 py-3"
            required
          />
        </div>

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

        <div>
          <label class="block mb-2 font-medium">Подтвердите пароль</label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Повторите пароль"
            class="w-full border rounded-lg px-4 py-3"
            required
          />
        </div>

        <p v-if="error" class="text-red-500 text-sm">
          {{ error }}
        </p>

        <button
          class="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition"
        >
          Зарегистрироваться
        </button>
      </form>

      <p class="text-center mt-6 text-sm text-gray-500">
        Уже есть аккаунт?
        <router-link to="/partner-login" class="text-pink-600 font-medium">
          Войти
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PartnerRegister',

  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: ''
    }
  },

  methods: {
    registerPartner() {
      this.error = ''

      if (this.password !== this.confirmPassword) {
        this.error = 'Пароли не совпадают'
        return
      }

      const partnerData = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      // Сохраняем пользователя
      localStorage.setItem('partnerUser', JSON.stringify(partnerData))

      // Авторизация после регистрации
      localStorage.setItem('partnerAuth', 'true')

      // Переход в кабинет
      this.$router.push('/partner')
    }
  }
}
</script>