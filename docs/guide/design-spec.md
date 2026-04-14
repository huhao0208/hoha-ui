# Hoha UI 设计规范

## 设计稿基准

- **设计稿宽度**: 750px（iPhone 6/7/8 标准尺寸）
- **根字体大小**: 37.5px（750 / 20 = 37.5）
- **单位转换**: 1rem = 37.5px（设计稿）

### 自定义 rem 配置

如果你的项目使用不同的设计稿尺寸，可以自定义配置：

```js
// 375px 设计稿（1倍图）
import { initFlexible } from '@hohaya/hoho/lib/flexible'
initFlexible({ designWidth: 375, rootFontSize: 16 })

// 1080px 设计稿
initFlexible({ designWidth: 1080, rootFontSize: 54 })

// 完整配置选项
initFlexible({
  designWidth: 750,       // 设计稿宽度
  rootFontSize: 37.5,     // 根字体大小
  maxRootFontSize: 54,    // 最大根字体限制
  limitWidth: true        // 是否限制最大宽度
})
```

### PostCSS 配置

修改 `postcss.config.js` 中的 `rootValue`：

```js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,  // 与 rootFontSize 保持一致
      propList: ['*', '!border*'],
      minPixelValue: 2
    }
  }
}
```

## 颜色系统

### 品牌色

| 变量名 | 亮色模式 | 暗色模式 | 用途 |
|--------|----------|----------|------|
| `--hoho-color-primary` | `#3b82f6` | `#60a5fa` | 主色/链接/按钮 |
| `--hoho-color-success` | `#10b981` | `#34d399` | 成功状态 |
| `--hoho-color-warning` | `#f59e0b` | `#fbbf24` | 警告状态 |
| `--hoho-color-danger` | `#ef4444` | `#f87171` | 危险/错误 |
| `--hoho-color-info` | `#06b6d4` | `#22d3ee` | 信息提示 |

### 背景色

| 变量名 | 亮色模式 | 暗色模式 | 用途 |
|--------|----------|----------|------|
| `--hoho-bg-primary` | `#ffffff` | `#1f2937` | 页面背景 |
| `--hoho-bg-secondary` | `#f9fafb` | `#111827` | 次级背景 |
| `--hoho-bg-tertiary` | `#f3f4f6` | `#374151` | 三级背景 |
| `--hoho-bg-mask` | `rgba(0,0,0,0.5)` | `rgba(0,0,0,0.7)` | 遮罩层 |

### 文字颜色

| 变量名 | 亮色模式 | 暗色模式 | 用途 |
|--------|----------|----------|------|
| `--hoho-text-primary` | `#111827` | `#f9fafb` | 主要文字 |
| `--hoho-text-secondary` | `#4b5563` | `#e5e7eb` | 次要文字 |
| `--hoho-text-tertiary` | `#6b7280` | `#d1d5db` | 辅助文字 |
| `--hoho-text-placeholder` | `#9ca3af` | `#6b7280` | 占位文字 |

### 边框颜色

| 变量名 | 亮色模式 | 暗色模式 | 用途 |
|--------|----------|----------|------|
| `--hoho-border-primary` | `#d1d5db` | `#374151` | 主边框 |
| `--hoho-border-secondary` | `#e5e7eb` | `#4b5563` | 次级边框 |

## 字体系统

### 字体大小（基于 750px 设计稿）

| 变量名 | rem 值 | 设计稿 px | 用途 |
|--------|--------|-----------|------|
| `--hoho-font-xs` | `0.64rem` | 24px | 极小文字 |
| `--hoho-font-sm` | `0.747rem` | 28px | 小号文字 |
| `--hoho-font-md` | `0.853rem` | 32px | 正文 |
| `--hoho-font-lg` | `0.96rem` | 36px | 大号文字 |
| `--hoho-font-xl` | `1.067rem` | 40px | 标题 |
| `--hoho-font-2xl` | `1.28rem` | 48px | 大标题 |

### 字重

| 变量名 | 值 | 用途 |
|--------|-----|------|
| `--hoho-font-normal` | `400` | 正文 |
| `--hoho-font-medium` | `500` | 强调 |
| `--hoho-font-semibold` | `600` | 标题 |
| `--hoho-font-bold` | `700` | 重强调 |

## 间距系统

