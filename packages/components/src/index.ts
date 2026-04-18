// Components entry point
export { default as HoButton } from './button/index.vue'
export { default as HoInput } from './input/index.vue'
export { default as HoIcon } from './icon/index.vue'
export { default as HoModal } from './modal/index.vue'
export { default as HoCarousel, HoCarouselItem } from './carousel/index.vue'
export { default as HoCarouselV2 } from './carousel-v2'
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

// Design Config (响应式配置)
export {
  setDesignConfig,
  getDesignConfig,
  resetDesignConfig,
  toResponsiveUnit,
  createResponsiveStyles,
  sizePresets
} from './config/index.ts'
export type { DesignConfig } from './config/index.ts'

// Locale / i18n
export { 
  t, 
  setLocale, 
  addLocale, 
  getLocale, 
  getAvailableLocales,
  useLocale,
  createI18n,
  locales,
  zhCN,
  enUS,
  zhTW,
  jaJP
} from './locale/index.ts'
export type { HohaLocale, LocaleMessages } from './locale/index.ts'

// Global State / Store
export {
  getGlobalState,
  useGlobalState,
  provideGlobalState,
  getConfig,
  setConfig,
  useConfig,
  provideConfig,
  getTheme,
  setTheme,
  toggleDarkMode,
  useTheme,
  provideTheme,
  HohaStore
} from './store/index.ts'
export type { GlobalState, HohaConfig, ThemeConfig, ThemeMode, StoreOptions } from './store/index.ts'

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
import { createI18n, setLocale } from './locale/index.ts'
import { HohaStore, setConfig, setTheme, getGlobalState } from './store/index.ts'

const components = [HoButton, HoInput, HoIcon, HoModal, HoCarousel, HoCarouselItem, HoTabs, HoNavBar, HoTabBar, HoTabBarItem, HoImage, HoCell, HoCellGroup]

export interface HohaUIOptions {
  // 国际化
  locale?: string
  i18n?: {
    locale?: string
    fallbackLocale?: string
    messages?: Record<string, any>
  }
  // 全局状态
  store?: {
    config?: Record<string, any>
    theme?: Record<string, any>
    initialState?: Record<string, any>
  }
}

export default {
  install(app: App, options: HohaUIOptions = {}) {
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
    
    // Setup i18n
    if (options.locale) {
      setLocale(options.locale)
    }
    
    if (options.i18n) {
      const i18n = createI18n(options.i18n)
      app.use(i18n)
    }
    
    // Setup store (全局状态)
    if (options.store) {
      app.use(HohaStore, options.store)
    } else {
      // 默认也初始化，保证组件能正常使用
      app.use(HohaStore)
    }
  }
}
