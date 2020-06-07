<template>
  <div>Item {{ item }}</div>
</template>

<script>
export default {
  name: 'ItemShow',
  data () {
    return {
      'id': this.$route.params.id,
      'item': ''
    }
  },
  mounted () {
    this.getItemInfo()
  },
  methods: {
    getItemInfo () {
      this.$axios.get('/indexItem')
        .then(res => {
          if (res.data && res.data.code === 200) {
            console.log(res.data)
            this.item = res.data.data
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
