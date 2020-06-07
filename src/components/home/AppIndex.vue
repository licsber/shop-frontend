<template>
  <div>
    <SideMenu @loadItems="loadItems" ref="sideMenu"></SideMenu>
    <h2 v-if="items.length === 0">该类别暂无商品</h2>
    <div v-for="(item, i) in items" :key="i">
      <router-link :to="'item/'  + item.id">
        <img :src="item.primaryImg" :alt="item.title" height="300px">
      </router-link>
      <br>
      <img src="@/../src/assets/postage-free.png" alt="包邮" v-if="item.postage === 0" height="16px" width="28px">
      <img src="@/../src/assets/e-item.png" alt="电子商品" v-if="item.type === 1" height="16px" width="48px">
      <router-link :to="'item/'  + item.id">{{ item.title }}</router-link>
      <br>
      <span style="color: #ff5000; font-size: 20px">¥{{ item.price / 100 }}</span>
      <span style="text-decoration: line-through"> ¥{{ item.originPrice / 100 }}</span>
      <span>{{ item.category.name }}</span>
      <br><br>
    </div>
  </div>
</template>

<script>
import SideMenu from '../common/SideMenu'

export default {
  name: 'AppIndex',
  components: {SideMenu},
  data () {
    return {
      'items': []
    }
  },
  mounted () {
    this.loadItems()
  },
  methods: {
    loadItems () {
      this.$axios.get('/category/' + this.$refs.sideMenu.index)
        .then(res => {
          console.log(res.data)
          if (res.data) {
            if (res.data.code === 200) {
              this.items = res.data.data
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

</style>
