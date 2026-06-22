// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 👉 i18n
import { createI18n } from 'vue-i18n'

// 👉 переводы
import ru from './i18n/locales/ru.js'
import en from './i18n/locales/en.js'
import kz from './i18n/locales/kz.js'

// 👉 настройка i18n
const i18n = createI18n({
  legacy: true,       
  locale: 'ru',       
  fallbackLocale: 'ru',
  messages: {
    ru,
    en,
    kz
  }
})

const app = createApp(App)

app.use(router)
app.use(i18n)   // 🔥 ДОБАВИЛИ ЭТО

app.mount('#app')