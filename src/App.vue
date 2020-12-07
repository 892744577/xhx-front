<template>
  <div id="app">
    <!-- 需要缓存的视图组件 -->
    <router-view></router-view>
    <tabbar v-show="$route.meta.footShow" />
  </div>

</template>
<script>
// <div v-if="$route.meta.footShow" class="navig"></div>
import tabbar from '@/components/navigationBar/tabbar.vue'
import navbar from '@/components/navigationBar/navbar.vue'
export default {
  data() {
    return { include: [], transitionName: '' }
  },
  components: {
      tabbar,
      navbar
  },
  computed: {},

  watch: {
    $route(to, from) {
      const tabPath = ['/home', '/record', '/setting', '/mine', '/login']
      if (
        tabPath.some(item => item == to.path) &&
        tabPath.some(item => item == from.path)
      ) {
        this.transitionName = 'fade'
      } else {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.navig {
  width: 100%;
  height: 45px;
  margin-top: 0;
}
.slide-left-enter-active {
  animation: slideLeft 0.4s;
}
.slide-right-enter-active {
  animation: slideRight 0.4s;
}
.fade-enter-active {
  transition: all ease 0.2s;
}
.fade-enter {
  opacity: 0;
}
@keyframes slideLeft {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideRight {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
