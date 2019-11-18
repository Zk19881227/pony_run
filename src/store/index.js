import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goodsList: [],
    totalNum: 0
  },
  mutations: {
    joinCar(state, params) {
      const index = state.goodsList.findIndex(item => item.id === params.id)
      state.totalNum += params.num
      if (index !== -1) {
        state.goodsList[index].num += params.num
        return
      }
      state.goodsList.push(params)
    }
  },
  actions: {},
  getters: {},
  modules: {}
})
