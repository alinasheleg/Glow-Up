<template>
  <div class="min-h-screen bg-pink-50 flex items-center justify-center px-4">
    <div class="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md">
      <h1 class="text-3xl font-bold text-center mb-2">Вход для партнёров</h1>
      <p class="text-center text-gray-500 mb-8">Войдите для управления товарами</p>

      <form @submit.prevent="loginPartner" class="space-y-5">
        <div>
          <label class="block mb-2 font-medium">Email</label>
          <input v-model="email" type="email" placeholder="example@email.com"
            class="w-full border rounded-lg px-4 py-3" required />
        </div>

        <div>
          <label class="block mb-2 font-medium">Пароль</label>
          <input v-model="password" type="password" placeholder="Введите пароль"
            class="w-full border rounded-lg px-4 py-3" required />
        </div>

        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

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
import axios from 'axios'

export default {
  name: 'PartnerLogin',

  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },

  methods: {
    async loginPartner() {
      this.error = ''

      try {
        const response = await axios.post(
          'http://127.0.0.1:8001/api/partner/login',
          {
            email: this.email,
            password: this.password
          }
        )

        const token = response.data.token
        const partner = response.data.partner

        localStorage.setItem('token', token)
        localStorage.setItem('partner', JSON.stringify(partner))
        localStorage.setItem('partnerAuth', 'true')

        console.log('TOKEN SAVED:', token)
        console.log('RESPONSE', response.data)
        console.log('PARTNER', partner)
        console.log('STATUS', partner.status)

        if (partner.status === 'pending') {
          localStorage.setItem('partnerPendingMessage', 'Ваша заявка находится на рассмотрении.')
          this.$router.push('/partner-pending')
          return
        }

        if (partner.status === 'rejected') {
          localStorage.setItem('partnerPendingMessage', 'Ваша заявка отклонена.')
          this.$router.push('/partner-pending')
          return
        }

        this.$router.push('/profile')

      } catch (error) {
        console.log('ERROR RESPONSE', error.response?.data)

        const message = error.response?.data?.message || 'Ошибка входа'
        const partnerFromError = error.response?.data?.partner

        if (partnerFromError) {
          localStorage.setItem('partner', JSON.stringify(partnerFromError))
          localStorage.setItem('partnerAuth', 'true')

          if (partnerFromError.status === 'pending') {
            localStorage.setItem('partnerPendingMessage', 'Ваша заявка находится на рассмотрении.')
            this.$router.push('/partner-pending')
            return
          }

          if (partnerFromError.status === 'rejected') {
            localStorage.setItem('partnerPendingMessage', 'Ваша заявка отклонена.')
            this.$router.push('/partner-pending')
            return
          }
        }

         if (
    message.includes('рассмотрении') ||
    message.includes('отклонена') ||
    message.includes('одобрена') ||   
    message.includes('pending') ||
    message.includes('rejected')
  ) {
    localStorage.setItem('partnerPendingMessage', message)
    this.$router.push('/partner-pending')
    return
  }

        this.error = message
      }
    }
  }
}
</script>