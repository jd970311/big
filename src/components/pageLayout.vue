<script setup></script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <slot name="header"> 我是头部区域 </slot>
      </div>
    </template>
    <slot>我是主题区域</slot>
  </el-card>
</template>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
