<template>
  <div style="min-height:100vh; background:linear-gradient(135deg,#fce8f3 0%,#faf8fc 50%,#ede8ff 100%);
              display:flex; align-items:center; justify-content:center; padding:40px 16px;">

    <div style="width:100%; max-width:480px;">

      <div style="text-align:center; margin-bottom:32px;">
        <h1 style="font-size:26px; font-weight:900; color:#2d1b3d; margin-bottom:6px;">
          Регистрация партнёра
        </h1>
        <p style="font-size:14px; color:#b09ab8;">
          Создайте аккаунт для управления товарами
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
              v-model="name"
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
              v-model="email"
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

          <!-- Описание -->
          <div style="margin-bottom:18px;">
            <label style="display:block; font-size:12px; font-weight:700;
                           color:#2d1b3d; margin-bottom:7px; letter-spacing:0.4px;">
              Описание бренда
            </label>
            <textarea
              v-model="description"
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

            <!-- Зона загрузки -->
            <div
              @click="$refs.logoInput.click()"
              style="border:2px dashed #f0b8db; border-radius:14px;
                     padding:20px; text-align:center; cursor:pointer;
                     background:#fff8fc; transition:border-color .2s;"
              @mouseover="e => e.currentTarget.style.borderColor='#e879a0'"
              @mouseleave="e => e.currentTarget.style.borderColor='#f0b8db'"
            >
              <!-- Превью -->
              <div v-if="logoPreview" style="display:flex; align-items:center; gap:14px; justify-content:center;">
                <img :src="logoPreview"
                     style="width:56px; height:56px; object-fit:cover; border-radius:12px;
                            border:2px solid #f0b8db;" />
                <div style="text-align:left;">
                  <p style="font-size:13px; font-weight:700; color:#2d1b3d; margin-bottom:2px;">
                    Логотип загружен
                  </p>
                  <p style="font-size:11px; color:#d4537e;">Нажмите чтобы изменить</p>
                </div>
              </div>

              <!-- Пустое состояние -->
              <div v-else>
                <div style="font-size:28px; margin-bottom:6px;">🖼️</div>
                <p style="font-size:13px; font-weight:600; color:#d4537e; margin-bottom:2px;">
                  Нажмите для загрузки
                </p>
                <p style="font-size:11px; color:#d4b8e0;">PNG, JPG до 5 МБ</p>
              </div>
            </div>

            <input
              ref="logoInput"
              type="file"
              accept="image/*"
              style="display:none;"
              @change="handleLogo"
            />
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
                v-model="password"
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
              <button
                type="button"
                @click="showPassword = !showPassword"
                style="position:absolute; right:14px; top:50%; transform:translateY(-50%);
                       background:none; border:none; cursor:pointer; font-size:16px; color:#d4b8e0;"
              >
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
                v-model="confirmPassword"
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
              <button
                type="button"
                @click="showConfirm = !showConfirm"
                style="position:absolute; right:14px; top:50%; transform:translateY(-50%);
                       background:none; border:none; cursor:pointer; font-size:16px; color:#d4b8e0;"
              >
                {{ showConfirm ? '🙈' : '👁️' }}
              </button>
            </div>
            <!-- Индикатор совпадения -->
            <div v-if="confirmPassword" style="margin-top:6px; display:flex; align-items:center; gap:5px;">
              <span style="font-size:11px;" :style="{ color: passwordMatch ? '#22c55e' : '#f43f5e' }">
                {{ passwordMatch ? '✓ Пароли совпадают' : '✗ Пароли не совпадают' }}
              </span>
            </div>
          </div>

          <!-- Ошибка -->
          <div v-if="error"
               style="background:#fff0f3; border:1px solid #fecdd3; border-radius:12px;
                      padding:10px 14px; margin-bottom:18px; display:flex; align-items:center; gap:8px;">
            <span style="font-size:14px;">⚠️</span>
            <span style="font-size:13px; color:#e11d48; font-weight:600;">{{ error }}</span>
          </div>

          <!-- КНОПКА -->
          <button
            type="submit"
            :disabled="loading"
            style="width:100%; padding:14px;
                   background:linear-gradient(90deg,#e879a0,#d4537e);
                   color:#fff; border:none; border-radius:14px;
                   font-size:15px; font-weight:800; cursor:pointer;
                   box-shadow:0 4px 16px rgba(212,83,126,0.35);
                   transition:opacity .2s;"
            @mouseover="e => !loading && (e.currentTarget.style.opacity='0.88')"
            @mouseleave="e => e.currentTarget.style.opacity='1'"
          >
            <span v-if="loading">Регистрация...</span>
            <span v-else>Зарегистрироваться →</span>
          </button>

        </form>

      </div>

      <!-- ССЫЛКА НА ВХОД -->
      <p style="text-align:center; margin-top:20px; font-size:13px; color:#b09ab8;">
        Уже есть аккаунт?
        <router-link to="/partner-login"
                     style="color:#d4537e; font-weight:700; text-decoration:none;">
          Войти
        </router-link>
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
      error: '',
      loading: false,
      showPassword: false,
      showConfirm: false,
    }
  },

  computed: {
    passwordMatch() {
      return this.password === this.confirmPassword
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
      localStorage.removeItem('partner')
      localStorage.removeItem('partnerAuth')

      this.error = ''

      if (this.password !== this.confirmPassword) {
        this.error = 'Пароли не совпадают'
        return
      }

      this.loading = true

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

        localStorage.removeItem('partner')
        localStorage.removeItem('partnerAuth')
        localStorage.removeItem('partnerPendingMessage')

        alert(response.data.message)
        this.$router.push('/partner-login')

      } catch (error) {
        this.error = error.response?.data?.message || 'Ошибка регистрации'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>