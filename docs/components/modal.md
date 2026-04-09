# Modal 弹窗

模态对话框，用于展示信息或确认操作。

## 基础用法

点击按钮打开弹窗。

<div class="demo-preview">
  <HoButton type="primary" @click="showModal = true">打开弹窗</HoButton>
  <HoModal v-model="showModal" title="提示">
    <p>这是一个基础弹窗内容。</p>
  </HoModal>
</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <HoButton type="primary" @click="showModal = true">打开弹窗</HoButton>
  <HoModal v-model="showModal" title="提示">
    <p>这是一个基础弹窗内容。</p>
  </HoModal>
</template>

<script setup>
import { ref } from 'vue'
const showModal = ref(false)
</script>
```

</details>

## 自定义内容

弹窗内容可以自定义。

<div class="demo-preview">
  <HoButton type="success" @click="showCustom = true">自定义内容</HoButton>
  <HoModal v-model="showCustom" title="用户协议">
    <div style="line-height: 1.8;">
      <p>欢迎使用 Hoha UI 组件库！</p>
      <p>本组件库基于 MIT 协议开源，您可以自由使用、修改和分发。</p>
    </div>
    <template #footer>
      <HoButton @click="showCustom = false">取消</HoButton>
      <HoButton type="primary" @click="showCustom = false">同意</HoButton>
    </template>
  </HoModal>
</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <HoButton type="success" @click="showCustom = true">自定义内容</HoButton>
  <HoModal v-model="showCustom" title="用户协议">
    <div style="line-height: 1.8;">
      <p>欢迎使用 Hoha UI 组件库！</p>
      <p>本组件库基于 MIT 协议开源，您可以自由使用、修改和分发。</p>
    </div>
    <template #footer>
      <HoButton @click="showCustom = false">取消</HoButton>
      <HoButton type="primary" @click="showCustom = false">同意</HoButton>
    </template>
  </HoModal>
</template>

<script setup>
import { ref } from 'vue'
const showCustom = ref(false)
</script>
```

</details>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 是否显示弹窗 | `boolean` | `false` |
| title | 弹窗标题 | `string` | `''` |
| width | 弹窗宽度 | `string` | `'500px'` |
| closable | 是否显示关闭按钮 | `boolean` | `true` |
| mask-closable | 点击遮罩是否关闭 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 弹窗显示状态改变时触发 | `(value: boolean) => void` |
| close | 弹窗关闭时触发 | - |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 弹窗内容 |
| header | 自定义头部 |
| footer | 自定义底部 |

<script setup>
import { ref } from 'vue'
const showModal = ref(false)
const showCustom = ref(false)
</script>
