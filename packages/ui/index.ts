/**
 * @hohaya/ui - 组合包入口
 * 重新导出组件库和工具库的所有内容
 */

// 组件库
export * from '@hohaya/hoho'
export { default as HohaUI, default } from '@hohaya/hoho'

// 工具库
export * from '@hohaya/hoho-utils'

// 类型导出
export type { HohaLocale, LocaleMessages } from '@hohaya/hoho'
export type { MessageType, MessageOptions, MessageInstance } from '@hohaya/hoho'
export type { ToastType, ToastPosition, ToastOptions, ToastInstance } from '@hohaya/hoho'
