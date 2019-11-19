<template>
  <!-- 主体区域 -->
  <div class="detailContiner" style="margin-bottom:50px;">
    <!-- 新闻标题区域 -->
    <header class="blue">
      <h1>{{ details.title }}</h1>
      <!-- 发表时间及点击量 -->
      <div class="time_click">
        <span>{{ details.add_time | dateFormat }}</span>
        <span>点击次数:{{ details.click }}</span>
      </div>
    </header>
    <!-- 文章详情区域 -->
    <main v-html="details.content">{{ details.content }}</main>
    <!-- 底部评论区域 -->
    <footer>
      <div style="padding: 0px 5px;">
        <h4>发表评论</h4>
        <hr />
        <van-field
          v-model="message"
          autosize
          type="textarea"
          placeholder="请输入留言"
        />
        <van-button type="primary" size="large" class="btn1" @click="addComment"
          >发表评论</van-button
        >
        <div v-for="(item, i) in comments" :key="i">
          <div class="title">
            <span>第{{ i + 1 }}楼</span>
            <span>用户：{{ item.user_name }}</span>
            <span>发表时间：{{ item.add_time | dateFormat }}</span>
          </div>
          <div class="body">{{ item.content }}</div>
        </div>
        <van-button color="#7232dd" plain class="btn2" @click="getMoreComment"
          >加载更多</van-button
        >
      </div>
    </footer>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  data() {
    return {
      details: {},
      message: '',
      comments: [],
      index: 1
    }
  },
  created() {
    this.getDetails()
    this.getComments()
  },
  methods: {
    // 获取文章详情
    async getDetails() {
      // 获取地址栏id
      const { data: res } = await this.$http.get(
        `http://www.liulongbin.top:3005/api/getnew/${this.$route.params.id}`
      )
      // console.log(res)
      if (res.status !== 0) {
        return this.$toast('获取参数失败!')
      }
      this.details = res.message[0]
    },
    // 评论功能
    // 添加评论
    async addComment() {
      if (this.message.trim().length === 0) {
        return Toast('请输入内容')
      }
      const {
        data: res
      } = await this.$http.post(
        `http://www.liulongbin.top:3005/api/postcomment/${this.$route.params.id}`,
        { content: this.message }
      )
      if (res.status !== 0) {
        return Toast.fail('评论失败')
      }
      Toast.success('评论成功')
      this.getComments()
      this.message = ''
    },
    // 加载更多
    async getMoreComment() {
      this.index++
      const { data: res } = await this.$http.get(
        `http://www.liulongbin.top:3005/api/getcomments/${this.$route.params.id}?pageindex=${this.index}`
      )
      this.comments.push(...res.message)
    },
    // 获取评论
    async getComments() {
      const { data: res } = await this.$http.get(
        `http://www.liulongbin.top:3005/api/getcomments/${this.$route.params.id}?pageindex=${this.index}`
      )
      this.comments = res.message
    }
  }
}
</script>

<style lang="less" scoped>
h1 {
  margin: 10px;
  text-align: center;
  font-size: 14px;
}
.blue {
  color: #1989fa;
}
.time_click {
  display: flex;
  justify-content: space-between;
  padding: 7px 0;
  margin: 0 10px;
  font-size: 13px;
  border-bottom: 1px solid #ccc;
}
/* 评论的样式 */
.van-field {
  height: 100px;
  border: 1px solid #ccc;
}

.btn1 {
  width: 100%;
  margin: 5px 0;
  color: #fff;
  background-color: #1989fa;
  border: 1px solid #1989fa;
}

.title {
  height: 30px;
  background-color: #ccc;
  font-size: 12px;
  line-height: 30px;
}

.body {
  line-height: 35px;
  text-indent: 2em;
  font-size: 12px;
}

.btn2 {
  width: 100%;
  margin: 5px 0;
  color: #f44 !important;
  border: 1px solid #f44 !important;
}

.title > span {
  margin-right: 6px;
}
</style>
