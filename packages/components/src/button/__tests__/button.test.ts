/**
 * Button 组件测试
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../index.vue'

describe('Button', () => {
  it('应该正确渲染', () => {
    const wrapper = mount(Button)
    expect(wrapper.find('.ho-button').exists()).toBe(true)
  })

  it('应该渲染默认插槽内容', () => {
    const wrapper = mount(Button, {
      slots: {
        default: '点击我'
      }
    })
    expect(wrapper.text()).toBe('点击我')
  })

  it('应该根据 type 属性应用正确的样式类', () => {
    const types = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const
    
    types.forEach(type => {
      const wrapper = mount(Button, {
        props: { type }
      })
      expect(wrapper.find(`.ho-button--${type}`).exists()).toBe(true)
    })
  })

  it('应该根据 size 属性应用正确的样式类', () => {
    const sizes = ['small', 'medium', 'large'] as const
    
    sizes.forEach(size => {
      const wrapper = mount(Button, {
        props: { size }
      })
      expect(wrapper.find(`.ho-button--${size}`).exists()).toBe(true)
    })
  })

  it('禁用状态下不应该触发点击事件', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true }
    })
    
    await wrapper.find('.ho-button').trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('加载状态下不应该触发点击事件', async () => {
    const wrapper = mount(Button, {
      props: { loading: true }
    })
    
    await wrapper.find('.ho-button').trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('正常状态应该触发点击事件', async () => {
    const wrapper = mount(Button)
    
    await wrapper.find('.ho-button').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.length).toBe(1)
  })

  it('禁用状态应该有 disabled 类', () => {
    const wrapper = mount(Button, {
      props: { disabled: true }
    })
    expect(wrapper.find('.ho-button--disabled').exists()).toBe(true)
  })

  it('加载状态应该有 loading 类', () => {
    const wrapper = mount(Button, {
      props: { loading: true }
    })
    expect(wrapper.find('.ho-button--loading').exists()).toBe(true)
  })

  it('加载状态应该显示 loading 动画', () => {
    const wrapper = mount(Button, {
      props: { loading: true }
    })
    expect(wrapper.find('.ho-button__loading').exists()).toBe(true)
  })
})
