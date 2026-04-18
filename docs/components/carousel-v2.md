# Carousel V2 轮播

新版本轮播组件，性能更好、代码更简洁。

## 基础用法

<DemoPreview>
<ho-carousel-v2 
  :items="[
    { image: 'https://picsum.photos/seed/a1/600/300', alt: '图片A' },
    { image: 'https://picsum.photos/seed/b2/600/300', alt: '图片B' },
    { image: 'https://picsum.photos/seed/c3/600/300', alt: '图片C' }
  ]"
  height="200px"
/>
</DemoPreview>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-carousel-v2 :items="items" height="200px" />
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

<DemoPreview>
<ho-carousel-v2 
  :items="[
    { image: 'https://picsum.photos/seed/d4/600/300', alt: '风景D' },
    { image: 'https://picsum.photos/seed/e5/600/300', alt: '风景E' },
    { image: 'https://picsum.photos/seed/f6/600/300', alt: '风景F' }
  ]"
  height="200px"
  autoplay
  :interval="2000"
/>
</DemoPreview>

<details>
<summary>显示代码</summary>

```vue
<ho-carousel-v2 :items="items" autoplay :interval="2000" height="200px" />
```

</details>

## 带箭头

<DemoPreview>
<ho-carousel-v2 
  :items="[
    { image: 'https://picsum.photos/seed/g7/600/300', alt: '建筑G' },
    { image: 'https://picsum.photos/seed/h8/600/300', alt: '建筑H' },
    { image: 'https://picsum.photos/seed/i9/600/300', alt: '建筑I' }
  ]"
  height="200px"
  show-arrow
/>
</DemoPreview>

## Fade 模式

<DemoPreview>
<ho-carousel-v2 
  :items="[
    { image: 'https://picsum.photos/seed/j10/600/300', alt: '动物J' },
    { image: 'https://picsum.photos/seed/k11/600/300', alt: '动物K' },
    { image: 'https://picsum.photos/seed/l12/600/300', alt: '动物L' }
  ]"
  height="200px"
  effect="fade"
/>
</DemoPreview>

## 3D 模式

<DemoPreview>
<ho-carousel-v2 
  :items="[
    { image: 'https://picsum.photos/seed/m13/600/300', alt: '人物M' },
    { image: 'https://picsum.photos/seed/n14/600/300', alt: '人物N' },
    { image: 'https://picsum.photos/seed/o15/600/300', alt: '人物O' },
    { image: 'https://picsum.photos/seed/p16/600/300', alt: '人物P' },
    { image: 'https://picsum.photos/seed/q17/600/300', alt: '人物Q' }
  ]"
  height="220px"
  effect="3d"
/>
</DemoPreview>

<p style="font-size: 12px; color: #666; margin-top: 8px;">💡 点击左右两侧图片可切换</p>

## 图片缩放

<DemoPreview>
<ho-carousel-v2 
  :items="[
    { image: 'https://picsum.photos/800/400?random=10' }
  ]"
  height="150px"
  fit="contain"
/>
</DemoPreview>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| items | 轮播数据 | `Array` | `[]` |
| modelValue | 当前索引 | `number` | `0` |
| autoplay | 自动播放 | `boolean` | `false` |
| interval | 自动播放间隔 | `number` | `3000` |
| duration | 动画时长 | `number` | `500` |
| loop | 循环播放 | `boolean` | `true` |
| effect | 切换效果 | `'slide' \| 'fade' \| '3d'` | `'slide'` |
| perspective | 3D 透视距离 | `number` | `1000` |
| width | 宽度 | `string \| number` | `'100%'` |
| height | 高度 | `string \| number` | `'auto'` |
| showIndicator | 显示指示器 | `boolean` | `true` |
| showArrow | 显示箭头 | `boolean` | `false` |
| fit | 图片缩放模式 | `string` | `'cover'` |

### Events

| 事件 | 说明 | 参数 |
|------|------|------|
| update:modelValue | 索引变化 | `(index: number)` |
| change | 切换时触发 | `(index: number, item: object)` |

### fit 可选值

- `cover` - 保持比例填充，可能裁剪
- `contain` - 保持比例完整显示
- `fill` - 拉伸填满
- `none` - 原始尺寸
- `scale-down` - 取 none 和 contain 中较小者
