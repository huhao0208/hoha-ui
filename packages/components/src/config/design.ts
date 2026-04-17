import { ref, readonly, type CSSProperties } from 'vue'

/**
 * 设计稿配置
 */
export interface DesignConfig {
  /** 设计稿宽度 */
  baseWidth: number
  /** 单位类型 */
  unit: 'px' | 'rem' | 'vw'
  /** rem 基准值 (1rem = ?px) */
  remBase: number
  /** 是否启用响应式 */
  responsive: boolean
}

const defaultConfig: DesignConfig = {
  baseWidth: 375,
  unit: 'rem',
  remBase: 16,
  responsive: true
}

const config = ref<DesignConfig>({ ...defaultConfig })

/**
 * 转换为响应式单位
 * @param px 设计稿像素值
 * @returns 响应式单位值
 */
export function toResponsiveUnit(px: number): string {
  const { baseWidth, unit, remBase, responsive } = config.value
  
  if (!responsive) {
    return `${px}px`
  }
  
  const ratio = px / baseWidth
  
  switch (unit) {
    case 'px':
      return `${px}px`
    case 'rem':
      return `${(px / remBase).toFixed(4)}rem`
    case 'vw':
      return `${(ratio * 100).toFixed(4)}vw`
    default:
      return `${px}px`
  }
}

/**
 * 生成响应式样式对象
 * @param styles 样式对象 (px 值)
 * @returns 响应式样式对象
 */
export function createResponsiveStyles(styles: Record<string, number>): CSSProperties {
  const result: CSSProperties = {}
  
  for (const [key, value] of Object.entries(styles)) {
    // 转换 camelCase 到 kebab-case
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
    ;(result as any)[cssKey] = toResponsiveUnit(value)
  }
  
  return result
}

/**
 * 尺寸预设
 */
export const sizePresets = {
  // 375px 设计稿
  '375': {
    small: { height: 28, padding: 16, fontSize: 12 },
    medium: { height: 36, padding: 24, fontSize: 14 },
    large: { height: 44, padding: 32, fontSize: 16 }
  },
  // 750px 设计稿
  '750': {
    small: { height: 56, padding: 32, fontSize: 24 },
    medium: { height: 72, padding: 48, fontSize: 28 },
    large: { height: 88, padding: 64, fontSize: 32 }
  }
} as const

/**
 * 设置设计稿配置
 */
export function setDesignConfig(newConfig: Partial<DesignConfig>) {
  Object.assign(config.value, newConfig)
  
  // 设置 CSS 变量
  if (typeof document !== 'undefined') {
    const root = document.documentElement
    root.style.setProperty('--ho-base-width', `${config.value.baseWidth}px`)
    root.style.setProperty('--ho-rem-base', `${config.value.remBase}px`)
  }
}

/**
 * 获取当前配置
 */
export function getDesignConfig() {
  return readonly(config.value)
}

/**
 * 重置为默认配置
 */
export function resetDesignConfig() {
  config.value = { ...defaultConfig }
}

export type { DesignConfig }
