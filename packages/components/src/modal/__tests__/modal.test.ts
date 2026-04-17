/**
 * Modal 组件测试
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Modal from '../index.vue'

describe('Modal', () => {
  it('当 modelValue 为 false 时不应该显示', () => {
    const wrapper = mount(Modal, {
      props: {
        modelValue: false
      }
    })
    expect(wrapper.html()).not.toContain('ho-modal')
  })

  it('组件应该正确挂载', () => {
    const wrapper = mount(Modal, {
      props: {
        modelValue: true
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该接受 title 属性', () => {
    const wrapper = mount(Modal, {
      props: {
        modelValue: true,
        title: '测试标题'
      }
    })
    expect(wrapper.props('title')).toBe('测试标题')
  })

  it('应该接受 width 属性', () => {
    const wrapper = mount(Modal, {
      props: {
        modelValue: true,
        width: 500
      }
    })
    expect(wrapper.props('width')).toBe(500)
  })

  it('应该接受 closable 属性', () => {
    const wrapper = mount(Modal, {
      props: {
        modelValue: true,
        closable: false
      }
    })
    expect(wrapper.props('closable')).toBe(false)
  })

  it('应该接受 maskClosable 属性', () => {
    const wrapper = mount(Modal, {
      props: {
        modelValue: true,
        maskClosable: false
      }
    })
    expect(wrapper.props('maskClosable')).toBe(false)
  })
})
