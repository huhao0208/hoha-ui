---
title: Icon 图标
---

# Icon 图标

基于 Iconify 的图标组件，支持 200,000+ 图标，按需加载。

## 基础用法

使用 `name` 属性指定图标名称，格式为 `图标集:图标名`。

<div class="demo-preview">
  <HoIcon name="mdi:home" />
  <HoIcon name="mdi:account" />
  <HoIcon name="mdi:cog" />
  <HoIcon name="mdi:bell" />
  <HoIcon name="mdi:heart" />
</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <div class="icon-demo">
    <ho-icon name="mdi:home" />
    <ho-icon name="mdi:account" />
    <ho-icon name="mdi:cog" />
    <ho-icon name="mdi:bell" />
    <ho-icon name="mdi:heart" />
  </div>
</template>

<style>
.icon-demo {
  display: flex;
  gap: 16px;
  align-items: center;
}
</style>
```

</details>

## 图标尺寸

支持 `small`、`medium`、`large` 三种预设尺寸，或直接传入数字。

<div class="demo-preview">
  <HoIcon name="mdi:star" size="small" />
  <HoIcon name="mdi:star" size="medium" />
  <HoIcon name="mdi:star" size="large" />
  <HoIcon name="mdi:star" :size="48" />
</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-icon name="mdi:star" size="small" />
  <ho-icon name="mdi:star" size="medium" />
  <ho-icon name="mdi:star" size="large" />
  <ho-icon name="mdi:star" :size="48" />
</template>
```

</details>

## 图标颜色

使用 `color` 属性设置图标颜色。

<div class="demo-preview">
  <HoIcon name="mdi:heart" color="#ef4444" />
  <HoIcon name="mdi:heart" color="#3b82f6" />
  <HoIcon name="mdi:heart" color="#10b981" />
  <HoIcon name="mdi:heart" color="#f59e0b" />
</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-icon name="mdi:heart" color="#ef4444" />
  <ho-icon name="mdi:heart" color="#3b82f6" />
  <ho-icon name="mdi:heart" color="#10b981" />
  <ho-icon name="mdi:heart" color="#f59e0b" />
</template>
```

</details>

## 可点击图标

设置 `clickable` 属性使图标可点击，会有悬浮效果。

<div class="demo-preview">
  <HoIcon name="mdi:thumb-up" clickable />
  <HoIcon name="mdi:share-variant" clickable />
  <HoIcon name="mdi:bookmark" clickable />
</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-icon name="mdi:thumb-up" clickable @click="handleClick('点赞')" />
  <ho-icon name="mdi:share-variant" clickable @click="handleClick('分享')" />
  <ho-icon name="mdi:bookmark" clickable @click="handleClick('收藏')" />
</template>

<script setup>
const handleClick = (action) => {
  alert(`点击了: ${action}`)
}
</script>
```

</details>

## 旋转与翻转

使用 `rotate` 和 `flip` 属性控制图标变换。

<div class="demo-preview">
  <HoIcon name="mdi:arrow-left" />
  <HoIcon name="mdi:arrow-left" :rotate="90" />
  <HoIcon name="mdi:arrow-left" :rotate="180" />
  <HoIcon name="mdi:arrow-left" :rotate="270" />
  <HoIcon name="mdi:arrow-left" flip="horizontal" />
  <HoIcon name="mdi:arrow-left" flip="vertical" />
</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-icon name="mdi:arrow-left" />
  <ho-icon name="mdi:arrow-left" :rotate="90" />
  <ho-icon name="mdi:arrow-left" :rotate="180" />
  <ho-icon name="mdi:arrow-left" :rotate="270" />
  <ho-icon name="mdi:arrow-left" flip="horizontal" />
  <ho-icon name="mdi:arrow-left" flip="vertical" />
