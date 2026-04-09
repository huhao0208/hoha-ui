# 任务执行计划表

## 总需求
开发前端组件库 `@hohaya/hoho` 和工具函数库 `@hohaya/hoho-utils`，支持 Vue2/Vue3/浏览器直接引入，包含交互式文档站点。

## 目标工作区
`/root/.openclaw/projects/hoha-ui/`

## 任务总数
12

## 全局洞察
- 整体预估总长: **18h**
- 核心风险/堵点: Vue 2/3 兼容性处理、Rollup 多格式构建配置、文档站点交互式 Demo 实现

---

## Phase 1: 基础设施 (P0)

### 任务1: Monorepo 架构搭建
序号: 1
名称: 初始化 Monorepo 架构
说明: 
  - 创建 pnpm-workspace.yaml
  - 初始化 packages/components, packages/utils, packages/shared
  - 配置 TypeScript (tsconfig.json)
  - 配置 ESLint + Prettier
优先级: P0
预估耗时: 45m
风险级别: 低
前置依赖: 无
超时: 600
所需工具: [exec, write]

### 任务2: 构建系统配置
序号: 2
名称: 配置 Rollup 多格式构建
说明:
  - 配置 Rollup 输出 ESM/CJS/UMD 三种格式
  - 配置样式打包 (Less → CSS)
  - 配置 Tree-shaking
  - 编写构建脚本 build.js
优先级: P0
预估耗时: 60m
风险级别: 高
前置依赖: 1
超时: 900
所需工具: [exec, write, read]

### 任务3: 开发调试环境
序号: 3
名称: 搭建 Playground 开发环境
说明:
  - 创建 playground 目录
  - 配置 Vite 开发服务器
  - 支持热更新调试组件
优先级: P0
预估耗时: 30m
风险级别: 低
前置依赖: 1
超时: 400
所需工具: [exec, write]

### 任务4: 基础组件开发
序号: 4
名称: 开发 Button/Input/Icon 组件
说明:
  - Button: 主题(type)/尺寸(size)/禁用(disabled)/加载(loading)
  - Input: 双向绑定(v-model)/校验(validator)/前缀后缀(prefix/suffix)
  - Icon: SVG sprite 系统 + 按需加载
  - 编写单元测试
优先级: P0
预估耗时: 90m
风险级别: 中
前置依赖: 2
超时: 1200
所需工具: [exec, write, read]

---

## Phase 2: 核心组件 (P1)

### 任务5: 反馈组件开发
序号: 5
名称: 开发 Modal/Message/Toast 组件
说明:
  - Modal: 可拖拽/自定义 footer/esc 关闭
  - Message: 全局调用 (this.$message)
  - Toast: 轻提示/自动关闭
  - 编写单元测试
优先级: P1
预估耗时: 90m
风险级别: 中
前置依赖: 4
超时: 1200
所需工具: [exec, write, read]

### 任务6: 工具函数开发
序号: 6
名称: 开发 DOM/Format/Storage 工具函数
说明:
  - DOM: addClass, removeClass, hasClass, getStyle, setStyle, scrollTo
  - Format: formatDate, formatNumber, formatSize
  - Storage: localStorage/sessionStorage/Cookie 封装
  - 类型判断: isType, isArray, isObject, isEmpty
  - 编写单元测试
优先级: P1
预估耗时: 60m
风险级别: 低
前置依赖: 2
超时: 800
所需工具: [exec, write, read]

### 任务7: Vue 2/3 兼容层
序号: 7
名称: 实现 Vue 2/3 兼容适配
说明:
  - 添加 @vue/composition-api polyfill
  - 编写兼容性测试
  - 更新文档说明兼容用法
优先级: P1
预估耗时: 45m
风险级别: 高
前置依赖: 5
超时: 600
所需工具: [exec, write, read]

---

## Phase 3: 数据组件 (P2)

### 任务8: 数据组件开发
序号: 8
名称: 开发 Table/Form/Select 组件
说明:
  - Table: 排序/分页/选择/自定义列
  - Form: 校验/布局/重置
  - Select: 单选/多选/搜索/远程数据
  - 编写单元测试
优先级: P2
预估耗时: 120m
风险级别: 中
前置依赖: 7
超时: 1500
所需工具: [exec, write, read]

---

## Phase 4: 文档站点 (P1)

### 任务9: 文档站点搭建
序号: 9
名称: 搭建 VitePress 文档站点
说明:
  - 初始化 VitePress
  - 配置导航/侧边栏
  - 配置主题切换 (亮色/暗色)
  - 配置代码高亮 (Shiki)
优先级: P1
预估耗时: 45m
风险级别: 低
前置依赖: 4
超时: 600
所需工具: [exec, write]

### 任务10: 交互式 Demo
序号: 10
名称: 实现交互式 Demo 组件
说明:
  - 创建 DemoBlock 组件
  - 实现代码展示 + 一键复制
  - 实现实时预览
  - 支持 Vue 2/3 示例切换
优先级: P1
预估耗时: 60m
风险级别: 中
前置依赖: 9
超时: 800
所需工具: [exec, write, read]

### 任务11: API 文档生成
序号: 11
名称: 自动生成组件 API 文档
说明:
  - 解析 TypeScript 类型生成 Props 表格
  - 生成 Events/Slots 文档
  - 编写组件使用示例
优先级: P2
预估耗时: 45m
风险级别: 低
前置依赖: 10
超时: 600
所需工具: [exec, write, read]

---

## Phase 5: 发布上线 (P0)

### 任务12: 发布配置与部署
序号: 12
名称: npm 发布 + 文档部署
说明:
  - 配置 package.json (name/version/exports)
  - 配置 Changesets 版本管理
  - 编写发布脚本
  - 配置 GitHub Actions CI/CD
  - 部署文档站点到 GitHub Pages
优先级: P0
预估耗时: 60m
风险级别: 中
前置依赖: 11
超时: 900
所需工具: [exec, write]

---

## 依赖关系图

```
T1 (架构) ──┬── T2 (构建) ──┬── T4 (基础组件) ── T5 (反馈组件) ── T7 (兼容层) ── T8 (数据组件)
            │               │
            │               └── T6 (工具函数)
            │
            └── T3 (Playground)
            
T4 (基础组件) ── T9 (文档站点) ── T10 (交互Demo) ── T11 (API文档) ── T12 (发布)
```

## 可并行任务
- T3 可与 T2 并行
- T6 可与 T4 并行
- T9 可与 T5/T6/T7 并行

---

**计划表结束**
