/**
 * Icon 组件测试
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Icon from '../index.vue'

describe('Icon', () => {
  it('应该正确渲染', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'mdi:home'
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('应该接受 name 属性', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'mdi:home'
      }
    })
    expect(wrapper.props('name')).toBe('mdi:home')
  })

  it('应该接受 size 属性', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'mdi:home',
        size: 32
      }
    })
    expect(wrapper.props('size')).toBe(32)
  })

  it('应该接受 color 属性', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'mdi:home',
        color: '#ff0000'
      }
    })
    expect(wrapper.props('color')).toBe('#ff0000')
  })
})
