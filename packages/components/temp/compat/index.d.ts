/**
 * Vue 2/3 兼容适配层入口
 * 提供统一的 API 接口
 */
export { isVue2, isVue3, vueVersion } from './vue-composition';
export { ref, reactive, computed, watch, watchEffect, onMounted, onUnmounted, onBeforeMount, onBeforeUnmount, onUpdated, onBeforeUpdate, onActivated, onDeactivated, onErrorCaptured, provide, inject, toRef, toRefs, unref, isRef, isReactive, isReadonly, nextTick, defineComponent, getCurrentInstance, shallowRef, shallowReactive, markRaw, toRaw, createRef, createReactive } from './vue-composition';
export { createPlugin, installPlugin, getVueInfo, warnVue2Only, warnVue3Only, registerGlobalProperty, registerComponent, type PluginInstallOptions, type Vue2Constructor, type Vue3App, type PluginObject, type PluginFunction, type Plugin } from './plugin';
declare const _default: {
    isVue2: boolean;
    isVue3: boolean;
    vueVersion: string;
};
export default _default;
//# sourceMappingURL=index.d.ts.map