/**
 * Vue 2/3 Composition API 统一导出
 * 自动检测 Vue 版本并适配
 */
declare let isVue2: boolean;
declare let isVue3: boolean;
declare let vueVersion: string;
export { isVue2, isVue3, vueVersion };
export declare const ref: any;
export declare const reactive: any;
export declare const computed: any;
export declare const watch: any;
export declare const watchEffect: any;
export declare const onMounted: any;
export declare const onUnmounted: any;
export declare const onBeforeMount: any;
export declare const onBeforeUnmount: any;
export declare const onUpdated: any;
export declare const onBeforeUpdate: any;
export declare const provide: any;
export declare const inject: any;
export declare const toRef: any;
export declare const toRefs: any;
export declare const unref: any;
export declare const isRef: any;
export declare const isReactive: any;
export declare const isReadonly: any;
export declare const nextTick: any;
export declare const defineComponent: any;
export declare const getCurrentInstance: any;
export declare const shallowRef: any;
export declare const shallowReactive: any;
export declare const markRaw: any;
export declare const toRaw: any;
export declare const onActivated: any;
export declare const onDeactivated: any;
export declare const onErrorCaptured: any;
/**
 * 创建跨版本的响应式引用
 * 对 Vue 2 和 Vue 3 都有效
 */
export declare function createRef<T>(value: T): any;
/**
 * 创建跨版本的响应式对象
 * 对 Vue 2 和 Vue 3 都有效
 */
export declare function createReactive<T extends object>(target: T): T;
//# sourceMappingURL=vue-composition.d.ts.map