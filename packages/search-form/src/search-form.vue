<template>
  <div class="h-search-form">
    <el-form inline>
      <el-form-item :label="item.label" v-for="item in props.columns" :key="item.key">

        <search-form-item v-bind="item" :type="item.type"   v-model="data.searchParams[item.key]" >
        </search-form-item>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="!data.isReset&&props.loading" :disabled="props.loading"
                   :icon="icons.search" @click="searchHandler(false)">搜索
        </el-button>
        <el-button :icon="icons.reset" :loading="data.isReset&&props.loading" :disabled="props.loading"
                   @click="searchHandler(true)">重置
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup name="h-search-form">
import { reactive, toRaw } from 'vue'
import { searchFormProps } from './types'
import SearchFormItem from './components/SearchFormItem.vue'
const props = defineProps(searchFormProps)

const icons = toRaw(props.icons) || {}
const data = reactive({
  isReset: false,
  searchParams: {
    ...props.searchParam
  }
})

const emit = defineEmits<{(e: 'search', obj: Object): void }>()
const searchHandler = (resetClick: boolean) => {
  data.isReset = resetClick
  if (resetClick) data.searchParams = { ...props.searchParam }
  emit('search', data.searchParams)
}

</script>
<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
<style scoped lang="scss">
.h-search-form {
}
</style>
