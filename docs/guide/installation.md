# 安装

## 环境要求

在安装 Hoha UI 之前，请确保你的开发环境满足以下要求：

- Node.js 18.0 或更高版本
- Vue 2.6+ 或 Vue 3.0+

## 安装方式

### 方式一：完整安装（推荐）

一次性安装组件库和工具库：

::: code-group

```bash [pnpm]
pnpm add @hohaya/ui
```

```bash [npm]
npm install @hohaya/ui
```

```bash [yarn]
yarn add @hohaya/ui
```

:::

### 方式二：独立安装

只需安装需要的包：

::: code-group

```bash [pnpm]
# 只安装组件库
pnpm add @hohaya/hoho

# 只安装工具库
pnpm add @hohaya/hoho-utils

# 同时安装两者
pnpm add @hohaya/hoho @hohaya/hoho-utils
```

```bash [npm]
# 只安装组件库
npm install @hohaya/hoho

# 只安装工具库
npm install @hohaya/hoho-utils
```

:::

### Vue 2 项目

Vue 2 需要额外安装 `@vue/composition-api`：

::: code-group

```bash [pnpm]
pnpm add @hohaya/ui @vue/composition-api
```

```bash [npm]
npm install @hohaya/ui @vue/composition-api
```

:::

::: warning Vue 2 兼容说明
- Vue 2.7+ 内置 Composition API，无需安装 `@vue/composition-api`
- Vue 2.6 及以下版本必须安装 `@vue/composition-api` v1.7.0+
:::

## 包结构

| 包名 | 说明 | 包含内容 |
|------|------|----------|
| `@hohaya/ui` | 完整包 | 组件库 + 工具库 |
| `@hohaya/hoho` | 组件库 | Vue 组件 + 样式 |
| `@hohaya/hoho-utils` | 工具库 | 工具函数 |

## 快速开始

### Vue 3

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

// 完整安装方式
import HohaUI from '@hohaya/ui'
import '@hohaya/hoho/style.css'

// 或独立安装方式
// import HohaUI from '@hohaya/hoho'
// import '@hohaya/hoho/style.css'

const app = createApp(App)
app.use(HohaUI)
app.mount('#app')
```

### Vue 2

```javascript
// main.js
import Vue from 'vue'
import App from './App.vue'

// Vue 2.6 及以下需要先注册 Composition API
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)

import HohaUI from '@hohaya/ui'
import '@hohaya/hoho/style.css'

Vue.use(HohaUI)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

### 按需引入

```typescript
// 只引入需要的组件
import { HoButton, HoInput, HoToast } from '@hohaya/hoho'
import '@hohaya/hoho/style.css'

// 使用工具函数
import { formatDate, debounce, throttle } from '@hohaya/hoho-utils'
```

## rem 适配

Hoha UI 默认基于 750px 设计稿，支持 rem 适配：

```typescript
// main.ts
import { initFlexible } from '@hohaya/hoho/utils/flexible'

// 默认配置 (750px 设计稿)
initFlexible()

// 自定义配置
initFlexible({
  designWidth: 375,      // 设计稿宽度
  rootFontSize: 16,      // 根字体大小
  maxRootFontSize: 54,   // 最大根字体限制
  limitWidth: true       // 是否限制最大宽度
})
```

## 项目集成

### Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
```

### Nuxt.js

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  vite: {
    optimizeDeps: {
      include: ['@hohaya/ui']
    }
  }
})
```

## 版本说明

Hoha UI 遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范。

## 常见问题

### 与其他 UI 框架共存

Hoha UI 可以与 Element UI、Ant Design Vue 等框架共存：

1. 组件使用 `Ho` 前缀区分
2. 避免同时使用相同功能的组件

### 浏览器兼容

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    target: ['es2015', 'edge88', 'firefox78', 'chrome87', 'safari13.1']
  }
})
```
