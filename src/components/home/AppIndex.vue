<template>
  <div>
    <SideMenu @loadItems="loadItems" ref="sideMenu"></SideMenu>
    <h2 v-if="items.length === 0">该类别暂无商品</h2>
    <el-main>
      <el-carousel :interval="4000" type="card" height="300px" style="margin-left: 300px">
        <el-carousel-item v-for="item in
        items.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                          :key="item.id" style="width: 300px">
          <router-link :to="'item/'  + item.id">
            <img :src="item.primaryImg" :alt="item.title" height="300px">
          </router-link>
        </el-carousel-item>
      </el-carousel>
      <div id="items_div">
        <div class="item_div" v-for="(item, i) in items.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="i">
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
    </el-main>
    <el-footer>
      <el-row>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="items.length">
        </el-pagination>
      </el-row>
    </el-footer>
  </div>
</template>

<script>
import SideMenu from '../common/SideMenu'

export default {
  name: 'AppIndex',
  components: {SideMenu},
  data () {
    return {
      items: [],
      pageSize: 9,
      currentPage: 1
    }
  },
  mounted () {
    this.loadItems()
  },
  methods: {
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
    },
    loadItems () {
      this.$axios.get('/category/' + this.$refs.sideMenu.index)
        .then(res => {
          console.log(res.data)
          if (res.data) {
            if (res.data.code === 200) {
              this.currentPage = 1
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
  .item_div {
    float: left;
    margin: 30px;
    width: 300px;
    height: 400px;
  }

  #items_div {
    padding-left: 300px;
    width: auto;
    display: block;
  }
</style>
