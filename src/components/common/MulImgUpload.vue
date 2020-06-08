<template>
  <el-upload
    class="mul-img-upload"
    ref="upload"
    action="http://localhost:8888/api/v1/imgUpload"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :on-success="handleSuccess"
    multiple
    :limit="4"
    list-type="picture-card"
    :on-exceed="handleExceed">
    <el-button size="small" type="primary" round>点击上传</el-button>
  </el-upload>
</template>

<script>
export default {
  name: 'MulImgUpload',
  data () {
    return {
      fileList: [],
      url: ''
    }
  },
  methods: {
    parseFileList (fileList) {
      this.fileList = []
      for (var i = 0; i < fileList.length; i++) {
        this.fileList.push(fileList[i].response.data)
      }
      console.log(this.fileList)
    },
    handleRemove (file, fileList) {
      this.parseFileList(fileList)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 4 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleSuccess (response, _, fileList) {
      if (response.code === 200) {
        this.url = response.data
        this.parseFileList(fileList)
        this.$emit('onUpload')
        this.$notify.success('上传成功')
      }
    },
    clear () {
      this.$refs.upload.clearFiles()
    }
  }
}
</script>

<style scoped>

</style>
