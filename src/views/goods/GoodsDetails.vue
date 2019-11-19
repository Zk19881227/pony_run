<template>
  <div class="add">
    <!-- 轮播图区域-->
    <div class="swiper">
      <van-swipe :autoplay="2500">
        <van-swipe-item v-for="(item,index) in images" :key="index">
          <van-image :src="item.src" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="van-multi-ellipsis--l2" :model="getList">
      <div class="title sell">{{getList.title}}</div>
      <div class="market sell">
        <span>
          市场价:
          <del>￥{{getList.market_price}}</del>
        </span>
        <span>
          销售价:
          <i>￥ {{getList.sell_price}}</i>
        </span>
      </div>
      <!-- 购买数量 -->
      <div class="integer">
        购买数量：
        <van-stepper v-model="value" integer class="stepper" @change="changeNum" />
      </div>
      <!-- 购物车 -->
      <div class="info">
        <van-button type="info">点击购买</van-button>
        <div class="danger"></div>
        <van-button type="danger" @click="onClickButton">加入购物车</van-button>
      </div>
    </div>
    <!-- 商品信息 -->
    <div class="Tab" :model="getList">
      <div class="Tabs">商品参数</div>
      <div class="quantity">
        <p>商品货号：{{getList.goods_no}}</p>
        <p>库存情况：{{getList.stock_quantity}}件</p>
        <p>上架时间：{{getList.add_time}}</p>
      </div>
    </div>
    <!-- 图文评论 -->
    <div>
      <van-button size="large" class="Row">图文介绍</van-button>
      <van-button size="large" class="Rows">商品评论</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: {},
      getList: [],
      value: 1,
      count: 1,
      TadForm: false,
      carInfo: []
    }
  },
  created() {
    this.Details()
    this.getCarInfo()
  },
  methods: {
    async Details() {
      const { data: res } = await this.$http.get(`http://www.liulongbin.top:3005/api/getthumimages/${this.$route.params.id}`)
      this.images = res.message
      const { data: arr } = await this.$http.get(`http://www.liulongbin.top:3005/api/goods/getinfo/88${this.$route.params.id}`)
      this.getList = arr.message[0]
    },
    onClickButton() {
      this.TadForm = true
      const obj = {
        id: this.getList.id,
        count: this.count,
        price: this.getList.sell_price,
        isChecked: this.TadForm
      }
      let flag = true
      this.carInfo.forEach(item => {
        if (item.id === this.getList.id) {
          item.count += this.count
          flag = false
        }
      })
      console.log(flag)
      if (flag) {
        console.log(obj)
        this.carInfo.push(obj)
      }
      window.localStorage.carInfo = JSON.stringify(this.carInfo)
      this.$toast({
        icon: 'success',
        message: '商品添加成功'
      })
    },
    getCarInfo() {
      this.carInfo = JSON.parse(window.localStorage.carInfo)
    },
    changeNum() {
      this.count = this.value
    }
  }
}
</script>

<style>
.add {
  padding: 0 10px;
  height: 850px;
}
.swiper {
  height: 230px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin: 15px 0 10px;
}
.van-swipe-item {
  text-align: center;
}
.van-swipe {
  height: 187px;
  vertical-align: middle;
  position: relative;
}
.van-image {
  width: 200px;
  height: 200px;
  display: block;
}
.van-multi-ellipsis--l2 {
  border: 1px solid #ccc;
}
.title {
  margin: 0 15px;
  border-bottom: 1px solid #ccc;
}
.market {
  margin: 0 16px;
  color: #8f8f94;
}
span {
  font-size: 14px;
  margin-left: 10px;
}
i {
  font-style: normal;
  font-size: 16px;
  color: red;
  font-weight: 700;
}
.sell {
  margin-top: 15px;
}
.info {
  margin: 5px 20px 15px;
}
.stepper {
  display: inline;
}
.integer {
  color: #8f8f94;
  margin: 15px 25px;
}
.danger {
  width: 15px;
  display: inline-block;
}
.Tab {
  margin: 10px 0;
  border: 1px solid #ccc;
}
.Tabs {
  margin: 0 15px;
  padding: 8px 0;
  border-bottom: 1px solid #ccc;
  font-size: 17px;
}
.Rows {
  border: 1px solid #e23232 !important;
  color: #e23232 !important;
}
.quantity {
  color: #8f8f94;
  margin: 15px 25px;
}
.Row {
  margin-bottom: 10px !important;
  border: 1px solid #2981e6 !important;
  color: #2981e6 !important;
}
</style>
