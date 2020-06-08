<template>
  <div style="padding: 20px">
    <el-form :model="addForm" style="text-align: left; width: 700px; display: inline-block" ref="addForm"
             :rules="rules">
      <el-form-item label="商品标题" :label-width="formLabelWidth" prop="title">
        <el-input v-model="addForm.title" autocomplete="off" placeholder="用于商品展示"
                  maxlength="32" show-word-limit></el-input>
      </el-form-item>

      <el-row>

        <el-col :span="12">
          <el-form-item label="分类" :label-width="formLabelWidth" prop="cName">
            <el-select v-model="addForm.cName" placeholder="请选择分类">
              <el-option v-for="category in categories"
                         :key="category.id" :value="category.name">{{ category.name }}
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="商品类型" :label-width="formLabelWidth" prop="type">
            <el-radio v-model="addForm.type" label="0">实物商品</el-radio>
            <el-radio v-model="addForm.type" label="1">电子商品（自动发货）</el-radio>
          </el-form-item>
        </el-col>

      </el-row>

      <el-form-item label="副标题" :label-width="formLabelWidth" prop="subtitle">
        <el-input v-model="addForm.subtitle" autocomplete="off"
                  placeholder="商品展示下的小字 下面价格不填会进入免费送模式（拍卖）哦" maxlength="64" show-word-limit></el-input>
      </el-form-item>

      <el-row>
        <el-col :span="8">
          <el-form-item label="定价" :label-width="formLabelWidth" prop="price">
            <el-input v-model="addForm.price" autocomplete="off"
                      placeholder="单位：元"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">

          <el-form-item label="原价" :label-width="formLabelWidth" prop="originPrice">
            <el-input v-model="addForm.originPrice" autocomplete="off" placeholder="单位：元"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">

          <el-form-item label="邮费" :label-width="formLabelWidth" prop="postage">
            <el-input v-model="addForm.postage" autocomplete="off" placeholder="0为包邮"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="主图" :label-width="formLabelWidth" prop="primaryImg">
        <el-input v-model="addForm.primaryImg" autocomplete="off" placeholder="完整URL 支持外链"></el-input>
        <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>
      </el-form-item>

      <el-form-item label="展示图" :label-width="formLabelWidth" prop="imgUrls">
        <mul-img-upload @onUpload="uploadMulImg" ref="mulImgUpload"></mul-img-upload>
      </el-form-item>

      <el-form-item label="商品详情" :label-width="formLabelWidth" prop="info">
        <el-input type="textarea" v-model="addForm.info" autosize maxlength="600"
                  autocomplete="off" placeholder="支持markdown形式的图片"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="clear">重 置</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </div>
</template>

<script>
import ImgUpload from '../common/ImgUpload'
import MulImgUpload from '../common/MulImgUpload'
import utils from '../../utils/GetAllCategories'

export default {
  name: 'ItemAdd',
  components: {
    ImgUpload,
    MulImgUpload
  },
  mounted () {
    this.getAllCategories()
  },
  data () {
    return {
      dialogFormVisible: true,
      addForm: {
        title: '',
        cName: '',
        type: '',
        subtitle: '',
        price: '',
        originPrice: '',
        postage: 0,
        primaryImg: '',
        imgUrls: [],
        info: '',
        userToken: this.$store.state.user.token
      },
      formLabelWidth: '120px',
      categories: [],
      rules: {
        title: [
          {required: true, message: '请输入商品主标题', trigger: 'blur'},
          {min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur'}
        ],
        cName: [
          {required: true, message: '请选择商品类别', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请选择商品类型', trigger: 'blur'}
        ],
        subtitle: [
          {min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur'}
        ],
        primaryImg: [
          {required: true, message: '请上传主图', trigger: 'change'}
        ],
        info: [
          {required: true, message: '请填写商品描述', trigger: 'blur'},
          {min: 5, max: 600, message: '长度在 5 到 600 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    async getAllCategories () {
      this.categories = await utils.getAllCategories()
        .catch(fail => {
          this.$notify.error(fail.toString())
        })
    },
    uploadImg () {
      this.addForm.primaryImg = this.$refs.imgUpload.url
    },
    uploadMulImg () {
      this.addForm.imgUrls = this.$refs.mulImgUpload.fileList
    },
    clear () {
      console.log(this.addForm)
      this.addForm = {
        title: '',
        subtitle: '',
        price: '',
        originPrice: '',
        postage: 0,
        primaryImg: '',
        imgUrls: [],
        info: '',
        type: '',
        cName: '',
        userToken: this.$store.state.user.token
      }
    },
    onSubmit () {
      console.log(this.addForm)
    }
  }
}
</script>

<style scoped>
</style>
