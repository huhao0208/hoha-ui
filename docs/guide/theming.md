# 主题定制

Hoha UI 支持通过 CSS 变量自定义主题样式。

## CSS 变量

Hoha UI 使用 CSS 变量定义组件样式，你可以通过覆盖这些变量来自定义主题。

### 主色调

```css
:root {
  /* 主色 */
  --ho-color-primary: #3b82f6;
  --ho-color-primary-light: #60a5fa;
  --ho-color-primary-dark: #2563eb;
  
  /* 功能色 */
  --ho-color-success: #10b981;
  --ho-color-warning: #f59e0b;
  --ho-color-danger: #ef4444;
  --ho-color-info: #06b6d4;
  
  /* 文字色 */
  --ho-color-text-primary: #111827;
  --ho-color-text-regular: #374151;
  --ho-color-text-secondary: #6b7280;
  --ho-color-text-placeholder: #9ca3af;
  
  /* 边框色 */
  --ho-color-border: #d1d5db;
  --ho-color-border-light: #e5e7eb;
  
  /* 背景色 */
  --ho-color-bg: #ffffff;
  --ho-color-bg-page: #f9fafb;
  
  /* 圆角 */
  --ho-radius-small: 4px;
  --ho-radius-medium: 6px;
  --ho-radius-large: 8px;
  
  /* 阴影 */
  --ho-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ho-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --ho-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

### 深色模式

```css
html.dark {
  /* 主色 */
  --ho-color-primary: #60a5fa;
  --ho-color-primary-light: #93c5fd;
  --ho-color-primary-dark: #3b82f6;
  
  /* 功能色 */
  --ho-color-success: #34d399;
  --ho-color-warning: #fbbf24;
  --ho-color-danger: #f87171;
  --ho-color-info: #22d3ee;
  
  /* 文字色 */
  --ho-color-text-primary: #f9fafb;
  --ho-color-text-regular: #e5e7eb;
  --ho-color-text-secondary: #9ca3af;
  --ho-color-text-placeholder: #6b7280;
  
  /* 边框色 */
  --ho-color-border: #374151;
  --ho-color-border-light: #4b5563;
  
  /* 背景色 */
  --ho-color-bg: #1f2937;
  --ho-color-bg-page: #111827;
}
```

## 自定义主题

### 方式一：全局覆盖

在你的全局样式文件中覆盖变量：

```css
/* styles/custom.css */
:root {
  --ho-color-primary: #8b5cf6; /* 改为紫色 */
  --ho-radius-medium: 12px; /* 更大的圆角 */
}
```

然后在入口文件中引入：

```typescript
// main.ts
import 'virtual:uno.css'
import './styles/custom.css'
```

### 方式二：组件级别覆盖

你可以针对特定组件覆盖样式：

```vue
<template>
  <div class="custom-theme">
    <HoButton type="primary">自定义主题按钮</HoButton>
  </div>
</template>

<style scoped>
.custom-theme {
  --ho-color-primary: #ec4899;
}
</style>
```

## 深色模式切换

Hoha UI 内置支持深色模式切换。你可以通过以下方式实现：

### CSS 类名切换

```typescript
// 切换深色模式
function toggleDark() {
  const html = document.documentElement
  if (html.classList.contains('dark')) {
    html.classList.remove('dark')
    localStorage.set('theme', 'light')
  } else {
    html.classList.add('dark')
    localStorage.set('theme', 'dark')
  }
}

// 初始化时读取存储的主题偏好
const savedTheme = localStorage.get('theme')
if (savedTheme === 'dark' || 
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
}
```

### 自动跟随系统

```typescript
// 监听系统主题变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (localStorage.get('theme') === null) {
    document.documentElement.classList.toggle('dark', e.matches)
  }
})
```

## 最佳实践

1. **使用 CSS 变量**：优先使用 CSS 变量而不是硬编码颜色值
2. **保持一致性**：主题变量在整个应用中保持一致
3. **测试对比度**：确保文字和背景的对比度符合可访问性标准
4. **考虑深色模式**：设计颜色时同时考虑浅色和深色两种模式
