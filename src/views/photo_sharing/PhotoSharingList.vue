<template>
  <div>
    <!-- tab切换区域 -->
    <van-tabs v-model="active" animated @click="toggleTab">
      <van-tab v-for="item in message" :title="item.title" :key="item.id">
        <!-- 图片列表 -->
        <ul class="img_list">
          <li
            v-for="item in picList"
            :key="item.id"
            @click="goDetails(item.id)"
          >
            <img class="van-image__img" v-lazy="item.img_url" />
            <div class="botInfo">
              <p>{{ item.title }}</p>
              <p>{{ item.zhaiyao.slice(0, 50) + '...' }}</p>
            </div>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 分类数据
      message: [],
      active: 0,
      // 分类Id
      cateId: '',
      // 列表数据
      picList: []
    }
  },
  created() {
    this.getPhotoList()
    this.getAllList()
  },
  methods: {
    // 获取图片列表页面上面的分类信息数据
    async getPhotoList() {
      const { data: res } = await this.$http.get(
        `http://www.liulongbin.top:3005/api/getimgcategory`
      )
      // console.log(res)
      // 向 message 数组中，使用 unshift 方法手动添加"全部"对象
      res.message.unshift({ title: '全部', id: 0 })
      this.message = res.message
    },

    // 点击首页图片分享进入列表后直接获取“全部”选项所有数据
    async getAllList() {
      const { data: res } = await this.$http.get(
        'http://www.liulongbin.top:3005/api/getimages/0'
      )
      this.picList = res.message
    },

    // 获取点击首页上的“图片分享”后进入到的列表数据
    async toggleTab(index) {
      this.cateId = this.message[index].id
      const { data: res } = await this.$http.get(
        'http://www.liulongbin.top:3005/api/getimages/' + this.cateId
      )
      this.picList = res.message
      // console.log(this.picList)
    },

    // 点击图片跳转到对应的图片详情
    goDetails(id) {
      // 通过编程式导航跳转到对应图片id的图片详情
      this.$router.push('/api/getthumimages/' + id)
    }
  }
}
</script>

<style scoped>
.img_list {
  padding: 0 10px;
}

.van-image__img {
  display: block;
  width: 100%;
  height: 100%;
}

.img_list li {
  width: 100%;
  margin: 10px 0;
  border-radius: 5px;
  overflow: hidden;
  height: 300px;
  min-height: 200px;
  position: relative;
}

.img_list li .botInfo {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  padding: 0 10px;
  height: 75px;
}

.img_list li .botInfo p {
  margin: 8px 10px 0 0;
  font-size: 12px;
}

img {
  object-fit: cover!important;
}
</style>
