# Demo 组件示例

本文档展示如何在 VitePress 文档站点中使用交互式 Demo 组件。

## 基础用法

使用 `DemoBlock` 组件来展示组件效果和源代码：

<DemoBlock :code="`<template>
  <div style='display: flex; gap: 12px;'>
    <HoButton type='primary'>主要按钮</HoButton>
    <HoButton type='success'>成功按钮</HoButton>
    <HoButton type='warning'>警告按钮</HoButton>
  </div>
</template>`">
  <div style="display: flex; gap: 12px;">
    <HoButton type="primary">主要按钮</HoButton>
    <HoButton type="success">成功按钮</HoButton>
    <HoButton type="warning">警告按钮</HoButton>
  </div>
</DemoBlock>

## 功能特性

### 1. 实时预览

DemoBlock 提供一个预览区域，可以实时展示组件效果。

### 2. 代码展示

点击"显示代码"按钮可以查看源代码，再次点击可以隐藏。

### 3. 一键复制

点击"复制代码"按钮可以快速复制代码到剪贴板。

### 4. 暗色模式

DemoBlock 自动适应 VitePress 的暗色模式，无需额外配置。

## 使用方式

在 Markdown 文件中直接使用：

```markdown
<DemoBlock :code="yourCode">
  <!-- 在这里放置要预览的组件 -->
  <HoButton type="primary">点击我</HoButton>
</DemoBlock>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| code | `string` | `''` | 要展示的源代码 |
| language | `string` | `'vue'` | 代码语言（用于语法高亮） |

## 完整示例

<DemoBlock :code="buttonDemoCode">
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <HoButton>默认按钮</HoButton>
    <HoButton type="primary">主要按钮</HoButton>
    <HoButton type="secondary">次要按钮</HoButton>
    <HoButton type="success">成功按钮</HoButton>
    <HoButton type="warning">警告按钮</HoButton>
    <HoButton type="danger">危险按钮</HoButton>
  </div>
</DemoBlock>

<script setup>
const buttonDemoCode = `<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <HoButton>默认按钮</HoButton>
    <HoButton type="primary">主要按钮</HoButton>
    <HoButton type="secondary">次要按钮</HoButton>
    <HoButton type="success">成功按钮</HoButton>
    <HoButton type="warning">警告按钮</HoButton>
    <HoButton type="danger">危险按钮</HoButton>
  </div>
</template>`
</script>
