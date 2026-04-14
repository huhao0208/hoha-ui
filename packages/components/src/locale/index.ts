/**
 * Hoha UI 国际化模块
 * 支持 Vue 2/3，可扩展语言包
 */

import { ref, computed, inject, provide, type Ref, type ComputedRef } from 'vue'

// 语言包类型定义
export interface LocaleMessages {
  [key: string]: string | LocaleMessages
}

export interface HohaLocale {
  name: string
  hoha: {
    name: string
    confirm: string
    cancel: string
    loading: string
    success: string
    fail: string
    error: string
    noData: string
    noMore: string
    pullRefresh: string
    pullUpLoad: string
    [key: string]: string
  }
  [key: string]: string | LocaleMessages
}

// 默认中文语言包
export const zhCN: HohaLocale = {
  name: 'zh-CN',
  hoha: {
    name: 'Hoha UI',
    confirm: '确认',
    cancel: '取消',
    loading: '加载中...',
    success: '成功',
    fail: '失败',
    error: '错误',
    noData: '暂无数据',
    noMore: '没有更多了',
    pullRefresh: '下拉刷新',
    pullUpLoad: '上拉加载',
    releaseRefresh: '释放立即刷新',
    releaseLoad: '释放加载更多',
    refreshing: '正在刷新...',
    loadingMore: '正在加载...',
    search: '搜索',
    input: '请输入',
    select: '请选择',
    required: '必填',
    optional: '选填',
    back: '返回',
    close: '关闭',
    edit: '编辑',
    delete: '删除',
    save: '保存',
    reset: '重置',
    submit: '提交',
    all: '全部',
    today: '今天',
    yesterday: '昨天',
    tomorrow: '明天',
    year: '年',
    month: '月',
    day: '日',
    hour: '时',
    minute: '分',
    second: '秒',
    am: '上午',
    pm: '下午',
    january: '一月',
    february: '二月',
    march: '三月',
    april: '四月',
    may: '五月',
    june: '六月',
    july: '七月',
    august: '八月',
    september: '九月',
    october: '十月',
    november: '十一月',
    december: '十二月',
    week: {
      sun: '周日',
      mon: '周一',
      tue: '周二',
      wed: '周三',
      thu: '周四',
      fri: '周五',
      sat: '周六'
    }
  }
}

// 英文语言包
export const enUS: HohaLocale = {
  name: 'en-US',
  hoha: {
    name: 'Hoha UI',
    confirm: 'Confirm',
    cancel: 'Cancel',
    loading: 'Loading...',
    success: 'Success',
    fail: 'Failed',
    error: 'Error',
    noData: 'No data',
    noMore: 'No more data',
    pullRefresh: 'Pull to refresh',
    pullUpLoad: 'Pull up to load',
    releaseRefresh: 'Release to refresh',
    releaseLoad: 'Release to load',
    refreshing: 'Refreshing...',
    loadingMore: 'Loading...',
    search: 'Search',
    input: 'Please input',
    select: 'Please select',
    required: 'Required',
    optional: 'Optional',
    back: 'Back',
    close: 'Close',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    reset: 'Reset',
    submit: 'Submit',
    all: 'All',
    today: 'Today',
    yesterday: 'Yesterday',
    tomorrow: 'Tomorrow',
    year: 'Year',
    month: 'Month',
    day: 'Day',
    hour: 'Hour',
    minute: 'Minute',
    second: 'Second',
    am: 'AM',
    pm: 'PM',
    january: 'January',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December',
    week: {
      sun: 'Sun',
      mon: 'Mon',
      tue: 'Tue',
      wed: 'Wed',
      thu: 'Thu',
      fri: 'Fri',
      sat: 'Sat'
    }
  }
}

// 繁体中文
export const zhTW: HohaLocale = {
  name: 'zh-TW',
  hoha: {
    name: 'Hoha UI',
    confirm: '確認',
    cancel: '取消',
    loading: '載入中...',
    success: '成功',
    fail: '失敗',
    error: '錯誤',
    noData: '暫無資料',
    noMore: '沒有更多了',
    pullRefresh: '下拉刷新',
    pullUpLoad: '上拉載入',
    releaseRefresh: '釋放立即刷新',
    releaseLoad: '釋放載入更多',
    refreshing: '正在刷新...',
    loadingMore: '正在載入...',
    search: '搜尋',
    input: '請輸入',
    select: '請選擇',
    required: '必填',
    optional: '選填',
    back: '返回',
    close: '關閉',
    edit: '編輯',
    delete: '刪除',
    save: '儲存',
    reset: '重置',
    submit: '提交',
    all: '全部',
    today: '今天',
    yesterday: '昨天',
    tomorrow: '明天',
    year: '年',
    month: '月',
    day: '日',
    hour: '時',
    minute: '分',
    second: '秒',
    am: '上午',
    pm: '下午',
    january: '一月',
    february: '二月',
    march: '三月',
    april: '四月',
    may: '五月',
    june: '六月',
    july: '七月',
    august: '八月',
    september: '九月',
    october: '十月',
    november: '十一月',
    december: '十二月',
    week: {
      sun: '週日',
      mon: '週一',
      tue: '週二',
      wed: '週三',
      thu: '週四',
      fri: '週五',
      sat: '週六'
    }
  }
}

