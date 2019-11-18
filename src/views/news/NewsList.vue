<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        :offset="300"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in newslist"
          :key="item.id"
          @click="goNewsDetails(item.id)"
        >
          <div class="box">
            <div class="pic"><img :src="item.img_url" alt="" /></div>
            <div class="tt">
              <div class="title">{{ item.title }}</div>
              <div class="content">
                <div class="time">发布时间： {{ item.add_time }}</div>
                <div class="click">点击： {{ item.click }}</div>
              </div>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newslist: [],
      loading: false, // 是否处于加载状态
      finished: false, // 是否已加载完所有数据
      isLoading: false, // 是否处于下拉刷新状态
      pageNumber: 0
    }
  },
  created() {
    this.getNewsList()
  },
  methods: {
    // 获取图文列表页面的数据
    async getNewsList() {
      const { data: res } = await this.$http.get(
        `http://www.liulongbin.top:3005/api/getnewslist`
      )
      console.log(res)
      if (res.message.length >= 10) {
        for (let i = 0; i < 10; i++) {
          this.newslist.push(res.message[i])
        }
        this.loading = false
      } else {
        this.newslist.push(res.message)
      }
    },
    goNewsDetails(id) {
      this.$router.push(`/news/details/${id}`)
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.finished = false
        this.newslist = []
        this.getNewsList()
        this.onLoad()
      }, 500)
    },
    // 上拉加载
    async onLoad() {
      this.pageNumber += 1
      const { data: res } = await this.$http.get(
        `http://www.liulongbin.top:3005/api/getnewslist`
      )
      
      if (res.status === 0) {
        // this.loading = true
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.newslist.push(res.message[i])
          }
          this.loading = false
          if (this.newslist.length >= res.message.length) {
            this.finished = true
          }
        }, 500)
      }
    }
  }
}
</script>

<style scoped>
.van-cell {
  padding: 0;
}

.van-list {
  margin-bottom: 70px;
}

.box {
  border-bottom: 1px solid #eee;
  margin: 0 10px;
  padding: 10px;
  height: 68px;
  color: #323233;
  box-sizing: border-box;
  display: flex;
}
.pic {
  flex: 0 0 42px;
  width: 42px;
  height: 42px;
  display: inline-block;
  padding-right: 10px;
  vertical-align: middle;
}
img {
  display: block;
  width: 100%;
  height: 100%;
}

.tt {
  flex: 1;
  flex-direction: column;
  display: inline-block;
}

.title {
  max-height: 32px;
  height: 17px;
  line-height: 17px;
  font-weight: 700;
}
.content {
  height: 30px;
  line-height: 30px;
}
.time {
  color: #226aff;
  font-size: 12px;
  float: left;
}

.click {
  float: right;
  font-size: 12px;
  color: #226aff;
}
</style>
