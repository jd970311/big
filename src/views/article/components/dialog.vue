<script setup>
import { defineProps, ref, defineExpose } from 'vue'
import { cateAdd, editCateInfo } from '@/api/article/index.js'
import { ElMessage } from 'element-plus'
const ruleForm = ref({
  name: '',
  alias: ''
})
const formEl = ref()
const rules = ref({
  name: [
    {
      required: true,
      message: '不能为空',
      trigger: 'blur'
    }
  ],
  alias: [
    {
      required: true,
      message: '不能为空',
      trigger: 'blur'
    }
  ]
})
const dialogVisible = ref(false)
const isEditData = ref({})
const emit = defineEmits(['getList'])
defineProps({
  tips: {
    type: String,
    default: '添加分类'
  }
})
// 定义一个方法判断是添加还是修改
const open = (row) => {
  isEditData.value = row
  if (row === {}) {
    ruleForm.value = {
      name: '',
      alias: ''
    }
  } else {
    ruleForm.value = {
      name: row.cate_name,
      alias: row.cate_alias
    }
  }
  dialogVisible.value = true
}
const cancel = () => {
  dialogVisible.value = false
}
// 点击确定判断是新增还是修改
const confirm = async () => {
  if (!isEditData.value.id) {
    const res = await cateAdd({
      cate_name: ruleForm.value.name,
      cate_alias: ruleForm.value.alias
    })
    if (res.code === 0) {
      cancel()
      emit('getList')
    }
    ElMessage(res.message)
  } else if (isEditData.value.id) {
    const res = await editCateInfo({
      id: isEditData.value.id,
      cate_name: ruleForm.value.name,
      cate_alias: ruleForm.value.alias
    })
    if (res.code === 0) {
      cancel()
      emit('getList')
    }
    ElMessage(res.message)
  }
}
defineExpose({
  dialogVisible,
  ruleForm,
  open
})
</script>

<template>
  <div class="dialog">
    <el-dialog v-model="dialogVisible" :title="tips" draggable width="400px">
      <el-form ref="formEl" :model="ruleForm" :rules="rules">
        <el-form-item label="分类名称:" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="分类别名:" prop="alias">
          <el-input v-model="ruleForm.alias"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-dialog__body) {
  flex-grow: 0;
  display: flex;
  justify-content: center;
}
</style>
