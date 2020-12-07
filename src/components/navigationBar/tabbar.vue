<template>
  <div class="navigationBar">
    <van-tabbar route>
      <van-tabbar-item name="home" replace to="/home" icon="home-o">订单</van-tabbar-item>
      <van-tabbar-item name="record" replace to="/record" icon="friends-o">记账</van-tabbar-item>
      <van-tabbar-item name="setting" replace to="/setting" icon="setting-o">核销</van-tabbar-item>
      <van-tabbar-item name="mine"replace to="/mine" icon="search">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'navigationBar',

  data() {
    return {
      active: 'home'
    }
  },
  //生命周期函数
  created() {},
  //方法
  methods: {},
  //计算属性
  computed: {},
  //组件
  components: {}
}
</script>

<style lang='scss' scoped>
.navigationBar {
}
</style>
