import Vue from 'vue'
import { Button, NavBar, Tabbar, TabbarItem, Grid, GridItem, Swipe, SwipeItem, Lazyload, Image } from 'vant'

Vue.use(Button)
Vue.use(NavBar)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload, {
  lazyComponent: true
})
Vue.use(Image)
