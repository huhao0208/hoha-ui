/**
 * Input 组件测试
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from '../index.vue'

describe('Input', () => {
  it('应该正确渲染', () => {
    const wrapper = mount(Input)
    expect(wrapper.find('.ho-input').exists()).toBe(true)
    expect(wrapper.find('.ho-input__inner').exists()).toBe(true)
  })

  it('应该正确绑定 v-model', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '初始值'
      }
    })
    
    expect(wrapper.find('.ho-input__inner').element.value).toBe('初始值')
    
    // 模拟输入
    const input = wrapper.find('.ho-input__inner')
    await input.setValue('新值')
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['新值'])
  })

  it('应该根据 size 属性应用正确的样式类', () => {
    const sizes = ['small', 'medium', 'large'] as const
    
    sizes.forEach(size => {
      const wrapper = mount(Input, {
        props: { size }
      })
      expect(wrapper.find(`.ho-input--${size}`).exists()).toBe(true)
    })
  })

  it('禁用状态应该有 disabled 类', () => {
    const wrapper = mount(Input, {
      props: { disabled: true }
    })
    expect(wrapper.find('.ho-input--disabled').exists()).toBe(true)
  })

  it('禁用的 input 不应该可以输入', () => {
    const wrapper = mount(Input, {
      props: { disabled: true }
    })
    expect(wrapper.find('.ho-input__inner').element.hasAttribute('disabled')).toBe(true)
  })

  it('只读状态应该有 readonly 属性', () => {
    const wrapper = mount(Input, {
      props: { readonly: true }
    })
    expect(wrapper.find('.ho-input__inner').element.hasAttribute('readonly')).toBe(true)
  })

  it('应该正确设置 placeholder', () => {
    const wrapper = mount(Input, {
      props: { placeholder: '请输入内容' }
    })
    expect(wrapper.find('.ho-input__inner').element.getAttribute('placeholder')).toBe('请输入内容')
  })

  it('应该正确设置 type', () => {
    const wrapper = mount(Input, {
      props: { type: 'password' }
    })
    expect(wrapper.find('.ho-input__inner').element.getAttribute('type')).toBe('password')
  })

  it('应该触发 focus 事件', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('.ho-input__inner')
    
    await input.trigger('focus')
    
    expect(wrapper.emitted('focus')).toBeTruthy()
  })

  it('应该触发 blur 事件', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('.ho-input__inner')
    
    await input.trigger('blur')
    
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('应该渲染 prefix 插槽', () => {
    const wrapper = mount(Input, {
      slots: {
        prefix: '<span class="prefix-icon">前缀</span>'
      }
    })
    expect(wrapper.find('.ho-input__prefix').exists()).toBe(true)
    expect(wrapper.find('.prefix-icon').exists()).toBe(true)
  })

  it('应该渲染 suffix 插槽', () => {
    const wrapper = mount(Input, {
      slots: {
        suffix: '<span class="suffix-icon">后缀</span>'
      }
    })
    expect(wrapper.find('.ho-input__suffix').exists()).toBe(true)
    expect(wrapper.find('.suffix-icon').exists()).toBe(true)
  })
})
