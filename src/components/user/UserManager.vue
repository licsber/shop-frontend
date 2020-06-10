<template>
  <div>
    <el-card>下面是一个神奇的按钮</el-card>
    <br>
    <el-button type="primary" v-on:click="addMoney">充值</el-button>
    <br><br>
    <el-card>点击就会获得钱</el-card>
  </div>
</template>

<script>
export default {
  name: 'UserManager',
  methods: {
    addMoney () {
      this.$notify.success('您的智商充值成功 ¥10')
    }
  }
}
</script>

<style scoped>

</style>
