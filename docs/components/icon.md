# Icon 图标

语义化的矢量图标。

## 基础用法

使用 `icon` 属性来指定图标名称（需要配合 SVG Sprite 使用），或直接使用插槽放置图标内容。

::: demo
```vue
<template>
  <div class="icon-demo">
    <HoIcon :size="24">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    </HoIcon>
    <HoIcon :size="32">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    </HoIcon>
    <HoIcon :size="40">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z"/>
      </svg>
    </HoIcon>
  </div>
</template>

<style scoped>
.icon-demo {
  display: flex;
  gap: 16px;
  align-items: center;
}
</style>
```
:::

## 图标尺寸

使用 `size` 属性设置图标尺寸。

::: demo
```vue
<template>
  <div class="icon-demo">
    <HoIcon :size="16">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    </HoIcon>
    <HoIcon :size="24">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    </HoIcon>
    <HoIcon :size="32">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    </HoIcon>
    <HoIcon :size="48">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    </HoIcon>
  </div>
</template>

<style scoped>
.icon-demo {
  display: flex;
  gap: 16px;
  align-items: center;
}
</style>
```
:::

## 图标颜色

使用 `color` 属性设置图标颜色。

::: demo
```vue
<template>
  <div class="icon-demo">
    <HoIcon :size="24" color="#3b82f6">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    </HoIcon>
    <HoIcon :size="24" color="#10b981">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    </HoIcon>
    <HoIcon :size="24" color="#f59e0b">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    </HoIcon>
    <HoIcon :size="24" color="#ef4444">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    </HoIcon>
  </div>
</template>

<style scoped>
.icon-demo {
  display: flex;
  gap: 16px;
  align-items: center;
}
</style>
```
:::

## 在组件中使用图标

图标可以配合其他组件使用。

::: demo
```vue
<template>
  <div class="icon-demo">
    <HoButton type="primary">
      <HoIcon :size="16" style="margin-right: 4px">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
        </svg>
      </HoIcon>
      刷新
    </HoButton>
    
    <HoInput v-model="search" placeholder="搜索">
      <template #prefix>
        <HoIcon :size="16">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </HoIcon>
      </template>
    </HoInput>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const search = ref('')
</script>

<style scoped>
.icon-demo {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}
</style>
```
:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 图标名称（配合 SVG Sprite 使用） | `string` | `''` |
| size | 图标尺寸 | `string \| number` | `'1em'` |
| color | 图标颜色 | `string` | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义图标内容 |

## 使用第三方图标库

Hoha UI 的 Icon 组件设计为通用图标容器，你可以配合任何 SVG 图标库使用：

### 使用 iconify

```bash
pnpm add @iconify/vue
```

```vue
<template>
  <Icon icon="mdi:home" :width="24" />
</template>

<script setup>
import { Icon } from '@iconify/vue'
</script>
```

### 使用自定义 SVG Sprite

1. 准备 SVG Sprite 文件：

```xml
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <symbol id="icon-home" viewBox="0 0 24 24">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </symbol>
  <symbol id="icon-user" viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </symbol>
</svg>
```

2. 使用 Icon 组件：

```vue
<template>
  <HoIcon icon="icon-home" :size="24" />
  <HoIcon icon="icon-user" :size="24" />
</template>
```
