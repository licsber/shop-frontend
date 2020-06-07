<template>
  <div>
    <el-menu
      class="categories"
      default-active="0"
      @select="handleSelect"
      active-text-color="red">
      <el-menu-item index="0">
        <i class="el-icon-menu"></i>
        <span slot="title">全部</span>
      </el-menu-item>
      <el-menu-item v-for="category in categories" :key="category.id" :index="category.id.toString()">
        <i class="el-icon-goods"></i>
        <span slot="title">{{ category.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
  data () {
    return {
      categories: {},
      index: 0
    }
  },
  mounted () {
    this.getAllCategories()
  },
  methods: {
    handleSelect (index) {
      this.index = index
      this.$emit('loadItems')
    },
    getAllCategories () {
      this.$axios.get('/categories')
        .then(res => {
          console.log(res.data)
          if (res.data) {
            if (res.data.code === 200) {
              this.categories = res.data.data
            } else {
              this.$notify.error(res.data.msg)
            }
          }
        })
        .catch(fail => {
          this.$notify.error('后端接口请求失败，请刷新重试')
        })
    }
  }
}
</script>

<style scoped>
  .categories {
    position: fixed;
    margin-left: 50%;
    left: -700px;
    top: 100px;
    width: 150px;
  }
</style>
