<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <template slot=tab-icon>
        <span class="iconfont icon-Moneymanagement" ></span>
      </template>
      <template slot=tab-text>
        <div>首页</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path='/category'>
      <template slot=tab-icon>
        <span class="iconfont icon-category" ></span>
      </template>
      <template slot=tab-text>
        <div>分类</div>
      </template>
    </tab-bar-item>
    <tab-bar-item  path='/cart'>
      <template slot=tab-icon>
        <span class="iconfont icon-cart-Empty" ></span>
      </template>
      <template slot=tab-text>
        <div>购物车</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path='/profile'>
      <template slot=tab-icon>
        <span class="iconfont icon-bussiness-man" ></span>
      </template>
      <template slot=tab-text>
        <div>个人</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from 'components/common/tabbar/Tabbar'
  import TabBarItem from 'components/common/tabbar/TabbarItem'

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
