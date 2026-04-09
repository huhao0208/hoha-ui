# Input 输入框

通过鼠标或键盘输入内容。

## 基础用法

```vue
<template>
  <div class="input-demo">
    <HoInput v-model="value" placeholder="请输入内容" />
    <span>输入值: {{ value }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
</script>
```

## 禁用状态

```vue
<template>
  <div class="input-demo">
    <HoInput v-model="value" placeholder="禁用状态" disabled />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
</script>
```

## 不同尺寸

```vue
<template>
  <div class="input-demo" style="flex-direction: column; align-items: flex-start;">
    <HoInput v-model="v1" size="small" placeholder="小型输入框" />
    <HoInput v-model="v2" size="medium" placeholder="中型输入框" />
    <HoInput v-model="v3" size="large" placeholder="大型输入框" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const v1 = ref('')
const v2 = ref('')
const v3 = ref('')
</script>
```

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 绑定值 | `string \| number` | `''` |
| type | 输入框类型 | `string` | `'text'` |
| placeholder | 占位文本 | `string` | `''` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| size | 输入框尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| input | 输入时触发 | `(value: string) => void` |
| focus | 获得焦点时触发 | `(event: FocusEvent) => void` |
| blur | 失去焦点时触发 | `(event: FocusEvent) => void` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| prefix | 输入框头部内容 |
| suffix | 输入框尾部内容 |
