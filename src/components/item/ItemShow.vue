<template>
  <div>
    <el-button v-on:click="returnIndex" style="float: left">返回首页</el-button>
    <br>
    <div id="info_div">

      <div id="img_div">
        <img-zoom :src="bigImg" :alt="item.title" height="400px" width="400px" :bigsrc="bigImg"
                  :configs="zoom_configs"></img-zoom>
        <ul>
          <li v-on:mouseenter="previewImg(item.primaryImg)" v-on:mouseleave="backImg"
              v-on:click="changeImg(item.primaryImg)">
            <img :src="item.primaryImg" alt="item.id" width="70px" height="70px">
          </li>
          <li v-for="(url, i) in item.imgUrls" :key="i"
              v-on:mouseenter="previewImg(url.url)" v-on:mouseleave="backImg" v-on:click="changeImg(url.url)">
            <img :src="url.url" width="70px" height="70px" :alt="url.id">
          </li>
        </ul>
      </div>

      <div id="item_div">
        <h2>{{ item.title }}</h2>
        <h5 style="color: #8c939d">{{ item.subtitle }}</h5>

        <div style="background-color: #FFEEE2; width: 300px;">
          <span style="font-weight: bold; font-size: 20px; margin: 2px">价格：</span>
          <span style="color: #f40; font-size: 24px; font-weight: bold">¥ {{ item.price / 100 }} </span>
          <span style="text-decoration: line-through">¥ {{ item.originPrice / 100 }}</span>
        </div>
        <br>

        <span style="font-weight: bold; font-size: 16px; margin: 2px">邮费：</span>
        <img src="@/../src/assets/postage-free.png" alt="postage-free" v-if="item.postage === 0" height="20px">
        <span style="color: #f40; font-size: 24px; font-weight: bold" v-else>¥ {{ item.postage / 100 }}</span>
        <el-divider direction="vertical"></el-divider>

        <span style="font-weight: bold; font-size: 16px; margin: 2px">商品类型：</span>
        <img src="@/../src/assets/e-item.png" alt="postage-free" v-if="item.type === 1" height="20px">
        <span style="color: #8cc5ff; font-size: 20px; font-weight: bold" v-else>实物商品</span>
        <el-divider></el-divider>

        <div>
          <span>发货地：{{ item.user.sellAddress }}</span>
          <br><br>
          <span>商品收藏数：{{ item.star }}</span>
        </div>

        <el-divider></el-divider>
        <el-button v-on:click="buy" style="display: block" icon="el-icon-check" type="primary" round>立即购买</el-button>

      </div>

      <div id="seller_div">
        <h4>卖家信息：</h4>
        <el-tag>卖家昵称：{{ item.user.nick }}</el-tag>
        <br><br>
        <el-tag type="success">好评：{{ item.user.likeNum }}</el-tag>
        <el-tag type="danger">差评：{{ item.user.disLikeNum }}</el-tag>
        <el-divider></el-divider>
        <h4>联系方式：</h4>
        <el-tag>卖家邮箱：{{ item.user.mail }}</el-tag>
        <br><br>
        <el-tag>加入时间：{{ item.user.createTime | dateFilter }}</el-tag>
      </div>
    </div>

    <div id="detail_div">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="商品详情" name="detail">
          <div id="text_img_div">
            <span v-html="replace_img(item.info)"></span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="留言板" name="comment">
          这里有留言板{{ item }}
        </el-tab-pane>
      </el-tabs>
    </div>

    <footer>
      <img src="@/../src/assets/footer.jpg" alt="footer">
    </footer>
  </div>
</template>

<script>
import imgZoom from 'vue2.0-zoom'

export default {
  name: 'ItemShow',
  data () {
    return {
      id: this.$route.params.id,
      item: {
        data: '加载中',
        user: '加载中'
      },
      bigImg: '',
      last: '',
      activeName: 'detail',
      zoom_configs: {
        width: 650,
        height: 650,
        maskWidth: 100,
        maskHeight: 100,
        maskColor: 'orange',
        maskOpacity: 0.2
      }
    }
  },
  mounted () {
    this.getItemInfo()
  },
  methods: {
    replace_img (info) {
      if (!info) {
        return
      }
      return info.replace(/!\[]\((.+?)\)/g, function (whole, img) {
        return '<br><img src="' + img + '" alt="markdown" width="1400px"><br>'
      })
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    buy () {
      this.$router.push('/itemBuy/' + this.id)
    },
    previewImg (url) {
      this.last = this.bigImg
      this.bigImg = url
    },
    backImg () {
      this.bigImg = this.last
    },
    changeImg (url) {
      this.last = url
      this.bigImg = url
    },
    returnIndex () {
      this.$router.replace('/index')
    },
    getItemInfo () {
      this.$axios.get('/item/' + this.id)
        .then(res => {
          console.log(res.data)
          if (res.data) {
            if (res.data.code === 200) {
              this.item = res.data.data
              this.bigImg = this.item.primaryImg
            } else {
              this.$notify.error(res.data.msg)
            }
          }
        })
        .catch(fail => {
          this.$notify.error('后端接口请求失败，请刷新重试')
        })
    }
  },
  components: {imgZoom}
}
</script>

<style scoped>
  li {
    float: left;
    list-style: none;
    padding-left: 10px;
  }

  #img_div {
    float: left;
    margin: 20px 40px 10px 40px;
  }

  #info_div {
    text-align: left;
    height: 560px;
    display: block;
  }

  #item_div {
    float: left;
    width: 600px;
    height: 560px;
    padding-right: 80px;
  }

  #detail_div {
    clear: both;
    display: block;
    margin-top: 10px;
    padding: 0 100px 0 100px;
    margin-bottom: 100px;
  }

  #seller_div {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 15px 40px 70px 20px;
    float: left;
    width: 200px;
    height: 300px;
  }

  #text_img_div {
    text-align: left;
    padding: 10px;
  }
</style>
