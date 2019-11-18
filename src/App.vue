<template>
  <div id="app">
    <!-- 头部标题及返回 -->
    <!-- 首页暂未去除返回左上返回按钮 -->
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- 子组件展示区 -->
    <router-view></router-view>

    <!-- 底部导航 -->
    <van-tabbar v-model="active">
      <van-tabbar-item name="home" icon="home-o" route to="/home"
        >首页</van-tabbar-item
      >
      <van-tabbar-item name="member" icon="friends-o" route to="/member"
        >会员</van-tabbar-item
      >
      <van-tabbar-item name="shop_cart" icon="cart-o" route to="/shopcart"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item name="search" icon="search" route to="/search"
        >搜索</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      isShow: false
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>

<style></style>
