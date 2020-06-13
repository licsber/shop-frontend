<template>
  <div>
    <div v-if="items.length === 0"><br>您还没有商品发布哦</div>
    <div class="item_div" v-for="item in items" :key="item.id">
      <el-card>
        <img :src="item.primaryImg" alt="item.title" height="50px" style="float:left; padding-bottom: 10px">
        <div class="left_div">
          <router-link :to="'/item/' + item.id">{{ item.title }}</router-link>
          <el-divider direction="vertical"></el-divider>
          <span style="color: #f40; font-size: 24px; font-weight: bold">¥ {{ item.price / 100 }} </span>
          <el-divider direction="vertical"></el-divider>
          <span style="text-decoration: line-through">¥ {{ item.originPrice / 100 }}</span>
          <img src="@/../src/assets/postage-free.png" alt="postage-free" v-if="item.postage === 0" height="20px">
          <img src="@/../src/assets/e-item.png" alt="postage-free" v-if="item.type === 1" height="20px">
          <span>{{ item.category.name }}</span>
        </div>
        <div v-if="item.state === 3" class="left_div">
          <el-divider direction="vertical"></el-divider>
          <span style="font-size: 24px; color: dodgerblue">商品可能因违反网站条例，被管理员下架</span>
        </div>
        <div style="float: right">
          <el-button plain v-on:click="wash(item)" v-if="item.state === 1">擦亮</el-button>
          <el-divider direction="vertical" v-if="item.state === 1"></el-divider>
          <el-button type="info" v-if="item.state === 3" v-on:click="applyRePub(item)">申请发布</el-button>
          <el-button type="warning" v-if="item.state === 1" v-on:click="unPublish(item)">下架</el-button>
          <el-button type="success" v-if="item.state === 2">发货</el-button>
          <el-button type="primary" v-if="item.state === 0" v-on:click="rePublish(item)">重新上架</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="danger">删除</el-button>
        </div>
      </el-card>
      <br>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemManager',
  data () {
    return {
      items: []
    }
  },
  mounted () {
    this.getUserItems()
  },
  methods: {
    rePublish (item) {
      this.$axios.put('/rePublishItem/' + item.id,
        {},
        {
          headers: {userToken: this.$store.state.user.token}
        }
      )
        .then(res => {
          console.log(res.data)
          if (res.data) {
            if (res.data.code === 200) {
              this.$notify.success(res.data.msg)
              this.getUserItems()
            } else {
              this.$notify.error(res.data.msg)
            }
          }
        })
        .catch(fail => {
          this.$notify.error('用户登陆身份已过期')
        })
    },
    unPublish (item) {
      this.$axios.put('/unPublishItem/' + item.id,
        {},
        {
          headers: {userToken: this.$store.state.user.token}
        }
      )
        .then(res => {
          console.log(res.data)
          if (res.data) {
            if (res.data.code === 200) {
              this.$notify.success(res.data.msg)
              this.getUserItems()
            } else {
              this.$notify.error(res.data.msg)
            }
          }
        })
        .catch(fail => {
          this.$notify.error('用户登陆身份已过期')
        })
    },
    applyRePub (item) {
      this.$notify.success(item.title + ' 申请重新发布成功')
    },
    wash (item) {
      this.$notify.success(item.title + ' 擦亮成功')
    },
    getUserItems () {
      this.$axios.get('/userItems',
        {
          headers: {userToken: this.$store.state.user.token}
        }
      )
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
          this.$notify.error('用户登陆身份已过期')
        })
    }
  }
}
</script>

<style scoped>
  .item_div {
    margin: 0 100px 0 100px;
  }

  .left_div {
    float: left;
    padding-top: 5px;
    padding-left: 10px
  }
</style>
