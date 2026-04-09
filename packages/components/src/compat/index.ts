/**
 * Vue 2/3 兼容适配层入口
 * 提供统一的 API 接口
 */

// 版本检测
export { isVue2, isVue3, vueVersion } from './vue-composition'

// Composition API 统一导出
export {
  // 核心 API
  ref,
  reactive,
  computed,
  watch,
  watchEffect,
  
  // 生命周期
  onMounted,
  onUnmounted,
  onBeforeMount,
  onBeforeUnmount,
  onUpdated,
  onBeforeUpdate,
  onActivated,
  onDeactivated,
  onErrorCaptured,
  
  // 工具函数
  provide,
  inject,
  toRef,
  toRefs,
  unref,
  isRef,
  isReactive,
  isReadonly,
  nextTick,
  defineComponent,
  getCurrentInstance,
  
  // 进阶 API
  shallowRef,
  shallowReactive,
  markRaw,
  toRaw,
  
  // 辅助函数
  createRef,
  createReactive
} from './vue-composition'

// 插件相关导出
export {
  createPlugin,
  installPlugin,
  getVueInfo,
  warnVue2Only,
  warnVue3Only,
  registerGlobalProperty,
  registerComponent,
  // 类型导出
  type PluginInstallOptions,
  type Vue2Constructor,
  type Vue3App,
  type PluginObject,
  type PluginFunction,
  type Plugin
} from './plugin'

// 默认导出版本信息
import { isVue2, isVue3, vueVersion } from './vue-composition'

export default {
  isVue2,
  isVue3,
  vueVersion
}
