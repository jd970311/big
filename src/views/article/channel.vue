<script setup>
import pageLayout from '@/components/pageLayout.vue'
import { formatDate } from '@/utils/format.js'
import { ref } from 'vue'
import { cateList, articleList, deleteInfo } from '@/api/article/index.js'
// 引入组件
import selectChannel from './components/select.vue'
import elDrawer from './components/drawer.vue'
const loading = ref(false)
const options = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const selectValue = ref()
const state = ref()
const stateOptions = ref([
  {
    label: '已发布',
    value: '已发布'
  },
  {
    label: '草稿',
    value: '草稿'
  }
])
state.value = stateOptions.value[0].value
// 获取文章分类数据
const getList = async () => {
  const res = await cateList()
  options.value = res.data
  selectValue.value = res.data[0].id
}
getList()
const tableData = ref([])
const total = ref(0)
// 获取文章管理列表
const getArticleList = async () => {
  loading.value = true
  const res = await articleList({
    pagenum: currentPage.value,
    pagesize: pageSize.value + '',
    cate_id: selectValue.value,
    state: state.value
  })
  loading.value = false
  total.value = res.total
  tableData.value = res.data
}
getArticleList()

// 方法

// 发布文章
const drawer = ref()
const issue = () => {
  drawer.value.open({})
}
// 搜索
const search = () => {
  getArticleList()
}
// 重置
const reset = () => {
  state.value = ''
  selectValue.value = ''
}
// 修改
const handleEdit = (row) => {
  drawer.value.open(row)
}
// 删除
const handleDelete = async (row) => {
  await ElMessageBox.confirm('是否确认删除?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await deleteInfo({
    id: row.id
  })
  getArticleList()
}
// 每页条数改变
const handleSizeChange = (val) => {
  console.log(val)
}
// 当前页改变
const handleCurrentChange = (val) => {
  console.log(val)
}
// 子传父事件
const onSuccess = (val) => {
  if (val) {
    // 添加到最后一页
    getArticleList()
  } else {
    // 编辑到当前页
    getArticleList()
  }
}
</script>

<template>
  <div class="">
    <pageLayout>
      <template v-slot:header>
        <span>文章管理</span>
        <el-button type="primary" @click="issue">发布文章</el-button>
      </template>
      <div>
        <div style="height: 10vh; display: flex">
          <selectChannel
            v-model="selectValue"
            :optionsList="options"
          ></selectChannel>
          <selectChannel
            :optionsList="stateOptions"
            title="发布状态:"
            v-model="state"
            id="value"
            name="label"
          ></selectChannel>
          <el-button type="primary" @click="search" style="margin-left: 340px"
            >搜索</el-button
          >
          <el-button @click="reset">重置</el-button>
        </div>
        <el-table
          v-loading="loading"
          :data="tableData"
          border
          stripe
          height="300"
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column prop="title" label="文章标题" align="center">
            <template #default="{ row }">
              <el-link type="primary" :underline="false">{{
                row.title
              }}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="cate_name" label="分类" align="center" />
          <el-table-column prop="pub_date" label="发表时间" align="center">
            <template #default="{ row }">
              {{ formatDate(row.pub_date) }}
            </template>
          </el-table-column>
          <el-table-column prop="state" label="状态" align="center" />
          <el-table-column label="操作" align="center">
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
        <div
          style="
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            background
            layout="jumper,total,sizes prev, pager, next, "
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
    </pageLayout>
    <elDrawer ref="drawer" @success="onSuccess"></elDrawer>
  </div>
</template>

<style lang="scss" scoped></style>
