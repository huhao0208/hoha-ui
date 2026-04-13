# Cell 单元格

用于展示一组列表信息，常用于设置页面、信息展示等场景。

## 基础用法

`HoCell` 可以单独使用，也可以配合 `HoCellGroup` 使用。

<div class="demo-preview">

<ho-cell-group>
  <ho-cell title="单元格" value="内容" />
  <ho-cell title="单元格" value="内容" label="描述信息" />
  <ho-cell title="单元格" value="内容" />
</ho-cell-group>

</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-cell-group>
    <ho-cell title="单元格" value="内容" />
    <ho-cell title="单元格" value="内容" label="描述信息" />
    <ho-cell title="单元格" value="内容" />
  </ho-cell-group>
</template>
```

</details>

## 图标

通过 `icon` 属性设置左侧图标，也可以通过 `icon` 插槽自定义图标。

<div class="demo-preview">

<ho-cell-group>
  <ho-cell title="单元格" icon="user" />
  <ho-cell title="单元格" icon="setting" />
  <ho-cell title="单元格" icon="location" />
</ho-cell-group>

</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-cell-group>
    <ho-cell title="单元格" icon="user" />
    <ho-cell title="单元格" icon="setting" />
    <ho-cell title="单元格" icon="location" />
  </ho-cell-group>
</template>
```

</details>

## 描述信息

通过 `label` 属性设置标题下方的描述信息。

<div class="demo-preview">

<ho-cell-group>
  <ho-cell 
    title="单元格" 
    value="内容" 
    label="这是一段描述信息，可以比较长，会自动换行显示" 
  />
  <ho-cell 
    title="单元格" 
    value="内容" 
    label="描述信息" 
  />
</ho-cell-group>

</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-cell-group>
    <ho-cell 
      title="单元格" 
      value="内容" 
      label="这是一段描述信息" 
    />
  </ho-cell-group>
</template>
```

</details>

## 箭头

设置 `is-link` 属性显示右侧箭头，通过 `arrow-direction` 设置箭头方向。

<div class="demo-preview">

<ho-cell-group>
  <ho-cell title="单元格" is-link />
  <ho-cell title="单元格" is-link arrow-direction="down" />
  <ho-cell title="单元格" is-link arrow-direction="up" />
  <ho-cell title="单元格" is-link value="内容" />
</ho-cell-group>

</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-cell-group>
    <ho-cell title="单元格" is-link />
    <ho-cell title="单元格" is-link arrow-direction="down" />
    <ho-cell title="单元格" is-link arrow-direction="up" />
    <ho-cell title="单元格" is-link value="内容" />
  </ho-cell-group>
</template>
```

</details>

## 分组

使用 `HoCellGroup` 对单元格进行分组，支持设置标题和边框。

<div class="demo-preview">

<ho-cell-group title="分组一">
  <ho-cell title="单元格" value="内容" />
  <ho-cell title="单元格" value="内容" />
</ho-cell-group>

<ho-cell-group title="分组二" :border="false">
  <ho-cell title="单元格" value="内容" />
  <ho-cell title="单元格" value="内容" />
</ho-cell-group>

</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-cell-group title="分组一">
    <ho-cell title="单元格" value="内容" />
    <ho-cell title="单元格" value="内容" />
  </ho-cell-group>

  <ho-cell-group title="分组二" :border="false">
    <ho-cell title="单元格" value="内容" />
    <ho-cell title="单元格" value="内容" />
  </ho-cell-group>
</template>
```

</details>

## 自定义内容

可以通过插槽自定义单元格的各个部分。

<div class="demo-preview">

<ho-cell-group>
  <ho-cell title="自定义图标">
    <template #icon>
      <span style="color: #1989fa; margin-right: 8px;">🎯</span>
    </template>
  </ho-cell>
  <ho-cell title="自定义标题">
    <template #title>
      <span style="color: #ee0a24;">红色标题</span>
    </template>
  </ho-cell>
  <ho-cell title="自定义右侧">
    <template #value>
      <span style="color: #07c160;">自定义内容</span>
    </template>
  </ho-cell>
</ho-cell-group>

</div>

<details>
<summary>显示代码</summary>

```vue
<template>
  <ho-cell-group>
    <ho-cell title="自定义图标">
      <template #icon>
        <span style="color: #1989fa; margin-right: 8px;">🎯</span>
      </template>
    </ho-cell>
    <ho-cell title="自定义标题">
      <template #title>
        <span style="color: #ee0a24;">红色标题</span>
      </template>
    </ho-cell>
    <ho-cell title="自定义右侧">
      <template #value>
        <span style="color: #07c160;">自定义内容</span>
      </template>
    </ho-cell>
  </ho-cell-group>
</template>
```

</details>

## API

### Cell Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 左侧标题 | `string` | - |
| value | 右侧内容 | `string` | - |
| label | 标题下方的描述信息 | `string` | - |
| icon | 左侧图标名称 | `string` | - |
| icon-size | 图标大小 | `string \| number` | `20` |
| is-link | 是否显示右侧箭头 | `boolean` | `false` |
| arrow-direction | 箭头方向，可选值为 `left` `up` `down` | `string` | `right` |
| border | 是否显示下边框 | `boolean` | `true` |
| clickable | 是否开启点击反馈 | `boolean` | `false` |
| required | 是否显示表单必填星号 | `boolean` | `false` |
| center | 是否使内容垂直居中 | `boolean` | `false` |
| title-style | 标题样式 | `string \| object` | - |
| title-class | 标题类名 | `string` | - |
| value-style | 右侧内容样式 | `string \| object` | - |
| value-class | 右侧内容类名 | `string` | - |
| label-style | 描述信息样式 | `string \| object` | - |
| label-class | 描述信息类名 | `string` | - |

### CellGroup Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 分组标题 | `string` | - |
| border | 是否显示外边框 | `boolean` | `true` |
| inset | 是否展示为圆角卡片风格 | `boolean` | `false` |

### Cell Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击单元格时触发 | `(event: Event)` |

### Cell Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义右侧 value 区域 |
| title | 自定义标题 |
| label | 自定义描述信息 |
| icon | 自定义左侧图标 |
| right-icon | 自定义右侧图标 |

### CellGroup Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认插槽，放置 Cell 组件 |
| title | 自定义分组标题 |

<script setup>
</script>
