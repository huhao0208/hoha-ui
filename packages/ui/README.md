# @hohaya/ui

Hoha UI 完整包 - 包含组件库和工具库。

## 安装

### 完整安装（推荐）

```bash
# npm
npm install @hohaya/ui

# yarn
yarn add @hohaya/ui

# pnpm
pnpm add @hohaya/ui
```

### Vue 2 项目需要额外安装

```bash
pnpm add @hohaya/ui @vue/composition-api
```

## 使用

```typescript
import { createApp } from 'vue'
import HohaUI from '@hohaya/ui'
// 或从组件库引入
// import HohaUI from '@hohaya/hoho'
// import '@hohaya/hoho/style.css'

// 工具函数自动包含
import { formatDate, debounce } from '@hohaya/hoho-utils'

const app = createApp(App)
app.use(HohaUI)
```

## 包含内容

- `@hohaya/hoho` - Vue 组件库
- `@hohaya/hoho-utils` - 工具函数库

## 独立安装

如果只需要部分功能：

```bash
# 只安装组件库
pnpm add @hohaya/hoho

# 只安装工具库
pnpm add @hohaya/hoho-utils
```
