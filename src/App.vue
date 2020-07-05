<template>
  <div id="app">
    <main-tab-bar class='main-tab-bar'></main-tab-bar>
    <keep-alive exclude='Detail'>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MainTabBar from 'components/content/tabbar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
  /* 引用基本样式 */
  @import './assets/css/base.css';
  /* 引用字体图标的样式 */
  @import './assets/icon/iconfont.css';

  .is-active{
    background: red
  }
  .main-tab-bar{
    z-index: 9
  }
</style>