// 日文
export const jaJP: HohaLocale = {
  name: 'ja-JP',
  hoha: {
    name: 'Hoha UI',
    confirm: '確認',
    cancel: 'キャンセル',
    loading: '読み込み中...',
    success: '成功',
    fail: '失敗',
    error: 'エラー',
    noData: 'データなし',
    noMore: 'これ以上ありません',
    pullRefresh: '下に引っ張って更新',
    pullUpLoad: '上に引っ張って読み込み',
    releaseRefresh: '離して更新',
    releaseLoad: '離して読み込み',
    refreshing: '更新中...',
    loadingMore: '読み込み中...',
    search: '検索',
    input: '入力してください',
    select: '選択してください',
    required: '必須',
    optional: '任意',
    back: '戻る',
    close: '閉じる',
    edit: '編集',
    delete: '削除',
    save: '保存',
    reset: 'リセット',
    submit: '送信',
    all: 'すべて',
    today: '今日',
    yesterday: '昨日',
    tomorrow: '明日',
    year: '年',
    month: '月',
    day: '日',
    hour: '時',
    minute: '分',
    second: '秒',
    am: '午前',
    pm: '午後',
    january: '1月',
    february: '2月',
    march: '3月',
    april: '4月',
    may: '5月',
    june: '6月',
    july: '7月',
    august: '8月',
    september: '9月',
    october: '10月',
    november: '11月',
    december: '12月',
    week: {
      sun: '日',
      mon: '月',
      tue: '火',
      wed: '水',
      thu: '木',
      fri: '金',
      sat: '土'
    }
  }
}

// 语言包映射
const localeMap: Record<string, HohaLocale> = {
  'zh-CN': zhCN,
  'zh': zhCN,
  'en-US': enUS,
  'en': enUS,
  'zh-TW': zhTW,
  'zh-HK': zhTW,
  'ja-JP': jaJP,
  'ja': jaJP
}

// 注入键
const LOCALE_INJECTION_KEY = Symbol('hoha-locale')

// 当前语言
const currentLocale = ref<HohaLocale>(zhCN)

// 缓存合并的语言包
const mergedMessages = ref<Record<string, any>>({})

/**
 * 获取嵌套对象值
 */
function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((acc, key) => acc?.[key], obj) || path
}

/**
 * 翻译函数
 */
export function t(path: string, ...args: (string | number)[]): string {
  const messages = mergedMessages.value
  let result = getNestedValue(messages, path) || path
  
  // 替换占位符 {0}, {1}, ...
  args.forEach((arg, index) => {
    result = result.replace(new RegExp(`\\{${index}\\}`, 'g'), String(arg))
  })
  
  return result
}

/**
 * 切换语言
 */
export function setLocale(locale: string | HohaLocale) {
  if (typeof locale === 'string') {
    const targetLocale = localeMap[locale]
    if (targetLocale) {
      currentLocale.value = targetLocale
    } else {
      console.warn(`[Hoha UI] Locale "${locale}" not found, using default`)
    }
  } else {
    // 自定义语言包，合并到当前语言
    currentLocale.value = locale
  }
  
  // 更新合并后的消息
  mergedMessages.value = { ...currentLocale.value }
}

/**
 * 添加/合并语言包
 */
export function addLocale(locale: string, messages: Partial<HohaLocale>) {
  const baseLocale = localeMap[locale] || currentLocale.value
  localeMap[locale] = {
    ...baseLocale,
    ...messages,
    hoha: {
      ...baseLocale.hoha,
      ...(messages.hoha || {})
    }
  } as HohaLocale
  
  // 如果当前语言是被更新的语言，重新设置
  if (currentLocale.value.name === locale) {
    setLocale(locale)
  }
}

/**
 * 获取当前语言
 */
export function getLocale(): HohaLocale {
  return currentLocale.value
}

/**
 * 获取所有可用语言
 */
export function getAvailableLocales(): string[] {
  return Object.keys(localeMap)
}

/**
 * 在组件中使用国际化
 */
export function useLocale() {
  // 尝试从注入获取
  const injectedLocale = inject<Ref<HohaLocale> | null>(LOCALE_INJECTION_KEY, null)
  
  const locale = computed(() => injectedLocale?.value || currentLocale.value)
  
  const translate = (path: string, ...args: (string | number)[]): string => {
    return t(path, ...args)
  }
  
  return {
    t: translate,
    locale,
    setLocale,
    addLocale,
    getLocale,
    getAvailableLocales
  }
}

/**
 * 创建国际化插件
 */
export function createI18n(options: {
  locale?: string
  fallbackLocale?: string
  messages?: Record<string, Partial<HohaLocale>>
} = {}) {
  const { locale = 'zh-CN', fallbackLocale = 'zh-CN', messages = {} } = options
  
  // 设置初始语言
  if (localeMap[locale]) {
    currentLocale.value = localeMap[locale]
  }
  
  // 合并自定义消息
  Object.entries(messages).forEach(([lang, msg]) => {
    addLocale(lang, msg)
  })
  
  // 提供注入
  const provideLocale = () => {
    provide(LOCALE_INJECTION_KEY, currentLocale)
  }
  
  return {
    locale: currentLocale,
    t,
    setLocale,
    addLocale,
    getLocale,
    getAvailableLocales,
    provideLocale,
    install: (app: any) => {
      // Vue 3
      if (app.provide) {
        app.provide(LOCALE_INJECTION_KEY, currentLocale)
      }
      
      // 添加全局属性
      app.config.globalProperties.$t = t
      app.config.globalProperties.$locale = currentLocale
    }
  }
}

// 导出所有语言包
export const locales = {
  zhCN,
  enUS,
  zhTW,
  jaJP
}

// 默认导出
export default {
  t,
  setLocale,
  addLocale,
  getLocale,
  getAvailableLocales,
  useLocale,
  createI18n,
  locales
}
