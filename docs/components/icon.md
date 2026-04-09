# Icon 图标

常用的图标组件。

## 基础用法

使用 `icon` 属性来指定图标名称，或使用默认插槽插入 SVG。

<div class="demo-preview">
  <HoIcon icon="check" size="24" style="margin: 8px;" />
  <HoIcon icon="close" size="24" color="#ef4444" style="margin: 8px;" />
  <HoIcon icon="info" size="32" color="#3b82f6" style="margin: 8px;" />
</div>

```vue
<template>
  <HoIcon icon="check" size="24" />
  <HoIcon icon="close" size="24" color="#ef4444" />
  <HoIcon icon="info" size="32" color="#3b82f6" />
</template>
```

## 图标尺寸

使用 `size` 属性来设置图标大小。

<div class="demo-preview">
  <HoIcon icon="star" size="16" style="margin: 8px;" />
  <HoIcon icon="star" size="24" style="margin: 8px;" />
  <HoIcon icon="star" size="32" style="margin: 8px;" />
  <HoIcon icon="star" size="48" style="margin: 8px;" />
</div>

```vue
<template>
  <HoIcon icon="star" size="16" />
  <HoIcon icon="star" size="24" />
  <HoIcon icon="star" size="32" />
  <HoIcon icon="star" size="48" />
</template>
```

## 图标颜色

使用 `color` 属性来设置图标颜色。

<div class="demo-preview">
  <HoIcon icon="heart" size="24" color="#ef4444" style="margin: 8px;" />
  <HoIcon icon="heart" size="24" color="#10b981" style="margin: 8px;" />
  <HoIcon icon="heart" size="24" color="#3b82f6" style="margin: 8px;" />
  <HoIcon icon="heart" size="24" color="#f59e0b" style="margin: 8px;" />
</div>

```vue
<template>
  <HoIcon icon="heart" size="24" color="#ef4444" />
  <HoIcon icon="heart" size="24" color="#10b981" />
  <HoIcon icon="heart" size="24" color="#3b82f6" />
  <HoIcon icon="heart" size="24" color="#f59e0b" />
</template>
```

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 图标名称 | `string` | `''` |
| size | 图标大小 | `string \| number` | `'1em'` |
| color | 图标颜色 | `string` | `''` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义图标内容 |
