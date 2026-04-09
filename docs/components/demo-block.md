# DemoBlock 组件

交互式 Demo 容器组件，用于在 VitePress 文档站点中展示组件效果和源代码。

## 安装

DemoBlock 组件已集成到 Hoha UI 文档站点中，无需额外安装。

## 功能特性

- ✅ 实时预览组件效果
- ✅ 显示/隐藏源代码
- ✅ 一键复制代码
- ✅ 支持暗色模式自动切换
- ✅ 流畅的展开/收起动画
- ✅ 支持多种代码语言高亮

## 使用方法

### 在 Markdown 中使用

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

### Props

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| code | `string` | `''` | 要展示的源代码 |
| language | `string` | `'vue'` | 代码语言类型 |

## 示例

### 基础示例

<script setup>
const basicCode = `<template>
  <div class="button-group">
    <HoButton type="primary">主要按钮</HoButton>
    <HoButton type="success">成功按钮</HoButton>
  </div>
</template>

<style scoped>
.button-group {
  display: flex;
  gap: 12px;
}
</style>`
</script>

<DemoBlock :code="basicCode">
  <div style="display: flex; gap: 12px;">
    <HoButton type="primary">主要按钮</HoButton>
    <HoButton type="success">成功按钮</HoButton>
  </div>
</DemoBlock>

### 不同尺寸

<script setup>
const sizeCode = `<template>
  <div class="size-demo">
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

## 实现细节

### 组件结构

```vue
<template>
  <div class="demo-block">
    <!-- 预览区域 -->
    <div class="demo-block__preview">
      <slot></slot>
    </div>
    
    <!-- 操作按钮 -->
    <div class="demo-block__actions">
      <button @click="toggleCode">显示/隐藏代码</button>
      <button @click="copyCode">复制代码</button>
    </div>
    
    <!-- 代码区域 -->
    <div v-show="showCode" class="demo-block__code">
      <pre><code>{{ code }}</code></pre>
    </div>
  </div>
</template>
```

### 样式定制

DemoBlock 使用 VitePress 的 CSS 变量，自动适配主题：

- `--vp-c-bg`: 背景色
- `--vp-c-divider`: 边框色
- `--vp-c-brand`: 品牌色
- `--vp-c-text`: 文字颜色
- `--vp-code-block-bg`: 代码块背景色

## 最佳实践

1. **保持代码简洁**：示例代码应该简洁明了，突出主要功能
2. **提供上下文**：在 Demo 前后添加文字说明，解释组件用途
3. **一致性**：所有 Demo 使用相似的结构和样式
4. **响应式**：考虑不同屏幕尺寸下的展示效果
