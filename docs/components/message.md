# Message 消息提示

用于展示操作反馈信息。

## 基础用法

从顶部出现，3 秒后自动消失。

::: demo
```vue
<template>
  <div class="message-demo">
    <HoButton type="primary" @click="showMessage">显示消息</HoButton>
    <HoButton type="success" @click="showSuccess">成功消息</HoButton>
    <HoButton type="warning" @click="showWarning">警告消息</HoButton>
    <HoButton type="danger" @click="showError">错误消息</HoButton>
    <HoButton type="info" @click="showInfo">信息消息</HoButton>
  </div>
</template>

<script setup>
import { HoMessage } from '@hoha/components'

const showMessage = () => {
  HoMessage('这是一条消息提示')
}

const showSuccess = () => {
  HoMessage.success('操作成功！')
}

const showWarning = () => {
  HoMessage.warning('这是一条警告信息')
}

const showError = () => {
  HoMessage.error('操作失败，请重试')
}

const showInfo = () => {
  HoMessage.info('这是一条提示信息')
}
</script>

<style scoped>
.message-demo {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
```
:::

## 可关闭的消息

可以添加关闭按钮。

::: demo
```vue
<template>
  <div class="message-demo">
    <HoButton type="primary" @click="showClosable">显示可关闭的消息</HoButton>
  </div>
</template>

<script setup>
import { HoMessage } from '@hoha/components'

const showClosable = () => {
  HoMessage({
    message: '这是一条可以手动关闭的消息',
    showClose: true
  })
}
</script>

<style scoped>
.message-demo {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
```
:::

## 使用 HTML 片段

`message` 属性支持传入 HTML 片段。

::: demo
```vue
<template>
  <div class="message-demo">
    <HoButton type="primary" @click="showHtml">显示 HTML 消息</HoButton>
  </div>
</template>

<script setup>
import { HoMessage } from '@hoha/components'

const showHtml = () => {
  HoMessage({
    message: '<strong>这是加粗的</strong> 消息内容',
    dangerouslyUseHTMLString: true
  })
}
</script>

<style scoped>
.message-demo {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
```
:::

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
| duration | 显示时间，毫秒。设为 0 则不会自动关闭 | `number` | `3000` |

### 返回值

调用 Message 方法会返回当前 Message 的实例。如果需要手动关闭实例，可以调用 `close` 方法：

```typescript
import { message } from '@hoha/components'

const msg = message.success('这是一条消息')
msg.close()
```
