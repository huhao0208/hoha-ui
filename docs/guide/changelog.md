# 更新日志

本项目遵循 [语义化版本控制](https://semver.org/lang/zh-CN/)。

## [Unreleased]

### 修复
- 修复 Tab/Tabs 组件 provide/inject 接口不匹配问题
- 修复 Toast 样式文件中使用 Sass 语法导致 Less 编译失败
- 修复 Store 模块中 HohaConfig 类型名拼写错误
- 修复 CarouselV2 文档中失效的图片 URL
- 修复 GitHub Actions Node.js 版本警告

### 优化
- 升级 CI 配置，Node.js 版本从 20 升级到 22
- 清理重复的配置文件和组件文件

## [0.0.2] - 2024-04-18

### 新增
- CarouselV2 轮播组件（性能更好、代码更简洁）
- 国际化支持（中文、英文、繁体中文、日文）
- 全局状态管理（HohaStore）
- 响应式设计配置
- 暗色模式支持

### 优化
- 改进 Carousel 组件的 3D 效果
- 优化移动端触摸交互
- 完善组件文档

## [0.0.1] - 2024-01-01

### 新增
- Button 按钮组件
- Input 输入框组件
- Icon 图标组件
- Modal 对话框组件
- Message 消息提示组件
- Toast 轻提示组件
- Carousel 轮播组件
- Tabs 标签页组件
- NavBar 导航栏组件
- TabBar 底部导航组件
- Image 图片组件
- Cell 单元格组件
- 工具函数库（DOM、格式化、存储、类型判断）
