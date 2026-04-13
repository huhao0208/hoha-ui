# Toast 轻提示

在页面中央展示简短的信息提示。

## 基础用法

<div class="demo-preview">
  <HoButton type="primary" @click="showText">文字提示</HoButton>
  <HoButton type="success" @click="showSuccess">成功提示</HoButton>
  <HoButton type="danger" @click="showFail">失败提示</HoButton>
  <HoButton type="warning" @click="showLoading">加载提示</HoButton>
</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <HoButton type="primary" @click="$toast.show('提示内容')">文字提示</HoButton>
  <HoButton type="success" @click="$toast.success('操作成功')">成功提示</HoButton>
  <HoButton type="danger" @click="$toast.fail('操作失败')">失败提示</HoButton>
  <HoButton type="warning" @click="$toast.loading('加载中...')">加载提示</HoButton>
</template>
```

</details>

## 自定义位置

<div class="demo-preview">
  <HoButton @click="showTop">顶部</HoButton>
  <HoButton @click="showMiddle">中间</HoButton>
  <HoButton @click="showBottom">底部</HoButton>
</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <HoButton @click="$toast.show({ message: '顶部提示', position: 'top' })">顶部</HoButton>
  <HoButton @click="$toast.show({ message: '中间提示', position: 'middle' })">中间</HoButton>
  <HoButton @click="$toast.show({ message: '底部提示', position: 'bottom' })">底部</HoButton>
</template>
```

</details>

## API

### 方法

Toast 组件提供以下方法：

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `toast.show(options)` | 显示提示 | `ToastOptions \| string` | `ToastInstance` |
| `toast.success(message)` | 显示成功提示 | `string` | `ToastInstance` |
| `toast.fail(message)` | 显示失败提示 | `string` | `ToastInstance` |
| `toast.loading(message)` | 显示加载提示 | `string` | `ToastInstance` |

### Options

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| message | 提示文字 | `string` | — |
| type | 提示类型 | `'text' \| 'success' \| 'fail' \| 'loading'` | `'text'` |
| position | 显示位置 | `'top' \| 'middle' \| 'bottom'` | `'middle'` |
| duration | 显示时间（毫秒），设为 0 则不自动关闭 | `number` | `2000` |

### 返回值

调用 Toast 方法会返回当前 Toast 的实例，可以调用 `close` 方法手动关闭。

```typescript
import { toast } from '@hohaya/hoho'

const t = toast.loading('加载中...')
// 手动关闭
t.close()
```

<script setup>
import { toast } from '../../packages/components/src/toast/index.ts'

const showText = () => toast.show('提示内容')
const showSuccess = () => toast.success('操作成功')
const showFail = () => toast.fail('操作失败')
const showLoading = () => toast.loading('加载中...')

const showTop = () => toast.show({ message: '顶部提示', position: 'top' })
const showMiddle = () => toast.show({ message: '中间提示', position: 'middle' })
const showBottom = () => toast.show({ message: '底部提示', position: 'bottom' })
</script>
