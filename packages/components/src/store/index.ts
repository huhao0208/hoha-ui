/**
 * Hoha UI 全局状态管理
 * 支持组件间数据共享，同时暴露给宿主项目使用
 * 
 * 使用场景：
 * 1. 组件间通信（如 NavBar 与 TabBar 联动）
 * 2. 全局配置共享（主题、语言等）
 * 3. 业务数据共享（用户信息、购物车等）
 */

import { ref, reactive, computed, provide, inject, type Ref, type ComputedRef, watch } from 'vue'

// 注入键
const GLOBAL_STATE_KEY = Symbol('hoha-global-state')
const CONFIG_KEY = Symbol('hoha-config')
const THEME_KEY = Symbol('hoha-theme')
const LOCALE_KEY = Symbol('hoha-locale')

// ==================== 全局状态 ====================

/**
 * 全局状态接口
 */
export interface GlobalState {
  // 用户数据
  user: Ref<any>
  setUser: (user: any) => void
  
  // 购物车数据（示例业务数据）
  cart: Ref<any[]>
  addToCart: (item: any) => void
  removeFromCart: (id: string | number) => void
  clearCart: () => void
  cartCount: ComputedRef<number>
  
  // 通用数据存储
  data: Ref<Record<string, any>>
  setData: (key: string, value: any) => void
  getData: (key: string) => any
  removeData: (key: string) => void
  
  // 导航状态
  activeTab: Ref<string | number>
  setActiveTab: (tab: string | number) => void
  
  // 加载状态
  loading: Ref<boolean>
  setLoading: (loading: boolean) => void
}

/**
 * 创建全局状态
 */
function createGlobalState(): GlobalState {
  // 用户数据
  const user = ref<any>(null)
  const setUser = (userData: any) => {
    user.value = userData
  }
  
  // 购物车数据
  const cart = ref<any[]>([])
  const addToCart = (item: any) => {
    const index = cart.value.findIndex(i => i.id === item.id)
    if (index > -1) {
      cart.value[index].quantity = (cart.value[index].quantity || 1) + 1
    } else {
      cart.value.push({ ...item, quantity: 1 })
    }
  }
  const removeFromCart = (id: string | number) => {
    const index = cart.value.findIndex(i => i.id === id)
    if (index > -1) {
      cart.value.splice(index, 1)
    }
  }
  const clearCart = () => {
    cart.value = []
  }
  const cartCount = computed(() => {
    return cart.value.reduce((sum, item) => sum + (item.quantity || 1), 0)
  })
  
  // 通用数据存储
  const data = ref<Record<string, any>>({})
  const setData = (key: string, value: any) => {
    data.value[key] = value
  }
  const getData = (key: string) => {
    return data.value[key]
  }
  const removeData = (key: string) => {
    delete data.value[key]
  }
  
  // 导航状态
  const activeTab = ref<string | number>('')
  const setActiveTab = (tab: string | number) => {
    activeTab.value = tab
  }
  
  // 加载状态
  const loading = ref<boolean>(false)
  const setLoading = (isLoading: boolean) => {
    loading.value = isLoading
  }
  
  return {
    user,
    setUser,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartCount,
    data,
    setData,
    getData,
    removeData,
    activeTab,
    setActiveTab,
    loading,
    setLoading
  }
}

// 全局状态单例
let globalStateInstance: GlobalState | null = null

/**
 * 获取全局状态单例
 */
export function getGlobalState(): GlobalState {
  if (!globalStateInstance) {
    globalStateInstance = createGlobalState()
  }
  return globalStateInstance
}

/**
 * 在组件中使用全局状态
 * 优先从注入获取，否则使用全局单例
 */
export function useGlobalState(): GlobalState {
  const injected = inject<GlobalState | null>(GLOBAL_STATE_KEY, null)
  return injected || getGlobalState()
}

/**
 * 在根组件中提供全局状态
 */
export function provideGlobalState(): GlobalState {
  const state = getGlobalState()
  provide(GLOBAL_STATE_KEY, state)
  return state
}

// ==================== 配置管理 ====================

export interface HohaConfig {
  // 基础配置
  appName: string
  version: string
  
  // API 配置
  apiBaseURL: string
  apiTimeout: number
  
  // 功能开关
  enableDebug: boolean
  enableAnalytics: boolean
  
