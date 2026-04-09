---
layout: home

hero:
  name: Hoha UI
  text: 现代化 Vue 组件库
  tagline: 支持 Vue 2/3，提供丰富的 UI 组件和实用工具函数
  image:
    src: /logo.svg
    alt: Hoha UI
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/hoha-ui/hoha-ui

features:
  - icon: 🚀
    title: Vue 2/3 双版本支持
    details: 一套代码同时支持 Vue 2 和 Vue 3，平滑迁移无压力
  - icon: 🎨
    title: 丰富的组件
    details: 提供Button、Input、Icon、Message、Modal等多种常用组件
  - icon: 🛠️
    title: 实用工具函数
    details: 内置 DOM 操作、格式化、存储、类型判断等常用工具函数
  - icon: 📦
    title: 按需引入
    details: 支持 Tree Shaking，只打包你使用的组件和工具
  - icon: 🌙
    title: 深色模式
    details: 内置深色模式支持，一键切换明暗主题
  - icon: 🌍
    title: 国际化
    details: 支持多语言配置，轻松实现国际化
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #3b82f6 30%, #8b5cf6);
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #3b82f6 50%, #8b5cf6 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>

## 快速开始

### 安装

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

### 使用

```typescript
// 完整引入
import { createApp } from 'vue'
import HohaUI from '@hohaya/hoho'
import App from './App.vue'

const app = createApp(App)
app.use(HohaUI)
app.mount('#app')
```

```vue
<!-- 按需引入 -->
<template>
  <HoButton type="primary">主要按钮</HoButton>
  <HoInput v-model="value" placeholder="请输入" />
</template>

<script setup>
import { ref } from 'vue'
import { HoButton, HoInput } from '@hohaya/hoho'

const value = ref('')
</script>
```

## 浏览器支持

| 浏览器 | 支持版本 |
| ------ | ------- |
| Chrome | 最新 2 个版本 |
| Firefox | 最新 2 个版本 |
| Safari | 最新 2 个版本 |
| Edge | 最新 2 个版本 |
