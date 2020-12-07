<template>
  <div class="setting">
    <h2 >这是Setting页面</h2>
    <router-link to="/About/ceshi">张三新闻</router-link>
    <p>
      <svg-icon icon-class="account" :width="40" :height="40"></svg-icon>
    </p>
  </div>
</template>

<script>
export default {
  name: 'setting',

  data() {
    return {}
  },
  //生命周期函数
  created() {
    console.log('cehsi')
  },
  //方法
  methods: {
  },
  //计算属性
  computed: {},
  //组件
  components: {}
}
</script>

<style lang='scss' scoped>
.setting {
}
</style>

