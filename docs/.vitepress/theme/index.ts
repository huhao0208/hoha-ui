import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import DemoBlock from '../components/DemoBlock.vue'
import './custom.css'
// 引入组件库样式
import '../../../packages/components/src/styles/index.css'

// 导入所有组件
import HoButton from '../../../packages/components/src/button/index.vue'
import HoInput from '../../../packages/components/src/input/index.vue'
import HoIcon from '../../../packages/components/src/icon/index.vue'
import HoModal from '../../../packages/components/src/modal/index.vue'
import HoCarousel, { HoCarouselItem } from '../../../packages/components/src/carousel/index.vue'
import HoTabs from '../../../packages/components/src/tabs/index.vue'
import HoTab from '../../../packages/components/src/tab/index.vue'
import HoNavBar from '../../../packages/components/src/navbar/index.vue'
import HoTabBar from '../../../packages/components/src/tabbar/index.vue'
import HoTabBarItem from '../../../packages/components/src/tabbar-item/index.vue'
import HoImage from '../../../packages/components/src/image/index.vue'
import HoCell from '../../../packages/components/src/cell/index.vue'
import HoCellGroup from '../../../packages/components/src/cell-group/index.vue'
import { message, toast } from '../../../packages/components/src/index'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册 DemoBlock 组件
    app.component('DemoBlock', DemoBlock)
    
    // 注册所有 UI 组件
    app.component('HoButton', HoButton)
    app.component('HoInput', HoInput)
    app.component('HoIcon', HoIcon)
    app.component('HoModal', HoModal)
    app.component('HoCarousel', HoCarousel)
    app.component('HoCarouselItem', HoCarouselItem)
    app.component('HoTabs', HoTabs)
    app.component('HoTab', HoTab)
    app.component('HoNavBar', HoNavBar)
    app.component('HoTabBar', HoTabBar)
    app.component('HoTabBarItem', HoTabBarItem)
    app.component('HoImage', HoImage)
    app.component('HoCell', HoCell)
    app.component('HoCellGroup', HoCellGroup)
    
    // 注册全局 API
    app.config.globalProperties.$message = message
    app.config.globalProperties.$toast = toast
  }
} satisfies Theme
