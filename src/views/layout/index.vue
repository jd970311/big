<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import leftAside from './leftAside.vue'
import { useUserStore } from '@/stores/index.js'
import router from '@/router/index.js'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const circleUrl = ref(
  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
)
// 获取用户信息
onMounted(() => {
  userStore.saveUserInfo()
})
// 下拉菜单指令事件
const handleCommand = (val) => {
  switch (val) {
    case 'a':
      router.push('/user')
      break
    case 'b':
      router.push('/user/avatar')
      break
    case 'c':
      router.push('/user/password')
      break
    case 'd':
      userStore.logOut()
      break
    default:
      console.log('没有符合条件的')
  }
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="aside" width="200px">
        <leftAside></leftAside>
      </el-aside>
      <el-container class="container">
        <el-header class="header">
          <div>
            登录账户:
            <strong>
              {{ userInfo.nickname || userInfo.username }}
            </strong>
          </div>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <el-avatar :size="50" :src="userInfo.user_pic || circleUrl" />
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="a">
                  <el-icon><User /></el-icon>
                  <span>基本资料</span>
                </el-dropdown-item>
                <el-dropdown-item command="b">
                  <el-icon><Crop /></el-icon>
                  <span>更换头像</span>
                </el-dropdown-item>
                <el-dropdown-item command="c">
                  <el-icon><EditPen /></el-icon>
                  <span>重置密码</span>
                </el-dropdown-item>
                <el-dropdown-item command="d">
                  <el-icon><SwitchButton /></el-icon>
                  <span>退出登录</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
        <div class="footer">大事件 ©2023 Created by 黑马程序员</div>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  .el-icon svg {
    height: 3rem;
  }
  :deep(:focus-visible) {
    outline: none;
  }
}
.main {
  overflow: auto;
  padding: 20px;
  flex: 1;
}
.el-dropdown-link {
  cursor: pointer;
}
.footer {
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
