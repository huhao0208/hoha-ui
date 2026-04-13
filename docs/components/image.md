# Image 图片

用于展示图片，支持懒加载、填充模式、预览、圆角等功能。

## 基础用法

通过 `src` 属性设置图片地址。

<div class="demo-preview">

<ho-image 
  src="https://picsum.photos/200/200?random=1" 
  width="200px" 
  height="200px" 
/>

</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-image 
    src="https://picsum.photos/200/200?random=1" 
    width="200px" 
    height="200px" 
  />
</template>
```

</details>

## 懒加载

设置 `lazy` 属性开启懒加载，图片进入可视区域时才开始加载。

<div class="demo-preview">

<ho-image 
  lazy 
  src="https://picsum.photos/200/200?random=2" 
  width="200px" 
  height="200px" 
/>

</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-image 
    lazy 
    src="https://picsum.photos/200/200?random=2" 
    width="200px" 
    height="200px" 
  />
</template>
```

</details>

## 填充模式

通过 `fit` 属性设置图片填充模式，可选值：`contain`、`cover`、`fill`、`none`、`scale-down`。

<div class="demo-preview">

<div style="display: flex; gap: 16px;">
  <div>
    <ho-image 
      src="https://picsum.photos/200/200?random=3" 
      width="100px" 
      height="100px" 
      fit="contain"
    />
    <p style="text-align: center; font-size: 12px; color: #666;">contain</p>
  </div>
  <div>
    <ho-image 
      src="https://picsum.photos/200/200?random=3" 
      width="100px" 
      height="100px" 
      fit="cover"
    />
    <p style="text-align: center; font-size: 12px; color: #666;">cover</p>
  </div>
  <div>
    <ho-image 
      src="https://picsum.photos/200/200?random=3" 
      width="100px" 
      height="100px" 
      fit="fill"
    />
    <p style="text-align: center; font-size: 12px; color: #666;">fill</p>
  </div>
</div>

</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-image src="..." fit="contain" />
  <ho-image src="..." fit="cover" />
  <ho-image src="..." fit="fill" />
</template>
```

</details>

## 预览功能

设置 `preview` 属性开启图片预览功能，点击图片可以全屏预览并支持缩放。

<div class="demo-preview">

<ho-image 
  preview 
  src="https://picsum.photos/400/300?random=4" 
  width="200px" 
  height="150px" 
/>

</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-image 
    preview 
    src="https://picsum.photos/400/300?random=4" 
    width="200px" 
    height="150px" 
  />
</template>
```

</details>

## 圆角/圆形

通过 `round` 设置圆角，通过 `circle` 设置圆形，也可以通过 `radius` 自定义圆角大小。

<div class="demo-preview">

<div style="display: flex; gap: 16px; align-items: center;">
  <ho-image 
    round 
    src="https://picsum.photos/100/100?random=5" 
    width="100px" 
    height="100px" 
  />
  <ho-image 
    circle 
    src="https://picsum.photos/100/100?random=6" 
    width="100px" 
    height="100px" 
  />
  <ho-image 
    :radius="20" 
    src="https://picsum.photos/100/100?random=7" 
    width="100px" 
    height="100px" 
  />
</div>

</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <!-- 圆角 -->
  <ho-image round src="..." />
  
  <!-- 圆形 -->
  <ho-image circle src="..." />
  
  <!-- 自定义圆角 -->
  <ho-image :radius="20" src="..." />
</template>
```

</details>

## 加载状态

可以自定义加载中和加载失败的提示内容。

<div class="demo-preview">

<ho-image 
  src="invalid-url" 
  width="100px" 
  height="100px"
>
  <template #error>
    <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #999;">
      加载失败
    </div>
  </template>
</ho-image>

</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-image src="invalid-url" width="100px" height="100px">
    <template #error>
      <div>加载失败</div>
    </template>
  </ho-image>
</template>
```

</details>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片地址 | `string` | - |
| alt | 图片 alt 属性 | `string` | - |
| lazy | 是否开启懒加载 | `boolean` | `false` |
| fit | 图片填充模式 | `string` | `cover` |
| width | 宽度 | `string \| number` | - |
| height | 高度 | `string \| number` | - |
| round | 是否显示为圆角 | `boolean` | `false` |
| circle | 是否显示为圆形 | `boolean` | `false` |
| radius | 圆角大小 | `string \| number` | - |
| preview | 是否开启预览 | `boolean` | `false` |
| show-loading | 是否显示加载中提示 | `boolean` | `true` |
| show-error | 是否显示加载失败提示 | `boolean` | `true` |
| show-zoom-controls | 预览时是否显示缩放控件 | `boolean` | `true` |
| min-zoom | 最小缩放比例 | `number` | `0.5` |
| max-zoom | 最大缩放比例 | `number` | `3` |

### Fit 可选值

| 值 | 说明 |
| --- | --- |
| contain | 保持纵横比缩放，使图片完整显示 |
| cover | 保持纵横比缩放，填满容器，可能裁剪 |
| fill | 拉伸填满容器 |
| none | 保持原始尺寸 |
| scale-down | 取 none 和 contain 中较小者 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| load | 图片加载完成时触发 | `(event: Event)` |
| error | 图片加载失败时触发 | `(event: Event)` |
| preview-open | 预览打开时触发 | - |
| preview-close | 预览关闭时触发 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| loading | 自定义加载中提示 |
| error | 自定义加载失败提示 |

<script setup>
const imageUrl = 'https://picsum.photos/400/200?random=1'
const imageUrls = [
  'https://picsum.photos/400/200?random=1',
  'https://picsum.photos/400/200?random=2',
  'https://picsum.photos/400/200?random=3'
]
</script>
