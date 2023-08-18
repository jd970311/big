<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const collapse = ref(false)
const Route = useRoute()
</script>

<template>
  <div class="menu">
    <div class="titleLogo"></div>
    <el-menu
      :collapse="collapse"
      background-color="#232323"
      text-color="#fff"
      active-text-color="#f1d04b"
      :default-active="Route.path"
      router
    >
      <el-menu-item index="/article">
        <el-icon><Memo /></el-icon>
        <span>文章分类</span>
      </el-menu-item>
      <el-menu-item index="/article/channel">
        <el-icon><Management /></el-icon>
        <span>文章管理</span>
      </el-menu-item>
      <el-sub-menu index="/">
        <template #title>
          <el-icon><UserFilled /></el-icon>
          <span>个人中心</span>
        </template>
        <el-menu-item index="/user">
          <el-icon><User /></el-icon>
          <span>基本资料</span>
        </el-menu-item>
        <el-menu-item index="/user/avatar">
          <el-icon><Crop /></el-icon>
          <span>更换头像</span>
        </el-menu-item>
        <el-menu-item index="/user/password">
          <el-icon><EditPen /></el-icon>
          <span>重置密码</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  height: 100vh;
  background: #232323;
  overflow: auto;
  .titleLogo {
    background: url('@/assets/logo.png') no-repeat center;
    height: 20vh;
  }
  .el-menu {
    height: 80vh;
    border: none;
  }
}
</style>
