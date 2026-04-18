# Carousel V2 轮播

新版本轮播组件，性能更好、代码更简洁。

## 基础用法

<DemoPreview>
<ho-carousel-v2 
  :items="[
    { image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop', alt: '山峰' },
    { image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=300&fit=crop', alt: '森林' },
    { image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=600&h=300&fit=crop', alt: '湖泊' }
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
    { image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop', alt: '人像1' },
    { image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=300&fit=crop', alt: '人像2' },
    { image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&h=300&fit=crop', alt: '人像3' }
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
    { image: 'https://images.unsplash.com/photo-1518792518502-7d36c3c5a0f2?w=600&h=300&fit=crop', alt: '建筑1' },
    { image: 'https://images.unsplash.com/photo-1486325212027-c807663b288b?w=600&h=300&fit=crop', alt: '建筑2' },
    { image: 'https://images.unsplash.com/photo-1545555606-3e6200af4bde?w=600&h=300&fit=crop', alt: '建筑3' }
  ]"
  height="200px"
  show-arrow
/>
</DemoPreview>

## Fade 模式

<DemoPreview>
<ho-carousel-v2 
  :items="[
    { image: 'https://images.unsplash.com/photo-1474515830253-0e5c0e5a3b5d?w=600&h=300&fit=crop', alt: '动物1' },
    { image: 'https://images.unsplash.com/photo-1518712977554-0c0b4c0a3b5e?w=600&h=300&fit=crop', alt: '动物2' },
    { image: 'https://images.unsplash.com/photo-1538072465307-5c5f9c7d5e5f?w=600&h=300&fit=crop', alt: '动物3' }
  ]"
  height="200px"
  effect="fade"
/>
</DemoPreview>

## 3D 模式

<DemoPreview>
<ho-carousel-v2 
  :items="[
    { image: 'https://images.unsplash.com/photo-1502082550-68a6d4b6e6e6?w=600&h=300&fit=crop', alt: '科技1' },
    { image: 'https://images.unsplash.com/photo-1518776142930-14eb0d1933a9?w=600&h=300&fit=crop', alt: '科技2' },
    { image: 'https://images.unsplash.com/photo-1531294020314-2c3f3b3b3b3f?w=600&h=300&fit=crop', alt: '科技3' },
    { image: 'https://images.unsplash.com/photo-1550751822-3c3c3c3c3c3c?w=600&h=300&fit=crop', alt: '科技4' },
    { image: 'https://images.unsplash.com/photo-1600857544200-b3f3c3c3c3c3?w=600&h=300&fit=crop', alt: '科技5' }
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
