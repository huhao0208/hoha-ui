# Modal 对话框

在保留当前页面状态的情况下，告知用户信息或承载相关操作。

## 基础用法

Dialog 弹出一个对话框，适合需要定制性更大的场景。

::: demo
```vue
<template>
  <div class="modal-demo">
    <HoButton type="primary" @click="visible = true">打开对话框</HoButton>
    
    <HoModal v-model="visible" title="提示">
      <p>这是一段信息</p>
      <template #footer>
        <HoButton @click="visible = false">取消</HoButton>
        <HoButton type="primary" @click="visible = false">确定</HoButton>
      </template>
    </HoModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>

<style scoped>
.modal-demo {
  display: flex;
  gap: 12px;
}
</style>
```
:::

## 自定义内容

对话框的内容可以是任何组件或元素。

::: demo
```vue
<template>
  <div class="modal-demo">
    <HoButton type="primary" @click="visible = true">打开表单对话框</HoButton>
    
    <HoModal v-model="visible" title="用户信息" width="500px">
      <form class="form">
        <div class="form-item">
          <label>用户名：</label>
          <HoInput v-model="form.username" placeholder="请输入用户名" />
        </div>
        <div class="form-item">
          <label>邮箱：</label>
          <HoInput v-model="form.email" placeholder="请输入邮箱" />
        </div>
      </form>
      <template #footer>
        <HoButton @click="visible = false">取消</HoButton>
        <HoButton type="primary" @click="handleSubmit">提交</HoButton>
      </template>
    </HoModal>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const visible = ref(false)
const form = reactive({
  username: '',
  email: ''
})

const handleSubmit = () => {
  console.log('提交表单:', form)
  visible.value = false
}
</script>

<style scoped>
.modal-demo {
  display: flex;
  gap: 12px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.form-item label {
  width: 80px;
  text-align: right;
}
</style>
```
:::

## 嵌套的 Modal

如果需要在一个 Modal 内部嵌套另一个 Modal，需要使用 `append-to-body` 属性。

::: demo
```vue
<template>
  <div class="modal-demo">
    <HoButton type="primary" @click="outerVisible = true">打开外层对话框</HoButton>
    
    <HoModal v-model="outerVisible" title="外层对话框" width="600px">
      <p>这是外层对话框的内容</p>
      <HoButton type="primary" @click="innerVisible = true">打开内层对话框</HoButton>
      
      <HoModal v-model="innerVisible" title="内层对话框" append-to-body>
        <p>这是内层对话框的内容</p>
      </HoModal>
      
      <template #footer>
        <HoButton @click="outerVisible = false">关闭</HoButton>
      </template>
    </HoModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const outerVisible = ref(false)
const innerVisible = ref(false)
</script>

<style scoped>
.modal-demo {
  display: flex;
  gap: 12px;
}
</style>
```
:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model / visible | 是否显示对话框 | `boolean` | `false` |
| title | 对话框标题 | `string` | `''` |
| width | 对话框宽度 | `string \| number` | `520` |
| closable | 是否显示关闭按钮 | `boolean` | `true` |
| maskClosable | 是否可以通过点击遮罩层关闭对话框 | `boolean` | `true` |
| draggable | 是否可拖拽 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:visible | 对话框显示状态改变时触发 | `(visible: boolean) => void` |
| close | Dialog 关闭时触发 | — |
| confirm | 确认时触发 | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | Dialog 的内容 |
| footer | Dialog 按钮操作区的内容 |
