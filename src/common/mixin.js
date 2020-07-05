import {debounce} from 'common/utils'    //防抖函数

export const itemImgListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    this.itemImgListener = () => debounce(this.$refs.scroll.refresh,500)
    // 监听全局事件
    this.$bus.$on('itemImgLoad', this.itemImgListener)
    // console.log('mixin')
  }
}
