<template>
  <div style="padding: 20px">
    <el-form v-model="form" style="text-align: left; width: 600px" ref="dataForm">
      <el-form-item label="商品标题" :label-width="formLabelWidth" prop="title">
        <el-input v-model="addForm.title" autocomplete="off" placeholder="用于商品展示"
                  maxlength="32" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="副标题" :label-width="formLabelWidth" prop="subtitle">
        <el-input v-model="addForm.subtitle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="定价" :label-width="formLabelWidth" prop="price">
        <el-input v-model="addForm.price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="原价" :label-width="formLabelWidth" prop="originPrice">
        <el-input v-model="addForm.originPrice" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮费" :label-width="formLabelWidth" prop="postage">
        <el-input v-model="addForm.postage" autocomplete="off" placeholder="0为包邮"></el-input>
      </el-form-item>
      <el-form-item label="主图" :label-width="formLabelWidth" prop="primaryImg">
        <el-input v-model="addForm.primaryImg" autocomplete="off" placeholder="完整URL 支持外链"></el-input>
      </el-form-item>
      <el-form-item label="展示图" :label-width="formLabelWidth" prop="info">
        <el-input type="textarea" v-model="addForm.info" autocomplete="off" placeholder="支持markdown形式的图片"></el-input>
      </el-form-item>
      <el-form-item label="商品详情" :label-width="formLabelWidth" prop="imgUrls">
        <el-input type="textarea" v-model="addForm.imgUrls" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="分类" :label-width="formLabelWidth" prop="cid">
        <el-select v-model="addForm.category.id" placeholder="请选择分类">
          <el-option label="文学" value="1"></el-option>
          <el-option label="流行" value="2"></el-option>
          <el-option label="文化" value="3"></el-option>
          <el-option label="生活" value="4"></el-option>
          <el-option label="经管" value="5"></el-option>
          <el-option label="科技" value="6"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品类型" :label-width="formLabelWidth" prop="type">
        <el-select v-model="addForm.type" placeholder="请选择商品分类">
          <el-option label="实物商品" value="0"></el-option>
          <el-option label="电子商品" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="user" style="height: 0">
        <el-input type="hidden" v-model="addForm.user" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemAdd',
  data () {
    return {
      dialogFormVisible: true,
      addForm: {
        title: '',
        subtitle: '',
        price: '',
        originPrice: '',
        postage: '',
        primaryImg: '',
        imgUrls: '',
        info: '',
        type: '',
        category: {
          id: '',
          name: ''
        },
        user: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    clear () {
      this.form = {
        id: '',
        title: '',
        author: '',
        date: '',
        press: '',
        cover: '',
        abs: '',
        category: ''
      }
    },
    onSubmit () {
      this.$axios
        .post('/books', {
          id: this.form.id,
          cover: this.form.cover,
          title: this.form.title,
          author: this.form.author,
          date: this.form.date,
          press: this.form.press,
          abs: this.form.abs,
          category: this.form.category
        })
        .then(resp => {
          if (resp && resp.status === 200) {
            this.dialogFormVisible = false
            this.$emit('onSubmit')
          }
        })
    }
  }
}
</script>

<style scoped>
</style>
