/**
 * Vue 2/3 Composition API 统一导出
 *
 * 修复: 使用静态 import 替代 require()，解决 ESM bundle 中
 *       require 不可用的问题（原实现在 dist/esm/*.mjs 中会抛 ReferenceError）
 *
 * 版本支持:
 *   - Vue 3.x    : 全部 API 直接可用
 *   - Vue 2.7+   : 已内置 Composition API，从 'vue' 直接导入
 *   - Vue 2.6 及以下: 需在应用入口手动安装并注册 @vue/composition-api；
 *                    本层不再自动 require，由用户负责注册
 */

// 通过 namespace 导入，保留运行时灵活性（兼容 Vue 2 缺少部分 API 的场景）
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import * as _vue from 'vue'
const compositionApi = _vue as any

// ── 版本检测（使用 vue 自身导出的 version 字符串，不再依赖 require('vue/package.json')）──
export const vueVersion: string = compositionApi.version ?? '3'
export const isVue2: boolean = vueVersion.startsWith('2')
export const isVue3: boolean = !isVue2

// Vue 2.6 及以下用户提示
if (isVue2) {
  const minor = parseInt(vueVersion.split('.')[1] ?? '0', 10)
  if (minor < 7) {
    console.warn(
      '[hoha-ui] 检测到 Vue 2.6 及以下版本。\n' +
      '请在应用入口安装并注册 @vue/composition-api：\n' +
      '  import VCA from "@vue/composition-api"\n' +
      '  Vue.use(VCA)\n' +
      '或升级至 Vue 2.7+ 以使用内置的 Composition API。'
    )
  }
}

// ── Composition API 导出（Vue 2.7+ / Vue 3 均支持）──
export const ref = compositionApi.ref
export const reactive = compositionApi.reactive
export const computed = compositionApi.computed
export const watch = compositionApi.watch
export const watchEffect = compositionApi.watchEffect
export const onMounted = compositionApi.onMounted
export const onUnmounted = compositionApi.onUnmounted
export const onBeforeMount = compositionApi.onBeforeMount
export const onBeforeUnmount = compositionApi.onBeforeUnmount
export const onUpdated = compositionApi.onUpdated
export const onBeforeUpdate = compositionApi.onBeforeUpdate
export const provide = compositionApi.provide
export const inject = compositionApi.inject
export const toRef = compositionApi.toRef
export const toRefs = compositionApi.toRefs
export const unref = compositionApi.unref
export const isRef = compositionApi.isRef
export const isReactive = compositionApi.isReactive
export const isReadonly = compositionApi.isReadonly
export const nextTick = compositionApi.nextTick
export const defineComponent = compositionApi.defineComponent
export const getCurrentInstance = compositionApi.getCurrentInstance
export const shallowRef = compositionApi.shallowRef
export const shallowReactive = compositionApi.shallowReactive
export const markRaw = compositionApi.markRaw
export const toRaw = compositionApi.toRaw
export const onActivated = compositionApi.onActivated
export const onDeactivated = compositionApi.onDeactivated
export const onErrorCaptured = compositionApi.onErrorCaptured
export const h = compositionApi.h

/**
 * createApp
 * - Vue 3 / Vue 2.7+ with compat: 使用原生 createApp
 * - Vue 2 (< 2.7): 提供降级错误提示，引导用户升级
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createApp: any = compositionApi.createApp ?? function () {
  throw new Error(
    '[hoha-ui] createApp 在 Vue 2 中不可用。\n' +
    '请升级至 Vue 2.7+ 或 Vue 3，或直接使用 new Vue() 创建实例。'
  )
}

/**
 * 便捷包装：创建跨版本响应式引用
 */
export function createRef<T>(value: T) {
  return ref(value)
}

/**
 * 便捷包装：创建跨版本响应式对象
 */
export function createReactive<T extends object>(target: T): T {
  return reactive(target) as T
}
