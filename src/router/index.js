import { createRouter, createWebHistory } from 'vue-router'

// Pages
import Home from '../views/Home.vue'
import Catalog from '../views/Catalog.vue'
import Sales from '../views/Sales.vue'
import New from '../views/New.vue'
import Delivery from '../views/Delivery.vue'
import Payment from '../views/Payment.vue'
import About from '../views/About.vue'
import Favorites from '@/views/Favorites.vue'
import Cart from '../views/Cart.vue'

import CategoryBodycare from '../views/CategoryBodycare.vue'
import CategoryHaircare from '../views/CategoryHaircare.vue'
import CategoryMakeup from '../views/CategoryMakeup.vue'
import CategoryMen from '../views/CategoryMen.vue'
import CategoryPerfume from '../views/CategoryPerfume.vue'
import CategorySkincare from '../views/CategorySkincare.vue'

import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

import Checkout from '../views/Checkout.vue'

import BecomePartner from '../views/BecomePartner.vue'
import Partner from '../views/Partner.vue'
import PartnerLogin from '@/views/PartnerLogin.vue'
import PartnerRegister from '@/views/PartnerRegister.vue'

import ProductDetails from '@/views/ProductDetails.vue'

import Banned from '@/views/Banned.vue'

import PartnerPending from '@/views/PartnerPending.vue'

import i18n from '../i18n'

// ROUTES
const routes = [

  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/catalog',
    name: 'Catalog',
    component: Catalog
  },

  {
    path: '/sales',
    name: 'Sales',
    component: Sales
  },

  {
    path: '/new',
    name: 'New',
    component: New
  },

  {
    path: '/delivery',
    name: 'Delivery',
    component: Delivery
  },

  {
    path: '/payment',
    name: 'Payment',
    component: Payment
  },

  {
    path: '/about',
    name: 'About',
    component: About
  },

  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },

  {
    path: '/categoryBodycare',
    name: 'CategoryBodycare',
    component: CategoryBodycare
  },

  {
    path: '/categoryHaircare',
    name: 'CategoryHaircare',
    component: CategoryHaircare
  },

  {
    path: '/categoryMakeup',
    name: 'CategoryMakeup',
    component: CategoryMakeup
  },

  {
    path: '/categoryMen',
    name: 'CategoryMen',
    component: CategoryMen
  },

  {
    path: '/categoryPerfume',
    name: 'CategoryPerfume',
    component: CategoryPerfume
  },

  {
    path: '/categorySkincare',
    name: 'CategorySkincare',
    component: CategorySkincare
  },

  {
    path: '/profile',
    name: 'Profile',
    component: Profile,

    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,

    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  {
    path: '/register',
    name: 'Register',
    component: Register
  },

  {
    path: '/becomePartner',
    name: 'PartnerBecome',
    component: BecomePartner
  },

  {
    path: '/partner',
    name: 'Partner',
    component: Partner
  },

  {
    path: '/partner-login',
    name: 'PartnerLogin',
    component: PartnerLogin
  },

  {
    path: '/partner-register',
    name: 'PartnerRegister',
    component: PartnerRegister
  },

  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails
  },

  {
  path: '/banned',
  name: 'Banned',
  component: Banned
},

{
  path: '/partner-pending',
  name: 'PartnerPending',
  component: PartnerPending
}

]

// ROUTER
const router = createRouter({
  history: createWebHistory(),
  routes
})

// AUTH GUARD
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const partnerAuth = localStorage.getItem('partnerAuth')

  if (to.meta.requiresAuth && !token && !partnerAuth) {
    next('/login')
    return
  }

  // редирект только для обычных юзеров
  if (token && !partnerAuth && (to.path === '/login' || to.path === '/register')) {
    next('/profile')
    return
  }

  // редирект для партнёров
  if (partnerAuth && to.path === '/partner-login') {
    next('/profile')
    return
  }

  next()

  router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const partnerAuth = localStorage.getItem('partnerAuth')

  // 🔥 синхронизация языка
  const savedLang = localStorage.getItem('lang')
  if (savedLang) {
    i18n.global.locale = savedLang
  }

  if (to.meta.requiresAuth && !token && !partnerAuth) {
    next('/login')
    return
  }

  if (token && !partnerAuth && (to.path === '/login' || to.path === '/register')) {
    next('/profile')
    return
  }

  if (partnerAuth && to.path === '/partner-login') {
    next('/profile')
    return
  }

  next()
})
})

export default router 