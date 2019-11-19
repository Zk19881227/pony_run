<template>
  <div id="app">
    <!-- 头部标题及返回 -->
    <van-nav-bar v-if="this.$route.path === '/home' ? true : false" title="标题" />
    <van-nav-bar
      v-else-if="this.$route.path === '/search' ? true : false"
      title="标题"
      left-text="返回"
      right-text="添加"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-nav-bar v-else title="标题" left-text="返回" left-arrow @click-left="onClickLeft" />

    <!-- 子组件展示区 -->
    <router-view></router-view>

    <!-- 底部导航 -->
    <van-tabbar v-model="active">
      <van-tabbar-item name="home" icon="home-o" route to="/home">首页</van-tabbar-item>
      <van-tabbar-item name="member" icon="friends-o" route to="/member">会员</van-tabbar-item>
      <van-tabbar-item name="shop_cart" icon="cart-o" info="5" route to="/shopcart">购物车</van-tabbar-item>
      <van-tabbar-item name="search" icon="search" route to="/search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      isShow: false,
      hash: ''
    }
  },
  created() {
    this.getCartNum()
    this.getHash()
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    getCartNum() {},
    getHash() {
      this.hash = window.location.hash.slice(1)
      console.log(this.hash)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
