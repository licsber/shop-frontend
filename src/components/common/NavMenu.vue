<template>
  <el-menu
    :default-active="'/index'"
    router
    mode="horizontal"
    background-color="white"
    text-color="#222"
    active-text-color="red"
    style="min-width: 1300px">
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
      {{ item.navItem }}
    </el-menu-item>
    <a href="#" v-on:click="more" style="color: #222; float: right; padding: 20px;">更多功能敬请期待</a>
    <el-submenu style="float:right;color: #222;" v-if="nick" index="/index">
      <template slot="title"><span style="font-size: 16px">欢迎您 {{ nick }}</span></template>
      <el-menu-item index="/login" v-on:click="logout">退出登陆</el-menu-item>
    </el-submenu>
    <router-link to="login" style="float:right;color: #222; padding: 20px;" v-else>请登录</router-link>
    <span id="center-span">Shop - Designed By Licsber</span>
  </el-menu>
</template>

<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      navList: [
        {name: '/index', navItem: '首页'},
        {name: '/itemAdd', navItem: '商品发布'},
        {name: '/itemManager', navItem: '商品管理'},
        {name: '/userManager', navItem: '个人中心'}
      ],
      nick: this.$store.state.user.nick
    }
  },
  methods: {
    more () {
      this.$message.info('开发中，敬请期待')
    },
    logout () {
      this.$store.commit('login', {})
      this.$router.replace('/login')
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  span {
    pointer-events: none;
  }

  #center-span {
    position: absolute;
    padding-top: 20px;
    right: 43%;
    font-size: 20px;
    font-weight: bold
  }
</style>
