# Button 按钮

常用的操作按钮。

## 基础用法

使用 `type` 属性来定义按钮的样式。

<DemoPreview>
  <HoButton>默认按钮</HoButton>
  <HoButton type="primary">主要按钮</HoButton>
  <HoButton type="secondary">次要按钮</HoButton>
  <HoButton type="success">成功按钮</HoButton>
  <HoButton type="warning">警告按钮</HoButton>
  <HoButton type="danger">危险按钮</HoButton>
  <HoButton type="info">信息按钮</HoButton>
</DemoPreview>

<details>
<summary>显示代码</summary>

```vue
<template>
  <HoButton>默认按钮</HoButton>
  <HoButton type="primary">主要按钮</HoButton>
  <HoButton type="secondary">次要按钮</HoButton>
  <HoButton type="success">成功按钮</HoButton>
  <HoButton type="warning">警告按钮</HoButton>
  <HoButton type="danger">危险按钮</HoButton>
  <HoButton type="info">信息按钮</HoButton>
</template>
```

</details>

## 按钮尺寸

Button 组件提供三种尺寸：`small`、`medium` 和 `large`。

<DemoPreview>
  <HoButton size="small" type="primary">小型按钮</HoButton>
  <HoButton size="medium" type="primary">中型按钮</HoButton>
  <HoButton size="large" type="primary">大型按钮</HoButton>
</DemoPreview>

<details>
<summary>显示代码</summary>

```vue
<template>
  <HoButton size="small" type="primary">小型按钮</HoButton>
  <HoButton size="medium" type="primary">中型按钮</HoButton>
  <HoButton size="large" type="primary">大型按钮</HoButton>
</template>
```

</details>

## 禁用状态

使用 `disabled` 属性来控制按钮是否禁用。

<DemoPreview>
  <HoButton type="primary" disabled>主要按钮</HoButton>
  <HoButton type="success" disabled>成功按钮</HoButton>
  <HoButton type="danger" disabled>危险按钮</HoButton>
</DemoPreview>

<details>
<summary>显示代码</summary>

```vue
<template>
  <HoButton type="primary" disabled>主要按钮</HoButton>
  <HoButton type="success" disabled>成功按钮</HoButton>
  <HoButton type="danger" disabled>危险按钮</HoButton>
</template>
```

</details>

## 加载状态

通过设置 `loading` 属性为 `true` 来显示加载中状态。

<DemoPreview>
  <HoButton type="primary" loading>加载中</HoButton>
  <HoButton type="success" loading>加载中</HoButton>
  <HoButton type="warning" loading>加载中</HoButton>
</DemoPreview>

<details>
<summary>显示代码</summary>

```vue
<template>
  <HoButton type="primary" loading>加载中</HoButton>
  <HoButton type="success" loading>加载中</HoButton>
  <HoButton type="warning" loading>加载中</HoButton>
</template>
```

</details>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型 | `string` | `'primary'` |

**type 可选值**：

| 值 | 说明 |
| --- | --- | 
| `primary` | 主要按钮（蓝色） |
| `secondary` | 次要按钮（灰色） |
| `success` | 成功按钮（绿色） |
| `warning` | 警告按钮（橙色） |
| `danger` | 危险按钮（红色） |
| `info` | 信息按钮（青色） |

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 按钮尺寸 | `string` | `'medium'` |

**size 可选值**：

| 值 | 说明 |
| --- | --- |
| `small` | 小型按钮 |
| `medium` | 中型按钮 |
| `large` | 大型按钮 |

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击按钮时触发 | `(event: MouseEvent)` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 按钮内容 |
