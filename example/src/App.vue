<template>
  <div class="site">
    <h1>组件测试</h1>

    选中的值: {{ seVal }}
    <h-select v-model="seVal" :list="list" :multiple="true" :clearable="true" @blur="onBlur">
      <div>111</div>
    </h-select>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const seVal = ref('')

const list = ref(['1', { label: 'A1', value: '1' }])

const onBlur = (e: any) => {
  console.log('onBlur', e)
}
</script>

<style lang="scss" scoped>
.site {
  padding: 20px;
}
</style>
