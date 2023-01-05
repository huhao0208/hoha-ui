<template>
  <div class="h-select">
    <el-select v-bind="$attrs">
      <el-option label="全部" v-if="$attrs.multiple && list.length" :key="'_ALL'" value="_ALL"
        @click="allClick(!modelValue.includes('_ALL'))"></el-option>
      <el-option v-for="item in list" :label="item" :value="item" :key="item"></el-option>
    </el-select>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup name="h-select">
import { computed, defineProps, useAttrs, watch, defineEmits } from 'vue'
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

const emit = defineEmits(['update:modelValue'])

const allClick = (e: any) => {
  console.log(e, '是否全选')
  const result = e ? ['_ALL', ...props.list] : []
  console.log(result, attrs, 'result')

  emit('update:modelValue', result)
}
</script>

<style scoped lang="scss">
.h-select {}
</style>
