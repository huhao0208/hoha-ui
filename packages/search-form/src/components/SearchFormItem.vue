<template>
 <div class="search-form-item">

   <el-input v-if="props.type==='input'" placeholder="请输入" v-bind="props.attrs" v-model="searchParams"/>

   <el-select v-else-if="props.type==='select'" placeholder="请选择" v-bind="props.attrs" v-model="searchParams">
     <el-option v-for="item in props.children" :key="item.label" :label="item.label" :value="item.value"/>
   </el-select >

   <el-switch v-else-if="props.type==='switch'" v-bind="props.attrs" v-model="searchParams"/>

   <el-radio-group v-else-if="props.type==='radio-group'" v-bind="props.attrs" v-model="searchParams">
     <el-radio v-for="item in props.children" :key="item.label" :label="item.value">
       {{ item.label }}
     </el-radio>
   </el-radio-group>

   <el-date-picker v-else-if="props.type==='date-picker'" v-bind="props.attrs" v-model="searchParams"/>

   <el-time-picker v-else-if="props.type==='time-picker'" v-bind="props.attrs" v-model="searchParams"></el-time-picker>
 </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const emit = defineEmits<{(e:'update:modelValue', value:any):void }>()

// // 采用ts专有声明，有默认值
interface Props {
  modelValue:any
  type:'input'|'select'|'switch'|'radio-group'|'date-picker'|'time-picker'
  attrs?: object
  children?:any[]
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  type: 'input',
  attrs: () => ({}),
  children: () => []
})

const searchParams:any = computed({
  get () {
    return props.modelValue
  },
  set (e:any) {
    emit('update:modelValue', e)
  }
})

</script>

<style scoped>
</style>
