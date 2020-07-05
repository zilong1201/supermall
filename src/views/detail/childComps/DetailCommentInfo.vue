<template>
  <div v-if='Object.keys(commentInfo).length !== 0' class='comment-info'>
    <div class='info-header'>
      <div class="header-title">用户评价</div>
      <div class="header-more">更多</div>
      <i class='arrow-right'></i>
    </div>

    <div class="info-user">
      <img :src="commentInfo.user.avatar" width="60" height="60" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>

    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>

      <div class='info-imgs'>
        <img :src="item" v-for='(item, index) in commentInfo.images' width="100" height="100" :key='index' alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from 'common/utils'    //防抖函数

  export default {
    name: 'DetailCommentInfo',
    components: {},
    props: {
      commentInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
      };
    },
    filters: {
      showDate(value) {
        // 1 将时间戳转成date对象
        const date = new Date(value * 1000)

        // 2将date格式化
        return formatDate(date, 'yyyy/MM/dd hh:mm:ss')
      }
    }
  };
</script>
<style scoped>
  .comment-info{
    position: relative;
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
    padding-bottom: 20px;
  }

  .info-header{
    position: relative;
    overflow: hidden;
    padding: 10px;
    height: 40px;
    border-bottom: 3px solid #f2f5f8;
  }

  .header-title{
    float: left;
  }

  .header-more{
    float: right;
  }

  .info-user{
    height: 60px;
    font-size: 20px;
  }

  .info-user span{
    display: inline-block;
    height: 60px;
    line-height: 60px;
    vertical-align: top;
  }

  .info-detail{
    font-size: 15px;
  }

  .info-imgs img{
    margin: 0 8px
  }
</style>