| 变量名 | rem 值 | 设计稿 px | 用途 |
|--------|--------|-----------|------|
| `--hoho-spacing-xs` | `0.133rem` | 5px | 极小间距 |
| `--hoho-spacing-sm` | `0.267rem` | 10px | 小间距 |
| `--hoho-spacing-md` | `0.4rem` | 15px | 中间距 |
| `--hoho-spacing-lg` | `0.533rem` | 20px | 大间距 |
| `--hoho-spacing-xl` | `0.8rem` | 30px | 极大间距 |

## 圆角系统

| 变量名 | rem 值 | 设计稿 px | 用途 |
|--------|--------|-----------|------|
| `--hoho-radius-sm` | `0.107rem` | 4px | 小圆角 |
| `--hoho-radius-md` | `0.16rem` | 6px | 中圆角 |
| `--hoho-radius-lg` | `0.213rem` | 8px | 大圆角 |
| `--hoho-radius-xl` | `0.4rem` | 15px | 极大圆角 |
| `--hoho-radius-full` | `50%` | - | 圆形 |

## 阴影系统

| 变量名 | 值 | 用途 |
|--------|-----|------|
| `--hoho-shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | 微阴影 |
| `--hoho-shadow-md` | `0 4px 12px rgba(0,0,0,0.1)` | 中阴影 |
| `--hoho-shadow-lg` | `0 20px 60px rgba(0,0,0,0.15)` | 大阴影 |

## 动画系统

| 变量名 | 值 | 用途 |
|--------|-----|------|
| `--hoho-duration-fast` | `0.15s` | 快速动画 |
| `--hoho-duration-normal` | `0.25s` | 普通动画 |
| `--hoho-duration-slow` | `0.35s` | 慢速动画 |
| `--hoho-ease` | `cubic-bezier(0.25, 0.8, 0.25, 1)` | 缓动函数 |

## 移动端适配方案

### rem 方案

使用 postcss-pxtorem 自动转换：

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5, // 750px 设计稿 / 20
      propList: ['*', '!border*'],
      selectorBlackList: ['.no-rem']
    }
  }
}
```

### 动态设置根字体

```javascript
// 设置根字体大小
function setRootFontSize() {
  const width = Math.min(window.innerWidth, 750)
  const fontSize = width / 20 // 750px 设计稿对应 37.5px
  document.documentElement.style.fontSize = fontSize + 'px'
}

setRootFontSize()
window.addEventListener('resize', setRootFontSize)
```

### 安全区域

```css
:root {
  --hoho-safe-area-top: env(safe-area-inset-top, 0px);
  --hoho-safe-area-bottom: env(safe-area-inset-bottom, 0px);
  --hoho-safe-area-left: env(safe-area-inset-left, 0px);
  --hoho-safe-area-right: env(safe-area-inset-right, 0px);
}
```

## 组件尺寸规范

### 按钮高度

| 尺寸 | rem 值 | 设计稿 px |
|------|--------|-----------|
| small | `0.853rem` | 32px |
| medium | `1.173rem` | 44px |
| large | `1.387rem` | 52px |

### 输入框高度

| 尺寸 | rem 值 | 设计稿 px |
|------|--------|-----------|
| small | `0.853rem` | 32px |
| medium | `1.067rem` | 40px |
| large | `1.28rem` | 48px |

### 导航栏高度

| 组件 | rem 值 | 设计稿 px |
|------|--------|-----------|
| NavBar | `1.227rem` | 46px |
| TabBar | `1.333rem` | 50px |

## 断点系统

| 断点 | 值 | 用途 |
|------|-----|------|
| xs | `< 375px` | 小屏手机 |
| sm | `375px - 767px` | 手机 |
| md | `768px - 1023px` | 平板 |
| lg | `1024px+` | 桌面 |

```css
/* 移动端 */
@media screen and (max-width: 767px) { }

/* 平板 */
@media screen and (min-width: 768px) and (max-width: 1023px) { }

/* 桌面 */
@media screen and (min-width: 1024px) { }
```

## 设计原则

1. **一致性**: 相同功能使用相同的视觉表现
2. **可访问性**: 最小点击区域 44px（iOS）或 48px（Android）
3. **性能优先**: 减少重绘重排，使用 CSS 变量
4. **响应式**: 移动优先，渐进增强
