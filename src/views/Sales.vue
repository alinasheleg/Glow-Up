<template>
  <div style="min-height:100vh; background:#faf8fc;">
    <div style="max-width:1280px; margin:0 auto; padding:40px 28px;">

      <div style="margin-bottom:32px;">
        <h1 style="font-size:30px; font-weight:900; color:#2d1b3d; margin-bottom:5px;">
          Акции и скидки
        </h1>
        <p style="font-size:14px; color:#b09ab8;">Специальные предложения для вас</p>
      </div>

      <div v-if="loading" style="text-align:center; color:#d4b8e0; padding:80px 0; font-size:16px;">
        Загрузка...
      </div>

      <div v-else-if="!promotions.length" style="text-align:center; color:#d4b8e0; padding:80px 0;">
        Акций пока нет
      </div>

      <div v-else>
        <div v-for="(promo, idx) in promotions" :key="promo.id" style="margin-bottom:52px;">

          <!-- БАННЕР -->
          <div :style="bannerWrap(idx)">

            <div :style="orb1Style(idx)"></div>
            <div :style="orb2Style(idx)"></div>

            <div style="z-index:1; flex:1;">

              <div :style="tagStyle(idx)">
                <span :style="{ width:'5px', height:'5px', borderRadius:'50%', background:dotColor(idx), display:'inline-block' }"></span>
                Горячее предложение
              </div>

              <h2 :style="{ fontSize:'40px', fontWeight:'900', lineHeight:'1.1', color:titleColor(idx), margin:'14px 0 11px' }">
                {{ promo.title }}
              </h2>

              <p v-if="promo.description"
                 :style="{ fontSize:'14px', color:descColor(idx), maxWidth:'400px', lineHeight:'1.7', marginBottom:'18px' }">
                {{ promo.description }}
              </p>

              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <span :style="pillStyle(idx)">📦 {{ promo.category }}</span>
                <span v-if="promo.products" :style="pillStyle(idx)">{{ promo.products.length }} товаров</span>
              </div>
            </div>

            <div :style="badgeWrap(idx)">
              <span :style="{ fontSize:'10px', fontWeight:'600', textTransform:'uppercase', letterSpacing:'1px', color:badgeLbl(idx) }">скидка</span>
              <span :style="{ fontSize:'62px', fontWeight:'900', lineHeight:'1', color:titleColor(idx) }">{{ promo.discount }}</span>
              <span :style="{ fontSize:'22px', fontWeight:'700', color:badgeLbl(idx), marginTop:'-4px' }">%</span>
            </div>
          </div>

          <!-- ЛЕЙБЛ -->
          <p style="font-size:11px; font-weight:700; color:#d4b8e0; text-transform:uppercase; letter-spacing:1.2px; margin-bottom:14px;">
            Товары со скидкой
          </p>

          <div v-if="promo.loadingProducts" style="color:#d4b8e0; padding:16px 0; font-size:13px;">
            Загрузка товаров...
          </div>

          <div v-else-if="promo.products && !promo.products.length" style="color:#d4b8e0; font-size:13px; padding:12px 0;">
            В этой категории пока нет товаров
          </div>

          <!-- СЕТКА -->
          <div v-else-if="promo.products"
               style="display:grid; grid-template-columns:repeat(auto-fill, minmax(185px,1fr)); gap:14px;">
            <router-link
              v-for="product in promo.products"
              :key="product.id"
              :to="`/product/${product.id}`"
              style="text-decoration:none;"
            >
              <div
                style="background:#fff; border-radius:20px; overflow:hidden; border:1px solid #f0e6f5; transition:all .25s; cursor:pointer;"
                @mouseover="e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow=cardShadow(idx); e.currentTarget.style.borderColor=cardHoverBorder(idx); }"
                @mouseleave="e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.borderColor='#f0e6f5'; }"
              >
                <div :style="cardImgWrap(idx)">
                  <img
                    v-if="product.image"
                    :src="`http://127.0.0.1:8001/storage/${product.image}`"
                    :alt="product.title || product.name"
                    style="width:100%; height:100%; object-fit:cover; transition:transform .3s;"
                    @mouseover="e => e.target.style.transform='scale(1.06)'"
                    @mouseleave="e => e.target.style.transform='scale(1)'"
                  />
                  <span v-else style="font-size:46px;">🛍️</span>

                  <div :style="cardBadge(idx)">-{{ promo.discount }}%</div>
                </div>

                <div style="padding:12px 14px 14px;">
                  <p style="font-size:12px; font-weight:600; color:#2d1b3d; line-height:1.45; margin-bottom:3px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
                    {{ product.title || product.name }}
                  </p>
                  <p v-if="product.brand" style="font-size:10px; color:#d4b8e0; margin-bottom:8px;">{{ product.brand }}</p>
                  <div style="display:flex; align-items:baseline; gap:5px;">
                    <span :style="{ fontSize:'14px', fontWeight:'800', color:titleColor(idx) }">
                      {{ discounted(product.price, promo.discount) }} ₸
                    </span>
                    <span style="font-size:10px; color:#d4b8e0; text-decoration:line-through;">
                      {{ Number(product.price).toLocaleString() }} ₸
                    </span>
                  </div>
                </div>
              </div>
            </router-link>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
