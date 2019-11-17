<template>
  <div>
    <!-- 主菜单 -->
    <van-grid clickable :column-num="3" :border="false">
      <van-grid-item icon="location-o" text="新闻资讯" to="/newslist"/>
      <van-grid-item icon="photo-o" text="图片分享"  to="/photosharing/list"/>
      <van-grid-item icon="photo-o" text="商品购买"  to="/goods/list"/>
    </van-grid>
    <van-grid clickable :column-num="3" :border="false">
      <van-grid-item icon="photo-o" text="留言反馈"  to="/messageboard"/>
      <van-grid-item icon="photo-o" text="视频专区"  to="/vedios"/>
      <van-grid-item icon="photo-o" text="联系我们"  to="/link"/>
    </van-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      isShow: false
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
</style>
