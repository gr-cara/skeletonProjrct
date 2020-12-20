<template>
  <div class="index">
    <h1 class="text-center">首页</h1>
    <!-- :to='{path:`/studyReport`,query:{studentID:112032}}' -->
    <router-link to='/studyReport'>学习报告</router-link>
    <router-link to='/externalizaEffect'>效果外化</router-link>
    <router-link to='/rewardGold'>奖励金币</router-link>
    <router-link to='/noviceOnRoad'>新手上路</router-link>
    <router-link to='/timePicker'>时间段</router-link>
    <router-link to='/modelTest'>组件model传参</router-link>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created(){
    localStorage.removeItem('tabSelect')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .index{
    width: 90%;
    margin: 1rem auto 0;
    font-size: .6rem;
  }
</style>
