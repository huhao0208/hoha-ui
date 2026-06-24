/**
 * @hohaya/hoho — 组件库入口
 *
 * 修复：
 *  1. 去除重复 import（每个模块只 import 一次，合并 export 区与 install 区的重复引用）
 *  2. 补全 HoCarouselV2 和 HoTab 的全局注册（原 install 数组缺失这两项）
 *  3. HohaStore 改为 opt-in（只有用户显式传入 options.store 时才初始化，
 *     避免强制 provide/inject 污染宿主应用命名空间）
 *  4. 移除 import 路径中的 .ts 扩展名（TypeScript/bundler 不识别 .ts 扩展的静态 import）
 *  5. message / toast 为函数式 API，不注册为全局组件（不放入 components 数组）
 */

import type { App } from 'vue'

// ─── 组件 import（各模块只 import 一次）──────────────────────────────────────
// 直接从 .vue 文件引入没有 barrel index 或 barrel 为纯转发的组件
import HoButton from './button/index.vue'
import HoInput from './input/index.vue'
import HoIcon from './icon/index.vue'
import HoModal from './modal/index.vue'
import HoNavBar from './navbar/index.vue'
import HoTabBar from './tabbar/index.vue'
import HoTabBarItem from './tabbar-item/index.vue'
import HoImage from './image/index.vue'
import HoCell from './cell/index.vue'
import HoCellGroup from './cell-group/index.vue'

// carousel barrel：默认导出为 install 插件对象，组件本体通过具名导出获取
import { HoCarousel, HoCarouselItem } from './carousel'

// carousel-v2 / tabs / tab：barrel 默认导出即组件本体
import HoCarouselV2 from './carousel-v2'
import HoTabs from './tabs'
import HoTab from './tab'

// 函数式 API（非组件，通过 globalProperties 和 provide 挂载，不进入 app.component）
import message from './message'
import toast from './toast'

// 国际化
import { createI18n, setLocale } from './locale'

// 全局状态
import { HohaStore } from './store'

// ─── 组件具名导出 ─────────────────────────────────────────────────────────────
export {
  HoButton,
  HoInput,
  HoIcon,
  HoModal,
  HoCarousel,
  HoCarouselItem,
  HoCarouselV2,
  HoTabs,
  HoTab,
  HoNavBar,
  HoTabBar,
  HoTabBarItem,
  HoImage,
  HoCell,
  HoCellGroup,
}

// ─── 函数式 API 导出 ──────────────────────────────────────────────────────────
export { message, toast }

// ─── Design Config ───────────────────────────────────────────────────────────
export {
  setDesignConfig,
  getDesignConfig,
  resetDesignConfig,
  toResponsiveUnit,
  createResponsiveStyles,
  sizePresets,
} from './config'
export type { DesignConfig } from './config'

// ─── Locale / i18n ───────────────────────────────────────────────────────────
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
  jaJP,
} from './locale'
export type { HohaLocale, LocaleMessages } from './locale'

// ─── Global State / Store ────────────────────────────────────────────────────
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
  HohaStore,
} from './store'
export type {
  GlobalState,
  HohaConfig,
  ThemeConfig,
  ThemeMode,
  StoreOptions,
} from './store'

// ─── 类型再导出 ───────────────────────────────────────────────────────────────
export type { MessageType, MessageOptions, MessageInstance } from './message'
export type { ToastType, ToastPosition, ToastOptions, ToastInstance } from './toast'
export type {
  CarouselItem,
  CarouselEffect,
  CarouselIndicatorPosition,
  CarouselIndicatorType,
} from './carousel'

// ─── 插件选项类型 ─────────────────────────────────────────────────────────────
export interface HohaUIOptions {
  /** 语言/地区代码，如 'zh-CN' | 'en-US' */
  locale?: string
  i18n?: {
    locale?: string
    fallbackLocale?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages?: Record<string, any>
  }
  /**
   * 全局状态管理（opt-in）
   * 传入对象才会初始化 HohaStore；
   * 不传或传 false 则不注入，避免污染宿主应用的 provide/inject 命名空间。
   */
  store?:
    | {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        config?: Record<string, any>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        theme?: Record<string, any>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        initialState?: Record<string, any>
      }
    | false
}

// ─── 全局注册的组件数组 ───────────────────────────────────────────────────────
const components = [
  HoButton,
  HoInput,
  HoIcon,
  HoModal,
  HoCarousel,
  HoCarouselItem,
  HoCarouselV2, // 修复：原 install 数组缺少此项
  HoTabs,
  HoTab,         // 修复：原 install 数组缺少此项
  HoNavBar,
  HoTabBar,
  HoTabBarItem,
  HoImage,
  HoCell,
  HoCellGroup,
]

// ─── Vue 插件默认导出 ─────────────────────────────────────────────────────────
export default {
  install(app: App, options: HohaUIOptions = {}) {
    // 注册全部组件
    components.forEach((component) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const name = (component as any).name
      if (name) {
        app.component(name, component)
      }
    })

    // 全局属性（Options API）
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globals = app.config.globalProperties as any
    globals.$message = message
    globals.$toast = toast

    // Composition API 注入
    app.provide('$message', message)
    app.provide('$toast', toast)

    // 国际化（可选）
    if (options.locale) {
      setLocale(options.locale)
    }
    if (options.i18n) {
      const i18nPlugin = createI18n(options.i18n)
      app.use(i18nPlugin)
    }

    // 全局状态（opt-in）
    // 修复：原实现始终执行 app.use(HohaStore)，强制注入会污染宿主应用
    if (options.store !== undefined && options.store !== false) {
      app.use(HohaStore, options.store)
    }
  },
}
