<template>
  <div class="Login">
    <div class="form">
      <van-cell-group>
        <van-field v-model="username" label="用户名" left-icon="contact" placeholder="请输入用户名" />
        <van-field
          v-model="password"
          left-icon="contact"
          type="password"
          label="密码"
          placeholder="请输入密码"
        />
      </van-cell-group>
      <div class="effect">
        <van-button style="margin-top:20px;" type="primary" block @click="login">
          <span :class="before?'before':''">登 录</span>
        </van-button>
        <span :class="process?'process':''" class="bottom"></span>
        <span :class="process?'process':''" class="right"></span>
        <span :class="process?'process':''" class="top"></span>
        <span :class="process?'process':''" class="left"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',

  data() {
    return {
      username: '',
      password: '',
      process: false,
      before: false
    }
  },
  //生命周期函数
  created() {},
  //方法
  methods: {
    login() {
      this.process = true
      if(this.username=="tangmanrong" && this.password=="123456"){
          //设置加密过的有效时间在1小时内token串
          let key = MD5(`${this.username}md5${this.password}`);

      }else{
          this.$router.push('/home');
      }
    }
  },
  //计算属性
  computed: {},
  //组件
  components: {}
}
</script>

<style lang='scss' scoped>
.Login {
  width: 100vw;
  height: 100vh;
  background-image: url('../../assets/img/timg-1.gif');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .form {
    width: 95%;
    height: 200px;
    position: absolute;
    left: 2.5%;
    top: 50%;
    margin-top: -130px;
  }
}
.effect {
  position: relative;
  transition: background-color 0.3s ease-in-out;
  .bottom,
  .top,
  .left,
  .right {
    position: absolute;
    background-color: #3cefff;
    transition: transform 0.5s ease;
  }
  .bottom,
  .top {
    height: 2px;
    left: 0;
    right: 0;
    transform: scaleX(0);
  }

  .left,
  .right {
    width: 2px;
    top: 0;
    bottom: 0;
    transform: scaleY(0);
  }

  .bottom {
    bottom: 0;
    transform-origin: bottom right;
  }
  .process.bottom {
    transform-origin: bottom left;
    transform: scaleX(1);
  }
  .right {
    right: 0;
    transform-origin: top right;
  }
  .process.right {
    transform-origin: bottom right;
    transform: scaleY(1);
  }
  .top {
    top: 0;
    transform-origin: top left;
  }

  .process.top {
    transform-origin: top right;
    transform: scaleX(1);
  }

  .left {
    left: 0;
    transform-origin: bottom left;
  }

  .process.left {
    transform-origin: top left;
    transform: scaleY(1);
  }
}
.before {
  position: relative;
  width: 100%;
  height: 100%;
  display: block;
  background-color: #3cefff;
  z-index: 9999;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  animation: move 1s ease;

  @keyframes move {
    0% {
      height: 0;
    }
    100% {
      height: 100%;
      color: #000;
    }
  }
}
</style>
