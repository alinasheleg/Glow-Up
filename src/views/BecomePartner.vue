<template>
  <div class="min-h-screen bg-gray-50 font-sans">

    <!-- Hero-блок -->
    <section class="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white py-20 text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">Станьте нашим партнёром</h1>
      <p class="text-lg md:text-xl mb-6 animate-fadeIn delay-200">
        Присоединяйтесь к Glow-Up и увеличьте продажи вашей компании!
      </p>
      <a href="#form" class="bg-white text-pink-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition animate-fadeIn delay-400">
        Подать заявку
      </a>
    </section>

    <!-- Преимущества -->
    <section class="py-16 container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12 animate-fadeIn">Почему стоит сотрудничать с нами</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition animate-slideUp">
          <div class="text-pink-500 text-4xl mb-4">📈</div>
          <h3 class="text-xl font-semibold mb-3">Расширение аудитории</h3>
          <p>Доступ к тысячам клиентов на нашей платформе каждый месяц.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition animate-slideUp delay-200">
          <div class="text-pink-500 text-4xl mb-4">🛠️</div>
          <h3 class="text-xl font-semibold mb-3">Удобное управление</h3>
          <p>Простая панель управления для отслеживания заказов и статистики.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition animate-slideUp delay-400">
          <div class="text-pink-500 text-4xl mb-4">💬</div>
          <h3 class="text-xl font-semibold mb-3">Поддержка 24/7</h3>
          <p>Наша команда всегда готова помочь вам с любыми вопросами.</p>
        </div>
      </div>
    </section>

    <!-- Условия сотрудничества -->
    <section class="py-16 bg-white">
      <div class="max-w-5xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 animate-fadeIn">Условия сотрудничества</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition animate-slideUp">
            <div class="text-pink-500 text-4xl mb-4">💰</div>
            <h3 class="text-xl font-semibold mb-3">Комиссия</h3>
            <p>Гибкая система комиссии. Вы сами выбираете категорию товаров и размер комиссии.</p>
          </div>
          <div class="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition animate-slideUp delay-200">
            <div class="text-pink-500 text-4xl mb-4">📝</div>
            <h3 class="text-xl font-semibold mb-3">Регистрация</h3>
            <p>Регистрация бесплатная. Для подключения необходимы базовые документы компании.</p>
          </div>
          <div class="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition animate-slideUp delay-400">
            <div class="text-pink-500 text-4xl mb-4">🚚</div>
            <h3 class="text-xl font-semibold mb-3">Доставка и логистика</h3>
            <p>Вы выбираете способ доставки. Мы интегрируем ваши процессы с маркетплейсом.</p>
          </div>
          <div class="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition animate-slideUp delay-600">
            <div class="text-pink-500 text-4xl mb-4">📈</div>
            <h3 class="text-xl font-semibold mb-3">Продвижение и статистика</h3>
            <p>Статистика по продажам, аналитические отчёты и участие в акциях.</p>
          </div>
          <div class="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition animate-slideUp delay-800">
            <div class="text-pink-500 text-4xl mb-4">💬</div>
            <h3 class="text-xl font-semibold mb-3">Поддержка</h3>
            <p>Менеджер партнёрства отвечает на все вопросы 24/7 и помогает настроить товары.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Форма заявки (как настоящая) -->
    <section id="form" class="py-16 bg-gray-100">
      <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow animate-fadeIn">
        <h2 class="text-2xl font-bold mb-6 text-center">Форма заявки</h2>
        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Имя -->
          <div class="relative">
            <input v-model="form.name" type="text" id="name" required
                   class="peer w-full border border-gray-300 rounded-md p-4 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
                   placeholder="Ваше имя"/>
            <label for="name" class="absolute left-4 top-4 text-gray-400 text-sm transition-all
                   peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                   peer-focus:top-1 peer-focus:text-pink-500 peer-focus:text-sm">Ваше имя</label>
            <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
          </div>

          <!-- Email -->
          <div class="relative">
            <input v-model="form.email" type="email" id="email" required
                   class="peer w-full border border-gray-300 rounded-md p-4 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
                   placeholder="Email"/>
            <label for="email" class="absolute left-4 top-4 text-gray-400 text-sm transition-all
                   peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                   peer-focus:top-1 peer-focus:text-pink-500 peer-focus:text-sm">Email</label>
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
          </div>

          <!-- Компания -->
          <div class="relative">
            <input v-model="form.company" type="text" id="company" required
                   class="peer w-full border border-gray-300 rounded-md p-4 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
                   placeholder="Название компании"/>
            <label for="company" class="absolute left-4 top-4 text-gray-400 text-sm transition-all
                   peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                   peer-focus:top-1 peer-focus:text-pink-500 peer-focus:text-sm">Название компании</label>
            <p v-if="errors.company" class="text-red-500 text-sm mt-1">{{ errors.company }}</p>
          </div>

          <!-- Сообщение -->
          <div class="relative">
            <textarea v-model="form.message" id="message" required rows="4"
                      class="peer w-full border border-gray-300 rounded-md p-4 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Краткое описание вашей компании"></textarea>
            <label for="message" class="absolute left-4 top-4 text-gray-400 text-sm transition-all
                   peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                   peer-focus:top-1 peer-focus:text-pink-500 peer-focus:text-sm">Краткое описание вашей компании</label>
            <p v-if="errors.message" class="text-red-500 text-sm mt-1">{{ errors.message }}</p>
          </div>

          <!-- Кнопка -->
          <button type="submit"
                  class="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition relative overflow-hidden">
            Отправить заявку
            <span class="ripple absolute inset-0 rounded-lg"></span>
          </button>
        </form>
        <p v-if="success" class="mt-4 text-green-600 font-semibold text-center">Заявка успешно отправлена!</p>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-16 container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12 animate-fadeIn">Часто задаваемые вопросы</h2>
      <div class="max-w-3xl mx-auto space-y-4">
        <div v-for="(item, index) in faq" :key="index" class="bg-white rounded-lg shadow p-4 cursor-pointer"
             @click="toggleFAQ(index)">
          <div class="flex justify-between items-center">
            <h3 class="font-semibold text-lg">{{ item.question }}</h3>
            <span>{{ activeFAQ === index ? '−' : '+' }}</span>
          </div>
          <p v-if="activeFAQ === index" class="mt-2 text-gray-600">{{ item.answer }}</p>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  email: '',
  company: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  company: '',
  message: ''
})

