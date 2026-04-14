/**
 * Hoha UI rem 适配方案
 * 基于 750px 设计稿，支持自定义配置
 * 
 * 使用方法：
 * 1. 默认配置: import '@hohaya/hoho/lib/flexible'
 * 2. 自定义配置: 
 *    import { initFlexible } from '@hohaya/hoho/lib/flexible'
 *    initFlexible({ designWidth: 375, rootFontSize: 16 })
 */

// 默认配置
const DEFAULT_CONFIG = {
  // 设计稿宽度
  designWidth: 750,
  // 根字体大小（设计稿宽度 / 20）
  get rootFontSize() {
    return this.designWidth / 20
  },
  // 最大根字体限制（防止在大屏幕上过大）
  maxRootFontSize: 54,
  // 是否限制最大宽度（防止在平板/桌面端过大）
  limitWidth: true
}

// 当前配置
let config = { ...DEFAULT_CONFIG }

/**
 * 设置根字体大小
 */
function setRootFontSize() {
  const html = document.documentElement
  const width = html.clientWidth
  
  // 计算根字体大小
  let baseWidth = width
  if (config.limitWidth) {
    baseWidth = Math.min(width, config.designWidth)
  }
  
  let fontSize = baseWidth / (config.designWidth / config.rootFontSize)
  
  // 限制最大根字体大小
  fontSize = Math.min(fontSize, config.maxRootFontSize)
  
  html.style.fontSize = fontSize + 'px'
  
  // 设置 CSS 变量，供组件使用
  html.style.setProperty('--hoho-root-font-size', fontSize + 'px')
  
  return fontSize
}

/**
 * 初始化 rem 适配
 * @param {Object} options - 配置选项
 * @param {number} options.designWidth - 设计稿宽度，默认 750
 * @param {number} options.rootFontSize - 根字体大小，默认 designWidth/20
 * @param {number} options.maxRootFontSize - 最大根字体限制，默认 54
 * @param {boolean} options.limitWidth - 是否限制最大宽度，默认 true
 */
function initFlexible(options = {}) {
  // 合并配置
  config = {
    ...DEFAULT_CONFIG,
    ...options
  }
  
  // 如果没有指定 rootFontSize，自动计算
  if (!options.rootFontSize) {
    config.rootFontSize = config.designWidth / 20
  }
  
  // 立即设置一次
  const fontSize = setRootFontSize()
  
  // 监听窗口变化
  window.addEventListener('resize', setRootFontSize)
  
  // 监听屏幕旋转
  window.addEventListener('orientationchange', () => {
    setTimeout(setRootFontSize, 100)
  })
  
  // 监听页面显示（从后台返回）
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      setRootFontSize()
    }
  })
  
  return {
    fontSize,
    config: { ...config }
  }
}

/**
 * 更新配置
 * @param {Object} options - 配置选项
 */
function updateConfig(options) {
  config = { ...config, ...options }
  setRootFontSize()
  return config
}

/**
 * 获取当前配置
 */
function getConfig() {
  return { ...config }
}

/**
 * px 转 rem 工具函数
 * @param {number} px - 像素值
 * @returns {number} rem 值
 */
function pxToRem(px) {
  return px / config.rootFontSize
}

/**
 * rem 转 px 工具函数
 * @param {number} rem - rem 值
 * @returns {number} 像素值
 */
function remToPx(rem) {
  return rem * config.rootFontSize
}

// 自动初始化（使用默认配置）
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initFlexible()
  } else {
    document.addEventListener('DOMContentLoaded', () => initFlexible())
  }
}

// 导出
export { 
  initFlexible, 
  setRootFontSize, 
  updateConfig, 
  getConfig, 
  pxToRem, 
  remToPx 
}

export default initFlexible
