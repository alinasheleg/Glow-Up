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

    <!-- ФОРМА ЗАЯВКИ -->
    <section id="form"
             style="padding:64px 16px; background:linear-gradient(135deg,#fce8f3 0%,#faf8fc 50%,#ede8ff 100%);">
      <div style="max-width:520px; margin:0 auto;">

        <!-- Заголовок секции -->
        <div style="text-align:center; margin-bottom:32px;">
          <h2 style="font-size:26px; font-weight:900; color:#2d1b3d; margin-bottom:6px;">
            Форма заявки
          </h2>
          <p style="font-size:14px; color:#b09ab8;">
            Заполните форму и мы свяжемся с вами в течение 24 часов
          </p>
        </div>

        <!-- КАРТОЧКА -->
        <div style="background:#fff; border-radius:28px; padding:36px 32px;
                    border:1px solid #f0e6f5;
                    box-shadow:0 20px 60px rgba(180,100,180,0.10);">

          <form @submit.prevent="registerPartner">

            <!-- Имя бренда -->
            <div style="margin-bottom:18px;">
              <label style="display:block; font-size:12px; font-weight:700;
                             color:#2d1b3d; margin-bottom:7px; letter-spacing:0.4px;">
                Имя бренда
              </label>
              <input
                v-model="reg.name"
                type="text"
                placeholder="Название бренда"
                required
                style="width:100%; box-sizing:border-box; padding:12px 16px;
                       border:1.5px solid #f0e6f5; border-radius:14px;
                       font-size:14px; color:#2d1b3d; outline:none;
                       transition:border-color .2s; background:#faf8fc;"
                @focus="e => e.target.style.borderColor='#e879a0'"
                @blur="e => e.target.style.borderColor='#f0e6f5'"
              />
            </div>

            <!-- Email -->
            <div style="margin-bottom:18px;">
              <label style="display:block; font-size:12px; font-weight:700;
                             color:#2d1b3d; margin-bottom:7px; letter-spacing:0.4px;">
                Email
              </label>
              <input
                v-model="reg.email"
                type="email"
                placeholder="example@email.com"
                required
                style="width:100%; box-sizing:border-box; padding:12px 16px;
                       border:1.5px solid #f0e6f5; border-radius:14px;
                       font-size:14px; color:#2d1b3d; outline:none;
                       transition:border-color .2s; background:#faf8fc;"
                @focus="e => e.target.style.borderColor='#e879a0'"
                @blur="e => e.target.style.borderColor='#f0e6f5'"
              />
            </div>

            <!-- Описание бренда -->
            <div style="margin-bottom:18px;">
              <label style="display:block; font-size:12px; font-weight:700;
                             color:#2d1b3d; margin-bottom:7px; letter-spacing:0.4px;">
                Описание бренда
              </label>
              <textarea
                v-model="reg.description"
                placeholder="Расскажите о вашем бренде..."
                rows="3"
                style="width:100%; box-sizing:border-box; padding:12px 16px;
                       border:1.5px solid #f0e6f5; border-radius:14px;
                       font-size:14px; color:#2d1b3d; outline:none; resize:none;
                       transition:border-color .2s; background:#faf8fc; font-family:inherit;"
                @focus="e => e.target.style.borderColor='#e879a0'"
                @blur="e => e.target.style.borderColor='#f0e6f5'"
              ></textarea>
            </div>

            <!-- Логотип -->
            <div style="margin-bottom:18px;">
              <label style="display:block; font-size:12px; font-weight:700;
                             color:#2d1b3d; margin-bottom:7px; letter-spacing:0.4px;">
                Логотип бренда
              </label>
              <div
                @click="$refs.logoInput.click()"
                style="border:2px dashed #f0b8db; border-radius:14px;
                       padding:20px; text-align:center; cursor:pointer;
                       background:#fff8fc; transition:border-color .2s;"
                @mouseover="e => e.currentTarget.style.borderColor='#e879a0'"
                @mouseleave="e => e.currentTarget.style.borderColor='#f0b8db'"
              >
                <div v-if="reg.logoPreview" style="display:flex; align-items:center; gap:14px; justify-content:center;">
                  <img :src="reg.logoPreview"
                       style="width:56px; height:56px; object-fit:cover; border-radius:12px;
                              border:2px solid #f0b8db;" />
                  <div style="text-align:left;">
                    <p style="font-size:13px; font-weight:700; color:#2d1b3d; margin-bottom:2px;">Логотип загружен</p>
                    <p style="font-size:11px; color:#d4537e;">Нажмите чтобы изменить</p>
                  </div>
                </div>
                <div v-else>
                  <div style="font-size:28px; margin-bottom:6px;">🖼️</div>
                  <p style="font-size:13px; font-weight:600; color:#d4537e; margin-bottom:2px;">Нажмите для загрузки</p>
                  <p style="font-size:11px; color:#d4b8e0;">PNG, JPG до 5 МБ</p>
                </div>
              </div>
              <input ref="logoInput" type="file" accept="image/*" style="display:none;" @change="handleLogo" />
            </div>

            <!-- Разделитель -->
            <div style="display:flex; align-items:center; gap:12px; margin:22px 0;">
              <div style="flex:1; height:1px; background:#f0e6f5;"></div>
              <span style="font-size:11px; color:#d4b8e0; font-weight:600;">БЕЗОПАСНОСТЬ</span>
              <div style="flex:1; height:1px; background:#f0e6f5;"></div>
            </div>

            <!-- Пароль -->
            <div style="margin-bottom:18px;">
              <label style="display:block; font-size:12px; font-weight:700;
                             color:#2d1b3d; margin-bottom:7px; letter-spacing:0.4px;">
                Пароль
              </label>
              <div style="position:relative;">
                <input
                  v-model="reg.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Введите пароль"
                  required
                  style="width:100%; box-sizing:border-box; padding:12px 44px 12px 16px;
                         border:1.5px solid #f0e6f5; border-radius:14px;
                         font-size:14px; color:#2d1b3d; outline:none;
                         transition:border-color .2s; background:#faf8fc;"
                  @focus="e => e.target.style.borderColor='#e879a0'"
                  @blur="e => e.target.style.borderColor='#f0e6f5'"
                />
                <button type="button" @click="showPassword = !showPassword"
                        style="position:absolute; right:14px; top:50%; transform:translateY(-50%);
                               background:none; border:none; cursor:pointer; font-size:16px; color:#d4b8e0;">
                  {{ showPassword ? '🙈' : '👁️' }}
                </button>
              </div>
            </div>

            <!-- Подтвердите пароль -->
            <div style="margin-bottom:24px;">
              <label style="display:block; font-size:12px; font-weight:700;
                             color:#2d1b3d; margin-bottom:7px; letter-spacing:0.4px;">
                Подтвердите пароль
              </label>
              <div style="position:relative;">
                <input
                  v-model="reg.confirmPassword"
                  :type="showConfirm ? 'text' : 'password'"
                  placeholder="Повторите пароль"
                  required
                  style="width:100%; box-sizing:border-box; padding:12px 44px 12px 16px;
                         border:1.5px solid #f0e6f5; border-radius:14px;
                         font-size:14px; color:#2d1b3d; outline:none;
                         transition:border-color .2s; background:#faf8fc;"
                  @focus="e => e.target.style.borderColor='#e879a0'"
                  @blur="e => e.target.style.borderColor='#f0e6f5'"
                />
                <button type="button" @click="showConfirm = !showConfirm"
                        style="position:absolute; right:14px; top:50%; transform:translateY(-50%);
                               background:none; border:none; cursor:pointer; font-size:16px; color:#d4b8e0;">
                  {{ showConfirm ? '🙈' : '👁️' }}
                </button>
              </div>
              <div v-if="reg.confirmPassword" style="margin-top:6px;">
                <span style="font-size:11px;" :style="{ color: passwordMatch ? '#22c55e' : '#f43f5e' }">
                  {{ passwordMatch ? '✓ Пароли совпадают' : '✗ Пароли не совпадают' }}
                </span>
              </div>
            </div>

            <!-- Ошибка -->
            <div v-if="regError"
                 style="background:#fff0f3; border:1px solid #fecdd3; border-radius:12px;
                        padding:10px 14px; margin-bottom:18px; display:flex; align-items:center; gap:8px;">
              <span style="font-size:14px;">⚠️</span>
              <span style="font-size:13px; color:#e11d48; font-weight:600;">{{ regError }}</span>
            </div>

            <!-- Успех -->
            <div v-if="success"
                 style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px;
                        padding:12px 16px; margin-bottom:18px; display:flex; align-items:center; gap:8px;">
              <span style="font-size:16px;">✅</span>
              <span style="font-size:13px; color:#16a34a; font-weight:700;">
                Заявка отправлена! Мы свяжемся с вами скоро.
              </span>
            </div>

            <!-- КНОПКА -->
            <button
              type="submit"
              :disabled="regLoading"
              style="width:100%; padding:14px;
                     background:linear-gradient(90deg,#e879a0,#d4537e);
                     color:#fff; border:none; border-radius:14px;
                     font-size:15px; font-weight:800; cursor:pointer;
                     box-shadow:0 4px 16px rgba(212,83,126,0.35);
                     transition:opacity .2s;"
              @mouseover="e => !regLoading && (e.currentTarget.style.opacity='0.88')"
              @mouseleave="e => e.currentTarget.style.opacity='1'"
            >
              <span v-if="regLoading">Отправка...</span>
              <span v-else>Отправить заявку →</span>
            </button>

          </form>
        </div>

        <!-- Ссылка на регистрацию -->
        <p style="text-align:center; margin-top:20px; font-size:13px; color:#b09ab8;">
          Хотите сразу создать аккаунт?
          <router-link to="/partner-register"
                       style="color:#d4537e; font-weight:700; text-decoration:none;">
            Зарегистрироваться
          </router-link>
        </p>

      </div>
    </section>

    <!-- FAQ -->
    <section class="py-16 container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12 animate-fadeIn">Часто задаваемые вопросы</h2>
      <div class="max-w-3xl mx-auto space-y-4">
        <div v-for="(item, index) in faq" :key="index"
             class="bg-white rounded-lg shadow p-4 cursor-pointer"
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
import { reactive, ref, computed } from 'vue'
import axios from 'axios'

// Данные формы регистрации
const reg = reactive({
  name: '',
  email: '',
  description: '',
  logo: null,
  logoPreview: null,
  password: '',
  confirmPassword: '',
})

const regError = ref('')
const regLoading = ref(false)
const success = ref(false)
const showPassword = ref(false)
const showConfirm = ref(false)

const passwordMatch = computed(() => reg.password === reg.confirmPassword)

function handleLogo(event) {
  const file = event.target.files[0]
  if (file) {
    reg.logo = file
    reg.logoPreview = URL.createObjectURL(file)
  }
}

async function registerPartner() {
  localStorage.removeItem('partner')
  localStorage.removeItem('partnerAuth')

  regError.value = ''
  success.value = false

  if (reg.password !== reg.confirmPassword) {
    regError.value = 'Пароли не совпадают'
    return
  }

  regLoading.value = true

  try {
    const formData = new FormData()
    formData.append('name', reg.name)
    formData.append('email', reg.email)
    formData.append('password', reg.password)
    formData.append('description', reg.description)
    if (reg.logo) formData.append('logo', reg.logo)

    const response = await axios.post(
      'http://127.0.0.1:8001/api/partner/register',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )

    localStorage.removeItem('partner')
    localStorage.removeItem('partnerAuth')
    localStorage.removeItem('partnerPendingMessage')

    success.value = true
    reg.name = ''
    reg.email = ''
    reg.description = ''
    reg.logo = null
    reg.logoPreview = null
    reg.password = ''
    reg.confirmPassword = ''

  } catch (error) {
    regError.value = error.response?.data?.message || 'Ошибка отправки заявки'
  } finally {
    regLoading.value = false
  }
}

// FAQ
const faq = [
  { question: 'Как стать партнёром?',          answer: 'Заполните форму на этой странице, и мы свяжемся с вами.' },
  { question: 'Какие условия сотрудничества?', answer: 'Мы предлагаем гибкие условия для малого и среднего бизнеса. Подробнее выше.' },
  { question: 'Сколько стоит регистрация?',    answer: 'Регистрация бесплатная для всех партнёров.' }
]

const activeFAQ = ref(null)
function toggleFAQ(index) {
  activeFAQ.value = activeFAQ.value === index ? null : index
}
</script>

<style scoped>
.animate-fadeIn { opacity: 0; animation: fadeIn 0.8s forwards; }
.animate-slideUp { opacity: 0; transform: translateY(20px); animation: slideUp 0.8s forwards; }
.animate-slideUp.delay-200 { animation-delay: 0.2s; }
.animate-slideUp.delay-400 { animation-delay: 0.4s; }
.animate-slideUp.delay-600 { animation-delay: 0.6s; }
.animate-slideUp.delay-800 { animation-delay: 0.8s; }
@keyframes fadeIn  { to { opacity: 1; } }
@keyframes slideUp { to { opacity: 1; transform: translateY(0); } }
</style>