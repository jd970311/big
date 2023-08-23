<script setup>
import { ref } from 'vue'
import selectChoice from './select.vue'
import { cateList, addInfo, articleInfo, getInfo } from '@/api/article/index.js'
import { QuillEditor } from '@vueup/vue-quill'
import axios from 'axios'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
const showDrawer = ref(false)
const emits = defineEmits(['success'])
defineProps({
  title: {
    type: String,
    default: '添加文章'
  }
})

const formData = ref({
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
})
const rules = {}
const imageUrl = ref('')
const onChange = (file) => {
  imageUrl.value = URL.createObjectURL(file.raw)
  formData.value.cover_img = file.raw
}
const isEditId = ref('')
const editRef = ref()
// 定义打开关闭时间
const open = async (val) => {
  // 打开判断是添加还是编辑
  if (JSON.stringify(val) === '{}') {
    // 添加
    formData.value = {
      title: '',
      cate_id: '',
      cover_img: '',
      content: '',
      state: ''
    }
    imageUrl.value = ''
  } else {
    isEditId.value = val.id
    const res = await getInfo({
      id: val.id
    })
    imageUrl.value =
      'http://big-event-vue-api-t.itheima.net' + res.data.cover_img
    // 编辑
    formData.value = {
      title: res.data.title,
      cate_id: res.data.cate_id,
      cover_img: res.data.cover_img,
      content: res.data.content,
      state: res.data.state
    }
    // 基于 axios 把 图片地址改成 file对象 向后台发请求
    formData.value.cover_img = await imageUrlToFile(
      imageUrl.value,
      formData.value.cover_img
    )
  }
  showDrawer.value = true
}
const close = () => {
  showDrawer.value = false
}

// 发布 // 草稿
const confirmClick = async (val) => {
  formData.value.state = val
  // 创建formData对象
  const fd = new FormData()
  // append（）方法来添加字段
  for (let key in formData.value) {
    fd.append(key, formData.value[key])
  }
  // 发请求 ---- 判断是编辑还是添加
  if (isEditId.value) {
    // 编辑
    fd.append('id', isEditId.value)
    await articleInfo(fd)
  } else {
    // 添加
    await addInfo(fd)
    editRef.value.setHTML('')
  }
  showDrawer.value = false
  // 通知父组件刷新列表
  emits('success', 'add')
}
// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'blob' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], {
      type: response.headers['content-type']
    })
    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type })
    return file
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
  }
}
// 获取文章分类数据
const options = ref([])
const getList = async () => {
  const res = await cateList()
  options.value = res.data
}
getList()
// 抽屉关闭
const closeEvent = () => {
  editRef.value.setHTML('')
}
defineExpose({ open, close })
</script>

<template>
  <div class="">
    <el-drawer
      v-model="showDrawer"
      direction="rtl"
      size="50%"
      @close="closeEvent"
    >
      <template #header>
        <h4>{{ title }}</h4>
      </template>
      <template #default>
        <div>
          <el-form :model="formData" :rules="rules">
            <el-form-item prop="title" label="文章标题:">
              <el-input
                v-model="formData.title"
                placeholder="请输入标题"
              ></el-input>
            </el-form-item>
            <el-form-item prop="cate_id" label="文章分类:">
              <selectChoice
                width="100%"
                v-model="formData.cate_id"
                title=""
                :optionsList="options"
              ></selectChoice>
            </el-form-item>
            <el-form-item prop="" label="文章封面:">
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="onChange"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item prop="content" label="文章内容:">
              <QuillEditor
                ref="editRef"
                v-model:content="formData.content"
                theme="snow"
                contentType="html"
              ></QuillEditor>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="confirmClick('已发布')"
            >发布</el-button
          >
          <el-button @click="confirmClick('草稿')">草稿</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  border: 1px dashed var(--el-border-color);
  width: 178px;
  height: 178px;
  display: flex;
  justify-content: center;
  align-items: center;
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
:deep(.ql-container) {
  width: 100%;
}
:deep(.ql-toolbar.ql-snow) {
  width: 100%;
}
</style>
