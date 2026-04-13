/**
 * Vue 2/3 Composition API 统一导出
 * 自动检测 Vue 版本并适配
 */

// Vue 版本检测
let isVue2 = false
let isVue3 = true
let vueVersion: string = '3'

// 尝试检测 Vue 版本
try {
  // 在运行时环境检测 Vue 版本
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const vuePkg = require('vue/package.json')
  vueVersion = vuePkg.version || '3'
  isVue2 = vueVersion.startsWith('2')
  isVue3 = !isVue2
} catch {
  // 如果无法检测，默认假设 Vue 3
  isVue2 = false
  isVue3 = true
}

// 导出版本信息
export { isVue2, isVue3, vueVersion }

// Composition API 导出
// Vue 3 原生支持，Vue 2 使用 @vue/composition-api
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let compositionApi: any

if (isVue2) {
  // Vue 2: 使用 @vue/composition-api
  try {
    compositionApi = require('@vue/composition-api')
  } catch (e) {
    console.error('[hoha-ui] Vue 2 detected but @vue/composition-api not found. Please install it.')
    throw e
  }
} else {
  // Vue 3: 直接使用 vue
  compositionApi = require('vue')
}

// 统一导出 Composition API
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

// Vue 3 特有的 API（Vue 2 可能不支持）
export const shallowRef = compositionApi.shallowRef
export const shallowReactive = compositionApi.shallowReactive
export const markRaw = compositionApi.markRaw
export const toRaw = compositionApi.toRaw

// Vue 2/3 都有的生命周期
export const onActivated = compositionApi.onActivated
export const onDeactivated = compositionApi.onDeactivated
export const onErrorCaptured = compositionApi.onErrorCaptured

/**
 * 创建跨版本的响应式引用
 * 对 Vue 2 和 Vue 3 都有效
 */
export function createRef<T>(value: T) {
  return ref(value)
}

/**
 * 创建跨版本的响应式对象
 * 对 Vue 2 和 Vue 3 都有效
 */
export function createReactive<T extends object>(target: T): T {
  return reactive(target)
}
