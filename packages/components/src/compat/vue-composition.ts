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
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const vuePkg = require('vue/package.json')
  vueVersion = vuePkg.version || '3'
  isVue2 = vueVersion.startsWith('2')
  isVue3 = !isVue2
} catch {
  isVue2 = false
  isVue3 = true
}

export { isVue2, isVue3, vueVersion }

// Composition API 导出
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let compositionApi: any

if (isVue2) {
  try {
    compositionApi = require('@vue/composition-api')
  } catch (e) {
    console.error('[hoha-ui] Vue 2 detected but @vue/composition-api not found. Please install it.')
    throw e
  }
} else {
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

// Vue 3 特有的 API
export const shallowRef = compositionApi.shallowRef
export const shallowReactive = compositionApi.shallowReactive
export const markRaw = compositionApi.markRaw
export const toRaw = compositionApi.toRaw

// 生命周期
export const onActivated = compositionApi.onActivated
export const onDeactivated = compositionApi.onDeactivated
export const onErrorCaptured = compositionApi.onErrorCaptured

// h 函数 (渲染函数)
export const h = compositionApi.h

/**
 * createApp - Vue 2/3 兼容
 * Vue 3: 使用 createApp
 * Vue 2: 使用 new Vue()
 */
let _createApp: any
if (isVue2) {
  // Vue 2: 返回一个兼容的 app 对象
  _createApp = (component: any, props?: any) => {
    const Vue = require('vue')
    const rootEl = document.createElement('div')
    
    const AppComponent = Vue.extend(component)
    const instance = new AppComponent({ propsData: props })
    instance.$mount(rootEl)
    
    return {
      mount: (el: Element | string) => {
        const target = typeof el === 'string' ? document.querySelector(el) : el
        if (target) {
          target.appendChild(instance.$el)
        }
        return instance
      },
      unmount: () => {
        instance.$destroy()
        if (instance.$el && instance.$el.parentNode) {
          instance.$el.parentNode.removeChild(instance.$el)
        }
      },
      use: (plugin: any, options?: any) => {
        instance.$options.plugins = instance.$options.plugins || []
        // @ts-ignore
        Vue.use(plugin, options)
        return instance
      },
      component: (name: string, comp: any) => {
        Vue.component(name, comp)
        return instance
      },
      provide: (key: string | symbol, value: any) => {
        // Vue 2 的 provide 在组件定义时设置
        return instance
      },
      config: {
        globalProperties: instance
      },
      _instance: instance
    }
  }
} else {
  _createApp = compositionApi.createApp
}
export const createApp = _createApp

/**
 * 创建跨版本的响应式引用
 */
export function createRef<T>(value: T) {
  return ref(value)
}

/**
 * 创建跨版本的响应式对象
 */
export function createReactive<T extends object>(target: T): T {
  return reactive(target)
}
