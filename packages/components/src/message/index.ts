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

// Message component
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
    const iconMap: Record<MessageType, string> = {
      success: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>',
      error: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>',
      warning: '<path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>',
      info: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>'
    }

    return () => h('div', {
      class: `ho-message ho-message--${props.type}`
    }, [
      h('span', { 
        class: 'ho-message__icon',
        innerHTML: `<svg viewBox="0 0 24 24" width="16" height="16">${iconMap[props.type as MessageType]}</svg>`
      }),
      h('span', { class: 'ho-message__text' }, props.message)
    ])
  }
})

let messageContainer: HTMLDivElement | null = null
const messageInstances: { id: number; app: App; el: HTMLDivElement }[] = []
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
  const index = messageInstances.findIndex(item => item.id === id)
  if (index !== -1) {
    const instance = messageInstances[index]
    const el = instance.el
    
    // Add leave animation
    el.classList.add('ho-message--leave')
    
    setTimeout(() => {
      instance.app.unmount()
      el.remove()
      messageInstances.splice(index, 1)
      
      // Remove container if no messages left
      if (messageInstances.length === 0 && messageContainer) {
        messageContainer.remove()
        messageContainer = null
      }
    }, 250)
  }
}

const showMessage = (options: MessageOptions): MessageInstance => {
  const container = getContainer()
  const id = ++messageId
  
  const div = document.createElement('div')
  div.className = 'ho-message-wrapper'
  container.appendChild(div)
  
  const app = createApp(MessageComponent, {
    message: options.message,
    type: options.type || 'info'
  })
  
  app.mount(div)
  messageInstances.push({ id, app, el: div })
  
  const duration = options.duration ?? 3000
  
  if (duration > 0) {
    setTimeout(() => {
      closeMessage(id)
    }, duration)
  }
  
  return {
    close: () => closeMessage(id)
  }
}

// API methods
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
