# DOM 工具函数

操作 DOM 元素的实用工具函数。

## 安装

```typescript
import { hasClass, addClass, removeClass, getStyle, setStyle, scrollTo, scrollToTop } from '@hohaya/hoho-utils'
```

## 方法列表

### hasClass

检查元素是否包含指定的类名。

```typescript
function hasClass(el: Element, className: string): boolean
```

**参数**

| 参数名 | 说明 | 类型 |
| --- | --- | --- |
| el | DOM 元素 | `Element` |
| className | 类名 | `string` |

**返回值**

- `boolean` - 是否包含该类名

**示例**

```typescript
import { hasClass } from '@hohaya/hoho-utils'

const el = document.getElementById('my-element')

if (hasClass(el, 'active')) {
  console.log('元素包含 active 类')
}
```

---

### addClass

为元素添加类名。

```typescript
function addClass(el: Element, className: string): void
```

**参数**

| 参数名 | 说明 | 类型 |
| --- | --- | --- |
| el | DOM 元素 | `Element` |
| className | 类名 | `string` |

**示例**

```typescript
import { addClass } from '@hohaya/hoho-utils'

const el = document.getElementById('my-element')
addClass(el, 'active')
addClass(el, 'highlight')
```

---

### removeClass

从元素移除类名。

```typescript
function removeClass(el: Element, className: string): void
```

**参数**

| 参数名 | 说明 | 类型 |
| --- | --- | --- |
| el | DOM 元素 | `Element` |
| className | 类名 | `string` |

**示例**

```typescript
import { removeClass } from '@hohaya/hoho-utils'

const el = document.getElementById('my-element')
removeClass(el, 'active')
```

---

### getStyle

获取元素的计算样式。

```typescript
function getStyle(el: Element, prop: string): string
```

**参数**

| 参数名 | 说明 | 类型 |
| --- | --- | --- |
| el | DOM 元素 | `Element` |
| prop | 样式属性名 | `string` |

**返回值**

- `string` - 样式值

**示例**

```typescript
import { getStyle } from '@hohaya/hoho-utils'

const el = document.getElementById('my-element')
const color = getStyle(el, 'color')
const fontSize = getStyle(el, 'font-size')

console.log('文字颜色:', color)
console.log('字体大小:', fontSize)
```

---

### setStyle

为元素设置多个样式。

```typescript
function setStyle(el: HTMLElement, styles: Record<string, string>): void
```

**参数**

| 参数名 | 说明 | 类型 |
| --- | --- | --- |
| el | DOM 元素 | `HTMLElement` |
| styles | 样式对象 | `Record<string, string>` |

**示例**

```typescript
import { setStyle } from '@hohaya/hoho-utils'

const el = document.getElementById('my-element')

setStyle(el, {
  color: 'red',
  fontSize: '16px',
  backgroundColor: '#f5f5f5',
  padding: '10px 20px'
})
```

---

### scrollTo

滚动到指定位置。

```typescript
function scrollTo(top: number, behavior?: 'smooth' | 'auto'): void
```

**参数**

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| top | 滚动到的位置（像素） | `number` | — |
| behavior | 滚动行为 | `'smooth' \| 'auto'` | `'smooth'` |

**示例**

```typescript
import { scrollTo } from '@hohaya/hoho-utils'

// 平滑滚动到顶部
scrollTo(0)

// 立即滚动到指定位置
scrollTo(500, 'auto')

// 平滑滚动到指定位置
scrollTo(1000, 'smooth')
```

---

### scrollToTop

滚动到页面顶部。

```typescript
function scrollToTop(): void
```

**示例**

```typescript
import { scrollToTop } from '@hohaya/hoho-utils'

// 滚动到顶部
scrollToTop()
```

## 完整示例

```vue
<template>
  <div class="demo">
    <div ref="box" class="box" :class="{ active: isActive }">
      这是一个示例元素
    </div>
    
    <div class="controls">
      <HoButton @click="toggleActive">切换 Active</HoButton>
      <HoButton @click="applyStyles">应用样式</HoButton>
      <HoButton @click="goToTop">回到顶部</HoButton>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { hasClass, addClass, removeClass, setStyle, scrollToTop } from '@hohaya/hoho-utils'

const box = ref(null)
const isActive = ref(false)

const toggleActive = () => {
  if (hasClass(box.value, 'active')) {
    removeClass(box.value, 'active')
    isActive.value = false
  } else {
    addClass(box.value, 'active')
    isActive.value = true
  }
}

const applyStyles = () => {
  setStyle(box.value, {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    padding: '20px',
    borderRadius: '8px'
  })
}

const goToTop = () => {
  scrollToTop()
}
</script>

<style scoped>
.box {
  padding: 20px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  transition: all 0.3s;
}

.box.active {
  border-color: #3b82f6;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
}

.controls {
  display: flex;
  gap: 12px;
}
</style>
```
