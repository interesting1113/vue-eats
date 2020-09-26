import Vue from 'vue'
import VueRouter from 'vue-router'
import Goods from '@/components/goods/Goods'
import Ratings from '@/components/ratings/Ratings'
import Seller from '@/components/seller/Seller'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: Goods,
      component: Goods
    },
    {
      path: '/ratings',
      name: Ratings,
      component: Ratings
    },
    {
      path: '/seller',
      name: Seller,
      component: Seller
    }
  ],
  linkActiveClass: 'active'
})

export default router
