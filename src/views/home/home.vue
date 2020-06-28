<template>
  <div id="home">
    <nav-bar class='home-nav'>
      <div slot='center'>购物车</div>
    </nav-bar>
    <scroll class='content'
            ref='scroll'
            :probe-type='3'
            @contentScroll='contentScroll'
            :pull-up-load = 'true'>
      <home-swiper :banners='banners'/>
      <home-recommend :recommends='recommends'/>
      <tab-control :titles='["流行","新款","精选"]' class='tab-control' @tabClick='tabClick'/>
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
import BackTop from 'components/content/backTop/BackTop'
// 子组件
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend'
// 引获取数据的方法的包
import {getHomeMultidata, getHomeGoods} from 'network/home'
// import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name: 'Home',
  components: {
    NavBar,
    TabControl,
    GoodsList,
    scroll,
    BackTop,
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
      isShowBackTop: false
    }
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata(),
    this.getHomeGoods('pop'),
    this.getHomeGoods('new'),
    this.getHomeGoods('sell')
  },
  methods: {
    // 网络请求的方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    },
    // 事件监听的方法
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
    },
    contentScroll(position){
      this.isShowBackTop = -position.y > 1000
    },

    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    }
  },
  computed: {
    goodShow() {
      return this.goods[this.currentType].list
    }
  }
};
</script>
<style  scoped>
  #home {
    margin-top: 44px;
  }
  .home-nav{
    position: relative;
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
    background-color: #fff;
  }

  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;
  }
</style>
