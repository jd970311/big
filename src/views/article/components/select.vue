<script setup>
defineProps({
  title: {
    type: String,
    default: '文章分类:'
  },
  optionsList: {
    type: Array,
    default: () => []
  },
  id: {
    type: String,
    default: 'id'
  },
  name: {
    type: String,
    default: 'cate_name'
  },
  modelValue: {
    type: [Number, String]
    // default: 0
  },
  width: {
    type: String,
    default: '100%'
  }
})
const emits = defineEmits(['update:modelValue'])

const updateEvent = (e) => {
  emits('update:modelValue', e)
}
</script>

<template>
  <div class="container" :style="{ width: width }">
    <div>{{ title }}</div>
    <el-select
      :style="{ width: width }"
      :modelValue="modelValue"
      @update:modelValue="updateEvent"
      placeholder="请选择"
    >
      <el-option
        v-for="item in optionsList"
        :key="item[id]"
        :label="item[name]"
        :value="item[id]"
      />
    </el-select>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
