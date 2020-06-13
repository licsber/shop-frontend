<template>
  <body id="poster">
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">用户注册</h3>
    <el-form-item>
      <el-input type="text" v-model="regForm.tel"
                auto-complete="off" placeholder="手机号"
                maxlength="11"
                show-word-limit></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="regForm.password"
                auto-complete="off" placeholder="密码" show-password></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" v-model="regForm.nick"
                auto-complete="off" placeholder="昵称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" v-model="regForm.mail"
                auto-complete="off" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" v-model="regForm.sellAddress"
                auto-complete="off" placeholder="所在地（如江苏南京）"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" v-model="regForm.lastAddress"
                auto-complete="off" placeholder="默认收货地址（如玄武区）"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 40%;background: #505458;border: none" v-on:click="register">注册</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      regForm: {
        tel: '',
        password: '',
        nick: '',
        mail: '',
        sellAddress: '',
        lastAddress: ''
      }
    }
  },
  methods: {
    register () {
      this.$axios
        .post('/register', {
          tel: this.regForm.tel,
          password: this.regForm.password,
          nick: this.regForm.nick,
          mail: this.regForm.mail,
          sellAddress: this.regForm.sellAddress,
          lastAddress: this.regForm.lastAddress
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$notify.success('登陆成功，欢迎第' + res.data.data + '用户')
            this.$router.replace('/login')
          } else {
            this.$notify.warning('登陆失败，信息：' + res.data.msg)
          }
        })
        .catch(fail => {
          this.$notify.error('后端没启动 别再点了')
        })
    }
  }
}
</script>

<style scoped>
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
</style>
