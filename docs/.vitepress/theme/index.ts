import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import DemoBlock from '../components/DemoBlock.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('DemoBlock', DemoBlock)
  }
} satisfies Theme
