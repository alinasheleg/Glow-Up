<template>
  <div style="min-height:100vh; background:#faf8fc;">
    <div style="max-width:1280px; margin:0 auto; padding:40px 28px;">

      <!-- ШАПКА -->
      <div style="margin-bottom:36px;">
        <h1 style="font-size:30px; font-weight:900; color:#2d1b3d; margin-bottom:6px;">
          ✨ Новинки
        </h1>
        <p style="font-size:14px; color:#b09ab8;">Свежие поступления за последние 7 дней</p>
      </div>

      <!-- ЗАГРУЗКА -->
      <div v-if="loading" style="text-align:center; color:#d4b8e0; padding:80px 0; font-size:16px;">
        Загрузка...
      </div>

      <!-- ПУСТО -->
      <div v-else-if="!products.length"
           style="text-align:center; padding:80px 0;">
        <div style="font-size:56px; margin-bottom:16px;">🌸</div>
        <p style="font-size:18px; font-weight:700; color:#2d1b3d; margin-bottom:6px;">
          Новинок пока нет
        </p>
        <p style="font-size:14px; color:#b09ab8;">
          Загляните позже — скоро будут свежие поступления
        </p>
      </div>

      <!-- СЕТКА -->
      <div v-else>

        <!-- счётчик -->
        <p style="font-size:13px; color:#b09ab8; margin-bottom:20px;">
          {{ products.length }} {{ plural(products.length, ['товар', 'товара', 'товаров']) }} добавлено за 7 дней
        </p>

        <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(210px,1fr)); gap:18px;">
          <router-link
            v-for="product in products"
            :key="product.id"
            :to="`/product/${product.id}`"
            style="text-decoration:none;"
          >
            <div
              style="background:#fff; border-radius:22px; overflow:hidden; border:1px solid #f0e6f5; transition:all .25s; cursor:pointer; position:relative;"
              @mouseover="e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='0 14px 36px rgba(212,83,126,0.13)'; e.currentTarget.style.borderColor='#f0b8db'; }"
              @mouseleave="e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.borderColor='#f0e6f5'; }"
            >

              <!-- БЕЙДЖ НОВИНКА -->
              <div style="position:absolute; top:12px; right:12px; z-index:2;
                           background:linear-gradient(90deg,#e879a0,#d4537e);
                           color:#fff; font-size:10px; font-weight:800;
                           padding:4px 10px; border-radius:20px;
                           box-shadow:0 2px 8px rgba(212,83,126,0.25);">
                NEW
              </div>

              <!-- ФОТО -->
              <div style="height:200px; background:#fff8fc; position:relative; overflow:hidden; display:flex; align-items:center; justify-content:center;">
                <img
                  v-if="product.image"
                  :src="`http://127.0.0.1:8001/storage/${product.image}`"
                  :alt="product.title"
                  style="width:100%; height:100%; object-fit:cover; transition:transform .3s;"
                  @mouseover="e => e.target.style.transform='scale(1.06)'"
                  @mouseleave="e => e.target.style.transform='scale(1)'"
                />
                <span v-else style="font-size:52px;">🛍️</span>
              </div>

              <!-- ИНФО -->
              <div style="padding:14px 16px 16px;">

                <p style="font-size:11px; color:#d4b8e0; margin-bottom:4px;">
                  {{ product.brand }}
                </p>

                <p style="font-size:13px; font-weight:700; color:#2d1b3d; line-height:1.4; margin-bottom:4px;
                           display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
                  {{ product.title }}
                </p>

                <p style="font-size:11px; color:#d4b8e0; margin-bottom:12px;">
                  {{ product.category }}
                </p>

                <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
                  <span style="font-size:16px; font-weight:900; color:#d4537e;">
                    {{ Number(product.price).toLocaleString() }} ₸
                  </span>

                  <!-- дней назад -->
                  <span style="font-size:10px; color:#b09ab8; background:#fce8f3;
                                padding:3px 9px; border-radius:20px;">
                    {{ daysAgo(product.created_at) }}
                  </span>
                </div>

                <!-- КНОПКИ -->
                <div style="display:flex; gap:8px; margin-top:12px;">
                  <button
                    @click.prevent="addToCart(product)"
                    style="flex:1; background:linear-gradient(90deg,#e879a0,#d4537e); color:#fff;
                           border:none; border-radius:12px; padding:9px; font-size:12px; font-weight:700;
                           cursor:pointer; transition:opacity .2s;"
                    @mouseover="e => e.target.style.opacity='0.85'"
                    @mouseleave="e => e.target.style.opacity='1'"
                  >
                    В корзину
                  </button>
                  <button
                    @click.prevent="toggleFavorite(product)"
                    :style="{
                      width:'38px', height:'38px', borderRadius:'12px', border:'1px solid #f0b8db',
                      background: isFavorite(product.id) ? 'linear-gradient(90deg,#e879a0,#d4537e)' : '#fff',
                      color: isFavorite(product.id) ? '#fff' : '#d4537e',
                      cursor:'pointer', fontSize:'16px', display:'flex',
                      alignItems:'center', justifyContent:'center', flexShrink:'0'
                    }"
                  >
                    ♥
                  </button>
                </div>

              </div>
            </div>
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'New',

  data() {
    return {
      products: [],
      loading: true,
      favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
    }
  },

  async mounted() {
    await this.fetchNew()
  },

  methods: {
    async fetchNew() {
      try {
        const res = await fetch('http://127.0.0.1:8001/api/products/new')
        const data = await res.json()
        this.products = data
      } catch (e) {
        console.error('Ошибка загрузки новинок', e)
      } finally {
        this.loading = false
      }
    },

    daysAgo(dateStr) {
      if (!dateStr) return ''
      const diff = Math.floor((Date.now() - new Date(dateStr)) / 86400000)
      if (diff === 0) return 'сегодня'
      if (diff === 1) return 'вчера'
      return `${diff} дн. назад`
    },

    plural(n, forms) {
      const mod10 = n % 10
      const mod100 = n % 100
      if (mod100 >= 11 && mod100 <= 19) return forms[2]
      if (mod10 === 1) return forms[0]
      if (mod10 >= 2 && mod10 <= 4) return forms[1]
      return forms[2]
    },

    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const exists = cart.find(i => i.id === product.id)
      if (exists) {
        exists.quantity = (exists.quantity || 1) + 1
      } else {
        cart.push({ ...product, quantity: 1 })
      }
      localStorage.setItem('cart', JSON.stringify(cart))
      alert('Добавлено в корзину!')
    },

    toggleFavorite(product) {
      const idx = this.favorites.findIndex(i => i.id === product.id)
      if (idx !== -1) {
        this.favorites.splice(idx, 1)
      } else {
        this.favorites.push(product)
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },

    isFavorite(id) {
      return this.favorites.some(i => i.id === id)
    },
  },
}
</script>