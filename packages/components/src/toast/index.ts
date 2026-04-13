import { createApp, h, defineComponent } from 'vue'
import type { App } from 'vue'

/* eslint-disable vue/one-component-per-file */

export type ToastType = 'loading' | 'success' | 'fail' | 'text'
export type ToastPosition = 'top' | 'middle' | 'bottom'

export interface ToastOptions {
  message: string
  type?: ToastType
  position?: ToastPosition
  duration?: number
  forbidClick?: boolean
  loadingType?: 'spinner' | 'circular'
}

export interface ToastInstance {
  close: () => void
}

// Toast component
const ToastComponent = defineComponent({
  name: 'HoToast',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    position: {
      type: String,
      default: 'middle'
    },
    loadingType: {
      type: String,
      default: 'circular'
    }
  },
  setup(props) {
    const iconContent = () => {
      switch (props.type as ToastType) {
        case 'loading':
          if (props.loadingType === 'spinner') {
            return h('div', { class: 'ho-toast__spinner' }, 
              Array(12).fill(0).map((_, i) => h('div', { key: i }))
            )
          }
          return h('div', { class: 'ho-toast__circular' })
        case 'success':
          return h('svg', { viewBox: '0 0 24 24', width: 36, height: 36 }, [
            h('path', { 
              fill: 'currentColor', 
              d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
            })
          ])
        case 'fail':
          return h('svg', { viewBox: '0 0 24 24', width: 36, height: 36 }, [
            h('path', { 
              fill: 'currentColor', 
              d: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z'
            })
          ])
        default:
          return []
      }
    }

    return () => {
      const icon = props.type !== 'text' ? h('div', { class: 'ho-toast__icon' }, iconContent()) : null
      const text = props.message ? h('span', { class: 'ho-toast__text' }, props.message) : null
      
      return h('div', {
        class: ['ho-toast', `ho-toast--${props.position}`, `ho-toast--${props.type}`]
      }, [
        h('div', { class: 'ho-toast__content' }, [icon, text].filter(Boolean))
      ])
    }
  }
})

let toastContainer: HTMLDivElement | null = null
let currentTimer: number | null = null
let currentInstance: { app: App; el: HTMLDivElement } | null = null

const getContainer = (): HTMLDivElement => {
  if (!toastContainer) {
    toastContainer = document.createElement('div')
    toastContainer.className = 'ho-toast-container'
    document.body.appendChild(toastContainer)
  }
  return toastContainer
}

const clearCurrentTimer = () => {
  if (currentTimer) {
    clearTimeout(currentTimer)
    currentTimer = null
  }
}

const closeToast = () => {
  clearCurrentTimer()
  
  if (currentInstance) {
    currentInstance.el.classList.add('ho-toast--leave')
    
    setTimeout(() => {
      currentInstance?.app.unmount()
      currentInstance?.el.remove()
      currentInstance = null
      
      if (toastContainer && !toastContainer.hasChildNodes()) {
        toastContainer.remove()
        toastContainer = null
      }
    }, 200)
  }
}

const showToast = (options: ToastOptions): ToastInstance => {
  // Clear previous timer first (but don't animate close yet)
  clearCurrentTimer()
  
  // Close previous instance immediately without animation
  if (currentInstance) {
    currentInstance.app.unmount()
    currentInstance.el.remove()
    currentInstance = null
  }
  
  const container = getContainer()
  
  const div = document.createElement('div')
  div.className = 'ho-toast-wrapper'
  
  // 位置类应用到 wrapper 上
  const position = options.position || 'middle'
  div.classList.add(`ho-toast-wrapper--${position}`)
  
  if (options.forbidClick) {
    div.classList.add('ho-toast-wrapper--forbid')
  }
  
  container.appendChild(div)
  
  const app = createApp(ToastComponent, {
    message: options.message,
    type: options.type || 'text',
    position: options.position || 'middle',
    loadingType: options.loadingType || 'circular'
  })
  
  app.mount(div)
  
  currentInstance = { app, el: div }
  
  const duration = options.duration ?? (options.type === 'loading' ? 0 : 2000)
  
  if (duration > 0) {
    currentTimer = window.setTimeout(() => {
      closeToast()
    }, duration)
  }
  
  return {
    close: closeToast
  }
}

// API methods
const toast = {
  show: (options: ToastOptions | string): ToastInstance => {
    const opts = typeof options === 'string' ? { message: options } : options
    return showToast(opts)
  },
  
  loading: (message: string, options?: Partial<ToastOptions>): ToastInstance => 
    showToast({ message, type: 'loading', duration: 0, ...options }),
  
  success: (message: string, options?: Partial<ToastOptions>): ToastInstance => 
    showToast({ message, type: 'success', ...options }),
  
  fail: (message: string, options?: Partial<ToastOptions>): ToastInstance => 
    showToast({ message, type: 'fail', ...options }),
  
  text: (message: string, options?: Partial<ToastOptions>): ToastInstance => 
    showToast({ message, type: 'text', ...options }),
  
  clear: closeToast,
  
  install: (app: App) => {
    app.config.globalProperties.$toast = toast
    app.provide('$toast', toast)
  }
}

export default toast
export { toast }
