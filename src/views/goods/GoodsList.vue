<template>
  <!-- 下拉刷新 -->
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <!-- 列表加载 -->
    <van-list v-model="loading" :finished="finished" @load="onLoad" :offset="10">
      <!-- 循环渲染商品列表 -->
      <div class="van-cell_value" v-for="item in list" :key="item.id" @click="handleRoadDetail(item.id)">
        <div class="van-image">
          <img v-lazy="item.img_url" alt="" />
        </div>
        <p>{{ item.title }}</p>
        <div class="bottom_box">
          <div>
            <span>￥{{ item.sell_price }}</span>
            <s>￥{{ item.market_price }}</s>
          </div>
          <div>
            <span>热卖中</span>
            <span>剩{{ item.stock_quantity }}件</span>
          </div>
        </div>
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<script>
export default {
  data() {
    return {
      message: {
        query: '',
        number: 1
      },

      // 商品列表
      list: [],

      // 控制 上拉加载 的加载动画
      loading: false,

      // 控制在页面往下移动到底部时是否调用接口获取数据
      finished: false,

      // 控制 下拉刷新 的加载动画
      isLoading: false,

      // 滚动条与底部距离小于 offset 时触发load事件
      offset: 80
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    // 获取商品列表
    async getGoodsList() {
      const { data: res } = await this.$http.get(`http://www.liulongbin.top:3005/api/getgoods?pageindex=${this.message.number}`, {
        params: this.message.pageindex
      })
      // console.log(res.message)
      this.list = res.message
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.finished = false
        this.list = []
        this.message.number = 1
        this.getGoodsList()
        // this.onLoad()
      }, 500)
    },

    // 上拉加载
    async onLoad() {
      const { data: res } = await this.$http.get(`http://www.liulongbin.top:3005/api/getgoods?pageindex=${this.message.number}`, {
        params: this.message.pageindex
      })
      res.message = this.list
      if (res.status === 0) {
        setTimeout(async () => {
          this.loading = true

          // if (this.list.length >= res.message.length) {
          //   this.finished = true
          // }
          this.message.number += 1
          const { data: res } = await this.$http.get(`http://www.liulongbin.top:3005/api/getgoods?pageindex=${this.message.number}`, {
            params: this.message.pageindex
          })
          // this.loading = false
          // 把服务器第一页和第二页的数据通过...(拓展运算符)合并为一个新数组,赋值给列表数组
          this.list = [...this.list, ...res.message]
          // console.log(this.list)
          if (this.list.length >= res.message.length) {
            this.finished = true
          }
        }, 500)
      }
      console.log(res.status)
      return false
    },

    // 跳转详情页
    handleRoadDetail(id) {
      this.$router.push(`/goods/details/${id}`)
      console.log(`/goods/details/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.van-list {
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin: 5px 10px;
}

.van-cell_value {
  flex: 1;
  background: #fff;
  border: 1px solid #ccc;
  margin: 10px 5px;
  padding: 0;
  color: #323233;
  text-align: center;
  vertical-align: middle;
}

.van-image {
  padding: 10px;
}

.van-image img {
  display: block;
  width: 100%;
  height: 100%;
}

.van-cell_value p {
  overflow: hidden;
  text-overflow: ellipsis;
  height: 49px;
  padding: 4px 10px;
  font-size: 14px;
  color: #000;
  text-align: left;
}

.bottom_box {
  width: 100%;
  background: #eee;
  padding: 5px 0;
}

.bottom_box div:first-child {
  text-align: left;
  padding: 0 10px;
}

.bottom_box div:first-child span:first-child {
  font-size: 16px;
  color: red;
  margin-right: 15px;
}

.bottom_box s {
  font-weight: 400;
  font-size: 14px;
}

.bottom_box div:nth-child(2) {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}

.bottom_box span {
  font-size: 14px;
  color: #323233;
  text-align: center;
}
</style>
