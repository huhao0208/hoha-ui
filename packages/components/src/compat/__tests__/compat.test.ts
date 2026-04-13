/**
 * Vue 2/3 兼容层测试
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, it, expect, vi } from 'vitest'

// Mock Vue 3 环境
vi.mock('vue', () => ({
  ref: vi.fn((v) => ({ value: v })),
  reactive: vi.fn((obj) => obj),
  computed: vi.fn((fn) => ({ value: fn() })),
  watch: vi.fn(),
  watchEffect: vi.fn(),
  onMounted: vi.fn(),
  onUnmounted: vi.fn(),
  onBeforeMount: vi.fn(),
  onBeforeUnmount: vi.fn(),
  onUpdated: vi.fn(),
  onBeforeUpdate: vi.fn(),
  onActivated: vi.fn(),
  onDeactivated: vi.fn(),
  onErrorCaptured: vi.fn(),
  provide: vi.fn(),
  inject: vi.fn(),
  toRef: vi.fn(),
  toRefs: vi.fn(),
  unref: vi.fn((v) => typeof v === 'object' && 'value' in v ? v.value : v),
  isRef: vi.fn((v) => typeof v === 'object' && 'value' in v),
  isReactive: vi.fn(() => false),
  isReadonly: vi.fn(() => false),
  nextTick: vi.fn(),
  defineComponent: vi.fn((fn) => fn),
  getCurrentInstance: vi.fn(),
  shallowRef: vi.fn((v) => ({ value: v })),
  shallowReactive: vi.fn((obj) => obj),
  markRaw: vi.fn((obj) => obj),
  toRaw: vi.fn((obj) => obj),
  version: '3.4.0'
}))

vi.mock('vue/package.json', () => ({
  version: '3.4.0'
}))

describe('Vue Composition API Compat Layer', () => {
  it('should export version detection', async () => {
    const { isVue2, isVue3, vueVersion } = await import('../vue-composition')
    
    expect(typeof isVue2).toBe('boolean')
    expect(typeof isVue3).toBe('boolean')
    expect(typeof vueVersion).toBe('string')
  })

  it('should export Composition APIs', async () => {
    const compat = await import('../index')
    
    // 核心响应式 API
    expect(typeof compat.ref).toBe('function')
    expect(typeof compat.reactive).toBe('function')
    expect(typeof compat.computed).toBe('function')
    expect(typeof compat.watch).toBe('function')
    expect(typeof compat.watchEffect).toBe('function')
    
    // 生命周期
    expect(typeof compat.onMounted).toBe('function')
    expect(typeof compat.onUnmounted).toBe('function')
    
    // 工具函数
    expect(typeof compat.toRef).toBe('function')
    expect(typeof compat.toRefs).toBe('function')
    expect(typeof compat.unref).toBe('function')
    expect(typeof compat.isRef).toBe('function')
    expect(typeof compat.nextTick).toBe('function')
  })

  it('should export helper functions', async () => {
    const compat = await import('../index')
    
    expect(typeof compat.createRef).toBe('function')
    expect(typeof compat.createReactive).toBe('function')
  })

  it('should create ref correctly', async () => {
    const { createRef } = await import('../vue-composition')
    const ref = createRef(42)
    
    expect(ref.value).toBe(42)
  })

  it('should create reactive correctly', async () => {
    const { createReactive } = await import('../vue-composition')
    const obj = createReactive({ count: 0 })
    
    expect(obj.count).toBe(0)
  })
})

describe('Plugin Compat Layer', () => {
  it('should export plugin utilities', async () => {
    const compat = await import('../index')
    
    expect(typeof compat.createPlugin).toBe('function')
    expect(typeof compat.installPlugin).toBe('function')
    expect(typeof compat.getVueInfo).toBe('function')
    expect(typeof compat.registerComponent).toBe('function')
    expect(typeof compat.registerGlobalProperty).toBe('function')
  })

  it('should create plugin with install method', async () => {
    const { createPlugin } = await import('../plugin')
    
    const install = vi.fn()
    const plugin = createPlugin(install, '1.0.0')
    
    expect(plugin.install).toBe(install)
    expect(plugin.version).toBe('1.0.0')
  })

  it('should get Vue info', async () => {
    const { getVueInfo } = await import('../plugin')
    const info = getVueInfo()
    
    expect(info).toHaveProperty('isVue2')
    expect(info).toHaveProperty('isVue3')
    expect(info).toHaveProperty('version')
    expect(typeof info.version).toBe('string')
  })

  it('should install plugin function', async () => {
    const { installPlugin } = await import('../plugin')
    const mockApp = {
      use: vi.fn(),
      version: '3.4.0',
      component: vi.fn(),
      config: { globalProperties: {} }
    }
    
    const pluginFn = vi.fn()
    installPlugin(mockApp as any, pluginFn, { test: true })
    
    expect(pluginFn).toHaveBeenCalledWith(mockApp, { test: true })
  })

  it('should install plugin object', async () => {
    const { installPlugin } = await import('../plugin')
    const mockApp = {
      use: vi.fn(),
      version: '3.4.0',
      component: vi.fn(),
      config: { globalProperties: {} }
    }
    
    const pluginObj = {
      install: vi.fn(),
      version: '1.0.0'
    }
    
    installPlugin(mockApp as any, pluginObj, { test: true })
    
    expect(pluginObj.install).toHaveBeenCalledWith(mockApp, { test: true })
  })

  it('should warn Vue 3 only features', async () => {
    const { warnVue3Only, isVue2 } = await import('../plugin')
    
    const warnSpy = vi.spyOn(console, 'warn')
    
    warnVue3Only('someFeature')
    
    if (isVue2) {
      expect(warnSpy).toHaveBeenCalled()
    } else {
      expect(warnSpy).not.toHaveBeenCalled()
    }
    
    warnSpy.mockRestore()
  })

  it('should register global property', async () => {
    const { registerGlobalProperty, isVue2 } = await import('../plugin')
    
    // Vue 3 mock
    const mockApp3 = {
      use: vi.fn(),
      version: '3.4.0',
      component: vi.fn(),
      config: { globalProperties: {} }
    }
    
    // Vue 2 mock
    const mockVue2 = {
      use: vi.fn(),
      version: '2.6.14',
      prototype: {}
    }
    
    if (isVue2) {
      registerGlobalProperty(mockVue2 as any, '$test', 'value')
      expect((mockVue2 as any).prototype.$test).toBe('value')
    } else {
      registerGlobalProperty(mockApp3 as any, '$test', 'value')
      expect(mockApp3.config.globalProperties.$test).toBe('value')
    }
  })

  it('should register component', async () => {
    const { registerComponent } = await import('../plugin')
    
    const mockComponent = { name: 'TestComponent' }
    
    // Vue 3 mock
    const mockApp3 = {
      use: vi.fn(),
      version: '3.4.0',
      component: vi.fn().mockReturnThis(),
      config: { globalProperties: {} }
    }
    
    registerComponent(mockApp3 as any, 'TestComponent', mockComponent)
    
    expect(mockApp3.component).toHaveBeenCalledWith('TestComponent', mockComponent)
  })
})
