import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Member from '../views/Member.vue'
import ShopCart from '../views/ShopCart.vue'
import Search from '../views/Search.vue'
import NewsList from '../views/news/NewsList.vue'
import NewsDetails from '../views/news/NewsDetails.vue'
import PhotoSharingList from '../views/photo_sharing/PhotoSharingList.vue'
import PhotoSharingDetails from '../views/photo_sharing/PhotoSharingDetails.vue'
import GoodsList from '../views/goods/GoodsList.vue'
import GoodsDetails from '../views/goods/GoodsDetails.vue'
import MessageBoard from '../views/MessageBoard.vue'
import Vedios from '../views/Vedios.vue'
import Link from '../views/Link.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/member', component: Member },
  { path: '/shopcart', component: ShopCart },
  { path: '/search', component: Search },
  { path: '/newslist', component: NewsList },
  { path: '/news/details/:id', component: NewsDetails },
  { path: '/photosharing/list', component: PhotoSharingList },
  { path: '/photosharing/details', component: PhotoSharingDetails },
  { path: '/goods/list', component: GoodsList },
  { path: '/goods/details/:id', component: GoodsDetails },
  { path: '/messageboard', component: MessageBoard },
  { path: '/vedios', component: Vedios },
  { path: '/link', component: Link }
]

const router = new VueRouter({
  routes
})

export default router
