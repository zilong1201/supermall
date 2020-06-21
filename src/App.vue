<template>
  <div id="app">
    <keep-alive>
      <main-tab-bar></main-tab-bar>
    </keep-alive>
    <router-view></router-view>
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
</style>
