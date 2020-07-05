<template>
  <div class='wrapper' ref='wrapper'>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'bscroll',
    components: {},
    props: {
      probeType:{
        type: Number,
        default: 0
      },
      pullUpLoad:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      };
    },
    mounted() {
      // 创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      // 监听滚动的位置
      this.scroll.on('scroll', (position) => {
        this.$emit('contentScroll', position)
      })

      // 监听上拉加载更多事件
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    methods: {
      // 封装滚动的方法
      scrollTo(x, y, time = 300){
        this.scroll && this.scroll.scrollTo(x, y, time)
      },

      // 封装上拉加载的方法
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },

      // 封装刷新的方法
      refresh() {
        this.scroll && this.scroll.refresh()
      },

      // 封装获取滚动时坐标的方法
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  };
</script>
<style  scoped>

</style>
