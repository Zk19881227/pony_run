<template>
  <div style="padding: 0px 5px; height: 10000px;">
    <h4 class="h4">{{ photoSharing.title }}</h4>
    <p>
      <span class="time">添加时间：{{ photoSharing.add_time }}</span>
      <span class="click">点击次数；{{ photoSharing.click }}</span>
    </p>
    <hr />
    <ul>
      <li v-for="(item, i) in photoHumimage" :key="i" @click="photoPreview(i)">
        <img :src="item.src" />
      </li>
    </ul>
    <div>{{ photoSharing.content }}</div>
    <div style="padding: 0px 5px;">
      <h4>发表评论</h4>
      <hr />
      <van-field v-model="message" autosize type="textarea" placeholder="请输入留言" />
      <van-button type="primary" size="large" class="btn1" @click="addComment">发表评论</van-button>
      <div v-for="(item, i) in comments" :key="i">
        <div class="title">
          <span>第{{ i + 1 }}楼</span>
          <span>用户：{{ item.user_name }}</span>
          <span>发表时间：{{ item.add_time.slice(0, 10) }}</span>
        </div>
        <div class="body">{{ item.content }}</div>
      </div>
      <van-button color="#7232dd" plain class="btn2" @click="getMoreComment">加载更多</van-button>
    </div>
  </div>
</template>

<script>
import { Toast, ImagePreview } from 'vant'
export default {
  data() {
    return {
      photoSharing: {},
      photoHumimage: [],
      photoHumimageList: [],
      message: '',
      comments: [],
      index: 1
    }
  },
  created() {
    this.getPhotoSharing()
    this.getPhotoHumimage()
    this.getComments()
  },
  methods: {
    async getPhotoSharing() {
      const { data: res } = await this.$http.get('http://www.liulongbin.top:3005/api/getimageInfo/49')
      this.photoSharing = res.message[0]
      this.photoSharing.add_time = this.photoSharing.add_time.slice(0, 10)
    },
    async getPhotoHumimage() {
      const { data: res } = await this.$http.get('http://www.liulongbin.top:3005/api/getthumimages/49')
      this.photoHumimage = res.message
      this.photoHumimage.forEach(item => {
        this.photoHumimageList.push(item.src)
      })
    },
    photoPreview(i) {
      ImagePreview({
        images: this.photoHumimageList,
        startPosition: i,
        onClose() {
          // do something
        }
      })
    },
    async addComment() {
      if (this.message.trim().length === 0) {
        return Toast('请输入内容')
      }
      const { data: res } = await this.$http.post(`http://www.liulongbin.top:3005/api/postcomment/49`, { content: this.message })
      if (res.status !== 0) {
        return Toast.fail('评论失败')
      }
      Toast.success('评论成功')
      this.getComments()
      this.message = ''
    },
    async getMoreComment() {
      this.index++
      const { data: res } = await this.$http.get(`http://www.liulongbin.top:3005/api/getcomments/49?pageindex=${this.index}`)
      this.comments.push(...res.message)
    },
    async getComments() {
      const { data: res } = await this.$http.get(`http://www.liulongbin.top:3005/api/getcomments/49?pageindex=${this.index}`)
      this.comments = res.message
    }
  }
}
</script>

<style scoped>
.van-panel {
  padding: 0 !important;
}
.h4 {
  text-align: center;
  color: #26a2ff;
  font-size: 15px;
}

p {
  overflow: hidden;
}

.time {
  float: left;
  font-size: 13px;
  color: #8f8f94;
}

.click {
  float: right;
  font-size: 13px;
  color: #8f8f94;
}

ul {
  list-style: none;
  margin: 10px 0;
  padding: 0 5px;
  overflow: hidden;
}

ul > li {
  float: left;
  width: 33.3333%;
  padding: 5px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

img {
  width: 100%;
}

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
