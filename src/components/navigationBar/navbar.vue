<template>
  <div class="navbar">
    <van-nav-bar
      :title="$route.meta.title"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="onClickRight"
      :fixed="$route.meta.barnavbar"
    />
    <div v-show="$route.meta.barnavbar" class="margin"></div>
  </div>
</template>

<script>
export default {
  name: 'navbar.vue',

  data() {
    return {}
  },
  //生命周期函数
  created() {},
  //方法
  methods: {
    onClickLeft() {
      Toast('返回')
      var a = { s: '12' }
    },
    onClickRight() {
      Toast('按钮')
    }
  },
  //计算属性
  computed: {},
  //组件
  components: {}
}
</script>

<style lang='scss' scoped>
.navbar {
  .margin {
    width: 100%;
    height: 45px;
    margin-top: 0;
    background-color: rgb(133, 98, 98);
  }
}
</style>
