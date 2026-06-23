<template>
  <div style="min-height:100vh; background:#faf8fc;">
    <div style="max-width:1280px; margin:0 auto; padding:40px 28px;">

      <!-- ШАПКА -->
      <div style="margin-bottom:36px;">
        <h1 style="font-size:30px; font-weight:900; color:#2d1b3d; margin-bottom:6px;">
          ♥ Избранное
        </h1>
        <p style="font-size:14px; color:#b09ab8;">Товары, которые вы сохранили</p>
      </div>

      <!-- ЗАГРУЗКА -->
      <div v-if="loading" style="text-align:center; color:#d4b8e0; padding:80px 0; font-size:16px;">
        Загрузка...
      </div>

      <!-- ПУСТО -->
      <div v-else-if="products.length === 0" style="text-align:center; padding:80px 0;">
        <div style="font-size:64px; margin-bottom:16px;">🤍</div>
        <p style="font-size:18px; font-weight:700; color:#2d1b3d; margin-bottom:8px;">
          Список избранного пуст
        </p>
        <p style="font-size:14px; color:#b09ab8; margin-bottom:28px;">
          Добавляйте понравившиеся товары, нажимая ♥
        </p>
        <router-link to="/catalog" style="text-decoration:none;">
          <button style="background:linear-gradient(90deg,#e879a0,#d4537e); color:#fff;
                         border:none; border-radius:14px; padding:12px 28px;
                         font-size:14px; font-weight:700; cursor:pointer;">
            Перейти в каталог
          </button>
        </router-link>
      </div>

      <!-- СЕТКА -->
      <div v-else>
        <p style="font-size:13px; color:#b09ab8; margin-bottom:20px;">
          {{ products.length }} {{ plural(products.length, ['товар', 'товара', 'товаров']) }} в избранном
        </p>

        <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(210px,1fr)); gap:18px;">

          <div
            v-for="product in products"
            :key="product.id"
            style="background:#fff; border-radius:22px; overflow:hidden;
                   border:1px solid #f0e6f5; transition:all .25s; cursor:pointer; position:relative;"
            @mouseover="e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='0 14px 36px rgba(212,83,126,0.13)'; e.currentTarget.style.borderColor='#f0b8db'; }"
            @mouseleave="e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.borderColor='#f0e6f5'; }"
          >

            <!-- КНОПКА УДАЛИТЬ -->
            <button
              @click="removeFromFavorites(product.id)"
              style="position:absolute; top:10px; right:10px; z-index:2;
                     width:32px; height:32px; border-radius:50%;
                     background:linear-gradient(90deg,#e879a0,#d4537e);
                     border:none; color:#fff; font-size:15px;
                     display:flex; align-items:center; justify-content:center;
                     cursor:pointer; box-shadow:0 2px 8px rgba(212,83,126,0.30);
                     transition:opacity .2s;"
              @mouseover="e => e.currentTarget.style.opacity='0.8'"
              @mouseleave="e => e.currentTarget.style.opacity='1'"
              title="Удалить из избранного"
            >
              ♥
            </button>

            <router-link :to="`/product/${product.id}`" style="text-decoration:none;">

              <!-- ФОТО -->
              <div style="height:200px; background:#fff8fc; position:relative; overflow:hidden;
                           display:flex; align-items:center; justify-content:center;">
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
                  <div style="display:flex; flex-direction:column;">
                    <span v-if="product.discount > 0"
                          style="font-size:11px; color:#d4b8e0; text-decoration:line-through;">
                      {{ Number(product.price).toLocaleString() }} ₸
                    </span>
                    <span style="font-size:16px; font-weight:900; color:#d4537e;">
                      {{ product.final_price
                          ? Number(product.final_price).toLocaleString()
                          : Number(product.price).toLocaleString() }} ₸
                    </span>
                  </div>

                  <span v-if="product.discount > 0"
                        style="font-size:10px; font-weight:800; color:#fff;
                               background:linear-gradient(90deg,#e879a0,#d4537e);
                               padding:3px 9px; border-radius:20px;">
                    -{{ product.discount }}%
                  </span>
                </div>

                <!-- КНОПКА В КОРЗИНУ -->
                <button
                  @click.prevent="addToCart(product)"
                  style="margin-top:12px; width:100%;
                         background:linear-gradient(90deg,#e879a0,#d4537e); color:#fff;
                         border:none; border-radius:12px; padding:9px;
                         font-size:12px; font-weight:700; cursor:pointer; transition:opacity .2s;"
                  @mouseover="e => e.currentTarget.style.opacity='0.85'"
                  @mouseleave="e => e.currentTarget.style.opacity='1'"
                >
                  В корзину
                </button>

              </div>
            </router-link>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Favorites',

  data() {
    return {
      products: [],
      loading: true
    }
  },

  async mounted() {
    await this.loadFavorites()
  },

  methods: {
    async loadFavorites() {
      try {
        const res = await axios.get('http://127.0.0.1:8001/api/favorites', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        this.products = res.data
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },

    async removeFromFavorites(id) {
      try {
        await axios.post(
          `http://127.0.0.1:8001/api/favorites/${id}`,
          {},
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        )
        this.products = this.products.filter(p => p.id !== id)
      } catch (e) {
        console.log(e)
      }
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

    plural(n, forms) {
      const mod10 = n % 10
      const mod100 = n % 100
      if (mod100 >= 11 && mod100 <= 19) return forms[2]
      if (mod10 === 1) return forms[0]
      if (mod10 >= 2 && mod10 <= 4) return forms[1]
      return forms[2]
    },
  }
}
</script>