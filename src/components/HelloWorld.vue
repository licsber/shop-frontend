<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>项目简介：</h2>
    <h3>由于疫情原因，本来的考试也变成了大作业的形式</h3>
    <h3>然后我分到的题目是：二手商品交易系统</h3>
    <h3>于是就有了本系统</h3>
    <br>
    <el-button type="success" v-on:click="enter" plain>点这进入商城主页</el-button>
    <br><br>
    <h2>题目简介：</h2>
    <h3>商品发布管理子系统功能要求：</h3>
    <h4>1． 二手商品的分类管理</h4>
    <h4>2． 商品入库管理</h4>
    <h4>3． 商品上架、下架管理</h4>
    <h3>商品购买子系统功能要求：</h3>
    <h4>2． 二手商品信息展示</h4>
    <h4>3． 网上购买及支付管理</h4>
    <h4>4． 顾客留言</h4>
    <br>
    <h5>仅供娱乐 欢迎技术交流 <a href="mailto:licsber@njit.edu.cn">licsber@njit.edu.cn</a></h5>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '欢迎来到家乐的二手商品商城'
    }
  },
  methods: {
    enter () {
      this.$router.push('/index')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
