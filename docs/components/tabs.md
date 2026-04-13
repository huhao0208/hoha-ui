# Tabs 标签页

用于在不同内容区域之间进行切换，支持滑动切换、徽标、粘性定位等功能。

## 基础用法

通过 `tabs` 属性传入标签数据，使用 `v-model` 绑定当前激活的标签索引或 ID。

<div class="demo-preview">

<ho-tabs 
  v-model="activeTab" 
  :tabs="[
    { title: '标签一', content: '内容一' },
    { title: '标签二', content: '内容二' },
    { title: '标签三', content: '内容三' }
  ]" 
/>

</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-tabs v-model="activeTab" :tabs="tabs" />
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref(0)
const tabs = [
  { title: '标签一', content: '内容一' },
  { title: '标签二', content: '内容二' },
  { title: '标签三', content: '内容三' }
]
</script>
```

</details>

## 滑动切换

设置 `swipeable` 属性开启手势滑动切换。

<div class="demo-preview">

<ho-tabs 
  v-model="activeTab2" 
  :tabs="[
    { title: '首页', content: '首页内容' },
    { title: '推荐', content: '推荐内容' },
    { title: '热门', content: '热门内容' },
    { title: '关注', content: '关注内容' }
  ]" 
  swipeable 
/>

</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-tabs v-model="activeTab" :tabs="tabs" swipeable />
</template>
```

</details>

## 徽标

通过 `badge` 属性设置数字徽标，通过 `dot` 属性显示红点。

<div class="demo-preview">

<ho-tabs 
  v-model="activeTab3" 
  :tabs="[
    { title: '消息', badge: 5 },
    { title: '通知', badge: 99 },
    { title: '待办', dot: true },
    { title: '设置' }
  ]" 
/>

</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-tabs v-model="activeTab" :tabs="tabs" />
</template>

<script setup>
const tabs = [
  { title: '消息', badge: 5 },
  { title: '通知', badge: 99 },
  { title: '待办', dot: true },
  { title: '设置' }
]
</script>
```

</details>

## 禁用状态

设置 `disabled` 属性禁用某个标签。

<div class="demo-preview">

<ho-tabs 
  v-model="activeTab4" 
  :tabs="[
    { title: '标签一', content: '内容一' },
    { title: '标签二', content: '内容二', disabled: true },
    { title: '标签三', content: '内容三' }
  ]" 
/>

</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-tabs v-model="activeTab" :tabs="tabs" />
</template>

<script setup>
const tabs = [
  { title: '标签一', content: '内容一' },
  { title: '标签二', content: '内容二', disabled: true },
  { title: '标签三', content: '内容三' }
]
</script>
```

</details>

## 粘性定位

设置 `sticky` 属性使标签栏在滚动时固定在顶部。

<div class="demo-preview">

<ho-tabs 
  v-model="activeTab5" 
  :tabs="[
    { title: '标签一', content: '粘性定位示例 - 向下滚动页面查看效果' },
    { title: '标签二', content: '内容二' },
    { title: '标签三', content: '内容三' }
  ]" 
  sticky 
/>

</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-tabs v-model="activeTab" :tabs="tabs" sticky />
</template>
```

</details>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前激活的标签索引或 ID | `number \| string` | `0` |
| tabs | 标签数据数组 | `TabItem[]` | `[]` |
| sticky | 是否使用粘性定位 | `boolean` | `false` |
| animated | 是否开启切换动画 | `boolean` | `true` |
| swipeable | 是否开启手势滑动切换 | `boolean` | `false` |
| threshold | 滑动切换阈值（占容器宽度的比例） | `number` | `0.3` |

### TabItem 数据结构

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| title | 标签标题 | `string` |
| id | 唯一标识 | `string \| number` |
| badge | 徽标数字 | `number \| string` |
| dot | 是否显示红点 | `boolean` |
| disabled | 是否禁用 | `boolean` |
| content | 标签内容（可选） | `string` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 切换标签时触发 | `({ index, tab, direction })` |
| disabled-click | 点击禁用标签时触发 | `(index: number)` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义标签页内容，参数为 `{ tab, index }`（具名 slot 使用 tab.id 或 index） |
