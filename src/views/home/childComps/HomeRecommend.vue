<template>
  <div class="home-recommends">
    <div v-for='(item, index) in recommends' :key='index' class='recommends-item'>
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style  scoped>
  .home-recommends{
    display: flex;
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
    width: 100%;
    text-align: center;
    font-size: 12px;
  }
  .recommends-item{
    flex: 1
  }
  .recommends-item img{
    width: 70px;
    height: 70px;
  }
</style>
