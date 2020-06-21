<template>
  <div id="tab-bar">
    <slot></slot>
    <!-- <div class='tab-bar-item'><span class="iconfont icon-Moneymanagement"></span>首页</div>
    <div class='tab-bar-item'><span class="iconfont icon-category"></span>分类</div>
    <div class='tab-bar-item'><span class="iconfont icon-cart-Empty"></span>购物车</div>
    <div class='tab-bar-item'><span class="iconfont icon-bussiness-man"></span>我的</div> -->
  </div>
</template>

<script>
export default {
  name: 'Tabbar'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #tab-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    background-color: #f6f6f6;
    box-shadow: 0 -1px 1px rgba(100,100,100,0.1);
  }
</style>
