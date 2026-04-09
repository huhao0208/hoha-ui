# hoha-ui

Vue 2/3 组件库，支持 npm 引入和浏览器直接引入。

## 安装

```bash
npm install @hoha/components @hoha/utils
```

## 使用

```javascript
// Vue 3
import { createApp } from 'vue'
import HohaUI from '@hoha/components'
import '@hoha/components/dist/style.css'

createApp().use(HohaUI)

// Vue 2
import Vue from 'vue'
import HohaUI from '@hoha/components'
import '@hoha/components/dist/style.css'

Vue.use(HohaUI)
```

## 组件列表

- HoButton - 按钮
- HoInput - 输入框
- HoIcon - 图标
- HoModal - 弹窗
- Message - 全局消息
- Toast - 轻提示

## 文档

[在线文档](https://your-docs-site.com)

## License

MIT
