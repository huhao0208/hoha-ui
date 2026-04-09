# 快速开始

本节将帮助你快速上手 Hoha UI。

## 安装

::: code-group

```bash [pnpm]
pnpm add @hohaya/hoho @hohaya/hoho-utils
```

```bash [npm]
npm install @hohaya/hoho @hohaya/hoho-utils
```

```bash [yarn]
yarn add @hohaya/hoho @hohaya/hoho-utils
```

:::

## 引入方式

### 完整引入

如果你希望一次性引入所有组件，可以使用完整引入方式：

```typescript
// Vue 3
import { createApp } from 'vue'
import HohaUI from '@hohaya/hoho'
import App from './App.vue'

const app = createApp(App)
app.use(HohaUI)
app.mount('#app')
```

```typescript
// Vue 2
import Vue from 'vue'
import HohaUI from '@hohaya/hoho'
import App from './App.vue'

Vue.use(HohaUI)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

### 按需引入

Hoha UI 支持 Tree Shaking，你可以只引入需要的组件：

```vue
<template>
  <HoButton type="primary" @click="handleClick">
    点击我
  </HoButton>
</template>

<script setup>
import { HoButton } from '@hohaya/hoho'

const handleClick = () => {
  console.log('Button clicked!')
}
</script>
```

### 工具函数

工具函数可以单独从 `@hohaya/hoho-utils` 引入：

```typescript
import { formatDate, formatNumber, localStorage } from '@hohaya/hoho-utils'

// 使用格式化函数
const date = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
console.log(date) // 2024-01-15 10:30:00

// 使用存储函数
localStorage.set('user', { name: 'Hoha' })
const user = localStorage.get('user')
console.log(user) // { name: 'Hoha' }
```

## Hello World

这是一个最简单的 Hoha UI 示例：

```vue
<template>
  <div class="container">
    <h1>Hello Hoha UI</h1>
    
    <div class="demo">
      <HoButton type="primary">主要按钮</HoButton>
      <HoButton type="success">成功按钮</HoButton>
      <HoButton type="warning">警告按钮</HoButton>
      <HoButton type="danger">危险按钮</HoButton>
    </div>
    
    <div class="demo">
      <HoInput 
        v-model="inputValue" 
        placeholder="请输入内容"
        style="width: 200px"
      />
      <span>输入值: {{ inputValue }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { HoButton, HoInput } from '@hohaya/hoho'

const inputValue = ref('')
</script>

<style scoped>
.container {
  padding: 20px;
}

.demo {
  margin: 16px 0;
  display: flex;
  gap: 12px;
  align-items: center;
}
</style>
```

## 下一步

- 查看 [组件文档](/components/button) 了解各个组件的详细用法
- 查看 [工具函数文档](/utils/dom) 了解工具函数的使用方法
- 学习如何 [定制主题](/guide/theming)
