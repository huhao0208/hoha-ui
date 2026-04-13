/**
 * Hoha UI rem 适配方案
 * 基于 750px 设计稿
 * 
 * 使用方法：
 * 1. 在入口文件引入: import '@hohaya/hoho/lib/flexible'
 * 2. 或者手动调用 setRootFontSize()
 */

// 设计稿宽度
const DESIGN_WIDTH = 750

// 根字体大小 = 设计稿宽度 / 20
const ROOT_FONT_SIZE = DESIGN_WIDTH / 20

// 最大根字体限制（防止在大屏幕上过大）
const MAX_ROOT_FONT_SIZE = 54

/**
 * 设置根字体大小
 * rem 单位基于根字体大小计算
 */
function setRootFontSize() {
  const html = document.documentElement
  const width = html.clientWidth
  
  // 计算根字体大小
  // 限制最大宽度为设计稿宽度，防止在平板/桌面端过大
  const clampedWidth = Math.min(width, DESIGN_WIDTH)
  let fontSize = clampedWidth / 20
  
  // 限制最大根字体大小
  fontSize = Math.min(fontSize, MAX_ROOT_FONT_SIZE)
  
  html.style.fontSize = fontSize + 'px'
  
  // 输出调试信息
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Hoha UI] Viewport: ${width}px, Root font size: ${fontSize}px`)
  }
}

/**
 * 初始化 rem 适配
 */
function initFlexible() {
  // 立即设置一次
  setRootFontSize()
  
  // 监听窗口变化
  window.addEventListener('resize', setRootFontSize)
  
  // 监听屏幕旋转
  window.addEventListener('orientationchange', () => {
    // 延迟执行，等待旋转完成
    setTimeout(setRootFontSize, 100)
  })
  
  // 监听页面显示（从后台返回）
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      setRootFontSize()
    }
  })
}

// 自动初始化
if (typeof window !== 'undefined') {
  // DOM Ready 后初始化
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initFlexible()
  } else {
    document.addEventListener('DOMContentLoaded', initFlexible)
  }
}

// 导出函数供手动调用
export { setRootFontSize, initFlexible }

// 默认导出初始化函数
export default initFlexible