const success = ref(false)

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function submitForm() {
  errors.name = ''
  errors.email = ''
  errors.company = ''
  errors.message = ''
  success.value = false

  let valid = true
  if (!form.name) { errors.name = 'Введите ваше имя'; valid = false }
  if (!form.email || !validateEmail(form.email)) { errors.email = 'Введите корректный email'; valid = false }
  if (!form.company) { errors.company = 'Введите название компании'; valid = false }
  if (!form.message) { errors.message = 'Напишите краткое описание'; valid = false }

  if (!valid) return

  console.log('Форма отправлена:', form)
  success.value = true

  form.name = ''
  form.email = ''
  form.company = ''
  form.message = ''
}


const faq = [
  { question: 'Как стать партнёром?', answer: 'Заполните форму на этой странице, и мы свяжемся с вами.' },
  { question: 'Сколько стоит регистрация?', answer: 'Регистрация бесплатная для всех партнёров.' }
]

const activeFAQ = ref(null)
function toggleFAQ(index) {
  activeFAQ.value = activeFAQ.value === index ? null : index
}
</script>

<style scoped>
/* Ripple эффект кнопки */
button.relative .ripple {
  background: rgba(255,255,255,0.3);
  transform: scale(0);
  animation: ripple 0.6s linear;
  pointer-events: none;
}
@keyframes ripple { to { transform: scale(4); opacity: 0; } }


@keyframes slideUp { to { opacity: 1; transform: translateY(0); } }
</style>