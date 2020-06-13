<template>
  <div>
    <el-button v-on:click="returnIndex" style="float: left">返回首页</el-button>
    <br><br>
    <el-card style="width: 500px; position: absolute; left: 35%; top: 43%">
      {{ msg }}
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ItemBuy',
  data () {
    return {
      id: this.$route.params.id,
      msg: '请稍后'
    }
  },
  mounted () {
    this.buy()
  },
  methods: {
    returnIndex () {
      this.$router.replace('/index')
    },
    buy () {
      this.$axios.post('/buyItem',
        {
          itemId: this.id
        },
        {
          headers: {userToken: this.$store.state.user.token}
        }
      )
        .then(res => {
          console.log(res.data)
          if (res.data) {
            this.msg = res.data.msg
          }
        })
        .catch(fail => {
          this.$notify.error('用户登陆身份已过期')
        })
    }
  }
}
</script>

<style scoped>

</style>