const P = [
  {
    banner:   'linear-gradient(135deg,#fce8f3 0%,#f9d6ec 60%,#f5c6e4 100%)',
    border:   '#f0b8db',
    title:    '#c5245a',
    desc:     '#c06080',
    tagBg:    'rgba(212,83,126,0.10)',
    tagClr:   '#d4537e',
    dot:      '#e879a0',
    pillBg:   'rgba(212,83,126,0.08)',
    pillClr:  '#d4537e',
    badgeBg:  'rgba(212,83,126,0.10)',
    badgeBdr: 'rgba(212,83,126,0.28)',
    badgeLbl: 'rgba(181,32,78,0.45)',
    cardBg:   '#fff8fc',
    cardBadge:'linear-gradient(90deg,#e879a0,#d4537e)',
    hoverBdr: '#f0b8db',
    hoverShd: '0 12px 32px rgba(212,83,126,0.13)',
    orb1:     'rgba(212,83,126,0.09)',
    orb2:     'rgba(240,180,210,0.12)',
  },
  {
    banner:   'linear-gradient(135deg,#ede8ff 0%,#e0d6ff 60%,#d4c8ff 100%)',
    border:   '#c9b8f5',
    title:    '#6d28d9',
    desc:     '#7c5cbf',
    tagBg:    'rgba(124,58,237,0.09)',
    tagClr:   '#7c3aed',
    dot:      '#a78bfa',
    pillBg:   'rgba(124,58,237,0.08)',
    pillClr:  '#7c3aed',
    badgeBg:  'rgba(124,58,237,0.09)',
    badgeBdr: 'rgba(124,58,237,0.25)',
    badgeLbl: 'rgba(91,33,182,0.45)',
    cardBg:   '#f9f7ff',
    cardBadge:'linear-gradient(90deg,#a78bfa,#7c3aed)',
    hoverBdr: '#c9b8f5',
    hoverShd: '0 12px 32px rgba(124,58,237,0.12)',
    orb1:     'rgba(124,58,237,0.08)',
    orb2:     'rgba(167,139,250,0.10)',
  },
  {
    banner:   'linear-gradient(135deg,#ffeef6 0%,#ffdcee 60%,#ffcce5 100%)',
    border:   '#ffb3d1',
    title:    '#be185d',
    desc:     '#b05070',
    tagBg:    'rgba(219,39,119,0.09)',
    tagClr:   '#db2777',
    dot:      '#f472b6',
    pillBg:   'rgba(219,39,119,0.08)',
    pillClr:  '#db2777',
    badgeBg:  'rgba(219,39,119,0.09)',
    badgeBdr: 'rgba(219,39,119,0.25)',
    badgeLbl: 'rgba(157,23,77,0.45)',
    cardBg:   '#fff8fb',
    cardBadge:'linear-gradient(90deg,#f472b6,#db2777)',
    hoverBdr: '#ffb3d1',
    hoverShd: '0 12px 32px rgba(219,39,119,0.12)',
    orb1:     'rgba(219,39,119,0.08)',
    orb2:     'rgba(244,114,182,0.10)',
  },
]

