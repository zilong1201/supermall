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
        this.$emit('contentScroll',position)
      })

      // 监听上拉事件
      this.scroll.on('pullingUp', () => {
        console.log('上拉加载更多')
      })
    },
    methods: {
      scrollTo(x, y, time = 300){
        this.scroll.scrollTo(x, y, time)
      }
    }
  };
</script>
<style  scoped>

</style>
