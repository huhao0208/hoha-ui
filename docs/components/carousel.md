# Carousel 轮播

用于展示一组图片或内容卡片，支持自动播放、循环滚动、3D 效果等功能。

## 基础用法

通过 `items` 属性传入轮播数据，支持图片数组或自定义内容。

<div class="demo-preview">

<ho-carousel :items="[
  { image: 'https://picsum.photos/400/200?random=1' },
  { image: 'https://picsum.photos/400/200?random=2' },
  { image: 'https://picsum.photos/400/200?random=3' }
]" />

</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-carousel :items="items" />
</template>

<script setup>
const items = [
  { image: 'https://picsum.photos/400/200?random=1' },
  { image: 'https://picsum.photos/400/200?random=2' },
  { image: 'https://picsum.photos/400/200?random=3' }
]
</script>
```

</details>

## 自动播放

设置 `autoplay` 属性开启自动播放，通过 `interval` 控制切换间隔（默认 3000ms）。

<div class="demo-preview">

<ho-carousel 
  :items="[
    { image: 'https://picsum.photos/400/200?random=4' },
    { image: 'https://picsum.photos/400/200?random=5' },
    { image: 'https://picsum.photos/400/200?random=6' }
  ]" 
  autoplay 
  :interval="2000" 
/>

</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-carousel 
    :items="items" 
    autoplay 
    :interval="2000" 
  />
</template>
```

</details>

## 3D 模式

设置 `effect="3d"` 启用 3D 立体切换效果。

<div class="demo-preview">

<ho-carousel 
  :items="[
    { image: 'https://picsum.photos/400/200?random=7' },
    { image: 'https://picsum.photos/400/200?random=8' },
    { image: 'https://picsum.photos/400/200?random=9' }
  ]" 
  effect="3d" 
/>

</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-carousel 
    :items="items" 
    effect="3d" 
  />
</template>
```

</details>

## 垂直轮播

设置 `direction="vertical"` 实现垂直方向的轮播。

<div class="demo-preview">

<ho-carousel 
  :items="[
    { image: 'https://picsum.photos/400/200?random=10' },
    { image: 'https://picsum.photos/400/200?random=11' },
    { image: 'https://picsum.photos/400/200?random=12' }
  ]" 
  direction="vertical" 
  height="200px" 
/>

</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-carousel 
    :items="items" 
    direction="vertical" 
    height="200px" 
  />
</template>
```

</details>

## 指示器样式

通过 `indicator-type` 设置指示器样式，支持 `dots`（圆点）、`lines`（线条）、`numbers`（数字）。通过 `indicator-position` 设置指示器位置。

<div class="demo-preview">

<ho-carousel 
  :items="[
    { image: 'https://picsum.photos/400/200?random=13' },
    { image: 'https://picsum.photos/400/200?random=14' },
    { image: 'https://picsum.photos/400/200?random=15' }
  ]" 
  indicator-type="lines" 
/>

</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-carousel 
    :items="items" 
    indicator-type="lines" 
  />
</template>
```

</details>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 轮播数据数组 | `CarouselItem[]` | `[]` |
| autoplay | 是否自动播放 | `boolean` | `false` |
| interval | 自动播放间隔（毫秒） | `number` | `3000` |
| duration | 动画持续时间（毫秒） | `number` | `500` |
| loop | 是否开启循环播放 | `boolean` | `true` |
| effect | 切换效果，可选值为 `slide` `fade` `3d` | `string` | `slide` |
| direction | 轮播方向，可选值为 `horizontal` `vertical` | `string` | `horizontal` |
| height | 轮播高度 | `string` | `auto` |
| indicator-type | 指示器样式，可选值为 `dots` `lines` `numbers` | `string` | `dots` |
| indicator-position | 指示器位置，可选值为 `bottom` `top` `left` `right` | `string` | `bottom` |
| show-indicator | 是否显示指示器 | `boolean` | `true` |
| touchable | 是否可以通过手势滑动 | `boolean` | `true` |
| pause-on-hover | 鼠标悬停时暂停自动播放 | `boolean` | `true` |

### CarouselItem 数据结构

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| image | 图片地址 | `string` |
| alt | 图片 alt 属性 | `string` |
| id | 唯一标识 | `string \| number` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 轮播切换时触发 | `(index: number, item: CarouselItem)` |
| click | 点击轮播项时触发 | `(index: number, item: CarouselItem)` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义轮播项内容，参数为 `{ item, index }` |
| indicator | 自定义指示器 |

### Methods

通过 ref 可以获取到 Carousel 实例并调用以下方法：

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| prev | 切换到上一张 | - |
| next | 切换到下一张 | - |
| goTo | 切换到指定索引 | `(index: number)` |
| pause | 暂停自动播放 | - |
| start | 开始自动播放 | - |
