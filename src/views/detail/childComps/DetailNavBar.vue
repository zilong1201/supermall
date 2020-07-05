<template>
  <div>
    <nav-bar>
      <div slot='left' class='back' @click='backClick'>
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot='center' class='title'>
        <div v-for='(item, index) in titles'
            :key='index'
            class='item'
            :class='{active: currentIndex === index}'
            @click = "itemClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    components: {
      NavBar
    },
    props: {},
    data() {
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0
      };
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      },

      backClick() {
        this.$router.back()
      }
    },
    created() {},
    mounted() {}
  };
</script>
<style  scoped>
  .back{
    margin-top: 7px
  }

  .title{
    display: flex;
    font-size: 13px;
  }

  .item{
    flex: 1;
  }

  .active{
    color: var(--color-tint);
  }
</style>
