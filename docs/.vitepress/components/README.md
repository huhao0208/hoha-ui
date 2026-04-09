# DemoBlock 组件使用指南

## 概述

DemoBlock 是一个交互式 Demo 容器组件，专为 VitePress 文档站点设计，用于展示组件效果和源代码。

## 文件结构

```
docs/.vitepress/
├── components/
│   └── DemoBlock.vue          # Demo 容器组件
├── theme/
│   └── index.ts               # 主题配置（已注册 DemoBlock）
└── config.ts                  # VitePress 配置
```

## 功能特性

- ✅ **实时预览** - 在预览区域展示组件效果
- ✅ **代码展示** - 可展开/收起源代码
- ✅ **一键复制** - 快速复制代码到剪贴板
- ✅ **暗色模式** - 自动适配深色主题
- ✅ **流畅动画** - 优雅的展开/收起过渡效果
- ✅ **响应式设计** - 适配不同屏幕尺寸

## 使用方法

### 方法一：在 Markdown 中使用 `<script setup>`

```markdown
<script setup>
const demoCode = `<template>
  <HoButton type="primary">主要按钮</HoButton>
</template>`
</script>

<DemoBlock :code="demoCode">
  <HoButton type="primary">主要按钮</HoButton>
</DemoBlock>
```

### 方法二：使用模板字符串

```markdown
<DemoBlock :code="`<template>
  <HoButton type='primary'>主要按钮</HoButton>
</template>`">
  <HoButton type="primary">主要按钮</HoButton>
</DemoBlock>
```

### 方法三：使用代码块

```markdown
<DemoBlock 
  code="<template>
  <HoButton type='primary'>主要按钮</HoButton>
</template>"
>
  <HoButton type="primary">主要按钮</HoButton>
</DemoBlock>
```

## Props API

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| code | `string` | `''` | 要展示的源代码 |
| language | `string` | `'vue'` | 代码语言类型（vue, javascript, typescript, html, css） |

## 完整示例

### 示例 1: 基础按钮

```markdown
<script setup>
const buttonCode = `<template>
  <div style="display: flex; gap: 12px;">
    <HoButton type="primary">主要按钮</HoButton>
    <HoButton type="success">成功按钮</HoButton>
    <HoButton type="warning">警告按钮</HoButton>
  </div>
</template>`
</script>

<DemoBlock :code="buttonCode">
  <div style="display: flex; gap: 12px;">
    <HoButton type="primary">主要按钮</HoButton>
    <HoButton type="success">成功按钮</HoButton>
    <HoButton type="warning">警告按钮</HoButton>
  </div>
</DemoBlock>
```

### 示例 2: 不同尺寸

```markdown
<script setup>
const sizeCode = `<template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <HoButton size="small" type="primary">小型按钮</HoButton>
    <HoButton size="medium" type="primary">中型按钮</HoButton>
    <HoButton size="large" type="primary">大型按钮</HoButton>
  </div>
</template>`
</script>

<DemoBlock :code="sizeCode">
  <div style="display: flex; gap: 12px; align-items: center;">
    <HoButton size="small" type="primary">小型按钮</HoButton>
    <HoButton size="medium" type="primary">中型按钮</HoButton>
    <HoButton size="large" type="primary">大型按钮</HoButton>
  </div>
</DemoBlock>
```

### 示例 3: 带交互的组件

```markdown
<script setup>
import { ref } from 'vue'

const loadingCode = `<template>
  <HoButton type="primary" :loading="loading" @click="handleClick">
    {{ loading ? '加载中...' : '点击加载' }}
  </HoButton>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)

const handleClick = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
<\/script>`

const loading = ref(false)

const handleClick = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<DemoBlock :code="loadingCode">
  <HoButton type="primary" :loading="loading" @click="handleClick">
    {{ loading ? '加载中...' : '点击加载' }}
  </HoButton>
</DemoBlock>
```

## 样式定制

DemoBlock 使用 VitePress 的 CSS 变量，自动适配主题：

```css
/* 主要变量 */
--vp-c-bg              /* 背景色 */
--vp-c-divider         /* 边框色 */
--vp-c-brand           /* 品牌色 */
--vp-c-text-2          /* 次要文字颜色 */
--vp-code-block-bg     /* 代码块背景色 */
```

如需自定义样式，可以在组件中添加 scoped CSS：

```vue
<style scoped>
.demo-block {
  /* 自定义样式 */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>
```

## 最佳实践

1. **保持代码简洁**：示例代码应该简洁明了，突出主要功能
2. **提供上下文**：在 Demo 前后添加文字说明，解释组件用途
3. **一致性**：所有 Demo 使用相似的结构和样式
4. **响应式**：考虑不同屏幕尺寸下的展示效果
5. **可访问性**：为按钮添加适当的 title 属性

## 注意事项

- 确保传入的 `code` prop 是字符串类型
- 预览区域的内容应该与代码一致
- 使用转义字符处理特殊字符（如 `<` 转义为 `&lt;`）
- 在 `<script setup>` 中定义代码变量，避免模板过于复杂

## 技术实现

- **框架**: Vue 3 + TypeScript
- **代码高亮**: VitePress 内置 Shiki
- **主题适配**: CSS 变量 + MutationObserver
- **复制功能**: Clipboard API
- **动画**: Vue Transition + CSS

## 相关文档

- [VitePress 官方文档](https://vitepress.dev/)
- [Vue 3 文档](https://vuejs.org/)
- [Shiki 代码高亮](https://shiki.style/)
