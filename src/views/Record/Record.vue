<template>
  <div class="record">
    <h2>这是About.vue页面</h2>
    <p>
      <svg-icon icon-class="account" :width="40" :height="40"></svg-icon>
    </p>
  </div>
</template>

<script>
export default {
  name: 'record',

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
.record {
}
</style>

