<template>
  <div class="h-select">
    <el-select v-bind="$attrs">
      <el-option v-for="item in list" :label="item" :value="item" :key="item"></el-option>
    </el-select>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup name="h-select">
import { computed, useAttrs, watch } from 'vue'
import { selectProps } from './types'

const props = defineProps(selectProps)
console.log(props)
const attrs = useAttrs()
const list = computed(() => {
  // console.log(attrs, 'attrs')
  return [...props.list]
})

const modelValue = computed(() => attrs.modelValue)
watch(modelValue, function (e, old) {
  // 对比新旧值 判断最新变化的是否为全选
  console.log(e, old, 'eeeeeeeeee')
}, {
  deep: true,
  immediate: true
})

</script>

<style scoped lang="scss">
.h-select {}
</style>
