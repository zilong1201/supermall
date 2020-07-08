import {debounce} from 'common/utils'    //防抖函数
import BackTop from 'components/content/backTop/BackTop'

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

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    }
  }
}
