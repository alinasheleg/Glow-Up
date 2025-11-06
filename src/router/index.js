import { createRouter, createWebHistory } from 'vue-router'

// Импорты страниц
import Home from '../views/Home.vue'
import Sales from '../views/Sales.vue'
import New from '../views/New.vue'
import Catalog from '../views/Catalog.vue'
import Delivery from '../views/Delivery.vue'
import Payment from '../views/Payment.vue'
import About from '../views/About.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/sales', name: 'Sales', component: Sales },
  { path: '/new', name: 'New', component: New },
  { path: '/catalog', name: 'Catalog', component: Catalog },
  { path: '/delivery', name: 'Delivery', component: Delivery },
  { path: '/payment', name: 'Payment', component: Payment },
  { path: '/about', name: 'About', component: About }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
