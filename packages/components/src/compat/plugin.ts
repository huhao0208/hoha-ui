/**
 * Vue 2/3 插件安装适配
 * 提供统一的插件安装接口
 */

import { isVue2, isVue3, vueVersion } from './vue-composition'

// 插件安装类型定义
export interface PluginInstallOptions {
  [key: string]: any
}

export interface Vue2Constructor {
  use: (plugin: any, options?: PluginInstallOptions) => void
  version: string
  prototype: Record<string, any>
  component?: (name: string, component: any) => Vue2Constructor
}

export interface Vue3App {
  use: (plugin: any, options?: PluginInstallOptions) => void
  version: string
  component: (name: string, component: any) => Vue3App
  config: {
    globalProperties: Record<string, any>
  }
}

// 插件对象类型
export type PluginObject<T = PluginInstallOptions> = {
  install: (app: Vue3App | Vue2Constructor, options?: T) => void
  version?: string
}

// 插件函数类型
export type PluginFunction<T = PluginInstallOptions> = (
  app: Vue3App | Vue2Constructor,
  options?: T
) => void

// 插件类型（对象或函数）
export type Plugin<T = PluginInstallOptions> = PluginObject<T> | PluginFunction<T>

/**
 * 创建跨版本兼容的插件
 * @param install 插件安装函数
 * @param version 插件版本
 */
export function createPlugin<T = PluginInstallOptions>(
  install: (app: Vue3App | Vue2Constructor, options?: T) => void,
  version: string = '1.0.0'
): PluginObject<T> {
  return {
    install,
    version
  }
}

/**
 * 安装插件到 Vue 实例
 * 自动检测 Vue 版本并调用正确的安装方法
 * 
 * @example
 * // Vue 2
 * import Vue from 'vue'
 * installPlugin(Vue, myPlugin, { someOption: true })
 * 
 * // Vue 3
 * import { createApp } from 'vue'
 * const app = createApp({})
 * installPlugin(app, myPlugin, { someOption: true })
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
 * 检测当前 Vue 版本
 */
export function getVueInfo(): { isVue2: boolean; isVue3: boolean; version: string } {
  return {
    isVue2,
    isVue3,
    version: vueVersion
  }
}

/**
 * 警告：当使用 Vue 2 专属功能时
 */
export function warnVue2Only(feature: string): void {
  if (isVue3) {
    console.warn(`[hoha-ui] "${feature}" is only available in Vue 2.`)
  }
}

/**
 * 警告：当使用 Vue 3 专属功能时
 */
export function warnVue3Only(feature: string): void {
  if (isVue2) {
    console.warn(`[hoha-ui] "${feature}" is only available in Vue 3.`)
  }
}

/**
 * Vue 3 app.config.globalProperties 兼容层
 * Vue 2 中挂载到 Vue.prototype
 * Vue 3 中挂载到 app.config.globalProperties
 */
export function registerGlobalProperty(
  app: Vue3App | Vue2Constructor,
  key: string,
  value: any
): void {
  if (isVue2) {
    // Vue 2: 挂载到原型
    ;(app as Vue2Constructor).prototype[key] = value
  } else {
    // Vue 3: 挂载到 globalProperties
    ;(app as Vue3App).config.globalProperties[key] = value
  }
}

/**
 * 注册全局组件
 * Vue 2/3 统一接口
 */
export function registerComponent(
  app: Vue3App | Vue2Constructor,
  name: string,
  component: any
): void {
  if (isVue2) {
    // Vue 2: 使用 Vue.component
    ;(app as any).component(name, component)
  } else {
    // Vue 3: 使用 app.component
    ;(app as Vue3App).component(name, component)
  }
}
