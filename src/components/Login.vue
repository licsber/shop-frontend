<template>
  <body id="poster">
  <el-form class="login-container"
           label-position="left"
           label-width="0px">

    <h3 class="login_title">家乐商城登录</h3>

    <el-form-item>
      <el-input
        type="text"
        v-model="loginForm.tel"
        maxlength="11"
        show-word-limit
        placeholder="请输入手机号">

      </el-input>
    </el-form-item>

    <el-form-item>
      <el-input
        type="password"
        v-model="loginForm.password"
        placeholder="请输入密码"
        show-password>

      </el-input>
    </el-form-item>

    <el-form-item label="记住密码" label-width="70px" style="margin: 2% auto 10%">
      <el-switch v-model="loginForm.remember" style="left: -80px"></el-switch>
    </el-form-item>

    <el-button type="primary" v-on:click="login">登陆</el-button>
    <el-button type="primary" v-on:click="reg" style="background: #42b983">注册</el-button>

  </el-form>
  </body>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        tel: '18952188414',
        password: '666',
        remember: true
      }
    }
  },
  methods: {
    login () {
      this.$axios
        .post('/login', {
          tel: this.loginForm.tel,
          password: this.loginForm.password
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$store.commit('login', res.data.data)
            var path = this.$route.query.redirect
            this.$notify.success('登陆成功，欢迎' + res.data.data.nick)
            setTimeout(() => {
              this.$notify.success('上次登陆时间：' +
                this.$options.filters.dateFilter(res.data.data.lastLogin))
              this.$router.replace({path: path === undefined ? '/index' : path})
            }, 500)
          } else {
            this.$notify.warning('登陆失败，信息：' + res.data.msg)
          }
        })
        .catch(fail => {
          this.$notify.error('后端没启动 别再点了')
        })
    },
    reg () {
      this.$router.push({path: '/reg'})
    }
  }
}
</script>

<style scoped>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 200px auto;
    width: 270px;
    padding: 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0 auto 40px auto;
    text-align: center;
    color: #505458;
  }

  #poster {
    background: url("../assets/loginBG.jpg") no-repeat center;
    height: 100%;
    width: 100%;
    /*background-size: cover;*/
    position: fixed;
  }

  body {
    margin: 0;
  }
</style>
