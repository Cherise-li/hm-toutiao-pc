<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header">
        <!-- 面包屑组件 -->
        <my-bread>{{$route.query.id?'修改文章':'发布文章'}}</my-bread>
      </div>
      <el-form label-width="120px">
        <el-form-item label="标题: ">
          <el-input v-model="articalForm.title" placeholder="请输入" style="width:400px" />
        </el-form-item>
        <el-form-item label="内容: ">
          <quill-editor v-model="articalForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面: ">
          <el-radio-group v-model="articalForm.cover.type" @change="articalForm.cover.images=[]">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div v-if="articalForm.cover.type===1">
            <my-cover v-model="articalForm.cover.images[0]"></my-cover>
          </div>
          <div v-if="articalForm.cover.type===3">
            <my-cover
              style="display:inline-block; margin-right:15px"
              v-model="articalForm.cover.images[i-1]"
              v-for="i in 3"
              :key="i"
            ></my-cover>
          </div>
        </el-form-item>
        <el-form-item label="频道: ">
          <my-channel v-model="articalForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="$route.query.id">
          <el-button type="primary" @click="editArtical()">修改文章</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary" @click="addArtical(false)">发布文章</el-button>
          <el-button @click="addArtical(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 导入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 导入组件
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'Publish',
  // 注册组件
  components: {
    quillEditor
  },
  created() {
    if (this.$route.query.id) {
      this.getData()
    }
  },
  watch: {
    '$route.query.id': function() {
      if (this.$route.query.id) {
        //填充表单
        this.getData()
      } else {
        //清空表单
        this.articalForm = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  },
  methods: {
    async editArtical() {
      try {
        await this.$http.put(
          `articles/${this.$route.query.id}?draft=false`,
          this.articalForm
        )
        this.$message.success('修改文章成功')
        this.$router.push('/neirong')
      } catch (e) {
        this.$message.error('修改文章失败')
      }
    },
    async addArtical(draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articalForm)
      this.$message.success(draft ? '存茹草稿成功' : '发布文章成功')
      this.$router.push('/neirong')
    },
    async getData() {
      try {
        const {
          data: { data }
        } = await this.$http.get(`articles/${this.$route.query.id}`)
        this.articalForm = data
      } catch (e) {
        this.$message.error('获取文章内容失败')
      }
    }
  },
  data() {
    return {
      articalForm: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      //富文本配置对象
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }]
          ]
        }
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
