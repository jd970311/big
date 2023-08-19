<script setup>
import { ref, onMounted } from 'vue'
import { cateList, cateDel, getCateInfo } from '@/api/article/index.js'
import diaLog from './components/dialog.vue'
import { ElMessage } from 'element-plus'
const tableData = ref([])
const showDialog = ref(false)
const tips = ref('添加分类')
const dialogDom = ref(null)
const loading = ref(false)
// 获取分类列表
const getCateList = async () => {
  loading.value = true
  const { data } = await cateList()
  tableData.value = data
  loading.value = false
}
// 添加分类
const add = () => {
  tips.value = '添加分类'
  dialogDom.value.open({})
}
// 修改
const handleEdit = (row) => {
  tips.value = '修改'
  getInfo({
    id: row.id
  })
  dialogDom.value.open(row)
}
// 删除
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('你确认删除该分类信息吗？?', '温馨提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
    const res = await cateDel({
      id: row.id
    })
    ElMessage(res.message)
    if (res.code === 0) {
      getCateList()
    }
  } catch (err) {
    ElMessage('取消')
  }

  showDialog.value = true
}
// 获取详情数据
const getInfo = async (val) => {
  const res = await getCateInfo(val)
  dialogDom.value.ruleForm.name = res.data.cate_name
  dialogDom.value.ruleForm.alias = res.data.cate_alias
}
onMounted(async () => {
  getCateList()
})
</script>

<template>
  <div class="article">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>文章分类</span>
          <el-button type="primary" @click="add">添加分类</el-button>
        </div>
      </template>
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%"
        height="500"
      >
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="cate_name" label="分类名称" align="center" />
        <el-table-column prop="cate_alias" label="分类别名" align="center" />
        <el-table-column fixed="right" label="操作" align="center">
          <template #default="{ row }">
            <el-button
              type="primary"
              icon="Edit"
              circle
              plain
              @click="handleEdit(row)"
            />
            <el-button
              type="danger"
              icon="Delete"
              circle
              plain
              @click="handleDelete(row)"
            />
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="没有数据" />
        </template>
      </el-table>
    </el-card>
    <!-- 弹框 -->
    <diaLog ref="dialogDom" :tips="tips" @getList="getCateList"></diaLog>
  </div>
</template>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
