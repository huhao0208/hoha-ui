import { createApp, h, defineComponent } from 'vue'
import type { App } from 'vue'

/* eslint-disable vue/one-component-per-file */

export type MessageType = 'success' | 'error' | 'warning' | 'info'

export interface MessageOptions {
  message: string
  type?: MessageType
  duration?: number
}

export interface MessageInstance {
  close: () => void
}

/**
 * 各类型图标的 SVG path d 值
 * 修复：原先使用 innerHTML 注入原始 HTML，存在 XSS 风险
 * 现改为通过 h() 构造 VNode，完全由 Vue 渲染引擎管理
 */
const iconPathMap: Record<MessageType, string> = {
  success: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  error:   'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
  warning: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
  info:    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
}

// Message 组件
const MessageComponent = defineComponent({
  name: 'HoMessage',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'info'
    }
  },
  setup(props) {
    return () => {
      const pathD = iconPathMap[props.type as MessageType] ?? iconPathMap.info

      // 使用 h() 构造 SVG VNode，避免 innerHTML XSS 风险
      const iconVNode = h('span', { class: 'ho-message__icon' }, [
        h('svg', {
          viewBox: '0 0 24 24',
          width: 16,
          height: 16,
          'aria-hidden': 'true',
          fill: 'currentColor',
        }, [
          h('path', { d: pathD })
        ])
      ])

      return h('div', {
        class: `ho-message ho-message--${props.type}`
      }, [
        iconVNode,
        h('span', { class: 'ho-message__text' }, props.message)
      ])
    }
  }
})

let messageContainer: HTMLDivElement | null = null
const messageInstances: Map<number, { app: App; el: HTMLDivElement; timer?: number }> = new Map()
let messageId = 0

const getContainer = (): HTMLDivElement => {
  if (!messageContainer) {
    messageContainer = document.createElement('div')
    messageContainer.className = 'ho-message-container'
    document.body.appendChild(messageContainer)
  }
  return messageContainer
}

const closeMessage = (id: number) => {
  const instance = messageInstances.get(id)
  if (!instance) return

  if (instance.timer) {
    clearTimeout(instance.timer)
  }

  const el = instance.el
  el.classList.add('ho-message--leave')

  setTimeout(() => {
    instance.app.unmount()
    el.remove()
    messageInstances.delete(id)

    if (messageInstances.size === 0 && messageContainer) {
      messageContainer.remove()
      messageContainer = null
    }
  }, 250)
}

const showMessage = (options: MessageOptions): MessageInstance => {
  const container = getContainer()
  const id = ++messageId

  const div = document.createElement('div')
  div.className = 'ho-message-wrapper'
  container.appendChild(div)

  const app = createApp(MessageComponent, {
    message: options.message,
    type: options.type ?? 'info'
  })

  app.mount(div)

  const duration = options.duration ?? 3000
  let timer: number | undefined

  if (duration > 0) {
    timer = window.setTimeout(() => {
      closeMessage(id)
    }, duration)
  }

  messageInstances.set(id, { app, el: div, timer })

  return {
    close: () => closeMessage(id)
  }
}

// 对外 API
const message = {
  success: (msg: string, duration?: number): MessageInstance =>
    showMessage({ message: msg, type: 'success', duration }),

  error: (msg: string, duration?: number): MessageInstance =>
    showMessage({ message: msg, type: 'error', duration }),

  warning: (msg: string, duration?: number): MessageInstance =>
    showMessage({ message: msg, type: 'warning', duration }),

  info: (msg: string, duration?: number): MessageInstance =>
    showMessage({ message: msg, type: 'info', duration }),

  install: (app: App) => {
    app.config.globalProperties.$message = message
    app.provide('$message', message)
  }
}

export default message
export { message }
