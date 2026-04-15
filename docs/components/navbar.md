# NavBar 导航栏

用于页面顶部的导航栏，支持返回按钮、左右操作区、固定定位等功能。

## 基础用法

通过 `title` 属性设置导航栏标题。

<DemoPreview>
  <HoNavBar title="标题" />
</DemoPreview>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-navbar title="标题" />
</template>
```

</details>

## 左侧返回

设置 `left-arrow` 显示返回箭头，通过 `left-text` 设置左侧文字。点击左侧区域触发 `click-left` 事件。

<DemoPreview>
  <HoNavBar title="标题" left-arrow left-text="返回" @click-left="onClickLeft" />
</DemoPreview>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-navbar 
    title="标题" 
    left-arrow 
    left-text="返回" 
    @click-left="onClickLeft" 
  />
</template>

<script setup>
const onClickLeft = () => {
  // 返回上一页
  history.back()
}
</script>
```

</details>

## 右侧操作

通过 `right-text` 设置右侧文字，或使用 `right` 插槽自定义内容。点击右侧区域触发 `click-right` 事件。

<DemoPreview>
  <HoNavBar title="标题" right-text="按钮" @click-right="onClickRight" />
</DemoPreview>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-navbar 
    title="标题" 
    right-text="按钮" 
    @click-right="onClickRight" 
  />
</template>

<script setup>
const onClickRight = () => {
  console.log('点击右侧按钮')
}
</script>
```

</details>

## 自定义样式

可以通过 `background` 设置背景色，`text-color` 设置文字颜色。

<DemoPreview>
  <HoNavBar 
    title="自定义样式" 
    background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
    text-color="#fff" 
    left-arrow 
    left-text="返回" 
  />
</DemoPreview>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-navbar 
    title="自定义样式" 
    background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
    text-color="#fff" 
    left-arrow 
    left-text="返回" 
  />
</template>
```

</details>

## 固定定位

设置 `fixed` 使导航栏固定在顶部，配合 `placeholder` 在文档流中占位。

<DemoPreview>
  <HoNavBar title="固定导航栏" fixed placeholder />
</DemoPreview>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-navbar 
    title="固定导航栏" 
    fixed 
    placeholder 
  />
</template>
```

</details>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | - |
| left-text | 左侧文字 | `string` | - |
| right-text | 右侧文字 | `string` | - |
| left-arrow | 是否显示左侧返回箭头 | `boolean` | `false` |
| fixed | 是否固定在顶部 | `boolean` | `false` |
| placeholder | 固定定位时是否在文档流中占位 | `boolean` | `false` |
| border | 是否显示下边框 | `boolean` | `true` |
| background | 背景色 | `string` | `#fff` |
| text-color | 文字颜色 | `string` | `#323233` |
| z-index | 元素层级 | `number` | `100` |
| safe-area-inset-top | 是否开启顶部安全区域适配 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click-left | 点击左侧区域时触发 | - |
| click-right | 点击右侧区域时触发 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| title | 自定义标题 |
| left | 自定义左侧内容 |
| right | 自定义右侧内容 |

<script setup>
const onClickLeft = () => console.log('click left')
const onClickRight = () => console.log('click right')
</script>
