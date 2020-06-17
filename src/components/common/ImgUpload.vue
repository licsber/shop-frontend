<template>
  <el-upload
    class="img-upload"
    ref="upload"
    action="https://shop-api.licsber.site/api/v1/imgUpload"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :on-success="handleSuccess"
    multiple
    :limit="1"
    list-type="picture"
    :on-exceed="handleExceed"
    :file-list="fileList">
    <el-button size="small" type="info" plain>点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过4MB</div>
  </el-upload>
</template>

<script>
export default {
  name: 'ImgUpload',
  data () {
    return {
      fileList: [],
      url: ''
    }
  },
  methods: {
    handleRemove (file, fileList) {
    },
    handlePreview (file) {
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleSuccess (response) {
      console.log(response)
      if (response.code === 200) {
        this.url = response.data
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
