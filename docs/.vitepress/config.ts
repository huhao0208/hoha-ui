import { defineConfig } from 'vitepress'
import path from 'path'
import { demoPlugin } from './plugins/demo-plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Hoha UI',
  description: '一个现代化的 Vue 2/3 组件库，提供丰富的 UI 组件和实用工具函数',
  lang: 'zh-CN',
  base: '/hoha-ui/',

  // 主题配置
  themeConfig: {
    // 导航栏
    nav: [
      { text: '指南', link: '/guide/getting-started', activeMatch: '/guide/' },
      { text: '组件', link: '/components/button', activeMatch: '/components/' },
      { text: '工具函数', link: '/utils/dom', activeMatch: '/utils/' },
      {
        text: '相关链接',
        items: [
          { text: 'GitHub', link: 'https://github.com/hoha-ui/hoha-ui' },
          { text: '更新日志', link: '/guide/changelog' }
        ]
      }
    ],

    // 侧边栏
    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '介绍', link: '/guide/introduction' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '安装', link: '/guide/installation' }
          ]
        },
        {
          text: '设计规范',
          items: [
            { text: '设计规范', link: '/guide/design-spec' },
            { text: '主题定制', link: '/guide/theming' },
            { text: '国际化', link: '/guide/i18n' }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Input 输入框', link: '/components/input' },
            { text: 'Icon 图标', link: '/components/icon' },
            { text: 'Image 图片', link: '/components/image' },
            { text: 'Cell 单元格', link: '/components/cell' }
          ]
        },
        {
          text: '导航组件',
          items: [
            { text: 'NavBar 导航栏', link: '/components/navbar' },
            { text: 'TabBar 底部导航', link: '/components/tabbar' },
            { text: 'Tabs 标签页', link: '/components/tabs' }
          ]
        },
        {
          text: '展示组件',
          items: [
            { text: 'Carousel 轮播', link: '/components/carousel' }
          ]
        },
        {
          text: '反馈组件',
          items: [
            { text: 'Message 消息提示', link: '/components/message' },
            { text: 'Modal 对话框', link: '/components/modal' },
            { text: 'Toast 轻提示', link: '/components/toast' }
          ]
        }
      ],
      '/utils/': [
        {
          text: '工具函数',
          items: [
            { text: 'DOM 操作', link: '/utils/dom' },
            { text: '格式化', link: '/utils/format' },
            { text: '存储', link: '/utils/storage' },
            { text: '类型判断', link: '/utils/type' }
          ]
        }
      ]
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hoha-ui/hoha-ui' }
    ],

    // 页脚
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2024-present Hoha UI'
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/hoha-ui/hoha-ui/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 大纲配置
    outline: {
      level: [2, 3],
      label: '页面导航'
    },

    // 文档页脚
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },

    // 搜索配置（本地搜索）
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    },

    // 返回顶部
    returnToTopLabel: '返回顶部',

    // 侧边栏菜单标签
    sidebarMenuLabel: '菜单',

    // 深色模式切换标签
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  },

  // Markdown 配置
  markdown: {
    // 代码高亮主题
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    // 行号
    lineNumbers: true,
    // 注册 demo 插件
    config: (md) => {
      md.use(demoPlugin)
    }
  },

  // Head 配置
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'zh-CN' }]
  ],

  // Vite 配置
  vite: {
    resolve: {
      alias: {
        '@hohaya/hoho': path.resolve(__dirname, '../../packages/components/src/index.ts'),
        '@hohaya/hoho-utils': path.resolve(__dirname, '../../packages/utils/src/index.ts')
      }
    }
  },

  // Vue 配置 - 允许在 Markdown 中使用组件
  vue: {
    template: {
      compilerOptions: {
        // 只有 demo-block 是自定义元素，ho- 开头的都是 Vue 组件
        isCustomElement: (tag) => tag === 'demo-block'
      }
    }
  },

  // 最后更新时间
  lastUpdated: true
})
