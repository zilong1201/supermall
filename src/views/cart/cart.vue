<template>
  <div class="cart">
    <nav-bar class='nav-bar'>
      <div slot='center'>
        购物车({{cartLength}})
      </div>
    </nav-bar>

    <cart-list />
    <cart-bottom-bar />

  </div>
</template>

<script>
  // 公共组件
  import NavBar from 'components/common/navbar/NavBar'

  // 子组件
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  import {mapGetters} from 'vuex'

  export default {
    name: 'cart',
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      // cartLength() {
      //   return this.$store.getters.cartLength
      // }
      // ...mapGetters(['cartLength', 'cartList'])
      ...mapGetters(['cartLength', 'cartList'])
    }
  };
</script>
<style scoped>
  .cart{
    height: 100vh;
    overflow: hidden;
  }
  .nav-bar{
    position: relative;
    background-color: red;
    color: #fff;
    font-weight: 700;
    z-index: 99;
  }
</style>
