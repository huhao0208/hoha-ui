/**
 * Vue 2/3 插件安装适配
 * 提供统一的插件安装接口
 */
export interface PluginInstallOptions {
    [key: string]: any;
}
export interface Vue2Constructor {
    use: (plugin: any, options?: PluginInstallOptions) => void;
    version: string;
    prototype: Record<string, any>;
    component?: (name: string, component: any) => Vue2Constructor;
}
export interface Vue3App {
    use: (plugin: any, options?: PluginInstallOptions) => void;
    version: string;
    component: (name: string, component: any) => Vue3App;
    config: {
        globalProperties: Record<string, any>;
    };
}
export type PluginObject<T = PluginInstallOptions> = {
    install: (app: Vue3App | Vue2Constructor, options?: T) => void;
    version?: string;
};
export type PluginFunction<T = PluginInstallOptions> = (app: Vue3App | Vue2Constructor, options?: T) => void;
export type Plugin<T = PluginInstallOptions> = PluginObject<T> | PluginFunction<T>;
/**
 * 创建跨版本兼容的插件
 * @param install 插件安装函数
 * @param version 插件版本
 */
export declare function createPlugin<T = PluginInstallOptions>(install: (app: Vue3App | Vue2Constructor, options?: T) => void, version?: string): PluginObject<T>;
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
export declare function installPlugin<T = PluginInstallOptions>(app: Vue3App | Vue2Constructor, plugin: Plugin<T>, options?: T): void;
/**
 * 检测当前 Vue 版本
 */
export declare function getVueInfo(): {
    isVue2: boolean;
    isVue3: boolean;
    version: string;
};
/**
 * 警告：当使用 Vue 2 专属功能时
 */
export declare function warnVue2Only(feature: string): void;
/**
 * 警告：当使用 Vue 3 专属功能时
 */
export declare function warnVue3Only(feature: string): void;
/**
 * Vue 3 app.config.globalProperties 兼容层
 * Vue 2 中挂载到 Vue.prototype
 * Vue 3 中挂载到 app.config.globalProperties
 */
export declare function registerGlobalProperty(app: Vue3App | Vue2Constructor, key: string, value: any): void;
/**
 * 注册全局组件
 * Vue 2/3 统一接口
 */
export declare function registerComponent(app: Vue3App | Vue2Constructor, name: string, component: any): void;
//# sourceMappingURL=plugin.d.ts.map