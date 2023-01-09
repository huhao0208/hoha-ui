<template>
 <div class="search-form-item">
   <!--  input-->
   <el-input v-if="type==='input'" :placeholder="'请输入'" v-bind="props.attrs" v-model="searchParams"/>
   <!--  select-->
   <el-select v-else-if="type==='select'" placeholder="请选择" v-bind="props.attrs" v-model="searchParams">
     <el-option v-for="item in props.children" :key="item.label" :label="item.label" :value="item.value"/>
   </el-select >
   <!--switch-->
   <el-switch v-else-if="type==='switch'" v-bind="props.attrs" v-model="searchParams"/>
   <!--  radio-group-->
   <el-radio-group v-else-if="type==='radio-group'" v-bind="props.attrs" v-model="searchParams">
     <el-radio v-for="item in props.children" :key="item.label" :label="item.value">
       {{ item.label }}
     </el-radio>
   </el-radio-group>
   <!--  date-->
   <el-date-picker v-else-if="type==='date-picker'" v-bind="props.attrs" v-model="searchParams"/>
   <!--  time-picker-->
   <el-time-picker v-else-if="type==='time-picker'" v-bind="props.attrs" v-model="searchParams"></el-time-picker>
 </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { searchFormItemProps } from './types'
const attrs = useAttrs()
console.log(attrs)

const emit = defineEmits(['update:modelValue'])
const props = defineProps(searchFormItemProps)

const searchParams = computed({
  get () {
    return props.modelValue
  },
  set (e) {
    emit('update:modelValue', e)
  }
})
const type = computed(() => props.type)

// console.log(cConfig, 'computed')
</script>

<style scoped>
</style>
