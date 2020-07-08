<template>
  <div class="bottom-bar">
    <div class='check-content'>
      <check-button :is-checked='isSelectAll' class="check-button" @click.native='checkClick'/>全选
    </div>
    <div class='price'>
      合计： {{totalPrice}}
    </div>

    <div class='calculate' @click = 'calcClick'>
      去计算({{checkedLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton'

  import {mapGetters} from 'vuex'

  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),

      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return item.price * item.count + preValue
        }, 0).toFixed(2)
      },
      checkedLength() {
        return this.$store.state.cartList.filter(item => {
          return item.checked
        }).length
      },
      isSelectAll() {
        if (this.cartList.length === 0) return false
        return !this.cartList.find(item => !item.checked)
      }
    },
    methods:{
      checkClick() {
        if(this.isSelectAll) {
          this.cartList.forEach(item => item.checked = false)
        } else {
          this.cartList.forEach(item => item.checked = true)
        }
      },

      calcClick() {
        if (!this.checkedLength) {
          this.$toast.show('请选择商品')
        } else {
          this.$toast.show('合计' + this.totalPrice)
        }
      }
    }
  };
</script>
<style scoped>
  .bottom-bar{
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
  }

  .check-content {
    /* height: 40px; */
    display: flex;
    align-items: center;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-left: 5px;
  }

  .price{
    flex: 1
  }

  .calculate {
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>
