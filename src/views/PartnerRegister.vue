<template>
  <div class="min-h-screen bg-pink-50 flex items-center justify-center px-4">
    <div class="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md">
      <h1 class="text-3xl font-bold text-center mb-2">Регистрация партнёра</h1>
      <p class="text-center text-gray-500 mb-8">Создайте аккаунт для управления товарами</p>

      <form @submit.prevent="registerPartner" class="space-y-5">
        <div>
          <label class="block mb-2 font-medium">Имя бренда</label>
          <input v-model="name" type="text" placeholder="Название бренда"
            class="w-full border rounded-lg px-4 py-3" required />
        </div>

        <div>
          <label class="block mb-2 font-medium">Email</label>
          <input v-model="email" type="email" placeholder="example@email.com"
            class="w-full border rounded-lg px-4 py-3" required />
        </div>

        <div>
          <label class="block mb-2 font-medium">Описание бренда</label>
          <textarea v-model="description" placeholder="Расскажите о вашем бренде..."
            class="w-full border rounded-lg px-4 py-3" rows="3"></textarea>
        </div>

        <div>
          <label class="block mb-2 font-medium">Логотип бренда</label>
          <input type="file" @change="handleLogo" accept="image/*"
            class="w-full border rounded-lg px-4 py-3" />
          <div v-if="logoPreview" class="mt-2">
            <img :src="logoPreview" class="w-20 h-20 object-cover rounded-lg" />
          </div>
        </div>

        <div>
          <label class="block mb-2 font-medium">Пароль</label>
          <input v-model="password" type="password" placeholder="Введите пароль"
            class="w-full border rounded-lg px-4 py-3" required />
        </div>

        <div>
          <label class="block mb-2 font-medium">Подтвердите пароль</label>
          <input v-model="confirmPassword" type="password" placeholder="Повторите пароль"
            class="w-full border rounded-lg px-4 py-3" required />
        </div>

        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

        <button class="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition">
          Зарегистрироваться
        </button>
      </form>

      <p class="text-center mt-6 text-sm text-gray-500">
        Уже есть аккаунт?
        <router-link to="/partner-login" class="text-pink-600 font-medium">Войти</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PartnerRegister',

  data() {
    return {
      name: '',
      email: '',
      description: '',
      logo: null,
      logoPreview: null,
      password: '',
      confirmPassword: '',
      error: ''
    }
  },

  methods: {
    handleLogo(event) {
      const file = event.target.files[0]
      if (file) {
        this.logo = file
        this.logoPreview = URL.createObjectURL(file)
      }
    },

    async registerPartner() {
      this.error = ''

      if (this.password !== this.confirmPassword) {
        this.error = 'Пароли не совпадают'
        return
      }

      try {
        const formData = new FormData()
        formData.append('name', this.name)
        formData.append('email', this.email)
        formData.append('password', this.password)
        formData.append('description', this.description)
        if (this.logo) {
          formData.append('logo', this.logo)
        }

        const response = await axios.post(
          'http://127.0.0.1:8001/api/partner/register',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )

        alert(response.data.message)
        this.$router.push('/partner-login')

      } catch (error) {
        this.error = error.response?.data?.message || 'Ошибка регистрации'
      }
    }
  }
}
</script>