export default {
  name: 'Sales',
  data() { return { promotions: [], loading: true } },
  async mounted() { await this.fetchPromotions() },
  methods: {
    c(idx) { return P[idx % P.length] },

    bannerWrap(idx) {
      const c = this.c(idx)
      return { borderRadius:'28px', padding:'42px 52px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'24px', marginBottom:'20px', position:'relative', overflow:'hidden', background:c.banner, border:`1px solid ${c.border}` }
    },
    orb1Style(idx) {
      return { position:'absolute', width:'300px', height:'300px', borderRadius:'50%', background:`radial-gradient(circle,${this.c(idx).orb1} 0%,transparent 70%)`, top:'-90px', right:'100px', pointerEvents:'none' }
    },
    orb2Style(idx) {
      return { position:'absolute', width:'150px', height:'150px', borderRadius:'50%', background:`radial-gradient(circle,${this.c(idx).orb2} 0%,transparent 70%)`, bottom:'-50px', left:'190px', pointerEvents:'none' }
    },
    tagStyle(idx) {
      const c = this.c(idx)
      return { display:'inline-flex', alignItems:'center', gap:'6px', background:c.tagBg, color:c.tagClr, fontSize:'10px', fontWeight:'700', letterSpacing:'1.4px', textTransform:'uppercase', padding:'5px 13px', borderRadius:'20px', marginBottom:'14px' }
    },
    pillStyle(idx) {
      const c = this.c(idx)
      return { background:c.pillBg, color:c.pillClr, fontSize:'11px', padding:'4px 12px', borderRadius:'20px' }
    },
    badgeWrap(idx) {
      const c = this.c(idx)
      return { flexShrink:'0', zIndex:'1', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'140px', height:'140px', borderRadius:'22px', background:c.badgeBg, border:`1.5px solid ${c.badgeBdr}` }
    },
    cardImgWrap(idx) {
      return { height:'170px', background:this.c(idx).cardBg, position:'relative', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }
    },
    cardBadge(idx) {
      return { position:'absolute', top:'9px', left:'9px', background:this.c(idx).cardBadge, color:'#fff', fontSize:'10px', fontWeight:'800', padding:'3px 9px', borderRadius:'20px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)' }
    },

    titleColor(idx)     { return this.c(idx).title },
    descColor(idx)      { return this.c(idx).desc },
    dotColor(idx)       { return this.c(idx).dot },
    badgeLbl(idx)       { return this.c(idx).badgeLbl },
    cardShadow(idx)     { return this.c(idx).hoverShd },
    cardHoverBorder(idx){ return this.c(idx).hoverBdr },

    async fetchPromotions() {
      try {
        const res = await fetch('http://127.0.0.1:8001/api/promotions')
        const list = await res.json()
        this.promotions = list.map(p => ({ ...p, products: null, loadingProducts: false }))
        this.loading = false
        this.promotions.forEach((_, i) => this.fetchProducts(i))
      } catch (e) { this.loading = false }
    },
    async fetchProducts(index) {
      this.promotions[index] = { ...this.promotions[index], loadingProducts: true }
      try {
        const res = await fetch(`http://127.0.0.1:8001/api/promotions/${this.promotions[index].id}`)
        const data = await res.json()
        this.promotions[index] = { ...this.promotions[index], products: data.products, loadingProducts: false }
      } catch (e) {
        this.promotions[index] = { ...this.promotions[index], products: [], loadingProducts: false }
      }
    },
    discounted(price, discount) {
      return Math.round(price * (1 - discount / 100)).toLocaleString()
    },
  },
}
</script>