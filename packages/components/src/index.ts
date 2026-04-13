// Components entry point
export { default as HoButton } from './button/index.vue'
export { default as HoInput } from './input/index.vue'
export { default as HoIcon } from './icon/index.vue'
export { default as HoModal } from './modal/index.vue'
export { default as HoCarousel, HoCarouselItem } from './carousel/index.vue'
export { default as HoTabs } from './tabs/index.vue'
export { default as HoNavBar } from './navbar/index.vue'
export { default as HoTabBar } from './tabbar/index.vue'
export { default as HoTabBarItem } from './tabbar-item/index.vue'
export { default as HoImage } from './image/index.vue'
export { default as HoCell } from './cell/index.vue'
export { default as HoCellGroup } from './cell-group/index.vue'

// Functional components
export { message, default as HoMessage } from './message/index.ts'
export { toast, default as HoToast } from './toast/index.ts'

// Types
export type { MessageType, MessageOptions, MessageInstance } from './message/index.ts'
export type { ToastType, ToastPosition, ToastOptions, ToastInstance } from './toast/index.ts'
export type { CarouselItem, CarouselEffect, CarouselIndicatorPosition, CarouselIndicatorType } from './carousel/index.ts'

// Install function for Vue.use()
import type { App } from 'vue'
import HoButton from './button/index.vue'
import HoInput from './input/index.vue'
import HoIcon from './icon/index.vue'
import HoModal from './modal/index.vue'
import HoCarousel, { HoCarouselItem } from './carousel/index.vue'
import HoTabs from './tabs/index.vue'
import HoNavBar from './navbar/index.vue'
import HoTabBar from './tabbar/index.vue'
import HoTabBarItem from './tabbar-item/index.vue'
import HoImage from './image/index.vue'
import HoCell from './cell/index.vue'
import HoCellGroup from './cell-group/index.vue'
import { message as messageApi } from './message/index.ts'
import { toast as toastApi } from './toast/index.ts'

const components = [HoButton, HoInput, HoIcon, HoModal, HoCarousel, HoCarouselItem, HoTabs, HoNavBar, HoTabBar, HoTabBarItem, HoImage, HoCell, HoCellGroup]

export default {
  install(app: App) {
    // Register components
    components.forEach((component) => {
      if (component && component.name) {
        app.component(component.name, component)
      }
    })
    
    // Register global APIs
    app.config.globalProperties.$message = messageApi
    app.config.globalProperties.$toast = toastApi
    
    // Provide for Composition API
    app.provide('$message', messageApi)
    app.provide('$toast', toastApi)
  }
}
