<template>
  <h-search-form :icons="icons" :searchParam="searchParam" :columns="searchColumns" :loading="loading"
                 @search="searchHandler"/>
</template>
<script lang="ts" setup>
import { Refresh, Search } from '@element-plus/icons-vue'
import { ref } from 'vue'

const icons = ref({ search: Search, reset: Refresh })
// 默认参数
const searchParam = ref({
  class: '1'
})
const searchColumns = ref([
  {
    key: 'name', label: '名称', type: 'input'
  },
  {
    key: 'class',
    label: '班级',
    type: 'select',
    children: [
      {
        label: '一年级',
        value: '1'
      }
    ]
  },
  {
    key: 'sex', label: '性别', type: 'switch'
  },
  {
    key: 'book',
    label: '图书',
    type: 'radio-group',
    children: [{ label: '自然', value: 'zr' }]
  }
])
const loading = ref(false)

const searchHandler = e => {
  loading.value = true
  console.log(e, 'searchHandler')
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
</script>

<style lang="scss" scoped>
.site {
  padding: 20px;
}
</style>
