<template>
  <div id="home">
    <nav-bar class='home-nav'>
      <div slot='center'>购物车</div>
    </nav-bar>
    <!-- <swiper>
      <swiper-item v-for='(item,index) in banners' :key='index'>
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper> -->
    <home-swiper :banners='banners'/>
    <home-recommend :recommends='recommends'/>
  </div>
</template>

<script>
// 导航的包
import NavBar from 'components/common/navbar/NavBar'
// 子组件
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend'
// 引获取数据的方法的包
import {getHomeMultidata} from 'network/home'
// import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend
  },
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  created() {
    //1.请求多个数据
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
  }
};
</script>
<style  scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
