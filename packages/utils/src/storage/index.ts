/**
 * Storage utility functions
 */

interface StorageOptions {
  expire?: number // milliseconds
}

interface StorageItem<T> {
  value: T
  expire?: number
}

function safeJsonParse<T>(str: string): T | null {
  try {
    return JSON.parse(str)
  } catch {
    return null
  }
}

export const localStorage = {
  get<T>(key: string): T | null {
    const item = safeJsonParse<StorageItem<T>>(window.localStorage.getItem(key) || '')
    if (!item) return null
    if (item.expire && Date.now() > item.expire) {
      this.remove(key)
      return null
    }
    return item.value
  },

  set<T>(key: string, value: T, options?: StorageOptions): void {
    const item: StorageItem<T> = {
      value,
      expire: options?.expire ? Date.now() + options.expire : undefined
    }
    window.localStorage.setItem(key, JSON.stringify(item))
  },

  remove(key: string): void {
    window.localStorage.removeItem(key)
  },

  clear(): void {
    window.localStorage.clear()
  }
}

export const sessionStorage = {
  get<T>(key: string): T | null {
    const item = safeJsonParse<StorageItem<T>>(window.sessionStorage.getItem(key) || '')
    if (!item) return null
    if (item.expire && Date.now() > item.expire) {
      this.remove(key)
      return null
    }
    return item.value
  },

  set<T>(key: string, value: T, options?: StorageOptions): void {
    const item: StorageItem<T> = {
      value,
      expire: options?.expire ? Date.now() + options.expire : undefined
    }
    window.sessionStorage.setItem(key, JSON.stringify(item))
  },

  remove(key: string): void {
    window.sessionStorage.removeItem(key)
  },

  clear(): void {
    window.sessionStorage.clear()
  }
}

export const cookie = {
  get(key: string): string | null {
    const match = document.cookie.match(new RegExp(`(^| )${key}=([^;]*)(;|$)`))
    return match ? decodeURIComponent(match[2]) : null
  },

  set(key: string, value: string, days = 365): void {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${key}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/`
  },

  remove(key: string): void {
    document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
  }
}
