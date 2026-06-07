<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="bg-white rounded-2xl shadow-lg p-12 max-w-md text-center">
      
      <div class="text-8xl mb-6">🚫</div>
      
      <h1 class="text-3xl font-bold text-gray-900 mb-4">
        Аккаунт заблокирован
      </h1>
      
      <p class="text-gray-600 mb-8">
        Ваш аккаунт был заблокирован администратором. 
        Если вы считаете это ошибкой — свяжитесь с поддержкой.
      </p>

      <div class="space-y-3">
        <a 
          href="mailto:support@glow-up.kz"
          class="block w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition font-medium"
        >
          Написать в поддержку
        </a>
        
        <button
          @click="logout"
          class="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition font-medium"
        >
          Выйти из аккаунта
        </button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Banned',
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.push('/login')
    }
  }
}
</script>