# hoha-ui

Vue 2/3 双版本 UI 组件库，支持 npm 引入和浏览器直接引入。

## 安装

```bash
# 安装组件库
npm install @hohaya/ui

# 安装工具库（可选）
npm install @hohaya/hoho-utils
```

## 使用

```javascript
// Vue 3 完整引入
import { createApp } from 'vue'
import HohaUI from '@hohaya/ui'
import '@hohaya/ui/style.css'

createApp(App).use(HohaUI).mount('#app')

// Vue 3 按需引入
import { HoButton, HoInput } from '@hohaya/ui'
import '@hohaya/ui/style.css'

// Vue 2（需要 Vue 2.7+ 或安装 @vue/composition-api）
import Vue from 'vue'
import HohaUI from '@hohaya/ui'
import '@hohaya/ui/style.css'

Vue.use(HohaUI)
```

## 组件列表

- **HoButton** - 按钮
- **HoInput** - 输入框
- **HoIcon** - 图标（基于 Iconify）
- **HoModal** - 弹窗
- **HoCarousel / HoCarouselItem** - 走马灯
- **HoCarouselV2** - 走马灯 V2
- **HoTabs / HoTab** - 标签页
- **HoNavBar** - 导航栏
- **HoTabBar / HoTabBarItem** - 底部标签栏
- **HoImage** - 图片
- **HoCell / HoCellGroup** - 单元格
- **HoMessage** - 全局消息提示（函数式）
- **HoToast** - 轻提示（函数式）

## 文档

[在线文档](https://huhao0208.github.io/hoha-ui/)

## License

MIT
