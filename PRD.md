# 需求分析文档 (PRD.md)

## 项目概述

**项目名称**: @hoha/components & @hoha/utils  
**项目定位**: 跨框架前端组件库 + 工具函数库  
**目标用户**: 前端开发者（Vue2/Vue3/原生浏览器环境）

---

## 核心目标

1. **双包架构**: 组件库 (`@hoha/components`) 与工具库 (`@hoha/utils`) 独立发布
2. **多环境支持**: 
   - Vue 2.x 项目（通过 npm 引入）
   - Vue 3.x 项目（通过 npm 引入）
   - 浏览器直接引入（UMD/IIFE 格式，CDN 友好）
3. **文档站点**: 交互式 Demo + 在线演示 + 代码复制 + API 文档

---

## 技术选型

### 构建工具
- **Vite** - 开发服务器 + 文档站点
- **Rollup** - 生产构建（ESM/CJS/UMD 多格式输出）

### 框架适配
- **Vue 3** 为主版本（`.vue` SFC）
- **Vue 2** 兼容层（`@vue/composition-api` polyfill）
- **原生 Web Components** 降级方案（可选，后期扩展）

### 样式方案
- **Less** - CSS 预处理器
- **CSS Variables** - 主题定制
- **BEM** - 命名规范

### 文档方案
- **VitePress** - 文档站点框架
- **交互式 Demo** - 内嵌可编辑代码块
- **代码高亮** - Prism.js / Shiki

### 包管理
- **Monorepo** - pnpm workspace
- **Changesets** - 版本管理 + Changelog

---

## 核心架构

```
hoha-ui/
├── packages/
│   ├── components/          # @hoha/components
│   │   ├── src/
│   │   │   ├── button/
│   │   │   ├── input/
│   │   │   ├── modal/
│   │   │   ├── table/
│   │   │   ├── form/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── utils/               # @hoha/utils
│   │   ├── src/
│   │   │   ├── dom/
│   │   │   ├── format/
│   │   │   ├── storage/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── shared/              # 共享类型/常量
│       └── src/
│
├── docs/                    # VitePress 文档站点
│   ├── .vitepress/
│   ├── components/
│   └── utils/
│
├── playground/              # 开发调试环境
│
├── pnpm-workspace.yaml
├── package.json
└── tsconfig.json
```

---

## 初期组件清单 (Phase 1)

### 基础组件 (P0)
| 组件名 | 说明 | 优先级 |
|--------|------|--------|
| Button | 按钮（主题/尺寸/禁用/加载） | P0 |
| Input | 输入框（双向绑定/校验/前缀后缀） | P0 |
| Icon | 图标（SVG sprite / 按需加载） | P0 |

### 反馈组件 (P1)
| 组件名 | 说明 | 优先级 |
|--------|------|--------|
| Modal | 弹窗（可拖拽/自定义footer） | P1 |
| Message | 消息提示（全局调用） | P1 |
| Toast | 轻提示 | P1 |

### 数据组件 (P2)
| 组件名 | 说明 | 优先级 |
|--------|------|--------|
| Table | 表格（排序/分页/选择） | P2 |
| Form | 表单（校验/布局） | P2 |
| Select | 选择器（单选/多选/搜索） | P2 |

---

## 工具函数清单 (Phase 1)

### DOM 工具
- `addClass / removeClass / hasClass`
- `getStyle / setStyle`
- `scrollTo / scrollToTop`

### 格式化工具
- `formatDate` - 日期格式化
- `formatNumber` - 数字格式化（千分位）
- `formatSize` - 文件大小格式化

### 存储工具
- `localStorage` 封装（过期时间/JSON 序列化）
- `sessionStorage` 封装
- `Cookie` 操作

### 类型判断
- `isType / isArray / isObject / isFunction`
- `isEmpty / isPlainObject`

---

## 文档站点功能

### 必备功能
- [x] 组件列表导航
- [x] 交互式 Demo（实时预览）
- [x] 代码展示 + 一键复制
- [x] API 属性表格（Props/Events/Slots）
- [x] 主题切换（亮色/暗色）
- [x] 移动端预览模式

### 增强功能
- [ ] 在线编辑器（类似 CodeSandbox）
- [ ] 组件搜索
- [ ] 版本切换
- [ ] 贡献指南

---

## 发布策略

### npm 包
```json
{
  "@hoha/components": {
    "main": "dist/index.cjs.js",
    "module": "dist/index.esm.js",
    "browser": "dist/index.umd.js",
    "style": "dist/style.css"
  },
  "@hoha/utils": {
    "main": "dist/index.cjs.js",
    "module": "dist/index.esm.js",
    "browser": "dist/index.umd.js"
  }
}
```

### CDN 引入
```html
<!-- 组件库 -->
<link rel="stylesheet" href="https://unpkg.com/@hoha/components/dist/style.css">
<script src="https://unpkg.com/@hoha/components/dist/index.umd.js"></script>

<!-- 工具库 -->
<script src="https://unpkg.com/@hoha/utils/dist/index.umd.js"></script>
```

### 使用方式
```javascript
// Vue 3 项目
import { createApp } from 'vue'
import HohaComponents from '@hoha/components'
import '@hoha/components/dist/style.css'

app.use(HohaComponents)

// Vue 2 项目
import Vue from 'vue'
import HohaComponents from '@hoha/components'
import '@hoha/components/dist/style.css'

Vue.use(HohaComponents)

// 浏览器环境
<script src="https://unpkg.com/@hoha/components/dist/index.umd.js"></script>
<script>
  Vue.use(HohaComponents.default)
</script>

// 工具库
import { formatDate, localStorage } from '@hoha/utils'
```

---

## 分期交付计划

### Phase 1: 基础设施 (预计 4h)
- Monorepo 架构搭建
- 构建配置（Rollup 多格式输出）
- 文档站点脚手架
- 基础组件：Button, Input, Icon

### Phase 2: 核心组件 (预计 6h)
- 反馈组件：Modal, Message, Toast
- 工具函数：DOM/Format/Storage

### Phase 3: 数据组件 (预计 6h)
- 数据组件：Table, Form, Select
- 文档站点完善

### Phase 4: 发布上线 (预计 2h)
- npm 发布流程
- CI/CD 配置
- 文档站点部署

---

## 技术约束

1. **兼容性**: 
   - Vue 2.6+ / Vue 3.0+
   - 现代浏览器（Chrome 80+, Firefox 75+, Safari 13+, Edge 80+）
   - 不支持 IE11

2. **代码规范**:
   - TypeScript（类型完整）
   - ESLint + Prettier
   - 单元测试覆盖率 > 70%

3. **包体积**:
   - 组件库 Gzip < 50KB
   - 工具库 Gzip < 10KB
   - 支持按需引入（Tree-shaking）

---

## 风险点

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| Vue 2/3 兼容性 | 高 | 使用 composition-api polyfill + 条件编译 |
| 包体积膨胀 | 中 | 按需引入 + 分包策略 |
| 样式隔离 | 中 | CSS Modules + BEM 命名 |
| 文档维护成本 | 低 | 自动生成 API 文档 |

---

**项目目录已创建**: `/root/.openclaw/projects/hoha-ui/`

**请确认是否按此方针推进？** (Y同意/输入其他进行修改)
