<template>
  <div>
    <!-- 购物车为空 -->
    <div v-if="goodslist.length == 0" class="emtye">
      <van-row type="flex" justify="center">
        <img src="../assets/cart_empty.png" alt="" />
      </van-row>
      <van-row type="flex" justify="center">
        <p class="emp">购物车空空如也</p>
      </van-row>
      <van-row type="flex" justify="center">
        <van-button type="info" size="mini" @click="getout">去逛逛</van-button>
      </van-row>
    </div>
    <!-- 购物车有商品时 -->
    <div v-else>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-swipe-cell v-for="item in goodslist" :key="item.id">
          <van-card
            :num="item.cou"
            :price="item.sell_price"
            :title="item.title"
            :thumb="item.thumb_path"
          >
            <!-- 商品数量 -->
            <div slot="footer">
              <van-stepper v-model="item.cou" @change="changeNum" />
            </div>
          </van-card>
          <!-- 删除商品按钮 -->
          <template slot="right">
            <van-button
              square
              type="danger"
              text="删除"
              @click="deletegood(item.id)"
            />
          </template>
        </van-swipe-cell>
      </van-pull-refresh>
    </div>

    <!-- 提交按钮 -->
    <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      goodslist: [],
      total: 0,
      isLoading: false
    }
  },
  created() {
    this.getshopcarList()
  },
  computed: {
    ...mapState(['goodsList'])
  },
  watch: {
    // 商品监听器
    goodslist: function(val) {
      this.total = 0
      val.forEach(item => {
        this.total += item.sell_price * item.cou
      })
      this.total = this.total * 100
    }
  },
  methods: {
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    },
    // 通过id获取购物车商品参数
    async getshopcarList() {
      if (this.goodsList.length === 0) return
      let ids = []
      this.goodsList.forEach(item => {
        ids.push(item.id)
      })
      const { data: res } = await this.$http.get(
        '/api/goods/getshopcarlist/' + ids.join(',')
      )
      if (res.status !== 0) {
        return this.$toast.fail('获取商品参数失败')
      }
      this.goodslist = res.message
    },
    // 根据id删除商品
    deletegood(id) {
      const index = this.goodslist.findIndex(item => item.id === id)
      this.goodslist.splice(index, 1)
    },
    // 获取商品总价
    changeNum() {
      this.total = 0
      this.goodslist.forEach(item => {
        this.total += item.sell_price * item.cou
      })
      this.total = this.total * 100
    },
    // 提交按钮
    onSubmit() {},
    // 返回商品列表
    getout() {
      this.$router.push('/goods/list')
    }
  }
}
</script>

<style lang="less" scoped>
.van-card {
  background-color: transparent !important;
}
.van-pull-refresh {
  padding: 50px 0 500px 0;
}
img {
  width: 100px;
}
.emtye {
  padding-top: 50px;
  text-align: center;
}
.emp {
  color: #ccc;
}
</style>