</template>
```

</details>

## 常用图标集

Iconify 支持多种图标集，以下是常用的图标集前缀：

| 图标集 | 前缀 | 图标数量 | 说明 |
|--------|------|----------|------|
| Material Design Icons | `mdi:` | 7000+ | Google Material 图标 |
| Font Awesome | `fa:`, `fa6-solid:`, `fa6-regular:` | 10000+ | 经典图标库 |
| Remix Icon | `ri:` | 2500+ | 开源图标系统 |
| Carbon | `carbon:` | 1800+ | IBM 设计系统 |
| Tabler Icons | `tabler:` | 5000+ | 简洁线条图标 |
| Ant Design Icons | `ant-design:` | 800+ | 蚂蚁设计图标 |
| Heroicons | `heroicons:`, `heroicons-outline:` | 300+ | Tailwind 官方图标 |
| Lucide | `lucide:` | 1500+ | Feather 图标扩展 |

## 图标搜索

可以在 [Iconify 官网](https://icon-sets.iconify.design/) 搜索图标，找到合适的图标后复制其名称使用。

<div class="demo-preview icon-grid">
  <div class="icon-item">
    <HoIcon name="mdi:home" size="large" />
    <span>mdi:home</span>
  </div>
  <div class="icon-item">
    <HoIcon name="mdi:account-circle" size="large" />
    <span>mdi:account-circle</span>
  </div>
  <div class="icon-item">
    <HoIcon name="mdi:cog" size="large" />
    <span>mdi:cog</span>
  </div>
  <div class="icon-item">
    <HoIcon name="mdi:bell" size="large" />
    <span>mdi:bell</span>
  </div>
  <div class="icon-item">
    <HoIcon name="mdi:heart" size="large" />
    <span>mdi:heart</span>
  </div>
  <div class="icon-item">
    <HoIcon name="mdi:star" size="large" />
    <span>mdi:star</span>
  </div>
  <div class="icon-item">
    <HoIcon name="mdi:magnify" size="large" />
    <span>mdi:magnify</span>
  </div>
  <div class="icon-item">
    <HoIcon name="mdi:cart" size="large" />
    <span>mdi:cart</span>
  </div>
  <div class="icon-item">
    <HoIcon name="ri:home-smile-line" size="large" />
    <span>ri:home-smile-line</span>
  </div>
  <div class="icon-item">
    <HoIcon name="ri:user-heart-line" size="large" />
    <span>ri:user-heart-line</span>
  </div>
  <div class="icon-item">
    <HoIcon name="carbon:home" size="large" />
    <span>carbon:home</span>
  </div>
  <div class="icon-item">
    <HoIcon name="carbon:user-avatar" size="large" />
    <span>carbon:user-avatar</span>
  </div>
  <div class="icon-item">
    <HoIcon name="fa6-solid:house" size="large" />
    <span>fa6-solid:house</span>
  </div>
  <div class="icon-item">
    <HoIcon name="fa6-solid:user" size="large" />
    <span>fa6-solid:user</span>
  </div>
  <div class="icon-item">
    <HoIcon name="tabler:home" size="large" />
    <span>tabler:home</span>
  </div>
  <div class="icon-item">
    <HoIcon name="tabler:user" size="large" />
    <span>tabler:user</span>
  </div>
  <div class="icon-item">
    <HoIcon name="lucide:home" size="large" />
    <span>lucide:home</span>
  </div>
  <div class="icon-item">
    <HoIcon name="lucide:user" size="large" />
    <span>lucide:user</span>
  </div>
  <div class="icon-item">
    <HoIcon name="heroicons:home" size="large" />
    <span>heroicons:home</span>
  </div>
  <div class="icon-item">
    <HoIcon name="heroicons:user" size="large" />
    <span>heroicons:user</span>
  </div>
</div>

<style>
.icon-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
.icon-item span {
  font-size: 12px;
  color: var(--vp-c-text-2);
  word-break: break-all;
}
@media (max-width: 768px) {
  .icon-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | 图标名称，格式为 `图标集:图标名` | `string` | - |
| size | 图标尺寸，支持预设值或数字(px) | `'small' \| 'medium' \| 'large' \| number` | `'medium'` |
| color | 图标颜色 | `string` | - |
| rotate | 旋转角度(度) | `number \| string` | - |
| flip | 翻转方式 | `'horizontal' \| 'vertical' \| 'both'` | - |
| inline | 是否内联显示 | `boolean` | `false` |
| clickable | 是否可点击(有悬浮效果) | `boolean` | `false` |

### Events

| 事件 | 说明 | 回调参数 |
|------|------|----------|
| click | 点击图标时触发(需设置 `clickable`) | `(event: MouseEvent)` |

### 预设尺寸

| 尺寸 | 像素值 |
|------|--------|
| small | 16px |
| medium | 24px |
| large | 32px |