  // 自定义配置
  [key: string]: any
}

const defaultConfig: HohaConfig = {
  appName: 'Hoha App',
  version: '1.0.0',
  apiBaseURL: '',
  apiTimeout: 30000,
  enableDebug: false,
  enableAnalytics: true
}

let configInstance: Ref<HohaConfig> | null = null

/**
 * 获取配置
 */
export function getConfig(): Ref<HohaConfig> {
  if (!configInstance) {
    configInstance = ref<HohaConfig>({ ...defaultConfig })
  }
  return configInstance
}

/**
 * 设置配置
 */
export function setConfig(config: Partial<HohaConfig>) {
  const currentConfig = getConfig()
  currentConfig.value = { ...currentConfig.value, ...config }
}

/**
 * 使用配置
 */
export function useConfig(): Ref<HohaConfig> {
  const injected = inject<Ref<HohoConfig> | null>(CONFIG_KEY, null)
  return injected || getConfig()
}

/**
 * 提供配置
 */
export function provideConfig(config?: Partial<HohaConfig>): Ref<HohoConfig> {
  if (config) {
    setConfig(config)
  }
  const configRef = getConfig()
  provide(CONFIG_KEY, configRef)
  return configRef
}

// ==================== 主题管理 ====================

export type ThemeMode = 'light' | 'dark' | 'auto'

export interface ThemeConfig {
  mode: ThemeMode
  primaryColor: string
  successColor: string
  warningColor: string
  dangerColor: string
  infoColor: string
}

const defaultTheme: ThemeConfig = {
  mode: 'light',
  primaryColor: '#3b82f6',
  successColor: '#10b981',
  warningColor: '#f59e0b',
  dangerColor: '#ef4444',
  infoColor: '#06b6d4'
}

let themeInstance: Ref<ThemeConfig> | null = null

/**
 * 获取主题
 */
export function getTheme(): Ref<ThemeConfig> {
  if (!themeInstance) {
    themeInstance = ref<ThemeConfig>({ ...defaultTheme })
  }
  return themeInstance
}

/**
 * 设置主题
 */
export function setTheme(theme: Partial<ThemeConfig>) {
  const currentTheme = getTheme()
  currentTheme.value = { ...currentTheme.value, ...theme }
  
  // 应用到 DOM
  if (theme.mode) {
    document.documentElement.classList.toggle('dark', theme.mode === 'dark')
  }
}

/**
 * 切换暗色模式
 */
export function toggleDarkMode() {
  const theme = getTheme()
  const newMode = theme.value.mode === 'dark' ? 'light' : 'dark'
  setTheme({ mode: newMode })
}

/**
 * 使用主题
 */
export function useTheme(): Ref<ThemeConfig> {
  const injected = inject<Ref<ThemeConfig> | null>(THEME_KEY, null)
  return injected || getTheme()
}

/**
 * 提供主题
 */
export function provideTheme(theme?: Partial<ThemeConfig>): Ref<ThemeConfig> {
  if (theme) {
    setTheme(theme)
  }
  const themeRef = getTheme()
  provide(THEME_KEY, themeRef)
  return themeRef
}

// ==================== 插件安装 ====================

export interface StoreOptions {
  config?: Partial<HohaConfig>
  theme?: Partial<ThemeConfig>
  initialState?: Record<string, any>
}

/**
 * 安装全局状态管理插件
 */
export const HohaStore = {
  install(app: any, options: StoreOptions = {}) {
    // 提供配置
    if (options.config) {
      provideConfig(options.config)
    }
    
    // 提供主题
    if (options.theme) {
      provideTheme(options.theme)
    }
    
    // 提供全局状态
    const state = getGlobalState()
    
    // 初始化状态
    if (options.initialState) {
      Object.entries(options.initialState).forEach(([key, value]) => {
        state.setData(key, value)
      })
    }
    
    // 注入到应用
    app.provide(GLOBAL_STATE_KEY, state)
    app.provide(CONFIG_KEY, getConfig())
    app.provide(THEME_KEY, getTheme())
    
    // 全局属性
    app.config.globalProperties.$hohaState = state
    app.config.globalProperties.$hohaConfig = getConfig()
    app.config.globalProperties.$hohaTheme = getTheme()
  }
}

// 默认导出
export default HohaStore
