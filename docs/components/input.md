# Input 输入框

通过鼠标或键盘输入内容。

## 基础用法

<div class="demo-preview">
  <HoInput v-model="value1" placeholder="请输入内容" style="max-width: 300px;" />
</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <HoInput v-model="value" placeholder="请输入内容" style="max-width: 300px;" />
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
</script>
```

</details>

## 禁用状态

<div class="demo-preview">
  <HoInput v-model="value2" placeholder="禁用状态" disabled style="max-width: 300px;" />
</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <HoInput v-model="value" placeholder="禁用状态" disabled style="max-width: 300px;" />
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
</script>
```

</details>

## 不同尺寸

<div class="demo-preview" style="flex-direction: column; align-items: flex-start; gap: 12px;">
  <HoInput v-model="value3" size="small" placeholder="小型输入框" style="max-width: 300px;" />
  <HoInput v-model="value4" size="medium" placeholder="中型输入框" style="max-width: 300px;" />
  <HoInput v-model="value5" size="large" placeholder="大型输入框" style="max-width: 300px;" />
</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <HoInput v-model="v1" size="small" placeholder="小型输入框" style="max-width: 300px;" />
  <HoInput v-model="v2" size="medium" placeholder="中型输入框" style="max-width: 300px;" />
  <HoInput v-model="v3" size="large" placeholder="大型输入框" style="max-width: 300px;" />
</template>

<script setup>
import { ref } from 'vue'
const v1 = ref('')
const v2 = ref('')
const v3 = ref('')
</script>
```

</details>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 绑定值 | `string` / `number` | `''` |
| type | 输入框类型 | `string` | `'text'` |
| placeholder | 占位文本 | `string` | `''` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| size | 输入框尺寸 | `string` | `'medium'` |

**size 可选值**：`'small'` | `'medium'` | `'large'`

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| input | 输入时触发 | `(value: string)` |
| focus | 获得焦点时触发 | `(event: FocusEvent)` |
| blur | 失去焦点时触发 | `(event: FocusEvent)` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| prefix | 输入框头部内容 |
| suffix | 输入框尾部内容 |

<script setup>
import { ref } from 'vue'
const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
const value5 = ref('')
</script>
