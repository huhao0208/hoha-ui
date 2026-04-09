# Toast 轻提示

在屏幕中间显示黑色半透明提示，用于消息通知。

## 基础用法

::: demo
```vue
<template>
  <div class="toast-demo">
    <HoButton type="primary" @click="showToast">显示 Toast</HoButton>
    <HoButton type="success" @click="showSuccess">成功提示</HoButton>
    <HoButton type="danger" @click="showError">失败提示</HoButton>
    <HoButton type="warning" @click="showLoading">加载提示</HoButton>
  </div>
</template>

<script setup>
import { HoToast } from '@hohaya/hoho'

const showToast = () => {
  HoToast('这是一条提示信息')
}

const showSuccess = () => {
  HoToast.success('操作成功')
}

const showError = () => {
  HoToast.fail('操作失败')
}

const showLoading = () => {
  HoToast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0 // 不自动关闭
  })
  
  // 2秒后关闭
  setTimeout(() => {
    HoToast.clear()
  }, 2000)
}
</script>

<style scoped>
.toast-demo {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
```
:::

## 自定义图标

::: demo
```vue
<template>
  <div class="toast-demo">
    <HoButton @click="showCustomIcon">自定义图标</HoButton>
  </div>
</template>

<script setup>
import { HoToast } from '@hohaya/hoho'

const showCustomIcon = () => {
  HoToast({
    message: '自定义图标',
    icon: '🌟'
  })
}
</script>

<style scoped>
.toast-demo {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
```
:::

## 动态更新提示

::: demo
```vue
<template>
  <div class="toast-demo">
    <HoButton type="primary" @click="showDynamicToast">动态更新提示</HoButton>
  </div>
</template>

<script setup>
import { HoToast } from '@hohaya/hoho'

const showDynamicToast = () => {
  const toast = HoToast.loading({
    message: '正在处理 0%',
    forbidClick: true,
    duration: 0
  })
  
  let second = 0
  const timer = setInterval(() => {
    second++
    if (second <= 10) {
      toast.message = `正在处理 ${second * 10}%`
    } else {
      clearInterval(timer)
      HoToast.success('处理完成')
    }
  }, 100)
}
</script>

<style scoped>
.toast-demo {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
```
:::

## API

### 方法

Toast 组件提供以下方法：

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `toast.show(options)` | 显示提示 | `options: ToastOptions \| string` | `ToastInstance` |
| `toast.success(message, options?)` | 显示成功提示 | `message: string, options?: Partial<ToastOptions>` | `ToastInstance` |
| `toast.fail(message, options?)` | 显示失败提示 | `message: string, options?: Partial<ToastOptions>` | `ToastInstance` |
| `toast.loading(message, options?)` | 显示加载提示 | `message: string, options?: Partial<ToastOptions>` | `ToastInstance` |
| `toast.text(message, options?)` | 显示文本提示 | `message: string, options?: Partial<ToastOptions>` | `ToastInstance` |
| `toast.clear()` | 关闭提示 | — | — |

### Options

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| message | 提示文案 | `string` | — |
| type | 提示类型，可选值为 `success` `fail` `loading` `text` | `string` | `'text'` |
| position | 位置，可选值为 `top` `middle` `bottom` | `string` | `'middle'` |
| duration | 展示时长(ms)，值为 0 时，toast 不会消失 | `number` | `2000` (loading 默认为 0) |
| forbidClick | 是否禁止背景点击 | `boolean` | `false` |
| loadingType | 加载图标类型，可选值为 `spinner` `circular` | `string` | `'circular'` |

### Toast 实例方法

通过 `toast` 方法返回的实例，支持以下方法：

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| `close` | 关闭提示 | — |

### 使用示例

```typescript
import { toast } from '@hohaya/hoho'

// 显示文本提示
toast.text('这是一条提示')

// 显示成功提示
toast.success('操作成功')

// 显示加载提示
const loading = toast.loading('加载中...', { forbidClick: true })

// 手动关闭
loading.close()
// 或者
toast.clear()
```
