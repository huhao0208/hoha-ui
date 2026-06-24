/**
 * Vue 2/3 插件安装适配
 * 提供统一的插件安装接口
 *
 * 修复：warnVue2Only / warnVue3Only 的模板字面量中 feature 参数未被插值
 */

import { isVue2, isVue3, vueVersion } from './vue-composition'

// ── 类型定义 ──────────────────────────────────────────────────────────────────

export interface PluginInstallOptions {
  [key: string]: unknown
}

export interface Vue2Constructor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  use: (plugin: any, options?: PluginInstallOptions) => void
  version: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prototype: Record<string, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: (name: string, component: any) => Vue2Constructor
}

export interface Vue3App {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  use: (plugin: any, options?: PluginInstallOptions) => void
  version: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: (name: string, component: any) => Vue3App
  config: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    globalProperties: Record<string, any>
  }
}

export type PluginObject<T = PluginInstallOptions> = {
  install: (app: Vue3App | Vue2Constructor, options?: T) => void
  version?: string
}

export type PluginFunction<T = PluginInstallOptions> = (
  app: Vue3App | Vue2Constructor,
  options?: T
) => void

export type Plugin<T = PluginInstallOptions> = PluginObject<T> | PluginFunction<T>

// ── API ────────────────────────────────────────────────────────────────────────

/**
 * 创建跨版本兼容的插件对象
 */
export function createPlugin<T = PluginInstallOptions>(
  install: (app: Vue3App | Vue2Constructor, options?: T) => void,
  version: string = '1.0.0'
): PluginObject<T> {
  return { install, version }
}

/**
 * 安装插件到 Vue 实例（自动兼容 Vue 2/3）
 */
export function installPlugin<T = PluginInstallOptions>(
  app: Vue3App | Vue2Constructor,
  plugin: Plugin<T>,
  options?: T
): void {
  if (typeof plugin === 'function') {
    plugin(app, options)
  } else {
    plugin.install(app, options)
  }
}

/**
 * 获取当前 Vue 版本信息
 */
export function getVueInfo(): { isVue2: boolean; isVue3: boolean; version: string } {
  return { isVue2, isVue3, version: vueVersion }
}

/**
 * 警告：当前功能仅 Vue 2 可用
 * 修复：原来 console.warn 里 feature 参数没有插值（输出空字符串 "" 而非功能名）
 */
export function warnVue2Only(feature: string): void {
  if (isVue3) {
    console.warn(`[hoha-ui] "${feature}" is only available in Vue 2.`)
  }
}

/**
 * 警告：当前功能仅 Vue 3 可用
 * 修复：同上，feature 参数插值修复
 */
export function warnVue3Only(feature: string): void {
  if (isVue2) {
    console.warn(`[hoha-ui] "${feature}" is only available in Vue 3.`)
  }
}

/**
 * 注册全局属性（Vue 2: prototype / Vue 3: globalProperties）
 */
export function registerGlobalProperty(
  app: Vue3App | Vue2Constructor,
  key: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
): void {
  if (isVue2) {
    ;(app as Vue2Constructor).prototype[key] = value
  } else {
    ;(app as Vue3App).config.globalProperties[key] = value
  }
}

/**
 * 注册全局组件（Vue 2/3 统一接口）
 */
export function registerComponent(
  app: Vue3App | Vue2Constructor,
  name: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any
): void {
  if (isVue2) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(app as any).component(name, component)
  } else {
    ;(app as Vue3App).component(name, component)
  }
}
