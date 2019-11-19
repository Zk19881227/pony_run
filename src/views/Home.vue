<template>
  <div>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item
        v-for="(image, index) in images"
        :key="index"
        @click="jumpToDetails(image.url)"
      >
        <img class="imgSize" v-lazy="image.img" />
      </van-swipe-item>
    </van-swipe>

    <!-- 主菜单 -->
    <div class="menu_icon">
      <van-grid clickable :column-num="3" :border="false">
        <van-grid-item class="nav_icon" icon="location-o" text="新闻资讯" to="/newslist">
          <img class="nav_icon" src="../assets/home_menu_icon/menu1.png" alt />
          <p class="nav_icon_title">新闻资讯</p>
        </van-grid-item>
        <van-grid-item class="nav_icon" icon="location-o" text="图片分享" to="/photosharing/list">
          <img class="nav_icon" src="../assets/home_menu_icon/menu2.png" alt />
          <p class="nav_icon_title">图片分享</p>
        </van-grid-item>
        <van-grid-item class="nav_icon" icon="photo-o" text="商品购买" to="/goods/list">
          <img class="nav_icon" src="../assets/home_menu_icon/menu3.png" alt />
          <p class="nav_icon_title">商品购买</p>
        </van-grid-item>
      </van-grid>
      <van-grid clickable :column-num="3" :border="false">
        <van-grid-item class="nav_icon" icon="location-o" text="留言反馈" to="/messageboard">
          <img class="nav_icon" src="../assets/home_menu_icon/menu4.png" alt />
          <p class="nav_icon_title">留言反馈</p>
        </van-grid-item>
        <van-grid-item class="nav_icon" icon="location-o" text="视频专区" to="/vedios">
          <img class="nav_icon" src="../assets/home_menu_icon/menu5.png" alt />
          <p class="nav_icon_title">视频专区</p>
        </van-grid-item>
        <van-grid-item class="nav_icon" icon="photo-o" text="联系我们" to="/link">
          <img class="nav_icon" src="../assets/home_menu_icon/menu6.png" alt />
          <p class="nav_icon_title">联系我们</p>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      isShow: false,
      images: []
    }
  },
  created() {
    this.getPicList()
  },
  methods: {
    // 头部导航栏返回
    onClickLeft() {
      this.$router.go(-1)
    },
    async getPicList() {
      const { data: res } = await this.$http.get(
        'http://www.liulongbin.top:3005/api/getlunbo'
      )
      this.images = res.message
      console.log(this.images)
    },
    jumpToDetails(url) {}
  }
}
</script>

<style>
.imgSize {
  width: 100%;
  height: 200px;
}
.menu_icon {
  margin-top: 20px;
}
.nav_icon {
  width: 60px;
}
.nav_icon_title {
  font-size: 14px;
}
</style>
