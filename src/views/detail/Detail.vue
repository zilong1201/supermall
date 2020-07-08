<template>
  <div class="detail">
    <detail-nav-bar class='nav' @titleClick='titleClick' ref='nav'/>
    <scroll class='content' ref = 'scroll' @contentScroll='contentScroll' :probe-type='3'>
      <detail-swiper :top-images='topImages'/>
      <detail-base-info :goods='goods'/>
      <detail-shop-info :shop='shop'/>
      <detail-goods-info :detailInfo='detailInfo' @imageLoad='imageLoad'/>
      <detail-param-info :param-info='paramInfo' ref='params'/>
      <detail-comment-info :comment-info='commentInfo' ref='comments'/>
      <goods-list :goods='recommends' ref='recommends'/>

      <div>{{$store.state.cartList.length}}</div>
    </scroll>
    <detail-bottom-bar @addCart='addToCart'/>
    <back-top @click.native='backClick' v-show='isShowBackTop'/>

    <!-- <toast :message='message' :show='show'/> -->
  </div>
</template>

<script>
  import scroll from 'components/common/scroll/scroll'
  // import Toast from 'components/common/toast/Toast'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'

  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import {getDetail,getRecommend ,Goods, Shop, GoodsParam} from 'network/detail'
  import {debounce} from 'common/utils'    //防抖函数
  import {itemImgListenerMixin, backTopMixin} from 'common/mixin'  // 混入
  import { mapActions } from 'vuex'  // 映射actions

  export default {
    name: 'Detail',
    components: {
      scroll,
      // Toast,
      GoodsList,
      BackTop,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar
    },
    props: {},
    mixins: [itemImgListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        itemImgListener: null,
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        // message: '',
        // show: false
      };
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.id
      // console.log(this.iid)

      // 2.根据iid请求数据
      getDetail(this.iid).then(res => {
        // console.log(res)
        const data = res.result
        // 获取轮播图数据
        this.topImages = data.itemInfo.topImages
        // console.log(this.topImages)

        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // console.log(data.itemInfo)

        // 获取商家信息
        this.shop = new Shop(data.shopInfo)

        // 获取商品的详情数据
        this.detailInfo = data.detailInfo

        // 获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      });

      // 推荐数据
      getRecommend().then(res => {
        // console.log(res)
        this.recommends = res.data.list
        // console.log(this.recommends)
      })

      // 给getThemeTopY赋值----防抖
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
        // 添加一个最大值
        this.themeTopYs.push(Number.MAX_VALUE)
      })
    },
    methods: {
      ...mapActions(['addCart']),

      imageLoad() {
        this.$refs.scroll.refresh()
        // 获取各区域的高度
        this.getThemeTopY()
      },

      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
      },

      // 滚动事件
      contentScroll(position) {
        // 获取滚动的y值
        const positionY = -position.y

        // let length = this.themeTopYs.length
        // 与主题的值对比
        for(let i in this.themeTopYs){
          i = i*1  // 字符串变数字
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i
            // console.log(this.currentIndex)
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        // 判断backtop是否显示
        this.isShowBackTop = -position.y > 1000
      },

      // 底部栏传递事件
      addToCart() {
        // console.log('ok1111');
        // 获取商品信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.iid = this.iid
        product.price = this.goods.realPrice
        // 将商品添加到购物车
        // this.$store.commit('addCart', product)
        // this.$store.dispatch('addCart', product).then(res => {
        //   this.message = res
        //   this.show = true
        //   setTimeout(() => {
        //     this.show =false
        //     this.message = ''
        //   },1500)
        // })

        this.addCart(product).then(res => {
          // this.message = res
          // this.show = true

          // setTimeout(() => {
          //   this.show = false
          //   this.message = ''
          // },1500)
          this.$toast.show(res)
          // console.log(this.$toast)
        })
      },
    },
    // mounted() {
    //   this.itemImgListener = () => debounce(this.$refs.scroll.refresh,500)
    //   // 监听全局事件
    //   this.$bus.$on('itemImgLoad', this.itemImgListener)
    // },

    destroyed() {
      // 取消全局事件的监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    }
  };
</script>
<style scoped>
.detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.nav{
  position: relative;
  background-color: #fff;
  z-index: 99;
}

.content{
  height: calc(100% - 44px - 58px);
}
</style>
