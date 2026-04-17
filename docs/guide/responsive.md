# 响应式配置

hoha-ui 支持多种设计稿尺寸和单位系统。

## 快速开始

### 方式一：CSS 变量（推荐）

在根元素设置 CSS 变量：

```css
:root {
  /* 375px 设计稿 */
  --ho-small-height: 28px;
  --ho-small-padding: 16px;
  --ho-small-font-size: 12px;
  
  --ho-medium-height: 36px;
  --ho-medium-padding: 24px;
  --ho-medium-font-size: 14px;
  
  --ho-large-height: 44px;
  --ho-large-padding: 32px;
  --ho-large-font-size: 16px;
}
```

### 方式二：JavaScript 配置

```typescript
import { setDesignConfig, toResponsiveUnit } from '@hohaya/ui/config'

// 设置设计稿配置
setDesignConfig({
  baseWidth: 750,      // 设计稿宽度
  unit: 'rem',         // 单位类型: px | rem | vw
  remBase: 16,         // rem 基准值
  responsive: true     // 启用响应式
})

// 使用转换函数
const height = toResponsiveUnit(32)  // '2rem' (750px 设计稿)
```

## 设计稿尺寸预设

### 375px 设计稿（移动端）

```typescript
setDesignConfig({ baseWidth: 375, unit: 'rem' })
```

| 尺寸 | height | padding | font-size |
|------|--------|---------|-----------|
| small | 28px | 16px | 12px |
| medium | 36px | 24px | 14px |
| large | 44px | 32px | 16px |

### 750px 设计稿（移动端高清）

```typescript
setDesignConfig({ baseWidth: 750, unit: 'rem' })
```

| 尺寸 | height | padding | font-size |
|------|--------|---------|-----------|
| small | 56px | 32px | 24px |
| medium | 72px | 48px | 28px |
| large | 88px | 64px | 32px |

### 400px 设计稿

```typescript
setDesignConfig({ baseWidth: 400, unit: 'rem' })
```

## 单位系统

### px（固定像素）

```typescript
setDesignConfig({ unit: 'px' })
```

适用于：不需要响应式的场景

### rem（推荐）

```typescript
setDesignConfig({ unit: 'rem', remBase: 16 })
```

适用于：移动端响应式，配合 `html { font-size: calc(100vw / 设计稿宽度 * 100) }`

### vw（视口宽度）

```typescript
setDesignConfig({ unit: 'vw' })
```

适用于：纯响应式场景

## 响应式方案

### 方案一：rem + 动态根字体

```html
<script>
  // 根据屏幕宽度动态设置根字体
  const baseWidth = 375
  document.documentElement.style.fontSize = 
    (document.documentElement.clientWidth / baseWidth * 16) + 'px'
  
  window.addEventListener('resize', () => {
    document.documentElement.style.fontSize = 
      (document.documentElement.clientWidth / baseWidth * 16) + 'px'
  })
</script>
```

### 方案二：vw

```typescript
setDesignConfig({ unit: 'vw', baseWidth: 375 })
```

组件尺寸会自动转换为 vw 单位。

### 方案三：CSS 变量 + 媒体查询

```css
:root {
  --ho-medium-height: 36px;
}

@media (min-width: 768px) {
  :root {
    --ho-medium-height: 44px;
  }
}
```

## API

### setDesignConfig(config)

设置设计稿配置。

```typescript
setDesignConfig({
  baseWidth: 375,      // 设计稿宽度
  unit: 'rem',         // px | rem | vw
  remBase: 16,         // rem 基准值
  responsive: true     // 是否响应式
})
```

### toResponsiveUnit(px)

将 px 值转换为响应式单位。

```typescript
const height = toResponsiveUnit(32)  // '2rem' 或 '8.5333vw'
```

### getDesignConfig()

获取当前配置。

```typescript
const config = getDesignConfig()
console.log(config.baseWidth)  // 375
```

### resetDesignConfig()

重置为默认配置。

```typescript
resetDesignConfig()
```
