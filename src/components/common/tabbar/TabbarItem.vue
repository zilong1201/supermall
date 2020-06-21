<template>
  <div class="tab-bar-item" @click='itemclick' :class='{"active":isActive}'>
    <slot name='tab-icon'></slot>
    <slot name='tab-text'></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBrItem',
  props: {
    path: String
  },
  data()  {
    return {
      // isActive: false
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    }
  },
  methods: {
    itemclick () {
      this.$router.push(this.path)
    }
  }
}
</script>
<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item span {
    display: block;
    margin-top: 3px;
    font-size: 24px;
  }
  .active{
    color: red;
  }
</style>
