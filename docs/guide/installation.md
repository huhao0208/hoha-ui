# 安装

## 环境要求

在安装 Hoha UI 之前，请确保你的开发环境满足以下要求：

- Node.js 18.0 或更高版本
- Vue 2.6+ 或 Vue 3.0+

## 安装包管理器

Hoha UI 推荐使用 pnpm 作为包管理器，但同时也支持 npm 和 yarn。

::: code-group

```bash [pnpm]
# 如果还没有安装 pnpm
npm install -g pnpm
```

```bash [yarn]
# 如果还没有安装 yarn
npm install -g yarn
```

:::

## 安装依赖

### 组件库

::: code-group

```bash [pnpm]
pnpm add @hohaya/hoho
```

```bash [npm]
npm install @hohaya/hoho
```

```bash [yarn]
yarn add @hohaya/hoho
```

:::

### 工具函数

::: code-group

```bash [pnpm]
pnpm add @hohaya/hoho-utils
```

```bash [npm]
npm install @hohaya/hoho-utils
```

```bash [yarn]
yarn add @hohaya/hoho-utils
```

:::

## 项目集成

### Vite

如果你使用 Vite 作为构建工具：

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

### Vue CLI

如果你使用 Vue CLI 创建项目：

```javascript
// vue.config.js
module.exports = {
  transpileDependencies: ['@hoha']
}
```

### Nuxt.js

如果你使用 Nuxt.js：

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    // ...
  ],
  vite: {
    optimizeDeps: {
      include: ['@hohaya/hoho', '@hohaya/hoho-utils']
    }
  }
})
```

## 版本说明

Hoha UI 遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范：

- **主版本号**：不兼容的 API 变更
- **次版本号**：向下兼容的功能新增
- **修订号**：向下兼容的问题修复

## 常见问题

### 与 Element UI / Ant Design Vue 共存

Hoha UI 可以与其他 UI 框架共存，但需要注意样式冲突问题。建议：

1. 使用组件前缀区分（Hoha UI 使用 `Ho` 前缀）
2. 避免在同一个项目中混用相同功能的组件

### 对旧版浏览器的支持

如果需要支持旧版浏览器，需要在项目中添加相应的 polyfill：

```javascript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    target: ['es2015', 'edge88', 'firefox78', 'chrome87', 'safari13.1']
  }
})
```
