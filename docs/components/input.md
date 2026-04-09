# Input 输入框

通过鼠标或键盘输入内容。

## 基础用法

::: demo
```vue
<template>
  <div class="input-demo">
    <HoInput v-model="value" placeholder="请输入内容" />
    <p>输入的值: {{ value }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
</script>

<style scoped>
.input-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
```
:::

## 禁用状态

通过 `disabled` 属性指定是否禁用输入框。

::: demo
```vue
<template>
  <div class="input-demo">
    <HoInput v-model="value" placeholder="禁用状态" disabled />
    <HoInput v-model="value" placeholder="只读状态" readonly />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('禁用的输入框')
</script>

<style scoped>
.input-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
```
:::

## 不同尺寸

提供三种尺寸：`small`、`medium` 和 `large`。

::: demo
```vue
<template>
  <div class="input-demo">
    <HoInput v-model="value1" size="small" placeholder="小型输入框" />
    <HoInput v-model="value2" size="medium" placeholder="中型输入框" />
    <HoInput v-model="value3" size="large" placeholder="大型输入框" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
</script>

<style scoped>
.input-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
```
:::

## 前缀和后缀

通过 `prefix` 和 `suffix` 插槽添加前缀和后缀内容。

::: demo
```vue
<template>
  <div class="input-demo">
    <HoInput v-model="value1" placeholder="请输入搜索内容">
      <template #prefix>
        <span>🔍</span>
      </template>
    </HoInput>
    <HoInput v-model="value2" placeholder="请输入金额">
      <template #suffix>
        <span>元</span>
      </template>
    </HoInput>
    <HoInput v-model="value3" placeholder="完整的输入框">
      <template #prefix>
        <span>https://</span>
      </template>
      <template #suffix>
        <span>.com</span>
      </template>
    </HoInput>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
</script>

<style scoped>
.input-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
```
:::

## 密码输入

设置 `type="password"` 显示为密码输入框。

::: demo
```vue
<template>
  <div class="input-demo">
    <HoInput v-model="password" type="password" placeholder="请输入密码" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const password = ref('')
</script>

<style scoped>
.input-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
```
:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值 | `string \| number` | `''` |
| type | 输入框类型 | `string` | `'text'` |
| placeholder | 占位文本 | `string` | `''` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| size | 输入框尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 值改变时触发 | `(value: string \| number) => void` |
| input | 输入时触发 | `(value: string \| number) => void` |
| focus | 获得焦点时触发 | `(event: FocusEvent) => void` |
| blur | 失去焦点时触发 | `(event: FocusEvent) => void` |

### Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| focus | 使输入框获得焦点 | — |
| blur | 使输入框失去焦点 | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| prefix | 输入框前缀内容 |
| suffix | 输入框后缀内容 |
