<template>
  <div>
    <!-- 搜索关键词 -->
    <form action="/">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>

    <!-- 搜索历史 -->
    <div :style="isHiden ? 'display:none' : ''">
      <div class="pl" :style="isHiden ? 'display:none' : ''">
        <span class="pr">搜索历史</span>
        <van-icon name="delete" @click="remove" />
      </div>

      <div class="jilu">
        <!-- 历史标签 -->
        <div :style="isEmpty ? 'display:none' : ''">
          <van-tag v-for="item in keyWords" :key="item.id" class="tag">{{
            item
          }}</van-tag>
        </div>
        <!-- 无搜索历史 -->
        <div
          class="van-divider van-divider--hairline van-divider--content-center"
          style="border-color: rgb(204, 204, 204); color: rgb(51, 51, 51); padding: 0px 16px;"
          :style="!isEmpty ? 'display:none' : ''"
        >
          暂无搜索历史
        </div>
      </div>
    </div>

    <!-- 搜索结果 -->
    <div class="searchBox" :style="!isHiden ? 'display:none' : ''">
      <van-cell-group>
        <van-cell
          :title="item.name"
          :value="item.ctime"
          v-for="item in searchResult"
          :key="item.id"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchResult: [],
      isHiden: false,
      keyWords: [],
      value: '',
      isEmpty: false
    }
  },
  created() {
    this.keyWords = window.localStorage.keyWords.split(',')
    this.isEmpty = this.keyWords.length === 0
  },
  methods: {
    async onSearch(e) {
      const { data: res } = await this.$http.get(
        `http://www.liulongbin.top:3005/api/getprodlist`
      )
      this.searchResult = res.message
      console.log(this.isHiden)
      this.isHiden = true
      this.keyWords.push(this.value)
      this.value = ''
      window.localStorage.keyWords = this.keyWords
      this.isEmpty = this.keyWords.length === 0
    },
    onCancel() {
      this.isHiden = false
    },
    remove() {
      this.keyWords = []
      this.isEmpty = true
    }
  }
}
</script>

<style>
.pl {
  display: flex;
  margin: 12px 10px;
  font-size: 15px;
  align-items: center;
}
.pr {
  flex: 1;
}
.jilu {
  padding: 5px 10px;
}
.van-divider {
  display: flex;
  align-items: center;
  margin: 16px 0;
  font-size: 14px;
  line-height: 24px;
  border-top: solid;
  border-right: solid;
  border-bottom: solid;
  border-left: solid;
  border-width: 0;
}
.van-divider--hairline:after,
van-divider--hairline:before {
  transform: scaleY(0.5);
}
.van-divider:before {
  content: '';
}
.van-divider--content-center:before,
.van-divider--content-left:before,
.van-divider--content-right:before {
  margin-right: 16px;
}
.van-divider--hairline:after,
.van-divider--hairline:before {
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.van-divider:before {
  content: '';
}
.van-divider:after,
.van-divider:before {
  display: block;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  box-sizing: border-box;
  height: 1px;
  border-color: inherit;
  border-style: inherit;
  border-width: 1px 0 0;
}
.van-divider--content-center:after,
.van-divider--content-left:after,
.van-divider--content-right:after {
  margin-left: 16px;
  content: '';
}
.tag {
  text-align: center;
  margin: 0 3px;
}
</style>
