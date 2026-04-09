# Message 消息提示

用于展示操作反馈信息。

## 基础用法

点击按钮显示不同类型的消息。

<div class="demo-preview">
  <HoButton @click="showSuccess">成功消息</HoButton>
  <HoButton type="danger" @click="showError">错误消息</HoButton>
  <HoButton type="warning" @click="showWarning">警告消息</HoButton>
  <HoButton type="info" @click="showInfo">信息消息</HoButton>
</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <HoButton @click="$message.success('操作成功！')">成功消息</HoButton>
  <HoButton type="danger" @click="$message.error('操作失败！')">错误消息</HoButton>
  <HoButton type="warning" @click="$message.warning('请注意！')">警告消息</HoButton>
  <HoButton type="info" @click="$message.info('这是一条提示')">信息消息</HoButton>
</template>
```

</details>

## 可关闭的消息

设置 duration 为 0 可以手动关闭。

<div class="demo-preview">
  <HoButton type="primary" @click="showPersistent">持久消息</HoButton>
</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <HoButton type="primary" @click="showPersistent">持久消息</HoButton>
</template>

<script setup>
import { message } from '@hohaya/hoho'

const showPersistent = () => {
  const msg = message.success('点击关闭按钮可关闭', 0)
  setTimeout(() => msg.close(), 3000)
}
</script>
```

</details>

## API

### 方法

Message 组件提供以下方法：

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| `message.success(msg, duration?)` | 显示成功消息 | `msg: string, duration?: number` | `MessageInstance` |
| `message.error(msg, duration?)` | 显示错误消息 | `msg: string, duration?: number` | `MessageInstance` |
| `message.warning(msg, duration?)` | 显示警告消息 | `msg: string, duration?: number` | `MessageInstance` |
| `message.info(msg, duration?)` | 显示信息消息 | `msg: string, duration?: number` | `MessageInstance` |

### Options

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| message | 消息文字 | `string` | — |
| type | 消息类型 | `'success' \| 'warning' \| 'error' \| 'info'` | `'info'` |
| duration | 显示时间（毫秒），设为 0 则不自动关闭 | `number` | `3000` |

### 返回值

调用 Message 方法会返回当前 Message 的实例，可以调用 `close` 方法手动关闭。

<script setup>
import { message } from '@hohaya/hoho'

const showSuccess = () => message.success('操作成功！')
const showError = () => message.error('操作失败！')
const showWarning = () => message.warning('请注意！')
const showInfo = () => message.info('这是一条提示')

const showPersistent = () => {
  const msg = message.success('3秒后自动关闭', 0)
  setTimeout(() => msg.close(), 3000)
}
</script>
