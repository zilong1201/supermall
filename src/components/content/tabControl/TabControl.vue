<template>
  <div class="tab-control">
    <div
      v-for='(item, index) in titles'
      :key='index'
      class='tab-control-item'
      :class='{active: index === currentIndex}'
      @click='itemClick(index)'>
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  }
};
</script>
<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
  }

  .tab-control-item{
    padding: 5px;
    flex: 1;
  }

  .active{
    color: var(--color-high-text);
  }
  .active span{
    padding: 2px 17px;
    border-bottom: 3px solid var(--color-high-text);
  }
</style>
