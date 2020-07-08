<template>
  <div id="home">
    <nav-bar class='home-nav'>
      <div slot='center'>购物车</div>
    </nav-bar>
    <tab-control
        :titles='["流行","新款","精选"]'
        class='tabControl'
        v-show= 'isTabFixed'
        @tabClick='tabClick'
        ref='tabControl1'/>
    <scroll class='content'
            ref='scroll'
            :probe-type='3'
            @contentScroll='contentScroll'
            :pull-up-load = 'true'
            @pullingUp = 'loadMore'>
      <home-swiper :banners='banners' @swiperImageLoad ='swiperImageLoad'/>
      <home-recommend :recommends='recommends'/>
      <tab-control
        :titles='["流行","新款","精选"]'
        @tabClick='tabClick'
        ref='tabControl2'/>
      <goods-list :goods='goodShow'/>
    </scroll>
    <back-top @click.native='backClick' v-show='isShowBackTop'/>
  </div>
</template>

<script>
// 公共组件
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import scroll from 'components/common/scroll/scroll'
// import BackTop from 'components/content/backTop/BackTop'
// 子组件
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend'
// 引获取数据的方法的包
import {getHomeMultidata, getHomeGoods} from 'network/home'
// import {debounce} from 'common/utils'    //防抖函数
// import {Swiper,SwiperItem} from 'components/common/swiper'
import {itemImgListenerMixin, backTopMixin} from 'common/mixin'  // 混入

export default {
  name: 'Home',
  components: {
    NavBar,
    TabControl,
    GoodsList,
    scroll,

    HomeSwiper,
    HomeRecommend
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page:0, list:[]},
        'new': {page:0, list:[]},
        "sell": {page:0, list:[]}
      },
      currentType: 'pop',

      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mixins: [itemImgListenerMixin, backTopMixin],
  methods: {
    // 网络请求的方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },

    // 请求商品数据的方法
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        // 必须添加scroll下拉完成方法，才能继续下一次下拉加载
        this.$refs.scroll.finishPullUp()
      })
    },
    // 事件监听的方法
    // 导航栏点击事件
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      // 实现两个tab-contorl点击效果的同步
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    // 监听滚动，判断置顶按钮的的显示
    contentScroll(position) {
      // 判断backtop是否显示
      this.isShowBackTop = -position.y > 1000
      // 判断tabcontrol是否需要吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop

    },
    // 下拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType)
      // 刷新scroll 始之重新计算高度，解决加载更多后不能继续下拉的bug
      this.$refs.scroll.scroll.refresh()
    },
    // 监听轮播图的图片加载事件
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },


    // backClick() {
    //   this.$refs.scroll.scrollTo(0,0)
    // },

    // 防抖函数
    // debounce(func, delay) {
    //   let timer = null
    //   return function(...args) {
    //     if (timer) clearTimeout(timer)
    //     timer = setTimeout(() => {
    //       func.apply(this,args)
    //     }, delay)
    //   }
    // }
  },
  computed: {
    goodShow() {
      return this.goods[this.currentType].list
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 保存y值
    this.saveY = this.$refs.scroll.getScrollY()

    // 取消全局事件监听
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  }
};
</script>
<style  scoped>
  #home {
    /* margin-top: 44px; */
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  .tab-control{
    position: relative;
    background-color: #fff;
    z-index: 9
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;
  }

  /* .fixed {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
  } */
</style>
