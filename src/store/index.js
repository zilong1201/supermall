import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 安装插件
Vue.use(Vuex)

const state ={cartList: []}
// 创建Store
const store = new Vuex.Store({
  state,
  getters,
  mutations,

  // [ADD_COUNTER](state, payload) {
  //   payload.count++
  // },

  // [ADD_TO_CART](state, payload) {
  //   state.cartList.push(payload)
  // }

  actions,

  //addCart(context, payload) {
  //  // state.cartList.push(payload)
  //  // 1.查找之前数组中是否有该商品
  //  let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
  //  console.log(oldProduct)
  //  // 2.判断oldproduct
  //  if (oldProduct) {
  //    // oldProduct.count += 1
  //    context.commit(ADD_COUNTER, oldProduct)
  //  } else {
  //    payload.count = 1
  //    // context.state.cartList.push(payload)
  //    context.commit(ADD_TO_CART, payload)
  //  }
  //}
})

export default store
