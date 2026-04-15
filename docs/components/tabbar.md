# TabBar 底部导航

用于页面底部的导航栏，常用于移动端应用的主导航。

## 基础用法

通过 `v-model` 绑定当前选中项的索引或标识符，使用 `HoTabBarItem` 定义导航项。

<DemoPreview>
  <HoTabBar v-model="active" :fixed="false">
    <HoTabBarItem icon="mdi:home">首页</HoTabBarItem>
    <HoTabBarItem icon="mdi:magnify">搜索</HoTabBarItem>
    <HoTabBarItem icon="mdi:account">我的</HoTabBarItem>
  </HoTabBar>
</DemoPreview>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-tab-bar v-model="active" :fixed="false">
    <ho-tab-bar-item icon="mdi:home">首页</ho-tab-bar-item>
    <ho-tab-bar-item icon="mdi:magnify">搜索</ho-tab-bar-item>
    <ho-tab-bar-item icon="mdi:account">我的</ho-tab-bar-item>
  </ho-tab-bar>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>
```

</details>

## 徽标

通过 `badge` 属性设置数字徽标，通过 `dot` 属性显示红点。

<DemoPreview>
  <HoTabBar v-model="active2" :fixed="false">
    <HoTabBarItem icon="mdi:home">首页</HoTabBarItem>
    <HoTabBarItem icon="mdi:message" :badge="5">消息</HoTabBarItem>
    <HoTabBarItem icon="mdi:bell" dot>通知</HoTabBarItem>
    <HoTabBarItem icon="mdi:account">我的</HoTabBarItem>
  </HoTabBar>
</DemoPreview>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-tab-bar v-model="active" :fixed="false">
    <ho-tab-bar-item icon="mdi:home">首页</ho-tab-bar-item>
    <ho-tab-bar-item icon="mdi:message" :badge="5">消息</ho-tab-bar-item>
    <ho-tab-bar-item icon="mdi:bell" dot>通知</ho-tab-bar-item>
    <ho-tab-bar-item icon="mdi:account">我的</ho-tab-bar-item>
  </ho-tab-bar>
</template>
```

</details>

## 自定义颜色

通过 `active-color` 和 `inactive-color` 设置选中/未选中的颜色。

<DemoPreview>
  <HoTabBar v-model="active5" :fixed="false" active-color="#ee0a24" inactive-color="#999">
    <HoTabBarItem icon="mdi:home">首页</HoTabBarItem>
    <HoTabBarItem icon="mdi:apps">分类</HoTabBarItem>
    <HoTabBarItem icon="mdi:account">我的</HoTabBarItem>
  </HoTabBar>
</DemoPreview>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-tab-bar 
    v-model="active" 
    :fixed="false"
    active-color="#ee0a24" 
    inactive-color="#999" 
  >
    <ho-tab-bar-item icon="mdi:home">首页</ho-tab-bar-item>
    <ho-tab-bar-item icon="mdi:apps">分类</ho-tab-bar-item>
    <ho-tab-bar-item icon="mdi:account">我的</ho-tab-bar-item>
  </ho-tab-bar>
</template>
```

</details>

## 固定底部

设置 `fixed` 使导航栏固定在底部，配合 `placeholder` 在文档流中占位。

<DemoPreview style="min-height: 120px;">
  <p style="color: var(--vp-c-text-2); font-size: 14px; margin-bottom: 8px;">
    下方 TabBar 固定在页面底部（此预览框仅作示意）
  </p>
  <HoTabBar v-model="active3" fixed placeholder>
    <HoTabBarItem icon="mdi:home">首页</HoTabBarItem>
    <HoTabBarItem icon="mdi:apps">分类</HoTabBarItem>
    <HoTabBarItem icon="mdi:cart">购物车</HoTabBarItem>
    <HoTabBarItem icon="mdi:account">我的</HoTabBarItem>
  </HoTabBar>
</DemoPreview>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-tab-bar v-model="active" fixed placeholder>
    <ho-tab-bar-item icon="mdi:home">首页</ho-tab-bar-item>
    <ho-tab-bar-item icon="mdi:apps">分类</ho-tab-bar-item>
    <ho-tab-bar-item icon="mdi:cart">购物车</ho-tab-bar-item>
    <ho-tab-bar-item icon="mdi:account">我的</ho-tab-bar-item>
  </ho-tab-bar>
</template>
```

</details>

## API

### TabBar Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前选中项的索引或标识符 | `number \| string` | `0` |
| fixed | 是否固定在底部 | `boolean` | `false` |
| placeholder | 固定定位时是否在文档流中占位 | `boolean` | `false` |
| border | 是否显示上边框 | `boolean` | `true` |
| active-color | 选中项的颜色 | `string` | `#1989fa` |
| inactive-color | 未选中项的颜色 | `string` | `#646566` |
| z-index | 元素层级 | `number` | `100` |
| safe-area-inset-bottom | 是否开启底部安全区域适配 | `boolean` | `true` |

### TabBarItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 标识符（用于 v-model 匹配） | `number \| string` | 索引值 |
| icon | 图标名称（Iconify 格式） | `string` | - |
| dot | 是否显示红点 | `boolean` | `false` |
| badge | 徽标数字 | `number \| string` | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 切换选中项时触发 | `(value: number \| string)` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | TabBarItem 文字内容 |
| icon | 自定义图标 |

<script setup>
import { ref } from 'vue'

const active = ref(0)
const active2 = ref(0)
const active3 = ref(0)
const active5 = ref(0)
</script>
